페이지 이동 기능도 함께 사용해야 하는 상황이시군요! 그렇다면 BtnEdit 컴포넌트를 to prop이 있을 때는 페이지 이동을 하고, to prop이 없을 때는 단순히 클릭 이벤트를 발생시키는 버튼으로 만들어서 유연하게 사용할 수 있습니다.

이렇게 하면 BtnEdit 하나로 두 가지 기능을 모두 처리할 수 있어 코드가 깔끔해집니다.

BtnEdit.vue: 페이지 이동과 클릭 이벤트 처리 모두 지원
BtnEdit.vue 컴포넌트의 템플릿에 조건부 렌더링을 사용하여 to prop의 유무에 따라 router-link 또는 일반 button 태그를 렌더링하도록 합니다.

코드 스니펫

<template>
    <router-link
        v-if="to"
        :to="to"
        class="editModalBtn bg-[#FFF3E5] px-2.5 py-2 rounded-lg hover:bg-[#FFECBA] inline-flex items-center justify-center"
    >
        <img src="../../assets/img/pen.png" alt="수정 아이콘" class="w-[22px] h-[22px]" />
    </router-link>

    <button
        v-else
        class="editModalBtn bg-[#FFF3E5] px-2.5 py-2 rounded-lg hover:bg-[#FFECBA] inline-flex items-center justify-center"
        @click="$emit('click')" >
        <img src="../../assets/img/pen.png" alt="수정 아이콘" class="w-[22px] h-[22px]" />
    </button>
</template>

<script setup>
// ✅ 'to' prop은 더 이상 필수가 아닙니다 (required: false)
const props = defineProps({
    to: {
        type: [String, Object], // 문자열 또는 객체 (named route) 모두 허용
        required: false // ⭐ 이제 필수가 아님
    }
});

// ✅ 부모 컴포넌트로 'click' 이벤트를 발생시킴
defineEmits(['click']); 

console.log('BtnEdit: props.to =', props.to, 'typeof props.to =', typeof props.to);
</script>

<style>
/* 기존 스타일 유지 */
</style>