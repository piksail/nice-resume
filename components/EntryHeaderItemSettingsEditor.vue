<script setup lang="ts">
import type { BlockSettings, TextSettings, TextSeparator } from "@/types";
import { textSeparators } from "@/globals";
import BlockSettingsEditor from "./BlockSettingsEditor.vue";
import TextSettingsEditor from "./TextSettingsEditor.vue";
import FormBlockRow from "./FormBlockRow.vue";

const { propertyName, settings } = defineProps<{
  propertyName: string;
  settings: BlockSettings &
    TextSettings & {
      order: 1 | 2 | 3 | 4;
      beforeSeparator?: TextSeparator;
    };
}>();
</script>

<template>
  <div class="formBlock">
    <BlockSettingsEditor :property-name="propertyName" :settings="settings" />
    <TextSettingsEditor :property-name="propertyName" :settings="settings" />
    <div class="formBlock">
      <FormBlockRow>
        <Field
          :id="`${propertyName}Order`"
          v-model="settings.order"
          type="select"
          :label="$t('order')"
          :options="[1, 2, 3, 4]"
        />
        <Field
          :id="`${propertyName}TextSeparator`"
          v-model="settings.beforeSeparator"
          type="select"
          :label="$t('separator')"
          :options="['', ...textSeparators]"
        />
      </FormBlockRow>
    </div>
  </div>
</template>
