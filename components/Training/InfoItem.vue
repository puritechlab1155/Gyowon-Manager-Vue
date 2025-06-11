<template>
    <span class="w-20 text-[#727272] after-small">{{ label }}</span>
    <span class="text-[20px] after-small" v-html="value"></span>
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
    .after-small {
        font-size: 18px;
    }

    @media (max-width: 768px) {
        .mob-br {
            display: block;
        }

    }
    @media (max-width: 480px) {
        .after-small {
            font-size: 16px;
        }
    }

</style>

