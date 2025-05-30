const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard Variable", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        'max-sm': { max: '639px' },  // sm 미만 (640px 이하 아님 주의)
        'max-md': { max: '767px' },  // md 미만
        'max-lg': { max: '1023px' }, // lg 미만
        'max-xl': { max: '1280px' }, // lg 미만
        'max-2xl': { max: '1535px' },
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      }, 
    },
  },
  plugins: [],
}