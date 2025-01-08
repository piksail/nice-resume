<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { themeSettings } from "@/globals";
import { getStringFromSeparator } from "@/utils/string";
import { getNodeClass, getNodeStyle } from "@/utils/style";
import type { Category } from "~/types";

const { isThemeCustomized, theme } = storeToRefs(useProfileStore());

const { settings: storeSettings } = storeToRefs(useResumeStore());

const { focusedInput } = storeToRefs(useEditorStore());

const { categoryIndex, categoryLayout, entryTitle, entryIndex } = defineProps<{
  categoryIndex: number;
  categoryLayout: Category["layout"];
  entryTitle: string;
  entryIndex: number;
}>();

const settings = computed(() => {
  return isThemeCustomized.value
    ? storeSettings.value
    : themeSettings[theme.value].resume;
});
</script>

<template>
  <span
    v-if="entryTitle"
    :class="
      getNodeClass(
        `categoryList${categoryIndex}EntryList${entryIndex}Title_${categoryLayout}`,
        focusedInput,
      )
    "
    :style="{
      ...getNodeStyle(settings.entryTitle, 'block'),
      ...getNodeStyle(settings.entryTitle, 'text'),
    }"
  >
    <span v-if="settings.entryTitle.beforeSeparator">
      {{ getStringFromSeparator(settings.entryTitle.beforeSeparator) }}
    </span>
    <span>{{ entryTitle }}</span>
  </span>
</template>
