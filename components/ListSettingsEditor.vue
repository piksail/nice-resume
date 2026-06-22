<script setup lang="ts">
import type { ListSettings } from "@/types";
import { listMarkerPositions, listMarkers } from "@/globals";
import Field from "@/components/Field.vue";
import { capitalize } from "@/utils/string";

const { propertyName, settings } = defineProps<{
  propertyName: string;
  settings: ListSettings & {
    gap: number;
  };
}>();
</script>

<template>
  <div class="formBlock">
    <FormBlockRow :header="$t('list')">
      <Field
        :id="`${propertyName}Gap`"
        v-model="settings.gap"
        :label="$t('gap')"
        type="number"
      />
      <Field
        :id="`${propertyName}ListMarkerPosition`"
        v-model="settings.listMarkerPosition"
        :label="$t('markerPosition')"
        type="selectbutton"
        label-key="label"
        value-key="value"
        :items="
          listMarkerPositions.map((position) => ({
            label: capitalize($t(position)),
            value: position,
          }))
        "
      />
      <Field
        :id="`${propertyName}ListMarker`"
        v-model="settings.listMarker"
        :label="$t('marker')"
        type="select"
        :items="['', ...listMarkers]"
      />
      <Field
        :id="`${propertyName}ListMarkerColor`"
        v-model="settings.listMarkerColor"
        :label="$t('color')"
        type="color"
      />
    </FormBlockRow>
  </div>
</template>
