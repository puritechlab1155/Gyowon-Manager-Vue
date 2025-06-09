<template>
  <div class="flex justify-between mt-5 border-b-2 border-b-[#2B5BBB]">
    <div class="flex gap-3 overflow-x-auto whitespace-nowrap no-scrollbar">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="[
          'group hover-white flex items-center gap-2 px-4 py-2.5 rounded-t-lg focus:outline-none',
          tab.id === modelValue
            ? 'bg-[#2B5BBB] text-white font-bold'
            : 'bg-[#D3E1FB] text-[#292929] font-medium hover:bg-[#2B5BBB] hover:text-white'
        ]"
        @click="$emit('update:modelValue', tab.id)"
      >
        <span>{{ tab.label }}</span>
        <span
          :class="[
            'hover-bg flex font-bold items-center justify-center rounded-md px-2 text-[12px] leading-5',
            tab.id === modelValue
              ? 'bg-white text-[#2B5BBB]  '
              : 'bg-[#2B5BBB] text-white group-hover:text-[#2B5BBB] group-hover:bg-[#FFFFFF]'
          ]"
        >
          {{ tab.count }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    tabs: {
      type: Array,
      required: true
    },
    modelValue: {
      type: String,
      required: true
    }
  })
  defineEmits(['update:modelValue'])
</script>

<style>

  .hover-white:hover {
    color: white;
  }

</style>