import { test, expect } from '@playwright/test';

test('Frontend Verification', async ({ page }) => {
  // Clear localStorage to ensure a clean state for the test
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  // Take a screenshot immediately to see what's on the page
  await page.screenshot({ path: 'jules-scratch/verification/verification.png', fullPage: true });

  // Wait for the main content to be visible to ensure the page is loaded
  await page.waitForSelector('.landing-page', { state: 'visible' });

  // Find the h2 element with the class 'hero-headline' and check its text content
  const heroHeadline = page.locator('h2.hero-headline');
  await expect(heroHeadline).toBeVisible();
  await expect(heroHeadline).toContainText('Speak beautifully.');
});
