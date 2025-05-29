<template>
    <div class="p-[200px]">
        <h1 class="text-[30px] font-semibold text-center text-[#2B5BBB]"> 과정신청 </h1>
    </div>
</template>

<script setup>
    import { useState } from '#app'
    import { onMounted } from 'vue'
    
    const pageTitle = useState('pageTitle')
    onMounted(() => {
        pageTitle.value = '과정신청'
    })
</script>