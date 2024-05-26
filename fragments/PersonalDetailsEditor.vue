<script setup lang="ts">
import { storeToRefs } from "pinia";
import { PlusCircleIcon } from "@heroicons/vue/24/outline";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { moveDown, moveUp, remove } from "@/utils/array";
import { focusNextInput } from "@/utils/editor";
import type { ContactDetail } from "@/types";
import { contactIcons, socialIcons } from "@/globals";
import EditorCategory from "@/components/EditorCategory.vue";
import ListActions from "@/components/ListActions.vue";

const { name, title } = storeToRefs(useProfileStore());

const { about, contactDetails } = storeToRefs(useResumeStore());

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
  <EditorCategory id="Details" class="w-full">
    <template v-slot:header>Details</template>
    <div class="flex flex-col gap-5">
      <div class="flex justify-center gap-5 flex-wrap">
        <label class="flex flex-col flex-1" for="detailsName">
          <span class="opacity-60">Name</span>
          <input id="detailsName" class="input" v-model="name" />
        </label>
        <label class="flex flex-col flex-1" for="detailsTitle">
          <span class="opacity-60">Title</span>
          <input id="detailsTitle" class="input" v-model="title" />
        </label>
      </div>
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
