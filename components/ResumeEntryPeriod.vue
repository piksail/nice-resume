<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { templateSettings } from "@/globals";

const { isThemeCustomized, template } = storeToRefs(useProfileStore());

const { settings: storeSettings } = storeToRefs(useResumeStore());

const { entryPeriod } = defineProps<{
  entryPeriod: string;
}>();

const settings = computed(() => {
  return isThemeCustomized.value
    ? storeSettings.value
    : templateSettings[template.value].resume;
});
</script>

<template>
  <span
    v-if="entryPeriod"
    :style="{
      fontFamily: settings.entryPeriod.font,
      fontSize: `${settings.entryPeriod.fontSize}px`,
      lineHeight: settings.entryPeriod.lineHeight,
      fontWeight: settings.entryPeriod.fontWeight,
      fontStyle: settings.entryPeriod.isItalic ? 'italic' : 'initial',
      textTransform: settings.entryPeriod.isUppercase ? 'uppercase' : 'initial',
      color: settings.entryPeriod.color,
    }"
  >
    {{ entryPeriod }}
  </span>
</template>
