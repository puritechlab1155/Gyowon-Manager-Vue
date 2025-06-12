<template>
    <div class="pagenation flex justify-center items-center mt-4">
        <div class="flex items-center space-x-3 max-lg:space-x-1">
            <!-- 이전 버튼 -->
            <button @click="goToPrev" :disabled="currentPage === 1"
                class="px-2 py-4 max-sm:py-2 max-sm:px-2 text-[#727272] rounded-md flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed">
                <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 fill-[#727272] group-hover:fill-[#2B5BBB]">
                    <path
                        d="M0.68629 9.89949L10.5858 19.799L12 18.3848L3.51471 9.8995L12 1.41421L10.5858 -6.18172e-08L0.68629 9.89949Z" />
                </svg>
                <span class=" group-hover:text-[#2B5BBB] group-hover:font-semibold ml-2">이전</span>
            </button>

            <!-- 페이지 번호들 -->
            <div class="flex space-x-2 max-lg:space-x-2">
                <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" :class="[
                    'w-12 h-12 max-sm:w-8 max-sm:h-8 flex items-center justify-center font-medium rounded-md',
                    currentPage === page
                        ? 'bg-[#2B5BBB] text-[#EDF3FF]'
                        : 'text-[#727272] hover:bg-[#2B5BBB] hover:text-[#EDF3FF] focus:bg-[#2B5BBB] focus:text-[#EDF3FF]'
                ]">
                    {{ page }}
                </button>
            </div>

            <!-- 다음 버튼 -->
            <button @click="goToNext" :disabled="currentPage === totalPages"
                class="px-2 py-4 max-sm:py-2 max-sm:px-2 text-[#727272] rounded-md flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed">
                <span class=" group-hover:text-[#2B5BBB] group-hover:font-semibold mr-2">다음</span>
                <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 fill-[#727272] group-hover:fill-[#2B5BBB]">
                    <path
                        d="M11.3137 10.1005L1.41423 0.201019L2.07232e-05 1.61523L8.48529 10.1005L1.68643e-08 18.5858L1.41421 20L11.3137 10.1005Z" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue'

    const props = defineProps({
        currentPage: { type: Number, required: true },
        totalPages: { type: Number, required: true }
    })
    const emit = defineEmits(['update:currentPage'])

    const goToPage = (page) => {
        if (page !== props.currentPage) {
            emit('update:currentPage', page)
        }
    }

    const goToPrev = () => {
        if (props.currentPage > 1) {
            emit('update:currentPage', props.currentPage - 1)
        }
    }

    const goToNext = () => {
        if (props.currentPage < props.totalPages) {
            emit('update:currentPage', props.currentPage + 1)
        }
    }

    // 최대 10개까지만 표시
    const visiblePages = computed(() => {
        const pages = []
        const maxVisible = 10
        const start = Math.floor((props.currentPage - 1) / maxVisible) * maxVisible + 1
        const end = Math.min(start + maxVisible - 1, props.totalPages)
        for (let i = start; i <= end; i++) {
            pages.push(i)
        }
        return pages
    })
</script>

<style scoped>
    .pagenation{
        margin-top: 100px;
    }
</style>