# AGENTS.md

## Project

Nuxt 4 SPA (resume/cover letter/email builder) with theme support. **SSR is disabled** — `ssr: false` in `nuxt.config.ts`. The `/editor` route is also explicitly client-only via `routeRules`.

## Stack

- **Runtime**: Node 22.20 (`.nvmrc`, `engines` in package.json)
- **Package manager**: pnpm ^9.15.2 (`packageManager` field, lockfile present)
- **Framework**: Nuxt 4, Vue 3, Pinia (persisted to localStorage via `@pinia-plugin-persistedstate/nuxt`)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite` plugin)
- **Testing**: Vitest (unit), Playwright (e2e)
- **i18n**: `@nuxtjs/i18n` — active locales are `en` and `fr` (types define more: br, de, es, fr)

## Setup

```bash
nvm use
corepack enable pnpm
pnpm install
```

`.pnpmrc` sets `NODE_OPTIONS=--max_old_space_size=3072` — needed to avoid OOM during build.

## Commands

```bash
pnpm run dev              # Dev server (default port 3000)
pnpm run build            # Production build
pnpm run preview          # Preview production build

pnpm run lint             # ESLint with --fix (cache enabled)
pnpm run lint:check       # ESLint read-only
pnpm run lint:check:all   # Lint all .ts/.vue files
pnpm run format           # Prettier --write
pnpm run format:check     # Prettier --check (cache enabled)
pnpm run format:check:all # Check all supported files
pnpm run typescript       # nuxt typecheck (vue-tsc)

pnpm run test:unit        # Vitest (excludes e2e/)
pnpm run test:playwright  # Playwright e2e — requires e2e/.test.env or e2e/.default.test.env
pnpm run coverage         # Vitest with --coverage
```

**Verification order**: `format:check` → `lint:check` → `typescript` → `test:unit` (matches CI pipeline).

## Pre-commit hooks (Husky)

- **pre-commit**: runs lint-staged — format + lint + typecheck on staged `*.{vue,ts}` files, format-only on `*.{md,html,css,json,js,yaml,yml}`
- **commit-msg**: runs commitlint with `@commitlint/config-conventional`

## Architecture

- `types/index.ts` — All shared types: `Theme`, `Font`, `Resume`, `Letter`, `Email`, `Category`, `Entry`, settings types. Single source of truth.
- `globals/index.ts` — Font arrays, theme arrays (`themeSettings`, `themeBaseSettings`), A4 constants, locale labels.
- `components/` — Document rendering (`Document.vue`, `ResumeBody.vue`, `ResumeEntry.vue`, etc.) and editor components.
- `fragments/` — Editor fragments (`ResumeEditor.vue`, `LetterEditor.vue`, `EmailEditor.vue`, `ProfileEditor.vue`, `StyleEditor.vue`).
- `stores/` — Pinia stores per domain: `resume`, `letter`, `email`, `profile`, `editor`, `appwrite`.
- `composables/` — `use-document-settings.ts`, `use-confirm-dialog.ts`, `use-appwrite.ts`, `use-document-persistence.ts`.
- `pages/` — `index.vue` (landing), `editor.vue` (main app), `auth/login.vue`, `auth/verify.vue`, `documents/index.vue`.
- `middleware/` — `auth.ts` route middleware for protecting authenticated routes.
- `server/api/pdf.post.ts` — Server-side PDF generation via puppeteer. POST JSON resume data, returns PDF.
- `i18n/i18n.config.ts` + `i18n/locales/` — Translation files.

## Theme system

Themes are defined across three places — all three must be updated together:

1. `Theme` union type in `types/index.ts`
2. Entry in `themeBaseSettings` and `themeSettings` in `globals/index.ts`
3. Component styles in `assets/styles/` (CSS)

Theme settings are structured as `{ base, resume, letter, email }` per theme. See `globals/index.ts` for full structure.

## Adding a font

1. Add to `Font` union type in `types/index.ts`
2. Add to `fonts` array in `globals/index.ts`
3. Add `@import` rule in `assets/styles/fonts.css`

## Accessibility

CI runs pa11y + axe on the preview server. Some rules are ignored in CI config (color-contrast, link-in-text-block) — don't "fix" these without team discussion.

## Appwrite integration

- Self-hosted Appwrite for user management and document persistence
- Auth is **email/password** via `account.createEmailPasswordSession()`
- Runtime config: `APPWRITE_ENDPOINT`, `APPWRITE_PROJECT_ID`, `APPWRITE_DATABASE_ID`, `APPWRITE_COLLECTION_ID`, `APPWRITE_BUCKET_ID` env vars (see `.env.example`)
- Database: `Pebr PROD` with `documents` collection
- Document structure: `{ userId, type: "CV"|"CL"|"ES", name, locale, data: JSON string, thumbnail?: string }`
- RLS is enabled — users can only access their own documents (filtered by `userId`)
- `use-appwrite.ts` — Appwrite client wrapper (auth + database CRUD + storage)
- `use-document-persistence.ts` — Collects store state into `Export` shape and saves to Appwrite
- `stores/appwrite.ts` — Pinia store for user session and document list
- `middleware/auth.ts` — Redirects unauthenticated users to `/auth/login`, redirects authenticated users away from auth pages
- Save-to-cloud UI is in `ExportDialog.vue` (appears only when logged in), includes locale selector and client-side thumbnail capture via `html2canvas`
- Thumbnails are stored as base64 data URLs in the document's `thumbnail` field (no Storage bucket access needed on free plan)
- My documents view (`pages/documents/index.vue`) groups documents by type (CV, CL, ES) with thumbnails

## Key constraints

- Puppeteer for PDF generation requires Chromium — included in Docker image via `PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser`
- Sentry sourcemaps upload expects `SENTRY_AUTH_TOKEN` env var
- Tailwind v4 uses CSS-based config (no `tailwind.config.js` content scanning for v4 — but this repo keeps the file for custom screens/animations; content paths are still respected)
- `app.vue` dynamically sets `appConfig.ui.colors.primary` based on color mode (light=rose, dark=orange)
