<script setup lang="ts">
import { storeToRefs } from "pinia";
import { getNodeClass, getNodeStyle } from "@/utils/style";
import { useEditorStore } from "@/stores/editor";
import useDocumentSettings from "~/composables/use-document-settings";

const { name } = defineProps<{
  name: string;
}>();

const { focusedInput } = storeToRefs(useEditorStore());

const settings = useDocumentSettings();
</script>

<template>
  <h1
    v-if="name"
    :class="getNodeClass('profileName', focusedInput)"
    :style="getNodeStyle(settings.name, 'title')"
  >
    {{ name }}
  </h1>
</template>
