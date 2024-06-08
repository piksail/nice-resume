<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useProfileStore } from "@/stores/profile";
import { templateSettings } from "@/globals";
import { getNodeStyle } from "@/utils/style";

const { documentType } = storeToRefs(useEditorStore());

const { template } = storeToRefs(useProfileStore());

const { about } = defineProps<{
  about: string;
}>();

// TODO fix below
// const settings = ref(templateSettings[template.value][documentType.value]);
console.log(documentType);
const settings = computed(() => {
  return templateSettings[template.value].resume;
});
</script>

<template>
  <p v-if="about" class="flex-1" :style="getNodeStyle(settings.about, 'title')">
    <!-- TODO this is from Tootpaste (blue quote) -->
    <span class="text-3xl text-[color:var(--resume-color1)] leading-4">“</span>
    {{ about }}
  </p>
</template>
