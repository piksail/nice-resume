<script setup lang="ts">
const { inverted } = defineProps<{
  inverted?: boolean;
}>();

defineEmits(["click"]);
</script>

<template>
  <button
    class="button flex items-center justify-center gap-1"
    :class="
      inverted ? 'bg-gradient-to-br from-blue-700 to-pink-500' : 'bg-white'
    "
    @click="$emit('click')"
  >
    <!-- indigo-700 imitates the gradient start -->
    <span :class="inverted ? 'text-white' : 'text-indigo-700'">
      <slot name="startIcon" />
    </span>
    <span
      class="buttonLabel"
      :class="
        inverted
          ? 'text-white'
          : 'textGradient font-black tracking-widest uppercase'
      "
    >
      <slot />
    </span>
    <!-- fuchsia-700 imitates the gradient end -->
    <span :class="inverted ? 'text-white' : 'text-fuchsia-700'">
      <slot name="endIcon" />
    </span>
  </button>
</template>
