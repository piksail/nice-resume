<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { ListSettings } from "@/types";
import { useProfileStore } from "@/stores/profile";
import { listMarkers } from "@/globals";
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
  <div class="flex flex-col gap-5">
    <div class="flex gap-5 flex-wrap">
      <Field
        :id="`${propertyName}Gap`"
        label="Gap"
        type="number"
        :disabled="!isThemeCustomized"
        v-model="settings.gap"
      />
      <label :for="`${propertyName}ListMarker`">
        <span class="label">List marker</span>
        <select
          :id="`${propertyName}ListMarker`"
          class="select block"
          :disabled="!isThemeCustomized"
          v-model="settings.listMarker"
        >
          <option class="option" value="">none</option>
          <option
            class="option"
            v-for="(item, index) in listMarkers"
            :key="index"
            :value="item"
          >
            {{ item }}
          </option>
        </select>
      </label>
      <!-- TODO toggle button -->
      <Field
        :id="`${propertyName}ListMarkerColor`"
        label="List marker color"
        type="color"
        :disabled="!isThemeCustomized"
        v-model="settings.listMarkerColor"
      />
    </div>
  </div>
</template>
