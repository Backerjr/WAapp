/// <reference types="vitest" />
import { defineConfig, mergeConfig, type UserConfig } from 'vite';
import viteConfig from './vite.config';

export default defineConfig(({ mode }) => {
  // Get the base vite config
  const baseConfig = (viteConfig as any)({ mode: mode || 'test' }) as UserConfig;
  
  return mergeConfig(baseConfig, {
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
      // you might want to disable it, if you don't have tests that rely on CSS
      // since parsing CSS is slow
      css: true,
      // Exclude Playwright e2e tests from vitest
      exclude: ['**/node_modules/**', '**/e2e/**', '**/*.spec.ts'],
      // Only include test files in src directory
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    },
  } as UserConfig);
});

