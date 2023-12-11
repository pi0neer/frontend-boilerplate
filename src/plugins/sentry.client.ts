// note: this hack is used because nuxt 3 have not got sentry module
import * as Sentry from '@sentry/vue';
import { BrowserTracing } from '@sentry/tracing';
import { defineNuxtPlugin, useRouter, useRuntimeConfig } from '#imports';

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  const { vueApp } = nuxtApp;

  Sentry.init({
    app: [vueApp],
    dsn: runtimeConfig.sentryDsn,
    environment: runtimeConfig.env,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(useRouter()),
      }),
    ],
    tracesSampleRate: 1.0,
    beforeSend(event, hint) {
      if (event.exception) {
        // eslint-disable-next-line no-console
        console.error(`[Exception handled by Sentry]: (${hint.originalException})`, {
          event,
          hint,
        });
      }
      return event;
    },
  });

  vueApp.mixin(
    Sentry.createTracingMixins({
      trackComponents: true,
      timeout: 2000,
      hooks: ['activate', 'mount', 'update'],
    }),
  );
  Sentry.attachErrorHandler(vueApp, {
    logErrors: false,
    attachProps: true,
    trackComponents: true,
    timeout: 2000,
    hooks: ['activate', 'mount', 'update'],
  });

  return {
    provide: {
      sentrySetContext: Sentry.setContext,
      sentrySetUser: Sentry.setUser,
      sentrySetTag: Sentry.setTag,
      sentryAddBreadcrumb: Sentry.addBreadcrumb,
      sentryCaptureException: Sentry.captureException,
    },
  };
});
