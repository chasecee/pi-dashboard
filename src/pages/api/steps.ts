import type { APIRoute } from "astro";
import { STEPS_CACHE_TTL_SECONDS } from "@/lib/googleHealth";
import { getStepsPayload } from "@/lib/steps";

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const payload = await getStepsPayload();

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": `public, max-age=${STEPS_CACHE_TTL_SECONDS}, s-maxage=${STEPS_CACHE_TTL_SECONDS}, stale-while-revalidate=3600`,
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
