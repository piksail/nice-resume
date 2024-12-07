<script setup lang="ts">
import Checkbox from "primevue/checkbox";
import ColorPicker from "primevue/colorpicker";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import SelectButton from "primevue/selectbutton";
import Textarea from "primevue/textarea";
import ToggleButton from "primevue/togglebutton";
import ToggleSwitch from "primevue/toggleswitch";
import { capitalize } from "@/utils/string";

const { defaultValue, disabled, label, id, step, options, type } = defineProps<{
  defaultValue?: string | null | undefined;
  disabled?: boolean;
  id?: string;
  label?: string;
  options?: (string | number | null | undefined)[];
  step?: number;
  subLabel?: string;
  type?:
    | "checkbox"
    | "checkbutton"
    | "color"
    | "number"
    | "select"
    | "selectbutton"
    | "textarea"
    | "toggle"
    | "togglebutton";
}>();

const model = defineModel();
const emit = defineEmits(["value-change"]);
</script>

<template>
  <div v-if="type === 'toggle'" class="flex items-center">
    <ToggleSwitch v-model="model as boolean" size="small" />
    <span class="cursor-pointer ml-2">
      {{ capitalize(label) }}
    </span>
  </div>
  <div v-else-if="type === 'togglebutton'" class="flex items-center">
    <ToggleButton
      v-model="model as boolean"
      onLabel="On"
      offLabel="Off"
      size="small"
    />
    <span class="label cursor-pointer ml-2">
      {{ capitalize(label) }}
    </span>
  </div>
  <label
    v-else-if="type === 'checkbutton'"
    class="button bgGradient p-[2px] group"
    :for="id"
  >
    <div
      class="button bg-white h-full w-full rounded-sm justify-start group-hover:bg-transparent"
      :class="[!disabled ? 'cursor-pointer' : 'cursor-auto']"
    >
      <Checkbox
        v-model="model"
        :input-id="id"
        :disabled="disabled"
        binary
        size="small"
      />
      <div class="flex flex-col ml-2">
        <span
          class="label text-blue-500 group-hover:text-white"
          :class="[!disabled ? 'cursor-pointer' : 'cursor-auto']"
        >
          {{ capitalize(label) }}
        </span>
        <span class="text-sm group-hover:text-white">{{ subLabel }}</span>
      </div>
    </div>
  </label>
  <label
    v-else-if="type === 'checkbox'"
    :for="id"
    class="flex gap-1 items-center"
  >
    <Checkbox
      v-model="model"
      :input-id="id"
      binary
      :disabled="disabled"
      size="small"
    />
    <span
      class="label text-sm text-primary"
      :class="[!disabled ? 'cursor-pointer' : 'cursor-auto']"
    >
      {{ capitalize(label) }}
    </span>
  </label>
  <label
    v-else-if="type === 'selectbutton'"
    :for="id"
    class="flex flex-col gap-1"
  >
    <span class="label">{{ capitalize(label) }}</span>
    <SelectButton
      :default-value="defaultValue"
      v-model="model"
      :options="options"
      size="small"
      @value-change="(...args) => emit('value-change', ...args)"
    />
  </label>
  <label v-else-if="type === 'select'" :for="id" class="flex flex-col gap-1">
    <span class="label">
      {{ capitalize(label) }}
    </span>
    <Select
      :default-value="defaultValue ?? model"
      v-model="model"
      :options="options"
      :input-id="id"
      size="small"
      @value-change="(...args) => emit('value-change', ...args)"
    />
  </label>
  <label v-else :for="id" class="flex flex-col gap-1">
    <span class="label">
      {{ capitalize(label) }}
    </span>
    <ColorPicker
      v-if="type === 'color'"
      :input-id="id"
      v-model="model"
      size="small"
    />
    <Textarea
      v-else-if="type === 'textarea'"
      :id="id"
      :disabled="disabled"
      v-model="model as string"
      size="small"
    />
    <InputNumber
      v-else-if="type === 'number'"
      v-model="model as number"
      :input-id="id"
      :disabled="disabled"
      showButtons
      buttonLayout="horizontal"
      :step="step"
      size="small"
      inputClass="!w-12"
      incrementButtonClass="!w-7"
      decrementButtonClass="!w-7"
    >
      <!-- TODO style en passant par inputnumber dans nuxtconfig -->
      <template #incrementicon>
        <span class="pi pi-plus" />
      </template>
      <template #decrementicon>
        <span class="pi pi-minus" />
      </template>
    </InputNumber>
    <InputText
      v-else
      :id="id"
      :type="type || 'text'"
      :disabled="disabled"
      v-model="model as string"
      size="small"
    />
  </label>
</template>
