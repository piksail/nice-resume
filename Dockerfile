ARG NODE_VERSION=22.11

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

ARG NUXT_HOST=0.0.0.0
ARG NUXT_PORT=3000
ARG SENTRY_AUTH_TOKEN=""
ENV NUXT_HOST=$NUXT_HOST
ENV NUXT_PORT=$NUXT_PORT
ENV SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN
ENV NODE_ENV=PRODUCTION

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nitro

COPY --from=builder /app/.output ./.output
EXPOSE ${NUXT_PORT}

USER nitro

CMD ["pnpm", "run", "production:sentry"]
