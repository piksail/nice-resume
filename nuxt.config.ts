import type { NuxtConfig } from "@nuxt/types";

// https://nuxt.com/docs/api/configuration/nuxt-config
const config: NuxtConfig = {
  buildModules: ["@nuxt/typescript-build"],
  css: ["@/assets/styles/index.css"],
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "nuxt-svgo",
    "@nuxt/test-utils/module",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/seo",
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
};

export default config;
