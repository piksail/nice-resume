<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { templateSettings } from "@/globals";
import { getNodeStyle } from "@/utils/style";

const { template } = storeToRefs(useProfileStore());

const { reference } = defineProps<{
  reference: string;
}>();

const settings = computed(() => {
  return templateSettings[template.value].letter;
});
</script>

<template>
  <h3 v-if="reference" :style="getNodeStyle(settings.reference, 'title')">
    {{ reference }}
  </h3>
</template>
