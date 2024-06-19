<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { TextSettings, TextSeparator } from "@/types";
import { useProfileStore } from "@/stores/profile";
import { textSeparators } from "@/globals";

const { propertyName, settings } = defineProps<{
  propertyName: string;
  settings: TextSettings & {
    order: 1 | 2 | 3 | 4;
    beforeSeparator?: TextSeparator;
  };
}>();

const { isThemeCustomized } = storeToRefs(useProfileStore());
</script>

<template>
  <div class="flex flex-col gap-5">
    <div class="flex gap-5 flex-wrap">
      <label :for="`${propertyName}TextSeparator`">
        <span class="opacity-60">Order</span>
        <select
          :id="`${propertyName}Order`"
          class="select block"
          :disabled="!isThemeCustomized"
          v-model="settings.order"
        >
          <option
            class="option"
            v-for="(i, index) in 4"
            :key="index"
            :value="i"
          >
            {{ i }}
          </option>
        </select>
      </label>
      <label :for="`${propertyName}TextSeparator`">
        <span class="opacity-60">Text separator</span>
        <select
          :id="`${propertyName}TextSeparator`"
          class="select block"
          :disabled="!isThemeCustomized"
          v-model="settings.beforeSeparator"
        >
          <option class="option" value="">none</option>
          <option
            class="option"
            v-for="(item, index) in textSeparators"
            :key="index"
            :value="item"
          >
            {{ item }}
          </option>
        </select>
      </label>
    </div>
  </div>
</template>
