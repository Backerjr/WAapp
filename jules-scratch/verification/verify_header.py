from playwright.sync_api import sync_playwright
import os

def run(playwright):
    app_url = os.environ.get("APP_URL", "http://localhost:5000")
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto(app_url)
    page.screenshot(path="jules-scratch/verification/verification.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
