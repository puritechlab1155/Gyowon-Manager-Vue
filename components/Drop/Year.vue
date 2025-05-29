<template>
    <div 
        ref="dropdownRef" 
        class="relative dropdown w-[90px]" @click.outside="closeDropdown">
        <button
        @click="toggleDropdown"
        class="dropdown-button bg-[#FEFEFE] border border-[#DBDEE3] text-[#727272] py-2 px-2 pr-2 rounded-md focus:outline-none focus:border-[#2B5BBB] h-[50px] w-full flex justify-between items-center"
        >
        <span class="selected-option">{{ selectedLabel }}</span>
        <svg class="w-5 h-5 text-[#292929]" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 9l-7 7-7-7" />
        </svg>
        </button>

        <div
        v-show="isOpen"
        class="dropdown-menu absolute left-0 w-full bg-[#FEFEFE] border border-[#DBDEE3] rounded-md shadow-lg max-h-[250px] overflow-y-auto z-50"
        >
        <div
            v-for="(year, index) in yearOptions"
            :key="index"
            @click="selectYear(year)"
            class="dropdown-item px-3 py-3 cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap"
        >
            {{ year }}
        </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue'
    import { onClickOutside } from '@vueuse/core' // 설치 필요: npm install @vueuse/core

    const props = defineProps({
        modelValue: {
            type: String,
            default: ''
        },
        options: {
            type: Array,
            default: () => ['선택','2025', '2024', '2023', '2022', '2021']
        }
    })

    const emit = defineEmits(['update:modelValue'])

    const isOpen = ref(false)
    const dropdownRef = ref(null)

    onClickOutside(dropdownRef, () => (isOpen.value = false))

    const yearOptions = props.options

    const toggleDropdown = () => {
    isOpen.value = !isOpen.value
    }

    const selectYear = (year) => {
    emit('update:modelValue', year)
    isOpen.value = false
    }

    const selectedLabel = computed(() => {
        return props.modelValue !== '' ? props.modelValue : '년도'
    })
</script>

<style scoped>
/* Optional enhancements or overrides */
</style>