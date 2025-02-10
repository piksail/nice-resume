<script setup lang="ts">
import { ref } from "vue";
import Card from "@/components/Card.vue";

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
      <h1 class="mx-auto text-justify drop-shadow-lg">
        <span class="text-9xl font-bold tracking-wide">
          {{ t("introVerb") }}
          <i class="font-serif">{{ t("introPossessiveAdjective") }}</i>
        </span>
        <br />
        <span class="text-8xl font-bold tracking-wide">
          {{ t("introJobApplication") }}
        </span>
        <br />
        <span class="flex justify-between items-end">
          <span class="text-7xl font-black mr-2">
            {{ t("introIndefiniteArticle") }}
          </span>
          <NuxtLink :to="localePath('/editor')">
            <button
              class="bg-white px-6 py-3 pt-1 rounded mt-10 shadow-lg transition-all hover:bg-transparent hover:shadow-none group"
            >
              <span
                class="relative text-9xl uppercase font-black tracking-widest bg-gradient-to-br from-blue-700 to-pink-500 text-transparent bg-clip-text inline-block transition-all duration-400 group-hover:text-white group-hover:translate-y-4"
              >
                <span>{{ t("introPowerWord") }}</span>
                <span
                  class="pi pi-file-import text-8xl transition-all duration-400 group-hover:text-9xl"
                />
              </span>
            </button>
          </NuxtLink>
        </span>
      </h1>
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
          <button class="button bg-white mx-auto mt-8">
            <span class="textGradient">{{ t("getStarted") }}</span>
          </button>
        </NuxtLink>
      </Card>
      <div class="max-w-screen-md mx-auto">
        <p class="text-lg font-thin text-right">
          No cookies. No signup. No payment. Privacy-friendly.
        </p>
      </div>
    </section> -->
    <section class="p-20 max-w-screen-xl mx-auto">
      <h2 class="drop-shadow-lg text-5xl font-bold mb-32">
        {{ t("stepTheme") }}
        <i class="font-serif">{{ $t("theme") }}</i>
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
    </section>
    <section class="p-20 max-w-screen-xl mx-auto">
      <h2 class="drop-shadow-lg text-5xl font-bold mb-32 text-right">
        {{ t("stepResume") }}
        <i class="font-serif">{{ $t("resume") }}</i>
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
          <button class="button bg-white mx-auto mt-8">
            <span class="textGradient">{{ t("getStarted") }}</span>
          </button>
        </NuxtLink>
      </div>
    </section>
    <section class="p-20 max-w-screen-xl mx-auto">
      <h2 class="drop-shadow-lg text-5xl font-bold mb-32">
        {{ t("stepLetter") }}
        <i class="font-serif">{{ $t("coverLetter") }}</i>
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
          <button class="button bg-white mx-auto mt-8">
            <span class="textGradient">{{ t("getStarted") }}</span>
          </button>
        </NuxtLink>
      </div>
    </section>
    <section class="p-20 max-w-screen-xl mx-auto">
      <h2 class="drop-shadow-lg text-5xl font-bold mb-32 text-right">
        {{ t("stepEmail") }}
        <i class="font-serif">{{ $t("email") }}</i>
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
          <button class="button bg-white mx-auto mt-8">
            <span class="textGradient">{{ t("getStarted") }}</span>
          </button>
        </NuxtLink>
      </div>
    </section>
    <section class="p-20 max-w-screen-xl mx-auto">
      <h2 class="drop-shadow-lg text-5xl font-bold mb-32">
        {{ t("stepCustomize") }}
        <i class="font-serif">{{ $t("design") }}</i>
      </h2>
      <div class="relative mx-auto group">
        <img
          src="/style-editor.png"
          alt="Screenshot of the style editor"
          class="w-[600px] bg-white shadow group-hover:scale-110 group-hover:shadow-lg transition-all"
        />
        <NuxtLink :to="localePath('/editor')">
          <button class="button bg-white mx-auto mt-8">
            <span class="textGradient">{{ t("getStarted") }}</span>
          </button>
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
