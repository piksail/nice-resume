<script setup lang="ts">
import type { BlockSettings } from "@/types";
import { getSideIndexLabel } from "@/utils/editor";
import Field from "@/components/Field.vue";
import FormBlockRow from "@/components/FormBlockRow.vue";

const { propertyName, settings } = defineProps<{
  propertyName: string;
  settings: BlockSettings;
}>();
</script>

<template>
  <div class="formBlock">
    <FormBlockRow :header="$t('margin')">
      <Field
        v-for="i in 4"
        :key="i"
        :id="`${propertyName}Margin`"
        :label="$t(getSideIndexLabel(i))"
        type="number"
        v-model="settings.margin[i - 1]"
      />
    </FormBlockRow>
    <FormBlockRow :header="$t('border')">
      <Field
        v-for="i in 4"
        :key="i"
        :id="`${propertyName}Border`"
        :label="$t(getSideIndexLabel(i))"
        type="number"
        v-model="settings.border[i - 1]"
      />
      <Field
        :id="`${propertyName}BorderColor`"
        :label="$t('color')"
        type="color"
        v-model="settings.borderColor"
      />
      <Field
        :id="`${propertyName}BorderRadius`"
        :label="$t('radius')"
        type="number"
        v-model="settings.borderRadius"
      />
    </FormBlockRow>
    <FormBlockRow :header="$t('padding')">
      <Field
        v-for="i in 4"
        :key="i"
        :id="`${propertyName}Padding`"
        :label="$t(getSideIndexLabel(i))"
        type="number"
        v-model="settings.padding[i - 1]"
      />
      <Field
        :id="`${propertyName}BackgroundColor`"
        :label="$t('color')"
        type="color"
        v-model="settings.backgroundColor"
      />
    </FormBlockRow>
  </div>
</template>
