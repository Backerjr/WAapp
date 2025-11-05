import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      // Exclude E2E tests (those are for Playwright)
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/e2e/**',
        '**/*.spec.ts', // Playwright uses .spec.ts
      ],
      // Only include unit tests
      include: [
        '**/__tests__/**/*.test.{ts,tsx}',
        '**/*.test.{ts,tsx}',
      ],
    },
  })
);
