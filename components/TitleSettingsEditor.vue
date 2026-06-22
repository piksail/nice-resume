<script setup lang="ts">
import type { TitleSettings } from "@/types";
import FormBlockRow from "./FormBlockRow.vue";
import { capitalize } from "@/utils/string";

const { propertyName, settings } = defineProps<{
  propertyName: string;
  settings: TitleSettings;
}>();
</script>

<template>
  <div class="formBlock">
    <FormBlockRow :header="$t('gradient')">
      <Field
        :id="`${propertyName}IsGradient`"
        v-model="settings.isGradient"
        :label="$t('gradient')"
        type="checkbox"
      />
      <Field
        :id="`${propertyName}FromColor`"
        v-model="settings.fromColor"
        :label="$t('color')"
        type="color"
        :disabled="!settings.isGradient"
      />
      <Field
        :id="`${propertyName}ToColor`"
        v-model="settings.toColor"
        :label="$t('color')"
        type="color"
        :disabled="!settings.isGradient"
      />
      <Field
        :id="`${propertyName}GradientAngle`"
        v-model="settings.gradientAngle"
        :label="$t('angle')"
        type="range"
        :step="5"
        :disabled="!settings.isGradient"
      />
      <UAlert
        v-if="settings.isGradient"
        size="sm"
        severity="secondary"
        variant="soft"
      >
        Choose "fit" size to fit the gradient with the characters horizontal
        length
      </UAlert>
    </FormBlockRow>
    <FormBlockRow>
      <Field
        :id="`${propertyName}Align`"
        v-model="settings.textAlign"
        type="select"
        :label="$t('alignment')"
        label-key="label"
        value-key="value"
        :items="
          ['left', 'center', 'right'].map((alignment) => ({
            label: capitalize($t(alignment)),
            value: alignment,
          }))
        "
      />
    </FormBlockRow>
    <SizeableSettingsEditor
      :property-name="propertyName"
      :settings="settings"
    />
  </div>
</template>
