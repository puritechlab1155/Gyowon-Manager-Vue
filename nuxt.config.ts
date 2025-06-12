// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  modules: [
    [
      '@nuxtjs/tailwindcss',
      {
        configPath: 'tailwind.config.js',
      },
    ],
  ],
  devtools: { enabled: true },
  build: {
    transpile: ['vue-toastification'],
  },
  css: ['~/assets/css/main.css', 'vue-toastification/dist/index.css'],
  runtimeConfig: {
    public: {
      backendUrl: 'http://localhost:8000', //TODO for local development,
      frontendUrl: 'http://localhost:3000', //TODO for local development
    },
  },
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
});
