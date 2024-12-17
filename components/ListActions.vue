<script setup lang="ts">
const { index, isHeader, listLength } = defineProps<{
  index: number;
  isHeader?: boolean;
  listLength: number;
}>();

defineEmits(["moveDown", "moveUp", "remove"]);
</script>

<template>
  <div class="flex justify-end gap-2">
    <Button
      v-if="listLength > 1 && index > 0"
      icon="pi pi-arrow-up"
      :aria-label="capitalize($t('toMoveUp'))"
      :variant="isHeader ? 'text' : 'text'"
      rounded
      :severity="isHeader ? 'primary' : undefined"
      size="small"
      @click="$emit('moveUp')"
    />
    <Button
      v-if="listLength > 1 && index < listLength - 1"
      icon="pi pi-arrow-down"
      :aria-label="capitalize($t('toMoveDown'))"
      :variant="isHeader ? 'text' : 'text'"
      rounded
      :severity="isHeader ? 'primary' : undefined"
      size="small"
      @click="$emit('moveDown')"
    />
    <Button
      icon="pi pi-times"
      :aria-label="capitalize($t('toRemove'))"
      :variant="isHeader ? 'text' : 'text'"
      rounded
      severity="danger"
      size="small"
      @click="$emit('remove')"
    />
  </div>
</template>
