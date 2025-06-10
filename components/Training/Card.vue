<template>
    <div
        class="list-box flex justify-between gap-3 md:min-w-[1024apx] max-md:flex-col max-sm:p-3 bg-gray-100 p-5 bg-white rounded-xl shadow border border-[#E3E6EA]">
        <div class="w-[2%] mt-2">
        <CheckboxItem
            :checked="selectedItems.includes(data.id)"
            @change="(checked) => toggleItem(data.id, checked)"
            :label="data.title"
        />
        </div>
        <div class="w-[98%] max-sm:w-full">
            <div class="flex items-start justify-between gap-2">
                <div class="flex flex-col">
                <div class="title-box flex items-center justify-start gap-2 max-lg:gap-1 max-lg:flex-col-reverse">
                    <span class="title paperlogy training-title font-medium text-[30px] text-[#2B5BBB] text-[#292929]">
                    {{ data.title }}
                    </span>
                    <div class="flex justify-start gap-2">
                    <component :is="getSubjectBadge(data.subject)" />
                    <component :is="getJobBadge(data.job)" />
                    </div>
                </div>
                <span class="text-base text-[#A1A1A1] mt-1">{{ data.date }} ｜ {{ data.time }}</span>
                </div>

                <!-- 우측 버튼 -->
                <div class="flex items-center gap-2 max-lg:flex-col">
                    <DropStatus v-model="selectedStatus" height="45px" width="105px"/>
                    <div class="flex justify-between gap-2">
                        <BtnEdit :to="`/Training/Edit/${data.id}`" />
                        <BtnDiscard @click="openDeleteModal(data)" />
                    </div>
                </div>
            </div>

            <hr class="my-4 border-[1.5px] border-[#2B5BBB]" />

            <!-- 하단 정보 -->
            <div class="info grid max-md:grid-cols-3 grid-cols-10 gap-y-4 gap-x-4 text-base text-[#292929]">
                <div class="info-list col-span-3">
                    <InfoItem label="적용시기" :value="`${data.year} · ${data.semester}`" />
                </div>
                <div class="info-list col-span-3">
                    <InfoItem label="연수기간" :value="formattedPeriod" />
                </div>
                <div class="info-list col-span-2">
                    <InfoItem label="요일회차" :value="`${data.day} ${data.round}`" />
                </div>
                <div class="col-span-3 hidden max-md:block">
                    <hr class="border-[1px] border-[#EFEFEF]" />
                </div>
                <div class="info-list col-span-2">
                    <InfoItem label="이수학점" :value="`${data.hours}시간 ${data.points}점`" />
                </div>
                <div class="col-span-10 max-md:hidden">
                    <hr class="border-[1px] border-[#EFEFEF]" />
                </div>
                <div class="info-list col-span-3">
                    <InfoItem label="교육장소" :value="data.location" />
                </div>
                <div class="info-list col-span-3">
                    <InfoItem label="지정번호" :value="data.number" />
                </div>
                <div class="col-span-3 hidden max-md:block">
                    <hr class="border-[1px] border-[#EFEFEF]" />
                </div>
                <div class="info-list col-span-2">
                    <InfoItem label="수강료" :value="`₩ ${data.fee.toLocaleString()}`" />
                </div>
                <div class="info-list col-span-2">
                    <InfoItem label="지원금액" :value="`₩ ${data.support.toLocaleString()}`" />
                </div>
            </div>
            <!-- 토클 버튼 -->
            <div class="flex justify-end mt-2">
                <button  
                    @click="toggleDetails"
                    class="bg-[#EFEFEF] flex justify-center items-center align-middle hover:bg-[#DDDDDD] p-2.5 rounded-lg"
                    id="toggle-icon">
                    <span class="inline-block align-middle">
                        <img src="../../assets/img/down-arrow.png" alt="토글 아이콘" class="w-5 h-5" />
                    </span>
                </button>
            </div>
            <!-- 토글 콘텐츠 -->
            <div v-show="showDetails" class="pb-4">
                <span class="w-20 text-[#727272]">연수내용</span>
                <div class="mt-2 py-4 px-8 w-[96%] rounded-lg bg-[#F9F9F9] text-[18px] text-[#292929] border border-[#DBDEE3]">
                    <div v-html="parsedContent" style="line-height: 1.2;"/>
                </div>               
            </div>
        </div>
    </div>
    <!-- 삭제 모달 -->
    <ModalDeleteConfirm
        :visible="isDeleteModalVisible"
        :data="selectedTrainingItem"
        title="연수"
        @confirm="handleDelete"
        @cancel="isDeleteModalVisible = false"
    />
</template>

<script setup>
    import BandDance from '../Band/Dance.vue'
    import BandLine from '../Band/Line.vue'
    import BandPilates from '../Band/Pilates.vue'
    import BandWelbing from '../Band/Welbing.vue'

    import BandFree from '../Band/Free.vue'
    import BandSeoul from '../Band/Seoul.vue'
    import BandGyeonggi from '../Band/Gyeonggi.vue'

    import InfoItem from './InfoItem.vue'
    import CheckboxItem from '../Checkbox/Item.vue'
    import DropStatus from '../Drop/Status.vue'
    import { useToast } from 'vue-toastification'

    const toast = useToast()

    import { ref } from 'vue'

    // import CheckboxItem from '~/components/Checkbox/Item.vue'
    const props = defineProps({
        data: Object,
        selectedItems: Array,
        toggleItem: Function,
        trainingList: Array,
        openingText: String 
    })
    const emit = defineEmits(['deleted'])
    const isChecked = computed(() => {
        return props.data?.id && props.selectedItems.includes(props.data.id)
    })

    const handleCheckboxChange = (checked) => {
        props.toggleItem(props.data.id, checked)
    }

    // // ✅ 날짜수정
    function formatShortDate(dateStr) {
        if (!dateStr) return ''
        const d = new Date(dateStr)
        const yy = String(d.getFullYear()).slice(2)
        const mm = String(d.getMonth() + 1).padStart(2, '0')
        const dd = String(d.getDate()).padStart(2, '0')
        return `${yy}.${mm}.${dd}`
    }

    const formattedPeriod = computed(() => {
        if (!props.data?.startDate || !props.data?.endDate) return ''
        const start = formatShortDate(props.data.startDate)
        const end = formatShortDate(props.data.endDate)
        return `${start} ~ <br class='mob-br'> ${end}`
    })

    const selectedStatus = ref(props.openingText)

    const getSubjectBadge = (subject) => {
            switch (subject) {
            case '댄스스포츠': return BandDance
            case '라인댄스': return BandLine
            case '필라테스': return BandPilates
            case '웰빙댄스': return BandWelbing
            default: return null
        }
    }

    const getJobBadge = (job) => {
        switch (job) {
            case '자율': return BandFree
            case '서울': return BandSeoul
            case '경기': return BandGyeonggi
            default: return null
        }
    }

    // ✅ 연수내용
    const parsedContent = computed(() => {
        if (!props.data?.content) return '';

        return props.data.content
        // 1. 역슬래시 이스케이프 복원
        .replace(/\\r\\n/g, '\n')        // \r\n 복원
        .replace(/\\n/g, '\n')          // \n 복원
        .replace(/\\n/g, '') 
        .replace(/\\"/g, '"')            // \" 복원
        .replace(/\\'/g, "'")            // \' 복원
        .replace(/\\\\/g, '\\')          // \\ 복원
        .replace(/\*(.+?)\*/g, '<strong>$1</strong>') // *강조* → <strong>강조</strong> 변환
        .replace(/\r?\n/g, '</p><p>') // 줄바꿈을 </p><p>로 변환

        // 2. font-size 스타일 제거
        .replace(/font-size:\s*[^;"]+;?/gi, '')


        .trim()

        // 3. 앞뒤에 <p> 추가 (열고 닫기)
        .replace(/^/, '<p>')
        .replace(/$/, '</p>');

    });

    // ✅ 토글버튼
    const showDetails = ref(false)

    const toggleDetails = () => {
        showDetails.value = !showDetails.value
    }


    // ✅ 수정버튼 이동
    const route = useRoute()
    const trainingId = route.params.id
    console.log('연수 ID:', trainingId)


    // ✅ 삭제버튼
    const isDeleteModalVisible = ref(false)
    const selectedTrainingItem = ref(null)

    const openDeleteModal = (item) => {
        selectedTrainingItem.value = item
        isDeleteModalVisible.value = true
    }

    // 모달 열릴 때 스크롤 잠금 / 닫힐 때 해제
    watch(isDeleteModalVisible, (visible) => {
        if (visible) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
    })
    watch(() => props.openingText, (newVal) => {
        selectedStatus.value = newVal
    })

    const token = useCookie('auth_token').value;

    // ✅ 삭제기능
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/admin/courses/${selectedTrainingItem.value.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || '삭제 실패')
            }


            emit('deleted', selectedTrainingItem.value.id)
            isDeleteModalVisible.value = false
            toast.success('연수가 성공적으로 삭제되었습니다.')

        } catch (error) {
            toast.error(`삭제 중 오류가 발생했습니다: ${error.message}`)
        }
    }



    </script>

<style>
        .training-title  {
            color: #2B5BBB;
        }
        .info-list{
            display: flex;
            align-items: center;
        }
        @media (max-width: 1204px) {
            .title-box {
                align-items: start;
            }
        }
        @media (max-width: 1024px) {
            .info {
                grid-template-columns: repeat(3, 1fr);
            }
            .info-list{
                grid-column: span 1 / span 1;
                flex-direction: column;
                align-items: flex-start;
            }
            .title {
                font-size: 24px;
            }
            .text-xs {
                font-size: 16px;
            }
        }

</style>

