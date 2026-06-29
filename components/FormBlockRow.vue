<script setup lang="ts">
import { capitalize } from "@/utils/string";

const { header } = defineProps<{
  header?: string;
}>();
</script>

<template>
  <div>
    <MiniLabel v-if="header" :label="capitalize(header)" />
    <div class="flex gap-5 flex-wrap items-end">
      <slot />
    </div>
  </div>
</template>
