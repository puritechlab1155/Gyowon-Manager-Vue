<template>
    <button
    class="editModalBtn bg-[#FFF3E5] p-2 rounded-lg hover:bg-[#FFECBA]"
    @click="goToRoute"
    >
        <img src="@/assets/img/pen.png" alt="수정 아이콘" class="w-[22px] h-[22px]" />
    </button>
</template>

<script setup>
import { useRouter } from 'vue-router'

// ✅ 부모로부터 'to' 값을 props로 받음
const props = defineProps({
    to: {
        type: String,
        required: true
    }
})
const router = useRouter()

const goToRoute = () => {
    router.push(props.to)
}
</script>

<style>
</style>