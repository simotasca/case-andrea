import { defineConfig } from 'astro/config';

import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // site: process.env.SITE,
  server: {
    host: process.env.HOST || "0.0.0.0",
    port: Number(process.env.PORT) || 3000
  },
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  integrations: [tailwind()]
});