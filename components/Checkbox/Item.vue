<template>
    <label class="inline-flex items-center space-x-1 cursor-pointer select-none pt-1">
    <input
        type="checkbox"
        class="sr-only peer"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
    />
    
    <div
        class="w-5 h-5 flex items-center justify-center rounded-sm border border-[#2B5BBB] bg-white
            peer-checked:bg-[#2B5BBB] peer-checked:border-[#2B5BBB] transition-all duration-200
            hover:border-[#1a4a99] peer-focus:ring-2 peer-focus:ring-[#2B5BBB] peer-focus:ring-opacity-20"
    >
        <svg
        class="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="3"
        >
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    </div>
    
    <span class="ml-2 text-gray-700">{{ label }}</span>
    </label>
</template>

<script setup>
    defineProps(['modelValue', 'label'])
    defineEmits(['update:modelValue'])
</script>
