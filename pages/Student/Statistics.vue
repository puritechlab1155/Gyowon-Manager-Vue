<template>
    <div class="p-[200px]">
        <h1 class="text-[30px] font-semibold text-center text-[#2B5BBB]">수강자 인원통계</h1>
    </div>
</template>

<script setup>
    definePageMeta({ middleware: 'auth' });
    
    import { useState } from '#app'

    const pageTitle = useState('pageTitle')
    pageTitle.value = '수강자 인원통계'
</script>