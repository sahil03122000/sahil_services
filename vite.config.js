import {resolve} from "node:path";
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// Served from https://sahil03122000.github.io/sahil_services/
// kit.html is the private sales kit (not linked from the site, noindex).
export default defineConfig({
  base: "/sahil_services/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        kit: resolve(__dirname, "kit.html")
      }
    }
  }
});
