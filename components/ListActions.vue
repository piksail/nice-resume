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
      :icon="isHeader ? 'pi pi-arrow-up' : 'pi pi-arrow-circle-up'"
      :aria-label="capitalize($t('toMoveUp'))"
      :variant="isHeader ? 'text' : 'text'"
      rounded
      :severity="isHeader ? 'primary' : undefined"
      size="small"
      :class="isHeader ? '' : '!h-8 !w-8 !p-0 !bg-transparent'"
      :pt:icon:class="
        isHeader ? '' : '!text-white/50 !text-xl hover:!text-white transition'
      "
      @click="$emit('moveUp')"
    />
    <Button
      v-if="listLength > 1 && index < listLength - 1"
      :icon="isHeader ? 'pi pi-arrow-down' : 'pi pi-arrow-circle-down'"
      :aria-label="capitalize($t('toMoveDown'))"
      :variant="isHeader ? 'text' : 'text'"
      rounded
      :severity="isHeader ? 'primary' : undefined"
      size="small"
      :class="isHeader ? '' : '!h-8 !w-8 !p-0 !bg-transparent'"
      :pt:icon:class="
        isHeader ? '' : '!text-white/50 !text-xl hover:!text-white transition'
      "
      @click="$emit('moveDown')"
    />
    <Button
      :icon="isHeader ? 'pi pi-times' : 'pi pi-times-circle'"
      :aria-label="capitalize($t('toRemove'))"
      :variant="isHeader ? 'text' : 'text'"
      rounded
      severity="danger"
      size="small"
      :class="isHeader ? '' : '!h-8 !w-8 !p-0 !bg-transparent'"
      :pt:icon:class="
        isHeader ? '' : '!text-white/50 !text-xl hover:!text-red-500 transition'
      "
      @click="$emit('remove')"
    />
  </div>
</template>
