<template>
    <button
    class="bg-[#EDF3FF] hover:bg-[#D3E1FB] p-2 rounded-xl mr-2"
    @click="handleClick"
    type="button"
    >
    <img src="../../assets/img/license.png" alt="이수증" class="w-6 h-6" />
    </button>
</template>
    
<script setup>

    const emit = defineEmits(['open-slide'])

    function handleClick() {
        emit('open-slide')
    }

</script>