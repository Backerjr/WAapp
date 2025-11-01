// @ts-nocheck
// Shared helpers for Playwright verification tests.
// These helpers avoid importing Playwright types directly so they can be used
// in CI and local environments where type resolution may not be present.
// The helpers will also write debug artifacts (screenshot + HTML) if the
// expected landing content does not appear.
import fs from 'fs'

// Lightweight Page alias to avoid hard dependency on @playwright/test types here.
type Page = any

export async function clearLocalStorage(page: Page) {
  await page.evaluate(() => localStorage.clear())
}

export async function goHome(page: Page, basePath: string = '/') {
  // Use baseURL from Playwright if available by passing '/'.
  await page.goto(basePath)
}

export async function waitForLanding(page: Page, opts?: { timeoutMs?: number }) {
  const timeoutMs = opts?.timeoutMs ?? 30000
  const selectors = ['.landing-page', 'h2.hero-headline', '.hero-section']

  for (const sel of selectors) {
    try {
      await page.waitForSelector(sel, { state: 'visible', timeout: timeoutMs })
      return
    } catch (err) {
      // try next selector
    }
  }

  // If none of the selectors became visible, capture debug artifacts and throw.
  const screenshotPath = 'jules-scratch/verification/verification-failure.png'
  const htmlPath = 'jules-scratch/verification/verification-failure.html'
  try {
    await page.screenshot({ path: screenshotPath, fullPage: true })
  } catch (e) {
    // ignore screenshot errors
  }

  try {
    const content = await page.content()
    fs.writeFileSync(htmlPath, content, 'utf-8')
  } catch (e) {
    // ignore write errors
  }

  throw new Error(`Landing page did not appear within ${timeoutMs}ms. Debug artifacts:\n  screenshot: ${screenshotPath}\n  html: ${htmlPath}`)
}

export async function takeFullScreenshot(page: Page, path = 'jules-scratch/verification/verification.png') {
  await page.screenshot({ path, fullPage: true })
}
