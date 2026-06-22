import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/styles/index.css"],
  devtools: { enabled: true },

  modules: [
    "@nuxt/eslint",
    "@nuxt/test-utils/module",
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "@nuxtjs/seo",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@sentry/nuxt/module",
    "@vueuse/nuxt",
    "nuxt-svgo",
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    public: {
      sentry: {
        dsn: process.env.SENTRY_DSN,
      },
    },
  },

  alias: {
    "~/*": "../*",
    "@/*": "../*",
  },

  ssr: false,

  app: {
    head: {
      htmlAttrs: {
        lang: "en-US",
      },
    },
    baseURL: "/",
  },

  typescript: {
    typeCheck: true,
  },

  piniaPersistedstate: {
    storage: "localStorage",
  },

  i18n: {
    // locales: ["br", "de", "en", "es", "fr", "it"], // Available locales are also computed from the keys off the i18n.config.ts "messages" object
    locales: [
      { code: "en", language: "en-US", file: "en.ts" },
      { code: "fr", language: "fr-FR", file: "fr.ts" },
    ],
    defaultLocale: "en",
    strategy: "prefix_and_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
    vueI18n: "./i18n/i18n.config.ts",
  },

  site: {
    url: "https://nice-resume.piksail.com/",
    name: "Nice Resume",
    description: "Resume builder for job applications",
    indexable: false,
  },

  seo: {
    redirectToCanonicalSiteUrl: true,
  },

  ogImage: { enabled: false },

  routeRules: {
    "/editor": { ssr: false },
  },

  compatibilityDate: "2024-07-23",

  sentry: {
    sourceMapsUploadOptions: {
      org: "piksail",
      project: "nice-resume",
      url: "https://bug.piksail.com/",
    },
  },

  sourcemap: {
    client: "hidden",
  },
});
