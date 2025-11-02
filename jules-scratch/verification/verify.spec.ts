// @ts-nocheck
import { test, expect } from '@playwright/test';
import { clearLocalStorage, goHome, waitForLanding, takeFullScreenshot } from './verify.helpers';

test.use({ headless: true });

test('Frontend Verification', async ({ page }) => {
  // Ensure a clean state and go to the app
  await goHome(page, '/');
  await clearLocalStorage(page);
  await page.reload();

  // Take an initial full-page screenshot for debugging
  await takeFullScreenshot(page);

  // Wait for the landing page to be ready
  await waitForLanding(page);

  // Validate the hero headline (update to match current landing content)
  const heroHeadline = page.locator('h1', { hasText: 'RozmoWA' });
  await expect(heroHeadline).toBeVisible();
  await expect(heroHeadline).toContainText('RozmoWA');
});
