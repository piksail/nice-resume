<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { themeSettings } from "@/globals";
import { getNodeStyle } from "@/utils/style";

const { theme } = storeToRefs(useProfileStore());

const { reference } = defineProps<{
  reference: string;
}>();

const settings = computed(() => {
  return themeSettings[theme.value].letter;
});
</script>

<template>
  <h3 v-if="reference" :style="getNodeStyle(settings.reference, 'title')">
    {{ reference }}
  </h3>
</template>
