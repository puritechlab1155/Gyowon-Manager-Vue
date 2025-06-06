<template>
    <button
        @click="$emit('click')"
        class="btn bg-[#EDF3FF] text-[#2B5BBB] 2xl:max-w-none
        px-4 pt-3.6 pb-2.4 rounded-lg hover:bg-[#D3E1FB] border border-[#2B5BBB]
        focus:outline-none whitespace-nowrap"
        >
    <slot></slot>
    </button>
</template>

<script setup>
    const emit = defineEmits(['click']);
</script>

<style scoped>
/* max-xl: px-5 (1.25rem = 20px) */
@media (max-width: 639.9px) {
    .btn {
        font-size: 0.98rem;
        line-height: 1.25rem;
        padding-left: 1rem; 
        padding-right: 1rem;
        padding-top: 0.8rem;
        padding-bottom: 0.7rem;
    }
}

</style>
