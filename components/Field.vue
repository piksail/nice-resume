<script setup lang="ts">
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";

const { disabled, label, id, step, transparent, type } = defineProps<{
  disabled?: boolean;
  id?: string;
  label: string;
  step?: string;
  transparent?: boolean;
  type?: string;
}>();

const model = defineModel();
</script>

<template>
  <SwitchGroup v-if="type === 'toggle'">
    <div class="flex items-center">
      <Switch
        v-model="model as boolean"
        :class="model ? 'bg-white shadow' : 'bg-black bg-opacity-10'"
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
      <SwitchLabel
        class="label cursor-pointer ml-2"
        :class="transparent ? 'opacity-60' : 'opacity-100'"
      >
        {{ label }}
      </SwitchLabel>
    </div>
  </SwitchGroup>
  <label v-else class="flex flex-col" :for="id">
    <span class="label" :class="transparent ? 'opacity-60' : 'opacity-100'">
      {{ label }}
    </span>
    <textarea
      v-if="type === 'textarea'"
      :id="id"
      class="input"
      :disabled="disabled"
      v-model="model as string"
    />
    <input
      v-else
      :id="id"
      class="input"
      :class="[
        type === 'color' && !disabled ? 'cursor-pointer' : 'cursor-auto',
        type === 'number' ? 'w-20' : 'w-auto',
        transparent ? '' : 'bg-blue-700 bg-opacity-5 text-blue-500',
      ]"
      :type="type || 'text'"
      :step="step"
      :disabled="disabled"
      v-model="model"
    />
  </label>
</template>
