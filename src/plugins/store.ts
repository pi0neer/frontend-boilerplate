// note: this hack is used because nuxt 3 have not got vuex module
import { defineNuxtPlugin } from '#imports';
import store from '~/store';

export default defineNuxtPlugin((nuxtApp) => {
  const { vueApp } = nuxtApp;

  vueApp.use(store);
});
