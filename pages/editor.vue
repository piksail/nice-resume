<script setup lang="ts">
import { ref } from "vue";
import Editor from "@/components/Editor.vue";
import Preview from "@/components/Preview.vue";
import { APP_NAME } from "~/globals";

const title = ref(APP_NAME);
</script>

<template>
  <NuxtLayout name="editor">
    <Head>
      <Title>{{ title }}</Title>
      <Meta name="description" :content="title" />
    </Head>
    <Editor />
    <template #preview>
      <Preview class="hidden xl:block" />
    </template>
  </NuxtLayout>
</template>
