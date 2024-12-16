<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { themeSettings } from "@/globals";
import { getNodeStyle } from "@/utils/style";

const { isThemeCustomized, theme } = storeToRefs(useProfileStore());

const { settings: storeSettings } = storeToRefs(useResumeStore());

const { entrySummary } = defineProps<{
  entrySummary: string;
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
    :style="{
      ...getNodeStyle(settings.entrySummary, 'text'),
      ...getNodeStyle(settings.entrySummary, 'block'),
    }"
  >
    {{ entrySummary }}
  </p>
</template>
