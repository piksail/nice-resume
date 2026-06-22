<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useProfileStore } from "@/stores/profile";
import { APP_NAME, documentTypes, localeLabels, themes } from "@/globals";
import Field from "@/components/Field.vue";
import packageJson from "../package.json";
import ExportDialog from "~/fragments/ExportDialog.vue";
import ImportDialog from "~/fragments/ImportDialog.vue";
import StyleEditor from "~/fragments/StyleEditor.vue";
import type { LocaleCode } from "~/types";
import { capitalize } from "@/utils/string";

console.info("Version: ", packageJson.version);

const { availableLocales, locale, setLocale } = useI18n();

const localePath = useLocalePath();

const { documentType } = storeToRefs(useEditorStore());
const { theme, isThemeCustomized } = storeToRefs(useProfileStore());

function uncustomizeTheme() {
  // When user switches themes, it is expected to see the result
  // Hence the off state of the customization toggler
  isThemeCustomized.value = false;
}
</script>

<template>
  <!-- TODO use nuxtui header and move code into editor.vue layout -->
  <header class="sticky top-0 z-10 h-[80px]">
    <UDashboardToolbar class="h-full">
      <template #left>
        <UButton
          variant="link"
          :to="localePath('/')"
          class="uppercase tracking-tightest font-black text-2xl"
          size="xl"
          :data-version="packageJson.version"
        >
          {{ APP_NAME }}
        </UButton>
        <Field
          v-model="documentType"
          type="select"
          label-key="label"
          value-key="value"
          :items="
            documentTypes.map((document) => ({
              label: capitalize($t(document)),
              value: document,
            }))
          "
          icon="i-lucide-file"
        >
          <template #header>
            <div class="label text-xs font-medium px-3 pt-2 pb-0">
              {{ capitalize($t("document")) }}
            </div>
          </template>
        </Field>

        <Field
          id="theme"
          v-model="theme"
          type="select"
          label-key="label"
          value-key="value"
          :items="
            themes.map((theme) => ({
              label: theme === 'default' ? capitalize($t('default')) : theme,
              value: theme,
            }))
          "
          icon="i-lucide-swatch-book"
          @update:model-value="uncustomizeTheme"
        >
          <template #header>
            <div class="label text-xs font-medium px-3 pt-2 pb-0">
              {{ capitalize($t("theme")) }}
            </div>
          </template>
        </Field>

        <StyleEditor />
      </template>

      <template #right>
        <ImportDialog />
        <ExportDialog />
        <Field
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
    </UDashboardToolbar>
  </header>
</template>
