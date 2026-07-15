import { useEffect, useMemo, useState } from "react";

const CHART_HEIGHT = 240;
const CHART_PADDING_TOP = 8;
const CHART_PADDING_BOTTOM = 4;

function formatShortDate(isoDate) {
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function formatSteps(value) {
  return new Intl.NumberFormat().format(value);
}

export default function StepsChart() {
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        const response = await fetch("/api/steps");
        if (!response.ok) {
          throw new Error("Failed to fetch steps");
        }
        const data = await response.json();
        if (alive) {
          setPayload(data);
        }
      } catch (err) {
        if (alive) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  const chart = useMemo(() => {
    const points = payload?.points ?? [];
    const goal = payload?.goal ?? 0;

    if (points.length === 0 || goal <= 0) {
      return null;
    }

    const maxSteps = Math.max(goal, ...points.map((point) => point.steps));
    const width = points.length * 20;
    const usableHeight = CHART_HEIGHT - CHART_PADDING_TOP - CHART_PADDING_BOTTOM;
    const goalY = CHART_PADDING_TOP + usableHeight * (1 - goal / maxSteps);

    return {
      points,
      goal,
      maxSteps,
      width,
      goalY,
      usableHeight,
    };
  }, [payload]);

  if (error) {
    return (
      <div className="w-full h-full rounded-xl ring-2 ring-red-500/40 p-4 text-red-300 text-sm">
        {error}
      </div>
    );
  }

  if (!chart) {
    return (
      <div className="w-full h-full rounded-xl ring-2 ring-white/30 p-4 text-white/80 text-sm">
        Loading steps...
      </div>
    );
  }

  const barWidth = 14;
  const gap = 6;

  return (
    <section className="w-full h-full min-h-0 rounded-xl ring-[0.5vw] ring-emerald-400/60 p-3 md:p-4 flex flex-col">
      <div className="flex items-end justify-between gap-3 mb-2 shrink-0">
        <h2 className="text-base md:text-xl tracking-tight">Daily Steps</h2>
        <div className="text-xs md:text-sm opacity-80">
          Goal: <span className="opacity-100">{formatSteps(chart.goal)}</span>
        </div>
      </div>

      <div className="w-full flex-1 min-h-0 overflow-hidden">
        <svg
          viewBox={`0 0 ${chart.width} ${CHART_HEIGHT}`}
          className="w-full h-full"
          preserveAspectRatio="none"
          role="img"
          aria-label="Last 30 days of steps with goal line"
        >
          <line
            x1="0"
            x2={chart.width}
            y1={chart.goalY}
            y2={chart.goalY}
            stroke="currentColor"
            strokeOpacity="0.45"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {chart.points.map((point, index) => {
            const x = index * (barWidth + gap);
            const scaledHeight = chart.usableHeight * (point.steps / chart.maxSteps);
            const height = Math.max(2, scaledHeight);
            const y = CHART_PADDING_TOP + chart.usableHeight - height;
            const hitGoal = point.steps >= chart.goal;

            return (
              <g key={point.date}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={height}
                  rx="2"
                  fill={hitGoal ? "#34d399" : "#9ca3af"}
                  fillOpacity={hitGoal ? "1" : "0.7"}
                />
                <title>{`${point.date}: ${formatSteps(point.steps)} steps${hitGoal ? " (goal hit)" : ""}`}</title>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex justify-between shrink-0 text-[10px] opacity-60 pt-1">
        <span>{formatShortDate(chart.points[0].date)}</span>
        <span>{formatShortDate(chart.points[chart.points.length - 1].date)}</span>
      </div>
    </section>
  );
}
