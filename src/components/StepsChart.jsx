import { useEffect, useMemo, useState } from "react";
import X from "./icons/X.jsx";
import Frown from "./icons/Frown.jsx";
import Meh from "./icons/Meh.jsx";
import Smile from "./icons/Smile.jsx";
import QuestionMark from "./icons/QuestionMark.jsx";

const STORAGE_KEY = "steps_payload";
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const CHAIN_LENGTH = 7;
const TODAY_INDEX = CHAIN_LENGTH - 2;

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
  const pct = goal > 0 ? Math.min(100, Math.round((steps / goal) * 100)) : 0;
  const hitGoal = steps >= goal;

  if (isFuture) return { kind: "future" };
  if (steps === 0) return { kind: "no-data" };
  if (isToday) {
    return hitGoal ? { kind: "complete", pct: 100 } : { kind: "in-progress", pct };
  }
  if (hitGoal) return { kind: "hit" };
  return { kind: "missed", pct };
}

function getMood(pct) {
  if (pct >= 80) {
    return {
      Icon: Smile,
      color: "text-[#eab308]",
      border: "border-[#eab308]",
      fill: "bg-[#713f12]",
    };
  }
  if (pct >= 70) {
    return {
      Icon: Meh,
      color: "text-[#f97316]",
      border: "border-[#f97316]",
      fill: "bg-[#7c2d12]",
    };
  }
  return {
    Icon: Frown,
    color: "text-[#ef4444]",
    border: "border-[#ef4444]",
    fill: "bg-[#7f1d1d]",
  };
}

function getConnector(left, right) {
  if (right.kind === "future") return "inactive";
  if (left.kind === "no-data" || right.kind === "no-data") return "nodata";
  if (left.kind === "hit" && (right.kind === "hit" || right.kind === "complete")) {
    return "solid";
  }
  if (left.kind === "hit" && right.kind === "in-progress") return "gradient";
  if (left.kind === "missed" || (left.kind === "hit" && right.kind === "missed")) {
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
  if (days.some((day) => day.state.kind === "missed")) return "broken";
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
  alive: { bg: "bg-[#1f7a33]/25", accent: "text-[#3fb950]" },
  broken: { bg: "bg-[#6b2323]/25", accent: "text-[#d42a1e]" },
  fresh: { bg: "bg-[#333]/20", accent: "text-[#8b949e]" },
};

const SHELL =
  "@container w-full h-full min-h-0 [container-type:size] flex flex-col gap-0 p-[clamp(8px,4cqw,24px)]";
const TITLE = "text-[clamp(10px,3cqw,15px)] font-bold tracking-[0.05em]";
const DOT =
  "size-[clamp(32px,min(12cqw,41cqh),120px)] rounded-full box-border relative overflow-hidden shrink-0 border-[clamp(2px,0.55cqw,5px)]";
const BONE = "animate-pulse rounded-sm bg-[#333]";

function Connector({ kind }) {
  const base = "flex-1 shrink mb-[6cqh] min-w-0";
  const thickness = "h-[clamp(2px,0.55cqw,5px)]";
  if (kind === "solid") return <div className={`${base} ${thickness} bg-[#3fb950]`} />;
  if (kind === "gradient") {
    return <div className={`${base} ${thickness} bg-gradient-to-r from-[#3fb950] to-[#144a22]`} />;
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
  return <div className={`${base} ${thickness} bg-[#161616]`} />;
}

function DayDot({ state }) {
  if (state.kind === "future") {
    return <div className={`${DOT} border-[#222]`} />;
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
    const mood = getMood(state.pct);
    return (
      <div className={`${DOT} border-dashed ${mood.border}`}>
        <div
          className={`absolute bottom-0 left-0 right-0 ${mood.fill}`}
          style={{ height: `${state.pct}%` }}
        />
        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-[0.4cqh] ${mood.color}`}>
          <mood.Icon className="size-[40%]" />
          <span className="text-[clamp(7px,2cqw,12px)] font-extrabold leading-none">
            {state.pct}%
          </span>
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
      <div className="absolute bottom-0 left-0 right-0 bg-[#6b2323]" style={{ height: `${state.pct}%` }} />
      <div className="absolute inset-0 flex items-center justify-center text-[#ff6b5e]">
        <X className="size-[55%]" />
      </div>
    </div>
  );
}

function dayLabelClass(state, isToday) {
  const base = "text-[clamp(10px,3cqw,14px)]";
  if (isToday) return `${base} text-[#e6edf3] font-bold`;
  if (state.kind === "missed") return `${base} text-[#d42a1e]`;
  if (state.kind === "future") return `${base} text-[#333]`;
  return `${base} text-[#555]`;
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
    <section className={`${SHELL} bg-[#333]/20`} aria-busy="true" aria-label="Loading steps">
      <div className="flex items-baseline justify-between gap-[2cqw] shrink-0">
        <div className={`${TITLE} text-[#8b949e]`}>Chase's Accountability Tracker</div>
        <Bone className={TITLE}>99 day streak · goal hit</Bone>
      </div>

      <div className="flex items-center flex-1 min-h-0">
        {days.map((date, index) => {
          const key = formatDate(date);
          const isToday = key === todayKey;
          return (
            <div key={key} className="contents">
              <div className="flex flex-col items-center gap-[1cqh] shrink-0">
                <div className={`${DOT} border-[#222]`}>
                  <div className="absolute inset-0 animate-pulse bg-[#222]" />
                </div>
                <div
                  className={`text-[clamp(10px,3cqw,14px)] ${isToday ? "text-[#555] font-bold" : "text-[#333]"}`}
                >
                  {dayLabel(date)}
                </div>
              </div>
              {index < days.length - 1 ? <Connector kind="inactive" /> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function StepsChart() {
  const [payload, setPayload] = useState(() =>
    typeof window === "undefined" ? null : getStoredPayload(),
  );
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const response = await fetch("/api/steps");
        if (!response.ok) throw new Error("Failed to fetch steps");
        const data = await response.json();
        if (!alive) return;
        storePayload(data);
        setPayload(data);
        setError("");
      } catch (err) {
        if (!alive) return;
        if (!getStoredPayload()) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      }
    }
    load();
    return () => {
      alive = false;
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
    };
  }, [payload]);

  if (error) {
    return (
      <section className={`${SHELL} bg-[#6b2323]/25`}>
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
        <div className={`${TITLE} ${colors.accent}`}>Chase's Accountability Tracker</div>
        <div className={`${TITLE} ${colors.accent}`}>{view.header}</div>
      </div>

      <div className="flex items-center flex-1 min-h-0">
        {view.days.map((day, index) => (
          <div key={formatDate(day.date)} className="contents">
            <div className="flex flex-col items-center gap-[1cqh] shrink-0">
              <DayDot state={day.state} />
              <div className={dayLabelClass(day.state, formatDate(day.date) === formatDate(view.today))}>
                {dayLabel(day.date)}
              </div>
            </div>
            {index < view.days.length - 1 ? (
              <Connector kind={getConnector(day.state, view.days[index + 1].state)} />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
