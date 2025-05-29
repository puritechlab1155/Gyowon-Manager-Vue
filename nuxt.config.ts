// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  modules: [
    ['@nuxtjs/tailwindcss', {
      configPath: 'tailwind.config.js'
    }]
  ],
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css', 
  ],
  vite: {
    server: {
      watch: {
        usePolling: true, // 변경 감지가 안될 때
      },
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 3000,
      },
    },
  },
})
