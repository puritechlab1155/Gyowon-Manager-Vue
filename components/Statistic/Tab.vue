<template>
   <div class="left-content drop-shadow flex bg-[#FEFEFE] pl-10 pr-10 pt-1 text-center rounded-[12px] max-lg:rounded-none max-lg:w-full">
    <button
      v-for="option in options"
      :key="option.value"
      class="tab-box tab px-4 py-2 text-lg border-b-4 focus:outline-none max-lg:flex-1"
      :class="selected === option.value ? activeClass : inactiveClass"
      @click="change(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  selected: String,
  options: {
    type: Array,
    default: () => [
      { label: '전체', value: '' },
      { label: '직무', value: '직무' },
      { label: '자율', value: '자율' }
    ]
  }
})

const emit = defineEmits(['update:selected'])

const change = (value) => {
  emit('update:selected', value)
}

</script>