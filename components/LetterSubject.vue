<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { templateSettings } from "@/globals";
import { getNodeStyle } from "@/utils/style";

const { template } = storeToRefs(useProfileStore());

const { subject } = defineProps<{
  subject: string;
}>();

const settings = computed(() => {
  return templateSettings[template.value].letter;
});
</script>

<template>
  <h3 v-if="subject" :style="getNodeStyle(settings.subject, 'title')">
    {{ subject }}
  </h3>
</template>
