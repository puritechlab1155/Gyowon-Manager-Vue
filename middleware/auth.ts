export default defineNuxtRouteMiddleware(async () => {
  const user = useUser();
  const token = useCookie('auth_token');
  if (!user.value || !token.value) {
    return navigateTo('/login', { replace: true });
  }
});
