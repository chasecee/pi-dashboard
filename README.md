# Pi Dashboard

Minimal Astro dashboard: live clock, date, daily quote, and online/offline status.

## Stack

- Astro (prerendered home page)
- React islands for client interactivity
- Server endpoint at `/api/quotes` (ZenQuotes proxy)
- Tailwind CSS v4
- Deployed on Vercel
- Bun

## Develop

```bash
bun install
bun run dev
```

Open http://localhost:4321

## Build

```bash
bun run build
```

LAN on a Pi (dev server; Vercel adapter has no local preview):

```bash
bun run startlocal
```

## Deploy

Push to Vercel. Set `PUBLIC_SITE_URL` to the production URL for correct OG metadata.

## Google Health Steps Setup

Create `.env.local` with:

```bash
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
UPSTASH_REDIS_REST_URL=your_upstash_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_rest_token
PUBLIC_STEP_GOAL=10000
```

If you connected Vercel KV/Upstash via Vercel integration, you can use:

```bash
KV_REST_API_URL=your_kv_rest_api_url
KV_REST_API_TOKEN=your_kv_rest_api_token
```

Create a Google Cloud OAuth web app and set the callback to:

`https://<your-site>/api/google/callback`

For local testing:

`http://localhost:4321/api/google/callback`

Run OAuth once after deploy or local start:

`/api/google/auth`
