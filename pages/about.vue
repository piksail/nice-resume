<script setup lang="ts">
import { ref } from "vue";
import Card from "~/components/Card.vue";
import ToolComparator from "~/fragments/ToolComparator.vue";

const title = ref("Nice resume");

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
    <Meta name="description" :content="title" />
  </Head>
  <NuxtLayout name="landing">
    <section class="p-20">
      <section class="p-20 max-w-screen-xl mx-auto">
        <h2 class="drop-shadow-lg text-5xl font-bold mb-32">
          Handcrafted themes + famous themes from JSONResume.org, OpenResume,
          ...
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
      </section>
      <section class="p-20 max-w-screen-xl mx-auto">
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
          <Card
            class="relative left-44 bottom-56 backdrop-blur backdrop-filter"
          >
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
      </section>
      <section class="p-20 max-w-screen-2xl mx-auto">
        TODO expliquer que y avait besoin d'un enième CV builder
        <h2 class="drop-shadow-lg text-5xl font-bold mb-32">
          {{ t("todo") }}
          <i class="font-serif text-primary">{{ $t("todo") }}</i>
        </h2>
        <ToolComparator />
      </section>
    </section>
  </NuxtLayout>
</template>
