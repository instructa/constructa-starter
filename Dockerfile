# ---- Stage 1: Build ----------------------------------------------------------
FROM node:22-alpine AS builder

# Slightly better compatibility on alpine
RUN apk add --no-cache libc6-compat

# Allow Vite build to use more memory inside the builder container
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Use pnpm
RUN corepack enable && corepack prepare pnpm@9.14.4 --activate

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

RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@9.14.4 --activate

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000

# Install production dependencies only
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

# Copy build output and runtime assets
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/public ./public
COPY --from=builder /app/drizzle ./drizzle

# Include source for the worker (runs via tsx in production)
COPY --from=builder /app/src ./src
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
USER nodejs

EXPOSE 5000

# TanStack Start default entry
CMD ["node", ".output/server/index.mjs"]
