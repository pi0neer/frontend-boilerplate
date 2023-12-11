import { defineNuxtRouteMiddleware, useNuxtApp } from '#imports';

export default defineNuxtRouteMiddleware(async (to) => {
  const { $router } = useNuxtApp();
  // this hook catch if url not endsWith = '/', and if he see that he trigger push new route and that update current page
  if (!to.fullPath.endsWith('/')) {
    await $router.push(to.fullPath + '/');
    await $router.go();
  }
});
