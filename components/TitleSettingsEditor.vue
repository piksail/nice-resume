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
        :label="$t('gradient')"
        type="checkbox"
        v-model="settings.isGradient"
      />
      <Field
        :id="`${propertyName}FromColor`"
        :label="$t('color')"
        type="color"
        v-model="settings.fromColor"
        :disabled="!settings.isGradient"
      />
      <Field
        :id="`${propertyName}ToColor`"
        :label="$t('color')"
        type="color"
        v-model="settings.toColor"
        :disabled="!settings.isGradient"
      />
      <Field
        :id="`${propertyName}GradientAngle`"
        :label="$t('angle')"
        type="range"
        :step="5"
        v-model="settings.gradientAngle"
        :disabled="!settings.isGradient"
      />
      <Message
        v-if="settings.isGradient"
        size="small"
        severity="secondary"
        variant="simple"
      >
        Choose "fit" size to fit the gradient with the characters horizontal
        length
      </Message>
    </FormBlockRow>
    <FormBlockRow>
      <Field
        :id="`${propertyName}Align`"
        type="select"
        :label="$t('alignment')"
        v-model="settings.textAlign"
        optionLabel="label"
        optionValue="value"
        :options="
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
