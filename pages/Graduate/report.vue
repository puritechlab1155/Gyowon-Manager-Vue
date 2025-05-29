<template>
    <div class="p-[200px]">
        <h1 class="text-[30px] font-semibold text-center text-[#2B5BBB]">수료자 보고서</h1>
    </div>
</template>

<script setup>
    import { useState } from '#app'

    const pageTitle = useState('pageTitle')
    pageTitle.value = '수료자 보고서'
</script>