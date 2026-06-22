<script setup lang="ts">
import { ref } from "vue";
import Editor from "@/components/Editor.vue";
import Preview from "@/components/Preview.vue";

const title = ref("Nice resume");

// const confirm = useConfirmDialog();
</script>

<template>
  <NuxtLayout name="editor">
    <Head>
      <Title>{{ title }}</Title>
      <Meta name="description" :content="title" />
    </Head>
    <!-- TODO there used to be a confirmdialog, no use now? -->
    <Editor />
    <template #preview>
      <Preview class="hidden xl:block" />
    </template>
  </NuxtLayout>
</template>
