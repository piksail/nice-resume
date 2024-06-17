<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { templateSettings } from "@/globals";

const { documentType } = storeToRefs(useEditorStore());
const { isThemeCustomized, template } = storeToRefs(useProfileStore());
const { settings: resumeStoreSettings } = storeToRefs(useResumeStore());
const { isHeaderSimple, settings: letterStoreSettings } =
  storeToRefs(useLetterStore());

const settings = computed(() => {
  if (isThemeCustomized.value) {
    return documentType.value === "letter"
      ? letterStoreSettings.value
      : resumeStoreSettings.value;
  }
  return templateSettings[template.value][documentType.value];
});
</script>

<template>
  <div
    class="relative h-full w-full flex flex-col"
    :style="{
      color: settings.document.color,
      fontFamily: settings.document.bodyFont,
      backgroundColor: settings.document.backgroundColor,
      marginTop: `${settings.document.margin[0]}px`,
      marginRight: `${settings.document.margin[1]}px`,
      marginBottom: `${settings.document.margin[2]}px`,
      marginLeft: `${settings.document.margin[3]}px`,
      borderTop: `${settings.document.borderStyle} ${settings.document.borderColor} ${settings.document.border[0]}px`,
      borderRight: `${settings.document.borderStyle} ${settings.document.borderColor} ${settings.document.border[1]}px`,
      borderBottom: `${settings.document.borderStyle} ${settings.document.borderColor} ${settings.document.border[2]}px`,
      borderLeft: `${settings.document.borderStyle} ${settings.document.borderColor} ${settings.document.border[3]}px`,
    }"
  >
    <DocumentHeader v-if="documentType === 'resume' || !isHeaderSimple" />
    <LetterBody v-if="documentType === 'letter'" />
    <ResumeBody v-else />
  </div>
</template>
