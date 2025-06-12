import { useUser, fetchCurrentUser } from '@/composables/useAuth';

export default defineNuxtPlugin(async (nuxtApp) => {
  // const user = useUser();

  // // Skip if already initialized on server
  // if (user.value !== undefined) return;
  // const userData = await fetchCurrentUser();
  // console.log(userData, 'userData in auth.ts');
  // user.value = userData;
});
