from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:5000")
        page.evaluate("() => localStorage.clear()")
        page.reload()
        # Wait for 2 seconds to ensure the app has rendered.
        page.wait_for_timeout(2000)
        page.screenshot(path="jules-scratch/verification/verification.png")
        browser.close()

run()
