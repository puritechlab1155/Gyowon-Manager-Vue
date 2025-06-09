<template>
    <div class="pt-5 pb-5 max-lg:flex max-lg:flex-col-reverse">
        <div class="top w-full flex items-center justify-between max-lg:mt-[15px] max-2xl:flex-col max-2xl:items-stretch max-2xl:gap-5 max-lg:flex-col-reverse">
            <!-- left-content -->
            <TrainingTab :tabs="tabs" 
                        :selectedTab="activeTab" 
                        @update:selectedTab="val => activeTab = val" />
            <div v-if="activeTab === 'academy'"></div>
            <div v-else-if="activeTab === 'research'"></div>
            <div id="selectedFilters" class="flex flex-wrap gap-2 mt-2 block lg:hidden"></div>
            
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
                        <button id="filterButton w-full max-lg:col-span-1 "
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
            v-for="item in filteredTrainingList"
            :key="item.number"
            :data="item"
            :selectedItems="selectedTrainingItems"
            :toggleItem="toggleTrainingItem"
            @deleted="handleDeleted"
        />
    </div>
    <div class="flex justify-center items-center mt-4 mt-[100px]">
        <!-- 이전 / 다음 버튼 그룹 -->
        <div class="flex items-center space-x-3 max-lg:space-x-1">
            <button
                class="px-2 py-4 max-sm:py-2 max-sm:px-2 text-[#727272] rounded-md flex items-center justify-center group">
                <svg width="12" height="20" viewbox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-[#727272] group-hover:fill-[#2B5BBB]">
                    <path d="M0.68629 9.89949L10.5858 19.799L12 18.3848L3.51471 9.8995L12 1.41421L10.5858 -6.18172e-08L0.68629 9.89949Z"/>
                    
                </svg>
                <span class="hidden lg:inline-block group-hover:text-[#2B5BBB] group-hover:font-semibold ml-2">이전</span>
            </button>

            <!-- 페이지 번호들 -->
            <div class="flex space-x-2 max-lg:space-x-2">
                <button class="w-12 h-12 max-sm:w-8 max-sm:h-8 flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF] focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    1
                </button>
                <button class="w-12 h-12 max-sm:w-8 max-sm:h-8 flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF] focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    2
                </button>
                <button class="w-12 h-12 max-sm:w-8 max-sm:h-8 flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF] focus:text-[#EDF3FF]">
                    3
                </button>
                <button class="w-12 h-12 max-sm:w-8 max-sm:h-8 flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF] focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    4
                </button>
                <button class="w-12 h-12 max-sm:w-8 max-sm:h-8 flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF] focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    5
                </button>
                <button class="w-12 h-12 max-sm:w-8 max-sm:h-8 max-lg:hidden flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF]  focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    6
                </button>
                <button class="w-12 h-12 max-sm:w-8 max-sm:h-8 max-lg:hidden flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF]  focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    7
                </button>
                <button class="w-12 h-12 max-sm:w-8 max-sm:h-8 max-lg:hidden flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF]  focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    8
                </button>
                <button class="w-12 h-12 max-sm:w-8 max-sm:h-8 max-lg:hidden flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF]  focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    9
                </button>
                <button class="w-12 h-12 max-sm:w-8 max-sm:h-8 max-lg:hidden flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF]  focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    10
                </button>
            </div>
            <!-- 다음 버튼 -->
            <button class="px-2 py-4 max-sm:py-2 max-sm:px-2 text-[#727272] rounded-md flex items-center justify-center group">
                <span class="hidden lg:inline-block group-hover:text-[#2B5BBB] group-hover:font-semibold mr-2">다음</span>
                <svg width="12" height="20" viewbox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-[#727272] group-hover:fill-[#2B5BBB]">
                    <path d="M11.3137 10.1005L1.41423 0.201019L2.07232e-05 1.61523L8.48529 10.1005L1.68643e-08 18.5858L1.41421 20L11.3137 10.1005Z"/>
                </svg>
            </button>
        </div>
    </div>
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



    // const trainingList = ref([
    // {
    //     title: '모던 초중급',
    //     job: '자율',
    //     subject: '댄스스포츠',
    //     date: '25.04.01',
    //     time: '12:12:03',
    //     semester: '2025-1학기',
    //     startDate: '2025-04-09',
    //     endDate: '2025-07-14',  
    //     day: '수요일',
    //     round: '0차',
    //     points: 0,
    //     hours: 30,
    //     location: '서울디자인고, 컨실초',
    //     number: '경기-교육-2025-216',
    //     fee: 140000,
    //     support: 0,
    //     contents: '자율 웰빙초중급 (지터벅, 블루스에 관심 있는 사람은 누구나)
    //                장소: 서울디자인고 4층 체육관
    //                시간: 2025.2.1(토) 개강 / 10 ~ 12시
    //                지터벅, 블루스
    //               준비물: 댄스화, 개인음료, 편한 복장
    //                ※ 댄스화 구매를 원하실 경우, 연수 시작 전 미리 주문해 주세요.
    //                ※ 문의: 010-6661-9191'
    // },
    // {
    //     title: '라인댄스 초급',
    //     job: '서울',
    //     subject: '라인댄스',
    //     date: '25.03.15',
    //     time: '10:00:00',
    //     semester: '2025-1학기',
    //     startDate: '2025-09-09',
    //     endDate: '2025-10-14',  
    //     day: '화요일',
    //     round: '1차',
    //     points: 1,
    //     hours: 20,
    //     location: '서울여상고',
    //     number: '서울-교육-2025-123',
    //     fee: 100000,
    //     support: 50000,
    //     contents: '자율 웰빙초중급 (지터벅, 블루스에 관심 있는 사람은 누구나)
    //                장소: 서울디자인고 4층 체육관
    //                시간: 2025.2.1(토) 개강 / 10 ~ 12시
    //                지터벅, 블루스
    //                준비물: 댄스화, 개인음료, 편한 복장
    //                ※ 댄스화 구매를 원하실 경우, 연수 시작 전 미리 주문해 주세요.
    //                ※ 문의: 010-6661-9191'
    // },
    // // ... 더 추가 가능
    // ])

    const selectedYear = ref('');
    const selectedSemester = ref('');
    const selectedPosition = ref('');
    const selectedCourse = ref('');
    const selectedStatus = ref('')

    const courseOptions = ref([]);

    const activeTab = ref('academy');
    const trainingList = ref([]);
    const searchQuery = ref('');
    const selectedItems = ref([]);
    const isLoading = ref(false); 


    const tabs = [
        { id: 'academy', label: '연수원' },
        { id: 'research', label: '연구회' }
    ]

    const token = useCookie('auth_token').value;

    async function fetchCourseNames() {
        const year = selectedYear.value;
        const semester = selectedSemester.value;
        const position = selectedPosition.value;

        const invalid = !year || year === '선택' ||
                        !semester || semester === '선택' ||
                        !position || position === '선택';

        if (invalid) {
            courseOptions.value = [];
            selectedCourse.value = '';
            await fetchTrainings(); // ⬅ 여기 추가
            return;
        }

        const params = new URLSearchParams({
            application_year: year,
            semester: semester,
            job_classification: position,
        });

        const url = `http://localhost:8000/api/admin/courses/course-names?${params.toString()}`;

        try {
            const { data, error } = await useFetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            transform: res => res.data.course_names || [], // 백엔드에서 course_names 배열을 준다고 가정
            });

            if (error.value) {
            console.error('과정명 리스트 조회 실패:', error.value);
            courseOptions.value = [];
            selectedCourse.value = '';
            return;
            }

            courseOptions.value = data.value;
            selectedCourse.value = ''; // 과정명 선택 초기화

        } catch (e) {
            console.error('fetchCourseNames 에러:', e);
            courseOptions.value = [];
            selectedCourse.value = '';
        }
    }

    const jobMap = {
        '서울': '서울직무',
        '경기': '경기직무',
        '자율': '자율',
    };

    async function fetchTrainings() {
        isLoading.value = true;
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

            const url = `http://localhost:8000/api/admin/courses?${params.toString()}`;
            
            const { data, error } = await useFetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                transform: (response) => {
                    // 실제 강의 배열은 response.data에 있음
                    const courses = response.data;

                    return courses.map(course => ({
                        id: course.id,                                   // course 고유 ID  768
                        userId: course.user_id,                          // user_id 1
                        order: course.order,                             // order   null
                        opening: course.opening || '-',                  // opening  "1"
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
                            : '-',                                           // YY.MM.DD    
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
                    }));
                }
            });

        if (error.value) {
            console.error('Failed to fetch trainings:', error.value);
            trainingList.value = [];
            return;
        }

        if (!data || !data.value) {
            console.error('data가 비어있습니다:', data);
            trainingList.value = [];
            return;
        }

        trainingList.value = data.value;

        } catch (e) {
            console.error('fetchTrainings 에러:', e);
            trainingList.value = [];
        }finally {
        isLoading.value = false;
    }
}
    function onSearch(query) {
        searchQuery.value = query; // 상태만 바꾸기
    }

    // searchQuery 또는 activeTab 바뀌면 자동으로 fetchTrainings 호출
    watch([selectedYear, selectedSemester, selectedPosition], () => {
        fetchCourseNames();
    });
    watch(
        [searchQuery, activeTab, selectedYear, selectedSemester, selectedPosition, selectedCourse, selectedStatus],
        () => {
            fetchTrainings();
        },
        { immediate: true }
    );


    
    const filteredTrainingList = computed(() => {
        // 1) 탭 필터
        let filtered = trainingList.value.filter(item => {
            if (activeTab.value === 'academy') return item.range === '연수원';
            if (activeTab.value === 'research') return item.range === '연구회';
            return true;
        });

        filtered.sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0); // 날짜가 없으면 가장 오래된 날짜로 간주
            const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
            return dateB.getTime() - dateA.getTime(); // 내림차순 정렬 (최신이 위로)
        });

        return filtered;
    });

    // ✅ 체크박스 그룹 관리
    const {
        selectedItems: selectedTrainingItems,
        isAllSelected,
        toggleItem: toggleTrainingItem,
        toggleSelectAll,
    } = useCheckboxGroup(filteredTrainingList)

    const toggleItem = (number, checked) => {
        if (checked) {
            selectedItems.value.push(number)
        } else {
            selectedItems.value = selectedItems.value.filter(n => n !== number)
        }
    }

    // 선택된 아이템들 확인 (디버깅용)
    watch(selectedTrainingItems, (newVal) => {
        console.log('선택된 아이템들:', newVal)
    }, { deep: true })

    watch(isAllSelected, (newVal) => {
        console.log('전체선택 상태:', newVal)
    })

    // ✅ 일괄적용 추후에 작업
    function onApply() {
    // 버튼 클릭 시 처리할 로직
        console.log('일괄적용 버튼 클릭됨')
    }

    // ✅ 페이지 타이틀 설정
    const pageTitle = useState('pageTitle')
    pageTitle.value = '연수관리'

    // ✅ 연수등록 버튼 이동
    const router = useRouter();
    function goToTrainingCreate() {
        router.push('/Training/Manage/Create');
    }

    // ✅ 연수 검색
    // const filteredTrainingList = computed(() => {
    //     if (!searchQuery.value) return trainingList.value
    //     return trainingList.value.filter(item =>
    //         item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    //     )
    // })
    onMounted(() => {
        fetchTrainings();
    });

</script>


<style scoped>
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
</style>
