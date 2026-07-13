import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";

export default defineConfig({
  output: "static",
  adapter: vercel(),
  integrations: [react(), tailwind()],
  site: process.env.PUBLIC_SITE_URL || "http://localhost:4321",
});
