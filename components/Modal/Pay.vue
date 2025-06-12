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
                    <input type="text" v-model="localEditData.courseCode"
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
                    <input type="date" v-model="localEditData.paidAt"
                        class="bg-[#FAFAFA] border border-[#DBDEE3] text-[#727272] text-[18px] after-small py-2 px-2 pr-2 rounded-md focus:outline-none h-[45px] w-full" />
                </div>

                <div class="flex items-center gap-2 whitespace-nowrap">
                    <label class="w-28 max-sm:w-16 font-semibold shrink-0">입금금액</label>
                    <input type="text" v-model="localEditData.amount"
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
                                <input type="text" v-model="localEditData.refundAmount"
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
                            <textarea v-model="localEditData.adminMemo"
                                class="bg-white border border-[#DBDEE3] text-[#727272] py-2 px-3 pr-2 rounded-md focus:outline-none w-full h-[100px] resize-none">{{ editData?.adminMemo }}</textarea>
                        </div>

                        <div class="flex max-xl:flex-col items-start gap-2 whitespace-nowrap">
                            <label class="w-28 font-semibold shrink-0 text-blue-600">연수생 메모</label>
                            <textarea v-model="localEditData.userMemo"
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
                    @click="submitEdit()" >
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
                        <template v-for="(course, index) in courseList" :key="course.id">
                            <template v-if="Array.isArray(course.course_place) && course.course_place.length">
                                <template v-for="(place, subIndex) in course.course_place" :key="`${course.id}-${subIndex}`">
                                    <tr class="cursor-pointer hover:bg-blue-50" @click="selectCourse(course.course_code)">
                                        <td class="border border-gray-300 px-2 py-1 text-center">
                                            <span class="font-bold text-md text-[#5279C9]">
                                                {{ (currentPage - 1) * perPage + index + 1 }}
                                            </span>・{{ subIndex + 1 }}
                                        </td>
                                        <td class="border border-gray-300 px-2 py-1">
                                            <div type="button"
                                                class="text-center w-full bg-[#5279C9] text-[#FFFFFF] text-[16px] max-sm:px-1 px-4 py-1 max-sm:text-[14px] rounded-lg border border-[#2B5BBB]">
                                                {{ course.course_code }}
                                            </div>
                                        </td>
                                        <td class="border border-gray-300 px-2 py-1 text-center">{{ course.job_classification.includes('서울직무') ? '서울' 
                                                                                                    :  course.job_classification.includes('경기직무') ? '경기'
                                                                                                    :  course.job_classification }}</td>
                                        <td class="border border-gray-300 px-2 py-1 ">
                                            {{ course.course_name }}
                                            
                                        </td>
                                        <td class="border border-gray-300 px-2 py-1 text-center">{{ place }}</td>
                                        <td class="border border-gray-300 px-2 py-1 text-center">{{ course.day_of_week.replace('매주', '').trim() }}</td>
                                        <td class="border border-gray-300 px-2 py-1 text-center">{{ course.round || '0차' }}</td>
                                    </tr>
                                </template>
                            </template>
                                <!-- course_place가 없거나 비어 있을 때도 표시 -->
                            <template v-else>
                                <tr class="cursor-pointer hover:bg-blue-50" @click="selectCourse(course.course_code)">
                                    <td class="border border-gray-300 px-2 py-1 text-center">
                                        <span class="font-bold text-md text-[#5279C9]">
                                            {{ (currentPage - 1) * perPage + index + 1 }}
                                        </span>
                                    </td>
                                    <td class="border border-gray-300 px-2 py-1">
                                        <div type="button"
                                            class="text-center w-full bg-[#5279C9] text-[#FFFFFF] text-[16px] max-sm:px-1 px-4 py-1 max-sm:text-[14px] rounded-lg border border-[#2B5BBB]">
                                            {{ course.course_code }}
                                        </div>
                                    </td>
                                    <td class="border border-gray-300 px-2 py-1 text-center">
                                        {{ course.job_classification.includes('서울직무') ? '서울' 
                                        :  course.job_classification.includes('경기직무') ? '경기'
                                        :  course.job_classification }}
                                    </td>
                                    <td class="border border-gray-300 px-2 py-1">{{ course.course_name }}</td>
                                    <td class="border border-gray-300 px-2 py-1 text-center">-</td>
                                    <td class="border border-gray-300 px-2 py-1 text-center">{{ course.day_of_week.replace('매주', '').trim() }}</td>
                                    <td class="border border-gray-300 px-2 py-1 text-center">{{ course.round || '0차' }}</td>
                                </tr>
                            </template>
                        </template>
                    </tbody>
                </table>
                <PagenationMini
                    :currentPage="currentPage"
                    :totalPages="totalPages"
                    @update:currentPage="onPageChange"
                />
            </div>
            <button @click="closeSlidePanel()" class="mt-4 bg-gray-200 px-4 py-2 rounded-md w-full">닫기</button>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue';
    import { useToast } from 'vue-toastification';
    import { useRoute } from 'vue-router'
    // const toast = useToast();
    const toast = useToast()
    const token = useCookie('auth_token').value
    const modalRoot = ref(null);
    const props = defineProps({
        visible: Boolean,
        editData: {
            type: Object,
            default: () => ({})
        }
    });

    const emit = defineEmits(['close', 'save']);

    const methodOptions = ['선택하세요', '기업', '농협1', '농협2', '연기금 사용', '리브머니'];
    const refundTypeOptions = ['선택하세요', '연기/환불', '전액연기', '부분연기', '전액환불', '부분환불', "연기금 사용완료"];

    const localEditData = ref({});

    watch(() => props.editData, (newVal) => {
        if (newVal) {
            localEditData.value = { ...newVal };
            
            // 날짜 형식 맞추기 (YYYY-MM-DD)
            if (localEditData.value.paidAt) {
            localEditData.value.paidAt = new Date(localEditData.value.paidAt).toISOString().split('T')[0];
            }
        }
    }, { immediate: true, deep: true });



    // ===== API 함수 (토스트 제거) =====
    import { $fetch } from 'ofetch';

    const putPayment = async (editData, token, paymentId) => {
        try {
            const response = await $fetch(`http://localhost:8000/api/admin/payments/${paymentId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: editData, // JSON.stringify 필요 없음
            });
            return { success: true, message: '결제가 성공적으로 수정되었습니다!', data: response };
        } catch (error) {
            console.error('❌ PUT 실패:', JSON.stringify(error, null, 2));
            const message = error?.data?.message || error?.message || '결제 수정 중 오류 발생';
            return { success: false, message, error };
        }
    };

    console.log('🔥 localEditData:', localEditData.value);
    // ===== 컴포넌트 레벨에서 토스트 처리 =====
    const submitEdit = async () => {
        const paymentId = localEditData.value.paymentId;

        if (!paymentId) {
            toast.error('결제 ID를 찾을 수 없습니다.');
            return;
        }

        const processedData = {
        // 기본 필드 (필요하면 id 등도 넣어도 됨)
            enroll_id: localEditData.value.id,
            method: localEditData.value.method,
            paid_at: localEditData.value.paidAt,
            amount: typeof localEditData.value.amount === 'string'
                ? Number(localEditData.value.amount.replace(/,/g, ''))
                : localEditData.value.amount,
            refund_amount: typeof localEditData.value.refundAmount === 'string'
                ? Number(localEditData.value.refundAmount.replace(/,/g, ''))
                : (localEditData.value.refundAmount || 0),
            refund_type: localEditData.value.refundType,
            admin_memo: localEditData.value.adminMemo,
            user_memo: localEditData.value.userMemo,
        };

        console.log('PUT 요청 전 payload:', processedData);

        // API 호출
        const result = await putPayment(processedData, token, paymentId);
        // 클라이언트에서만 토스트 실행
        if (process.client) {
            console.log('client');
            if (result.success) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        }

        // 성공시에만 부모에게 emit
        if (result.success) {
            emit('save', processedData);
        }
    };



    const currentPage = ref(1); // 현재 페이지
    const totalPages = ref(1);
    const perPage = ref(15); // 페이지당 개수 (기본값)

    const onPageChange = (page) => {
        currentPage.value = page;
        fetchCourseList(); // 페이지 바뀔 때 API 다시 호출
    }

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

    const selectCourse = (selectedCourse) => { // 인수를 courseCode -> selectedCourse로 변경
        localEditData.value.courseCode = selectedCourse.course_code;
        toast.success(`"${selectedCourse.course_name}" 과정을 선택하셨습니다.`); // ✅ 이제 course_name에 접근 가능
        closeSlidePanel();
    };

    // ✅  년도, 학기 검색시 연수데이터 불러오기
    const selectedYear = ref('');
    const selectedSemester = ref('');
    const courseList = ref([]) 
    
    async function fetchCourseList() {
        const year = selectedYear.value;
        const semester = selectedSemester.value;

        // '선택'이거나 빈 문자열일 경우 API 호출하지 않고 초기화
        const isInvalid = !year || year === '선택' || !semester || semester === '선택'

        if (isInvalid) {
            courseList.value = [] // 표 비우기
            console.log('년도 또는 학기가 선택되지 않아 과정 목록 API 호출을 생략합니다.')
            return
        }

        const params = new URLSearchParams({
            application_year: year,
            semester: semester,
            page: currentPage.value,
        });

        const url = `http://localhost:8000/api/admin/courses?${params.toString()}`;
        console.log('과정명 API 호출 URL:', url);

        try {
            const response = await $fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            courseList.value = response?.data || []
            const meta = response.meta || {}
            const total = meta.total || 0
            const perPage = meta.per_page || 15
            totalPages.value = meta.last_page || Math.ceil(total / perPage)
            console.log('📦 받아온 과정 리스트:', courseList.value)
            console.log('🔍 total:', response.total)
            console.log('📄 per_page:', response.per_page)
            console.log('📦 courseList:', courseList.value)
            console.log('🧮 totalPages:', totalPages.value)

        } catch (error) {
            console.error('❌ 과정 목록 요청 에러:', error)
            courseList.value = []
            toast.error('과정 목록을 불러오지 못했습니다.')
        }
    }

    watch([selectedYear, selectedSemester], () => {
        currentPage.value = 1;
        fetchCourseList()
    }, { immediate: true })

    watch(currentPage, () => {
        fetchCourseList();
    });


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