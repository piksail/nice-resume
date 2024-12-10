<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { TextSettings, TextSeparator } from "@/types";
import { useProfileStore } from "@/stores/profile";
import { textSeparators } from "@/globals";
import FormBlockRow from "./FormBlockRow.vue";

const { propertyName, settings } = defineProps<{
  propertyName: string;
  settings: TextSettings & {
    order: 1 | 2 | 3 | 4;
    beforeSeparator?: TextSeparator;
  };
}>();

const { isThemeCustomized } = storeToRefs(useProfileStore());
</script>

<template>
  <div class="formBlock">
    <FormBlockRow>
      <Field
        :id="`${propertyName}Order`"
        type="select"
        :label="$t('order')"
        v-model="settings.order"
        :options="[1, 2, 3, 4]"
        :disabled="!isThemeCustomized"
      />
      <Field
        :id="`${propertyName}TextSeparator`"
        type="select"
        :label="$t('separator')"
        v-model="settings.beforeSeparator"
        :options="['', ...textSeparators]"
        :disabled="!isThemeCustomized"
      />
    </FormBlockRow>
  </div>
</template>
