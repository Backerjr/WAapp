# rozmowa — lightweight language learning SPA

This is a small React + Vite TypeScript single-page app for language learning. It builds to a static `dist/` folder and includes a minimal Node `server.js` to serve the production build.

Quick commands

- Install dependencies:

```bash
npm install
```

- Dev (Vite):

```bash
npm run dev
```

- Build (production):

```bash
npm run build
```

- Serve production build locally:

```bash
node server.js
# open http://localhost:4173
```

Docker

Build and run a container that serves the `dist/` folder using the included `server.js`:

```bash
docker build -t rozmowa:latest .
docker run -p 4173:4173 --rm rozmowa:latest
```

GitHub Actions (auto-deploy)

This repository contains a workflow `.github/workflows/gh-pages.yml` which builds the project and deploys the `dist/` folder to the `gh-pages` branch on push to `replit-agent` (the repo's current default branch). The workflow uses the built-in `GITHUB_TOKEN` so no extra secrets are required for basic publishing.

Notes & gotchas

- Browser-only APIs: some exercises rely on `window.speechSynthesis`. Guard or mock those when running on Node or in SSR environments.
- Local progress is persisted in `localStorage` keys: `progress` and `userStats`.
- Data source: add new lessons in `src/data/lessons.ts` following `src/types.ts` shapes.
