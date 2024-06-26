<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { templateSettings } from "@/globals";
import { getNodeStyle } from "@/utils/style";

const { documentType } = storeToRefs(useEditorStore());

const { isThemeCustomized, template } = storeToRefs(useProfileStore());

const { settings: resumeStoreSettings } = storeToRefs(useResumeStore());
const { settings: letterStoreSettings } = storeToRefs(useLetterStore());

const { about } = defineProps<{
  about: string;
}>();

const settings = computed(() => {
  const storeSettings =
    documentType.value === "letter" ? letterStoreSettings : resumeStoreSettings;
  return isThemeCustomized.value
    ? storeSettings.value
    : templateSettings[template.value][documentType.value];
});
</script>

<template>
  <p v-if="about" class="flex-1" :style="getNodeStyle(settings.about, 'title')">
    <span
      v-if="settings.aboutQuote.isShown"
      class="leading-none"
      :style="{
        fontFamily: settings.aboutQuote.font,
        fontSize: `${settings.aboutQuote.fontSize}px`,
        fontWeight: settings.aboutQuote.fontWeight,
        fontStyle: settings.aboutQuote.isItalic ? 'italic' : 'initial',
        color: settings.aboutQuote.color,
      }"
    >
      “
    </span>
    <span>{{ about }}</span>
  </p>
</template>
