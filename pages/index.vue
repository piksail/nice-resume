<script setup lang="ts">
import { ref } from "vue";
import { capitalize } from "@/utils/string";

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
const secondInput = ref(capitalize(t("phone")));
const thirdInput = ref(capitalize(t("address")));
const firstStyleInput = ref("#e11d48");
const secondStyleInput = ref(false);
const thirdStyleInput = ref(400);
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
          <span class="text-9xl font-bold tracking-wide">
            {{ t("introVerb") }}
            <i class="font-serif text-primary">
              {{ t("introPossessiveAdjective") }}
            </i>
          </span>
          <br />
          <span class="text-8xl font-bold tracking-wide">
            {{ t("introJobApplication") }}
          </span>
          <br />
          <span class="text-7xl font-black">
            {{ t("introIndefiniteArticle") }}
            <i class="font-serif tracking-widest text-8xl text-primary">
              {{ t("introPowerWord") }}
            </i>
          </span>
        </h1>
        <p class="text-2xl font-light mt-12">
          No cookies. No signup. No payment. Privacy-friendly.
        </p>
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
      <div class="skew-y-12 mx-auto mt-14 group">
        <div
          class="w-[400px] h-[calc(400px*1.414)] shadow bg-primary absolute -z-50 left-7 -top-7 transition-all group-hover:left-14 group-hover:-top-14 animate-float"
        />
        <div
          class="w-[400px] h-[calc(400px*1.414)] shadow bg-white text-black flex flex-col p-4 animate-float [animation-delay:0.7s]"
        >
          <span :style="{ color: firstStyleInput }">{{ firstInput }}</span>
          <span :style="{ fontStyle: secondStyleInput ? 'italic' : 'normal' }">
            {{ secondInput }}
          </span>
          <span :style="{ fontWeight: thirdStyleInput }">{{ thirdInput }}</span>
        </div>
        <div
          class="transition-all hover:shadow-xl absolute top-1/2 -left-1/4 mt-12 w-[600px] grid grid-cols-3 gap-4 items-end bg-surface-800 p-6 rounded"
        >
          <Field
            id="introFirstInput"
            :label="$t('name')"
            transparent
            v-model="firstInput"
            class="[&_input]!bg-white"
          />
          <Field
            id="introSecondInput"
            :label="$t('phone')"
            transparent
            v-model="secondInput"
          />
          <Field
            id="introThirdInput"
            :label="$t('address')"
            transparent
            v-model="thirdInput"
          />
          <Field
            id="introFirstStyleInput"
            :label="$t('color')"
            transparent
            v-model="firstStyleInput"
            type="color"
          />
          <Field
            id="introSecondStyleInput"
            :label="$t('italic')"
            transparent
            v-model="secondStyleInput"
            type="checkbox"
          />
          <Field
            id="introThirdStyleInput"
            :label="$t('fontWeight')"
            transparent
            v-model="thirdStyleInput"
            type="select"
            :options="[100, 200, 300, 400, 500, 600, 700, 800, 900]"
          />
        </div>
      </div>
    </section>
    <section class="max-w-screen-2xl mx-auto">
      <ol class="grid grid-cols-3 grid-rows-2 grid-flow-col gap-3">
        <li class="border-2 border-surface-800 row-span-2">
          <h2 class="text-4xl font-bold mb-32">
            <Badge size="xlarge" value="1" />
            {{ t("stepTheme") }}
            <i class="font-serif text-primary">{{ $t("theme") }}</i>
          </h2>
          <div class="grid grid-cols-3">
            <img
              src="/paper-example.png"
              alt="First example of a resume built with Nice Resume"
              class=""
            />
            <img
              src="/macchiato-example.png"
              alt="Second example of a resume built with Nice Resume"
              class=""
            />
            <img
              src="/stone-example.png"
              alt="Third example of a resume built with Nice Resume"
              class=""
            />
          </div>
        </li>
        <li class="border-2 border-surface-800">
          <h2 class="text-4xl font-bold mb-32">
            <Badge size="xlarge" value="2" />
            {{ t("stepEdit") }}
            <i class="font-serif text-primary">{{ $t("resume") }}</i>
          </h2>
          <div class="relative mx-auto group">
            <!-- <img
              src="/profile-editor.png"
              alt="Screenshot of the profile editor"
              class="w-[600px] bg-white shadow group-hover:scale-110 group-hover:shadow-lg transition-all"
            /> -->
            <div
              class="grid grid-cols-3 gap-4 items-end bg-surface-800 p-6 rounded"
            >
              <Field
                id="introFirstInput"
                :label="$t('name')"
                transparent
                v-model="firstInput"
                class="[&_input]!bg-white"
              />
              <Field
                id="introSecondInput"
                :label="$t('phone')"
                transparent
                v-model="secondInput"
              />
              <Field
                id="introThirdInput"
                :label="$t('address')"
                transparent
                v-model="thirdInput"
              />
            </div>
          </div>
        </li>
        <li class="border-2 border-surface-800">
          <h2 class="text-4xl font-bold mb-32">
            <Badge size="xlarge" value="3" />
            {{ t("stepCustomize") }}
            <i class="font-serif text-primary">{{ $t("design") }}</i>
          </h2>
          <div
            class="grid grid-cols-3 gap-4 items-end bg-surface-800 p-6 rounded"
          >
            <Field
              id="introFirstStyleInput"
              :label="$t('color')"
              transparent
              v-model="firstStyleInput"
              type="color"
            />
            <Field
              id="introSecondStyleInput"
              :label="$t('italic')"
              transparent
              v-model="secondStyleInput"
              type="checkbox"
            />
            <Field
              id="introThirdStyleInput"
              :label="$t('fontWeight')"
              transparent
              v-model="thirdStyleInput"
              type="select"
              :options="[100, 200, 300, 400, 500, 600, 700, 800, 900]"
            />
          </div>
        </li>
        <li class="border-2 border-surface-800 row-span-2">
          <h2 class="text-4xl font-bold mb-32">
            <Badge size="xlarge" value="4" />
            {{ t("stepPreview") }}
            <i class="font-serif text-primary">{{ $t("preview") }}</i>
          </h2>
          <div class="w-[400px] h-[calc(400px*1.414)] shadow bg-white">
            <span :style="{ color: firstStyleInput }">{{ firstInput }}</span>
            <span
              :style="{ fontStyle: secondStyleInput ? 'italic' : 'normal' }"
            >
              {{ secondInput }}
            </span>
            <span :style="{ fontWeight: thirdStyleInput }">
              {{ thirdInput }}
            </span>
          </div>
        </li>
      </ol>
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
    "startEditing": "TODO",
    "learnMore": "TODO",
    "stepTheme": "TODO",
    "stepEdit": "TODO",
    "stepCustomize": "TODO",
    "stepPreview": "TODO"
  },
  "de": {
    "introVerb": "Machen sie",
    "introPossessiveAdjective": "Irhe",
    "introJobApplication": "Kandidatur",
    "introIndefiniteArticle": "zu einem",
    "introPowerWord": "Kunstwerk",
    "startEditing": "Anfangen",
    "learnMore": "TODO",
    "stepTheme": "Wählen Sie ein",
    "stepEdit": "Erstellen Irhe",
    "stepCustomize": "Anpassen die",
    "stepPreview": "TODO"
  },
  "en": {
    "introVerb": "Make",
    "introPossessiveAdjective": "your",
    "introJobApplication": "job application",
    "introIndefiniteArticle": "a",
    "introPowerWord": "brand",
    "startEditing": "Start editing",
    "learnMore": "Learn more",
    "stepTheme": "Pick a",
    "stepEdit": "Edit your",
    "stepCustomize": "Adapt the",
    "stepPreview": "TODO"
  },
  "es": {
    "introVerb": "TODO",
    "introPossessiveAdjective": "TODO",
    "introJobApplication": "TODO",
    "introIndefiniteArticle": "TODO",
    "introPowerWord": "TODO",
    "startEditing": "TODO",
    "learnMore": "TODO",
    "stepTheme": "TODO",
    "stepEdit": "TODO",
    "stepCustomize": "TODO",
    "stepPreview": "TODO"
  },
  "fr": {
    "introVerb": "De",
    "introPossessiveAdjective": "votre",
    "introJobApplication": "candidature",
    "introIndefiniteArticle": "une",
    "introPowerWord": "œuvre",
    "startEditing": "Commencer à éditer",
    "learnMore": "En savoir plus",
    "stepTheme": "Choisissez un",
    "stepEdit": "Editez votre",
    "stepCustomize": "Adaptez le",
    "stepPreview": "TODO"
  }
}
</i18n>
