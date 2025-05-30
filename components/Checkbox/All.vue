<template>
    <label class="inline-flex items-center ml-6.5 gap-3.5 cursor-pointer select-none mr-2 max-md:ml-0 max-md:gap-2 max-md:mr-1">
        <input
        type="checkbox"
        class="peer hidden"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
        />
        <div
        class="w-5 h-5 flex items-center justify-center rounded-sm border border-[#2B5BBB] bg-white
                peer-checked:bg-[#2B5BBB] peer-checked:border-[#2B5BBB] relative"
        >
        <svg
            class="hidden peer-checked:block w-4 h-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
        </svg>
        </div>
        <span class="all-text font-bold text-[#2B5BBB] text-[18px]">전체선택</span>
    </label>
</template>

<script setup>
    defineProps(['modelValue'])
    defineEmits(['update:modelValue'])
</script>
    
<style scoped>
    .all-text{
        font-size: 16px;
        letter-spacing: -0.5px;
    }
</style>