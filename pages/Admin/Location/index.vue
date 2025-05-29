<template>
    <div class="p-[200px]">
        <h1 class="text-[30px] font-semibold text-center text-[#2B5BBB]">장소안내 페이지</h1>
    </div>
</template>

<script setup>
    import { useState } from '#app'

    const pageTitle = useState('pageTitle')
    pageTitle.value = '장소안내'
</script>