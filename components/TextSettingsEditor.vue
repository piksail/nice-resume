<script setup lang="ts">
import type { TextSettings } from "@/types";
import { fonts, fontWeights } from "@/globals";
import Field from "@/components/Field.vue";
import { capitalize } from "@/utils/string";

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
        v-model="settings.font"
        type="select"
        :label="$t('font')"
        label-key="label"
        value-key="value"
        :items="
          ['inherit', ...fonts].map((font) => ({
            label: font === 'inherit' ? capitalize($t('default')) : font,
            value: font,
          }))
        "
      />
      <Field
        :id="`${propertyName}FontSize`"
        v-model="settings.fontSize"
        :label="$t('size')"
        type="number"
      />
      <Field
        :id="`${propertyName}LineHeight`"
        v-model="settings.lineHeight"
        :label="$t('lineHeight')"
        type="number"
        :step="0.1"
      />
      <Field
        :id="`${propertyName}LetterSpacing`"
        v-model="settings.letterSpacing"
        :label="$t('letterSpacing')"
        type="number"
      />
      <Field
        :id="`${propertyName}FontWeight`"
        v-model="settings.fontWeight"
        type="select"
        :label="$t('fontWeight')"
        :items="fontWeights"
      />
      <Field
        :id="`${propertyName}IsItalic`"
        v-model="settings.isItalic"
        :label="$t('italic')"
        type="checkbox"
      />
      <Field
        :id="`${propertyName}IsUppercase`"
        v-model="settings.isUppercase"
        :label="$t('uppercase')"
        type="checkbox"
      />
      <Field
        :id="`${propertyName}Color`"
        v-model="settings.color"
        :label="$t('color')"
        type="color"
      />
    </FormBlockRow>
  </div>
</template>
