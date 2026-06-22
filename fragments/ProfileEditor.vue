<script setup lang="ts">
import { computed } from "vue";
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
import { capitalize } from "@/utils/string";

const { t } = useI18n({
  useScope: "local",
});

const { about, contactDetails, name, title } = storeToRefs(useProfileStore());

const { categories, isHeaderSimple, simpleHeaderCategoryName } =
  storeToRefs(useResumeStore());

const bodyCategories = computed(() =>
  categories.value.filter(
    (category) => category.isVisible && category.layout !== "aside",
  ),
);

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
  <EditorCategory
    id="Profile"
    :title="capitalize(t('profile'))"
    icon="i-lucide-user"
  >
    <div class="formBlock">
      <Field
        id="profileName"
        v-model="name"
        target
        transparent
        :label="$t('name')"
      />
      <Field
        id="profileTitle"
        v-model="title"
        target
        transparent
        :label="$t('title')"
      />
      <Field
        v-model="isHeaderSimple"
        type="checkbox"
        transparent
        :label="t('considerAboutAndDetailsACategory')"
      />
      <template v-if="isHeaderSimple">
        <UAlert
          :description="t('howToStyleAboutAndDetailsCategory')"
          color="neutral"
          variant="outline"
        >
          {{ t("howToStyleAboutAndDetailsCategory") }}
        </UAlert>
        <!-- TODO Allow about contact details splitting into separate categories (not 1 "about" but 1 "about" and 1 "details") -->
        <!-- TODO we should actually add two more Category types : Details and About, so that the customization is way easier... (there is no -1 index) and user is more free to cuztomize -->
        <Field
          :id="`categoryList${-1}Name_${bodyCategories[0]?.layout === 'half' ? 'half' : 'full'}`"
          v-model="simpleHeaderCategoryName"
          target
          transparent
          :label="$t('categoryName')"
        />
      </template>
      <Field
        :id="
          isHeaderSimple
            ? `categoryList${-1}EntryList${-1}Summary`
            : `detailsAbout`
        "
        v-model="about"
        target
        transparent
        :label="$t('about')"
        type="textarea"
      />
      <label class="flex flex-col" for="contactDetails">
        <div class="w-[70%] grid grid-cols-4 gap-x-3">
          <span class="label col-span-2">
            {{ capitalize($t("contactDetails")) }}
          </span>
          <span class="label">
            {{ capitalize($t("socialNetwork")) }}
          </span>
          <span class="label">
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
                :id="
                  isHeaderSimple
                    ? `categoryList${-1}EntryList${-1}HighlightList${detailIndex}`
                    : `detailList${detailIndex}`
                "
                v-model="contactDetails[detailIndex]!.value"
                class="col-span-2"
                target
                transparent
                @keydown.enter.prevent="addContactDetail"
              />
              <Field
                id="detailType"
                transparent
                type="checkbox"
                :model-value="detail.type === 'social'"
                @update:model-value="changeContactDetaiType(detail, $event)"
              />
              <Field
                id="detailIcon"
                v-model="detail.icon"
                transparent
                type="select"
                label-key="label"
                value-key="value"
                :items="
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
              @move-up="moveUp(contactDetails, detailIndex)"
              @move-down="moveDown(contactDetails, detailIndex)"
              @remove="remove(contactDetails, detailIndex)"
            />
          </li>
        </ul>
        <UButton
          icon="i-lucide-contact"
          variant="outline"
          size="sm"
          class="w-[70%]"
          @click="addContactDetail"
        >
          {{ capitalize(`${$t("toAdd")} ${$t("detail")}`) }}
        </UButton>
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
