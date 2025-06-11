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
                <span class="text-base text-[#A1A1A1] mt-1">등록: {{ data.date }} ｜ 마감: {{ data.postEnd }}</span>
                </div>

                <!-- 우측 버튼 -->
                <div class="flex items-center gap-2 max-lg:flex-col">
                    <DropStatus v-model="selectedStatus" 
                    height="45px" width="105px" 
                    @click="handleDropdownClick"  
                    @focus="handleDropdownClick"/>
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

    const isChecked = computed(() => {
        return props.data?.id && props.selectedItems.includes(props.data.id)
    })

    const handleCheckboxChange = (checked) => {
        props.toggleItem(props.data.id, checked)
    }

    // ✅ 날짜수정
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

    // ✅ 상태변경
    const emit = defineEmits(['deleted', 'update-opening'])
    const selectedStatus = ref(props.openingText)
    const statusToOpening = {
        '접수중': 1,
        '접수마감': 0,
        '과정종료': null,
    };

    let isUserInteracting = false; 

    const handleDropdownClick = () => {
        isUserInteracting = true;
    };
    
    watch(() => props.openingText, (newText) => {
        if (selectedStatus.value !== newText) {
            selectedStatus.value = newText;
        }
    }, { immediate: true }); 

    watch(selectedStatus , (newStatus, oldStatus) => {
        if (newStatus === oldStatus) {
        return;
    }

        // 2. isUserInteracting 플래그를 확인하여 사용자 조작인지 판단합니다.
        if (isUserInteracting) {
            // 사용자 직접 조작에 의한 변경이므로, emit하고 토스트를 띄웁니다.
            emit(
                'update-opening',
                props.data.id,
                statusToOpening[newStatus],
                props.data.title, // 강의명
                true // showToast를 true로 전달하여 알림을 띄웁니다.
            );
            isUserInteracting = false; 
            
        } 
    });

    
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

    // // ✅ 연수내용
    // const parsedContent = computed(() => {
    //     if (!props.data?.content) return '';

    //     return props.data.content
    //     // 1. 역슬래시 이스케이프 복원
    //     .replace(/\\r\\n/g, '\n')        // \r\n 복원
    //     .replace(/\\n/g, '\n')          // \n 복원
    //     .replace(/\\n/g, '') 
    //     .replace(/\\"/g, '"')            // \" 복원
    //     .replace(/\\'/g, "'")            // \' 복원
    //     .replace(/\\\\/g, '\\')          // \\ 복원
    //     .replace(/\*(.+?)\*/g, '<strong>$1</strong>') // *강조* → <strong>강조</strong> 변환
    //     .replace(/\r?\n/g, '</p><p>') // 줄바꿈을 </p><p>로 변환

    //     // 2. font-size 스타일 제거
    //     .replace(/font-size:\s*[^;"]+;?/gi, '')


    //     .trim()

    //     // 3. 앞뒤에 <p> 추가 (열고 닫기)
    //     .replace(/^/, '<p>')
    //     .replace(/$/, '</p>');

    // });


// ✅ 연수내용 (기존 strong 태그 보존 + * 텍스트를 strong으로 변환)
const parsedContent = computed(() => {
    if (!props.data?.content) return '';

    let contentString = props.data.content;

    console.log('=== 원본 데이터 ===');
    console.log(contentString);

    // --- 1. **핵심:** `<br />` 태그 바로 뒤에 붙은 `\r\n` 또는 `\n` 제거 ---
    // 이것이 과도한 줄 간격의 주범입니다. `\\r\\n` 형태로 문자열로 넘어온 경우를 포함합니다.
    contentString = contentString.replace(/<br\s*\/?\s*>\\r\\n/g, '<br />'); // `<br/>\r\n` -> `<br/>`
    contentString = contentString.replace(/<br\s*\/?\s*>\\n/g, '<br />');   // `<br/>\n` -> `<br/>`
    contentString = contentString.replace(/<br\s*\/?\s*>\\\\r\\\\n/g, '<br />'); // `<br/>\\r\\n` -> `<br/>`
    contentString = contentString.replace(/<br\s*\/?\s*>\\\\n/g, '<br />');   // `<br/>\\n` -> `<br/>`

    // --- 2. 일반적인 이스케이프 문자 복원 (JSON.parse가 되지 않는 경우를 대비) ---
    // `\"` -> `"`, `\'` -> `'`, `\\` -> `\`
    contentString = contentString.replace(/\\"/g, '"');
    contentString = contentString.replace(/\\'/g, "'");
    contentString = contentString.replace(/\\\\/g, '\\'); 
    
    console.log('=== 1, 2단계 이스케이프 처리 후 ===');
    console.log(contentString);

    // --- 3. HTML 엔티티 디코딩 (기존 HTML 태그 보존) ---
    // `&lt;strong&gt;` 같은 HTML 엔티티를 실제 태그로 변환합니다.
    contentString = contentString
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' '); 

    console.log('=== HTML 엔티티 디코딩 후 ===');
    console.log(contentString);

    // --- 4. **핵심:** * 사이의 텍스트를 <strong> 태그로 변환 (중복 방지 강화) ---
    // 이 정규식은 `*`로 시작하고 `*`로 끝나는 패턴을 찾되,
    // - 이미 `<strong>` 태그 내부에 있는 `*`는 건드리지 않습니다.
    // - `<`나 `>` HTML 태그 경계를 넘지 않습니다.
    // - `*` 사이에 빈 문자열이 아닌 텍스트가 있어야 합니다.
    // - `*` 문자가 3개 이상 연속되는 `***` 같은 패턴도 `<strong>`으로 감싸지 않도록 예외 처리합니다.
    // 이 로직은 HTML 태그 밖에 있는 순수 텍스트의 *강조*만 정확히 잡아서 변환합니다.
    contentString = contentString.replace(
        /(?<!<strong>)\*(?![*])((?:(?!!<)|(?!!>).)*?)(?<![*])\*(?!<\/strong>)/g, 
        '<strong>$1</strong>'
    );
    // 설명:
    // (?<!<strong>) : <strong> 태그 바로 뒤에 오는 *는 제외
    // \* : 리터럴 *
    // (?![*])      : * 문자가 2개 이상 연속되지 않는 경우 (*** 형태 방지)
    // ((?:(?!!<)|(?!!>).)*?) : <, > 문자를 포함하지 않는 어떤 문자든지, 비탐욕적 매칭
    // (?<![*])     : 텍스트의 끝이 *가 아닌 경우 (*** 형태 방지)
    // \* : 리터럴 *
    // (?!<\/strong>): </strong> 태그 바로 앞에 오는 *는 제외

    // 그래도 변환되지 않는 `*`가 있다면 (예: `* 전국 유·초·중등 교원 및 교육전문직 대상`)
    // 이 정규식은 `*`와 텍스트 사이에 공백이 있는 경우도 처리합니다.
    // 기존 HTML 태그를 손상시키지 않기 위해 <나 >가 없는 텍스트만 매칭합니다.
    contentString = contentString.replace(/\*([^<>\n]+?)\*/g, '<strong>$1</strong>');


    // `***` 같은 패턴 때문에 `<strong><strong>*</strong>` 이렇게 중첩되는 경우가 발생했다면,
    // 이중 <strong>을 단일 <strong>으로 정화하는 로직 추가 (필요 시)
    // contentString = contentString.replace(/<strong>\s*<strong>(.*?)<\/strong>\s*<\/strong>/g, '<strong>$1</strong>');
    // contentString = contentString.replace(/<strong>\s*\*(.*?)\*\s*<\/strong>/g, '<strong>$1</strong>'); // ** 댄스화 부분 처리

    console.log('=== * 변환 후 ===');
    console.log(contentString);

    // --- 5. 최종적인 실제 줄바꿈 문자 (`\r\n` 또는 `\n`)를 <br /> 태그로 변환 ---
    // 위에서 이미 <br> 태그 뒤에 오는 \r\n은 제거했으므로, 여기서는 다른 의미 있는 줄바꿈만 변환합니다.
    contentString = contentString.replace(/\r?\n/g, '<br />');

    // --- 6. 중복된 <br> 태그 정리 및 불필요한 줄 간격 줄이기 ---
    // 3개 이상의 <br />이 연속되는 경우를 2개로 줄여서 적절한 줄 간격 유지
    contentString = contentString.replace(/(<br\s*\/?>\s*){3,}/gi, '<br /><br />');

    // --- 7. font-size 스타일 제거 (원치 않으면 이 줄 제거) ---
    contentString = contentString.replace(/font-size:\s*[^;"]+;?/gi, '');
    
    console.log('=== 최종 처리된 데이터 ===');
    console.log(contentString);
    console.log('strong 태그 개수:', (contentString.match(/<strong>/g) || []).length);

    return contentString.trim();
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
            toast.success('${selectedTrainingItem.value.name}연수가 성공적으로 삭제되었습니다.')

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
        strong {
            font-weight: 600 !important;
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

