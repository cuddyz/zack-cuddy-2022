export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Zack Cuddy',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Zack Cuddy - Web Developer.  Bringing web apps to a site near you!' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'og:image', name: 'og:image', content: 'https://zack-cuddy.com/images/space.jpg' },
      { hid: 'og:title', name: 'og:title', content: 'Zack Cuddy' },
      { hid: 'og:url', name: 'og:url', content: 'https://zack-cuddy.com' },
      { hid: 'og:site_name', name: 'og:site_name', content: 'Zack Cuddy' },
      { hid: 'og:description', name: 'og:description', content: 'Zack Cuddy - Web Developer.  Bringing web apps to a site near you!' },
      { hid: 'twitter:image', name: 'twitter:image', content: 'https://zack-cuddy.com/images/space.jpg' },
      { hid: 'twitter:title', name: 'twitter:title', content: 'Zack Cuddy' },
      { hid: 'twitter:site', name: 'twitter:site', content: 'https://zack-cuddy.com' },
      { hid: 'twitter:description', name: 'twitter:description', content: 'Zack Cuddy - Web Developer.  Bringing web apps to a site near you!' }
    ],
    script: [
      { src: 'https://kit.fontawesome.com/1107c06a2b.js' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    { src: '@/assets/styles/app.scss', lang: 'scss' }
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~plugins/vue-scrollactive.js' },
    { src: '~plugins/vue-carousel.js', ssr: false },
    { src: '~plugins/vue-clickoutside.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
