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
        </div>
    </div>
    <UserTable :data="userData" :id="tableId" :headerId="tableHeaderId" @name-clicked="onNameClicked"/>
    <UserModal v-if="showModal" :user="selectedUser" @close="closeModal" />
    <Pagination v-model:currentPage="currentPage"
                :totalPages="totalPages"/>
</template>

<script setup>
    definePageMeta({ middleware: 'auth' });
    
    import { ref, computed, watch, onMounted, nextTick } from 'vue'
    import { useState } from '#imports'
    import { useRouter } from 'vue-router';

    import UserTab from '../../components/User/Tab.vue'
    import UserTable from '../../components/User/Table.vue'
    import Pagination from '../../components/Pagenation.vue'
    import BtnExcel from '../../components/Btn/Excel.vue';
    import BtnCreate from '../../components/Btn/Create.vue';
    import SearchBar from '~/components/SearchBar.vue'
    import UserModal from '../../components/User/Modal.vue'


    // const data = ref([])
    // ✅ 사용자 데이터 (type: '교원' or '일반' 으로 구분)
    // const data = ref([
    //     {
    //         id: 18125,
    //         userId: 'wining',
    //         name: '백승수',
    //         type: '교원',
    //         gender: '남',
    //         birthDate: '1987-05-16',
    //         workArea: '서울',
    //         educationOffice: '강동송파교육지원청',
    //         workplace: '안양부흥중',
    //         establishmentType: '공립',
    //         position: '교사',
    //         major: '체육',
    //         contact: '01075757575',
    //         email: 'Seong@naver.com',
    //         address: '서울시 동작구 00로 00',
    //     },{
    //         id: 18124,
    //         userId: 'mat01',
    //         name: '류성남',
    //         type: '교원',
    //         gender: '남',
    //         birthDate: '1986-05-15',
    //         workArea: '서울',
    //         educationOffice: '본청교육지원청',
    //         workplace: '서울정민학교',
    //         establishmentType: '공립',
    //         position: '퇴직',
    //         major: '지리',
    //         contact: '01075757575',
    //         email: 'Ryu@naver.com',
    //         address: '서울시 강남구 00로 00',
    //     },
    //     {
    //         id: 18121,
    //         userId: 'mat01',
    //         name: '윤소리',
    //         type: '교원',
    //         gender: '여',
    //         birthDate: '1977-05-15',
    //         workArea: '서울',
    //         educationOffice: '광주하남교육지원청',
    //         workplace: '번천초',
    //         establishmentType: '공립',
    //         position: '교사',
    //         major: '특수',
    //         contact: '01075757575',
    //         email: 'sori@naver.com',
    //         address: '서울시 동작구 00로 00',
    //     },{
    //         id: 18120,
    //         userId: 'hong hong',
    //         name: '정솔비',
    //         type: '교원',
    //         gender: '남',
    //         birthDate: '1984-06-28',
    //         workArea: '서울',
    //         educationOffice: '가평교육지원청',
    //         workplace: '다산가람초',
    //         establishmentType: '공립',
    //         position: '기간제',
    //         major: '영양',
    //         contact: '01066542154',
    //         email: 'solsol@naver.com',
    //         address: '서울시 광진구 00로 00',
    //     },
    //     {
    //         id: 18115,
    //         userId: 'mizsong922',
    //         name: '김혜경',
    //         type: '교원',
    //         gender: '여',
    //         birthDate: '1954-12-05',
    //         workArea: '서울',
    //         educationOffice: '강서양천교육지원청',
    //         workplace: '성동글로벌경영고',
    //         establishmentType: '공립',
    //         position: '교육공무직',
    //         major: '교무행정지원사',
    //         contact: '01045854512',
    //         email: 'kim@naver.com',
    //         address: '서울시 동작구 00로 00',
    //     },
    //     {
    //         id: 18114,
    //         userId: 'sol10004ok',
    //         name: '우희은',
    //         type: '교원',
    //         gender: '여',
    //         birthDate: '1990-05-10',
    //         workArea: '경기',
    //         educationOffice: '구리남양주교육지원청',
    //         workplace: '신화초',
    //         establishmentType: '공립',
    //         position: '교사',
    //         major: '도덕윤리',
    //         contact: '01066542154',
    //         email: 'Uo@naver.com',
    //         address: '서울시 광진구 00로 00',
    //     },
    //     {
    //         id: 18106,
    //         userId: 'ilovesohi',
    //         name: '김은정',
    //         type: '교원',
    //         gender: '여',
    //         birthDate: '1968-01-26',
    //         workArea: '서울',
    //         educationOffice: '가평교육지원청',
    //         workplace: '고은초',
    //         establishmentType: '사립',
    //         position: '교원',
    //         major: '정보컴퓨터',
    //         contact: '01012345567',
    //         email: 'LoLo@hanmail.net',
    //         address: '서울시 동작구 00로 00',
    //     },
    //     {
    //         id: 236,
    //         userId: 'spssspss',
    //         name: '유지원',
    //         type: '일반',
    //         gender: '남',
    //         birthDate: '1988-06-26',
    //         workArea: '서울',
    //         educationOffice: '-',
    //         workplace: '삼림기업',
    //         establishmentType: '-',
    //         position: '-',
    //         major: '-',
    //         contact: '01057527848',
    //         email: 'JJiwon@hanmail.net',
    //         address: '서울시 강남구 00로 00',
    //     },
    //     {
    //         id: 237,
    //         userId: 'bumbum',
    //         name: '김범수',
    //         type: '일반',
    //         gender: '남',
    //         birthDate: '1988-06-26',
    //         workArea: '경기',
    //         educationOffice: '-',
    //         workplace: '도산물류',
    //         establishmentType: '-',
    //         position: '-',
    //         major: '-',
    //         contact: '01057527848',
    //         email: 'bumbum',            
    //         address: '서울시 광진구 00로 00',
    //     },
    //     {
    //         id: 238,
    //         userId: 'jjone',
    //         name: '김진철',
    //         type: '일반',
    //         gender: '남',
    //         birthDate: '1988-06-26',
    //         workArea: '서울',
    //         educationOffice: '-',
    //         workplace: '방화사회복지관',
    //         establishmentType: '-',
    //         position: '-',
    //         major: '-',
    //         contact: '01057527848',
    //         email: 'Jinjin@gmail.com',
    //         address: '서울시 강남구 00로 00',
    //     },
    //     {
    //         id: 235,
    //         userId: 'jane0304',
    //         name: '황민경',
    //         type: '일반',
    //         gender: '여',
    //         birthDate: '1974-10-26',
    //         workArea: '전북',
    //         educationOffice: '-',
    //         workplace: '삼성화재',
    //         establishmentType: '-',
    //         position: '-',
    //         major: '-',
    //         contact: '01057527848',
    //         email: 'Hwang@gmail.com',
    //         address: '서울시 강남구 00로 00',
    //     },{
    //         id: 231,
    //         userId: 'jane0304s',
    //         name: '김광오',
    //         type: '일반',
    //         gender: '남',
    //         birthDate: '1989-02-05',
    //         workArea: '인천',
    //         educationOffice: '-',
    //         workplace: '연수원',
    //         establishmentType: '-',
    //         position: '-',
    //         major: '-',
    //         contact: '010145527848',
    //         email: 'Gwang@gmail.com',
    //         address: '서울시 광진구 00로 00',
    //     }
    //     // ... 더 추가 가능
    // ])


    // ✅ 데이터 변수
    const userData = ref([])            // 현재 페이지 데이터
    const totalItems = ref(0)           // 서버에서 받은 전체 사용자 수
    const itemsPerPage = ref(15)        // 한 페이지 당 아이템 수 (서버 기준)

    // ✅ 상태 변수들
    const selectedTab = ref('tab1')     // 탭 (전체, 교원, 일반)
    const searchQuery = ref('')          // 검색어
    const currentPage = ref(1)          // 현재 페이지
    const selectedUser = ref(null) 
    const showModal = ref(false)      

    // ✅ 탭 정보
    const tabs = [
        { id: 'tab1', label: '전체', off: null },
        { id: 'tab2', label: '교원', office: 2 },
        { id: 'tab3', label: '일반', office: 1 }
    ]

    // ✅  토큰 쿠키 가져오기 (Nuxt.js 등 환경 가정)
    const token = useCookie('auth_token').value


    // ✅ API 호출 함수 - 탭, 검색어, 페이지를 쿼리로 전달
    const fetchUserData = async () => {
        // 탭에 따른 office 파라미터
        const office = tabs.find(tab => tab.id === selectedTab.value)?.office
        
        // 쿼리 파라미터 구성
        const params = new URLSearchParams()
        params.append('page', currentPage.value)
        if (office !== null) {
            params.append('office', office)
        }
        if (searchQuery.value.trim() !== '') {
            params.append('filter[search]', searchQuery.value.trim())
        }

        const url = `http://localhost:8000/api/admin/users?${params.toString()}`

        try {
            const { data, error } = await useFetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                // 서버 응답에 맞춰서 data 변환
                transform: (response) => {
                    totalItems.value = response.meta?.total || 0
                    itemsPerPage.value = response.meta?.per_page || 15

                    const sortedData = response.data.sort((a, b) => b.id - a.id)
                    const startNumber = totalItems.value - (currentPage.value - 1) * itemsPerPage.value
                    
                    // 사용자 데이터 가공
                    return sortedData.map((user, index) => ({
                        id: user.id,
                        number: startNumber - index,
                        userId: user.username,
                        name: user.name,
                        type: Number(user.office_id) === 2 ? '교원' : '일반',
                        gender: user.gender,
                        birthDate: formatBirth(user.birth),
                        workArea: user.work_state || '-',
                        educationOffice: user.office?.office_name || '-', 
                        workplace: user.workplace_name || '-',
                        establishmentType: user.establishment_type || '-',
                        position: user.job_position || '-',
                        major: user.major_subject || '-',
                        contact: user.phone,
                        email: user.email,
                        address: `${user.address ?? ''} ${user.address_detail ?? ''}`.trim(),
                    }))
                }
            })

            if (error.value) {
                console.error('❌ API 호출 실패:', error.value)
                userData.value = []
                totalItems.value = 0
            } else {
                userData.value = data.value || []
                console.log('✅ API 응답:', data.value)
            }
        } catch (e) {
            console.error('❌ API 호출 중 예외:', e)
            userData.value = []
            totalItems.value = 0
        }
    }


    //✅ 생일 수정
    const formatBirth = (birth) => {
        if (!birth || birth.length !== 8) return birth
        return `${birth.slice(0, 4)}-${birth.slice(4, 6)}-${birth.slice(6)}`
    }
    
    // ✅ 총 페이지 계산 (서버 totalItems, itemsPerPage 기준)
        const totalPages = computed(() => {
        return Math.ceil(totalItems.value / itemsPerPage.value)
    })



    // ✅ 검색 함수
    function onSearch(value) {
        searchQuery.value = value
        currentPage.value = 1
    }

    // ✅ 탭 클릭 시 (탭 변경 시 현재 페이지 1로 초기화)
    function onTabChange(tabId) {
        selectedTab.value = tabId
        currentPage.value = 1
    }

    // ✅ 페이지 변경 함수
    function onPageChange(page) {
        if (page >= 1 && page <= totalPages.value) {
            currentPage.value = page
        }
    }

    // ✅ 페이지 타이틀 설정
    const pageTitle = useState('pageTitle')
        onMounted(async () => {
            pageTitle.value = '회원관리'
            fetchUserData();
        
            await nextTick()

        // ✅ API 호출 트리거 : selectedTab, searchQuery, currentPage 변경 시 호출
        watch([selectedTab, searchQuery, currentPage], () => {
            fetchUserData()
        }, { immediate: true })

    })

    // ✅ 회원등록 버튼 이동
    const router = useRouter();
    function goToUserCreate() {
        router.push('/user/create');
    }

    //✅ 엑셀 프린트를 위한 테이블 전달
    const tableId = 'targetTable';
    const tableHeaderId = 'targetTableHeader';
    const fileName = computed(() => {
        // selectedTab.value에 맞는 label 찾기
        const tabLabel = tabs.find(tab => tab.id === selectedTab.value)?.label || ''
        return `[${tabLabel}] 회원정보엑셀`
    })

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