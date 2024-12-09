<script setup lang="ts">
import { storeToRefs } from "pinia";
import Message from "primevue/message";
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
    <template v-slot:header>{{ capitalize($t("profile")) }}</template>
    <div class="formBlock">
      <Field id="profileName" :label="$t('name')" v-model="name" />
      <Field id="profileTitle" :label="$t('title')" v-model="title" />
      <Field
        type="checkbox"
        label="Consider about and details a dedicated category*"
        v-model="isHeaderSimple"
      />
      <template v-if="isHeaderSimple">
        <Message size="small">
          *When on, about and details are styled through the Entry style editor.
        </Message>
        <!-- TODO Allow about contact details splitting into separate categories (not 1 "about" but 2) -->
        <Field
          id="detailsCategoryName"
          :label="$t('categoryName')"
          v-model="simpleHeaderCategoryName"
        />
      </template>
      <Field
        id="detailsAbout"
        :label="$t('about')"
        type="textarea"
        v-model="about"
      />
      <label class="flex flex-col" for="contactDetails">
        <span class="label">{{ capitalize($t("contactDetails")) }}</span>
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
              <Field
                v-model="contactDetails[detailIndex].value"
                @keydown.enter.prevent="addContactDetail"
              />
              <Field
                id="detailType"
                :label="$t('type')"
                type="selectbutton"
                :options="['personal', 'social']"
                :model-value="detail.type"
                @update:model-value="changeContactDetaiType(detail, $event)"
              />
              <Field
                id="detailIcon"
                :label="$t('icon')"
                type="select"
                :options="
                  detail.type === 'social'
                    ? [undefined, 'default', ...socialIcons]
                    : [undefined, 'default', ...contactIcons]
                "
                v-model="detail.icon"
              />
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
