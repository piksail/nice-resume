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

const { categoryIndex, entryPeriod, entryIndex } = defineProps<{
  categoryIndex: number;
  categoryLayout: Category["layout"];
  entryPeriod: string;
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
    v-if="entryPeriod"
    :class="
      getNodeClass(
        `categoryList${categoryIndex}EntryList${entryIndex}Period_${categoryLayout}`,
        focusedInput,
      )
    "
    :style="{
      ...getNodeStyle(settings.entryPeriod, 'block'),
      ...getNodeStyle(settings.entryPeriod, 'text'),
    }"
  >
    <span v-if="settings.entryPeriod.beforeSeparator">
      {{ getStringFromSeparator(settings.entryPeriod.beforeSeparator) }}
    </span>
    <span>{{ entryPeriod }}</span>
  </span>
</template>
