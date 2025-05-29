<template>
<button
        @click="goToSubjectApply"
        class="bg-[#E7F0FD] px-2 py-1.5 rounded-lg hover:bg-[#D3E1FB] flex items-center space-x-1"
    >
        <img src="@/assets/img/note.png" alt="노트 아이콘" class="w-5 h-5" />
        <span class="font-semibold text-[#2b5bbb]">과목신청</span>
    </button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
    userId: {
        type: String,
        required: true
    }
})

const router = useRouter()

const goToSubjectApply = () => {
    router.push({ path: '/User/Apply', query: { userId: props.userId } })
}
</script>