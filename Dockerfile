ARG NODE_VERSION=22.5
ARG NUXT_HOST=0.0.0.0
ARG NUXT_PORT=3000

FROM node:${NODE_VERSION}-alpine as base
WORKDIR /app
RUN corepack enable pnpm
# Install packages first to benefit from layer caching
COPY pnpm-lock.yaml package.json ./

FROM base AS prod-deps
RUN pnpm install --frozen-lockfile --prod

FROM base AS build-deps
RUN pnpm install --frozen-lockfile

FROM build-deps AS build
COPY . .
RUN pnpm run build && pnpm store prune

FROM base AS runtime
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nitro
EXPOSE ${NUXT_PORT}
ENV NUXT_HOST=${NUXT_HOST} \
    NUXT_PORT=${NUXT_PORT} \
    NODE_ENV=PRODUCTION
USER nitro
CMD ["node", ".output/server/index.mjs"]
