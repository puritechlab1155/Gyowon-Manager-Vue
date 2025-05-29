<template>
    <div class="tab-wrap drop-shadow flex bg-[#FEFEFE] pl-10 pr-10 pt-1 text-center rounded-[12px] max-lg:rounded-none max-lg:w-full">
        <div class="tab-box max-xl:flex-1">
            <button v-for="(tab, index) in tabs" 
            :key="tab.id" 
            @click="$emit('update:selectedTab', tab.id)" 
            :class="[
                'tab px-3 py-2 text-lg border-b-4 focus:outline-none font-semibold', // 기본 스타일
                selectedTab === tab.id
                    ? 'text-[#2B5BBB] border-[#2B5BBB] font-semibold' // 선택된 탭 스타일
                    : 'text-[#AFAFAF] border-transparent hover:text-[#2B5BBB] hover:font-semibold hover:border-[#2B5BBB] focus:text-[#2B5BBB] focus:border-[#2B5BBB] focus:font-semibold' // 선택 안된 탭 스타일
            ]">
                {{ tab.label }}
            </button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    tabs: { type: Array, required: true },
    selectedTab: { type: [String, Number], required: true }
})
</script>

<style scoped>
    .tab-box {
        display: flex;
        gap: 40px;
        justify-content: center;
    }



    /* max-lg: 화면 너비가 1023.98px 이하일 때 */
    @media (max-width: 1023.98px) {
        .tab-box {
            gap: 150px;
        }
        .tab-box button {
            flex: 0 0 15%; /* 3등분 */
            text-align: center; /* 버튼 안 텍스트 가운데 */
        }
        .tab-wrap{
            border-radius: 0px;
        }
    }

    /* max-md: 화면 너비가 767.98px 이하일 때 */
    @media (max-width: 767.98px) {
        .tab-box {
            gap: 100px;

        }
        .tab-box button {
            flex: 0 0 20%;
            text-align: center; 
        }
    }

    /* max-sm: 화면 너비가 639.98px 이하일 때 */
    @media (max-width: 639.98px) {
        .tab-box {
            gap: 10px;
        }
        .tab-box button {
            flex: 0 0 25%; /* 3등분 */
            text-align: center; /* 버튼 안 텍스트 가운데 */
        }
        .tab-wrap {
            padding-left: 5px;
            padding-right: 5px;
        }
    }

</style>