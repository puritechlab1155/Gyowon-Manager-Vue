<template>
    <div class="pt-5 pb-5 max-lg:flex max-lg:flex-col-reverse">
        <div class="w-full flex items-center justify-between max-lg:mt-[20px] max-2xl:items-stretch max-2xl:gap-5 max-lg:flex-col-reverse">
            <StatisticTab v-model:selected="params.status" />
            <div id="selectedFilters" class="flex flex-wrap gap-2 mt-2 block lg:hidden"></div>
            <div class="right-content flex justify-end text-lg max-lg:space-x-0 max-2xl:space-x-1 space-x-2 max-lg:justify-between max-lg:w-full">
                <div class="flex justify-end space-x-2 max-2xl:space-x-1 max-lg:hidden">
                    <DropYear v-model="selectedYear"/>
                    <DropSemester v-model="selectedSemester"/>
                </div>
            </div>            
        </div>
    </div>
    <div class="w-full">
        <div class="overflow-x-auto">
            <div class="min-w-[1400px]">
                <StatisticTable
                  :data="safeData"
                  :table-id="'main-stat-table'"
                  :header-id="'main-stat-header'"
                 />
            </div>
        </div>
    </div>
</template>

<script setup>
/**
 * == 페이지 설정 ==
 * 로그인 체크 - 미인증 시 로그인 페이지로 이동
 */
definePageMeta({ middleware: 'auth' });
/**
 * == 환경 설정 ==
 * 백엔드 API URL 및 환경별 설정값 가져오기
 * API 요청용 인증 토큰
 */
const config = useRuntimeConfig() 
const route = useRoute()
const token = useCookie('auth_token').value

/**
 * == 유틸리티 함수 ==
 * 현재 년도 반환 (예: 2025), useInitialParam에서 사용
 * 현재 월 기준 학기 판단 (1-2월: 동계, 3-6월: 1학기, 7-8월: 하계, 9-12월: 2학기), useInitialParam에서 사용 
 */
const getYear = () => new Date().getFullYear(); 
const getSemester = () => {
  const month = new Date().getMonth() + 1
  if (month <= 2) return '동계'
  if (month <= 6) return '1학기'
  if (month <= 8) return '하계'
  return '2학기'
}

/**
 *  초기 파라미터 생성 함수
 * @returns {Object} 초기 검색 조건
 */
const useInitialParams = () => ({
  application_year: route.query.application_year || getYear(),
  semester: route.query.semester || getSemester(),
  status: route.query.status || ''
})

// 반응형 파라미터 참조
const params = ref(useInitialParams())

// 관리자 통계 API 데이터 조회 (인증 토큰 Bearer Token 필요)
const { data, error, pending } = await useFetch('/api/admin/statistic', {
    baseURL: config.public.backendUrl,
    query: params,
    onRequest({ options }) { options.headers.set('Authorization', `Bearer ${token}`)},
    transform: (response) => { 
        if (response && response.data && Array.isArray(response.data)) { return response.data }
        return []
    },
    onResponseError({ response }) {
    console.error('Response error:', response.status)
    }
})

// computed으로 사용한 안전한 데이터 접근
const safeData = computed(() => {
    if (!data.value) return []
    if (Array.isArray(data.value)) return data.value
    return []
})

// 파라미터 기본값 보장 (빈 값일 경우 현재 년도/학기로 복원)
watchEffect(() => {
  if (!params.value.application_year) {
    params.value.application_year = getYear()
  }
  if (!params.value.semester) {
    params.value.semester = getSemester()
  }
})
</script>