<script setup lang="ts">
import { storeToRefs } from "pinia";
import Button from "primevue/button";
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

// eslint-disable-next-line no-undef
const { t } = useI18n({
  useScope: "local",
});

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
  contactDetail.type = value ? "social" : "personal";
}
</script>

<template>
  <EditorCategory id="Profile">
    <template v-slot:header>{{ capitalize($t("profile")) }}</template>
    <div class="formBlock">
      <Field id="profileName" transparent :label="$t('name')" v-model="name" />
      <Field
        id="profileTitle"
        transparent
        :label="$t('title')"
        v-model="title"
      />
      <Field
        type="checkbox"
        transparent
        :label="t('considerAboutAndDetailsACategory')"
        v-model="isHeaderSimple"
      />
      <template v-if="isHeaderSimple">
        <Message size="small" class="!bg-white/10 !text-white">
          {{ t("howToStyleAboutAndDetailsCategory") }}
        </Message>
        <!-- TODO Allow about contact details splitting into separate categories (not 1 "about" but 1 "about" and 1 "details") -->
        <Field
          id="detailsCategoryName"
          transparent
          :label="$t('categoryName')"
          v-model="simpleHeaderCategoryName"
        />
      </template>
      <Field
        id="detailsAbout"
        transparent
        :label="$t('about')"
        type="textarea"
        v-model="about"
      />
      <label class="flex flex-col" for="contactDetails">
        <div class="w-[70%] grid grid-cols-4 gap-x-3">
          <span class="label labelTransparent col-span-2">
            {{ capitalize($t("contactDetails")) }}
          </span>
          <span class="label labelTransparent">
            {{ capitalize($t("socialNetwork")) }}
          </span>
          <span class="label labelTransparent">
            {{ capitalize($t("icon")) }}
          </span>
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
            <div class="w-[70%] grid grid-cols-4 gap-x-3">
              <Field
                class="col-span-2"
                transparent
                v-model="contactDetails[detailIndex].value"
                @keydown.enter.prevent="addContactDetail"
              />
              <Field
                id="detailType"
                transparent
                type="togglebutton"
                :model-value="detail.type === 'social'"
                :onLabel="capitalize($t('yes'))"
                :offLabel="capitalize($t('no'))"
                @update:model-value="changeContactDetaiType(detail, $event)"
              />
              <Field
                id="detailIcon"
                transparent
                type="select"
                v-model="detail.icon"
                optionLabel="label"
                optionValue="value"
                :options="
                  detail.type === 'social'
                    ? [undefined, 'default', ...socialIcons].map((icon) => {
                        if (!icon) {
                          return {
                            label: '',
                            value: icon,
                          };
                        }
                        if (icon === 'default') {
                          return {
                            label: capitalize($t(icon)),
                            value: icon,
                          };
                        }
                        return {
                          label: capitalize(icon),
                          value: icon,
                        };
                      })
                    : [undefined, 'default', ...contactIcons].map((icon) => ({
                        label: !icon ? '' : capitalize($t(icon)),
                        value: icon,
                      }))
                "
              />
            </div>
            <ListActions
              class="mb-2"
              transparent
              :index="detailIndex"
              :list-length="contactDetails.length"
              @moveUp="moveUp(contactDetails, detailIndex)"
              @moveDown="moveDown(contactDetails, detailIndex)"
              @remove="remove(contactDetails, detailIndex)"
            />
          </li>
          <Button asChild>
            <button
              class="button slotButton slotButtonSmall"
              @click="addContactDetail"
            >
              {{ capitalize(`${$t("toAdd")} ${$t("detail")}`) }}
            </button>
          </Button>
        </ul>
      </label>
    </div>
  </EditorCategory>
</template>

<i18n lang="json">
{
  "br": {
    "considerAboutAndDetailsACategory": "TODO",
    "howToStyleAboutAndDetailsCategory": "TODO"
  },
  "de": {
    "considerAboutAndDetailsACategory": "TODO",
    "howToStyleAboutAndDetailsCategory": "TODO"
  },
  "en": {
    "considerAboutAndDetailsACategory": "Consider About and Details a decidated category",
    "howToStyleAboutAndDetailsCategory": "About and Details are styled through the Entry style editor."
  },
  "es": {
    "considerAboutAndDetailsACategory": "TODO",
    "howToStyleAboutAndDetailsCategory": "TODO"
  },
  "fr": {
    "considerAboutAndDetailsACategory": "Séparer À propos et Coordonnées dans une catégorie dédiée",
    "howToStyleAboutAndDetailsCategory": "À propos et Coordonnées sont personnalisables dans l'éditeur de thème"
  },
  "it": {
    "considerAboutAndDetailsACategory": "TODO",
    "howToStyleAboutAndDetailsCategory": "TODO"
  }
}
</i18n>
