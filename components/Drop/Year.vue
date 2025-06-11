<template>
    <div 
        ref="dropdownRef" 
        class="relative dropdown w-[90px]" 
        @click.outside="closeDropdown">
            <button
            @click="toggleDropdown"
            :class="[
                'dropdown-button',
                'bg-[#FEFEFE]',
                'border',
                'border-[#DBDEE3]',
                'text-[#727272]',
                props.paddingY, 
                'px-2',
                'pr-2',
                'rounded-md',
                'focus:outline-none',
                'focus:border-[#2B5BBB]',
                'w-full',
                'flex',
                'justify-between',
                'items-center',
                $attrs.class 
            ]"

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

        <div
        v-show="isOpen"
        class="dropdown-menu absolute left-0 w-full bg-[#FEFEFE] border border-[#DBDEE3] rounded-md shadow-lg max-h-[250px] overflow-y-auto z-50"
        >
        <div
            v-for="(option, index) in yearOptions"
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
    import { useAttrs } from 'vue' 

    const isOpen = ref(false)
    const dropdownRef = ref(null)

    const props = defineProps({
        modelValue: {
            type: String,
            default: ''
        },
        paddingY: { // 새로운 prop 추가
            type: String,
            default: 'py-3' // 기본값 설정
        }
    })

    const emit = defineEmits(['update:modelValue'])

    const $attrs = useAttrs();

    onClickOutside(dropdownRef, () => (isOpen.value = false))

    const toggleDropdown = () => {
        isOpen.value = !isOpen.value
    }

    const selectOption = (option) => {
        emit('update:modelValue', option === '선택' ? '' : option);
        isOpen.value = false;
    };

    const selectedLabel = computed(() => {
        return props.modelValue !== '' ? props.modelValue : '년도'
    })

    const currentYear = new Date().getFullYear();
    const startYear = 2021;
    const yearOptions = computed(() => {
        const years = ['선택'];
        for (let year = currentYear; year >= startYear; year--) {
            years.push(String(year));
        }
        return years;
    });


</script>

<style scoped>
/* Optional enhancements or overrides */
</style>