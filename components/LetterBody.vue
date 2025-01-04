<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { themeSettings } from "@/globals";
import { getNodeStyle, getNodeClass } from "@/utils/style";
import LetterReference from "./LetterReference.vue";
import LetterSubject from "./LetterSubject.vue";

const { isThemeCustomized, name, theme } = storeToRefs(useProfileStore());

const { focusedInput } = storeToRefs(useEditorStore());

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
    : themeSettings[theme.value].letter;
});
</script>

<template>
  <ul
    v-if="isHeaderSimple"
    class="flex flex-col self-start"
    :style="{
      ...getNodeStyle(settings.senderDetails, 'text'),
      ...getNodeStyle(settings.senderDetails, 'block'),
      gap: `${settings.senderDetails.gap}px`,
    }"
  >
    <li
      v-for="(detail, index) in senderDetails"
      :key="detail"
      :class="getNodeClass(`senderDetailList${index}`, focusedInput)"
    >
      {{ detail }}
    </li>
  </ul>
  <ul
    v-if="recipientDetails.length"
    class="flex flex-col text-right self-end"
    :style="{
      ...getNodeStyle(settings.recipientDetails, 'text'),
      ...getNodeStyle(settings.recipientDetails, 'block'),
      gap: `${settings.recipientDetails.gap}px`,
    }"
  >
    <li
      v-for="(detail, index) in recipientDetails"
      :key="detail"
      :class="getNodeClass(`recipientDetailList${index}`, focusedInput)"
    >
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
      lineHeight: settings.body.lineHeight ?? 'normal',
      fontWeight: settings.body.fontWeight,
      textAlign: settings.body.isJustified ? 'justify' : 'left',
      color: `${settings.body.color}`,
      marginTop: `${settings.body.margin[0]}px`,
      marginRight: `${settings.body.margin[1]}px`,
      marginBottom: `${settings.body.margin[2]}px`,
      marginLeft: `${settings.body.margin[3]}px`,
    }"
  >
    <p
      v-for="(paragraph, index) in paragraphs"
      :key="index"
      :class="getNodeClass(`paragraphList${index}`, focusedInput)"
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
