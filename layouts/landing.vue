<script setup lang="ts">
import type { LocaleCode } from "~/types";
import { APP_NAME, localeLabels } from "@/globals";
import { capitalize } from "@/utils/string";

const { availableLocales, locale, setLocale } = useI18n();

const localePath = useLocalePath();
</script>

<template>
  <div class="min-h-screen scroll-smooth">
    <UHeader>
      <template #title>
        <NuxtLink :to="localePath('/')">
          <p
            class="text-center text-2xl font-black tracking-tightest uppercase"
            data-testid="headerTitle"
          >
            {{ APP_NAME }}
          </p>
        </NuxtLink>
      </template>

      <template #right>
        <Field
          transparent
          type="select"
          :aria-label="$t('toSwitchLanguage')"
          :model-value="locale"
          label-key="label"
          value-key="value"
          :items="
            availableLocales.map((locale) => ({
              label: capitalize(localeLabels[locale as LocaleCode]),
              value: locale,
            }))
          "
          @update:model-value="setLocale"
        />
        <UColorModeButton size="sm" />
      </template>
    </UHeader>
    <slot />
  </div>
</template>
