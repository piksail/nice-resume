<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { templateSettings } from "@/globals";
import { getStringFromSeparator } from "@/utils/string";
import { getNodeStyle } from "@/utils/style";

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
    :style="getNodeStyle(settings.entryOrganization, 'text')"
  >
    <span v-if="settings.entryOrganization.beforeSeparator">
      {{ getStringFromSeparator(settings.entryOrganization.beforeSeparator) }}
    </span>
    <span>{{ entryOrganization }}</span>
  </span>
</template>
