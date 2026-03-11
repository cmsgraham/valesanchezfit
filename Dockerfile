# ---- base: Node + pnpm ----
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.29.3 --activate

# ---- builder: install deps + compile ----
FROM base AS builder
WORKDIR /app

# Install dependencies first (cached layer — only re-runs when lockfile changes)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source + build
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# PAYLOAD_SECRET is needed at build time (Payload initialises during next build).
# Pass it via:  docker build --build-arg PAYLOAD_SECRET=xxx
ARG PAYLOAD_SECRET
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET

RUN pnpm build

# ---- runner: lean production image ----
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

# Runtime files
COPY --from=builder /app/node_modules    ./node_modules
COPY --from=builder /app/package.json    ./package.json
COPY --from=builder /app/pnpm-lock.yaml  ./pnpm-lock.yaml
COPY --from=builder /app/src             ./src
COPY --from=builder /app/tsconfig.json   ./tsconfig.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/.next           ./.next
COPY --from=builder /app/public          ./public
COPY --from=builder /app/scripts/docker-start.sh ./docker-start.sh

# Persistent upload directory (mount a volume over this path)
RUN mkdir -p ./media && chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Runs DB migrations then starts the Next.js server
CMD ["/bin/sh", "./docker-start.sh"]
