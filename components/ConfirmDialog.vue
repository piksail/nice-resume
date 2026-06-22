<script lang="ts" setup>
interface ConfirmDialogProps {
  title?: string;
  description?: string;
  cancelLabel?: string;
  confirmLabel?: string;
}

defineProps<ConfirmDialogProps>();

const emits = defineEmits<{
  close: [value: boolean];
}>();
</script>

<template>
  <UModal
    :title="title"
    :description="description"
    :dismissible="false"
    :ui="{ footer: 'justify-end' }"
  >
    <template #footer>
      <UButton
        :label="capitalize(cancelLabel)"
        color="neutral"
        variant="outline"
        @click="emits('close', false)"
      />
      <UButton
        :label="capitalize(confirmLabel)"
        color="neutral"
        @click="emits('close', true)"
      />
    </template>
  </UModal>
</template>
