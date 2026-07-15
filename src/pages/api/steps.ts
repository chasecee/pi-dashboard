import type { APIRoute } from "astro";
import { getSteps } from "@/lib/googleHealth";

export const prerender = false;

function getGoal(): number {
  const raw = (import.meta.env as Record<string, string | undefined>).PUBLIC_STEP_GOAL;
  const parsed = raw ? Number.parseInt(raw, 10) : Number.NaN;
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return 10_000;
  }
  return parsed;
}

export const GET: APIRoute = async () => {
  try {
    const points = await getSteps(30);
    const payload = {
      goal: getGoal(),
      points,
    };

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({
        message: "Failed to load steps",
        details: message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      },
    );
  }
};
