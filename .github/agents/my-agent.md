---
name: RozmoWA Assistant
description: Helps with debugging, styling, and deployment in the WAapp project.
permissions:
  issues: write
  pull_requests: write
  contents: read
tools:
  - actions: run
  - npm: run
---

# RozmoWA Assistant

This agent understands the structure of the WAapp project.
It helps with:
- Fixing TypeScript and Vite build issues.
- Verifying vercel.json and deployment settings.
- Suggesting layout or design improvements for LandingPage.tsx.
