import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// Served from https://sahilgupta03.github.io/sahil_services/
export default defineConfig({
  base: "/sahil_services/",
  plugins: [react()]
});
