# Nice Resume

![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat) ![GitHub CI](https://github.com/Piksail/nice-resume/actions/workflows/deploy.yaml/badge.svg)

![GitHub Pages badge](https://img.shields.io/badge/GitHub_Pages-222222?logo=github&logoColor=white) ![Nuxt badge](https://img.shields.io/badge/Nuxt-00DC82?logo=nuxtdotjs&logoColor=white) ![Tailwind CSS badge](https://img.shields.io/badge/Tailwind_CSS_-0ea5e9?logo=tailwindcss&logoColor=white) ![Conventional commits badge](https://img.shields.io/badge/Conventional_commits-fa6673?logo=conventionalcommits&logoColor=white) ![ESLint badge](https://img.shields.io/badge/ESLint-4b32c3?logo=eslint&logoColor=white)

Edit your resume and your cover letter, choose a nice theme and save your work for the next time.

This is a [Nuxt](https://nuxt.com/) project bootstrapped with Nuxi.

[See it live](https://piksail.github.io/nice-resume/).

## Why yet another tool?

Most of the available tools are either :

- institutional (they will not be able to serve all application purposes)
- dev-oriented (they will not be able to serve most domain applications)
- social networks (companies still expect an attachment in the applications, not just an online profile)
- needing payments (we believe this service should be free)
- needing registration (we believe this service should not)
- attached to a job marketplace
- not customizable enough (they will not help you stand out from other applicants)
- hard to properly customizable (they will not be able to prevent broken design and inconsistencies)
- needing too many actions (they will not access preview after several question answerings and form fillings)

So far, tools we believe are best out there are :

- [Adecco CV](creation-cv.adecco.fr)
- [Canva](www.canva.com)
- [CV.fr](www.cv.fr)
- [Enhancv](enhancv.com)
- [FlowCV](flowcv.com)
- [Open Resume](www.open-resume.com)

...but they all fall into one of the points above. With Nice Resume, we try to provide a fast and easy, direct-preview, fully-customizable, theme-helped, free and registrationless experience that will serve all kinds of applications.

[Here is a more comprehensive list of tools](/SIMILAR-TOOLS.md)

## Technical

### Resources

- [Heroicons](https://heroicons.com/)
- [i18n](https://www.i18next.com/)
- [JSON Resume](https://jsonresume.org/)
- [Nuxt](https://nuxt.com/)
- [PrimeVue](https://primevue.org/)
- [Simple Icons](https://simpleicons.org/) (for brand icons) through [Vue3 Simple Icons](https://vue3-simple-icons.wyatt-herkamp.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vue](https://vuejs.org/)
- [Wikipedia](https://en.wikipedia.org/wiki/Main_Page) (for region flags)

### Prerequisites

- [Node](https://nodejs.org/en/)

### Project setup

```bash
nvm use
corepack enable pnpm
pnpm install
```

### Compile and Hot-Reload for Development

```bash
pnpm run dev
```

Compile and Minify for Production

```bash
# Preview production build
pnpm run build
pnpm run preview
```

### Tests

<https://nuxt.com/docs/getting-started/testing>

```bash
pnpm run test:unit
```

#### Playwright end-to-end

```bash
# Create and configure `./test/.env` based on `./test/default.env` if needed
pnpm run test:playwright
```

[Test recording generation with Playwright](https://playwright.dev/docs/codegen)

### Add a theme

1. Add the name in the theme union type in `/types`
2. Add the name in the themes array in `/globals`
3. Add the base settings in the themeBaseSettings object in `/globals` and override them in the themeSettings object

Make sure the above steps rely on the same theme name.

### Use a theme

Themes offer an aside section on the left and a main section on the right that can be split into two columns. Select _Aside_, _Full_ or _Half_ to place content accordingly.

Some themes come from other tools:

- _Elegant_ is the theme from [JSON Resume](https://registry.jsonresume.org/thomasdavis?theme=elegant) by Mudassir Ali
- _Kendall_ is the theme from [JSON Resume](https://registry.jsonresume.org/thomasdavis?theme=kendall) by Adam Kendall
- _Macchiato_ is the theme from [JSON Resume](https://registry.jsonresume.org/thomasdavis?theme=macchiato) by Alessandro Biondi
- _OpenResume_ is the theme from [OpenResume](https://www.open-resume.com/)
- _Paper_ is adapted from the _One Page Plus_ theme from [JSON Resume](https://registry.jsonresume.org/thomasdavis?theme=onepage-plus)

### Docker

```bash
# Pull and run
docker run \
    --rm \
    -p 3000:3000 \
    ghcr.io/piksail/nice-resume:latest

# Build and run
docker build -t nice-resume:local .
docker run \
    --rm \
    -p 3000:3000 \
    nice-resume:local
```

### Troubleshooting

```sh
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
```

- Delete `.nuxt` and `/tmp/nitro`
- Increase memory in `.pnpmrc`
