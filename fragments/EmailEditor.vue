<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEmailStore } from "@/stores/email";
import EditorCategory from "@/components/EditorCategory.vue";
import Field from "@/components/Field.vue";

const { isDetailClickable } = storeToRefs(useEmailStore());
</script>

<template>
  <EditorCategory id="Signature">
    <template v-slot:header>Signature</template>
    <div class="flex flex-col gap-5">
      <Field
        id="isDetailClickable"
        label="Make links clickable"
        type="toggle"
        transparent
        v-model="isDetailClickable"
      />
    </div>
  </EditorCategory>
</template>
