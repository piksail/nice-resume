<script setup lang="ts">
const appConfig = useAppConfig();
const colorMode = useColorMode();

watchEffect(() => {
  appConfig.ui.colors.primary = colorMode.value === "light" ? "rose" : "orange";
});
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
