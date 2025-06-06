<template>
    <div
        v-if="visible"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-[800] px-5"
    >
        <div class="bg-white rounded-2xl px-6 py-8 w-[360px] max-sm:w-[90%] text-center shadow-lg">
            <h1 class="paperlogy text-[25px] font-medium mb-3">{{ title }} 삭제하기</h1>
            <img src="../../assets/img/delete-confirm.png" alt="삭제확인 아이콘" class="w-[70px] h-[70px] mx-auto mb-4" />
            <p class="text-[18px] text-[#727272] mb-6 font-medium leading-relaxed">
                <span class="font-semibold">'{{ data?.title || title }}'</span> 의 <br/> <span class="text-red-500 text-[18px] font-semibold">모든 정보가 삭제</span>됩니다.
                <br /> 계속하시겠습니까?
            </p>

            <div class="flex justify-between gap-3">
                <button
                class="bg-[#2B5BBB] text-white flex-1 py-2.5 rounded-md hover:bg-[#1e4bb6] transition"
                @click="$emit('confirm')"
                >
                예
                </button>
                <button
                class="bg-[#ADADAD] text-white flex-1 py-2.5 rounded-md hover:bg-[#8e8e8e] transition"
                @click="$emit('cancel')"
                >
                취소
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
    defineProps({
        visible: Boolean,
        data: Object,
        title: { type: String, default: '' } 
    })

    defineEmits(['confirm', 'cancel'])
</script>