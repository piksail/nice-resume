import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/styles/index.css"],
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "nuxt-svgo",
    "nuxt-build-cache",
    "@nuxt/test-utils/module",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/seo",
    "@nuxtjs/i18n",
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
    url: "https://piksail.github.io/",
    name: "Nice Resume",
    description: "CV/Resume template for developers",
    indexable: false,
  },
  seo: {
    redirectToCanonicalSiteUrl: true,
  },
  i18n: {
    legacy: false,
    locale: "en",
    locales: ["en", "fr", "br"],
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
