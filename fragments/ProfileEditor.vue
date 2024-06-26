<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { moveDown, moveUp, remove } from "@/utils/array";
import { focusNextInput } from "@/utils/editor";
import type { ContactDetail } from "@/types";
import { contactIcons, socialIcons } from "@/globals";
import EditorCategory from "@/components/EditorCategory.vue";
import Field from "@/components/Field.vue";
import ListActions from "@/components/ListActions.vue";

const { about, contactDetails, name, title } = storeToRefs(useProfileStore());

const { isHeaderSimple, simpleHeaderCategoryName } =
  storeToRefs(useResumeStore());

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
  <EditorCategory id="Profile">
    <template v-slot:header>Profile</template>
    <div class="flex flex-col gap-5">
      <Field id="profileName" label="Name" transparent v-model="name" />
      <Field id="profileTitle" label="Title" transparent v-model="title" />
      <Field
        type="toggle"
        label="Consider about and details a dedicated category*"
        v-model="isHeaderSimple"
      />
      <template v-if="isHeaderSimple">
        <p>
          *When on, about and details are styled through the Entry style editor.
        </p>
        <!-- TODO Allow about contact details splitting into separate categories (not 1 "about" but 2) -->
        <Field
          id="detailsCategoryName"
          label="Category name"
          transparent
          v-model="simpleHeaderCategoryName"
        />
      </template>
      <Field
        id="detailsAbout"
        label="About"
        type="textarea"
        transparent
        v-model="about"
      />
      <label class="flex flex-col" for="contactDetails">
        <span class="label opacity-60">Contact details</span>
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
            <div class="flex flex-col md:flex-row w-[70%] gap-3 md:items-end">
              <input
                class="input flex-1"
                v-model="contactDetails[detailIndex].value"
                @keydown.enter.prevent="addContactDetail"
              />
              <label for="documentType">
                <span class="label opacity-60">Type</span>
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
                  class="select block capitalize text-white"
                >
                  <option class="option">personal</option>
                  <option class="option">social</option>
                </select>
              </label>
              <label for="detailIcon">
                <span class="label opacity-60">Icon</span>
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
                      :key="`${icon}`"
                      class="option"
                    >
                      {{ icon }}
                    </option>
                  </template>
                  <template v-else>
                    <option
                      v-for="icon in contactIcons"
                      :key="`${icon}`"
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
          <button
            class="button slotButton w-[70%] shadow-none px-2 py-1 text-sm"
            @click="addContactDetail"
          >
            Add detail
          </button>
        </ul>
      </label>
    </div>
  </EditorCategory>
</template>
