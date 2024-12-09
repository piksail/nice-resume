<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEmailStore } from "@/stores/email";
import EditorCategory from "@/components/EditorCategory.vue";
import Field from "@/components/Field.vue";

const { isDetailClickable } = storeToRefs(useEmailStore());
</script>

<template>
  <EditorCategory id="Signature">
    <template v-slot:header>{{ capitalize($t("signature")) }}</template>
    <div class="formBlock">
      <Field
        id="isDetailClickable"
        label="Make links clickable todo i18n"
        type="toggle"
        v-model="isDetailClickable"
      />
    </div>
  </EditorCategory>
</template>
