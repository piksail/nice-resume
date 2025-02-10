<script setup lang="ts">
import { storeToRefs } from "pinia";
// import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
import { useEditorStore } from "@/stores/editor";
import { useProfileStore } from "@/stores/profile";
import { documentTypes, themes } from "@/globals";
import Field from "@/components/Field.vue";
import packageJson from "../package.json";
import ExportDialog from "~/fragments/ExportDialog.vue";
import ImportDialog from "~/fragments/ImportDialog.vue";
import StyleEditor from "~/fragments/StyleEditor.vue";
import type { LocaleCode } from "~/types";
import { capitalize } from "@/utils/string";

console.info("Version: ", packageJson.version);

// eslint-disable-next-line no-undef
const { availableLocales, locale, setLocale } = useI18n();

// eslint-disable-next-line no-undef
const localePath = useLocalePath();

const { documentType } = storeToRefs(useEditorStore());
const { theme, isThemeCustomized } = storeToRefs(useProfileStore());

const localeLabel: { [key in LocaleCode]: string } = {
  br: "Brezhoneg",
  de: "Deutsch",
  en: "English",
  es: "Español",
  fr: "Français",
  it: "Italiano",
};

// TODO enable below code and change moon/sun icon accordingly
// const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
// if (darkThemeMq.matches) {
//   // Theme set to dark.
// } else {
//   // Theme set to light.
// }

// function toggleDarkMode() {
//   document.documentElement.classList.toggle("dark-mode");
// }

function uncustomizeTheme() {
  // When user switches themes, it is expected to see the result
  // Hence the off state of the customization toggler
  isThemeCustomized.value = false;
}
</script>

<template>
  <header class="sticky top-0 z-10 h-[80px]">
    <Toolbar class="h-full !border-none shadow">
      <template #start>
        <NuxtLink :to="localePath('/')">
          <h1
            class="bgGradient textGradient text-center text-2xl leading-none"
            :data-version="packageJson.version"
          >
            Nice
            <br />
            Resume
          </h1>
        </NuxtLink>
      </template>

      <template #center>
        <div class="flex gap-5 items-end h-[60%]">
          <Field
            type="select"
            v-model="documentType"
            optionLabel="label"
            optionValue="value"
            :options="
              documentTypes.map((document) => ({
                label: capitalize($t(document)),
                value: document,
              }))
            "
          >
            <template #dropdownicon>
              <i class="pi pi-file" />
            </template>
            <template #header>
              <div class="label text-xs font-medium px-3 pt-2 pb-0">
                {{ capitalize($t("document")) }}
              </div>
            </template>
          </Field>

          <Field
            id="theme"
            type="select"
            v-model="theme"
            optionLabel="label"
            optionValue="value"
            :options="
              themes.map((theme) => ({
                label: theme === 'default' ? capitalize($t('default')) : theme,
                value: theme,
              }))
            "
            @update:model-value="uncustomizeTheme"
          >
            <template #dropdownicon>
              <i class="pi pi-palette" />
            </template>
            <template #header>
              <div class="label text-xs font-medium px-3 pt-2 pb-0">
                {{ capitalize($t("theme")) }}
              </div>
            </template>
          </Field>

          <StyleEditor />
        </div>
      </template>

      <template #end>
        <div class="flex gap-2 items-end h-[60%]">
          <ImportDialog />
          <ExportDialog />

          <!-- <Button
            :icon="// document.documentElement.classList.includes('dark-mode')
            //   ? 'pi pi-sun'
            //   : 'pi pi-moon'
            'pi pi-sun'"
            size="small"
            :aria-label="'TODO phrase'"
            @click="toggleDarkMode"
          /> -->
          <Field
            type="select"
            :aria-label="$t('toSwitchLanguage')"
            :model-value="locale"
            optionLabel="label"
            optionValue="value"
            :options="
              availableLocales.map((locale) => ({
                label: capitalize(localeLabel[locale as LocaleCode]),
                value: locale,
              }))
            "
            @update:model-value="setLocale"
          />
        </div>
      </template>
    </Toolbar>
  </header>
</template>
