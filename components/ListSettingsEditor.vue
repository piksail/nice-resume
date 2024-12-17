<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { ListSettings } from "@/types";
import { useProfileStore } from "@/stores/profile";
import { listMarkerPositions, listMarkers } from "@/globals";
import Field from "@/components/Field.vue";

const { propertyName, settings } = defineProps<{
  propertyName: string;
  settings: ListSettings & {
    gap: number;
  };
}>();

const { isThemeCustomized } = storeToRefs(useProfileStore());
</script>

<template>
  <div class="formBlock">
    <FormBlockRow :header="$t('list')">
      <Field
        :id="`${propertyName}Gap`"
        :label="$t('gap')"
        type="number"
        :disabled="!isThemeCustomized"
        v-model="settings.gap"
      />
      <Field
        :id="`${propertyName}ListMarkerPosition`"
        :label="$t('markerPosition')"
        type="selectbutton"
        :disabled="!isThemeCustomized"
        optionLabel="label"
        optionValue="value"
        :options="
          listMarkerPositions.map((position) => ({
            label: capitalize($t(position)),
            value: position,
          }))
        "
        v-model="settings.listMarkerPosition"
      />
      <Field
        :id="`${propertyName}ListMarker`"
        :label="$t('marker')"
        type="select"
        :disabled="!isThemeCustomized"
        :options="['', ...listMarkers]"
        v-model="settings.listMarker"
      />
      <Field
        :id="`${propertyName}ListMarkerColor`"
        :label="$t('color')"
        type="color"
        :disabled="!isThemeCustomized"
        v-model="settings.listMarkerColor"
      />
    </FormBlockRow>
  </div>
</template>
