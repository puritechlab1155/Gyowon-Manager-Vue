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
definePageMeta({ middleware: 'auth' });
const config = useRuntimeConfig()
const getYear = () => new Date().getFullYear();
const getSemester = () => {
  const month = new Date().getMonth() + 1
  // 월 기준으로 학기 결정
  if (month <= 2) return '동계'
  if (month <= 6) return '1학기'
  if (month <= 8) return '하계'
  return '2학기'
}
const token = useCookie('auth_token').value /// 토큰 가져오기
const params = ref({ application_year: getYear(), semester: getSemester(), status: '' }) // 초기값 설정

//통계 데이터 요청
const { data, error } = await useFetch('/api/admin/statistic', {
    baseURL: config.public.backendUrl,
    query: params,
    onRequest({ options }) { options.headers.set('Authorization', `Bearer ${token}`)},
    transform: (response) => { 
        if (response && response.data && Array.isArray(response.data)) { return response.data }
        return []
    }
})

// computed를 사용한 안전한 데이터 접근
const safeData = computed(() => {
    if (!data.value) return []
    if (Array.isArray(data.value)) return data.value
    return []
})

// 에러 처리
watchEffect(() => {
  if (!params.value.application_year) {
    params.value.application_year = getYear()
  }
  if (!params.value.semester) {
    params.value.semester = getSemester()
  }
})
</script>