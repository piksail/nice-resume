FROM node:22.3

ENV PNPM_HOME=/workspaces/pnpm
RUN corepack enable

COPY pnpm-lock.yaml ./
RUN pnpm fetch
