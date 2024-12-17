<script setup lang="ts">
import { useError } from "nuxt/app";
import Card from "@/components/Card.vue";

// eslint-disable-next-line no-undef
const localePath = useLocalePath();

// eslint-disable-next-line no-undef
const { t } = useI18n({
  useScope: "local",
});

const error = useError();
</script>

<template>
  <NuxtLayout name="landing">
    <section class="p-20">
      <Card>
        <p class="text-4xl font-bold">
          {{ t("introWait") }}
          <br />
          {{ t("introWrong") }}
        </p>
        <p v-if="error">{{ error.message }}</p>
        <NuxtLink :to="localePath('/')">
          <button class="button bg-white mx-auto mt-8">
            <span class="textGradient">{{ t("goToHome") }}</span>
          </button>
        </NuxtLink>
      </Card>
    </section>
  </NuxtLayout>
</template>

<i18n lang="json">
{
  "br": {
    "introWait": "TODO",
    "introWrong": "TODO",
    "goToHome": "TODO"
  },
  "de": {
    "introWait": "TODO",
    "introWrong": "TODO",
    "goToHome": "TODO"
  },
  "en": {
    "introWait": "Hold on a minute,",
    "introWrong": "seems like something went wrong.",
    "goToHome": "Go to home page"
  },
  "es": {
    "introWait": "TODO",
    "introWrong": "TODO",
    "goToHome": "TODO"
  },
  "fr": {
    "introWait": "Un instant,",
    "introWrong": "une erreur est survenue.",
    "goToHome": "Retourner à la page d'accueil"
  }
}
</i18n>
