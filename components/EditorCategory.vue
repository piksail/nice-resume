<script setup lang="ts">
import { ref } from "vue";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/24/outline";

const { id, isHidden } = defineProps<{
  id: string;
  isHidden?: boolean;
}>();

const isOpen = ref(true);

function toggleDisplay() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <div
    :id="id"
    class="flex flex-col bg-white bg-opacity-10 rounded w-full scroll-mt-8"
  >
    <header
      class="flex justify-between items-center rounded bg-white text-pink-500 p-4 md:p-6 shadow-lg"
      :class="
        isHidden ? 'bg-opacity-0 border border-white/10' : 'bg-opacity-100'
      "
    >
      <slot name="header" />
      <button
        v-if="!isHidden"
        title="Toggle display"
        class="text-pink-500 size-7 rounded-full p-1 hover:bg-blue-700 hover:bg-opacity-5"
        @click="toggleDisplay"
      >
        <ChevronUpIcon v-if="isOpen" class="size-full" />
        <ChevronDownIcon v-else class="size-full" />
      </button>
    </header>
    <div class="p-6 md:p-10" v-if="isOpen && !isHidden">
      <slot />
    </div>
  </div>
</template>
