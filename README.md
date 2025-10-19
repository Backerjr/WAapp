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

GHCR / secrets guidance

- The CI uses the `GITHUB_TOKEN` by default. In some organizations this token may not have package write or visibility privileges. If you run into permission errors, create a Personal Access Token (PAT) with the `read:packages`,`write:packages` and `delete:packages` scopes and add it to repository secrets as `GHCR_PAT`, then update the workflow to use that secret instead of `GITHUB_TOKEN` for `docker/login-action`.
- The workflow includes a best-effort step to set the package visibility to `public` via the GitHub API. If that fails, you can set package visibility manually in GitHub Packages UI.

Create a `GHCR_PAT` secret

1. Create a PAT at https://github.com/settings/tokens with scopes: read:packages, write:packages, delete:packages
2. Go to your repo -> Settings -> Secrets and variables -> Actions -> New repository secret. Name it `GHCR_PAT` and paste the PAT value.
3. The CI will automatically prefer `GHCR_PAT` when present.

Create a `GH_PAGES_PAT` secret (for GitHub Pages publishing)

1. Create a PAT at https://github.com/settings/tokens with scopes: repo (or at least repo:status, repo_deployment, repo) and workflow permissions as needed.
2. Go to your repo -> Settings -> Secrets and variables -> Actions -> New repository secret. Name it `GH_PAGES_PAT` and paste the PAT value.
3. The `.github/workflows/gh-pages.yml` workflow uses this secret to push the built `dist/` to the `gh-pages` branch.

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

Caddy Docker image (even smaller + automatic TLS in other envs)

Build and run locally:

```bash
docker build -f Dockerfile.caddy -t rozmowa-caddy:local .
docker run -p 8081:80 --rm rozmowa-caddy:local
# open http://localhost:8081
```

Release workflow

- A separate workflow `.github/workflows/release-publish.yml` will build and publish images to GHCR when a GitHub Release is published. The release image is tagged with the release tag (`ghcr.io/<owner>/rozmowa:<release-tag>`).

Image tags in CI

- The CI publishes two images to GHCR per push:
	- `ghcr.io/<owner>/rozmowa:nginx-latest` and `ghcr.io/<owner>/rozmowa:nginx-<sha>`
	- `ghcr.io/<owner>/rozmowa:caddy-latest` and `ghcr.io/<owner>/rozmowa:caddy-<sha>`

Local test of published images (pull & run):

```bash
docker pull ghcr.io/<owner>/rozmowa:nginx-latest
docker run -p 8080:80 --rm ghcr.io/<owner>/rozmowa:nginx-latest

docker pull ghcr.io/<owner>/rozmowa:caddy-latest
docker run -p 8081:80 --rm ghcr.io/<owner>/rozmowa:caddy-latest
```

Notes & gotchas

- Browser-only APIs: some exercises rely on `window.speechSynthesis`. Guard or mock those when running on Node or in SSR environments.
- Local progress is persisted in `localStorage` keys: `progress` and `userStats`.
- Data source: add new lessons in `src/data/lessons.ts` following `src/types.ts` shapes.
