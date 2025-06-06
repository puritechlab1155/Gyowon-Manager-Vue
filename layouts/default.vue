<template>
    <div id="scroll-container" class="bg-[#F7F7F7] overflow-auto">
        <MainHeader 
            :pageTitle="pageTitle" 
            :isSidemenuOpen="isSidemenuOpen"
            @toggle-sidemenu="toggleSidemenu"/>
        <MainSidemenu   :isSidemenuOpen="isSidemenuOpen" 
                        :ref="el => sideMenuRef = el?.sideMenuEl"
                        @close="isSidemenuOpen = false"/>
        <div id="main-content" class="ml-64 z-[500] max-xl:ml-0 transition-all duration-300 max-w-[1520px]"
            :class="isSidemenuOpen ? 'ml-64' : 'mx-auto'">
            <div class="w-full min-h-screen px-6 pt-[70px] pb-[100px]">
                <NuxtPage />
            </div>
        </div>
        <MainTopBtn/>
    </div>
</template> 

<script setup>
        import { useState } from '#app'
        import { ref, onMounted, onBeforeUnmount } from 'vue'
        import MainHeader from '../components/Main/Header.vue'
        import MainSidemenu from '../components/Main/Sidemenu.vue'
        import MainTopBtn from '../components/Main/TopBtn.vue'

        const isSidemenuOpen = ref(false)
        const pageTitleState = useState('pageTitle', () => '관리자') 
        const pageTitle = computed(() => pageTitleState.value || '관리자') 

        function updateMenuState() {
            if (window.innerWidth <= 1280) {
                isSidemenuOpen.value = false
            } else {
                isSidemenuOpen.value = true
            }
        }
        const sideMenuRef = ref(null)

        function toggleSidemenu() {
            isSidemenuOpen.value = !isSidemenuOpen.value
        }

        onMounted(() => {
            updateMenuState()
            window.addEventListener('resize', updateMenuState)
        })

            onBeforeUnmount(() => {
            window.removeEventListener('resize', updateMenuState)
        })

</script>

<style scoped>

    /* max-md: 화면 너비가 767.98px 이하일 때 */
    @media (max-width: 767.98px) {
        #main-content {
            padding-top: 30px;
        }
    }
</style>