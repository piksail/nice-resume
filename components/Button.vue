<script setup lang="ts">
defineEmits(["click"]);
// TODO improve to accept icon and retrieve .button and .buttonLabel from tailwind to here
</script>

<template>
  <button class="button" @click="$emit('click')">
    <span class="buttonLabel">
      <slot />
    </span>
  </button>
</template>
