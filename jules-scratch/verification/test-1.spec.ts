import { test, expect } from '@playwright/test';

test('should load homepage successfully', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/RozmoWA - WAapp/i);
});