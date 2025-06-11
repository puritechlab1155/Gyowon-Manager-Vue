<template>
    <div class="pt-5 pb-5 max-lg:flex max-lg:flex-col-reverse">
        <div class="top w-full flex items-center justify-between max-lg:mt-[15px]  max-2xl:flex-col max-2xl:items-start max-2xl:gap-2 max-lg:flex-col-reverse">
            <!-- left-content -->
            <TrainingTab :tabs="tabs" 
                        :selectedTab="activeTab"
                        @update:selectedTab="changeTab"/>
            <div v-if="activeTab === 'academy'"></div>
            <div v-else-if="activeTab === 'research'"></div>
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
                    <DropPosition v-model="selectedPosition"/>
                    <DropCourse v-model="selectedCourse" :options="courseOptions"/>
                </div>
                <div
                    class=" flex justify-between items-center max-lg:grid max-lg:grid-cols-5 max-lg:gap-2 max-lg:w-full">
                    <div class="max-lg:col-span-4 w-full">
                        <SearchBar placeholder="과정명을 입력하세요." @search="onSearch"/>
                    </div>
                    <div class="filter hidden max-lg:block">
                        <button @click="openFilterModal"
                            class="text-[#202020] flex justify-between items-center px-1 py-3 max-sm:py-2 w-full rounded-md bg-[#ECECEC]">
                            <div class="w-14 text-center min-w-[30px]">필터</div>
                            <img class="w-8 h-6" src="../../../assets/img/filter.png" alt="필터 아이콘" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-between mt-5 max-sm:mt-0 max-sm:flex-col-reverse max-sm:gap-3 ">
            <!-- left-content -->
            <div class="left-content flex items-center justify-between max-sm:justify-start gap-2">
            <!-- <button id="selectAllBtn" class="left-content flex items-center justify-center gap-2 pl-5 pr-5 rounded-lg focus:outline-none whitespace-nowrap"> -->
            <CheckboxAll
                :modelValue="isAllSelected"
                @update:modelValue="toggleSelectAll"
            />         
            <DropStatus v-model="selectedStatus" height="50px" width="120px"/>
            <BtnUpdate @click="onApply" />
            </div>
            <!-- right-content (탭들) -->
            <div class="right-content flex justify-end max-sm:justify-start">
                <BtnCreate class="btn" @click="goToTrainingCreate">연수 등록하기</BtnCreate>
            </div>
        </div>
    </div>
    <!-- <p class="mt-4 text-gray-700">선택된 년도: {{ selectedYear }}</p>
    <p class="mt-4 text-gray-700">선택된 학기: {{ selectedSemester }}</p>
    <p class="mt-4 text-gray-700">선택된 직무: {{ selectedPosition }}</p>
    <p class="mt-4 text-gray-700">선택된 과정명: {{ selectedCourse }}</p>
    <p class="mt-4 text-gray-700">선택된 교육장소: {{ selectedEduPlace }}</p> -->
    <div class="list-wrap w-full flex flex-col gap-10 overflow-x-auto">
        <TrainingCard
            v-for="item in trainingList"
            :key="item.id"
            :data="item"
            :selectedItems="selectedTrainingItems"
            :toggleItem="toggleTrainingItem"
            @deleted="handleDeleted"  
            :opening-text="item.openingText" 
            @update-opening="updateOpeningStatus"
        />
    </div>

    <Pagenation
        :currentPage="currentPage"
        :totalPages="totalPages"
        @update:currentPage="page => currentPage = page"
    />

    <!-- 필터 모달 -->
    <transition name="slide-fade">
        <div
            v-if="filterModalOpen"
            class="fixed inset-0 top-[60px] bg-white z-[900] overflow-y-auto"
        >
            <div class="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 class="font-medium paperlogy text-[26px]">검색 조건 설정</h2>
            <button @click="closeModal">
                <img src="../../../assets/img/close.png" alt="닫기" class="w-5 h-5" />
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
</template>


<script setup>
    import { useState } from '#app'
    import TrainingTab from '../../../components/Training/Tab.vue'
    import SearchBar from '~/components/SearchBar.vue'
    import DropYear from '~/components/Drop/Year.vue'
    import DropSemester from '~/components/Drop/Semester.vue'
    import DropPosition from '~/components/Drop/Position.vue'
    import DropCourse from '~/components/Drop/Course.vue'
    import DropStatus from '~/components/Drop/Status.vue'
    import BtnCreate from '../../../components/Btn/Create.vue';
    import BtnUpdate from '../../../components/Btn/Update.vue'

    import { ref, onMounted, computed } from 'vue'
    import { useRouter } from 'vue-router';
    import { useCheckboxGroup } from '../../../composables/useCheckboxGroup'
    import CheckboxAll from '~/components/Checkbox/All.vue'
    import { useToast } from 'vue-toastification'  

    const toast = useToast()

    const trainingList = ref([]);
    const searchQuery = ref('');
    const selectedItems = ref([]);
    const isLoading = ref(false); 

    const selectedYear = ref('');
    const selectedSemester = ref('');
    const selectedPosition = ref('');
    const selectedCourse = ref('');
    const selectedStatus = ref('')
    const statusToOpening = {
            '접수중': 1,
            '접수마감': 0,
            '과정종료': null,
        }

    const courseOptions = ref([])

    const currentPage = ref(1);
    const totalPages = ref(1);
    const perPage = 15; 

    const activeTab = ref('academy');
    const tabs = [
        { id: 'academy', label: '연수원' },
        { id: 'research', label: '연구회' }
    ]
    function changeTab(tabId) {
        console.log('changeTab 호출됨, 클릭된 tabId:', tabId);
        if (activeTab.value !== tabId) { 
            activeTab.value = tabId;
            console.log('탭 변경됨:', activeTab.value);
        }
    }
    const jobMap = {
        '서울': '서울직무',
        '경기': '경기직무',
        '자율': '자율',
    };

    function onSearch(query) {
        searchQuery.value = query; 
    }


    // ✅ 체크박스 그룹 관리
    const filteredTrainingList = computed(() => trainingList.value)

    const {
        selectedItems: selectedTrainingItems,
        isAllSelected,
        toggleItem: toggleTrainingItem,
        toggleSelectAll,
    } = useCheckboxGroup(filteredTrainingList)

    const toggleItem = (id, checked) => {
        if (checked) {
            selectedItems.value.push(id)
        } else {
            selectedItems.value = selectedItems.value.filter(n => n !== id)
        }
    }

    // 선택된 아이템들 확인 (디버깅용)
    watch(selectedTrainingItems, (newVal) => {
        console.log('선택된 아이템들:', newVal)
    }, { deep: true })

    watch(isAllSelected, (newVal) => {
        console.log('전체선택 상태:', newVal)
    })



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


    const token = useCookie('auth_token').value;

    // ✅ 과정명 불러오기
    async function fetchCourseNames() {
        const year = selectedYear.value;
        const semester = selectedSemester.value;
        const position = selectedPosition.value;
        const tab = activeTab.value; 

        const invalid = !year || year === '선택' ||
                        !semester || semester === '선택' ||
                        !position || position === '선택';

        if (invalid) {
            courseOptions.value = ['선택'];
            selectedCourse.value = '선택';
            return;
        }
        
        const jobValue = jobMap[position] || position;
        const rangeLabel = tabs.find(t => t.id === tab)?.label || '';

        const params = new URLSearchParams({
            range: rangeLabel,    
            application_year: year,
            semester: semester,
            job_classification: jobValue, 
        });

        const url = `http://localhost:8000/api/admin/courses?${params.toString()}`;
        console.log('API 호출 URL:', url);

        try {
            const responseData = await $fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            const rawCourses = responseData?.data || []; 
            const courseNames = rawCourses.map(item => item.course_name);
            console.log('불러온 과정명:', courseNames);
            
            courseOptions.value = ['선택', ...courseNames];

            // 선택된 course가 유효한지 확인
            if (!courseOptions.value.includes(selectedCourse.value)) {
                selectedCourse.value = '선택';
            }
        } catch (error) {
            console.error('❌ 과정명 요청 에러 발생:', error);
            courseOptions.value = ['선택'];
            selectedCourse.value = '선택'; 
        }
    }

    // 년도, 학기, 직무 선택하면 fetchTrainings 호출
    watch([selectedYear, selectedSemester, selectedPosition], () => {
        fetchCourseNames();
    });

    // ✅ 연수과정 불러오기
    async function fetchTrainings() {
        isLoading.value = true;
        selectedTrainingItems.value = []; 
        
        try {
            const query = searchQuery.value.trim();
            const tab = activeTab.value === 'academy' ? '연수원' : '연구회';
            const params = new URLSearchParams();

            if (query) params.append('filter[search]', query);
            params.append('range', tab); // 항상 탭 필터 적용

            if (selectedYear.value && selectedYear.value !== '선택') {
                params.append('application_year', selectedYear.value);
            }

            if (selectedSemester.value && selectedSemester.value !== '선택') {
                params.append('semester', selectedSemester.value);
            }

            if (selectedPosition.value && selectedPosition.value !== '선택') {
                const jobValue = jobMap[selectedPosition.value] || selectedPosition.value;
                params.append('job_classification', jobValue);
            }

            if (selectedCourse.value && selectedCourse.value !== '선택') {
                params.append('course_name', selectedCourse.value);
            }

            if (selectedStatus.value && selectedStatus.value !== '선택') {
                params.append('status', selectedStatus.value);
            }

            // 페이지 번호 쿼리 추가
            params.append('page', currentPage.value);

            const url = `http://localhost:8000/api/admin/courses?${params.toString()}`;
            
            const responseData = await $fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const meta = responseData.meta; // responseData.meta에 직접 접근
            const courses = responseData.data || []; 

            if (meta && meta.last_page) {
                totalPages.value = meta.last_page;
            } else {
                totalPages.value = 1;
            }
            trainingList.value = courses.map(course => ({ 
                id: course.id,                                   // course 고유 ID  768
                userId: course.user_id,                          // user_id 1
                order: course.order,                             // order   null
                opening: course.opening || '-',
                openingText: String(course.opening) === "1" ? "접수중"
                : String(course.opening) === "0" ? "접수마감"
                : "과정종료",             // opening  "1"
                job: course.job_classification 
                ? course.job_classification.replace('직무', '').trim() 
                : '-',                                           // job_classification "서울직무"
                title: course.course_name || '-',                // course_name "행복교육을위한웰빙댄스초중급"
                difficult: course.difficult_level || '-',        // difficult_level ""
                number: course.course_code || '-',               // course_code "WZfC108"
                range: course.range || '-',                      // range (연구회/연수원) 
                subject: course.division || '-',                 // division "웰빙댄스"
                status: course.status || '-',                    // status "직무"
                semester: course.semester || '-',                // semester "동계"
                round: course.time || '0차',                      // time  "" 
                time: course.created_at                          // created_at "2015-01-12T00:00:00.000000Z"
                    ? new Date(course.created_at).toTimeString().substring(0, 8) 
                    : '00:00:00',  // HH:mm:ss 형식
                date: course.created_at
                    ? course.created_at.substring(2, 10).replace(/-/g, '.') 
                    : '-',                                        // YY.MM.DD    
                hours: course.hour || 0,                          // hour "15"
                points: course.grade || 0,                        // grade "1"
                fee: course.tuition || 0,                         // tuition "85,000"
                support: course.application_fee || 0,             // application_fee "0"
                day: course.day_of_week || '-',                    // day_of_week "해당없음"
                startDate: course.course_start || '-',             // course_start "2015-01-12"
                endDate: course.course_end || '-',                 // course_end "2015-01-12"
                postEndDate: course.course_post_end || '-',        // course_post_end "2015-01-12"
                year: course.application_year || '-',              // application_year "2015",
                content: course.content || '-',                    // content "◈ 장소: 연촌초/명원초/디자인고\\r\\n◈ 과정명: 행복교육을위한 웰빙댄스초중급   \\r\\n◈ 종목: 지터벅,  블루스\\r\\n◈ 시간: 18:00~20:50(1일5시간/토,월~금 총6일) \\r\\n◈ 준비물: 개인컵, 수건, 댄스화, 편한 의상\\r\\n◈ 대상: 웰빙초급+웰빙초중급 이수자\\r\\n◈ 수강료: 85,000원"
                location: course.course_place                      // course_place "서울디자인고, 연촌초, 명원초"
                    ? course.course_place.join(' | ') 
                    : '',            
                createdAt: course.created_at || '-',                // created_at
                updatedAt: course.updated_at || '-',                // updated_at
                postEnd: course.course_post_end 
                ? course.course_post_end.substring(2, 10).replace(/-/g, '.') 
                : '-', // course_post_end     
            }));

        } catch (error) {
            console.error('fetchTrainings 에러:', error);
            trainingList.value = [];
            totalPages.value = 1;
        } finally {
            isLoading.value = false;
        }
    }

    watch(
        [activeTab, selectedYear, selectedSemester, selectedPosition, selectedCourse, selectedStatus, searchQuery],
        () => {
            currentPage.value = 1;
            fetchTrainings();
            console.log('Watch 트리거됨: fetchTrainings 호출됨');
        },
        { immediate: true }
    );


    // 페이지네이션만 바뀔 경우: fetch만
    watch(currentPage, () => {
        fetchTrainings();
    });

    // filters -> 드롭다운
    watch(() => filters.year, (val) => {
        if (selectedYear.value !== val) selectedYear.value = val;
    });
    watch(() => filters.semester, (val) => {
        if (selectedSemester.value !== val) selectedSemester.value = val;
    });
    watch(() => filters.position, (val) => {
        if (selectedPosition.value !== val) selectedPosition.value = val;
    });
    watch(() => filters.course, (val) => {
        if (selectedCourse.value !== val) selectedCourse.value = val;
    });

    // 드롭다운 -> filters
    watch([selectedYear, selectedSemester, selectedPosition, selectedCourse], ([newYear, newSemester, newPosition, newCourse]) => {
        // 필터 객체 업데이트
        filters.year = newYear === '선택' ? null : newYear;
        filters.semester = newSemester === '선택' ? null : newSemester;
        filters.position = newPosition === '선택' ? null : newPosition;
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



    // ✅ 삭제기능
    const handleDeleted = (deletedId) => {
        trainingList.value = trainingList.value.filter(item => item.id !== deletedId)
    // 또는 전체 새로고침
    // fetchTrainings();
    }

    // ✅ 일괄적용 
    async function onApply() {
        const selectedIds = selectedTrainingItems.value;
        const openingStatus = statusToOpening[selectedStatus.value];  // 숫자형 or null
        const idsPayload = [selectedIds.length, ...selectedIds];

        console.log('보낼 데이터:', {
            opening: openingStatus,
            ids: idsPayload,
        });
        
        // 버튼 클릭 시 처리할 로직
        console.log('일괄적용 버튼 클릭됨')

        try {
            const response = await fetch('http://localhost:8000/api/admin/courses/posts-public', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    opening: openingStatus,
                    ids: idsPayload,
                }),
            });

            if (!response.ok) {
                throw new Error('서버 응답 에러');
            }

            const result = await response.json();
            console.log('서버 응답:', result);
            toast.success(`${selectedIds.length}개의 강의가 "${selectedStatus.value}" 상태로 적용되었습니다.`)
            await fetchTrainings();
            
        } catch (error) {
            console.error('fetch 에러:', error);
            toast.error(`적용 중 오류가 발생했습니다: ${error.message}`)
        }
    }

    // ✅ 드롭다운으로 과정상태변경
    async function updateOpeningStatus(id, newOpening, name, showToast = true) {
        try {
            const response = await fetch('http://localhost:8000/api/admin/courses/posts-public', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    opening: newOpening,
                    ids: [id],
                }),
            });

            if (!response.ok) {
                throw new Error('상태 변경 실패');
            }

            // 성공 시 로컬 상태 변경 반영
            const target = trainingList.value.find(item => item.id === id);
            if (target) {
                target.opening = newOpening;
                // openingText 변경도 필요하면 같이
                target.openingText =
                    newOpening === 1 ? '접수중' :
                    newOpening === 0 ? '접수마감' : '과정종료';

                if (showToast) {
                    toast.success(
                        `${name} ➡️ ${target.openingText}(으)로 변경되었습니다.`
                    );
                }
            }
        } catch (err) {
            console.error(err);
            toast.error(`상태 변경 중 오류가 발생했습니다: ${err.message}`);
        }
    }


    // ✅ 페이지 타이틀 설정
    const pageTitle = useState('pageTitle')
    pageTitle.value = '연수관리'

    // ✅ 연수등록 버튼 이동
    const router = useRouter();
    function goToTrainingCreate() {
        router.push('/Training/Manage/Create');
    }

    onMounted(() => {
        fetchTrainings();
    });

</script>


<style scoped>
    .slide-fade-enter-active,
    .slide-fade-leave-active {
        transition: all 0.3s ease;
    }
    .slide-fade-enter-from,
    .slide-fade-leave-to {
        transform: translateY(100%);
        opacity: 0;
    }
    .btn {
        padding-top: 0.75rem;
        padding-right: 1.7rem;
        padding-left: 1.7rem;
        padding-bottom: 0.6rem;
    }
    @media (max-width: 639.9px) {
        .left-content {
            justify-content: start;
        }
        .right-content {
            justify-content: start;
        }
    }
    @media (max-width: 1024px) {

    .top {
        align-items: flex-start;
        }
    }
</style>
