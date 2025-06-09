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
                    <DropCourse v-model="selectedCourse"/>
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
    import DropEduPlace from '~/components/Drop/EduPlace.vue'
    import DropStatus from '~/components/Drop/Status.vue'
    import BtnCreate from '../../../components/Btn/Create.vue';
    import BtnUpdate from '../../../components/Btn/Update.vue'

    import { ref, onMounted, computed } from 'vue'
    import { useRouter } from 'vue-router';
    import { useCheckboxGroup } from '../../../composables/useCheckboxGroup'
    import CheckboxAll from '~/components/Checkbox/All.vue'


    const selectedYear = ref('')
    const selectedSemester = ref('')
    const selectedPosition = ref('')
    const selectedCourse = ref('')
    const selectedEduPlace = ref('')
    const selectedStatus = ref('')

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
    //     support: 0
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
    //     support: 50000
    // },
    // // ... 더 추가 가능
    // ])

    const tabs = [
        { id: 'academy', label: '연수원' },
        { id: 'research', label: '연구회' }
    ]

    const activeTab = ref('academy');
    const trainingList = ref([]);
    const searchQuery = ref('');
    const selectedItems = ref([]);

    const token = useCookie('auth_token').value;

    async function fetchTrainings() {
    const { data, error } = await useFetch(`http://localhost:8000/api/admin/courses`, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
        transform: (response) => {
        // 실제 강의 배열은 response.data에 있음
        const courses = response.data;

        if (courses.some(course => course.range === '연구회')) {
            activeTab.value = 'research';
        } else {
            activeTab.value = 'academy';
        }

        return courses.map(course => ({
            number: course.course_code || '-',             // course_code
            title: course.course_name || '-',               // course_name
            job: course.job_classification || '-',          // job_classification
            subject: course.division || '-',                 // division
            date: course.course_start 
            ? course.course_start.substring(2, 10).replace(/-/g, '.') 
            : '-',                                        // course_start
            time: course.time || '00:00:00',                 // time
            semester: course.semester || '-',                // semester
            startDate: course.course_start || '-',           // course_start
            endDate: course.course_end || '-',                // course_end
            day: course.day_of_week || '-',                   // day_of_week
            round: course.time || '0차',                      // time (원하시면 다른 필드로 변경 가능)
            points: course.grade || 0,                         // grade
            hours: course.hour || 0,                           // hour
            location: course.course_place ? course.course_place.join(', ') : '-',  // course_place (배열)
            fee: course.tuition || 0,                          // tuition
            support: course.application_fee || 0,             // application_fee
            range: course.range || '-',              
        }));
        }
    });

    if (error.value) {
        console.error('Failed to fetch trainings:', error.value);
        return;
    }

    trainingList.value = data.value || [];
    }

    const filteredTrainingList = computed(() => {
    // 1) 탭 필터
    let filtered = trainingList.value.filter(item => {
        if (activeTab.value === 'academy') return item.range === '연수ㅋ원';
        if (activeTab.value === 'research') return item.range === '연구회';
        return true;
    });

    // 2) 검색어 필터
    if (searchQuery.value) {
        filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    }

    return filtered;
    });

    function selectTab(tabId) {
        activeTab.value = tabId;
        selectedItems.value = [];
    }

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
