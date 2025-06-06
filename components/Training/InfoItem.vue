<template>
    <span class="w-20 text-[#727272] max-md:text-[16px]">{{ label }}</span>
    <span class="text-[20px] max-md:text-[18px]" v-html="value"></span>
</template>

<script setup>
defineProps({
    label: String,
    value: String
})
</script>


<style>
    .mob-br {
        display: none;
    }
    @media (max-width: 768px) {
        .mob-br {
            display: block;
        }
    }

</style>

