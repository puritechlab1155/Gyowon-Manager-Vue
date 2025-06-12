<template>
    <button id="topButton"
        class="font-bold fixed bottom-5 right-5 bg-[#FEFEFE] border border-[#EFEFEF] text-[#2B5BBB] p-4 rounded-lg shadow-lg hover:bg-[#EDF3FF] transition-all z-[9999]"
        @click="scrollToTop" v-show="isVisible">
        TOP
    </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)
let scrollContainer = null

const scrollToTop = () => {
    if (scrollContainer) {
        scrollContainer.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

const checkScroll = () => {
    if (scrollContainer) {
        isVisible.value = scrollContainer.scrollTop > 300
    } else {
        isVisible.value = window.scrollY > 300
    }
}

onMounted(() => {
    scrollContainer = document.getElementById('scroll-container')
    if (scrollContainer) {
        scrollContainer.addEventListener('scroll', checkScroll)
    } else {
        window.addEventListener('scroll', checkScroll)
    }
})

</script>