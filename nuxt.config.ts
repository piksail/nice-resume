import preset from "./primevue.config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/styles/index.css"],
  devtools: { enabled: true },
  modules: [
    "@nuxt/test-utils/module",
    "@nuxtjs/i18n",
    "@nuxtjs/seo",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@primevue/nuxt-module",
    "@vueuse/nuxt",
    "nuxt-svgo",
  ],
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
    locales: ["br", "de", "en", "es", "fr", "it"],
    defaultLocale: "en",
    strategy: "prefix_and_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
    vueI18n: "./i18n.config.ts",
  },
  primevue: {
    options: {
      theme: {
        preset,
        options: {
          darkModeSelector: ".dark-mode",
        },
      },
    },
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
  compatibilityDate: "2024-07-23",
});
