// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  ssr: false,
  devtools: { enabled: true },
  css: ['~/assets/css/style.css'],
  modules: [
    ['@nuxtjs/google-fonts', {
        families: {
          'Akkurat Mono': true,
          'PP Neue Montreal': true,
          download: true,
          inject: false
        },
        display: 'swap'
    }],

  ]
})