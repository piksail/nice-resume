<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useLetterStore } from "@/stores/letter";
import Document from "@/components/Document.vue";
import DocumentHeader from "@/components/DocumentHeader.vue";
import LetterBody from "@/components/LetterBody.vue";
import ResumeBody from "@/components/ResumeBody.vue";

const { documentType } = storeToRefs(useEditorStore());

const { isHeaderSimple } = storeToRefs(useLetterStore());
</script>

<template>
  <Document>
    <DocumentHeader v-if="documentType === 'resume' || !isHeaderSimple" />
    <LetterBody v-if="documentType === 'letter'" />
    <ResumeBody v-else />
  </Document>
</template>
