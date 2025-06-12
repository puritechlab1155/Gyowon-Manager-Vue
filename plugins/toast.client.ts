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


// // plugins/toast.client.ts
// import Toast from 'vue-toastification'
// import type { PluginOptions } from 'vue-toastification/dist/types'
// import { POSITION } from 'vue-toastification'
// import 'vue-toastification/dist/index.css'

// export default defineNuxtPlugin((nuxtApp) => {
//   console.log('toast plugin loaded')

//   const options: PluginOptions = {
//     position: POSITION.TOP_RIGHT,
//     timeout: 3000,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//   }

//   nuxtApp.vueApp.use(Toast, options)

//   // nuxtApp.provide('toast', ...)로 inject 하려면
//   nuxtApp.provide('toast', nuxtApp.vueApp.config.globalProperties.$toast)
// })


// import { defineNuxtPlugin } from '#app'
// import Toast, { useToast } from 'vue-toastification'
// import 'vue-toastification/dist/index.css'

// export default defineNuxtPlugin((nuxtApp) => {
//   // 플러그인으로 toast 기능 등록
//   nuxtApp.vueApp.use(Toast, {
//     // 옵션 넣기 가능 (예: position, timeout 등)
//     position: 'top-center',
//     timeout: 3000,
//   })

//   // nuxtApp 전역에 toast() 메서드 연결 (vue-toastification의 useToast 함수)
//   nuxtApp.provide('toast', useToast())
// })