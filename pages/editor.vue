<script setup lang="ts">
import { ref } from "vue";
import ConfirmDialog from "primevue/confirmdialog";
// import { storeToRefs } from "pinia";
// import { useEditorStore } from "@/stores/editor";
import Editor from "@/components/Editor.vue";
import Preview from "@/components/Preview.vue";

// TODO adapt metadata according to documentType
// const { documentType } = storeToRefs(useEditorStore());

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
