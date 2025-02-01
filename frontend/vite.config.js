import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // ✅ Ensures React tests run in a browser-like environment
    setupFiles: './src/tests/setupTests.js', // ✅ Ensure correct path
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      all: true,
    },
  },
});
