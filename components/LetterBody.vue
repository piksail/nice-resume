<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { templateSettings } from "@/globals";
import { getNodeStyle } from "@/utils/style";
import LetterReference from "./LetterReference.vue";
import LetterSubject from "./LetterSubject.vue";

const { isThemeCustomized, name, template } = storeToRefs(useProfileStore());

const {
  settings: storeSettings,
  isHeaderSimple,
  paragraphs,
  recipientDetails,
  reference,
  senderDetails,
  subject,
} = storeToRefs(useLetterStore());

const settings = computed(() => {
  return isThemeCustomized.value
    ? storeSettings.value
    : templateSettings[template.value].letter;
});
</script>

<template>
  <ul
    v-if="isHeaderSimple"
    class="self-start"
    :style="{
      ...getNodeStyle(settings.senderDetails, 'text'),
      ...getNodeStyle(settings.senderDetails, 'block'),
    }"
  >
    <li v-for="detail in senderDetails" :key="detail">
      {{ detail }}
    </li>
  </ul>
  <ul
    v-if="recipientDetails.length"
    class="text-right self-end"
    :style="{
      ...getNodeStyle(settings.recipientDetails, 'text'),
      ...getNodeStyle(settings.recipientDetails, 'block'),
    }"
  >
    <li v-for="detail in recipientDetails" :key="detail">
      {{ detail }}
    </li>
  </ul>
  <header
    class="flex"
    :class="
      settings.reference.isBeforeSubject ? 'flex-col-reverse' : 'flex-col'
    "
  >
    <LetterSubject :subject="subject" />
    <LetterReference :reference="reference" />
  </header>
  <section
    :style="{
      fontSize: `${settings.body.fontSize}px`,
      lineHeight: settings.body.lineHeight,
      fontWeight: settings.body.fontWeight,
      textAlign: settings.body.isJustified ? 'justify' : 'left',
      color: settings.body.color,
      marginTop: `${settings.body.margin[0]}px`,
      marginRight: `${settings.body.margin[1]}px`,
      marginBottom: `${settings.body.margin[2]}px`,
      marginLeft: `${settings.body.margin[3]}px`,
    }"
  >
    <p
      v-for="(paragraph, index) in paragraphs"
      :key="index"
      :style="{
        marginBottom: `${settings.body.gap}px`,
      }"
    >
      <span
        v-if="settings.body.indentation"
        class="inline-block"
        :style="{ width: `${settings.body.indentation}px` }"
      />
      {{ paragraph }}
    </p>
    <p
      :style="{
        textAlign: settings.body.isSignatureRightAligned ? 'right' : 'left',
      }"
    >
      <span
        v-if="settings.body.indentation"
        class="inline-block"
        :style="{ width: `${settings.body.indentation}px` }"
      />
      {{ name }}
    </p>
  </section>
</template>
