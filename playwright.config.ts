import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './jules-scratch/verification',
  // Explicitly match only Playwright test files
  testMatch: '**/*.spec.ts',
  // Exclude any files that might be imported as modules
  testIgnore: '**/node_modules/**',
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5000',
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:5000',
  },
  // Add reporter configuration
  reporter: [['html'], ['json', { outputFile: 'test-results.json' }]],
  // Timeout settings
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
});
