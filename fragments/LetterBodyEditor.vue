<script setup lang="ts">
import { storeToRefs } from "pinia";
import { PlusCircleIcon } from "@heroicons/vue/24/outline";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { moveDown, moveUp, remove } from "@/utils/array";
import { focusNextInput, getSideIndexLabel } from "@/utils/editor";
import EditorCategory from "@/components/EditorCategory.vue";
import ListActions from "@/components/ListActions.vue";

const { isThemeCustomized } = storeToRefs(useProfileStore());

const { paragraphs, settings } = storeToRefs(useLetterStore());

function addParagraph() {
  paragraphs.value.push("");

  focusNextInput("#paragraphList textarea");
}
</script>

<template>
  <EditorCategory id="Body" class="w-full">
    <template v-slot:header>Body</template>
    <template v-slot:style>
      <ul class="flex flex-col gap-10 mb-4">
        <li>
          <header>
            <div class="uppercase font-bold text-lg mb-5">Paragraphs</div>
          </header>
          <div class="flex flex-col gap-5">
            <div class="flex gap-5 flex-wrap">
              <Field
                id="bodyColor"
                type="color"
                label="Color"
                :disabled="!isThemeCustomized"
                v-model="settings.body.color"
              />
              <Field
                id="bodyFontSize"
                label="Font size"
                type="number"
                :disabled="!isThemeCustomized"
                v-model="settings.body.fontSize"
              />
              <Field
                id="bodyLineHeight"
                label="Line height"
                type="number"
                :disabled="!isThemeCustomized"
                v-model="settings.body.lineHeight"
                step="0.1"
              />
              <Field
                id="bodyIndentation"
                label="Indentation"
                type="number"
                :disabled="!isThemeCustomized"
                v-model="settings.body.indentation"
              />
              <label for="bodyIsJustified">
                <input
                  id="bodyIsJustified"
                  class="input"
                  type="checkbox"
                  :disabled="!isThemeCustomized"
                  v-model="settings.body.isJustified"
                />
                <span class="opacity-60">Justified</span>
              </label>
              <label for="bodyIsSignatureRightAligned">
                <input
                  id="bodyIsSignatureRightAligned"
                  class="input"
                  type="checkbox"
                  :disabled="!isThemeCustomized"
                  v-model="settings.body.isSignatureRightAligned"
                />
                <span class="opacity-60">Signature on the right</span>
              </label>
            </div>
            <div class="flex gap-5 flex-wrap">
              <Field
                v-for="i in 4"
                :key="i"
                :id="`bodyMargin${i}`"
                :label="`Margin ${getSideIndexLabel(i)}`"
                type="number"
                :disabled="!isThemeCustomized"
                v-model="settings.body.margin[i - 1]"
              />
            </div>
          </div>
          <Field
            id="bodyGap"
            label="Gap"
            type="number"
            :disabled="!isThemeCustomized"
            v-model="settings.body.gap"
          />
        </li>
      </ul>
    </template>
    <div class="flex flex-col gap-5">
      <label class="flex flex-col" for="paragraphList">
        <div class="flex gap-2">
          <span class="opacity-60">Paragraphs</span>
          <button
            title="Add paragraph"
            class="bg-blue-500 size-7 text-white rounded-full"
            @click="addParagraph"
          >
            <PlusCircleIcon class="size-full" />
          </button>
        </div>
        <ul v-if="paragraphs.length" id="paragraphList" class="inputList">
          <li
            v-for="(_paragraph, index) in paragraphs"
            :key="index"
            class="inputListItem"
          >
            <textarea
              class="input w-[70%]"
              v-model="paragraphs[index]"
              @keydown.enter.prevent="addParagraph"
            />
            <ListActions
              class="mb-2"
              :index="index"
              :list-length="paragraphs.length"
              @moveUp="moveUp(paragraphs, index)"
              @moveDown="moveDown(paragraphs, index)"
              @remove="remove(paragraphs, index)"
            />
          </li>
        </ul>
      </label>
    </div>
  </EditorCategory>
</template>
