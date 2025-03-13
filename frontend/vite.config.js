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
    port: 5000,
  },
  preview: {
    port: 5000,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  test: {
    globals: true,
    environment: "jsdom", // ✅ Ensures React tests run in a browser-like environment
    setupFiles: "./src/tests/setupTests.js", // ✅ Ensure correct path
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      all: true,
      exclude: [
        "vitest.setup.js", // Test setup file (not actual test logic)
        "src/tests/setupTests.js", // Setup file for tests
        "**/node_modules/**", // External dependencies
        "**/dist/**", // Build output (not source code)
        "**/coverage/**", // Previous coverage reports
        "**/public/**", // Static assets (not testable code)
        "**/*.config.js", // Configuration files (Vite, Vitest, etc.)
        "**/index.js", // Entry point files (usually just imports)
        "**/main.jsx", // Root application entry (not a business logic component)
        "src/utils/api.js", // Utility file, API call wrappers (covered via integration tests)
        "src/pages/ProjectPages/projectdetails2.jsx", // Identical to projectdetails1.jsx, unnecessary
        "src/pages/ProjectPages/projectdetails3.jsx", // Identical to projectdetails1.jsx, unnecessary
        "src/pages/ProjectPages/projectdetails4.jsx", // Identical to projectdetails1.jsx, unnecessary
        "src/pages/ProjectPages/projectdetails5.jsx", // Identical to projectdetails1.jsx, unnecessary
        "src/pages/ProjectPages/projectdetails6.jsx", // Identical to projectdetails1.jsx, unnecessary
        "src/pages/AdminDashboard", // renders tested components, minimal added logic
        "src/pages/ClientDashboard", // renders tested components, minimal added logic
        "src/pages/LoginPage", // If login logic is tested at the component level, this may be redundant
        "src/App.jsx", // App component (only renders routes & tested components)
      ],
    },
  },
});
