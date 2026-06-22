<script setup lang="ts">
interface ConfirmDialogProps {
  label: string;
}

defineProps<ConfirmDialogProps>();
</script>

<template>
  <p class="text-muted text-xs">{{ label }}</p>
</template>
