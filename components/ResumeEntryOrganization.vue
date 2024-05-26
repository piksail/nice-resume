<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { templateSettings } from "@/globals";

const { isThemeCustomized, template } = storeToRefs(useProfileStore());

const { settings: storeSettings } = storeToRefs(useResumeStore());

const { entryOrganization } = defineProps<{
  entryOrganization: string;
}>();

const settings = computed(() => {
  return isThemeCustomized.value
    ? storeSettings.value
    : templateSettings[template.value].resume;
});
</script>

<template>
  <span
    v-if="entryOrganization"
    :style="{
      fontFamily: settings.entryOrganization.font,
      fontSize: `${settings.entryOrganization.fontSize}px`,
      lineHeight: settings.entryOrganization.lineHeight,
      fontWeight: settings.entryOrganization.fontWeight,
      fontStyle: settings.entryOrganization.isItalic ? 'italic' : 'initial',
      textTransform: settings.entryOrganization.isUppercase
        ? 'uppercase'
        : 'initial',
      color: settings.entryOrganization.color,
    }"
  >
    {{ entryOrganization }}
  </span>
</template>
