import { test, expect } from '@playwright/test';

test.describe('App Navigation', () => {
  test('should load home page successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/RozmoWA/);
    
    // Take screenshot for debugging
    await page.screenshot({ path: 'test-results/homepage.png', fullPage: true });
    
    // Log page content for debugging
    const bodyText = await page.locator('body').textContent();
    console.log('Page body text:', bodyText?.substring(0, 500));
    
    // Check for app logo (this should always be present)
    const logo = page.getByRole('heading', { name: 'rozmoWA' });
    await expect(logo).toBeVisible({ timeout: 10000 });
    
    // The home page can be either the landing page (with a hero headline)
    // or the dashboard (with a welcome back message). The test should handle both.
    const heroHeadline = page.getByRole('heading', { name: /Master Polish/i });
    const welcomeHeader = page.getByRole('heading', { name: /Welcome back/i });

    await expect(heroHeadline.or(welcomeHeader)).toBeVisible();
  });

  test('should navigate between pages', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load
    await expect(page).toHaveTitle(/RozmoWA/);
    
    // Wait for header to render
    const header = page.getByRole('complementary');
    await expect(header).toBeVisible({ timeout: 10000 });
    
    // Check navigation buttons exist using simpler selectors
    const homeBtn = header.getByRole('link', { name: /Dashboard/i });
    const learnBtn = header.getByRole('link', { name: /Learn/i });
    const progressBtn = header.getByRole('link', { name: /Review/i });
    const aboutBtn = header.getByRole('link', { name: /Resources/i });
    
    await expect(homeBtn).toBeVisible({ timeout: 5000 });
    await expect(learnBtn).toBeVisible();
    await expect(progressBtn).toBeVisible();
    await expect(aboutBtn).toBeVisible();
    
    // Click Learn button
    await learnBtn.click();
    
    // Wait a bit for the view to change
    await page.waitForTimeout(1000);
    
    // Check that content changed (either hero gone or skill tree appears)
    const heroVisible = await page.locator('.hero-section').isVisible().catch(() => false);
    const skillTreeVisible = await page.locator('.skill-tree').isVisible().catch(() => false);
    
    // Either hero should be hidden OR skill tree should be visible
    expect(heroVisible === false || skillTreeVisible === true).toBeTruthy();
  });

  test('should display stats in header', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load
    await expect(page).toHaveTitle(/RozmoWA/);
    // Wait for header to load
    const mainContent = page.getByRole('main');
    await expect(mainContent).toBeVisible({ timeout: 10000 });
    
    // Check that stats container exists
    await expect(mainContent.getByText(/Day Streak/i).first()).toBeVisible();
    
    // Check that stats are visible (streak, xp, hearts)
    await expect(mainContent.getByText(/Day Streak/i).first()).toBeVisible();
    await expect(mainContent.getByText(/Daily Goal/i)).toBeVisible();
    await expect(mainContent.getByText(/Review Queue/i).first()).toBeVisible();
    await expect(page.getByText(/Review Queue/i).first()).toBeVisible();
    
    // Check stat icons are present
    const statItems = await page.locator('p').filter({ hasText: /Day Streak|Daily Goal|Review Queue/ }).count();
    expect(statItems).toBeGreaterThanOrEqual(3);
  });
});
