ARG NODE_VERSION=22.11
ARG NUXT_HOST=0.0.0.0
ARG NUXT_PORT=3000

FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app
RUN npm i -g --force corepack && corepack enable && corepack prepare pnpm --activate

# Install packages first to benefit from layer caching
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=base /app/node_modules ./node_modules
COPY . .
RUN pnpm run build && pnpm store prune

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nitro

COPY --from=builder /app/.output ./.output
EXPOSE ${NUXT_PORT}
ENV NUXT_HOST=${NUXT_HOST} \
    NUXT_PORT=${NUXT_PORT} \
    NODE_ENV=PRODUCTION
USER nitro
CMD ["node", ".output/server/index.mjs"]
