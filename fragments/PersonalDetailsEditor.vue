<script setup lang="ts">
import { storeToRefs } from "pinia";
import { PlusCircleIcon } from "@heroicons/vue/24/outline";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { moveDown, moveUp, remove } from "@/utils/array";
import { focusNextInput } from "@/utils/editor";
import type { ContactDetail } from "@/types";
import { contactIcons, fonts, socialIcons } from "@/globals";
import BlockSettingsEditor from "@/components/BlockSettingsEditor.vue";
import EditorCategory from "@/components/EditorCategory.vue";
import ListActions from "@/components/ListActions.vue";
import TextSettingsEditor from "@/components/TextSettingsEditor.vue";
import TitleSettingsEditor from "@/components/TitleSettingsEditor.vue";

const { isThemeCustomized, name, title } = storeToRefs(useProfileStore());

const { about, contactDetails, settings } = storeToRefs(useResumeStore());

function addContactDetail() {
  const contactDetail: ContactDetail = {
    type: "personal",
    icon: null,
    value: "",
  };

  contactDetails.value.push(contactDetail);

  focusNextInput("#contactDetailList input");
}

function changeContactDetailIcon(
  contactDetail: ContactDetail,
  value: ContactDetail["icon"],
) {
  contactDetail.icon = value;
}

function changeContactDetaiType(
  contactDetail: ContactDetail,
  value: ContactDetail["type"],
) {
  contactDetail.icon = null; // Reset as icon sets are based on type
  contactDetail.type = value;
}
</script>

<template>
  <EditorCategory id="Details">
    <template v-slot:header>Details</template>
    <template v-slot:style>
      <ul class="flex flex-col gap-10 mb-4">
        <li class="border-b-2 border-white border-opacity-5 pb-12">
          <header>
            <div class="uppercase font-bold text-lg mb-5">Name</div>
          </header>
          <div class="flex flex-col gap-5">
            <BlockSettingsEditor
              property-name="name"
              :settings="settings.name"
            />
            <TextSettingsEditor
              property-name="name"
              :settings="settings.name"
            />
            <TitleSettingsEditor
              property-name="name"
              :settings="settings.name"
            />
          </div>
        </li>
        <li class="border-b-2 border-white border-opacity-5 pb-12">
          <header>
            <div class="uppercase font-bold text-lg mb-5">Title</div>
          </header>
          <div class="flex flex-col gap-5">
            <BlockSettingsEditor
              property-name="title"
              :settings="settings.title"
            />
            <TextSettingsEditor
              property-name="title"
              :settings="settings.title"
            />
            <TitleSettingsEditor
              property-name="title"
              :settings="settings.title"
            />
          </div>
        </li>
        <li class="border-b-2 border-white border-opacity-5 pb-12">
          <header>
            <div class="uppercase font-bold text-lg mb-5">About</div>
          </header>
          <div class="flex flex-col gap-5">
            <BlockSettingsEditor
              property-name="about"
              :settings="settings.about"
            />
            <TextSettingsEditor
              property-name="about"
              :settings="settings.about"
            />
            <TitleSettingsEditor
              property-name="about"
              :settings="settings.about"
            />
          </div>
        </li>
        <li class="border-b-2 border-white border-opacity-5 pb-12">
          <header>
            <div class="uppercase font-bold text-lg mb-5">About quote</div>
          </header>
          <div class="flex flex-col gap-5">
            <label for="aboutQuoteIsShown">
              <input
                id="aboutQuoteIsShown"
                class="input"
                type="checkbox"
                :disabled="!isThemeCustomized"
                v-model="settings.aboutQuote.isShown"
              />
              <span class="opacity-60">Is shown</span>
            </label>
          </div>
          <div class="flex flex-col gap-5 flex-wrap">
            <div class="flex gap-5 flex-wrap">
              <label class="flex flex-col" for="aboutQuoteFont">
                <span class="opacity-60">Font</span>
                <select
                  id="aboutQuoteFont"
                  class="select block"
                  :disabled="!isThemeCustomized"
                  v-model="settings.aboutQuote.font"
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
                id="aboutQuoteFontSize"
                label="Font size"
                type="number"
                :disabled="!isThemeCustomized"
                v-model="settings.aboutQuote.fontSize"
              />
              <label class="flex flex-col" for="aboutQuoteFontWeight">
                <span class="opacity-60">Font weight</span>
                <select
                  id="aboutQuoteFontWeight"
                  v-model="settings.aboutQuote.fontWeight"
                  class="select block"
                  :disabled="!isThemeCustomized"
                >
                  <option v-for="i in 9" :key="i" class="option">
                    {{ `${i}00` }}
                  </option>
                </select>
              </label>
              <label for="aboutQuoteIsItalic">
                <input
                  id="aboutQuoteIsItalic"
                  class="input"
                  type="checkbox"
                  :disabled="!isThemeCustomized"
                  v-model="settings.aboutQuote.isItalic"
                />
                <span class="opacity-60">Italic</span>
              </label>
              <Field
                id="aboutQuoteColor"
                label="Color"
                type="color"
                :disabled="!isThemeCustomized"
                v-model="settings.aboutQuote.color"
              />
            </div>
          </div>
        </li>
        <li>
          <header>
            <div class="uppercase font-bold text-lg mb-5">Contact details</div>
          </header>
          <div class="flex flex-col gap-5">
            <BlockSettingsEditor
              property-name="contactDetails"
              :settings="settings.contactDetails"
            />
            <TextSettingsEditor
              property-name="contactDetails"
              :settings="settings.contactDetails"
            />
            <div class="flex gap-5 flew-wrap">
              <label class="flex flex-col" for="contactDetailsAlignment">
                <span class="opacity-60">Alignment</span>
                <select
                  id="contactDetailsAlignment"
                  class="select block"
                  :disabled="!isThemeCustomized"
                  v-model="settings.contactDetails.alignment"
                >
                  <option class="option" value="start">start</option>
                  <option class="option" value="center">center</option>
                  <option class="option" value="end">end</option>
                </select>
              </label>
              <Field
                id="contactDetailsGap"
                label="Gap"
                type="number"
                :disabled="!isThemeCustomized"
                v-model="settings.contactDetails.gap"
              />
              <label for="contactDetailsIsIconFirst">
                <input
                  id="contactDetailsIsIconFirst"
                  class="input"
                  type="checkbox"
                  :disabled="!isThemeCustomized"
                  v-model="settings.aboutQuote.isShown"
                />
                <span class="opacity-60">Is icon first</span>
              </label>
              <Field
                id="contactDetailsIconGap"
                label="Icon gap"
                type="number"
                :disabled="!isThemeCustomized"
                v-model="settings.contactDetails.iconGap"
              />
              <Field
                id="contactDetailsIconColor"
                label="Icon color"
                type="color"
                :disabled="!isThemeCustomized"
                v-model="settings.contactDetails.iconColor"
              />
            </div>
          </div>
        </li>
      </ul>
    </template>
    <div class="flex flex-col gap-5">
      <label class="flex flex-col" for="detailsName">
        <span class="opacity-60">Name</span>
        <input id="detailsName" class="input" v-model="name" />
      </label>
      <label class="flex flex-col" for="detailsTitle">
        <span class="opacity-60">Title</span>
        <input id="detailsTitle" class="input" v-model="title" />
      </label>
      <label class="flex flex-col" for="detailsAbout">
        <span class="opacity-60">About</span>
        <textarea id="detailsAbout" class="input" v-model="about" />
      </label>
      <label class="flex flex-col" for="contactDetails">
        <div class="flex gap-2">
          <span class="opacity-60">Contact details</span>
          <button
            title="Add detail"
            class="bg-blue-500 size-7 text-white rounded-full"
            @click="addContactDetail"
          >
            <PlusCircleIcon class="size-full" />
          </button>
        </div>
        <ul
          v-if="contactDetails.length"
          id="contactDetailList"
          class="inputList"
        >
          <li
            v-for="(detail, detailIndex) in contactDetails"
            :key="detailIndex"
            class="inputListItem"
          >
            <div class="flex w-[70%] gap-3 items-end">
              <input
                class="input flex-1"
                v-model="contactDetails[detailIndex].value"
                @keydown.enter.prevent="addContactDetail"
              />
              <!-- TODO use nice toggle component -->
              <label for="documentType">
                Type
                <select
                  id="detailType"
                  :value="detail.type"
                  @change="
                    changeContactDetaiType(
                      detail,
                      ($event.target as HTMLInputElement)
                        .value as ContactDetail['type'],
                    )
                  "
                  class="select block capitalize"
                >
                  <option class="option">personal</option>
                  <option class="option">social</option>
                </select>
              </label>
              <label for="detailIcon">
                Icon
                <select
                  id="detailIcon"
                  :value="detail.icon"
                  @change="
                    changeContactDetailIcon(
                      detail,
                      ($event.target as HTMLInputElement)
                        .value as ContactDetail['icon'],
                    )
                  "
                  class="select block capitalize bg-transparent text-white"
                >
                  <option class="option" value="">None</option>
                  <option class="option">default</option>
                  <template v-if="detail.type === 'social'">
                    <option
                      v-for="icon in socialIcons"
                      :key="icon as string"
                      class="option"
                    >
                      {{ icon }}
                    </option>
                  </template>
                  <template v-else>
                    <option
                      v-for="icon in contactIcons"
                      :key="icon as string"
                      class="option"
                    >
                      {{ icon }}
                    </option>
                  </template>
                </select>
              </label>
            </div>
            <ListActions
              class="mb-2"
              :index="detailIndex"
              :list-length="contactDetails.length"
              @moveUp="moveUp(contactDetails, detailIndex)"
              @moveDown="moveDown(contactDetails, detailIndex)"
              @remove="remove(contactDetails, detailIndex)"
            />
          </li>
        </ul>
      </label>
    </div>
  </EditorCategory>
</template>
