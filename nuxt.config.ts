import { defineNuxtConfig } from "nuxt/config";

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
    description: "CV/Resume template for developers",
    defaultLocale: "en", // not needed if you have @nuxtjs/i18n installed
    indexable: false,
  },
  seo: {
    redirectToCanonicalSiteUrl: true,
  },
});
