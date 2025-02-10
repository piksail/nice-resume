<script setup lang="ts">
import type { LocaleCode } from "~/types";
import { localeLabels } from "@/globals";
import { capitalize } from "@/utils/string";

// eslint-disable-next-line no-undef
const { availableLocales, locale, setLocale } = useI18n();

// eslint-disable-next-line no-undef
const localePath = useLocalePath();
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
      <Field
        class="[&_.p-select]:!bg-transparent"
        transparent
        type="select"
        :aria-label="$t('toSwitchLanguage')"
        :model-value="locale"
        optionLabel="label"
        optionValue="value"
        :options="
          availableLocales.map((locale) => ({
            label: capitalize(localeLabels[locale as LocaleCode]),
            value: locale,
          }))
        "
        @update:model-value="setLocale"
      />
    </header>
    <slot />
  </div>
</template>
