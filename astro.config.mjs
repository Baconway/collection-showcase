// @ts-check
import { defineConfig, fontProviders, envField } from "astro/config";

import svelte from "@astrojs/svelte";
import node from "@astrojs/node";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  output: "server",

  adapter: node({
    mode: "standalone",
  }),
  base: "/showcase",
  site: "http://collection-showcase/showcase",

  server: {
    host: "0.0.0.0",
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
