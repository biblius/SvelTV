import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";


// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  base: './',
  plugins: [svelte()],
});
