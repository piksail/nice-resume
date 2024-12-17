<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEmailStore } from "@/stores/email";
import EditorCategory from "@/components/EditorCategory.vue";
import Field from "@/components/Field.vue";

// eslint-disable-next-line no-undef
const { t } = useI18n({
  useScope: "local",
});

const { isDetailClickable } = storeToRefs(useEmailStore());
</script>

<template>
  <EditorCategory id="Signature">
    <template v-slot:header>{{ capitalize($t("signature")) }}</template>
    <div class="formBlock">
      <Field
        id="isDetailClickable"
        :label="t('makeLinksClickable')"
        type="checkbox"
        v-model="isDetailClickable"
      />
    </div>
  </EditorCategory>
</template>

<i18n lang="json">
{
  "br": {
    "makeLinksClickable": "Liammoù a c'haller klikañaat"
  },
  "de": {
    "makeLinksClickable": "Links klickbar machen"
  },
  "en": {
    "makeLinksClickable": "Make links clickable"
  },
  "es": {
    "makeLinksClickable": "Hacer enlaces cliqueable"
  },
  "fr": {
    "makeLinksClickable": "Rendre les liens cliquables"
  }
}
</i18n>
