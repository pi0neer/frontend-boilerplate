import VueGtag from 'vue-gtag';
import { defineNuxtPlugin, useRouter, useRuntimeConfig } from '#imports';

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  const { vueApp } = nuxtApp;
  vueApp.use(
    VueGtag,
    {
      config: {
        id: runtimeConfig.gtmId,
      },
    },
    useRouter(),
  );
});
