import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    exclude: ['tests/e2e/**', 'node_modules/**', '.stryker-tmp/**'],
    coverage: {
      provider: 'v8',
      include: ['core.js'],
      reporter: ['text', 'json', 'lcov'],
      thresholds: {
        lines: 90,
        functions: 100,
        statements: 90,
        branches: 80,
      },
    },
  },
});
