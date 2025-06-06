<template>
    <div class="p-[200px]">
        <h1 class="text-[30px] font-semibold text-center text-[#2B5BBB]"> 연수수정 </h1>
        <div v-if="trainingData">제목: {{ trainingData.title }}</div>
    </div>
</template>

<script setup>
    import { useState } from '#app'
    import { useRoute } from 'vue-router'
    import { onMounted } from 'vue'

    const route = useRoute()
    const id = route.params.id
    
    const trainingData = ref(null)

    const pageTitle = useState('pageTitle')
    onMounted(() => {
        pageTitle.value = '연수수정'

        //const { data: trainingData, pending, error } = await useFetch(`/api/training/${id}`)
        trainingData.value = data.value
    })
</script>