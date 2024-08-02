// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/styles/index.css"],
  devtools: { enabled: true },
  modules: [
    "@nuxt/test-utils/module",
    "@nuxtjs/seo",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@vueuse/nuxt",
    "nuxt-svgo",
    "@nuxtjs/i18n",
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
    locales: ["en", "fr"],
    defaultLocale: "en",
    strategy: "prefix_and_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
    vueI18n: "./i18n.config.ts",
  },
  site: {
    url: "https://nice-resume.piksail.com/",
    name: "Nice Resume",
    description: "CV/Resume template for developers",
    indexable: false,
  },
  seo: {
    redirectToCanonicalSiteUrl: true,
  },
  ogImage: { enabled: false },
  compatibilityDate: "2024-07-23",
});
