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

This repository contains a workflow `.github/workflows/ci-publish-ghcr.yml` which runs tests, builds the production bundle and publishes an nginx-based Docker image to GitHub Container Registry (GHCR) on push to `replit-agent`.

CI / GHCR notes

- The workflow builds the production `dist/` and then builds `Dockerfile.nginx` and pushes an image to `ghcr.io/<owner>/rozmowa:latest` and a SHA-tagged image.
- The workflow uses the repository `GITHUB_TOKEN` for authentication; ensure `permissions.packages: write` is allowed (the workflow sets this).

Running tests locally

```bash
npm ci
npm test
```

Nginx Docker image (smaller static server)

Build and run locally:

```bash
docker build -f Dockerfile.nginx -t rozmowa-nginx:local .
docker run -p 8080:80 --rm rozmowa-nginx:local
# open http://localhost:8080
```

Notes & gotchas

- Browser-only APIs: some exercises rely on `window.speechSynthesis`. Guard or mock those when running on Node or in SSR environments.
- Local progress is persisted in `localStorage` keys: `progress` and `userStats`.
- Data source: add new lessons in `src/data/lessons.ts` following `src/types.ts` shapes.
