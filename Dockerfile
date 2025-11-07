## Multi-stage Dockerfile
# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Enable corepack for pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --no-frozen-lockfile

# Copy source code
COPY . .

# Build application
RUN pnpm run build

# Runtime stage
FROM node:20-alpine AS runtime
WORKDIR /app

# Copy built assets and production server
COPY --from=build /app/dist ./dist
COPY --from=build /app/server.js ./server.js

ENV PORT=4173
EXPOSE 4173

CMD ["node", "server.js"]
