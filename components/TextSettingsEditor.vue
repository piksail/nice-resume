<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { TextSettings } from "@/types";
import { useProfileStore } from "@/stores/profile";
import { fonts, fontWeights } from "@/globals";
import Field from "@/components/Field.vue";

const { propertyName, settings } = defineProps<{
  propertyName: string;
  settings: TextSettings;
}>();

const { isThemeCustomized } = storeToRefs(useProfileStore());
</script>

<template>
  <div class="formBlock">
    <FormBlockRow :header="$t('text')">
      <Field
        :id="`${propertyName}Font`"
        type="select"
        :label="$t('font')"
        v-model="settings.font"
        :options="['inherit', ...fonts]"
        :disabled="!isThemeCustomized"
      />
      <Field
        :id="`${propertyName}FontSize`"
        :label="$t('size')"
        type="number"
        :disabled="!isThemeCustomized"
        v-model="settings.fontSize"
      />
      <Field
        :id="`${propertyName}LineHeight`"
        :label="$t('lineHeight')"
        type="number"
        :disabled="!isThemeCustomized"
        v-model="settings.lineHeight"
        :step="0.1"
      />
      <Field
        :id="`${propertyName}LetterSpacing`"
        :label="$t('letterSpacing')"
        type="number"
        :disabled="!isThemeCustomized"
        v-model="settings.letterSpacing"
      />
    </FormBlockRow>
    <FormBlockRow>
      <Field
        :id="`${propertyName}FontWeight`"
        type="select"
        :label="$t('fontWeight')"
        v-model="settings.fontWeight"
        :options="fontWeights"
        :disabled="!isThemeCustomized"
      />
      <Field
        :id="`${propertyName}IsItalic`"
        :label="$t('italic')"
        type="checkbox"
        :disabled="!isThemeCustomized"
        v-model="settings.isItalic"
      />
      <Field
        :id="`${propertyName}IsUppercase`"
        :label="$t('uppercase')"
        type="checkbox"
        :disabled="!isThemeCustomized"
        v-model="settings.isUppercase"
      />
      <Field
        :id="`${propertyName}Color`"
        :label="$t('color')"
        type="color"
        :disabled="!isThemeCustomized"
        v-model="settings.color"
      />
    </FormBlockRow>
  </div>
</template>
