<template>
    <div 
        ref="dropdownRef" 
        class="relative dropdown w-[120px]"
        @click.outside="closeDropdown">
            <button
            @click="toggleDropdown"
            class="dropdown-button bg-[#FFFFFE] border border-[#DBDEE3] text-[#727272] py-3 px-2 pr-2 rounded-md focus:outline-none focus:border-[#2B5BBB] w-full flex justify-between items-center"
            type="button"
            >
            <span class="selected-option">{{ selectedLabel }}</span>
            <svg class="w-5 h-5 text-[#292929]" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none"
                viewBox="0 0 24 24" 
                stroke="currentColor"
            >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
        </button>
        <!-- 드롭다운 옵션 -->
        <div
            v-show="isOpen"
            class="dropdown-menu absolute left-0 w-full bg-[#FEFEFE] border border-[#DBDEE3] rounded-md shadow-lg max-h-[250px] overflow-y-auto z-50"
            >
            <div
                v-for="(option, index) in options"
                :key="index"
                @click="selectOption(option)"
                class="dropdown-item px-3 py-3 cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap"
            >
                {{ option }}
            </div>
        </div>
    </div>
</template>


<script setup>
    import { ref, computed } from 'vue'
    import { onClickOutside } from '@vueuse/core'

    const isOpen = ref(false)
    const dropdownRef = ref(null)

    const props = defineProps({
        modelValue: {
            type: String,
            default: '',
        },
        options: {
            type: Array,
            default: () => [
                '선택',
                '월요일', 
                '화요일', 
                '수요일',
                '목요일',
                '금요일', 
                '토요일', 
                '일요일', 
            ],
        },
    })

    onClickOutside(dropdownRef, () => {
        isOpen.value = false
    })

    const toggleDropdown = () => {
        isOpen.value = !isOpen.value
    }

    const selectOption = (option) => {
        // '선택'을 누르면 빈 문자열로 처리하여 emit
        if (option === '선택') {
            emit('update:modelValue', '');
        } else {
            emit('update:modelValue', option);
        }
        isOpen.value = false;
    };

    const selectedLabel = computed(() => {
        return props.modelValue !== '' ? props.modelValue : '요일'
    })

    const emit = defineEmits(['update:modelValue'])
</script>


<style>


</style>