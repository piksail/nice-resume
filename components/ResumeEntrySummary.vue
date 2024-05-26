<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { templateSettings } from "@/globals";

const { isThemeCustomized, template } = storeToRefs(useProfileStore());

const { settings: storeSettings } = storeToRefs(useResumeStore());

const { entrySummary } = defineProps<{
  entrySummary: string;
}>();

const settings = computed(() => {
  return isThemeCustomized.value
    ? storeSettings.value
    : templateSettings[template.value].resume;
});
</script>

<template>
  <p
    v-if="entrySummary"
    :style="{
      fontFamily: settings.entrySummary.font,
      fontSize: `${settings.entrySummary.fontSize}px`,
      lineHeight: settings.entrySummary.lineHeight,
      fontWeight: settings.entrySummary.fontWeight,
      fontStyle: settings.entrySummary.isItalic ? 'italic' : 'initial',
      textTransform: settings.entrySummary.isUppercase
        ? 'uppercase'
        : 'initial',
      color: settings.entrySummary.color,
    }"
  >
    {{ entrySummary }}
  </p>
</template>
