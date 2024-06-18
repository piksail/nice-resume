<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useProfileStore } from "@/stores/profile";
import { templateSettings } from "@/globals";
import { getNodeStyle } from "@/utils/style";

const { documentType } = storeToRefs(useEditorStore());

const { template } = storeToRefs(useProfileStore());

const { title } = defineProps<{
  title: string;
}>();

const settings = computed(() => {
  return templateSettings[template.value][documentType.value];
});
</script>

<template>
  <h2 v-if="title" :style="getNodeStyle(settings.title, 'title')">
    {{ title }}
  </h2>
</template>
