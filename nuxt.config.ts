import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/styles/index.css"],
  devtools: { enabled: true },
  modules: [
    "nuxt-svgo",
    "@nuxt/eslint",
    "@nuxt/test-utils/module",
    "@nuxtjs/i18n",
    "@nuxtjs/seo",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@vueuse/nuxt",
  ],
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
  // @ts-expect-error - TS cannot find schema for Nuxt modules
  piniaPersistedstate: {
    storage: "localStorage",
  },
  site: {
    url: "https://piksail.github.io/nice-resume/",
    name: "Nice Resume",
    description: "Resume template for developers",
    indexable: false,
  },
  seo: {
    redirectToCanonicalSiteUrl: true,
  },
  i18n: {
    legacy: false,
    locale: "en",
    locales: ["en", "fr"],
    messages: {
      en: {
        welcome: "Welcome",
      },
      fr: {
        welcome: "Bienvenue",
      },
    },
  },
});
