<script setup lang="ts">
import Checkbox from "primevue/checkbox";
import ColorPicker from "primevue/colorpicker";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import SelectButton from "primevue/selectbutton";
import Slider from "primevue/slider";
import Textarea from "primevue/textarea";
import ToggleButton from "primevue/togglebutton";
import ToggleSwitch from "primevue/toggleswitch";
import { capitalize } from "@/utils/string";

const {
  disabled,
  label,
  helpText,
  id,
  step,
  min = 0,
  max = 100,
  options,
  optionLabel,
  optionValue,
  onLabel = "On",
  offLabel = "Off",
  type,
} = defineProps<{
  defaultValue?: string | null | undefined;
  disabled?: boolean;
  id?: string;
  label?: string;
  helpText?: string;
  options?: (string | number | null | undefined | unknown)[];
  optionLabel?: string;
  optionValue?: string;
  onLabel?: string;
  offLabel?: string;
  step?: number;
  min?: number;
  max?: number;
  type?:
    | "checkbox"
    | "checkbutton"
    | "color"
    | "number"
    | "range"
    | "select"
    | "selectbutton"
    | "textarea"
    | "toggle"
    | "togglebutton";
}>();

const model = defineModel();

function updateColor(hashlessHex: string) {
  // Primevue does not embed hash to the hex color value but it is needed for CSS
  model.value = `#${hashlessHex}`;
}
</script>

<template>
  <label v-if="type === 'range'" :for="id">
    <span class="label">{{ capitalize(label) }}</span>
    <div class="flex gap-3 items-center">
      <Slider
        :input-id="id"
        :disabled="disabled"
        class="w-36"
        :min="min"
        :max="max"
        v-model="model as number"
      />
      <output :class="`${disabled ? 'opacity-40' : 'opacity-100'}`">
        {{ model }}%
      </output>
    </div>
  </label>
  <div v-else-if="type === 'toggle'" class="flex items-center">
    <ToggleSwitch v-model="model as boolean" size="small" />
    <span class="cursor-pointer ml-2">
      {{ capitalize(label) }}
    </span>
  </div>
  <label
    v-else-if="type === 'togglebutton'"
    :for="id"
    class="flex flex-col gap-1"
  >
    <span class="label">{{ capitalize(label) }}</span>
    <ToggleButton
      v-model="model as boolean"
      :input-id="id"
      :disabled="disabled"
      :onLabel="onLabel"
      :offLabel="offLabel"
      size="small"
    />
  </label>
  <label v-else-if="type === 'checkbutton'" class="" :for="id">
    <ToggleButton
      v-model="model as boolean"
      class="w-full !justify-start !text-left"
    >
      <Checkbox
        v-model="model"
        :input-id="id"
        :disabled="disabled"
        binary
        size="small"
      />
      <div>
        <span>
          {{ capitalize(label) }}
        </span>
        <Message
          v-if="helpText"
          size="small"
          severity="secondary"
          variant="simple"
        >
          {{ helpText }}
        </Message>
      </div>
    </ToggleButton>
  </label>
  <label
    v-else-if="type === 'checkbox'"
    :for="id"
    class="flex gap-1 items-center w-fit"
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
      v-model="model"
      :options="options"
      :optionLabel="optionLabel"
      :optionValue="optionValue"
      size="small"
    />
  </label>
  <label v-else-if="type === 'select'" :for="id" class="flex flex-col gap-1">
    <span class="label">
      {{ capitalize(label) }}
    </span>
    <Select
      v-model="model"
      :options="options"
      :optionLabel="optionLabel"
      :optionValue="optionValue"
      :input-id="id"
      size="small"
    />
  </label>
  <label v-else :for="id" class="flex flex-col gap-1">
    <span class="label">
      {{ capitalize(label) }}
    </span>
    <ColorPicker
      v-if="type === 'color'"
      :input-id="id"
      :model-value="`${(model as string).replace('#', '')}`"
      size="small"
      @update:model-value="updateColor"
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
    >
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
    <Message v-if="helpText" size="small" severity="secondary" variant="simple">
      {{ helpText }}
    </Message>
  </label>
</template>
