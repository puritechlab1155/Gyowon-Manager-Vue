<template>
    <router-link
        :to="to"
        class="editModalBtn bg-[#FFF3E5] px-2.5 py-2 rounded-lg hover:bg-[#FFECBA] inline-flex items-center justify-center"
    >
        <img src="../../assets/img/pen.png" alt="수정 아이콘" class="w-[22px] h-[22px]" />
    </router-link>
</template>

<script setup>

// ✅ 부모로부터 'to' 값을 props로 받음
const props = defineProps({
    to: {
        type: String,
        required: true
    }
})

</script>

<style>
</style>