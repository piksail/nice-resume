<script setup lang="ts"></script>

<template>
  <section class="flex flex-col xl:flex-row">
    <slot />
    <slot name="preview" />
  </section>
</template>
