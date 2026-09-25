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

const name = ref("");
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const error = ref("");

async function signUp() {
  if (!email.value || !password.value) return;
  isLoading.value = true;
  error.value = "";
  try {
    await appwrite.createAccount(
      email.value,
      password.value,
      name.value || undefined,
    );
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
          {{ t("authSignUpPrompt") }}
        </p>
      </div>

      <form class="space-y-4" @submit.prevent="signUp">
        <div>
          <label for="name" class="block text-sm font-medium mb-1">
            {{ t("name") }}
          </label>
          <input
            id="name"
            v-model="name"
            type="text"
            autocomplete="name"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="John Doe"
          />
        </div>

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
            autocomplete="new-password"
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
          <span v-if="isLoading">{{ t("authSigningUp") }}</span>
          <span v-else>{{ t("authSignUp") }}</span>
        </button>
      </form>

      <div class="text-center space-y-2">
        <p class="text-sm text-muted-foreground">
          {{ t("authHasAccount") }}
          <NuxtLink to="/auth/login" class="text-primary hover:underline">
            {{ t("authSignIn") }}
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
    "authSignUp": "Create account",
    "authSignUpPrompt": "Create an account to save your work and access it from anywhere",
    "authSigningUp": "Creating account...",
    "authHasAccount": "Already have an account?",
    "name": "Name",
    "password": "Password"
  },
  "fr": {
    "authSignUp": "Créer un compte",
    "authSignUpPrompt": "Créez un compte pour sauvegarder votre travail et y accéder depuis n'importe où",
    "authSigningUp": "Création du compte...",
    "authHasAccount": "Vous avez déjà un compte ?",
    "name": "Nom",
    "password": "Mot de passe"
  }
}
</i18n>
