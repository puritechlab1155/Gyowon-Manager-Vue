// plugins/toast.client.ts
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Toast, {
        // 선택 옵션: https://vue-toastification.maronato.dev/options/
        position: 'top-center',
        timeout: 3000,
        // maxToasts: 1,  
    })
})