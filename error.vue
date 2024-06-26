<script setup lang="ts">
import { useError } from "nuxt/app";
import Card from "@/components/Card.vue";

const error = useError();
</script>

<template>
  <NuxtLayout name="landing">
    <section class="p-20">
      <Card>
        <p class="text-4xl font-bold">
          Hold on a minute,
          <br />
          seems like something went wrong
        </p>
        <p v-if="error">{{ error.message }}</p>
        <NuxtLink to="/">
          <button class="button bg-white mx-auto mt-8">
            <span class="textGradient">Go to home page</span>
          </button>
        </NuxtLink>
      </Card>
    </section>
  </NuxtLayout>
</template>
