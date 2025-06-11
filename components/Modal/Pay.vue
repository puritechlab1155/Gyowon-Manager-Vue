<template>
    <div
        v-if="visible"
        ref="modalRoot" 
        class="fixed inset-0 bg-black/50 z-[800] flex justify-center items-center"
    >
        <div class="bg-white rounded-lg p-6 w-[90%] max-w-5xl max-h-[90vh] overflow-y-auto shadow-lg relative"
            style="-ms-overflow-style:none; scrollbar-width:none;">
            <button
                class="editCancelBtn absolute top-6 right-6 text-gray-500 hover:text-black text-xl"
                @click="$emit('close')" >
                <img src="../../assets/img/close.png" alt="닫기 버튼" class="w-7 h-7" />
            </button>

            <h2 class="paperlogy text-[30px] max-md:text-[22px] font-medium mt-5 mb-2">수강자 정보수정</h2>
            <div class="border-t-[2px] border-[#2B5BBB] mb-3"></div>
            <div class="wrap gap-x-10 gap-y-4 p-4 max-sm:p-0">

                <div class="flex items-center gap-2 whitespace-nowrap">
                    <label class="w-28 max-sm:w-16 font-semibold shrink-0">수강코드</label>
                    <input type="text" :value="editData?.courseCode" 
                        class="bg-[#FAFAFA] border border-[#DBDEE3] text-[#727272] text-[18px] after-small py-2 px-3 pr-2 rounded-md focus:outline-none h-[45px] w-full" />
                    <button
                        @click="openSlidePanel" class="bg-[#2B5BBB] text-white px-3 py-2 h-[45px] rounded-md hover:bg-[#1d4691] flex-shrink-0">찾기</button>
                </div>

                <div class="flex items-center gap-2 whitespace-nowrap">
                    <label class="w-28 max-sm:w-16 font-semibold shrink-0 ">교육장소</label>
                    <div
                        class="flex items-center w-full h-[45px] w-2/3 text-[18px] after-small text-[#AFAFAF] bg-[#F3F3F3] px-3 pt-1 rounded-lg border border-[#DBDEE3]">
                        {{ editData?.coursePlace }}
                    </div>
                </div>
                <div class="flex items-center gap-2 whitespace-nowrap">
                    <label class="w-28 max-sm:w-16 font-semibold shrink-0">은행명</label>
                    <DropAll
                        :options="methodOptions"
                        v-model="localEditData.method" />
                </div>

                <div class="flex items-center gap-2 whitespace-nowrap">
                    <label class="w-28 max-sm:w-16 font-semibold shrink-0">입금날짜</label>
                    <input type="date" :value="editData?.paidAt"
                        class="bg-[#FAFAFA] border border-[#DBDEE3] text-[#727272] text-[18px] after-small py-2 px-2 pr-2 rounded-md focus:outline-none h-[45px] w-full" />
                </div>

                <div class="flex items-center gap-2 whitespace-nowrap">
                    <label class="w-28 max-sm:w-16 font-semibold shrink-0">입금금액</label>
                    <input type="number" :value="editData?.amount"
                        class="bg-[#FAFAFA] border border-[#DBDEE3] text-[#727272] text-[18px] after-small py-2 px-3 pr-2 rounded-md focus:outline-none h-[45px] w-full" />
                    <span class="ml-1 font-semibold">원</span>
                </div>
                <div class="flex items-center gap-2 whitespace-nowrap block max-xl:hidden">
                    <label class="w-28 max-sm:w-16 font-semibold shrink-0">수강료</label>
                    <div class="bg-[#FAFAFA] border border-[#DBDEE3] text-[#727272] text-[18px] after-small py-2 px-3 pr-2 rounded-md focus:outline-none h-[45px] w-full">
                        {{ editData?.tuition }}
                    </div>
                    <span class="ml-1 font-semibold">원</span>
                </div>

                <div class="grid-item border-t-[0.5px] border-[#DBDEE3] mt-5 mb-4 max-xl:hidden">
                </div>
                <div
                    class="grid-item relative border border-[#B6D9FF] rounded-xl bg-[#F5FAFF] px-4 py-6 mt-6 mb-4 max-xl:mt-8">
                    <div
                        class="absolute -top-3 left-5 bg-[#F5FAFF] px-4 py-1 text-sm font-semibold rounded-xl text-[#2874C5] border border-[#B6D9FF] ">
                        ※ 수강정보 관련 메모 ※
                    </div>

                    <div class="wrap gap-x-10 gap-y-4 mt-2">
                        <div class="flex max-sm:flex-col items-start gap-2 whitespace-nowrap">
                            <label class="w-28 font-semibold shrink-0">연기 / 환불</label>
                            <div class="flex items-center gap-2 w-full">
                                <input type="number" :value="editData?.refundAmount"
                                    class="bg-white border border-[#DBDEE3] text-[#727272] text-[18px] after-small py-2 px-2 pr-2 rounded-md focus:outline-none h-[45px] w-full" />
                                <span class="ml-1 font-semibold">원</span>
                                <DropAll
                                    :options="refundTypeOptions"
                                    v-model="localEditData.refundType"/>
                            </div>
                        </div>

                        <div class="flex items-center gap-2 whitespace-nowrap block max-xl:hidden"></div>

                        <div class="flex max-xl:flex-col items-start gap-2 whitespace-nowrap">
                            <label class="w-28 font-semibold shrink-0 text-red-600">관리자 메모</label>
                            <textarea :value="editData?.adminMemot"
                                class="bg-white border border-[#DBDEE3] text-[#727272] py-2 px-3 pr-2 rounded-md focus:outline-none w-full h-[100px] resize-none">{{ editData?.adminMemo }}</textarea>
                        </div>

                        <div class="flex max-xl:flex-col items-start gap-2 whitespace-nowrap">
                            <label class="w-28 font-semibold shrink-0 text-blue-600">연수생 메모</label>
                            <textarea :value="editData?.userMemo"
                                class="bg-white border border-[#DBDEE3] text-[#727272] py-2 px-3 pr-2 rounded-md focus:outline-none w-full h-[100px] resize-none">{{ editData?.userMemo }}</textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="border-t-[2px] border-[#2B5BBB] mb-5"></div>
            <div class="flex justify-end gap-3 mt-8">
                <button
                    class="editCancelBtn bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#4B5563] text-[18px] after-small font-semibold py-2 px-5 rounded-md border border-[#D1D5DB]"
                    @click="$emit('close')" >
                    취소하기
                </button>

                <button id="submitEditBtn"
                    class="bg-[#2B5BBB] hover:bg-[#1d4691] text-white font-semibold py-2 px-6 text-[18px] after-small rounded-md shadow-sm"
                    @click="$emit('save', editData)" >
                    수정하기
                </button>
            </div>
        </div>
    </div>
    <div id="slidePanel"
        class="fixed top-0 max-w-full max-w-[600px] h-full bg-white shadow-lg z-[999] transition-all duration-300 overflow-y-auto"
        :class="isSlidePanelOpen ? 'right-0' : 'right-[-100%]'">
        <div class="p-4">
            <h2 class="paperlogy text-[26px] max-md:text-[22px] font-medium mt-5 mb-5">연수과정 검색</h2>
            <div class="flex items-end justify-end gap-2 mb-4">
                <DropYear v-model="selectedYear" paddingY="py-1.5"/>
                <DropSemester v-model="selectedSemester" paddingY="py-1.5"/>
                <div class=" flex justify-end gap-2">
                    <div class="flex space-x-0">
                        <input type="text" placeholder="연수과정 검색" class="max-w-[180px] w-full px-2 g-[#FEFEFE] text-[#AFAFAF] placeholder-[#AFAFAF] border border-[#DBDEE3]
                            focus:outline-none rounded-[8px] rounded-tr-none rounded-br-none h-[40px]" />
                        <button
                            class="bg-[#2B5BBB] min-w-10 py-2 px-1 h-[40px] rounded-lg hover:bg-[#648DDF] focus:outline-none rounded-tl-none rounded-bl-none flex justify-center items-center">
                            <img src="../../assets/img/search.png" alt="검색 아이콘" class="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-sm border min-w-[700px]">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="border border-gray-300 px-2 py-1">번호</th>
                            <th class="border border-gray-300 px-2 py-1">과정코드</th>
                            <th class="border border-gray-300 px-2 py-1">직무</th>
                            <th class="border border-gray-300 px-2 py-1">과정명</th>
                            <th class="border border-gray-300 px-2 py-1">교육장소</th>
                            <th class="border border-gray-300 px-2 py-1">요일</th>
                            <th class="border border-gray-300 px-2 py-1">회차</th>
                        </tr>
                    </thead>
                    <tbody id="courseTableBody">
                        <tr class="cursor-pointer hover:bg-blue-50" @click="selectCourse('2025-1-A03091541')">
                            <td class="border border-gray-300 px-2 py-1 text-center">1</td>
                            <td class="border border-gray-300 px-2 py-1">
                                <div type="button"
                                    class="text-center w-full bg-[#5279C9] text-[#FFFFFF] text-[16px] max-sm:px-1 px-4 py-1 max-sm:text-[14px] rounded-lg border border-[#2B5BBB]">
                                    2025-1-A03091541
                                </div>
                            </td>
                            <td class="border border-gray-300 px-2 py-1 text-center">자율</td>
                            <td class="border border-gray-300 px-2 py-1 ">필라테스초중급</td>
                            <td class="border border-gray-300 px-2 py-1 text-center">서울디자인고</td>
                            <td class="border border-gray-300 px-2 py-1 text-center">매주 목요일</td>
                            <td class="border border-gray-300 px-2 py-1 text-center">0차</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button @click="closeSlidePanel()" class="mt-4 bg-gray-200 px-4 py-2 rounded-md w-full">닫기</button>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue';
    import { onClickOutside } from '@vueuse/core';

    // `editData` prop을 정의합니다. 부모 컴포넌트로부터 수정할 데이터를 받습니다.
    const props = defineProps({
        visible: Boolean,
        editData: {
            type: Object,
            default: () => ({})
        }
    });

    // 모달 내부에서 데이터를 수정할 경우를 대비해 `editData`를 반응형으로 복사합니다.
    // 이렇게 하면 부모에서 넘어온 prop을 직접 수정하지 않고,
    // 내부에서 수정된 데이터를 저장 시에만 부모로 전달할 수 있습니다.
    const methodOptions = ['선택하세요', '기업', '농협1', '농협2', '연기금 사용', '리브머니'];
    const refundTypeOptions = ['선택하세요', '연기/환불', '전액연기', '부분연기', '전액환불', '부분환불', "연기금 사용완료"];

    const localEditData = ref({});

    watch(() => props.editData, (newVal) => {
        if (newVal) {
            // 깊은 복사를 통해 부모 prop의 원본 객체가 변경되지 않도록 합니다.
            localEditData.value = { ...newVal };
        }
    }, { immediate: true, deep: true });

    // 모달 이벤트를 정의합니다.
    defineEmits(['close', 'save', 'findCourseCode']); // 'findCourseCode'는 '찾기' 버튼용

    watch(() => props.editData, (newVal) => {
        if (newVal) {
            localEditData.value = { ...newVal };
        }
    }, { immediate: true, deep: true });

    const modalRoot = ref(null);

    // ✅ 이 watch 블록만 유지합니다. (props.visible 감시 및 onClickOutside)
    watch(() => props.visible, (newVal) => {
        if (newVal) {
            onClickOutside(modalRoot, () => {
                if (props.visible) {
                    emit('close');
                }
            });
        }
    }, { immediate: true });



    // ✅  검색 슬라이드 
    const isSlidePanelOpen = ref(false);

    // '찾기' 버튼 클릭 시 슬라이드 패널을 엽니다.
    const openSlidePanel = () => {
        isSlidePanelOpen.value = true;
    };

    // 슬라이드 패널 내의 '닫기' 버튼 클릭 시 패널을 닫습니다.
    const closeSlidePanel = () => {
        isSlidePanelOpen.value = false;
    };

    // 검색 결과 테이블에서 과정을 선택했을 때 호출될 함수 (예시)
    // 실제 데이터를 업데이트하는 로직은 여기에 추가해야 합니다.
    const selectCourse = (courseCode) => {
        // 예시: 선택된 courseCode를 localEditData에 반영하고 패널 닫기
        localEditData.value.courseCode = courseCode;
        closeSlidePanel();
        // 필요하다면, 선택된 courseCode로 추가 정보를 불러오는 로직을 여기에 추가할 수 있습니다.
        // 예를 들어, emit('courseSelected', courseCode);
    };

    const selectedYear = ref('');
    const selectedSemester = ref('');

    
</script>

<style scoped>
/* 스크롤바 숨기기 (IE, Edge, Firefox) */
.overflow-y-auto::-webkit-scrollbar {
    display: none;
}
.wrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

.grid-item {
    grid-column: span 2 / span 2;
}
/* .drop {
    height: 40px !important;
    border-radius: 0.75rem !important;
} */
@media (max-width: 1279px) { /* Tailwind의 'xl' breakpoint는 기본적으로 1280px */
    .wrap {
        grid-template-columns: repeat(1, 1fr); /* 1개의 동일한 너비의 열 */
    }
    .grid-item {
        grid-column: span 1 / span 1;
    }
}
@media (max-width: 768px) {
    .after-small{
        font-size: 16px;
    }
}
</style>