<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useProfileStore } from "@/stores/profile";
import { themeSettings } from "@/globals";
import { getNodeStyle } from "@/utils/style";

const { theme } = storeToRefs(useProfileStore());

const { focusedInput } = storeToRefs(useEditorStore());

const { reference } = defineProps<{
  reference: string;
}>();

const settings = computed(() => {
  return themeSettings[theme.value].letter;
});
</script>

<template>
  <h3
    v-if="reference"
    :class="getNodeClass('letterReference', focusedInput)"
    :style="getNodeStyle(settings.reference, 'title')"
  >
    {{ reference }}
  </h3>
</template>
