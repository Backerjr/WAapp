## Multi-stage Dockerfile
# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# copy package manifest and install build dependencies
COPY package.json package-lock.json* ./
RUN npm install --silent

# copy source and build
COPY . .
RUN npm run build

# Runtime stage
FROM node:20-alpine AS runtime
WORKDIR /app

# copy built assets and production server
COPY --from=build /app/dist ./dist
COPY --from=build /app/server.js ./server.js

ENV PORT=4173
EXPOSE 4173

CMD ["node", "server.js"]
