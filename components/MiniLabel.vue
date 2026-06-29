<script setup lang="ts">
interface Props {
  label: string;
}

const { label } = defineProps<Props>();
</script>

<template>
  <p class="text-muted text-xs">{{ label }}</p>
</template>
