<template>
    <div ref="dropdownRef"
        class="relative dropdown"
        :class="{ 'z-[100]': isOpen, 'z-[50]': !isOpen }" :style="{ width: props.width }"
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
        <Teleport to="body">
            <div
                v-show="isOpen"
                class="dropdown-menu absolute py-1 left-0 w-full bg-[#FEFEFE] border border-[#DBDEE3] rounded-md shadow-lg max-h-[180px] overflow-y-auto z-[101]"
                :style="dropdownMenuStyle" >
                <div
                    v-for="(option, index) in options"
                    :key="index"
                    @click="selectOption(option)"
                    class="dropdown-item px-3 py-2.5 cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap"
                >
                    {{ option }}
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup>
    import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue' // ✅ onMounted, onUnmounted, nextTick 임포트 추가
    import { onClickOutside } from '@vueuse/core'

    const isOpen = ref(false)
    const dropdownRef = ref(null)

    // ✅ dropdownMenuStyle ref 선언 추가
    const dropdownMenuStyle = ref({});

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

    // 드롭다운 메뉴의 위치와 너비를 계산하는 함수
    const calculateDropdownPosition = () => {
        if (!dropdownRef.value) return; // 드롭다운 버튼 요소가 없으면 리턴

        const rect = dropdownRef.value.getBoundingClientRect(); // 버튼의 화면상 위치와 크기 얻기
        dropdownMenuStyle.value = {
            top: `${rect.bottom + window.scrollY}px`, // 버튼 바로 아래에 메뉴 상단 배치
            left: `${rect.left + window.scrollX}px`, // 버튼과 같은 X 위치에 메뉴 왼쪽 가장자리 배치
            width: `${rect.width}px`, // 버튼과 동일한 너비로 메뉴 설정
        };
        console.log('Dropdown Menu Style:', dropdownMenuStyle.value); // ✅ 디버깅을 위한 콘솔 로그 추가
    };

    const toggleDropdown = async () => {
        isOpen.value = !isOpen.value;
        if (isOpen.value) {
            // 드롭다운이 열릴 때만 위치 계산
            await nextTick(); // DOM이 업데이트된 후에 위치를 정확히 계산하기 위해 필요
            calculateDropdownPosition();
            // 스크롤 및 창 크기 변경 시 위치를 다시 계산하도록 이벤트 리스너 추가
            window.addEventListener('scroll', calculateDropdownPosition);
            window.addEventListener('resize', calculateDropdownPosition);
        } else {
            // 드롭다운이 닫힐 때 이벤트 리스너 제거하여 메모리 누수 방지
            window.removeEventListener('scroll', calculateDropdownPosition);
            window.removeEventListener('resize', calculateDropdownPosition);
        }
    }

    const selectOption = (option) => {
        emit('update:modelValue', option)
        isOpen.value = false
    }

    const selectedLabel = computed(() => {
        return props.options.includes(props.modelValue) && props.modelValue !== ''
            ? props.modelValue
            : '수강상태'
    })


    const emit = defineEmits(['update:modelValue'])

    // ✅ onMounted, onUnmounted 훅 추가 (이벤트 리스너 관리를 위해 필수)
    onMounted(() => {
        // 컴포넌트 마운트 시 초기 위치 계산은 필요 없을 수 있음 (toggleDropdown에서 처리)
        // 하지만 혹시 초기 렌더링 시에도 메뉴가 열려있어야 하는 경우 여기에 calculateDropdownPosition() 호출
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', calculateDropdownPosition);
        window.removeEventListener('resize', calculateDropdownPosition);
    });
</script>

<style>
    /* ✅ scoped 제거 (Teleport로 body로 옮기면 scoped 스타일이 적용되지 않을 수 있음) */
    .dropdown {
        text-align: left !important;
    }

    .dropdown-menu {
        text-align: left !important;
    }

    .dropdown-item {
        text-align: left !important;
        display: block;
    }

</style>