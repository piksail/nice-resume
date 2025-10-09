<script setup lang="ts">
import { ref } from "vue";
import ConfirmDialog from "primevue/confirmdialog";
import Editor from "@/components/Editor.vue";
import Preview from "@/components/Preview.vue";

const title = ref("Nice resume");
</script>

<template>
  <NuxtLayout name="editor">
    <Head>
      <Title>{{ title }}</Title>
      <Meta name="description" :content="title" />
    </Head>
    <ConfirmDialog />
    <Editor />
    <template #preview>
      <Preview class="hidden xl:block" />
    </template>
  </NuxtLayout>
</template>
