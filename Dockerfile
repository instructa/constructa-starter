# ---- Stage 1: Build ----------------------------------------------------------
FROM node:22-alpine AS builder

# Slightly better compatibility on alpine + TLS root store for outbound HTTPS
RUN apk add --no-cache libc6-compat ca-certificates

# Allow Vite build to use more memory inside the builder container
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Use pnpm
RUN corepack enable && corepack prepare pnpm@10.17.1 --activate

WORKDIR /app

# Install dependencies (with lockfile)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY . .
ENV NODE_ENV=production
RUN pnpm run build

# ---- Stage 2: Runtime --------------------------------------------------------
FROM node:22-alpine AS runner

RUN apk add --no-cache libc6-compat ca-certificates
RUN npm install -g pnpm@10.17.1

WORKDIR /app
ENV PORT=5000

# Install runtime dependencies (keep dev tools for migrations/worker)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

ENV NODE_ENV=production

# Copy build output and runtime assets
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/public ./public
COPY --from=builder /app/drizzle ./drizzle

# Include source for the worker (runs via tsx in production)
COPY --from=builder /app/src ./src
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts

# Non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
USER nodejs

EXPOSE 5000

# TanStack Start default entry
CMD ["node", ".output/server/index.mjs"]
