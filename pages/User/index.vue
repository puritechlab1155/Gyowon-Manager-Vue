<template>
    <div class="total-wrap pt-5 pb-5 w-full flex justify-between max-lg:flex-col-reverse max-lg:justify-center max-lg:items-center gap-4">
        <!-- left-content (탭들) -->
        <UserTab :tabs="tabs" v-model:selectedTab="selectedTab" />
        <!-- right-content (탭들) -->
        <div class="right-content flex justify-between text-lg gap-2 max-lg:w-full max-sm:flex-col max-md:gap-4">
            <div class="button-wrap flex justify-between space-x-1 max-sm:space-x-0 max-sm:justify-start">
                <BtnExcel :targetTableId="tableId" :filename="fileName" :headerTableId="tableHeaderId"/>
                <BtnCreate @click="goToUserCreate">회원 등록하기</BtnCreate>
            </div>
            <SearchBar :modelValue="searchQuery" @search="onSearch" />
            <!-- <div class="search-wrap flex justify-between">
                <input type="text" placeholder="성명, 연락처, 아이디, 학교명"
                    class="search-input bg-[#FEFEFE] text-[#AFAFAF] placeholder-[#AFAFAF] max-sm:placeholder:text-sm border border-[#B0B0B0]
                        focus:outline-none focus:border-[#2B5BBB] px-4 rounded-[8px] w-full max-lg:max-w-[750px] h-[50px]" />
                <button
                    class="bg-[#2B5BBB] w-16 py-2 px-3 max-sm:py-1 rounded-lg hover:bg-[#648DDF] focus:outline-none max-sm:rounded-tl-none max-sm:rounded-bl-none ">
                    <img src="../../assets/img/search.png" alt="검색 아이콘"
                        class="hidden max-sm:block h-6 w-6" />
                    <span class=" text-[#EDF3FF] max-sm:hidden">검색</span>
                </button>
            </div> -->
        </div>
    </div>
    <UserTable :data="displayedData" :id="tableId" :headerId="tableHeaderId" @name-clicked="onNameClicked"/>
    <UserModal v-if="showModal" :user="selectedUser" @close="closeModal" />
    <Pagination :currentPage="currentPage" 
                :totalPages="displayedTotalPages"
                @update:currentPage="val => currentPage = val" />
</template>

<script setup>
    import { ref, computed, watch, onMounted } from 'vue'
    import { useState } from '#imports'
    import { useRouter } from 'vue-router';

    import UserTab from '../../components/User/Tab.vue'
    import UserTable from '../../components/User/Table.vue'
    import Pagination from '../../components/Pagenation.vue'
    import BtnExcel from '../../components/Btn/Excel.vue';
    import BtnCreate from '../../components/Btn/Create.vue';
    import SearchBar from '~/components/SearchBar.vue'
    import UserModal from '../../components/User/Modal.vue'

    // ✅ 사용자 데이터 (type: '교원' or '일반' 으로 구분)
    const data = ref([
        {
            id: 18125,
            userId: 'wining',
            name: '백승수',
            type: '교원',
            gender: '남',
            birthDate: '1987-05-16',
            workArea: '서울',
            educationOffice: '강동송파교육지원청',
            workplace: '안양부흥중',
            establishmentType: '공립',
            position: '교사',
            major: '체육',
            contact: '01075757575',
            email: 'Seong@naver.com',
            address: '서울시 동작구 00로 00',
        },{
            id: 18124,
            userId: 'mat01',
            name: '류성남',
            type: '교원',
            gender: '남',
            birthDate: '1986-05-15',
            workArea: '서울',
            educationOffice: '본청교육지원청',
            workplace: '서울정민학교',
            establishmentType: '공립',
            position: '퇴직',
            major: '지리',
            contact: '01075757575',
            email: 'Ryu@naver.com',
            address: '서울시 강남구 00로 00',
        },
        {
            id: 18121,
            userId: 'mat01',
            name: '윤소리',
            type: '교원',
            gender: '여',
            birthDate: '1977-05-15',
            workArea: '서울',
            educationOffice: '광주하남교육지원청',
            workplace: '번천초',
            establishmentType: '공립',
            position: '교사',
            major: '특수',
            contact: '01075757575',
            email: 'sori@naver.com',
            address: '서울시 동작구 00로 00',
        },{
            id: 18120,
            userId: 'hong hong',
            name: '정솔비',
            type: '교원',
            gender: '남',
            birthDate: '1984-06-28',
            workArea: '서울',
            educationOffice: '가평교육지원청',
            workplace: '다산가람초',
            establishmentType: '공립',
            position: '기간제',
            major: '영양',
            contact: '01066542154',
            email: 'solsol@naver.com',
            address: '서울시 광진구 00로 00',
        },
        {
            id: 18115,
            userId: 'mizsong922',
            name: '김혜경',
            type: '교원',
            gender: '여',
            birthDate: '1954-12-05',
            workArea: '서울',
            educationOffice: '강서양천교육지원청',
            workplace: '성동글로벌경영고',
            establishmentType: '공립',
            position: '교육공무직',
            major: '교무행정지원사',
            contact: '01045854512',
            email: 'kim@naver.com',
            address: '서울시 동작구 00로 00',
        },
        {
            id: 18114,
            userId: 'sol10004ok',
            name: '우희은',
            type: '교원',
            gender: '여',
            birthDate: '1990-05-10',
            workArea: '경기',
            educationOffice: '구리남양주교육지원청',
            workplace: '신화초',
            establishmentType: '공립',
            position: '교사',
            major: '도덕윤리',
            contact: '01066542154',
            email: 'Uo@naver.com',
            address: '서울시 광진구 00로 00',
        },
        {
            id: 18106,
            userId: 'ilovesohi',
            name: '김은정',
            type: '교원',
            gender: '여',
            birthDate: '1968-01-26',
            workArea: '서울',
            educationOffice: '가평교육지원청',
            workplace: '고은초',
            establishmentType: '사립',
            position: '교원',
            major: '정보컴퓨터',
            contact: '01012345567',
            email: 'LoLo@hanmail.net',
            address: '서울시 동작구 00로 00',
        },
        {
            id: 236,
            userId: 'spssspss',
            name: '유지원',
            type: '일반',
            gender: '남',
            birthDate: '1988-06-26',
            workArea: '서울',
            educationOffice: '-',
            workplace: '삼림기업',
            establishmentType: '-',
            position: '-',
            major: '-',
            contact: '01057527848',
            email: 'JJiwon@hanmail.net',
            address: '서울시 강남구 00로 00',
        },
        {
            id: 237,
            userId: 'bumbum',
            name: '김범수',
            type: '일반',
            gender: '남',
            birthDate: '1988-06-26',
            workArea: '경기',
            educationOffice: '-',
            workplace: '도산물류',
            establishmentType: '-',
            position: '-',
            major: '-',
            contact: '01057527848',
            email: 'bumbum',            address: '서울시 광진구 00로 00',
        },
        {
            id: 238,
            userId: 'jjone',
            name: '김진철',
            type: '일반',
            gender: '남',
            birthDate: '1988-06-26',
            workArea: '서울',
            educationOffice: '-',
            workplace: '방화사회복지관',
            establishmentType: '-',
            position: '-',
            major: '-',
            contact: '01057527848',
            email: 'Jinjin@gmail.com',
            address: '서울시 강남구 00로 00',
        },
        {
            id: 235,
            userId: 'jane0304',
            name: '황민경',
            type: '일반',
            gender: '여',
            birthDate: '1974-10-26',
            workArea: '전북',
            educationOffice: '-',
            workplace: '삼성화재',
            establishmentType: '-',
            position: '-',
            major: '-',
            contact: '01057527848',
            email: 'Hwang@gmail.com',
            address: '서울시 강남구 00로 00',
        },{
            id: 231,
            userId: 'jane0304s',
            name: '김광오',
            type: '일반',
            gender: '남',
            birthDate: '1989-02-05',
            workArea: '인천',
            educationOffice: '-',
            workplace: '연수원',
            establishmentType: '-',
            position: '-',
            major: '-',
            contact: '010145527848',
            email: 'Gwang@gmail.com',
            address: '서울시 광진구 00로 00',
        }
        // ... 더 추가 가능
    ])

    //✅ 엑셀 프린트를 위한 테이블 전달
    const tableId = 'targetTable';
    const tableHeaderId = 'targetTableHeader';
    const fileName = computed(() => {
        // selectedTab.value에 맞는 label 찾기
        const tabLabel = tabs.find(tab => tab.id === selectedTab.value)?.label || ''
        return `[${tabLabel}] 회원정보엑셀`
    })

    // ✅ 탭 데이터
    const tabs = [
        { id: 'tab1', label: '전체' },
        { id: 'tab2', label: '교원' },
        { id: 'tab3', label: '일반' }
    ]

    //✅ 상태변수들
    const selectedTab = ref('tab1')
    const currentPage = ref(1)
    const itemsPerPage = 10
    const searchQuery = ref('')
    const showModal = ref(false)
    const selectedUser = ref(null)

    // ✅ 검색 함수
    function onSearch(value) {
        console.log('검색 실행:', value) // 디버깅용
        searchQuery.value = value
        currentPage.value = 1
    }
    // ✅ 회원정보 모달
    function onNameClicked(user) {
        console.log('User name clicked:', user);
        selectedUser.value = user
        showModal.value = true
        console.log('showModal:', showModal.value);
    }

    function closeModal() {
        showModal.value = false
        selectedUser.value = null
    }
    watch(showModal, (newVal) => {
        if (newVal) {
            // 모달이 열리면 body 스크롤 잠금
            document.body.style.overflow = 'hidden';
        } else {
            // 모달이 닫히면 body 스크롤 해제
            document.body.style.overflow = ''; // 또는 'auto'
        }
    });

    // 1. 탭 필터링된 데이터
    const filteredData = computed(() => {
    if (selectedTab.value === 'tab1') return data.value
    if (selectedTab.value === 'tab2') return data.value.filter(user => user.type === '교원')
    if (selectedTab.value === 'tab3') return data.value.filter(user => user.type === '일반')
    return []
    })


    // 2. 탭 필터링 + 검색 필터링
    const searchFilteredData = computed(() => {
        let baseData = filteredData.value
        
        // 검색어가 없으면 탭 필터링된 데이터 그대로 반환
        if (!searchQuery.value || searchQuery.value.trim() === '') {
            return baseData
        }

        const query = searchQuery.value.toLowerCase().trim()
        console.log('검색 필터링 실행:', query) // 디버깅용
        
        const filtered = baseData.filter(user => {
            const matchName = user.name?.toLowerCase().includes(query)
            const matchUserId = user.userId?.toLowerCase().includes(query)
            const matchContact = user.contact?.toLowerCase().includes(query)
            const matchWorkplace = user.workplace?.toLowerCase().includes(query)
            
            return matchName || matchUserId || matchContact || matchWorkplace
        })
        
        console.log('필터링 결과:', filtered.length, '개') // 디버깅용
        return filtered
    })


    // 3. 정렬 (최신순 - ID 기준 내림차순)
    const sortedData = computed(() => {
        return [...searchFilteredData.value].sort((a, b) => b.id - a.id)
    })

    // 4. 페이지네이션
    const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
        return sortedData.value.slice(start, start + itemsPerPage)
    })

    // 5. 총 페이지 수
    const totalPages = computed(() => {
        return Math.ceil(searchFilteredData.value.length / itemsPerPage)
    })

    // 6. 최종 표시할 데이터와 페이지 수 (단순화)
    const displayedData = computed(() => paginatedData.value)
    const displayedTotalPages = computed(() => totalPages.value)

    // 7. watch - 탭이나 검색어 변경시 첫 페이지로 이동
    watch([selectedTab], () => {
        currentPage.value = 1
    })

    // ✅ 페이지 타이틀 설정
    const pageTitle = useState('pageTitle')
        onMounted(() => {
            pageTitle.value = '회원관리'
    })

    // ✅ 회원등록 버튼 이동
    const router = useRouter();
    function goToUserCreate() {
        router.push('/user/create');
    }


</script>

<style scoped>
    

/* max-xl: px-5 (1.25rem = 20px) */
@media (max-width: 639.9px) {
    .button-wrap {
        justify-content: start;
        gap: 4px;
    }
    .right-content {
        gap: 10px;
    }
    .total-wrap {
        gap: 10px;
    }
}
</style>