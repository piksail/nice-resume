import { useAppwriteStore } from "@/stores/appwrite";

export default defineNuxtRouteMiddleware(async (to) => {
  const store = useAppwriteStore();

  if (!store.user && !store.isAuthLoading) {
    await store.initAuth();
  }

  const publicAuthRoutes = ["/auth/login", "/auth/register", "/auth/verify"];

  if (!store.user && !publicAuthRoutes.includes(to.path)) {
    return navigateTo("/auth/login");
  }

  if (store.user && publicAuthRoutes.includes(to.path)) {
    return navigateTo("/documents");
  }
});
