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
