<script setup lang="ts">
import type { LocaleCode, RegionCode } from "~/types";
import RegionFlag from "~/components/RegionFlag.vue";

// eslint-disable-next-line no-undef
const { availableLocales, locale, setLocale } = useI18n();

// eslint-disable-next-line no-undef
const localePath = useLocalePath();

const regionCodeFromLocale: { [key in LocaleCode]: RegionCode } = {
  br: "br",
  de: "de",
  en: "uk",
  es: "es",
  fr: "fr",
  it: "it",
};
</script>

<template>
  <div
    class="bgGradient backdrop-contrast-200 text-white min-h-[100vh] scroll-smooth"
  >
    <header
      class="sticky top-0 z-10 h-[100px] flex justify-between items-center gap-2 px-10 text-white border-white border-b-2 border-opacity-5 backdrop-blur backdrop-filter"
    >
      <NuxtLink :to="localePath('/')">
        <p
          class="text-center text-4xl font-black tracking-widest uppercase"
          data-testid="headerTitle"
        >
          Nice
          <br />
          Resume
        </p>
      </NuxtLink>
      <div class="flex items-center gap-3 h-1/4">
        <RegionFlag
          v-for="availableLocale in availableLocales"
          :key="availableLocale"
          :code="regionCodeFromLocale[availableLocale as LocaleCode]"
          :class="`rounded-sm ${availableLocale === locale ? 'h-full ' : 'grayscale h-2/3'}  cursor-pointer hover:shadow-xl hover:grayscale-0 transition duration-75`"
          @click="setLocale(availableLocale)"
        />
      </div>
    </header>
    <slot />
  </div>
</template>
