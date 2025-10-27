import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Navigate to the local development server
    await page.goto('http://localhost:5001');

    // Wait for the page to be fully loaded and network idle
    await page.waitForLoadState('networkidle');

    // Wait for the "Download App" button to be visible and ready
    await page.waitForSelector('.cta-button', { state: 'visible' });

    // Click the "Download App" button to enter the main application
    await page.click('.cta-button');

    // Wait for the main dashboard to load
    await page.waitForSelector('.elegant-dashboard');

    // Take a screenshot of the main dashboard
    await page.screenshot({ path: 'jules-scratch/verification/screenshot.png' });

    console.log('Screenshot captured successfully!');
  } catch (error) {
    console.error('Error during verification:', error);
    await page.screenshot({ path: 'jules-scratch/verification/error_screenshot.png' });
    console.log('Error screenshot captured.');
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
