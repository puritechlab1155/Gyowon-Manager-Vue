<template>
    <button
    class="btn bg-[#2B5BBB] text-[18px] text-[#EDF3FF] flex items-center justify-center border border-[#2B5BBB] px-6 py-2.5 rounded-lg hover:bg-[#648DDF] focus:outline-none whitespace-nowrap"
    @click="handleClick"
    >
    일괄적용
    </button>
</template>

<script setup>
    import { defineEmits } from 'vue'

    const emit = defineEmits(['click'])

    function handleClick(event) {
        emit('click', event)
    }
</script>

<style scoped>

@media (max-width: 639.9px) {
    .btn {
        padding-right: 1rem;
        padding-left: 1rem;
    }
}

</style>