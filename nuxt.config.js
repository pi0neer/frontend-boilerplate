export default {
  mode: 'universal',
  target: 'static',
  srcDir: 'src/',
  privateRuntimeConfig: {
    env: process.env.ENV_NAME,
    gtmId: process.env.GTM_ID,
    recaptchaKey: process.env.RECAPTCHA_SITE_KEY,
    sentryDsn: process.env.SENTRY_DSN,
  },
  head: {
    titleTemplate: '%s',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: '',
      },
      {
        name: 'format-detection',
        content: 'telephone=no',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
  },

  css: [],

  plugins: [],

  components: false,

  buildModules: ['@nuxtjs/eslint-module', '@nuxt/typescript-build', '@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],

  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '~/modules/pages'],

  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
  },

  build: {},

  imports: {
    autoImport: false,
  },
  router: {
    options: {
      strict: true,
    },
  },
  // note: this bullshit trigger error with trailing slashes in routes
  experimental: {
    payloadExtraction: false,
  },
};
