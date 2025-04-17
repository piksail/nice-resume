<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { capitalize } from "@/utils/string";
import { themes } from "~/globals";

const { theme } = storeToRefs(useProfileStore());

const title = ref("Nice resume");
const description = ref(
  "Pick a design, build your resume, write your cover letter, adapt the design to your need with Nice Resume.",
);

// eslint-disable-next-line no-undef
const localePath = useLocalePath();

// eslint-disable-next-line no-undef
const { t } = useI18n({
  useScope: "local",
});

const firstInput = ref(capitalize(t("name").toUpperCase()));
const secondInput = ref(capitalize(t("title")));
const thirdInput = ref(capitalize(t("address")));

const firstInputColor = ref("#e11d48");
const firstInputIsItalic = ref(false);
const firstInputFontWeight = ref(800);

const secondInputColor = ref("#000000");
const secondInputIsItalic = ref(true);
const secondInputFontWeight = ref(600);

const thirdInputColor = ref("#3e3e3e");
const thirdInputIsItalic = ref(false);
const thirdInputFontWeight = ref(400);
</script>

<template>
  <Head>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="description" />
    <Meta name="og:title" :content="title" />
    <Meta name="og:description" :content="description" />
    <!-- TODO og:url -->
    <!-- TODO og:image -->
  </Head>

  <NuxtLayout name="landing">
    <section class="p-20 flex justify-center">
      <div class="mx-auto">
        <h1 class="text-justify drop-shadow-lg">
          <span
            class="text-5xl lg:text-6xl xl:text-9xl font-bold tracking-wide"
          >
            {{ t("introVerb") }}
            <i class="font-serif text-primary">
              {{ t("introPossessiveAdjective") }}
            </i>
          </span>
          <br />
          <span
            class="text-4xl lg:text-5xl xl:text-8xl font-bold tracking-wide"
          >
            {{ t("introJobApplication") }}
          </span>
          <br />
          <span class="text-3xl lg:text-4xl xl:text-7xl font-black">
            {{ t("introIndefiniteArticle") }}
            <i
              class="font-serif tracking-widest text-4xl lg:text-5xl xl:text-8xl text-primary"
            >
              {{ t("introPowerWord") }}
            </i>
          </span>
        </h1>
        <ul
          class="text-lg lg:text-2xl font-light mt-12 leading-tight lg:leading-normal"
        >
          <li>{{ t("noCookies") }}</li>
          <li>{{ t("noSignUp") }}</li>
          <li>{{ t("noPayment") }}</li>
          <li>{{ t("privacyFriendly") }}</li>
        </ul>
        <div class="flex items-center gap-7 mt-24">
          <NuxtLink :to="localePath('/editor')">
            <Button
              class="uppercase font-black tracking-widest shadow-xl"
              size="large"
            >
              {{ t("startEditing") }}
            </Button>
          </NuxtLink>
          <NuxtLink :to="localePath('/about')">
            <Button
              class="uppercase font-black tracking-widest shadow-xl"
              size="large"
              variant="outlined"
              severity="contrast"
              pt:root:class="!text-white hover:!text-surface-900"
            >
              {{ t("learnMore") }}
            </Button>
          </NuxtLink>
        </div>
      </div>
      <div class="hidden sm:block skew-y-12 mx-auto mt-14 group">
        <div
          class="w-[100px] h-[calc(100px*1.414)] lg:w-[300px] lg:h-[calc(300px*1.414)] xl:w-[400px] xl:h-[calc(400px*1.414)] shadow bg-primary absolute -z-50 left-7 -top-7 transition-all group-hover:left-14 group-hover:-top-14 animate-float"
        />
        <div
          class="w-[100px] h-[calc(100px*1.414)] lg:w-[300px] lg:h-[calc(300px*1.414)] xl:w-[400px] xl:h-[calc(400px*1.414)] shadow bg-white text-black flex flex-col p-8 animate-float [animation-delay:0.7s]"
        >
          <div
            class="bg-surface-100 transition-colors group-hover:bg-surface-200 h-8 w-32 mb-3"
          />
          <div
            class="bg-surface-100 transition-colors group-hover:bg-surface-200 h-6 w-64 mb-6"
          />
          <div
            class="bg-surface-100 transition-colors group-hover:bg-surface-200 h-4 w-12 mb-2"
          />
          <div
            class="bg-surface-100 transition-colors group-hover:bg-surface-200 h-4 w-14 mb-2"
          />
          <div
            class="bg-surface-100 transition-colors group-hover:bg-surface-200 h-4 w-10 mb-2"
          />
          <div
            class="bg-surface-100 transition-colors group-hover:bg-surface-200 h-4 w-14 mb-8"
          />
          <div class="grid grid-cols-2 gap-6">
            <div class="w-full">
              <div
                class="bg-surface-100 transition-colors group-hover:bg-surface-200 mb-4 h-6 w-2/3"
              />
              <div
                class="bg-surface-100 transition-colors group-hover:bg-surface-200 h-20 w-full"
              />
            </div>
            <div class="w-full">
              <div
                class="bg-surface-100 transition-colors group-hover:bg-surface-200 mb-4 h-6 w-full"
              />
              <div
                class="bg-surface-100 transition-colors group-hover:bg-surface-200 h-20 w-full"
              />
            </div>
            <div class="w-full">
              <div
                class="bg-surface-100 transition-colors group-hover:bg-surface-200 mb-4 h-6 w-full"
              />
              <div
                class="bg-surface-100 transition-colors group-hover:bg-surface-200 h-20 w-full"
              />
            </div>
            <div class="w-full">
              <div
                class="bg-surface-100 transition-colors group-hover:bg-surface-200 mb-4 h-6 w-1/3"
              />
              <div
                class="bg-surface-100 transition-colors group-hover:bg-surface-200 h-20 w-full"
              />
            </div>
          </div>
        </div>
        <div
          class="hidden transition-all group-hover:bg-opacity-90 hover:shadow-xl absolute top-1/2 -left-1/4 mt-12 lg:w-[400px] xl:w-[600px] lg:grid grid-cols-3 gap-4 items-end bg-surface-800 p-6 rounded"
        >
          <div class="bg-surface-950 h-9 rounded" />
          <div class="bg-surface-950 h-9 rounded" />
          <div class="bg-surface-950 h-9 rounded" />
          <div class="bg-surface-950 h-9 rounded" />
          <div class="bg-surface-950 h-9 rounded" />
          <div class="bg-surface-950 h-9 rounded" />
        </div>
      </div>
    </section>
    <section class="py-20 px-10 max-w-screen-2xl mx-auto">
      <ol
        class="grid grid-cols-1 lg:grid-cols-2 grid-rows-4 lg:grid-flow-col gap-3"
      >
        <li class="bg-surface-800 transition-colors hover:bg-surface-700 p-8">
          <h2
            class="flex items-center gap-2 text-2xl lg:text-4xl font-bold mb-12"
          >
            <Badge size="xlarge" value="1" />
            <span>
              {{ t("stepTheme") }}
              <i class="font-serif text-primary">{{ $t("theme") }}</i>
            </span>
          </h2>
          <Field
            id="theme"
            :label="$t('theme')"
            transparent
            type="select"
            v-model="theme"
            optionLabel="label"
            optionValue="value"
            :options="
              themes.map((theme) => ({
                label: theme === 'default' ? capitalize($t('default')) : theme,
                value: theme,
              }))
            "
          >
            <div class="label text-xs font-medium px-3 pt-2 pb-0">
              {{ capitalize($t("theme")) }}
            </div>
          </Field>
        </li>
        <li class="bg-surface-800 transition-colors hover:bg-surface-700 p-8">
          <h2
            class="flex items-center gap-2 text-2xl lg:text-4xl font-bold mb-12"
          >
            <Badge size="xlarge" value="2" />
            <span>
              {{ t("stepEdit") }}
              <span class="inline-flex overflow-hidden">
                <i
                  class="font-serif text-primary inline-block animate-scroll h-[27px] lg:h-[40px] leading-none"
                >
                  <span>{{ $t("resume") }}</span>
                  <br />
                  <span>{{ $t("coverLetter") }}</span>
                  <br />
                  <span>{{ $t("emailSignature") }}</span>
                </i>
              </span>
            </span>
          </h2>
          <div class="flex gap-4 items-end lg:justify-between">
            <Field
              id="firstInput"
              :label="$t('name')"
              transparent
              v-model="firstInput"
              class="[&_input]!bg-white"
            />
            <Field
              id="secondInput"
              :label="$t('title')"
              transparent
              v-model="secondInput"
            />
            <Field
              id="thirdInput"
              :label="$t('address')"
              transparent
              v-model="thirdInput"
            />
          </div>
        </li>
        <li
          class="bg-surface-800 transition-colors hover:bg-surface-700 p-8 row-span-2"
        >
          <h2
            class="flex items-center gap-2 text-2xl lg:text-4xl font-bold mb-12"
          >
            <Badge size="xlarge" value="3" />
            <span>
              {{ t("stepCustomize") }}
              <i class="font-serif text-primary">{{ $t("design") }}</i>
            </span>
          </h2>
          <div class="font-bold text-xl">{{ capitalize($t("name")) }}</div>
          <div class="flex gap-4 items-end lg:justify-between">
            <Field
              id="firstInputColor"
              :label="$t('color')"
              transparent
              v-model="firstInputColor"
              type="color"
            />
            <Field
              id="firstInputIsItalic"
              :label="$t('italic')"
              transparent
              v-model="firstInputIsItalic"
              type="checkbox"
            />
            <Field
              id="firstInputFontWeight"
              :label="$t('fontWeight')"
              transparent
              v-model="firstInputFontWeight"
              type="select"
              :options="[100, 200, 300, 400, 500, 600, 700, 800, 900]"
            />
          </div>
          <div class="font-bold text-xl mt-6">
            {{ capitalize($t("title")) }}
          </div>
          <div class="flex gap-4 items-end lg:justify-between">
            <Field
              id="secondInputColor"
              :label="$t('color')"
              transparent
              v-model="secondInputColor"
              type="color"
            />
            <Field
              id="secondInputIsItalic"
              :label="$t('italic')"
              transparent
              v-model="secondInputIsItalic"
              type="checkbox"
            />
            <Field
              id="secondInputFontWeight"
              :label="$t('fontWeight')"
              transparent
              v-model="secondInputFontWeight"
              type="select"
              :options="[100, 200, 300, 400, 500, 600, 700, 800, 900]"
            />
          </div>
          <div class="font-bold text-xl mt-6">
            {{ capitalize($t("address")) }}
          </div>
          <div class="flex gap-4 items-end lg:justify-between">
            <Field
              id="thirdInputColor"
              :label="$t('color')"
              transparent
              v-model="thirdInputColor"
              type="color"
            />
            <Field
              id="thirdInputIsItalic"
              :label="$t('italic')"
              transparent
              v-model="thirdInputIsItalic"
              type="checkbox"
            />
            <Field
              id="thirdInputFontWeight"
              :label="$t('fontWeight')"
              transparent
              v-model="thirdInputFontWeight"
              type="select"
              :options="[100, 200, 300, 400, 500, 600, 700, 800, 900]"
            />
          </div>
        </li>
        <li
          class="bg-surface-800 transition-colors hover:bg-surface-700 p-8 row-span-4"
        >
          <h2
            class="flex items-center gap-2 text-2xl lg:text-4xl font-bold mb-12"
          >
            <Badge size="xlarge" value="4" />
            <span>
              {{ t("stepPreview") }}
              <i class="font-serif text-primary">{{ t("preview") }}</i>
            </span>
          </h2>
          <div
            class="w-[200px] h-[calc(200px*1.414)] md:w-[400px] md:h-[calc(400px*1.414)] bg-white text-black shadow mx-auto relative"
          >
            <div class="flex flex-col scale-50 md:scale-75 size-full">
              <span
                :style="{
                  color: firstInputColor,
                  fontStyle: firstInputIsItalic ? 'italic' : 'normal',
                  fontWeight: firstInputFontWeight,
                }"
              >
                {{ firstInput }}
              </span>
              <span
                :style="{
                  color: secondInputColor,
                  fontStyle: secondInputIsItalic ? 'italic' : 'normal',
                  fontWeight: secondInputFontWeight,
                }"
              >
                {{ secondInput }}
              </span>
              <span
                :style="{
                  color: thirdInputColor,
                  fontStyle: thirdInputIsItalic ? 'italic' : 'normal',
                  fontWeight: thirdInputFontWeight,
                }"
              >
                {{ thirdInput }}
              </span>
              <div
                class="mt-6 mb-2 text-lg uppercase font-black tracking-wider"
              >
                Work experience
              </div>
              <ol class="flex flex-col gap-2">
                <li>
                  <div>
                    <div class="text-sm">
                      Since {{ new Date().getFullYear() }} - Position at Company
                    </div>
                    <p class="text-xs italic text-slate-600">
                      During this experience I...
                    </p>
                    <ul class="list-disc list-inside text-slate-600">
                      <li class="text-xs leading-none">Cool thing</li>
                      <li class="text-xs leading-none">Nice stuff</li>
                      <li class="text-xs leading-none">Fine task</li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div>
                    <div class="text-sm">
                      {{ new Date().getFullYear() - 3 }} -
                      {{ new Date().getFullYear() }} - Web developer at Piksail
                    </div>
                    <p class="text-xs italic text-slate-600">
                      During this experience I...
                    </p>
                    <ul class="list-disc list-inside text-slate-600">
                      <li class="text-xs leading-none">Good mission</li>
                    </ul>
                  </div>
                </li>
              </ol>
              <div
                class="mt-6 mb-2 text-lg uppercase font-black tracking-wider"
              >
                Education
              </div>
              <ol class="flex flex-col gap-0">
                <li class="text-sm">
                  {{ new Date().getFullYear() - 3 }} - Engineering Diploma
                </li>
                <li class="text-sm">
                  {{ new Date().getFullYear() - 6 }} - A Levels
                </li>
              </ol>
              <div
                class="mt-6 mb-2 text-lg uppercase font-black tracking-wider"
              >
                Skills
              </div>
              <ol>
                <li class="text-xs">I know how to make stuff.</li>
                <li class="text-xs">I also master the art of things.</li>
              </ol>
              <NuxtLink
                :to="localePath('/editor')"
                class="absolute left-1/2 -translate-x-1/2 bottom-0"
              >
                <Button
                  class="uppercase font-black tracking-widest shadow-xl"
                  variant="outlined"
                >
                  {{ t("editMore") }}
                </Button>
              </NuxtLink>
            </div>
          </div>
        </li>
      </ol>
    </section>
    <section class="py-20 px-10 max-w-screen-md mx-auto">
      <p class="text-center text-4xl lg:text-6xl font-bold mb-12">
        Everything is
        <i class="font-serif text-primary">saved locally</i>
      </p>
      <p class="text-center text-2xl mb-12">
        Don't worry about losing your progress
        <br />
        You can even export/import your progress from another device
      </p>
      <p class="text-center text-2xl mb-12">
        Don't feel compelled to finish all at once:
      </p>
      <p class="text-center text-4xl lg:text-6xl font-bold mb-12">
        Edit
        <i class="font-serif text-primary">whenever you want</i>
      </p>
      <div class="flex justify-center">
        <NuxtLink :to="localePath('/editor')">
          <Button
            class="uppercase font-black tracking-widest shadow-xl animate-pulse"
            size="large"
          >
            {{ t("startEditing") }}
          </Button>
        </NuxtLink>
      </div>
    </section>
    <NuxtPage />
  </NuxtLayout>
</template>

<i18n lang="json">
{
  "br": {
    "introVerb": "TODO",
    "introPossessiveAdjective": "TODO",
    "introJobApplication": "TODO",
    "introIndefiniteArticle": "TODO",
    "introPowerWord": "TODO",
    "noCookies": "TODO",
    "noSignUp": "TODO",
    "noPayment": "TODO",
    "privacyFriendly": "TODO",
    "startEditing": "TODO",
    "learnMore": "TODO",
    "editMore": "TODO",
    "stepTheme": "TODO",
    "stepEdit": "TODO",
    "stepCustomize": "TODO",
    "stepPreview": "TODO",
    "preview": "TODO"
  },
  "de": {
    "introVerb": "Machen sie",
    "introPossessiveAdjective": "Irhe",
    "introJobApplication": "Kandidatur",
    "introIndefiniteArticle": "zu einem",
    "introPowerWord": "Kunstwerk",
    "noCookies": "TODO",
    "noSignUp": "TODO",
    "noPayment": "TODO",
    "privacyFriendly": "TODO",
    "startEditing": "Anfangen",
    "learnMore": "TODO",
    "editMore": "TODO",
    "stepTheme": "Wählen Sie ein",
    "stepEdit": "Erstellen Irhe",
    "stepCustomize": "Anpassen die",
    "stepPreview": "TODO",
    "preview": "TODO"
  },
  "en": {
    "introVerb": "Make",
    "introPossessiveAdjective": "your",
    "introJobApplication": "job application",
    "introIndefiniteArticle": "a",
    "introPowerWord": "brand",
    "noCookies": "No cookies.",
    "noSignUp": "No signup.",
    "noPayment": "No payment.",
    "privacyFriendly": "Privacy-friendly.",
    "startEditing": "Start editing",
    "learnMore": "Learn more",
    "editMore": "Edit more",
    "stepTheme": "Pick a",
    "stepEdit": "Edit your",
    "stepCustomize": "Adapt the",
    "stepPreview": "Preview and",
    "preview": "download"
  },
  "es": {
    "introVerb": "TODO",
    "introPossessiveAdjective": "TODO",
    "introJobApplication": "TODO",
    "introIndefiniteArticle": "TODO",
    "introPowerWord": "TODO",
    "noCookies": "TODO",
    "noSignUp": "TODO",
    "noPayment": "TODO",
    "privacyFriendly": "TODO",
    "startEditing": "TODO",
    "learnMore": "TODO",
    "editMore": "TODO",
    "stepTheme": "TODO",
    "stepEdit": "TODO",
    "stepCustomize": "TODO",
    "stepPreview": "TODO",
    "preview": "TODO"
  },
  "fr": {
    "introVerb": "De",
    "introPossessiveAdjective": "votre",
    "introJobApplication": "candidature",
    "introIndefiniteArticle": "une",
    "introPowerWord": "œuvre",
    "noCookies": "Sans cookie.",
    "noSignUp": "Sans inscription.",
    "noPayment": "Gratuit.",
    "privacyFriendly": "Confidentiel.",
    "startEditing": "Commencer à éditer",
    "learnMore": "En savoir plus",
    "editMore": "Continuer à éditer",
    "stepTheme": "Choisissez un",
    "stepEdit": "Editez votre",
    "stepCustomize": "Adaptez le",
    "stepPreview": "Prévisualisez et",
    "preview": "téléchargez"
  }
}
</i18n>
