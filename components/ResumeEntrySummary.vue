<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { themeSettings } from "@/globals";
import { getNodeStyle } from "@/utils/style";
import type { Category } from "~/types";

const { isThemeCustomized, theme } = storeToRefs(useProfileStore());

const { settings: storeSettings } = storeToRefs(useResumeStore());

const { focusedInput } = storeToRefs(useEditorStore());

const { categoryIndex, entrySummary, entryIndex } = defineProps<{
  categoryIndex: number;
  categoryLayout: Category["layout"];
  entrySummary: string;
  entryIndex: number;
}>();

const settings = computed(() => {
  return isThemeCustomized.value
    ? storeSettings.value
    : themeSettings[theme.value].resume;
});
</script>

<template>
  <p
    v-if="entrySummary"
    :class="
      getNodeClass(
        `categoryList${categoryIndex}EntryList${entryIndex}Summary_${categoryLayout}`,
        focusedInput,
      )
    "
    :style="{
      ...getNodeStyle(settings.entrySummary, 'text'),
      ...getNodeStyle(settings.entrySummary, 'block'),
    }"
  >
    {{ entrySummary }}
  </p>
</template>
