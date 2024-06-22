<script setup lang="ts">
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  XCircleIcon,
} from "@heroicons/vue/24/outline";

const { index, isHeader, listLength } = defineProps<{
  index: number;
  isHeader?: boolean;
  listLength: number;
}>();
defineEmits(["moveDown", "moveUp", "remove"]);
</script>

<template>
  <div class="flex justify-end gap-2">
    <button
      title="Move up"
      v-if="listLength > 1 && index > 0"
      class="size-7 rounded-full"
      :class="isHeader ? 'text-blue-500' : 'text-white'"
      @click="$emit('moveUp')"
    >
      <ArrowUpCircleIcon class="size-full" />
    </button>
    <button
      title="Move down"
      v-if="listLength > 1 && index < listLength - 1"
      class="size-7 rounded-full"
      :class="isHeader ? 'text-blue-500' : 'text-white'"
      @click="$emit('moveDown')"
    >
      <ArrowDownCircleIcon class="size-full" />
    </button>
    <button
      title="Remove"
      class="size-7 rounded-full"
      :class="isHeader ? 'text-pink-500' : 'bg-red-500 text-white'"
      @click="$emit('remove')"
    >
      <XCircleIcon class="size-full" />
    </button>
  </div>
</template>
