<script setup lang="ts">
import { ref } from "vue";
import Card from "@/components/Card.vue";

const title = ref("Nice resume");
const description = ref(
  "Pick a design, build your resume, write your cover letter, adapt the design to your need with Nice Resume.",
);
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
    <section class="p-20">
      <Card>
        <p class="text-4xl font-bold">
          Pick a design
          <br />
          Build your resume
          <br />
          Write your cover letter
          <br />
          Adapt the design to your need
        </p>
        <p class="text-2xl font-semibold mt-8">
          It's
          <i class="font-serif">that</i>
          simple
        </p>
        <NuxtLink to="/editor">
          <button class="button bg-white mx-auto mt-8">
            <span class="textGradient">Get started</span>
          </button>
        </NuxtLink>
      </Card>
      <div class="max-w-screen-md mx-auto">
        <p class="text-lg font-thin text-right">
          No cookies. No signup. No payment. Privacy-friendly.
        </p>
      </div>
    </section>
    <section class="p-20 max-w-screen-xl mx-auto">
      <h2 class="text-5xl font-bold mb-32">Pick a design</h2>
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
      <h2 class="text-5xl font-bold mb-32 text-right">Build your resume</h2>
      <p>TODO screenshot editor</p>
    </section>
    <section class="p-20 max-w-screen-xl mx-auto">
      <h2 class="text-5xl font-bold mb-32">Write your cover letter</h2>
      <div class="flex gap-10">
        <p class="flex-1">TODO screenshot editor</p>
        <img
          src="/macchiato-cover-letter-example.png"
          alt="Example of a cover letter written and styled with Nice Resume"
          class="w-[400px] h-[calc(400px*1.414)] bg-white shadow hover:scale-105 transition-all"
        />
      </div>
    </section>
    <section class="p-20 max-w-screen-xl mx-auto">
      <h2 class="text-5xl font-bold mb-32 text-right">
        Adapt the design to your need
      </h2>
      <p class="flex-1">TODO screenshot style editor</p>
    </section>
    <NuxtPage />
  </NuxtLayout>
</template>
