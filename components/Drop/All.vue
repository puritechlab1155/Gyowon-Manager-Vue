<template>
  <div ref="dropdownRef" class="relative dropdown w-full"
  :class="{ 'z-[100]': isOpen, 'z-[50]': !isOpen }">
    <button
      type="button"
      class="dropdown-button bg-[#F3F3F3] border border-[#DBDEE3] text-[#727272] text-[18px] after-small px-3 py-1.5 pr-2 rounded-md h-[45px] w-full flex justify-between items-center 0 focus:outline-none focus:border-[#2B5BBB]"
      @click="toggleDropdown"
      :class="[!displayValue || displayValue === '선택하세요' ? 'bg-[#F3F3E5] text-[#AFAFAF]' : 'bg-[#FFFFFF] text-[#292929]']"
      >
      {{ displayValue === '기타' ? '직접 입력' : (displayValue || '선택하세요') }}
      <svg class="w-5 h-5 text-[#292929]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <div v-show="isOpen" class="dropdown-menu absolute left-0 w-full bg-[#FEFEFE] border border-[#DBDEE3] rounded-md shadow-lg max-h-[200px] overflow-y-auto">
      <div
        v-for="(option, idx) in options"
        :key="idx"
        class="dropdown-item px-3 py-2 cursor-pointer text-[#727272] text-[18px] after-small hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap"
        @click="selectOption(option)"
        >
        {{ option }}
      </div>
    </div>
    <input
      v-if="displayValue === '기타'" v-model="customInput"
      @input="emitCustomInput"
      type="text"
      placeholder="직접 입력"
      class="w-full mt-2 h-[45px] text-[18px] after-small text-[#292929] placeholder-[#AFAFAF] bg-[#F3F3E5] px-3 py-1.5 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]"
      :class="customInput ? 'bg-[#FFFFFF] text-[#292929]' : 'bg-[#F3F3E5] text-[#292929]'"
      />
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue' // computed 임포트 추가
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  options: {
    type: Array,
    required: true,
    // options 배열에 '기타' 옵션이 항상 포함되도록 기본값 설정 또는 확인
    default: () => ['선택하세요'] // 최소한의 기본 옵션
  },
  modelValue: String, // v-model을 위한 prop
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const selectedInternal = ref('') // 실제 선택된 드롭다운 옵션 (internal state)
const customInput = ref('') // '기타' 옵션 선택 시 사용자 입력 값

const dropdownRef = ref(null)

if (process.client) {
  onClickOutside(dropdownRef, () => {
    isOpen.value = false
  })
}

// -------------------------------------------------------------
// ✅ 핵심 로직: modelValue에 따라 내부 상태 (selectedInternal, customInput) 초기화
// -------------------------------------------------------------
const initializeState = (value) => {
  if (props.options.includes(value)) {
    // modelValue가 옵션 목록에 있으면 해당 옵션 선택
    selectedInternal.value = value;
    customInput.value = ''; // 기타 입력 초기화
  } else if (value && value !== '선택하세요') { // modelValue가 있으나 옵션 목록에 없음 (즉, '기타' 입력값일 가능성)
    // modelValue가 '기타' 입력값인 경우
    selectedInternal.value = '기타'; // 드롭다운은 '기타'로 표시
    customInput.value = value;      // 실제 값은 customInput에 저장
  } else {
    // modelValue가 없거나 '선택하세요'인 경우 (초기 상태)
    selectedInternal.value = '선택하세요'; // 기본값 설정
    customInput.value = '';
  }
};

// 컴포넌트 초기 마운트 시 modelValue 반영
initializeState(props.modelValue);

// modelValue 변경 감지 및 내부 상태 업데이트
watch(() => props.modelValue, (newVal) => {
  initializeState(newVal);
});

// -------------------------------------------------------------
// ✅ 드롭다운 버튼에 표시될 값 ( computed 속성 사용 )
// -------------------------------------------------------------
const displayValue = computed(() => {
  if (selectedInternal.value === '기타') {
    // '기타' 옵션이 선택되었고 customInput 값이 있으면 customInput을, 없으면 '기타'를 표시
    return customInput.value || '기타';
  }
  // 그 외의 경우 selectedInternal 값을 표시
  return selectedInternal.value;
});

// -------------------------------------------------------------
// ✅ 드롭다운 열기/닫기
// -------------------------------------------------------------
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

// -------------------------------------------------------------
// ✅ 옵션 선택 시
// -------------------------------------------------------------
const selectOption = (option) => {
  isOpen.value = false; // 드롭다운 닫기
  selectedInternal.value = option; // 내부 선택 값 업데이트

  if (option === '기타') {
    // '기타' 선택 시 customInput은 현재 값을 유지하거나, 없으면 빈 문자열로 시작
    // 그리고 즉시 부모로 현재 customInput 값을 보냅니다.
    emit('update:modelValue', customInput.value);
  } else if (option === '선택하세요') {
    // '선택하세요' 선택 시 모든 것을 초기화하고 빈 문자열을 부모로 보냅니다.
    customInput.value = '';
    emit('update:modelValue', '');
  }
  else {
    // 그 외의 일반 옵션 선택 시
    customInput.value = ''; // 기타 입력 초기화
    emit('update:modelValue', option); // 선택된 옵션 값을 부모로 보냅니다.
  }
}

// -------------------------------------------------------------
// ✅ 기타 입력값 반영
// -------------------------------------------------------------
const emitCustomInput = () => {
  // customInput 값이 변경될 때마다 부모로 전달
  emit('update:modelValue', customInput.value);
}

</script>
