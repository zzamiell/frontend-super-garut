// https://nuxt.com/docs/api/configuration/nuxt-config

import Aura from '@primeuix/themes/aura'

export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'https://api.example.com'
    }
  },
  plugins: [
    '~/plugins/api.ts'
  ],
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@primevue/nuxt-module',
  ],

  primevue: {
    autoImport: true,
    components: {
      include: [
        'Form',
        'FormField',
        'Breadcrumb',
        'Button',
        'Calendar',
        'Card',
        'Checkbox',
        'Column',
        'Datatable',
        'Dialog',
        'Dropdown',
        'Inputtext',
        'Menu',
        'Paginator',
        'Toast',
        'primevue/toastservice',
        'Config',
        'Animateonscroll',
        '@primevue/themes/aura',
        '@primevue/themes',
        'primevue/confirmationservice',
        'Tooltip',
        'Ripple',
        'styleclass',
        'Divider',
        'Avatar',
        'Tag',
        'Image',
        'Iconfield',
        'Inputicon',
        'Inputnumber',
        'Textarea',
        'Fileupload',
        'Password',
        'Inputgroup',
        'Inputgroupaddon',
        'Radiobutton',
        'Datepicker',
        'Dataview',
        'Selectbutton',
        'Confirmpopup',
      ], // Add these components
    },
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark',
          cssLayer: false,
        },
      },
    },
  },
})
