module.exports = {
  cache: true,
  /*
  ** Headers
  ** Common headers are already provided by @nuxtjs/pwa preset
  */
  head: {
    title: 'RMS 1.0',
    htmlAttrs: {
      lang: 'ko'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js + Vuetify.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070', height: '5px' },
  /*
  ** Customize app manifest
  */
  manifest: {
    theme_color: '#3B8070'
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      '@/plugins/vuetify.js'
    ]
  },
  /*
  ** Modules
  */
  modules: [
    '@nuxtjs/pwa',
    ['@nuxtjs/moment', ['ko']],
    ['@nuxtjs/axios', {
      baseURL: 'http://localhost:8001'
    }],
    '@nuxtjs/auth'
  ],
  plugins: ['@/plugins/vuetify.js']
}
