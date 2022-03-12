import i18n from './config/i18n'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'smart-meeting',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/app'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
      '~/plugins/vue-confirm-dialog.client.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
      '@nuxtjs/fontawesome',
  ],
  moment:{
    locales: ['nl']
  },
  fontawesome: {
      component:'fa',
      icons: {
        solid:true,
        regular:true,
      }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
        'nuxt-i18n',
        {
            vueI18nLoader:true,
            defaultLocale:'en',
            locales: [
                {code:'en',name:'English'},
                {code:'nl',name:'Nederlands'}
            ],
            vueI18n:i18n
        },
    ],
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
