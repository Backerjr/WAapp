// @ts-nocheck
// Shared helpers for Playwright verification tests.
// NOTE: We avoid importing Playwright at runtime. Define a lightweight Page type
// to keep this helper decoupled from Playwright modules in non-test contexts.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Page = any

export async function clearLocalStorage(page: Page) {
  await page.evaluate(() => localStorage.clear())
}

export async function goHome(page: Page, basePath: string = '/') {
  await page.goto(basePath)
}

export async function waitForLanding(page: Page) {
  await page.waitForSelector('.landing-page', { state: 'visible' })
}

export async function takeFullScreenshot(page: Page, path = 'jules-scratch/verification/verification.png') {
  await page.screenshot({ path, fullPage: true })
}
