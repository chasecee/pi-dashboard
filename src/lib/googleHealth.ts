import { Redis } from "@upstash/redis";

const TOKEN_KEY = "google-health:oauth:tokens";
const STEPS_CACHE_TTL_SECONDS = 900;

function stepsCacheKey(days: number): string {
  return `google-health:steps:${days}:${formatDate(new Date())}`;
}

type GoogleTokenRecord = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  scope: string;
  tokenType: string;
};

type GoogleTokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
  token_type: string;
};

type CivilDate = {
  year: number;
  month: number;
  day: number;
};

type DailyRollupResponse = {
  rollupDataPoints?: Array<{
    civilStartTime?: { date?: CivilDate };
    steps?: { countSum?: string };
  }>;
};

export type StepPoint = {
  date: string;
  steps: number;
};

function requireEnv(name: string): string {
  const value = (import.meta.env as Record<string, string | undefined>)[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getRedisConfig(): { url: string; token: string } {
  const env = import.meta.env as Record<string, string | undefined>;
  const url = env.UPSTASH_REDIS_REST_URL ?? env.KV_REST_API_URL;
  const token = env.UPSTASH_REDIS_REST_TOKEN ?? env.KV_REST_API_TOKEN;

  if (!url) {
    throw new Error(
      "Missing Redis URL. Set UPSTASH_REDIS_REST_URL or KV_REST_API_URL.",
    );
  }

  if (!token) {
    throw new Error(
      "Missing Redis token. Set UPSTASH_REDIS_REST_TOKEN or KV_REST_API_TOKEN.",
    );
  }

  return { url, token };
}

function getRedisClient(): Redis {
  const config = getRedisConfig();
  return new Redis({
    url: config.url,
    token: config.token,
  });
}

function getRedirectUri(url: URL): string {
  return `${url.origin}/api/google/callback`;
}

function toTokenRecord(
  token: GoogleTokenResponse,
  previousRefreshToken?: string,
): GoogleTokenRecord {
  const refreshToken = token.refresh_token ?? previousRefreshToken;
  if (!refreshToken) {
    throw new Error("Google OAuth response did not include a refresh token.");
  }

  return {
    accessToken: token.access_token,
    refreshToken,
    expiresAt: Date.now() + token.expires_in * 1000,
    scope: token.scope,
    tokenType: token.token_type,
  };
}

export async function saveTokenRecord(record: GoogleTokenRecord): Promise<void> {
  const redis = getRedisClient();
  await redis.set(TOKEN_KEY, record);
}

export async function exchangeCodeForTokens(
  code: string,
  url: URL,
): Promise<GoogleTokenRecord> {
  const params = new URLSearchParams({
    client_id: requireEnv("GOOGLE_CLIENT_ID"),
    client_secret: requireEnv("GOOGLE_CLIENT_SECRET"),
    redirect_uri: getRedirectUri(url),
    grant_type: "authorization_code",
    code,
  });

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Google code exchange failed: ${response.status} ${body}`);
  }

  const token = (await response.json()) as GoogleTokenResponse;
  const record = toTokenRecord(token);
  await saveTokenRecord(record);
  return record;
}

async function loadTokenRecord(): Promise<GoogleTokenRecord> {
  const redis = getRedisClient();
  const record = await redis.get<GoogleTokenRecord>(TOKEN_KEY);
  if (!record) {
    throw new Error("Google Health token not configured. Visit /api/google/auth first.");
  }
  return record;
}

async function refreshTokens(record: GoogleTokenRecord): Promise<GoogleTokenRecord> {
  const params = new URLSearchParams({
    client_id: requireEnv("GOOGLE_CLIENT_ID"),
    client_secret: requireEnv("GOOGLE_CLIENT_SECRET"),
    grant_type: "refresh_token",
    refresh_token: record.refreshToken,
  });

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Google token refresh failed: ${response.status} ${body}`);
  }

  const token = (await response.json()) as GoogleTokenResponse;
  const nextRecord = toTokenRecord(token, record.refreshToken);
  await saveTokenRecord(nextRecord);
  return nextRecord;
}

export async function getAccessToken(): Promise<string> {
  const record = await loadTokenRecord();
  if (record.expiresAt > Date.now() + 60_000) {
    return record.accessToken;
  }
  const refreshed = await refreshTokens(record);
  return refreshed.accessToken;
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function civilDateFromDate(date: Date): CivilDate {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function buildRange(days: number): { start: Date; end: Date } {
  const today = new Date();
  const start = addDays(today, -(days - 1));
  const endExclusive = addDays(today, 1);
  start.setHours(0, 0, 0, 0);
  endExclusive.setHours(0, 0, 0, 0);
  return { start, end: endExclusive };
}

export async function getSteps(days = 30): Promise<StepPoint[]> {
  const redis = getRedisClient();
  const cacheKey = stepsCacheKey(days);
  const cached = await redis.get<StepPoint[]>(cacheKey);
  if (cached && Array.isArray(cached) && cached.length > 0) {
    return cached;
  }

  const accessToken = await getAccessToken();
  const { start, end } = buildRange(days);

  const response = await fetch(
    "https://health.googleapis.com/v4/users/me/dataTypes/steps/dataPoints:dailyRollUp",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        range: {
          start: {
            date: civilDateFromDate(start),
            time: { hours: 0, minutes: 0, seconds: 0, nanos: 0 },
          },
          end: {
            date: civilDateFromDate(end),
            time: { hours: 0, minutes: 0, seconds: 0, nanos: 0 },
          },
        },
        windowSizeDays: 1,
      }),
    },
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Google Health steps request failed: ${response.status} ${body}`);
  }

  const data = (await response.json()) as DailyRollupResponse;
  const stepMap = new Map<string, number>();

  for (const point of data.rollupDataPoints ?? []) {
    const date = point.civilStartTime?.date;
    if (!date) {
      continue;
    }
    const isoDate = `${date.year}-${`${date.month}`.padStart(2, "0")}-${`${date.day}`.padStart(2, "0")}`;
    const steps = Number.parseInt(point.steps?.countSum ?? "0", 10);
    stepMap.set(isoDate, Number.isFinite(steps) ? steps : 0);
  }

  const output: StepPoint[] = [];
  for (let i = 0; i < days; i += 1) {
    const day = addDays(start, i);
    const key = formatDate(day);
    output.push({
      date: key,
      steps: stepMap.get(key) ?? 0,
    });
  }

  await redis.set(cacheKey, output, { ex: STEPS_CACHE_TTL_SECONDS });
  return output;
}
