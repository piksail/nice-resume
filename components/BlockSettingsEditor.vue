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
        :id="`${propertyName}Margin`"
        :key="i"
        v-model="settings.margin[i - 1]"
        :label="$t(getSideIndexLabel(i))"
        type="number"
      />
    </FormBlockRow>
    <FormBlockRow :header="$t('border')">
      <Field
        v-for="i in 4"
        :id="`${propertyName}Border`"
        :key="i"
        v-model="settings.border[i - 1]"
        :label="$t(getSideIndexLabel(i))"
        type="number"
      />
      <Field
        :id="`${propertyName}BorderColor`"
        v-model="settings.borderColor"
        :label="$t('color')"
        type="color"
      />
      <Field
        :id="`${propertyName}BorderRadius`"
        v-model="settings.borderRadius"
        :label="$t('radius')"
        type="number"
      />
    </FormBlockRow>
    <FormBlockRow :header="$t('padding')">
      <Field
        v-for="i in 4"
        :id="`${propertyName}Padding`"
        :key="i"
        v-model="settings.padding[i - 1]"
        :label="$t(getSideIndexLabel(i))"
        type="number"
      />
      <Field
        :id="`${propertyName}BackgroundColor`"
        v-model="settings.backgroundColor"
        :label="$t('color')"
        type="color"
      />
    </FormBlockRow>
  </div>
</template>
