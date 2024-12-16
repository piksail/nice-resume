<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { themeSettings } from "@/globals";
import { getNodeStyle } from "@/utils/style";

const { theme } = storeToRefs(useProfileStore());

const { subject } = defineProps<{
  subject: string;
}>();

const settings = computed(() => {
  return themeSettings[theme.value].letter;
});
</script>

<template>
  <h3 v-if="subject" :style="getNodeStyle(settings.subject, 'title')">
    {{ subject }}
  </h3>
</template>
