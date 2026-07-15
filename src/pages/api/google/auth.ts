import type { APIRoute } from "astro";
import { randomBytes } from "node:crypto";

export const prerender = false;

const SCOPE =
  "https://www.googleapis.com/auth/googlehealth.activity_and_fitness.readonly";

function base64UrlEncode(value: Buffer): string {
  return value
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function requireEnv(name: string): string {
  const value = (import.meta.env as Record<string, string | undefined>)[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const GET: APIRoute = async ({ url, cookies }) => {
  try {
    const clientId = requireEnv("GOOGLE_CLIENT_ID");
    const state = base64UrlEncode(randomBytes(32));
    const redirectUri = `${url.origin}/api/google/callback`;

    cookies.set("google_oauth_state", state, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: url.protocol === "https:",
      maxAge: 600,
    });

    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("client_id", clientId);
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("scope", SCOPE);
    authUrl.searchParams.set("access_type", "offline");
    authUrl.searchParams.set("include_granted_scopes", "true");
    authUrl.searchParams.set("prompt", "consent");
    authUrl.searchParams.set("state", state);

    return Response.redirect(authUrl.toString(), 302);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(`Google auth setup error: ${message}`, {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
};
