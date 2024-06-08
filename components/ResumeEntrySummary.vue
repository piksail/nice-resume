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
      backgroundColor: settings.entrySummary.backgroundColor,
      marginTop: `${settings.entrySummary.margin[0]}px`,
      marginRight: `${settings.entrySummary.margin[1]}px`,
      marginBottom: `${settings.entrySummary.margin[2]}px`,
      marginLeft: `${settings.entrySummary.margin[3]}px`,
      borderTop: `${settings.entrySummary.borderStyle} ${settings.entrySummary.borderColor} ${settings.entrySummary.border[0]}px`,
      borderRight: `${settings.entrySummary.borderStyle} ${settings.entrySummary.borderColor} ${settings.entrySummary.border[1]}px`,
      borderBottom: `${settings.entrySummary.borderStyle} ${settings.entrySummary.borderColor} ${settings.entrySummary.border[2]}px`,
      borderLeft: `${settings.entrySummary.borderStyle} ${settings.entrySummary.borderColor} ${settings.entrySummary.border[3]}px`,
      borderRadius: `${settings.entrySummary.borderRadius}px`,
      paddingTop: `${settings.entrySummary.padding[0]}px`,
      paddingRight: `${settings.entrySummary.padding[1]}px`,
      paddingBottom: `${settings.entrySummary.padding[2]}px`,
      paddingLeft: `${settings.entrySummary.padding[3]}px`,
    }"
  >
    {{ entrySummary }}
  </p>
</template>
