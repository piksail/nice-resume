<script setup lang="ts">
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";

const { disabled, label, id, step, type } = defineProps<{
  disabled?: boolean;
  id?: string;
  label: string;
  step?: string;
  type?: string;
}>();

const model = defineModel();
</script>

<template>
  <SwitchGroup v-if="type === 'toggle'">
    <div class="flex items-center">
      <Switch
        v-model="model as boolean"
        :class="model ? 'bg-white' : 'bg-black bg-opacity-10'"
        class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
      >
        <span
          :class="
            model
              ? 'bg-gradient-to-br from-blue-700 to-pink-500 translate-x-6'
              : 'bg-white translate-x-1'
          "
          class="inline-block h-4 w-4 transform rounded-full transition-transform"
        />
      </Switch>
      <SwitchLabel class="label ml-2">{{ label }}</SwitchLabel>
    </div>
  </SwitchGroup>
  <label v-else class="flex flex-col" :for="id">
    <span class="label">{{ label }}</span>
    <input
      :id="id"
      class="input"
      :class="{
        'cursor-pointer': type === 'color' && !disabled,
        'w-20': type === 'number',
      }"
      :type="type || 'text'"
      :step="step"
      :disabled="disabled"
      v-model="model"
    />
  </label>
</template>
