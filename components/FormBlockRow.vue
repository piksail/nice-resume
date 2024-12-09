<script setup lang="ts">
const { header } = defineProps<{
  header: string;
}>();

// TODO use this component everywhere there is <div class="text-sm font-semibold"> capitalize blabla
</script>

<template>
  <div>
    <div class="text-sm font-semibold">{{ capitalize(header) }}</div>
    <div class="flex gap-5 flex-wrap">
      <slot />
    </div>
  </div>
</template>
