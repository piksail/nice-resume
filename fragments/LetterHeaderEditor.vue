<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import {
  IdentificationIcon,
  PaintBrushIcon,
  PlusCircleIcon,
} from "@heroicons/vue/24/outline";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { moveDown, moveUp, remove } from "@/utils/array";
import { focusNextInput, getSideIndexLabel } from "@/utils/editor";
import { fonts } from "@/globals";
import EditorCategory from "@/components/EditorCategory.vue";
import ListActions from "@/components/ListActions.vue";

const { isThemeCustomized } = storeToRefs(useProfileStore());

const {
  isHeaderSimple,
  recipientDetails,
  reference,
  senderDetails,
  settings,
  subject,
} = storeToRefs(useLetterStore());

const isCustomizing = ref(false);

function addRecipientDetail() {
  recipientDetails.value.push("");

  focusNextInput("#recipientDetailList input");
}

function addSenderDetail() {
  senderDetails.value.push("");

  focusNextInput("#senderDetailList input");
}
</script>

<template>
  <EditorCategory id="Header" class="w-full">
    <template v-slot:header>Header</template>
    <!-- TODO tab component -->
    <div class="flex justify-around">
      <button
        class="flex items-center gap-2 border-b-2 border-transparent pb-2"
        :class="!isCustomizing && 'border-white'"
        @click="isCustomizing = false"
      >
        <IdentificationIcon class="h-6" />
        Texts
      </button>
      <button
        class="flex items-center gap-2 border-b-2 border-transparent pb-2"
        :class="isCustomizing && 'border-white'"
        @click="isCustomizing = true"
      >
        <PaintBrushIcon class="h-6" />
        Styles
      </button>
    </div>
    <div v-if="isCustomizing" class="flex flex-col gap-5">
      <ul class="flex flex-col gap-10 mb-4">
        <li class="border-b-2 border-white border-opacity-5 pb-12">
          <header>
            <!-- TODO sender is not always set (condition with "use simple layout") -->
            <div class="uppercase font-bold text-lg mb-5">Sender</div>
          </header>
          <div class="flex gap-5 flex-wrap">
            <Field
              id="senderDetailsColor"
              type="color"
              label="Color"
              :disabled="!isThemeCustomized"
              v-model="settings.senderDetails.color"
            />
            <label class="flex flex-col" for="senderDetailsFont">
              <span class="opacity-60">Font</span>
              <select
                id="senderDetailsFont"
                class="select block"
                :disabled="!isThemeCustomized"
                v-model="settings.senderDetails.font"
              >
                <option class="option" value="inherit">
                  default (inherit from document font)
                </option>
                <option v-for="font in fonts" :key="font" class="option">
                  {{ font }}
                </option>
              </select>
            </label>
            <Field
              id="senderDetailsFontSize"
              label="Font size"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="settings.senderDetails.fontSize"
            />
            <Field
              id="senderDetailsLineHeight"
              label="Line height"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="settings.senderDetails.lineHeight"
              step="0.1"
            />
          </div>
          <div class="flex gap-5 flex-wrap">
            <label class="flex flex-col" for="senderDetailsFontWeight">
              <span class="opacity-60">Font weight</span>
              <select
                id="senderDetailsFontWeight"
                v-model="settings.senderDetails.fontWeight"
                class="select block"
              >
                <option v-for="i in 9" :key="i" class="option">
                  {{ `${i}00` }}
                </option>
              </select>
            </label>
            <label for="senderDetailsIsItalic">
              <input
                id="senderDetailsIsItalic"
                class="input"
                type="checkbox"
                :disabled="!isThemeCustomized"
                v-model="settings.senderDetails.isItalic"
              />
              <span class="opacity-60">Italic</span>
            </label>
            <Field
              id="senderDetailsGap"
              label="Gap"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="settings.senderDetails.gap"
            />
          </div>
          <div class="flex gap-5">
            <Field
              v-for="i in 4"
              :key="i"
              :id="`senderDetailsMargin${i}`"
              class="w-[20%]"
              type="number"
              :label="`Margin ${getSideIndexLabel(i)}`"
              :disabled="!isThemeCustomized"
              v-model="settings.senderDetails.margin[i - 1]"
            />
          </div>
          <div class="flex gap-5 flex-wrap">
            <Field
              v-for="i in 4"
              :key="i"
              :id="`senderDetailsBorder${i}`"
              class="w-[20%]"
              type="number"
              :label="`Border ${getSideIndexLabel(i)}`"
              :disabled="!isThemeCustomized"
              v-model="settings.senderDetails.border[i - 1]"
            />
            <Field
              id="senderDetailsBorderColor"
              class="w-[20%]"
              type="color"
              label="Border color"
              :disabled="!isThemeCustomized"
              v-model="settings.senderDetails.borderColor"
            />
            <Field
              id="senderDetailsBorderRadius"
              class="w-[20%]"
              type="number"
              label="Border radius"
              :disabled="!isThemeCustomized"
              v-model="settings.senderDetails.borderRadius"
            />
          </div>
          <div class="flex gap-5 flex-wrap">
            <Field
              v-for="i in 4"
              :key="i"
              :id="`senderDetailsPadding${i}`"
              class="w-[20%]"
              type="number"
              :label="`Padding ${getSideIndexLabel(i)}`"
              :disabled="!isThemeCustomized"
              v-model="settings.senderDetails.padding[i - 1]"
            />
            <Field
              id="senderDetailsBackgroundColor"
              type="color"
              label="Background color"
              :disabled="!isThemeCustomized"
              v-model="settings.senderDetails.backgroundColor"
            />
          </div>
        </li>
        <li class="border-b-2 border-white border-opacity-5 pb-12">
          <header>
            <div class="uppercase font-bold text-lg mb-5">Recipient</div>
          </header>
          <div class="flex flex-col gap-5">
            <div class="flex gap-5 flex-wrap">
              <Field
                id="recipientDetailsColor"
                type="color"
                label="Color"
                :disabled="!isThemeCustomized"
                v-model="settings.recipientDetails.color"
              />
              <label class="flex flex-col" for="recipientDetailsFont">
                <span class="opacity-60">Font</span>
                <select
                  id="recipientDetailsFont"
                  class="select block"
                  :disabled="!isThemeCustomized"
                  v-model="settings.recipientDetails.font"
                >
                  <option class="option" value="inherit">
                    default (inherit from document font)
                  </option>
                  <option v-for="font in fonts" :key="font" class="option">
                    {{ font }}
                  </option>
                </select>
              </label>
              <Field
                id="recipientDetailsFontSize"
                label="Font size"
                type="number"
                :disabled="!isThemeCustomized"
                v-model="settings.recipientDetails.fontSize"
              />
              <Field
                id="recipientDetailsLineHeight"
                label="Line height"
                type="number"
                :disabled="!isThemeCustomized"
                v-model="settings.recipientDetails.lineHeight"
                step="0.1"
              />
            </div>
            <div class="flex gap-5 flex-wrap">
              <label class="flex flex-col" for="recipientDetailsFontWeight">
                <span class="opacity-60">Font weight</span>
                <select
                  id="recipientDetailsFontWeight"
                  v-model="settings.recipientDetails.fontWeight"
                  class="select block"
                >
                  <option v-for="i in 9" :key="i" class="option">
                    {{ `${i}00` }}
                  </option>
                </select>
              </label>
              <label for="recipientDetailsIsItalic">
                <input
                  id="recipientDetailsIsItalic"
                  class="input"
                  type="checkbox"
                  :disabled="!isThemeCustomized"
                  v-model="settings.recipientDetails.isItalic"
                />
                <span class="opacity-60">Italic</span>
              </label>
              <Field
                id="recipientDetailsGap"
                label="Gap"
                type="number"
                :disabled="!isThemeCustomized"
                v-model="settings.recipientDetails.gap"
              />
            </div>
            <div class="flex gap-5">
              <Field
                v-for="i in 4"
                :key="i"
                :id="`recipientDetailsMargin${i}`"
                class="w-[20%]"
                type="number"
                :label="`Margin ${getSideIndexLabel(i)}`"
                :disabled="!isThemeCustomized"
                v-model="settings.recipientDetails.margin[i - 1]"
              />
            </div>
            <div class="flex gap-5 flex-wrap">
              <Field
                v-for="i in 4"
                :key="i"
                :id="`recipientDetailsBorder${i}`"
                class="w-[20%]"
                type="number"
                :label="`Border ${getSideIndexLabel(i)}`"
                :disabled="!isThemeCustomized"
                v-model="settings.recipientDetails.border[i - 1]"
              />
              <Field
                id="recipientDetailsBorderColor"
                class="w-[20%]"
                type="color"
                label="Border color"
                :disabled="!isThemeCustomized"
                v-model="settings.recipientDetails.borderColor"
              />
              <Field
                id="recipientDetailsBorderRadius"
                class="w-[20%]"
                type="number"
                label="Border radius"
                :disabled="!isThemeCustomized"
                v-model="settings.recipientDetails.borderRadius"
              />
            </div>
            <div class="flex gap-5 flex-wrap">
              <Field
                v-for="i in 4"
                :key="i"
                :id="`recipientDetailsPadding${i}`"
                class="w-[20%]"
                type="number"
                :label="`Padding ${getSideIndexLabel(i)}`"
                :disabled="!isThemeCustomized"
                v-model="settings.recipientDetails.padding[i - 1]"
              />
              <Field
                id="recipientDetailsBackgroundColor"
                type="color"
                label="Background color"
                :disabled="!isThemeCustomized"
                v-model="settings.recipientDetails.backgroundColor"
              />
            </div>
          </div>
        </li>
        <li class="border-b-2 border-white border-opacity-5 pb-12">
          <header>
            <div class="uppercase font-bold text-lg mb-5">Header</div>
          </header>
          <div class="flex flex-col gap-5">
            <div class="flex gap-5 flex-wrap">
              <label for="headerIsCentered">
                <input
                  id="headerIsCentered"
                  class="input"
                  type="checkbox"
                  :disabled="!isThemeCustomized"
                  v-model="settings.header.isCentered"
                />
                <span class="opacity-60">Centered</span>
              </label>
            </div>
            <div class="flex gap-5 flex-wrap">
              <Field
                v-for="i in 4"
                :key="i"
                :id="`headerMargin${i}`"
                class="w-[20%]"
                type="number"
                :label="`Margin ${getSideIndexLabel(i)}`"
                :disabled="!isThemeCustomized"
                v-model="settings.header.margin[i - 1]"
              />
            </div>
            <div class="flex gap-5 flex-wrap">
              <Field
                v-for="i in 4"
                :key="i"
                :id="`headerBorder${i}`"
                class="w-[20%]"
                type="number"
                :label="`Border ${getSideIndexLabel(i)}`"
                :disabled="!isThemeCustomized"
                v-model="settings.header.border[i - 1]"
              />
              <Field
                id="headerBorderColor"
                type="color"
                label="Border color"
                :disabled="!isThemeCustomized"
                v-model="settings.header.borderColor"
              />
              <Field
                id="headerBorderRadius"
                class="w-[20%]"
                type="number"
                label="Border radius"
                :disabled="!isThemeCustomized"
                v-model="settings.header.borderRadius"
              />
            </div>
            <div class="flex gap-5 flex-wrap">
              <Field
                v-for="i in 4"
                :key="i"
                :id="`headerPadding${i}`"
                class="w-[20%]"
                type="number"
                :label="`Padding ${getSideIndexLabel(i)}`"
                :disabled="!isThemeCustomized"
                v-model="settings.header.padding[i - 1]"
              />
              <Field
                id="headerBackgroundColor"
                type="color"
                label="Background color"
                :disabled="!isThemeCustomized"
                v-model="settings.header.backgroundColor"
              />
            </div>
          </div>
        </li>
        <li class="border-b-2 border-white border-opacity-5 pb-12">
          <header>
            <div class="uppercase font-bold text-lg mb-5">Subject</div>
          </header>
          <div class="flex flex-col gap-5">
            <div class="flex gap-5 flex-wrap">
              <Field
                id="subjectColor"
                type="color"
                label="Color"
                :disabled="!isThemeCustomized"
                v-model="settings.subject.color"
              />
              <label class="flex flex-col" for="subjectFont">
                <span class="opacity-60">Font</span>
                <select
                  id="subjectFont"
                  class="select block"
                  :disabled="!isThemeCustomized"
                  v-model="settings.subject.font"
                >
                  <option class="option" value="inherit">
                    default (inherit from document font)
                  </option>
                  <option v-for="font in fonts" :key="font" class="option">
                    {{ font }}
                  </option>
                </select>
              </label>
              <Field
                id="subjectFontSize"
                label="Font size"
                type="number"
                :disabled="!isThemeCustomized"
                v-model="settings.subject.fontSize"
              />
              <Field
                id="subjectLineHeight"
                label="Line height"
                type="number"
                :disabled="!isThemeCustomized"
                v-model="settings.subject.lineHeight"
                step="0.1"
              />
            </div>
            <div class="flex gap-5 flex-wrap">
              <label class="flex flex-col" for="subjectFontWeight">
                <span class="opacity-60">Font weight</span>
                <select
                  id="subjectFontWeight"
                  v-model="settings.subject.fontWeight"
                  class="select block"
                >
                  <option v-for="i in 9" :key="i" class="option">
                    {{ `${i}00` }}
                  </option>
                </select>
              </label>
              <label for="subjectIsItalic">
                <input
                  id="subjectIsItalic"
                  class="input"
                  type="checkbox"
                  :disabled="!isThemeCustomized"
                  v-model="settings.subject.isItalic"
                />
                <span class="opacity-60">Italic</span>
              </label>
              <label for="subjectIsCentered">
                <input
                  id="subjectIsCentered"
                  class="input"
                  type="checkbox"
                  :disabled="!isThemeCustomized"
                  v-model="settings.subject.isCentered"
                />
                <span class="opacity-60">Centered</span>
              </label>
            </div>
            <div class="flex gap-5 flex-wrap">
              <Field
                v-for="i in 4"
                :key="i"
                :id="`subjectMargin${i}`"
                class="w-[20%]"
                type="number"
                :label="`Margin ${getSideIndexLabel(i)}`"
                :disabled="!isThemeCustomized"
                v-model="settings.subject.margin[i - 1]"
              />
            </div>
            <div class="flex gap-5 flex-wrap">
              <Field
                v-for="i in 4"
                :key="i"
                :id="`subjectBorder${i}`"
                class="w-[20%]"
                type="number"
                :label="`Border ${getSideIndexLabel(i)}`"
                :disabled="!isThemeCustomized"
                v-model="settings.subject.border[i - 1]"
              />
              <Field
                id="subjectBorderColor"
                type="color"
                label="Border color"
                :disabled="!isThemeCustomized"
                v-model="settings.subject.borderColor"
              />
              <Field
                id="subjectBorderRadius"
                class="w-[20%]"
                type="number"
                label="Border radius"
                :disabled="!isThemeCustomized"
                v-model="settings.subject.borderRadius"
              />
            </div>
            <div class="flex gap-5 flex-wrap">
              <Field
                v-for="i in 4"
                :key="i"
                :id="`subjectPadding${i}`"
                class="w-[20%]"
                type="number"
                :label="`Padding ${getSideIndexLabel(i)}`"
                :disabled="!isThemeCustomized"
                v-model="settings.subject.padding[i - 1]"
              />
              <Field
                id="subjectBackgroundColor"
                type="color"
                label="Background color"
                :disabled="!isThemeCustomized"
                v-model="settings.subject.backgroundColor"
              />
            </div>
          </div>
        </li>
        <li>
          <header>
            <div class="uppercase font-bold text-lg mb-5">Reference</div>
          </header>
          <div class="flex flex-col gap-5">
            <div class="flex gap-5 flex-wrap">
              <Field
                id="referenceColor"
                type="color"
                label="Color"
                :disabled="!isThemeCustomized"
                v-model="settings.reference.color"
              />
              <label class="flex flex-col" for="referenceFont">
                <span class="opacity-60">Font</span>
                <select
                  id="referenceFont"
                  class="select block"
                  :disabled="!isThemeCustomized"
                  v-model="settings.reference.font"
                >
                  <option class="option" value="inherit">
                    default (inherit from document font)
                  </option>
                  <option v-for="font in fonts" :key="font" class="option">
                    {{ font }}
                  </option>
                </select>
              </label>
              <Field
                id="referenceFontSize"
                label="Font size"
                type="number"
                :disabled="!isThemeCustomized"
                v-model="settings.reference.fontSize"
              />
              <Field
                id="referenceLineHeight"
                label="Line height"
                type="number"
                :disabled="!isThemeCustomized"
                v-model="settings.reference.lineHeight"
                step="0.1"
              />
            </div>
            <div class="flex gap-5 flex-wrap">
              <label class="flex flex-col" for="referenceFontWeight">
                <span class="opacity-60">Font weight</span>
                <select
                  id="referenceFontWeight"
                  v-model="settings.reference.fontWeight"
                  class="select block"
                >
                  <option v-for="i in 9" :key="i" class="option">
                    {{ `${i}00` }}
                  </option>
                </select>
              </label>
              <label for="referenceIsItalic">
                <input
                  id="referenceIsItalic"
                  class="input"
                  type="checkbox"
                  :disabled="!isThemeCustomized"
                  v-model="settings.reference.isItalic"
                />
                <span class="opacity-60">Italic</span>
              </label>
              <label for="referenceIsCentered">
                <input
                  id="referenceIsCentered"
                  class="input"
                  type="checkbox"
                  :disabled="!isThemeCustomized"
                  v-model="settings.reference.isCentered"
                />
                <span class="opacity-60">Centered</span>
              </label>
            </div>
            <div class="flex gap-5 flex-wrap">
              <Field
                v-for="i in 4"
                :key="i"
                :id="`referenceMargin${i}`"
                class="w-[20%]"
                type="number"
                :label="`Margin ${getSideIndexLabel(i)}`"
                :disabled="!isThemeCustomized"
                v-model="settings.reference.margin[i - 1]"
              />
            </div>
            <div class="flex gap-5 flex-wrap">
              <Field
                v-for="i in 4"
                :key="i"
                :id="`referenceBorder${i}`"
                class="w-[20%]"
                type="number"
                :label="`Border ${getSideIndexLabel(i)}`"
                :disabled="!isThemeCustomized"
                v-model="settings.reference.border[i - 1]"
              />
              <Field
                id="referenceBorderColor"
                type="color"
                label="Border color"
                :disabled="!isThemeCustomized"
                v-model="settings.reference.borderColor"
              />
              <Field
                id="referenceBorderRadius"
                class="w-[20%]"
                type="number"
                label="Border radius"
                :disabled="!isThemeCustomized"
                v-model="settings.reference.borderRadius"
              />
            </div>
            <div class="flex gap-5 flex-wrap">
              <Field
                v-for="i in 4"
                :key="i"
                :id="`referencePadding${i}`"
                class="w-[20%]"
                type="number"
                :label="`Padding ${getSideIndexLabel(i)}`"
                :disabled="!isThemeCustomized"
                v-model="settings.reference.padding[i - 1]"
              />
              <Field
                id="referenceBackgroundColor"
                type="color"
                label="Background color"
                :disabled="!isThemeCustomized"
                v-model="settings.reference.backgroundColor"
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-else class="flex flex-col gap-5">
      <label class="flex flex-col" for="senderDetails">
        <!-- TODO use nice toggle component -->
        <label class="cursor-pointer" for="isHeaderSimple">
          <input
            id="isHeaderSimple"
            class="input"
            type="checkbox"
            v-model="isHeaderSimple"
          />
          <span class="opacity-60">Use simple layout</span>
        </label>
        <template v-if="isHeaderSimple">
          <div class="flex gap-2">
            <span class="opacity-60">Sender details</span>
            <button
              title="Add detail"
              class="bg-blue-500 size-7 text-white rounded-full"
              @click="addSenderDetail"
            >
              <PlusCircleIcon class="size-full" />
            </button>
          </div>
          <ul
            v-if="senderDetails.length"
            id="recipientDetailList"
            class="inputList"
          >
            <li
              v-for="(_detail, index) in senderDetails"
              :key="index"
              class="inputListItem"
            >
              <input
                class="input w-[70%]"
                v-model="senderDetails[index]"
                @keydown.enter.prevent="addRecipientDetail"
              />
              <ListActions
                class="mb-2"
                :index="index"
                :list-length="senderDetails.length"
                @moveUp="moveUp(senderDetails, index)"
                @moveDown="moveDown(senderDetails, index)"
                @remove="remove(senderDetails, index)"
              />
            </li>
          </ul>
        </template>
      </label>
      <label class="flex flex-col" for="recipientDetails">
        <div class="flex gap-2">
          <span class="opacity-60">Recipient details</span>
          <button
            title="Add detail"
            class="bg-blue-500 size-7 text-white rounded-full"
            @click="addRecipientDetail"
          >
            <PlusCircleIcon class="size-full" />
          </button>
        </div>
        <ul
          v-if="recipientDetails.length"
          id="recipientDetailList"
          class="inputList"
        >
          <li
            v-for="(_detail, index) in recipientDetails"
            :key="index"
            class="inputListItem"
          >
            <input
              class="input w-[70%]"
              v-model="recipientDetails[index]"
              @keydown.enter.prevent="addRecipientDetail"
            />
            <ListActions
              class="mb-2"
              :index="index"
              :list-length="recipientDetails.length"
              @moveUp="moveUp(recipientDetails, index)"
              @moveDown="moveDown(recipientDetails, index)"
              @remove="remove(recipientDetails, index)"
            />
          </li>
        </ul>
      </label>
      <label class="flex flex-col" for="letterSubject">
        <span class="opacity-60">Subject</span>
        <textarea id="letterSubject" class="input" v-model="subject" />
      </label>
      <label class="flex flex-col" for="letterReference">
        <span class="opacity-60">Reference</span>
        <input id="letterReference" class="input" v-model="reference" />
      </label>
    </div>
  </EditorCategory>
</template>
