import { useEffect, useMemo, useState } from "react";
import X from "./icons/X.jsx";
import Smile from "./icons/Smile.jsx";
import QuestionMark from "./icons/QuestionMark.jsx";
import Walker from "./icons/Walker.jsx";

const STORAGE_KEY = "steps_payload";
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const CHAIN_LENGTH = 7;
const TODAY_INDEX = CHAIN_LENGTH - 2;
const CLOSE_STEPS = 9000;
const POLL_MS = 15 * 60 * 1000;
const TICK_MS = 60_000;

function getStoredPayload() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function storePayload(payload) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function dayLabel(date) {
  return DAY_LABELS[date.getDay()];
}

function getChainDays(today) {
  return Array.from({ length: CHAIN_LENGTH }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + (i - TODAY_INDEX));
    date.setHours(0, 0, 0, 0);
    return date;
  });
}

function getDayState(date, steps, goal, today) {
  const isFuture = date > today;
  const isToday = formatDate(date) === formatDate(today);
  const pct = goal > 0 ? Math.round((steps / goal) * 100) : 0;
  const hitGoal = steps >= goal;

  if (isFuture) return { kind: "future" };
  if (steps === 0) return { kind: "no-data" };
  if (isToday) {
    return hitGoal ? { kind: "complete", pct } : { kind: "in-progress", pct };
  }
  if (hitGoal) return { kind: "hit", pct };
  if (steps >= CLOSE_STEPS) return { kind: "close", pct };
  return { kind: "missed", pct };
}

function breaksChain(kind) {
  return kind === "missed" || kind === "close";
}

function getConnector(left, right) {
  if (right.kind === "future") return "future";
  if (left.kind === "no-data" || right.kind === "no-data") return "nodata";
  if (left.kind === "hit" && (right.kind === "hit" || right.kind === "complete")) {
    return "solid";
  }
  if (left.kind === "hit" && right.kind === "in-progress") return "today";
  if (breaksChain(left.kind) || (left.kind === "hit" && breaksChain(right.kind))) {
    return "broken";
  }
  return "inactive";
}

function calcStreak(points, goal, today) {
  const byDate = new Map(points.map((point) => [point.date, point.steps]));
  const todaySteps = byDate.get(formatDate(today)) ?? 0;
  const cursor = new Date(today);
  if (todaySteps < goal) cursor.setDate(cursor.getDate() - 1);

  let streak = 0;
  while (true) {
    const steps = byDate.get(formatDate(cursor));
    if (steps === undefined || steps < goal) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function calcBestStreak(points, goal) {
  let best = 0;
  let current = 0;
  for (const point of points) {
    if (point.steps >= goal) {
      current += 1;
      best = Math.max(best, current);
    } else {
      current = 0;
    }
  }
  return best;
}

function getTheme(streak, days) {
  if (streak > 0) return "alive";
  if (days.some((day) => breaksChain(day.state.kind))) return "broken";
  return "fresh";
}

function getHeader(streak, best, todayState) {
  if (streak > 0) {
    const suffix = todayState.kind === "complete" ? " · goal hit" : "";
    return `${streak} day streak${suffix}`;
  }
  if (best > 0) return `Streak 0 · best ${best}`;
  return "Streak 0 · day one";
}

const THEMES = {
  alive: {
    bg: "[--bg-color:color-mix(in_srgb,#1f7a33_25%,black)] bg-[var(--bg-color)]",
    accent: "text-[#3fb950]",
  },
  broken: {
    bg: "[--bg-color:color-mix(in_srgb,#6b2323_25%,black)] bg-[var(--bg-color)]",
    accent: "text-[#d42a1e]",
  },
  fresh: {
    bg: "[--bg-color:color-mix(in_srgb,#333_20%,black)] bg-[var(--bg-color)]",
    accent: "text-[#8b949e]",
  },
};

const SHELL =
  "@container w-full h-full min-h-0 [container-type:size] flex flex-col gap-0 p-[clamp(8px,4cqw,24px)]";
const TITLE = "text-[clamp(10px,3cqw,15px)] font-bold tracking-[0.05em]";
const FOOTER = "text-[clamp(8px,2.2cqw,12px)] text-white/35 shrink-0";
const DOT_BASE =
  "size-[clamp(32px,min(12cqw,41cqh),120px)] rounded-full box-border relative shrink-0 border-[clamp(2px,0.55cqw,5px)]";
const DOT = `${DOT_BASE} overflow-hidden`;
const DOT_SLOT = "w-[clamp(32px,min(12cqw,41cqh),120px)] shrink-0 text-center";
const BONE = "animate-pulse rounded-sm bg-[#333]";

function Connector({ kind }) {
  const base = "flex-1 shrink min-w-0";
  const thickness = "h-[clamp(2px,0.55cqw,5px)]";
  if (kind === "solid") return <div className={`${base} ${thickness} bg-[#3fb950]`} />;
  if (kind === "today") {
    return <div className={`${base} ${thickness} bg-gradient-to-r from-[#3fb950] to-white/55`} />;
  }
  if (kind === "broken") {
    return (
      <div
        className={`${base} h-0 border-t-[clamp(2px,0.55cqw,5px)] border-dotted border-[#6b2323]`}
      />
    );
  }
  if (kind === "nodata") {
    return (
      <div
        className={`${base} h-0 border-t-[clamp(2px,0.55cqw,5px)] border-dotted border-[#333]`}
      />
    );
  }
  if (kind === "future") return <div className={`${base} ${thickness} bg-white/14`} />;
  return <div className={`${base} ${thickness} bg-[#161616]`} />;
}

function DayDot({ state }) {
  if (state.kind === "future") {
    return <div className={`${DOT} border-white/14`} />;
  }
  if (state.kind === "hit" || state.kind === "complete") {
    return (
      <div className={`${DOT} border-[#1f7a33]`}>
        <div className="absolute inset-0 bg-[#144a22]" />
        <div className="absolute inset-0 flex items-center justify-center text-[#3fb950]">
          <Smile className="size-[55%]" />
        </div>
      </div>
    );
  }
  if (state.kind === "in-progress") {
    const pct = Math.min(100, state.pct);
    return (
      <div className={`${DOT_BASE} overflow-visible border-dashed border-white/55`}>
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div
            className="absolute bottom-0 left-0 right-0 bg-white/15"
            style={{ height: `${pct}%` }}
          />
        </div>
        <div
          className="absolute left-1/2 z-10 w-[105%] aspect-square -translate-x-1/2"
          style={{ bottom: `${pct}%` }}
        >
          <Walker className="size-full relative top-[30%] left-[-2px] [filter:drop-shadow(0px_0px_14px_var(--bg-color))]" />
        </div>
      </div>
    );
  }
  if (state.kind === "close") {
    return (
      <div className={`${DOT} border-[#a16207]`}>
        <div className="absolute inset-0 bg-[#713f12]" />
        <div className="absolute inset-0 flex items-center justify-center text-[#eab308]">
          <X className="size-[55%]" />
        </div>
      </div>
    );
  }
  if (state.kind === "no-data") {
    return (
      <div className={`${DOT} border-dotted border-[#555]`}>
        <div className="absolute inset-0 flex items-center justify-center text-[#555]">
          <QuestionMark className="size-[55%]" />
        </div>
      </div>
    );
  }
  return (
    <div className={`${DOT} border-[#6b2323]`}>
      <div
        className="absolute bottom-0 left-0 right-0 bg-[#6b2323]"
        style={{ height: `${Math.min(100, state.pct)}%` }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-[#ff6b5e]">
        <X className="size-[55%]" />
      </div>
    </div>
  );
}

function dayLabelClass(state, isToday) {
  const base = "text-[clamp(9px,2.6cqw,13px)] whitespace-nowrap";
  if (isToday) return `${base} text-[#e6edf3] font-bold`;
  if (state.kind === "missed") return `${base} text-[#d42a1e]`;
  if (state.kind === "close") return `${base} text-[#eab308]`;
  if (state.kind === "hit") return `${base} text-[#3fb950]`;
  if (state.kind === "future") return `${base} text-white/22`;
  return `${base} text-[#555]`;
}

function dayStatsText(state, steps) {
  if (state.pct == null) return null;
  return new Intl.NumberFormat().format(steps);
}

function formatUpdatedAt(updatedAt, now) {
  const ms = now - new Date(updatedAt).getTime();
  if (!Number.isFinite(ms) || ms < 0) return null;
  const mins = Math.floor(ms / 60_000);
  if (mins < 1) return "Updated just now";
  if (mins === 1) return "Updated 1 min ago";
  if (mins < 60) return `Updated ${mins} mins ago`;
  const hours = Math.floor(mins / 60);
  if (hours === 1) return "Updated 1 hour ago";
  if (hours < 24) return `Updated ${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return days === 1 ? "Updated 1 day ago" : `Updated ${days} days ago`;
}

function Bone({ className = "", children }) {
  return (
    <span className={`${BONE} text-transparent select-none ${className}`} aria-hidden="true">
      {children}
    </span>
  );
}

function StepsSkeleton() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = getChainDays(today);
  const todayKey = formatDate(today);

  return (
    <section
      className={`${SHELL} [--bg-color:color-mix(in_srgb,#333_20%,black)] bg-[var(--bg-color)]`}
      aria-busy="true"
      aria-label="Loading steps"
    >
      <div className="flex items-baseline justify-between gap-[2cqw] shrink-0">
        <div className={`${TITLE} text-[#8b949e]`}>Chase's 10k Steps a Day</div>
        <Bone className={TITLE}>99 day streak · goal hit</Bone>
      </div>

      <div className="flex flex-col flex-1 min-h-0 justify-center gap-[1cqh]">
        <div className="flex items-center">
          {days.map((date, index) => (
            <div key={formatDate(date)} className="contents">
              <div className={`${DOT} border-[#222]`}>
                <div className="absolute inset-0 animate-pulse bg-[#222]" />
              </div>
              {index < days.length - 1 ? <Connector kind="inactive" /> : null}
            </div>
          ))}
        </div>
        <div className="flex items-start">
          {days.map((date, index) => {
            const key = formatDate(date);
            const isToday = key === todayKey;
            return (
              <div key={key} className="contents">
                <div
                  className={`${DOT_SLOT} flex flex-col items-center leading-tight text-[clamp(9px,2.6cqw,13px)] whitespace-nowrap ${isToday ? "text-[#555] font-bold" : "text-[#333]"}`}
                >
                  <span>{dayLabel(date)}</span>
                  <span className="invisible">9,999</span>
                </div>
                {index < days.length - 1 ? <div className="flex-1 min-w-0" /> : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className={FOOTER}>
        <Bone>Updated 99 mins ago</Bone>
      </div>
    </section>
  );
}

export default function StepsChart() {
  const [payload, setPayload] = useState(() =>
    typeof window === "undefined" ? null : getStoredPayload(),
  );
  const [error, setError] = useState("");
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let alive = true;

    async function load() {
      if (document.visibilityState === "hidden") return;
      try {
        const response = await fetch("/api/steps", { credentials: "omit" });
        if (!response.ok) throw new Error("Failed to fetch steps");
        const data = await response.json();
        if (!alive) return;
        storePayload(data);
        setPayload((prev) => (prev?.updatedAt === data.updatedAt ? prev : data));
        setError("");
        setNow(Date.now());
      } catch (err) {
        if (!alive) return;
        if (!getStoredPayload()) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      }
    }

    load();
    const poll = setInterval(load, POLL_MS);
    const tick = setInterval(() => setNow(Date.now()), TICK_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") load();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      alive = false;
      clearInterval(poll);
      clearInterval(tick);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const view = useMemo(() => {
    const points = payload?.points ?? [];
    const goal = payload?.goal ?? 0;
    if (points.length === 0 || goal <= 0) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const byDate = new Map(points.map((point) => [point.date, point.steps]));
    const days = getChainDays(today).map((date) => {
      const steps = byDate.get(formatDate(date)) ?? 0;
      return { date, steps, state: getDayState(date, steps, goal, today) };
    });
    const todayState = days.find((day) => formatDate(day.date) === formatDate(today)).state;
    const streak = calcStreak(points, goal, today);
    const best = calcBestStreak(points, goal);
    const theme = getTheme(streak, days);

    return {
      days,
      today,
      theme,
      header: getHeader(streak, best, todayState),
      updated: payload?.updatedAt ? formatUpdatedAt(payload.updatedAt, now) : null,
    };
  }, [payload, now]);

  if (error) {
    return (
      <section
        className={`${SHELL} [--bg-color:color-mix(in_srgb,#6b2323_25%,black)] bg-[var(--bg-color)]`}
      >
        <div className={`${TITLE} text-[#d42a1e]`}>Chase's Accountability Tracker</div>
        <div className="text-[clamp(10px,2.8cqw,14px)] text-[#8b949e]">{error}</div>
      </section>
    );
  }

  if (!view) return <StepsSkeleton />;

  const colors = THEMES[view.theme];

  return (
    <section className={`${SHELL} ${colors.bg}`}>
      <div className="flex items-baseline justify-between gap-[2cqw] shrink-0">
        <div className={`${TITLE} ${colors.accent}`}>Chase's 10k Steps a Day</div>
        <div className={`${TITLE} ${colors.accent}`}>{view.header}</div>
      </div>

      <div className="flex flex-col flex-1 min-h-0 justify-center gap-[1cqh]">
        <div className="flex items-center">
          {view.days.map((day, index) => (
            <div key={formatDate(day.date)} className="contents">
              <DayDot state={day.state} />
              {index < view.days.length - 1 ? (
                <Connector kind={getConnector(day.state, view.days[index + 1].state)} />
              ) : null}
            </div>
          ))}
        </div>
        <div className="flex items-start">
          {view.days.map((day, index) => {
            const stats = dayStatsText(day.state, day.steps);
            return (
              <div key={formatDate(day.date)} className="contents">
                <div
                  className={`${DOT_SLOT} flex flex-col items-center leading-tight ${dayLabelClass(day.state, formatDate(day.date) === formatDate(view.today))}`}
                >
                  <span>{dayLabel(day.date)}</span>
                  {stats ? <span className="opacity-50">{stats}</span> : null}
                </div>
                {index < view.days.length - 1 ? <div className="flex-1 min-w-0" /> : null}
              </div>
            );
          })}
        </div>
      </div>

      {view.updated ? <div className={FOOTER}>{view.updated}</div> : null}
    </section>
  );
}
