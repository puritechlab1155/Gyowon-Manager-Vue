<template>
    <div class="pt-5 pb-5">
        <div class="max-lg:flex max-lg:flex-col-reverse">
            <div
                class="w-full flex justify-end max-lg:mt-[20px] max-2xl:flex-col max-2xl:items-stretch max-2xl:gap-5 max-xl:flex-col-reverse">
                <div id="selectedFilters" class="flex flex-wrap justify-start gap-2 mt-2 block lg:hidden">
                    <div
                        v-for="(value, key) in appliedFilters"
                        :key="key"
                        class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2 text-base"
                    >
                        {{ value }}
                        <span class="cursor-pointer text-[#2B5BBB] text-base" @click="removeFilter(key)">✕</span>
                    </div>
                </div>
                <!-- right-content (탭들) -->
                <div class="right-content flex justify-end text-lg gap-2 max-2xl:self-end max-lg:justify-between max-lg:w-full">
                    <div class="flex justify-between gap-2 max-lg:hidden">
                        <DropYear v-model="selectedYear"/>
                        <DropSemester v-model="selectedSemester"/>
                        <DropCourse v-model="selectedCourse" :options="courseOptions"/>
                        <!-- <DropPayStatus v-model="selectedPayStatus" height="55px" width="120px"/> -->
                    </div>
                    <div
                    class=" flex justify-between items-center max-lg:grid max-lg:grid-cols-5 max-lg:gap-2 max-lg:w-full">
                    <div class="max-lg:col-span-4 w-full">
                        <SearchBar placeholder="이름을 입력하세요." @search="searchQuery = $event"/>
                    </div>
                    <div class="filter hidden max-lg:block">
                        <button @click="openFilterModal"
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
                <DropPayStatus 
                    v-model="selectedPayStatus" 
                    width="105px" 
                    height="50px"
                    :options="paymentStatusOptions"
                />
                <BtnUpdate @click="onUpdateApply" />
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
                    class="payTable table-fixed w-full rounded-[12px] text-center mt-4">
                    <tbody>
                        <template v-for="(enroll, index) in filteredEnrollList" :key="enroll.id">
                            <tr :style="getRowBgStyle(index)"  :class="getRowClass(index, enroll, false)">
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
                                <td class="px-2 py-2 w-[15%] text-[#727272]">{{ enroll.workPlace }}</td>
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
                                            <BtnReceipt 
                                                v-if="enroll.paidAt" 
                                                @click="openReceiptSlide(enroll)"
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td class="px-2 py-2 w-[11%]" >
                                    <div class="flex items-center gap-2 flex-col">
                                        <div class="flex justify-center mt-2">
                                            <DropPayStatus 
                                                :modelValue="enroll.paymentStatus"
                                                width="105px" 
                                                height="50px"
                                                :options="paymentStatusOptions"
                                                @update:modelValue="(newStatus) => updateIndividualPaymentStatus(enroll.paymentId, newStatus)"/>
                                        </div>
                                        <div class="flex justify-between gap-3">
                                            <BtnEdit @click="openEditModal(enroll)"/>
                                            <BtnDiscard @click="openDeleteModal(enroll)" />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="enroll.adminMemo || enroll.userMemo || enroll.refundType"
                            :style="getRowBgStyle(index)" :class="getRowClass(index, enroll, true)">
                                <td colspan="13" class="px-2 py-2">
                                    <span v-if="enroll.adminMemo" class="text-[#F44336] whitespace-nowrap mr-4">{{ enroll.adminMemo }}</span>
                                    <span v-if="enroll.userMemo" class="text-[#2196F3] whitespace-nowrap mr-4">{{ enroll.userMemo }}</span>
                                    <span v-if="enroll.refundType" class="text-black whitespace-nowrap">{{ enroll.refund_type }}</span>
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


    <!-- 필터 모달 -->
    <transition name="slide-fade">
        <div
            v-if="filterModalOpen"
            class="fixed inset-0 top-[60px] bg-white z-[900] overflow-y-auto"
        >
            <div class="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 class="font-medium paperlogy text-[26px]">검색 조건 설정</h2>
            <button @click="closeModal">
                <img src="../../assets/img/close.png" alt="닫기" class="w-5 h-5" />
            </button>
            </div>

            <div class="p-8">
                <div class="flex flex-col gap-2">
                    <DropYear v-model="filters.year" class="w-full"/>
                    <DropSemester v-model="filters.semester" class="w-full"/>
                    <DropPosition v-model="filters.position" class="w-full"/>
                    <DropCourse v-model="filters.course" :options="courseOptions" class="w-full" />
                </div>

                <!-- 버튼 그룹 -->
                <div class="flex gap-4 mt-6">
                    <button @click="cancelFilters" class="flex-1 py-3 bg-[#F5F5F5] border border-[#DBDEE3] font-medium rounded-md">
                    취소
                    </button>
                    <button @click="applyFilters" class="flex-1 py-3 bg-[#2B5BBB] hover:bg-[#1d4691] text-white font-semibold rounded-md">
                    적용
                    </button>
                </div>
            </div>
        </div>
    </transition>
    <Pagenation
        :currentPage="currentPage"
        :totalPages="totalPages"
        @update:currentPage="page => currentPage = page"
    />
        
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
    import { useToast } from 'vue-toastification'; 

    const toast = useToast();

    const selectedYear = ref('');
    const selectedSemester = ref('');
    const selectedCourse = ref('');
    const selectedPayStatus = ref('')
    const searchQuery = ref('')

    const currentPage = ref(1);
    const totalPages = ref(1);

    // ✅ 원본 데이터
    const rawData = ref({ // rawData도 반응형으로 변경하여 API 응답에 따라 업데이트되도록
        all: 0, 입금: 0, 미입금: 0, 수강대기: 0, 수강확정: 0, 수강취소: 0, 수강연기: 0, 환불: 0
    });

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

    // ✅ 활성 탭 상태
    const activeTab = ref('all')

    // ✅ count 포함된 탭 목록 계산
    const tabsWithCount = computed(() =>
            tabList.map(tab => ({
            ...tab,
            count: rawData.value[tab.id] || 0  // .value 붙여야 함
        }))
    )
    const paymentStatusOptions = ['선택', '대기', '확정', '취소', '연기', '연기금']; 
    // ✅ 검색기능
    function onSearch(query) {
        searchQuery.value = query; // 상태만 바꾸기
    }

    // ✅ 수강자 데이터를 저장할 ref 변수 선언
    const enrollList = ref([]);
    const isLoadingEnroll = ref(false);
    
    const token = useCookie('auth_token').value

    // ✅ 과정명 드롭다운 옵션 불러오기
    const courseOptions = ref([])
    async function fetchCourseNames() {
        const year = selectedYear.value;
        const semester = selectedSemester.value;

        // '선택'이거나 빈 문자열일 경우 API 호출하지 않고 초기화
        const invalidYearOrSemester = !year || year === '선택' || !semester || semester === '선택';

        if (invalidYearOrSemester) {
            courseOptions.value = ['선택'];
            selectedCourse.value = '선택';
            console.log('년도 또는 학기가 선택되지 않아 과정명 API 호출을 건너뜁니다.');
            return;
        }

        const params = new URLSearchParams({
            application_year: year,
            semester: semester,
        });

        const url = `http://localhost:8000/api/admin/courses?${params.toString()}`;
        console.log('과정명 API 호출 URL:', url);

        try {
            // Nuxt.js 환경이므로 $fetch 대신 useFetch를 사용할 수 있습니다.
            // 하지만 컴포저블 내부에서 $fetch를 직접 사용하는 경우도 있습니다. 여기서는 $fetch를 유지합니다.
            const responseData = await $fetch(url, { // $fetch는 auto-imported 된다고 가정
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            const rawCourses = responseData?.data || [];
            const courseNames = [...new Set(rawCourses.map(item => item.course_name))];
            console.log('불러온 과정명:', courseNames);
            
            courseOptions.value = ['선택', ...courseNames];

            // 현재 선택된 과정명이 새로운 옵션 목록에 없으면 '선택'으로 초기화
            if (!courseNames.includes(selectedCourse.value)) { // '선택' 옵션은 제외하고 비교
                selectedCourse.value = '선택';
            }
        } catch (error) {
            console.error('❌ 과정명 요청 에러 발생:', error);
            courseOptions.value = ['선택'];
            selectedCourse.value = '선택';
            toast.error('과정명을 불러오는데 실패했습니다.');
        }
    }

    watch([selectedYear, selectedSemester, activeTab], () => {
        fetchCourseNames();
    }, { immediate: true }); 


    // ✅ 수강자 데이터 불러오기
    const fetchEnrollData = async () => {
        isLoadingEnroll.value = true;
        activeTab.value = 'all';
        try {
            const requestParams = {};
            // 검색어 필터
            if (searchQuery.value) {
                requestParams['filter[search]'] = searchQuery.value;
            }

            // 년도 필터
            if (selectedYear.value && selectedYear.value !== '선택') {
                requestParams.application_year = selectedYear.value;
            }

            // 학기 필터
            if (selectedSemester.value && selectedSemester.value !== '선택') {
                requestParams.semester = selectedSemester.value;
            }

            // 과정명 필터
            if (selectedCourse.value && selectedCourse.value !== '선택') {
                requestParams.course_name = selectedCourse.value;
            }

            // 페이지네이션
            requestParams.page = currentPage.value;
            
            console.log('✅ API 요청 파라미터:', requestParams); // 디버깅을 위해 추가
            const { data, error } = await useFetch('http://localhost:8000/api/admin/enrolls', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`, // ✅ 토큰 쿠키로 인증
                    Accept: 'application/json',
                },
                params: requestParams, 
            })
            if (error.value) {
                toast.error('수강자 데이터를 불러오는데 실패했습니다.');
                enrollList.value = []; // 에러 발생 시 리스트 초기화
                totalPages.value = 1;
            } else {
                // 📦 API에서 받은 원본 데이터 로깅 (확인용)
                console.log('📦 받은 원본 데이터:', data.value);

                // data.value.data가 배열인지 확인하고 처리
                if (data.value?.data && Array.isArray(data.value.data)) {
                    // 🚀 enrollList에 데이터 할당 및 콘솔에 예쁘게 출력
                    enrollList.value = data.value.data.map(item => {
                        const mappedItem = {
                            // 회원정보
                            id: item.id,
                            userName: item.user?.name ?? '이름 없음',
                            workPlace: item.user?.workplace_name ?? '직장명 없음',
                            coursePlace: item?.course_place?? '장소 정보 없음', 
                            // 강의정보
                            courseName: item.course?.course_name ?? '강좌명 없음',
                            courseCode: item.course?.course_code ?? '코드 없음',
                            semester: item.course?.semester ?? '학기 없음',
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
                            paymentId: item.payment?.id ?? null, // 은행명
                            method: item.payment?.method ?? null, // 은행명
                            paidAt: item.payment?.paid_at ?? null, //입금날짜
                            // amount: item.payment?.amount ?? 0, // 입금금액
                            refundAmount: item.payment?.amount ?? 0, // 환불금액
                            refundType: item.payment?.refund_type ?? null, // 환불타입
                            adminMemo: item.payment?.admin_memo ?? null, // 관리자 메모
                            userMemo: item.payment?.user_memo ?? null, // 수강생 메모
                        };
                        return mappedItem;
                    });

                    if (data.value?.meta) {
                        totalPages.value = data.value.meta.last_page;
                        }
                    
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
                            console.log(`  환불날짜: ${enroll.paiddAt}`);
                            console.log(`  환불금액: ${enroll.refundAmount}`);
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
            totalPages.value = 1;
        } finally {
            isLoadingEnroll.value = false;
        }
    };

    // ✅ 탭 카운트 데이터 불러오기
    const fetchTabCountData = async () => {
        try {
            const params = {};

            if (selectedYear.value && selectedYear.value !== '선택') {
                params.application_year = selectedYear.value;
            }
            if (selectedSemester.value && selectedSemester.value !== '선택') {
                params.semester = selectedSemester.value;
            }
            if (selectedCourse.value && selectedCourse.value !== '선택') {
                params.course_name = selectedCourse.value;
            }
            if (searchQuery.value) {
                params['filter[search]'] = searchQuery.value;
            }

            const { data, error } = await useFetch('http://localhost:8000/api/admin/tab-menu', {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
                params,
            });

            if (!error.value && data.value) {
                rawData.value = { all: 0, 입금: 0, 미입금: 0, 수강대기: 0, 수강확정: 0, 수강취소: 0, 수강연기: 0, 환불: 0 };

                // all 값 넣기 (API에 total 없으면 0)
                rawData.value.all = data.value.data.paid + data.value.data.unpaid + data.value.data.wait + data.value.data.success + data.value.data.cancel + data.value.data.hold + data.value.data.refund;

                // 매칭되는 key별로 데이터 넣기 (한글 key에 맞게 매핑 필요)
                const mapping = {
                    '입금': 'paid',
                    '미입금': 'unpaid',
                    '수강대기': 'wait',
                    '수강확정': 'success',
                    '수강취소': 'cancel',
                    '수강연기': 'hold',
                    '환불': 'refund'
                };

                for (const [korKey, apiKey] of Object.entries(mapping)) {
                    if (rawData.value.hasOwnProperty(korKey) && data.value.data.hasOwnProperty(apiKey)) {
                    rawData.value[korKey] = data.value.data[apiKey];
                    }
                }
            }
        } catch (err) {
            console.error('탭 카운트 데이터 fetch 실패:', err);
        }
    };

    // ✅ 탭 필터링
    const filteredEnrollList = computed(() => filterByTab(enrollList.value, activeTab.value));

    function filterByTab(enrolls, tabId) {
        if (tabId === 'all') return enrolls;
        console.log('filterByTab called with tabId:', tabId);

        return enrolls.filter(item => {
            const status = item.paymentStatus;
            const paidAt = item.paidAt;

            switch(tabId) {
            case '입금':
                return !!paidAt;  // paidAt이 존재하면 입금
            case '미입금':
                return !paidAt;  // paidAt이 없으면 미입금
            case '수강대기':
                return status === '대기';
            case '수강확정':
                return status === '확정';
            case '수강취소':
                return status === '취소';
            case '수강연기':
                return status === '연기';
            case '환불':
                return status === '환불';
            default:
                return false;
            }
        });
    }


    // ✅ 결제 상태 업데이트 함수 (fetch API 사용) ---
    const selectedPaymentIds = computed(() =>
        enrollList.value
            .filter(enroll => selectedItems.value.includes(enroll.id))
            .map(enroll => enroll.paymentId)
            .filter(id => id !== null)
        );
    const updatePaymentStatus = async (paymentIds, payStatus) => {
        if (!payStatus) {
            toast.warning('변경할 결제 상태를 선택해주세요.');
            return false;
        }

        if (!paymentIds.length) {
            toast.warning('변경할 수강생을 한 명 이상 선택해주세요.');
            return false;
        }

        const payload = {
            pay_status: payStatus,
            ids: [paymentIds.length, ...paymentIds], // payment.id 배열만 보내기
        };

        console.log('결제 상태 업데이트 요청 페이로드:', payload);

    try {
        const response = await fetch('http://localhost:8000/api/admin/payments/posts-public', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || '네트워크 응답이 좋지 않습니다.');
        }
        await fetchEnrollData();
        toast.success('결제 상태가 성공적으로 업데이트되었습니다.');
        
        return true;
        } catch (error) {
            console.error('결제 상태 업데이트 실패:', error);
            toast.error(`결제 상태 업데이트 실패: ${error.message}`);
            return false;
        }
    };

    // enrollList에서 enroll.id로 찾는 대신 payment.id로 찾아야 함
    const updateIndividualPaymentStatus = async (paymentId, newStatus) => {
        const enrollIndex = enrollList.value.findIndex(enroll => enroll.paymentId === paymentId);
        if (enrollIndex === -1) return;

        const oldStatus = enrollList.value[enrollIndex].paymentStatus;
        enrollList.value[enrollIndex].paymentStatus = newStatus;

        const success = await updatePaymentStatus([paymentId], newStatus);
        if (!success) {
            enrollList.value[enrollIndex].payment.pay_status = oldStatus;
        }
    };

    // 상단 일괄 적용 버튼 클릭 시
    const onUpdateApply = async () => {
        const success = await updatePaymentStatus(selectedPaymentIds.value, selectedPayStatus.value);
        if (success) {
            selectedItems.value = [];
            selectedPayStatus.value = '';
        }
    };


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

    // ✅ 필터
    const filterModalOpen = ref(false)

    // 현재 선택 중인 필터 값
    const filters = reactive({
        year: '',
        semester: '',
        position: '',
        course: ''
    })

    // 적용된 필터 값 (화면에 보여질 값)
    const appliedFilters = reactive({})

    // 모달 열기/닫기
    const openFilterModal = () => {
        filterModalOpen.value = true
    }
    const closeFilterModal = () => {
        filterModalOpen.value = false
    }

    // 필터 적용
    const applyFilters = () => {
        Object.keys(filters).forEach((key) => {
            if (filters[key] !== '' && filters[key] !== '선택') {
                appliedFilters[key] = filters[key]
            } else {
                delete appliedFilters[key]
            }
        })
        closeFilterModal();
        fetchTrainings();
    }

    // 필터 취소 (filters 초기화)
    const cancelFilters = () => {
        Object.keys(filters).forEach((key) => {
            filters[key] = ''
        })
        closeFilterModal();
        fetchTrainings();
    }

    // ✕ 클릭 시 필터 삭제
    const removeFilter = (key) => {
        delete appliedFilters[key]
        filters[key] = ''
        fetchTrainings();
    }

    // filters -> 드롭다운
    watch(() => filters.year, (val) => {
        if (selectedYear.value !== val) selectedYear.value = val;
    });
    watch(() => filters.semester, (val) => {
        if (selectedSemester.value !== val) selectedSemester.value = val;
    });
    watch(() => filters.course, (val) => {
        if (selectedCourse.value !== val) selectedCourse.value = val;
    });

    // 드롭다운 -> filters
    watch([selectedYear, selectedSemester, selectedCourse], ([newYear, newSemester, newCourse]) => {
        // 필터 객체 업데이트
        filters.year = newYear === '선택' ? null : newYear;
        filters.semester = newSemester === '선택' ? null : newSemester;
        filters.course = newCourse === '선택' ? null : newCourse;

        // appliedFilters를 즉시 업데이트
        Object.keys(filters).forEach((key) => {
            if (filters[key] !== null && filters[key] !== '') {
                appliedFilters[key] = filters[key];
            } else {
                delete appliedFilters[key];
            }
        });

    });



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

    // 수정 모달을 여는 함수
    const openEditModal = (enrollItem) => {
        selectedEnrollForEdit.value = { ...enrollItem }; // 원본 데이터 변경 방지를 위해 깊은 복사
        showEditModal.value = true;
    };

    // 수정 모달에서 '저장' 버튼을 눌렀을 때 호출될 함수
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

    // ✅ 테이블 홀짝
    const getRowClass = (index, enroll, isSecondRow = false) => {
        // 배경색은 이제 여기서 직접 반환하지 않고, getRowBgStyle()에서 처리합니다.
        
        if (isSecondRow) {
            return ['h-[50px] border-b w-[100%] border-gray-500'];
        } else {
            const borderClass = (enroll.adminMemo || enroll.userMemo || enroll.refundType)
                ? 'border-dashed border-gray-300'
                : 'border-gray-500';

            return ['border-b w-[100%]', borderClass];
        }
    };

    const getRowBgStyle = (index) => {
        const bgColor = index % 2 === 0 ? '#FEFEFE' : '#F8F8F8';
        return { backgroundColor: bgColor };
    };
    const pageTitle = useState('pageTitle')


    watch([searchQuery, selectedYear, selectedSemester, selectedCourse, currentPage], async () => {
        activeTab.value = 'all';
        await fetchEnrollData();
    });

    watch(activeTab, async (newTab, oldTab) => {
        console.log('탭 변경:', oldTab, '→', newTab);
        selectedYear.value = '';
        selectedSemester.value = '';
        selectedCourse.value = null;
        currentPage.value = 1;
    });
    
    onMounted(() => {
        pageTitle.value = '수강자 입금관리'
        fetchEnrollData()
        fetchTabCountData()
    })




</script>


<style scoped>

tbody.payTable tr:nth-child(odd) {
    background-color: unset !important;
}
tbody.payTable tr:nth-child(even) {
    background-color: unset !important;
}

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