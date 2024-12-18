<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useLetterStore } from "@/stores/letter";
import useDocumentSettings from "~/composables/use-document-settings";
import DocumentHeader from "./DocumentHeader.vue";
import EmailSignature from "./EmailSignature.vue";
import LetterBody from "./LetterBody.vue";
import ResumeBody from "./ResumeBody.vue";

const { documentType } = storeToRefs(useEditorStore());
const { isHeaderSimple } = storeToRefs(useLetterStore());

const settings = useDocumentSettings();
// TODO seems like there is an error of nextTick because ctrl+s on Document.vue fixes the refresh pb
</script>

<template>
  <div
    class="relative w-full flex flex-col"
    :style="{
      color: `${settings.document.color}`,
      fontFamily: settings.document.bodyFont,
      backgroundColor: `${settings.document.backgroundColor}`,
      borderTop: `${settings.document.borderStyle} ${settings.document.borderColor} ${settings.document.border[0]}px`,
      borderRight: `${settings.document.borderStyle} ${settings.document.borderColor} ${settings.document.border[1]}px`,
      borderBottom: `${settings.document.borderStyle} ${settings.document.borderColor} ${settings.document.border[2]}px`,
      borderLeft: `${settings.document.borderStyle} ${settings.document.borderColor} ${settings.document.border[3]}px`,
      paddingTop: `${settings.document.padding[0]}px`,
      paddingRight: `${settings.document.padding[1]}px`,
      paddingBottom: `${settings.document.padding[2]}px`,
      paddingLeft: `${settings.document.padding[3]}px`,
    }"
  >
    <EmailSignature v-if="documentType === 'email'" />
    <template v-else>
      <DocumentHeader v-if="documentType === 'resume' || !isHeaderSimple" />
      <LetterBody v-if="documentType === 'letter'" />
      <ResumeBody v-else />
    </template>
  </div>
</template>
