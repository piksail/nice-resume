<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { TitleSettings } from "@/types";
import { useProfileStore } from "@/stores/profile";
import FormBlockRow from "./FormBlockRow.vue";

const { propertyName, settings } = defineProps<{
  propertyName: string;
  settings: TitleSettings;
}>();

const { isThemeCustomized } = storeToRefs(useProfileStore());
</script>

<template>
  <div class="formBlock">
    <FormBlockRow>
      <Field
        :id="`${propertyName}Align`"
        type="select"
        :label="$t('alignment')"
        v-model="settings.textAlign"
        :options="['left', 'center', 'right']"
        :disabled="!isThemeCustomized"
      />
    </FormBlockRow>
  </div>
</template>
