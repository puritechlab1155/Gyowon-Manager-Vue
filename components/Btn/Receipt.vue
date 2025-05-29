<template>
    <button
        class="openReceiptSlide bg-[#EEF9F8] hover:bg-[#BEEFEC] p-2 rounded-xl"
        @click="handleClick"
        type="button"
    >
        <img src="../../assets/img/receipt.png" alt="영수증" class="w-6 h-6" />
    </button>
</template>

<script setup>

    const emit = defineEmits(['open-slide'])

    function handleClick() {
        emit('open-slide')
    }

</script>