import { test, expect } from '@playwright/test';

test('should load homepage successfully', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/language|learn|WAapp/i);
  await expect(page).toHaveTitle(/./); // Checks that the page has a non-empty title
});