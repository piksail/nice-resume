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

const { title } = defineProps<{
  title: string;
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
  <h2 v-if="title" :style="getNodeStyle(settings.title, 'title')">
    {{ title }}
  </h2>
</template>
