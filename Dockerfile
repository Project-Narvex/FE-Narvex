# Multi-stage Dockerfile for Next.js production

FROM node:20-slim AS deps
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* .npmrc* ./
RUN if [ -f package-lock.json ]; then \
            npm ci --no-audit --no-fund; \
        else \
            npm install --no-audit --no-fund; \
        fi


FROM node:20-slim AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next.js app
ENV NODE_ENV=production
RUN npm run build


FROM node:20-slim AS runner
WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json* .npmrc* ./
RUN if [ -f package-lock.json ]; then \
            npm ci --omit=dev --no-audit --no-fund; \
        else \
            npm install --omit=dev --no-audit --no-fund; \
        fi \
    && apt-get update && apt-get install -y --no-install-recommends dumb-init \
    && rm -rf /var/lib/apt/lists/*

# Copy necessary build outputs and static assets
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./

ENV NODE_ENV=production \
    PORT=3200 \
    HOSTNAME=0.0.0.0

EXPOSE 3200

# Use a minimal init for proper signal handling
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# Start Next.js on the configured port and hostname
CMD ["npm", "run", "start", "--", "-p", "3200", "-H", "0.0.0.0"]
