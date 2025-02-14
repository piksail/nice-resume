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
          <li>No cookies.</li>
          <li>No signup.</li>
          <li>No payment.</li>
          <li>Privacy-friendly.</li>
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
          class="w-[100px] h-[calc(100px*1.414)] lg:w-[300px] lg:h-[calc(300px*1.414)] xl:w-[400px] xl:h-[calc(400px*1.414)] shadow bg-white text-black flex flex-col p-4 animate-float [animation-delay:0.7s]"
        >
          <span :style="{ color: firstStyleInput }">{{ firstInput }}</span>
          <span :style="{ fontStyle: secondStyleInput ? 'italic' : 'normal' }">
            {{ secondInput }}
          </span>
          <span :style="{ fontWeight: thirdStyleInput }">{{ thirdInput }}</span>
        </div>
        <div
          class="hidden transition-all hover:shadow-xl absolute top-1/2 -left-1/4 mt-12 lg:w-[400px] xl:w-[600px] lg:grid grid-cols-3 gap-4 items-end bg-surface-800 p-6 rounded"
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
            :label="$t('title')"
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
    <section class="py-20 px-10 max-w-screen-2xl mx-auto">
      <ol
        class="grid grid-cols-1 lg:grid-cols-2 grid-rows-3 lg:grid-flow-col gap-3"
      >
        <li class="bg-surface-800 transition-colors hover:bg-surface-700 p-8">
          <h2 class="text-2xl lg:text-4xl font-bold mb-12">
            <Badge size="xlarge" value="1" />
            {{ t("stepTheme") }}
            <i class="font-serif text-primary">{{ $t("theme") }}</i>
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
          <h2 class="text-2xl lg:text-4xl font-bold mb-12">
            <Badge size="xlarge" value="2" />
            {{ t("stepEdit") }}
            <span class="inline-flex overflow-hidden h-[41px]">
              <i
                class="font-serif text-primary inline-block animate-scroll h-[41px]"
              >
                <span>{{ $t("resume") }}</span>
                <br />
                <span>{{ $t("coverLetter") }}</span>
                <br />
                <span>{{ $t("emailSignature") }}</span>
              </i>
            </span>
          </h2>
          <div class="grid grid-cols-3 gap-4 items-end">
            <Field
              id="introFirstInput"
              :label="$t('name')"
              transparent
              v-model="firstInput"
              class="[&_input]!bg-white"
            />
            <Field
              id="introSecondInput"
              :label="$t('title')"
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
        </li>
        <li class="bg-surface-800 transition-colors hover:bg-surface-700 p-8">
          <h2 class="text-2xl lg:text-4xl font-bold mb-12">
            <Badge size="xlarge" value="3" />
            {{ t("stepCustomize") }}
            <i class="font-serif text-primary">{{ $t("design") }}</i>
          </h2>
          <div class="grid grid-cols-3 gap-4 items-end">
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
        <li
          class="bg-surface-800 transition-colors hover:bg-surface-700 p-8 row-span-3"
        >
          <h2 class="text-2xl lg:text-4xl font-bold mb-12">
            <Badge size="xlarge" value="4" />
            {{ t("stepPreview") }}
            <i class="font-serif text-primary">{{ $t("preview") }}</i>
          </h2>
          <div
            class="w-[200px] h-[calc(200px*1.414)] md:w-[400px] md:h-[calc(400px*1.414)] bg-white text-black shadow mx-auto relative"
          >
            <div class="flex flex-col scale-50 md:scale-75 size-full">
              <span :style="{ color: firstStyleInput }">{{ firstInput }}</span>
              <span
                :style="{ fontStyle: secondStyleInput ? 'italic' : 'normal' }"
              >
                {{ secondInput }}
              </span>
              <span :style="{ fontWeight: thirdStyleInput }">
                {{ thirdInput }}
              </span>
              <div>Work experience</div>
              <ol>
                <li>
                  <div>
                    <div>
                      Since {{ new Date().getFullYear() }} - Web developer at
                      Piksail
                    </div>
                    <p>About</p>
                    <ul>
                      <li>Tag list</li>
                      <li>Tag list</li>
                      <li>Tag list</li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div>
                    <div>
                      {{ new Date().getFullYear() - 3 }} -
                      {{ new Date().getFullYear() }} - Web developer at Piksail
                    </div>
                    <p>About</p>
                    <ul>
                      <li>Tag list</li>
                      <li>Tag list</li>
                      <li>Tag list</li>
                    </ul>
                  </div>
                </li>
              </ol>
              <div>Education</div>
              <ol>
                <li>
                  {{ new Date().getFullYear() - 3 }} - Engineering Diploma
                </li>
                <li>Since {{ new Date().getFullYear() - 3 }} - A Levels</li>
              </ol>
              <div>Skills</div>
              <ol>
                <li>A</li>
                <li>B</li>
              </ol>
              <div>Languages</div>
              <ol>
                <li>EN (mother tongue)</li>
                <li>FR</li>
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
    "editMore": "TODO",
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
    "editMore": "TODO",
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
    "editMore": "Edit more",
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
    "editMore": "TODO",
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
    "editMore": "Continuer à éditer",
    "stepTheme": "Choisissez un",
    "stepEdit": "Editez votre",
    "stepCustomize": "Adaptez le",
    "stepPreview": "TODO"
  }
}
</i18n>
