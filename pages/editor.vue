<script setup lang="ts">
import { ref } from "vue";
import ConfirmDialog from "primevue/confirmdialog";
import Editor from "@/components/Editor.vue";
import Preview from "@/components/Preview.vue";

const title = ref("Nice resume");
</script>

<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="title" />
  </Head>
  <NuxtLayout name="editor">
    <ConfirmDialog />
    <Editor />
    <template v-slot:preview>
      <Preview class="hidden xl:block" />
    </template>
  </NuxtLayout>
</template>
