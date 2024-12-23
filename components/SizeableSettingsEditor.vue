<script setup lang="ts">
import type { SizeableSettings } from "@/types";
import FormBlockRow from "./FormBlockRow.vue";

const { propertyName, settings } = defineProps<{
  propertyName: string;
  settings: SizeableSettings;
}>();
</script>

<template>
  <div class="formBlock">
    <FormBlockRow :header="$t('size')">
      <Field
        :id="`${propertyName}WidthType`"
        type="selectbutton"
        v-model="settings.widthType"
        optionLabel="label"
        optionValue="value"
        :options="
          ['auto', 'fit-content', 'custom'].map((type) => {
            if (type === 'fit-content') {
              return {
                label: capitalize($t('fit')),
                value: type,
              };
            }
            if (type === 'custom') {
              return {
                label: capitalize($t('measure')),
                value: type,
              };
            }
            return {
              label: capitalize($t(`${type}`)),
              value: type,
            };
          })
        "
      />
      <Field
        :id="`${propertyName}Width`"
        type="range"
        :label="$t('width')"
        v-model="settings.width"
        :disabled="settings.widthType !== 'custom'"
      />
    </FormBlockRow>
  </div>
</template>
