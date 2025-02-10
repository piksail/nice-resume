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
          <NuxtLink :to="localePath('/editor')">
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
    <!-- <section class="p-20">
      <Card>
        <p class="text-4xl font-bold">
          {{ t("stepTheme") }}
          <br />
          {{ t("stepResume") }}
          <br />
          {{ t("stepLetter") }}
          <br />
          {{ t("stepCustomize") }}
        </p>
        <p class="text-2xl font-semibold mt-8">
          It's
          <i class="font-serif">that</i>
          simple
        </p>
        <NuxtLink :to="localePath('/editor')">
          <Button class="uppercase font-black tracking-widest mx-auto mt-8">
            {{ t("getStarted") }}
          </Button>
        </NuxtLink>
      </Card>
      <div class="max-w-screen-md mx-auto">
        <p class="text-lg font-thin text-right">
          No cookies. No signup. No payment. Privacy-friendly.
        </p>
      </div>
    </section> -->
    <!-- <section class="p-20 max-w-screen-xl mx-auto">
      <h2 class="drop-shadow-lg text-5xl font-bold mb-32">
        {{ t("stepTheme") }}
        <i class="font-serif text-primary">{{ $t("theme") }}</i>
      </h2>
      <div class="relative h-[calc((400px*1.414)+50px)] mx-auto group">
        <img
          src="/paper-example.png"
          alt="First example of a resume built with Nice Resume"
          class="absolute mx-auto left-0 right-0 w-[400px] h-[calc(400px*1.414)] -rotate-6 -translate-x-32 bg-white shadow group-hover:-translate-x-60 group-hover:-rotate-12 group-hover:scale-105 group-hover:shadow-lg transition-all"
        />
        <img
          src="/macchiato-example.png"
          alt="Second example of a resume built with Nice Resume"
          class="absolute z-[1] mx-auto left-0 right-0 -translate-y-6 w-[400px] h-[calc(400px*1.414)] bg-white shadow group-hover:-translate-y-10 group-hover:-rotate-1 group-hover:scale-105 group-hover:shadow-lg transition-all"
        />
        <img
          src="/stone-example.png"
          alt="Third example of a resume built with Nice Resume"
          class="absolute mx-auto left-0 right-0 w-[400px] h-[calc(400px*1.414)] rotate-3 translate-x-32 bg-white shadow group-hover:translate-x-60 group-hover:rotate-6 group-hover:scale-105 group-hover:shadow-lg transition-all"
        />
      </div>
    </section> -->
    <!-- <section class="p-20 max-w-screen-xl mx-auto">
      <h2 class="drop-shadow-lg text-5xl font-bold mb-32 text-right">
        {{ t("stepResume") }}
        <i class="font-serif text-primary">{{ $t("resume") }}</i>
      </h2>
      <div class="relative mx-auto group">
        <img
          src="/macchiato-example.png"
          alt="Second example of a resume built with Nice Resume"
          class="absolute -z-[1] -top-24 -left-56 w-[400px] group-hover:-translate-x-10 transition-all"
        />
        <img
          src="/resume-editor-screenshot.png"
          alt="Screenshot of the resume editor"
          class="w-[600px] bg-white shadow group-hover:scale-110 group-hover:shadow-lg transition-all"
        />
        <Card class="relative left-44 bottom-56 backdrop-blur backdrop-filter">
          <p
            class="text-3xl relative after:content-[''] after:relative after:-left-2 after:top-1 after:h-9 after:w-[2px] after:bg-white after:inline-block after:animate-cursor-blink"
          >
            Helped the team achieved its goal
          </p>
        </Card>
        <NuxtLink :to="localePath('/editor')">
          <Button class="uppercase font-black tracking-widest mx-auto mt-8">
            {{ t("getStarted") }}
          </Button>
        </NuxtLink>
      </div>
    </section> -->
    <!-- <section class="p-20 max-w-screen-xl mx-auto">
      <h2 class="drop-shadow-lg text-5xl font-bold mb-32">
        {{ t("stepLetter") }}
        <i class="font-serif text-primary">{{ $t("coverLetter") }}</i>
      </h2>
      <div class="flex gap-10 relative">
        <img
          src="/macchiato-letter-example.png"
          alt="Example of a cover letter written and styled with Nice Resume"
          class="w-[400px] h-[calc(400px*1.414)] bg-white shadow hover:scale-105 transition-all"
        />
        <img
          src="/letter-editor.png"
          alt="Screenshot of the cover letter editor"
          class="h-[calc(400px*1.414)] bg-white shadow hover:scale-105 transition-all"
        />
        <Card class="absolute right-32 bottom-6 backdrop-blur backdrop-filter">
          <p
            class="text-3xl relative after:content-[''] after:relative after:-left-2 after:top-1 after:h-9 after:w-[2px] after:bg-white after:inline-block after:animate-cursor-blink"
          >
            Regards,
            <br />
            Firstname Lastname
          </p>
        </Card>
        <NuxtLink :to="localePath('/editor')">
          <Button class="uppercase font-black tracking-widest mx-auto mt-8">
            {{ t("getStarted") }}
          </Button>
        </NuxtLink>
      </div>
    </section> -->
    <!-- <section class="p-20 max-w-screen-xl mx-auto">
      <h2 class="drop-shadow-lg text-5xl font-bold mb-32 text-right">
        {{ t("stepEmail") }}
        <i class="font-serif text-primary">{{ $t("email") }}</i>
      </h2>
      <div class="relative mx-auto flex group">
        <img
          src="/email-editor.png"
          alt="Screenshot of the email editor"
          class="w-[600px] bg-white shadow group-hover:scale-110 group-hover:shadow-lg transition-all"
        />
        <img
          src="/macchiato-email-example.png"
          alt="Example of an email signed with Nice Resume"
          class="absolute left-14 top-14 w-[600px] bg-white shadow group-hover:scale-110 group-hover:shadow-lg group-hover:translate-x-3/4 transition-all"
        />
        <NuxtLink :to="localePath('/editor')">
          <Button class="uppercase font-black tracking-widest mx-auto mt-8">
            {{ t("getStarted") }}
          </Button>
        </NuxtLink>
      </div>
    </section> -->
    <!-- <section class="p-20 max-w-screen-xl mx-auto">
      <h2 class="drop-shadow-lg text-5xl font-bold mb-32">
        {{ t("stepCustomize") }}
        <i class="font-serif text-primary">{{ $t("design") }}</i>
      </h2>
      <div class="relative mx-auto group">
        <img
          src="/style-editor.png"
          alt="Screenshot of the style editor"
          class="w-[600px] bg-white shadow group-hover:scale-110 group-hover:shadow-lg transition-all"
        />
        <NuxtLink :to="localePath('/editor')">
          <Button class="uppercase font-black tracking-widest mx-auto mt-8">
            {{ t("getStarted") }}
          </Button>
        </NuxtLink>
      </div>
    </section> -->
    <!-- <section class="p-20 max-w-screen-2xl mx-auto">
      <h2 class="drop-shadow-lg text-5xl font-bold mb-32">
        {{ t("todo") }}
        <i class="font-serif text-primary">{{ $t("todo") }}</i>
      </h2>
      <ToolComparator />
    </section> -->
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
    "stepTheme": "TODO",
    "stepResume": "TODO",
    "stepLetter": "TODO",
    "stepEmail": "TODO",
    "stepCustomize": "TODO",
    "getStarted": "TODO!"
  },
  "de": {
    "introVerb": "Machen sie",
    "introPossessiveAdjective": "Irhe",
    "introJobApplication": "Kandidatur",
    "introIndefiniteArticle": "zu einem",
    "introPowerWord": "Kunstwerk",
    "stepTheme": "Wählen Sie ein",
    "stepResume": "Erstellen Irhe",
    "stepLetter": "Schreiben Ihre",
    "stepEmail": "Zeichen Ihre",
    "stepCustomize": "Anpassen die",
    "getStarted": "Anfangen"
  },
  "en": {
    "introVerb": "Make",
    "introPossessiveAdjective": "your",
    "introJobApplication": "job application",
    "introIndefiniteArticle": "a",
    "introPowerWord": "brand",
    "stepTheme": "Pick a",
    "stepResume": "Build your",
    "stepLetter": "Write your",
    "stepEmail": "Sign your",
    "stepCustomize": "Adapt the",
    "getStarted": "Get started!"
  },
  "es": {
    "introVerb": "TODO",
    "introPossessiveAdjective": "TODO",
    "introJobApplication": "TODO",
    "introIndefiniteArticle": "TODO",
    "introPowerWord": "TODO",
    "stepTheme": "TODO",
    "stepResume": "TODO",
    "stepLetter": "TODO",
    "stepEmail": "TODO",
    "stepCustomize": "TODO",
    "getStarted": "TODO"
  },
  "fr": {
    "introVerb": "De",
    "introPossessiveAdjective": "votre",
    "introJobApplication": "candidature",
    "introIndefiniteArticle": "une",
    "introPowerWord": "œuvre",
    "stepTheme": "Choisissez un",
    "stepResume": "Composez votre",
    "stepLetter": "Rédigez votre",
    "stepEmail": "Signez votre",
    "stepCustomize": "Adaptez le",
    "getStarted": "C'est parti\xa0!"
  }
}
</i18n>
