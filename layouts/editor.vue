<script setup lang="ts"></script>

<template>
  <section
    class="bg-surface-900 backdrop-contrast-200 flex flex-col xl:flex-row"
  >
    <slot />
    <slot name="preview" />
  </section>
</template>
