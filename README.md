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
