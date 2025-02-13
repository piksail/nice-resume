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
    <section class="p-20 pb-0 flex justify-center">
      <div>
        <h1 class="mx-auto text-justify drop-shadow-lg">
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
        <!-- <div
          class="mt-12 grid grid-cols-3 gap-4 items-end bg-surface-800 p-6 rounded"
        >
          <Field
            :label="$t('name')"
            transparent
            v-model="firstInput"
            class="[&_input]!bg-white"
          />
          <Field :label="$t('phone')" transparent v-model="secondInput" />
          <Field :label="$t('address')" transparent v-model="thirdInput" />
          <Field
            :label="$t('color')"
            transparent
            v-model="firstStyleInput"
            type="color"
          />
          <Field
            :label="$t('italic')"
            transparent
            v-model="secondStyleInput"
            type="checkbox"
          />
          <Field
            :label="$t('fontWeight')"
            transparent
            v-model="thirdStyleInput"
            type="select"
            :options="[100, 200, 300, 400, 500, 600, 700, 800, 900]"
          />
        </div> -->
        <div class="flex gap-7">
          <NuxtLink :to="localePath('/editor')">
            <Button
              class="uppercase font-black tracking-widest mt-24 shadow-xl"
              size="large"
            >
              {{ t("getStarted") }}
            </Button>
          </NuxtLink>
          <NuxtLink :to="localePath('/about')">
            <Button
              class="uppercase font-black tracking-widest mt-24 shadow-xl"
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
      </div>
      <div
        class="skew-y-12 transition-all hover:shadow-xl absolute top-1/2 left-1/2 mt-12 grid grid-cols-3 gap-4 items-end bg-surface-800 p-6 rounded"
      >
        <Field
          :label="$t('name')"
          transparent
          v-model="firstInput"
          class="[&_input]!bg-white"
        />
        <Field :label="$t('phone')" transparent v-model="secondInput" />
        <Field :label="$t('address')" transparent v-model="thirdInput" />
        <Field
          :label="$t('color')"
          transparent
          v-model="firstStyleInput"
          type="color"
        />
        <Field
          :label="$t('italic')"
          transparent
          v-model="secondStyleInput"
          type="checkbox"
        />
        <Field
          :label="$t('fontWeight')"
          transparent
          v-model="thirdStyleInput"
          type="select"
          :options="[100, 200, 300, 400, 500, 600, 700, 800, 900]"
        />
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
    "getStarted": "TODO!",
    "learnMore": "TODO"
  },
  "de": {
    "introVerb": "Machen sie",
    "introPossessiveAdjective": "Irhe",
    "introJobApplication": "Kandidatur",
    "introIndefiniteArticle": "zu einem",
    "introPowerWord": "Kunstwerk",
    "getStarted": "Anfangen",
    "learnMore": "TODO"
  },
  "en": {
    "introVerb": "Make",
    "introPossessiveAdjective": "your",
    "introJobApplication": "job application",
    "introIndefiniteArticle": "a",
    "introPowerWord": "brand",
    "getStarted": "Get started!",
    "learnMore": "Learn more"
  },
  "es": {
    "introVerb": "TODO",
    "introPossessiveAdjective": "TODO",
    "introJobApplication": "TODO",
    "introIndefiniteArticle": "TODO",
    "introPowerWord": "TODO",
    "getStarted": "TODO",
    "learnMore": "TODO"
  },
  "fr": {
    "introVerb": "De",
    "introPossessiveAdjective": "votre",
    "introJobApplication": "candidature",
    "introIndefiniteArticle": "une",
    "introPowerWord": "œuvre",
    "getStarted": "C'est parti\xa0!",
    "learnMore": "En savoir plus"
  }
}
</i18n>
