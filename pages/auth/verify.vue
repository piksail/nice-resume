<script setup lang="ts">
definePageMeta({
  layout: "landing",
});

onMounted(() => {
  navigateTo("/auth/login");
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4" />
</template>
