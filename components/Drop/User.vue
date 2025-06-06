<template>
  <div ref="dropdownRef" class="relative dropdown w-2/3"
  :class="{ 'z-[100]': isOpen, 'z-[50]': !isOpen }">
    <button
      type="button"
      class="dropdown-button bg-[#F3F3F3] border border-[#DBDEE3] text-[#727272] px-3 py-1.5 pr-2 rounded-lg h-[45px] w-full flex justify-between items-center 0 focus:outline-none focus:border-[#2B5BBB]"
      @click="toggleDropdown"
      :class="selected ? 'bg-[#FFFFFF] text-[#292929]' : 'bg-[#F3F3F3] text-[#AFAFAF]'"
    >
    {{ selected === '기타' ? '직접 입력' : (selected || '선택하세요') }}
      <svg class="w-5 h-5 text-[#292929]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- 드롭다운 메뉴 -->
    <div v-show="isOpen" class="dropdown-menu absolute left-0 w-full bg-[#FEFEFE] border border-[#DBDEE3] rounded-md shadow-lg max-h-[250px] overflow-y-auto">
      <div
        v-for="(option, idx) in options"
        :key="idx"
        class="dropdown-item px-3 py-2 cursor-pointer text-[#727272] text-[18px] after-small hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap"
        @click="selectOption(option)"
        >
        {{ option }}
      </div>
    </div>
    <!-- 기타 입력창 -->
    <input
      v-if="selected === '기타'"
      v-model="customInput"
      @input="emitCustomInput"
      type="text"
      placeholder="직접 입력"
      class="w-full mt-2 h-[45px] text-[18px] after-small text-[#292929] placeholder-[#AFAFAF] bg-[#F3F3F3] px-3 py-1.5 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]"
      :class="customInput ? 'bg-[#FFFFFF] text-[#292929]' : 'bg-[#F3F3F3] text-[#292929]'"
      />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'  // 여기서 onClickOutside 사용

const props = defineProps({
  options: { type: Array, required: true },
  modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const selected = ref(props.modelValue || '')
const customInput = ref('')
const dropdownRef = ref(null)
if (process.client) {
  onClickOutside(dropdownRef, () => {
    isOpen.value = false
  })
}
watch(() => props.modelValue, (newVal) => {
  // 드롭다운 옵션에 포함되어 있으면 그대로 반영
  if (props.options.includes(newVal)) {
    selected.value = newVal
    customInput.value = ''
  } else {
    // 선택된 값은 "기타"로 유지, 입력값만 따로 저장
    if (selected.value === '기타') {
      customInput.value = newVal
    }
  }
})

// 드롭다운 열기/닫기
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

// 옵션 선택 시
const selectOption = (option) => {
  isOpen.value = false
  selected.value = option

  if (option === '기타') {
    customInput.value = ''
    emit('update:modelValue', '')
  } else {
    emit('update:modelValue', option)
  }
}

// 기타 입력값 반영
const emitCustomInput = () => {
  emit('update:modelValue', customInput.value)
}

</script>


<style>

@media (max-width: 767px) {
    .after-small {
        font-size: 16px;
    }
  }

</style>