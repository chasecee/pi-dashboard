import type { APIRoute } from "astro";
import { exchangeCodeForTokens } from "@/lib/googleHealth";

export const prerender = false;

function html(message: string): string {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Google Health Auth</title></head><body style="font-family: sans-serif; background: #000; color: #fff; display: grid; place-items: center; min-height: 100vh; margin: 0;"><main style="max-width: 560px; padding: 24px; text-align: center;">${message}</main></body></html>`;
}

export const GET: APIRoute = async ({ url, cookies }) => {
  try {
    const error = url.searchParams.get("error");
    const errorDescription = url.searchParams.get("error_description");
    if (error) {
      return new Response(
        html(`Google OAuth failed: ${error}${errorDescription ? ` (${errorDescription})` : ""}`),
        {
          status: 400,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        },
      );
    }

    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const expectedState = cookies.get("google_oauth_state")?.value;

    cookies.delete("google_oauth_state", { path: "/" });

    if (!code || !state || !expectedState || state !== expectedState) {
      return new Response(html("OAuth validation failed. Start again at /api/google/auth."), {
        status: 400,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    await exchangeCodeForTokens(code, url);

    return new Response(
      html("Google Health is connected. You can close this tab and open / or /embed/steps."),
      {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(html(`Google OAuth failed: ${message}`), {
      status: 500,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }
};
