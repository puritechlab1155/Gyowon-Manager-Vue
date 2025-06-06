<template>
    <div ref="dropdownRef" 
        class="relative dropdown"
        :style="{ width: props.width }" 
        @click.outside="closeDropdown">
        <button
            @click="toggleDropdown"
            class="dropdown-button bg-[#FFFFFE] border border-[#DBDEE3] text-[#727272] py-3 px-2 rounded-md focus:outline-none focus:border-[#2B5BBB] w-full flex justify-between items-center"
            type="button"
            :style="{ height: props.height }"
            >
            <span class="selected-option">{{ selectedLabel }}</span>
            <svg 
                class="w-5 h-5 text-[#292929]" 
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
            class="dropdown-menu absolute py-3 left-0 w-full bg-[#FEFEFE] border border-[#DBDEE3] rounded-md shadow-lg max-h-[250px] overflow-y-auto z-50"
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
            default: () => ['선택', '대기', '확정', '취소', '연기', '연기금'],
        },
        height: {
            type: String,
            default: '60px'
        },
        width: {
            type: String,
            default: '120px'
        }
    })

    onClickOutside(dropdownRef, () => {
        isOpen.value = false
    })

    const toggleDropdown = () => {
        isOpen.value = !isOpen.value
    }

    const selectOption = (option) => {
        emit('update:modelValue', option)
        isOpen.value = false
    }

    const selectedLabel = computed(() => {
        return props.modelValue !== '' ? props.modelValue : '입금상태'
    })


    const emit = defineEmits(['update:modelValue'])

</script>

<style>

</style>