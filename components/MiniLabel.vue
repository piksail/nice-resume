<script setup lang="ts">
interface Props {
  label: string;
}

defineProps<Props>();
</script>

<template>
  <p class="text-muted text-xs">{{ label }}</p>
</template>
