import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      exclude: ["node_modules", "src/tests", "src/utils", "./vitest.config.js", "./server.js"],
      provider: "v8",
      reporter: ["text", "json", "html"],
      all: true,
    },
    include: ["src/tests/**/*.test.js"],
  },
});
