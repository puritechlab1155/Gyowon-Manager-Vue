<template>
    <div class="tab-wrap drop-shadow flex bg-[#FEFEFE] pl-10 pr-10 pt-1 text-center rounded-[12px] max-2xl:self-start max-lg:rounded-none max-lg:w-full">
        <div class="tab-box max-xl:flex-1">
            <button
                v-for="(tab, index) in tabs"
                :key="tab.id"
                @click="$emit('update:selectedTab', tab.id)"
                :class="[
                    'tab px-4 py-2 text-lg border-b-4 focus:outline-none font-semibold',
                    selectedTab === tab.id
                        ? 'text-[#2B5BBB] border-[#2B5BBB]'
                        : 'text-[#AFAFAF] border-transparent hover:text-[#2B5BBB] hover:font-semibold hover:border-[#2B5BBB] focus:text-[#2B5BBB] focus:border-[#2B5BBB] focus:font-semibold'
                ]">
                {{ tab.label }}
            </button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    tabs: {
        type: Array,
        required: true,
        default: () => [],
    },
    selectedTab: {
        type: [String, Number],
        required: true,
    },
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
        flex: 0 0 25%;
        text-align: center;
    }
    .tab-wrap {
        border-radius: 0px;
    }
}

/* max-sm: 화면 너비가 639.98px 이하일 때 */
@media (max-width: 639.98px) {
    .tab-box {
        gap: 50px;
    }

    .tab-wrap {
        padding-left: 0px;
        padding-right: 0px;
    }
}
</style>