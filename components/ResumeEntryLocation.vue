<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { themeSettings } from "@/globals";
import { getStringFromSeparator } from "@/utils/string";
import { getNodeStyle, getNodeClass } from "@/utils/style";
import type { Category } from "~/types";

const { isThemeCustomized, theme } = storeToRefs(useProfileStore());

const { settings: storeSettings } = storeToRefs(useResumeStore());

const { focusedInput } = storeToRefs(useEditorStore());

const { categoryIndex, entryLocation, entryIndex } = defineProps<{
  categoryIndex: number;
  categoryLayout: Category["layout"];
  entryLocation: string;
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
    v-if="entryLocation"
    :class="
      getNodeClass(
        `categoryList${categoryIndex}EntryList${entryIndex}Location_${categoryLayout}`,
        focusedInput,
      )
    "
    :style="{
      ...getNodeStyle(settings.entryLocation, 'block'),
      ...getNodeStyle(settings.entryLocation, 'text'),
    }"
  >
    <span v-if="settings.entryLocation.beforeSeparator">
      {{ getStringFromSeparator(settings.entryLocation.beforeSeparator) }}
    </span>
    <span>{{ entryLocation }}</span>
  </span>
</template>
