<script setup lang="ts">
const appConfig = useAppConfig();
const colorMode = useColorMode();
const appwriteStore = useAppwriteStore();
const appwrite = useAppwrite();

watchEffect(() => {
  appConfig.ui.colors.primary = colorMode.value === "light" ? "rose" : "orange";
});

onMounted(async () => {
  try {
    const res = await appwrite.ping();
    console.info("[Appwrite] ping:", res);
  } catch (e) {
    console.error("[Appwrite] ping failed:", e);
  }
  appwriteStore.initAuth();
});
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
