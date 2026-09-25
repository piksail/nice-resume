<script setup lang="ts">
import { ref } from "vue";
import { useAppwrite } from "@/composables/use-appwrite";
import { useAppwriteStore } from "@/stores/appwrite";
import { APP_NAME } from "@/globals";

definePageMeta({
  layout: "landing",
});

const { t } = useI18n();
const appwrite = useAppwrite();

const email = ref("");
const password = ref("");
const isLoading = ref(false);
const error = ref("");

async function signIn() {
  if (!email.value || !password.value) return;
  isLoading.value = true;
  error.value = "";
  try {
    await appwrite.createEmailPasswordSession(email.value, password.value);
    const store = useAppwriteStore();
    await store.initAuth();
    await navigateTo("/documents");
  } catch (e) {
    error.value = e instanceof Error ? e.message : "An error occurred";
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-md space-y-8">
      <div class="text-center">
        <h1 class="text-3xl font-bold">{{ APP_NAME }}</h1>
        <p class="mt-2 text-muted-foreground">
          {{ t("authSignInPrompt") }}
        </p>
      </div>

      <form class="space-y-4" @submit.prevent="signIn">
        <div>
          <label for="email" class="block text-sm font-medium mb-1">
            {{ t("email") }}
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            autocomplete="email"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium mb-1">
            {{ t("password") }}
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            autocomplete="current-password"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="••••••••"
          />
        </div>

        <p v-if="error" class="text-sm text-red-500">{{ error }}</p>

        <button
          type="submit"
          :disabled="isLoading || !email || !password"
          class="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          <span v-if="isLoading">{{ t("authSigningIn") }}</span>
          <span v-else>{{ t("authSignIn") }}</span>
        </button>
      </form>

      <div class="text-center space-y-2">
        <p class="text-sm text-muted-foreground">
          {{ t("authNoAccount") }}
          <NuxtLink to="/auth/register" class="text-primary hover:underline">
            {{ t("authSignUp") }}
          </NuxtLink>
        </p>
        <NuxtLink to="/" class="text-sm text-muted-foreground hover:underline">
          {{ t("back") }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "authSignIn": "Sign in",
    "authSignInPrompt": "Sign in to save your work and access it from anywhere",
    "authSigningIn": "Signing in...",
    "authSignUp": "Create one",
    "authNoAccount": "No account?",
    "password": "Password"
  },
  "fr": {
    "authSignIn": "Se connecter",
    "authSignInPrompt": "Connectez-vous pour sauvegarder votre travail et y accéder depuis n'importe où",
    "authSigningIn": "Connexion en cours...",
    "authSignUp": "Créez-en un",
    "authNoAccount": "Pas de compte ?",
    "password": "Mot de passe"
  }
}
</i18n>
