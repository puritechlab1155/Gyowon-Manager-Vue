<template>
    <div 
        ref="dropdownRef" 
        class="relative dropdown w-full"
        @click.outside="closeDropdown">
            <button
            @click="toggleDropdown"
            :class="[
                    'dropdown-button border border-[#DBDEE3] text-[#727272] text-[18px] py-2.5 px-2 pr-2 rounded-md focus:outline-none focus:border-[#2B5BBB] w-full flex justify-between items-center',
                    modelValue.length ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                ]"
            type="button"
            >
            <span class="selected-option text-[18px]"
            :class="{ 'text-[#AFAFAF]': !modelValue.length }">{{ selectedLabels }}</span>
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
                v-for="(option, index) in availableOptions"
                :key="index"
                @click.stop="toggleOption(option)"
                class="dropdown-item text-[18px] px-3 py-3 cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap"
            >
                <input 
                type="checkbox" 
                :checked="isSelected(option)" 
                readonly 
                class="pointer-events-none"/>
                <span>{{ option }}</span>
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
            type: Array,
            default: () => [],
        }
    })

    const emit = defineEmits(['update:modelValue'])

    onClickOutside(dropdownRef, () => {
        isOpen.value = false
    })

    const toggleDropdown = () => {
        isOpen.value = !isOpen.value
    }

    const toggleOption = (option) => {
        if (option === '선택하세요') {
            emit('update:modelValue', []) // 선택 초기화
            return
        }

        const selected = [...props.modelValue]
        const index = selected.indexOf(option)
        if (index > -1) {
            selected.splice(index, 1) // 이미 있으면 제거
        } else {
            selected.push(option) // 없으면 추가
        }
        emit('update:modelValue', selected)
    }

    const isSelected = (option) => props.modelValue.includes(option)

   // ✅ API로 받아온 옵션을 담을 변수
    const fetchedOptions = ref([])

    const availableOptions = computed(() => {
        return ['선택하세요', ...fetchedOptions.value]
    })

    const selectedLabels = computed(() => {
        return props.modelValue.length ? props.modelValue.join(', ') : '선택하세요 (중복선택 가능)'
    })

    // ✅ API 호출: 학교 리스트 받아오기
    onMounted(async () => {
    try {
        const token = useCookie('auth_token').value
        const res = await fetch('http://localhost:8000/api/admin/school-public', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        })
        const data = await res.json()
        if (data.result && Array.isArray(data.data)) {
        fetchedOptions.value = data.data.map(item => item.course_place)
        }
    } catch (error) {
        console.error('학교 목록을 불러오는 중 오류 발생:', error)
    }
    })
</script>


<style>
    @media (max-width: 767px) {
        .selected-option {
            font-size: 16px;
        }
    }
</style>