from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:5001")
    page.screenshot(path="jules-scratch/verification/debug_initial_page.png")
    page.get_by_role("button", name="Download App").click()
    page.get_by_role("button", name="Launch Web App").click()
    page.screenshot(path="jules-scratch/verification/verification.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
