<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useProfileStore } from "@/stores/profile";
import { themeSettings } from "@/globals";
import { getNodeStyle, getNodeClass } from "@/utils/style";

const { theme } = storeToRefs(useProfileStore());

const { focusedInput } = storeToRefs(useEditorStore());

const { subject } = defineProps<{
  subject: string;
}>();

const settings = computed(() => {
  return themeSettings[theme.value].letter;
});
</script>

<template>
  <h3
    v-if="subject"
    :class="getNodeClass('letterSubject', focusedInput)"
    :style="getNodeStyle(settings.subject, 'title')"
  >
    {{ subject }}
  </h3>
</template>
