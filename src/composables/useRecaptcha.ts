import { VueReCaptcha, useReCaptcha, IReCaptchaComposition } from 'vue-recaptcha-v3';
import { useNuxtApp } from '#app';

export function useRecaptcha(): (action: string) => Promise<string> {
  const { vueApp } = useNuxtApp();
  vueApp.use(VueReCaptcha, {
    siteKey: process.env.RECAPTCHA_SITE_KEY,
    loaderOptions: { autoHideBadge: true },
  });
  const { executeRecaptcha, recaptchaLoaded } = useReCaptcha() as IReCaptchaComposition;
  return async (action: string) => {
    await recaptchaLoaded();
    return await executeRecaptcha(action);
  };
}
