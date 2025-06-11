<template>
    <div class="pt-5 pb-5">
        <div class="max-lg:flex max-lg:flex-col-reverse">
            <div
                class="w-full flex justify-end max-lg:mt-[20px] max-2xl:flex-col max-2xl:items-stretch max-2xl:gap-5 max-xl:flex-col-reverse">
                <div id="selectedFilters"
                    class="flex h-auto gap-2 mt-2 block lg:hidden whitespace-nowrap overflow-x-auto no-scrollbar">
                </div>
                <!-- right-content (탭들) -->
                <div class="right-content flex justify-end text-lg gap-2 max-2xl:self-end max-lg:justify-between max-lg:w-full">
                    <div class="flex justify-between gap-2 max-lg:hidden">
                        <DropYear v-model="selectedYear"/>
                        <DropSemester v-model="selectedSemester"/>
                        <DropCourse v-model="selectedCourse"/>
                        <DropPayStatus v-model="selectedPayStatus" height="55px" width="120px"/>
                    </div>
                    <div
                    class=" flex justify-between items-center max-lg:grid max-lg:grid-cols-5 max-lg:gap-2 max-lg:w-full">
                    <div class="max-lg:col-span-4 w-full">
                        <SearchBar placeholder="과정명을 입력하세요." @search="searchQuery = $event"/>
                    </div>
                    <div class="filter hidden max-lg:block">
                        <button id="filterButton w-full max-lg:col-span-1 "
                            class="text-[#202020] flex justify-between items-center px-1 py-3 max-sm:py-2 w-full rounded-md bg-[#ECECEC]">
                            <div class="w-14 text-center min-w-[30px]">필터</div>
                            <img class="w-8 h-6" src="../../assets/img/filter.png" alt="필터 아이콘" />
                        </button>
                    </div>
                </div>

                </div>
            </div>
            <div class="flex justify-between mt-5 gap-2 max-sm:flex-col-reverse ">
            <!-- left-content -->
            <div class="left-content flex items-center justify-between max-sm:justify-start gap-2 ml-[-8px]">
                <!-- <button id="selectAllBtn" class="left-content flex items-center justify-center gap-2 pl-5 pr-5 rounded-lg focus:outline-none whitespace-nowrap"> -->
                <CheckboxAll
                    :modelValue="isAllSelected"
                    @update:modelValue="toggleSelectAll"
                />         
                <DropPayStatus v-model="selectedPayStatus" width="105px" height="50px"/>
                <BtnUpdate @click="onApply" />
            </div>
                <!-- right-content (탭들) -->
                <div
                    class="right-content flex justify-end max-sm:justify-start">
                    <BtnExcel :targetTableId="tableId" :filename="fileName" :headerTableId="tableHeaderId" class="py-2.5"/>
                </div>
            </div>
        </div>
        <!-- <p class="mt-4 text-gray-700">선택된 년도: {{ selectedYear }}</p>
        <p class="mt-4 text-gray-700">선택된 학기: {{ selectedSemester }}</p>
        <p class="mt-4 text-gray-700">선택된 과정명: {{ selectedCourse }}</p>
        <p class="mt-4 text-gray-700">선택된 교육장소: {{ selectedEduPlace }}</p>
        <p class="mt-4 text-gray-700">선택된 요일: {{ selectedDay }}</p>
        <p class="mt-4 text-gray-700">선택된 회차: {{ selectedRound }}</p>
        <p class="mt-4 text-gray-700">선택된 상태: {{ selectedPayStatus }}</p> -->
        <TabPay v-model="activeTab" :tabs="tabsWithCount" />
    </div>

    <div class="w-full">
        <div class="overflow-x-auto">
            <div class="min-w-[1280px]">
                <!-- 테이블 헤더 부분 -->
                <table class="w-full bg-[#FEFEFE] rounded-[12px] text-center table-fixed drop-shadow ">
                    <thead>
                        <tr class="h-[70px]">
                            <th class="px-2 py-2 font-semibold w-[4%]" id="selectAllBtn">
                                선택
                            </th>
                            <th class="px-2 py-2 font-semibold w-[4%]">번호</th>
                            <th class="px-2 py-2 font-semibold w-[9%]">직무 · 종목</th>
                            <th class="px-2 py-2 font-semibold w-[15%]">과정명</th>
                            <th class="px-2 py-2 font-semibold w-[7%]">이름</th>
                            <th class="px-2 py-2 font-semibold w-[15%]">직장명</th>
                            <th class="px-2 py-2 font-semibold w-[10%]">교육장소</th>
                            <th class="px-2 py-2 font-semibold w-[9%]">연수기간</th>
                            <th class="px-2 py-2 font-semibold w-[6%]">요일</th>
                            <th class="px-2 py-2 font-semibold w-[10%]">입금내역</th>
                            <th class="px-2 py-2 font-semibold w-[11%]">관리</th>
                        </tr>
                    </thead>
                </table>

                <!-- 테이블 본문 부분 -->
                <table id="excelTable"
                    class="table-fixed w-full rounded-[12px] text-center mt-4 bg-[#FEFEFE]">
                    <tbody>
                        <template v-for="enroll in enrollList" :key="enroll.id">
                            <tr class="bg-[#FEFEFE] h-[120px] border-b border-gray-400">
                                <td class="px-2 py-2 w-[4%] text-[#727272]">
                                    <CheckboxItem
                                        :checked="selectedItems.includes(enroll.id)"
                                        @change="(checked) => toggleItem(enroll.id, checked)"
                                        :label="enroll.userName"
                                    />
                                </td>
                                <td class="px-2 py-2 w-[4%] text-[#727272]">{{ enroll.id }}</td>
                                <td class="px-2 py-2 w-[9%] text-[#727272]">
                                    <div class="flex flex-col items-center gap-2">
                                        <component :is="getJobBadge(enroll.jobClassification)"></component>
                                        <component :is="getSubjectBadge(enroll.courseDivision)"></component>
                                    </div>
                                </td>
                                <td class="px-2 py-2 w-[15%] text-[#727272] text-left">{{ enroll.courseName }}</td>
                                <td class="px-2 py-2 w-[7%] text-[#292929] font-semibold ">{{ enroll.userName }}</td>
                                <td class="px-2 py-2 w-[15%] text-[#727272]">중앙대학교 사범대학 부속고</td>
                                <td class="px-2 py-2 w-[10%] text-[#727272]">{{ enroll.coursePlace }}</td>
                                <td class="px-2 py-2 w-[9%] text-[#727272] leading-tight">{{ enroll.courseStartDate }} <br /> ~
                                    <br/>
                                    {{ enroll.courseEndDate }}</td>
                                <td class="px-2 py-2 w-[6%] text-[#727272]">{{ enroll.courseday }}</td>
                                <td class="px-2 py-2 w-[10%]">
                                    <div class="text-[#727272]">{{ enroll.paidAt }}</div>
                                    <!-- 미입금일 경우 영수증 아이콘 없음 / 메모작업 없을 경우 코멘트 아이콘 없음 -->
                                    <div class="flex justify-center gap-2 px-2 mt-2">
                                        <div class="relative group">
                                            <BtnReceipt @click="openReceiptSlide(enroll)" />
                                        </div>
                                    </div>
                                </td>
                                <td class="px-2 py-2 w-[11%]" >
                                    <div class="flex items-center gap-2 flex-col">
                                        <div class="flex justify-center mt-2">
                                            <DropPayStatus v-model="enroll.paymentStatus" width="105px" height="50px"/>
                                        </div>
                                        <div class="flex justify-between gap-3">
                                            <BtnEdit @click="openEditModal(enroll)"/>
                                            <BtnDiscard @click="openDeleteModal(enroll)" />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="enroll.adminMemo || enroll.userMemo || enroll.refund_type" class="bg-[#FEFEFE] h-[50px] border-t w-[100%] border-dashed border-gray-300">
                                <td colspan="13" class="px-2 py-2">
                                    <span v-if="enroll.adminMemo" class="text-[#F44336] whitespace-nowrap mr-4">7만원 입금 3만원 부족</span>
                                    <span v-if="enroll.userMemo" class="text-[#2196F3] whitespace-nowrap mr-4">2종목 할인</span>
                                    <span v-if="enroll.refund_type" class="text-black whitespace-nowrap">전액연기</span>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!-- 삭제 모달 -->
    <ModalDeleteConfirm
        :visible="isDeleteModalVisible"
        :data="selectedTrainingItem"
        title="수강자"
        :delete-type="'수강'"
        :all-or-item="'선택된'"
        @confirm="handleDelete"
        @cancel="isDeleteModalVisible = false"
    />
    <!-- 수정 모달 -->
    <ModalPay
        :visible="showEditModal"
        :edit-data="selectedEnrollForEdit"
        @close="showEditModal = false"
        @save="handleSaveEdit"
    />
    <UserSlideRece v-if="showSlideRece" :user="selectedEnrollForReceipt" @close="showSlideRece = false" />
    <div class="flex justify-center items-center mt-4 mt-[100px]">
        <!-- 이전 / 다음 버튼 그룹 -->
        <div class="flex items-center space-x-3 max-lg:space-x-1">
            <button
                class="px-2 py-4 max-sm:py-2 max-sm:px-2 text-[#727272] rounded-md flex items-center justify-center group">
                <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 fill-[#727272] group-hover:fill-[#2B5BBB]">
                    <path
                        d="M0.68629 9.89949L10.5858 19.799L12 18.3848L3.51471 9.8995L12 1.41421L10.5858 -6.18172e-08L0.68629 9.89949Z" />
                </svg>
                <span
                    class="hidden lg:inline-block group-hover:text-[#2B5BBB] group-hover:font-semibold ml-2">이전</span>
            </button>

            <!-- 페이지 번호들 -->
            <div class="flex space-x-2 max-lg:space-x-2">
                <button
                    class="w-12 h-12 max-sm:w-8 max-sm:h-8 flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF] focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    1
                </button>
                <button
                    class="w-12 h-12 max-sm:w-8 max-sm:h-8 flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF] focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    2
                </button>
                <button
                    class="w-12 h-12 max-sm:w-8 max-sm:h-8 flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF] focus:text-[#EDF3FF]">
                    3
                </button>
                <button
                    class="w-12 h-12 max-sm:w-8 max-sm:h-8 flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF] focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    4
                </button>
                <button
                    class="w-12 h-12 max-sm:w-8 max-sm:h-8 flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF] focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    5
                </button>
                <button
                    class="w-12 h-12 max-sm:w-8 max-sm:h-8 max-lg:hidden flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF]  focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    6
                </button>
                <button
                    class="w-12 h-12 max-sm:w-8 max-sm:h-8 max-lg:hidden flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF]  focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    7
                </button>
                <button
                    class="w-12 h-12 max-sm:w-8 max-sm:h-8 max-lg:hidden flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF]  focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    8
                </button>
                <button
                    class="w-12 h-12 max-sm:w-8 max-sm:h-8 max-lg:hidden flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF]  focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    9
                </button>
                <button
                    class="w-12 h-12 max-sm:w-8 max-sm:h-8 max-lg:hidden flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF]  focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    10
                </button>
            </div>
            <!-- 다음 버튼 -->
            <button
                class="px-2 py-4 max-sm:py-2 max-sm:px-2 text-[#727272] rounded-md flex items-center justify-center group">
                <span
                    class="hidden lg:inline-block group-hover:text-[#2B5BBB] group-hover:font-semibold mr-2">다음</span>
                <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 fill-[#727272] group-hover:fill-[#2B5BBB]">
                    <path
                        d="M11.3137 10.1005L1.41423 0.201019L2.07232e-05 1.61523L8.48529 10.1005L1.68643e-08 18.5858L1.41421 20L11.3137 10.1005Z" />
                </svg>

            </button>
        </div>
    </div>
        
</template>

<script setup>

    import { useState, useFetch } from '#app'
    import { useCookie } from '#imports'
    import { onMounted } from 'vue'

    // ✅ Band 컴포넌트들 임포트 (위에서 설명한대로 경로를 실제에 맞게 수정)
    import BandDance from '../../components/Band/Dance.vue';
    import BandLine from '../../components/Band/Line.vue';
    import BandPilates from '../../components/Band/Pilates.vue';
    import BandWelbing from '../../components/Band/Welbing.vue';
    import BandFree from '../../components/Band/Free.vue';
    import BandSeoul from '../../components/Band/Seoul.vue';
    import BandGyeonggi from '../../components/Band/Gyeonggi.vue';
    import { useCheckboxGroup } from '../../composables/useCheckboxGroup'


    const selectedYear = ref('')
    const selectedSemester = ref('')
    const selectedCourse = ref('')
    const selectedPayStatus = ref('')

    const showSlideRece = ref(false);
    const selectedEnrollForReceipt = ref(null);

    const openReceiptSlide = (enrollItem) => {
        selectedEnrollForReceipt.value = enrollItem; // Store the enroll data
        showSlideRece.value = true;               // Open the slide
    };


    // ✅ 종목 밴드
    const getSubjectBadge = (subject) => {
        switch (subject) {
            case '댄스스포츠': return BandDance;
            case '라인댄스': return BandLine;
            case '필라테스': return BandPilates;
            case '웰빙댄스': return BandWelbing;
            default: return null; // 일치하는 컴포넌트가 없을 경우 아무것도 렌더링하지 않음
        }
    };

    // ✅ 직무 밴드
    const getJobBadge = (job) => {
        switch (job) {
            case '자율': return BandFree;
            case '서울': return BandSeoul;
            case '경기': return BandGyeonggi;
            default: return null; // 일치하는 컴포넌트가 없을 경우 아무것도 렌더링하지 않음
        }
    };

    // ✅ 원본 데이터
    const rawData = {
        all: 186,
        입금: 120,
        미입금: 50,
        수강대기: 17,
        수강확정: 120,
        수강취소: 36,
        수강연기: 137,
        환불: 17
    }

    // ✅ 탭 목록 정의
    const tabList = [
        { id: 'all', label: '전체' },
        { id: '입금', label: '입금' },
        { id: '미입금', label: '미입금' },
        { id: '수강대기', label: '수강대기' },
        { id: '수강확정', label: '수강확정' },
        { id: '수강취소', label: '수강취소' },
        { id: '수강연기', label: '수강연기' },
        { id: '환불', label: '환불' }
    ]


    const token = useCookie('auth_token').value
    // ✅ 수강자 데이터를 저장할 ref 변수 선언
    const enrollList = ref([]);
    const isLoadingEnroll = ref(false);
    
    // ✅ 체크박스 그룹 관리
    const {
        selectedItems,
        isAllSelected,
        toggleItem,
        toggleSelectAll,
    } = useCheckboxGroup(enrollList);// ✅ enrollList의 ID 목록을 넘겨줍니다.

    // 선택된 아이템들 확인 (디버깅용)
    watch(selectedItems, (newVal) => { // ✅ selectedTrainingItems 대신 selectedItems 사용
        console.log('선택된 아이템들:', newVal);
    }, { deep: true });

    watch(isAllSelected, (newVal) => {
        console.log('전체선택 상태:', newVal);
    });

    // ✅ 수강자 데이터 불러오기
    const fetchEnrollData = async () => {
        isLoadingEnroll.value = true;
        try {
            const { data, error } = await useFetch('http://localhost:8000/api/admin/enrolls', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`, // ✅ 토큰 쿠키로 인증
                    Accept: 'application/json',
                },
                params: {
                    tab: '',
                    'filter[search]': '',
                    application_year: '',
                    semester: '',
                    course_name: '',
                },
            })

            if (error.value) {
            console.error('❌ 에러 발생:', error.value);
            enrollList.value = []; // 에러 발생 시 리스트 초기화
            } else {
                // 📦 API에서 받은 원본 데이터 로깅 (확인용)
                console.log('📦 받은 원본 데이터:', data.value);

                // ✅ data.value.data가 배열인지 확인하고 처리
                if (data.value?.data && Array.isArray(data.value.data)) {
                    // 🚀 enrollList에 데이터 할당 및 콘솔에 예쁘게 출력
                    enrollList.value = data.value.data.map(item => {
                        const mappedItem = {
                            // 회원정보
                            id: item.id,
                            userName: item.user?.name ?? '이름 없음',
                            // 강의정보
                            courseName: item.course?.course_name ?? '강좌명 없음',
                            coursePlace: item.course?.course_place?.join(' , ') ?? '장소 정보 없음', 
                            courseCode: item.course?.course_code ?? '코드 없음',

                            // 수강정보
                            paymentStatus: item.payment?.pay_status ?? '정보 없음',
                            jobClassification: item.course?.job_classification
                                ? item.course.job_classification.replace('직무', '').trim()
                                : '분류 없음',
                            courseDivision: item.course?.division ?? '종목 없음',
                            applicationYear: item.course?.application_year ?? '연도 없음',
                            tuition: item.course?.tuition ?? 0,
                            courseStartDate: item.course?.course_start ?? '시작일 없음',
                            courseEndDate: item.course?.course_end ?? '종료일 없음',
                            courseday: item.course?.day_of_week ?? '요일 없음',
                            updatedAt: item.updated_at ? new Date(item.updated_at).toLocaleDateString('ko-KR') : '날짜 없음',

                            // 추가 정보
                            method: item.payment?.method ?? null, // 은행명
                            paidAt: item.payment?.paid_at ?? null, //입금날짜
                            amount: item.payment?.amount ?? 0, // 입금금액
                            refundAmount: item.payment?.refund_amount ?? 0, // 환불금액
                            refundType: item.payment?.refund_type ?? null, // 환불타입
                            adminMemo: item.payment?.admin_memo ?? null, // 관리자 메모
                            userMemo: item.payment?.user_memo ?? null, // 수강생 메모
                            
                        };
                        return mappedItem;
                    });

                    // 🌟 콘솔에 처리된 수강자 목록 예쁘게 출력
                    console.groupCollapsed('📊 처리된 수강자 목록 (클릭하여 자세히 보기)');
                    if (enrollList.value.length === 0) {
                        console.log('등록된 수강자가 없습니다.');
                    } else {
                        enrollList.value.forEach((enroll, index) => {
                            console.log(`--- 수강자 ${index + 1} (ID: ${enroll.id}) ---`);
                            console.log(`  이름: ${enroll.userName}`);
                            console.log(`  강좌명: ${enroll.courseName}`);
                            console.log(`  강의 장소: ${enroll.coursePlace}`);
                            console.log(`  수강 상태: ${enroll.paymentStatus}`);
                            console.log(`  과정 코드: ${enroll.courseCode}`);
                            console.log(`  종목: ${enroll.courseDivision}`);
                            console.log(`  요일: ${enroll.courseday}`);
                            console.log(`  개설 연도/학기: ${enroll.applicationYear}년 ${enroll.semester}`);
                            console.log(`  강의 기간: ${enroll.courseStartDate} ~ ${enroll.courseEndDate}`);
                            console.log(`  최종 업데이트: ${enroll.updatedAt}`);
                            if (enroll.adminMemo) console.log(`  관리자 메모: ${enroll.adminMemo}`); // 추가
                            if (enroll.userMemo) console.log(`  사용자 메모: ${enroll.userMemo}`);   // 추가
                            if (enroll.refundType) console.log(`  환불 타입: ${enroll.refundType}`); // 추가
                            console.log('------------------------------------');
                        });
                    }
                    console.groupEnd(); // 콘솔 그룹 종료

                } else {
                    enrollList.value = []; // data.value.data가 없거나 배열이 아니면 빈 배열
                    console.warn('⚠️ API 응답 데이터가 예상한 배열 형식이 아니거나 비어있습니다:', data.value);
                }
            }
        } catch (e) {
            console.error('❌ 수강자 데이터 fetch 중 예외 발생:', e);
            enrollList.value = [];
        } finally {
            isLoadingEnroll.value = false; // 로딩 종료
        }
    };

    // ✅ 활성 탭 상태
    const activeTab = ref('all')

    // ✅ count 포함된 탭 목록 계산
    const tabsWithCount = computed(() =>
        tabList.map(tab => ({
            ...tab,
            count: rawData[tab.id] || 0
        }))
    )

    // ✅ 삭제 모달 관련 ref 선언
    const isDeleteModalVisible = ref(false);
    const selectedTrainingItem = ref(null); // 삭제할 아이템의 정보를 담을 ref

    const openDeleteModal = (item) => {
        selectedTrainingItem.value = {
            ids: [item.id],
            title: item.userName
        };
        isDeleteModalVisible.value = true;
    };

    // 삭제모달 기능
    const onApply = () => {
        let modalDataTitle = '';
        if (selectedItems.value.length === 1) {
            // 단일 항목 선택 시: 해당 항목의 userName을 찾아서 사용
            const selectedEnroll = enrollList.value.find(
                (enroll) => enroll.id === selectedItems.value[0]
            );
            // enroll.userName을 modalDataTitle에 할당
            modalDataTitle = selectedEnroll ? selectedEnroll.userName : '선택된 사용자';
        } else {
            // 다중 항목 선택 시: "N명의 사용자"로 표시
            modalDataTitle = `${selectedItems.value.length}명의 사용자`;
        }

        // ModalDeleteConfirm에 title과 ids를 포함하는 객체를 전달
        openDeleteModal({ title: modalDataTitle, ids: selectedItems.value });
    };

    // 삭제 모달에서 '예'를 눌렀을 때 실행될 삭제 로직
    const handleDelete = () => {
        console.log('✅ 삭제를 확정합니다. 삭제할 ID들:', selectedTrainingItem.value.ids)

        isDeleteModalVisible.value = false; // 모달 닫기
        selectedTrainingItem.value = null; // 선택된 아이템 초기화 (선택사항)
    };


    // ✅ 수정 모달 관련 ref 추가
    const showEditModal = ref(false); // 수정 모달의 가시성 제어
    const selectedEnrollForEdit = ref(null); // 수정할 수강생 데이터를 저장할 ref

    // ✅ 수정 모달을 여는 함수
    const openEditModal = (enrollItem) => {
        selectedEnrollForEdit.value = { ...enrollItem }; // 원본 데이터 변경 방지를 위해 깊은 복사
        showEditModal.value = true;
    };

    // ✅ 수정 모달에서 '저장' 버튼을 눌렀을 때 호출될 함수
    const handleSaveEdit = (updatedData) => {
        console.log('수정된 데이터:', updatedData);
        // 여기에 업데이트된 데이터를 서버로 전송하는 로직 추가
        // 예: axios.put(`/api/admin/enrolls/${updatedData.id}`, updatedData)

        showEditModal.value = false; // 모달 닫기
        // 데이터 업데이트 후 enrollList를 새로고침하거나 해당 항목만 업데이트
        // fetchEnrollData(); // 전체 데이터 다시 불러오기 (간단하지만 비효율적일 수 있음)
        // 또는 enrollList에서 해당 항목만 찾아 업데이트
        const index = enrollList.value.findIndex(e => e.id === updatedData.id);
        if (index !== -1) {
            enrollList.value[index] = updatedData;
        }
    };

    watch([isDeleteModalVisible, showEditModal], ([isDeleteOpen, isEditOpen]) => {
        if (isDeleteOpen || isEditOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, { immediate: true });



    const pageTitle = useState('pageTitle')
    
    onMounted(() => {
        pageTitle.value = '수강자 입금관리'
        fetchEnrollData()
    })




</script>


<style scoped>

@media (max-width: 768px) {
    .left-content {
        justify-content: start;
        margin-left: 10px !important;
    }
    .right-content {
        justify-content: start;
    }
}



</style>