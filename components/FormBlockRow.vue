<script setup lang="ts">
import { capitalize } from "@/utils/string";

const { header } = defineProps<{
  header?: string;
}>();
</script>

<template>
  <div>
    <div v-if="header" class="text-sm font-semibold">
      {{ capitalize(header) }}
    </div>
    <div class="flex gap-5 flex-wrap items-end">
      <slot />
    </div>
  </div>
</template>
