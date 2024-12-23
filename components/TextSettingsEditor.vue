<script setup lang="ts">
import type { TextSettings } from "@/types";
import { fonts, fontWeights } from "@/globals";
import Field from "@/components/Field.vue";

const { propertyName, settings } = defineProps<{
  propertyName: string;
  settings: TextSettings;
}>();
</script>

<template>
  <div class="formBlock">
    <FormBlockRow :header="$t('text')">
      <Field
        :id="`${propertyName}Font`"
        type="select"
        :label="$t('font')"
        v-model="settings.font"
        optionLabel="label"
        optionValue="value"
        :options="
          ['inherit', ...fonts].map((font) => ({
            label: font === 'inherit' ? capitalize($t('default')) : font,
            value: font,
          }))
        "
      />
      <Field
        :id="`${propertyName}FontSize`"
        :label="$t('size')"
        type="number"
        v-model="settings.fontSize"
      />
      <Field
        :id="`${propertyName}LineHeight`"
        :label="$t('lineHeight')"
        type="number"
        v-model="settings.lineHeight"
        :step="0.1"
      />
      <Field
        :id="`${propertyName}LetterSpacing`"
        :label="$t('letterSpacing')"
        type="number"
        v-model="settings.letterSpacing"
      />
      <Field
        :id="`${propertyName}FontWeight`"
        type="select"
        :label="$t('fontWeight')"
        v-model="settings.fontWeight"
        :options="fontWeights"
      />
      <Field
        :id="`${propertyName}IsItalic`"
        :label="$t('italic')"
        type="checkbox"
        v-model="settings.isItalic"
      />
      <Field
        :id="`${propertyName}IsUppercase`"
        :label="$t('uppercase')"
        type="checkbox"
        v-model="settings.isUppercase"
      />
      <Field
        :id="`${propertyName}Color`"
        :label="$t('color')"
        type="color"
        v-model="settings.color"
      />
    </FormBlockRow>
  </div>
</template>
