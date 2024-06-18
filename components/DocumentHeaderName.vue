<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useProfileStore } from "@/stores/profile";
import { templateSettings } from "@/globals";
import { getNodeStyle } from "@/utils/style";

const { documentType } = storeToRefs(useEditorStore());

const { template } = storeToRefs(useProfileStore());

const { name } = defineProps<{
  name: string;
}>();

const settings = computed(() => {
  return templateSettings[template.value][documentType.value];
});
</script>

<template>
  <h1 v-if="name" :style="getNodeStyle(settings.name, 'title')">
    {{ name }}
  </h1>
</template>
