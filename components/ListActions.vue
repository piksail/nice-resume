<script setup lang="ts">
import { capitalize } from "@/utils/string";

const { index, isHeader, listLength } = defineProps<{
  index: number;
  isHeader?: boolean;
  listLength: number;
}>();

defineEmits(["moveDown", "moveUp", "remove"]);
</script>

<template>
  <div class="flex justify-end gap-2">
    <UButton
      v-if="listLength > 1 && index > 0"
      :icon="isHeader ? 'i-lucide-arrow-up' : 'i-lucide-circle-arrow-up'"
      :aria-label="capitalize($t('toMoveUp'))"
      :variant="isHeader ? 'ghost' : 'ghost'"
      rounded
      :severity="isHeader ? 'primary' : undefined"
      size="sm"
      @click="$emit('moveUp')"
    />
    <UButton
      v-if="listLength > 1 && index < listLength - 1"
      :icon="isHeader ? 'i-lucide-arrow-down' : 'i-lucide-circle-arrow-down'"
      :aria-label="capitalize($t('toMoveDown'))"
      :variant="isHeader ? 'ghost' : 'ghost'"
      rounded
      :severity="isHeader ? 'primary' : undefined"
      size="sm"
      @click="$emit('moveDown')"
    />
    <UButton
      :icon="isHeader ? 'i-lucide-x' : 'i-lucide-circle-x'"
      :aria-label="capitalize($t('toRemove'))"
      :variant="isHeader ? 'ghost' : 'ghost'"
      rounded
      severity="danger"
      size="sm"
      @click="$emit('remove')"
    />
  </div>
</template>
