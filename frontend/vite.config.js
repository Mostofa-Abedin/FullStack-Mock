import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Ensures proper routing
  build: {
    outDir: "dist", // ✅ Vercel looks for `dist` folder
    sourcemap: true,
  },
  server: {
    port: 5173,
  },
  test: {
    globals: true,
    environment: "jsdom", // ✅ Ensures React tests run in a browser-like environment
    setupFiles: "./src/tests/setupTests.js", // ✅ Ensure correct path
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      all: true,
    },
  },
});




