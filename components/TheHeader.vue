<script setup lang="ts">
import { storeToRefs } from "pinia";
import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
import { useEditorStore } from "@/stores/editor";
import { useProfileStore } from "@/stores/profile";
import { documentTypes, templates } from "@/globals";
import Field from "@/components/Field.vue";
import packageJson from "../package.json";
import ExportDialog from "~/fragments/ExportDialog.vue";
import ImportDialog from "~/fragments/ImportDialog.vue";
import StyleEditor from "~/fragments/StyleEditor.vue";

console.info("Version: ", packageJson.version);

// eslint-disable-next-line no-undef
const { availableLocales, locale, setLocale } = useI18n();

// eslint-disable-next-line no-undef
const localePath = useLocalePath();

const { documentType } = storeToRefs(useEditorStore());
const { template } = storeToRefs(useProfileStore());

// TODO enable below code and change moon/sun icon accordingly
// const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
// if (darkThemeMq.matches) {
//   // Theme set to dark.
// } else {
//   // Theme set to light.
// }

function toggleDarkMode() {
  document.documentElement.classList.toggle("dark-mode");
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
        <div class="flex gap-2 items-end h-[60%]">
          <Field
            type="selectbutton"
            :label="$t('document')"
            v-model="documentType"
            :options="documentTypes"
          />

          <Field
            id="template"
            type="select"
            :label="$t('theme')"
            v-model="template"
            :options="templates"
          />

          <StyleEditor />
        </div>
      </template>

      <template #end>
        <div class="flex gap-2 items-end h-[60%]">
          <ImportDialog />
          <ExportDialog />

          <Button
            :icon="// document.documentElement.classList.includes('dark-mode')
            //   ? 'pi pi-sun'
            //   : 'pi pi-moon'
            'pi pi-sun'"
            size="small"
            :aria-label="'todo phrase'"
            @click="toggleDarkMode"
          />
          <Field
            type="select"
            :options="availableLocales"
            :aria-label="$t('switchLanguage')"
            :model-value="locale"
            @update:model-value="setLocale"
          />
        </div>
      </template>
    </Toolbar>
  </header>
</template>
