import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './jules-scratch/verification',
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5000',
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:5000',
  },
});
