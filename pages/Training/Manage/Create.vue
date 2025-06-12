<template>
        <!-- 폼1 -->
    <form class="wrap create-top mt-[30px] max-w-[1200px] w-full mx-auto ">
        <div class="flex justify-between items-end mb-2">
            <h2 class="h1-title font-normal paperlogy">연수등록</h2>
            <!-- <p class="text-[16px] font-semibold text-[#2B5BBB]">* 표시는 필수 입력입니다 </p> -->
        </div>
        <div class="border-t-[2px] border-[#2B5BBB] mb-5"></div>

        <div class="box box grid grid-cols-2 py-4 text-left max-xl:grid-cols-1 py-4 text-left mx-auto max-sm:px-0 px-6 bg-[#FFFFFF]">
            <!-- Row Template -->
            <!-- 1 -->
            <div class="label-box px-2 bg-[#F9F9F9] border-b border-t border-[#EFEFEF] h-[60px] flex items-center max-xl:w-full">
                <label class="w-1/3 px-4 text-[18px] text-[#2B5BBB] after-small font-bold text-[#292929] max-sm:px-0">과정코드</label>
                <div class="w-2/3 flex items-center gap-2 max-sm:gap-1">
                    <input type="text" v-model="course_code" readonly disabled
                            class="text-center w-full bg-[#5279C9] text-[#FFFFFF] text-[16px] max-sm:px-1 px-4 py-1.5 max-sm:text-[14px] rounded-lg border border-[#2B5BBB] focus:outline-none tracking-wider"/>
                </div>
            </div>
            <div class="px-2 bg-[#F9F9F9] border-b border-t border-[#EFEFEF] h-[60px] flex items-center px-4 max-xl:hidden ">
            </div>

            <!-- 2 -->
            <div class="label-box px-2 bg-[#FFFFFF] border-b border-[#EFEFEF] py-2 flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">등록날짜</label>
                <div class="w-2/3 flex flex-col">
                    <input type="date" v-model="registDate" readonly 
                    class="w-full flex-1 h-[45px] text-[#292929] text-[18px] after-small placeholder-[#AFAFAF] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]"
                    />
                </div>
            </div>
            <div class="label-box px-2 bg-[#FFFFFF] after-gray border-b border-[#EFEFEF] py-2 flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">접수마감</label>
                <input type="date" placeholder="YYYY-MM-DD" v-model="postEnd"
                    :class="[
                    'w-full flex-1 h-[45px] text-[#292929] text-[18px] after-small placeholder-[#AFAFAF] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                    postEnd ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                    ]"
                />
            </div>

            <!-- 3 -->
            <div class="px-2 bg-[#F9F9F9] after-white border-b border-[#EFEFEF] py-[6px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">과정명</label>
                <div class="w-2/3 flex flex-col">
                    <div class="flex items-center gap-2 max-sm:gap-1">
                        <input type="text" v-model="title"
                        :class="[
                                'w-full flex-1 h-[45px] text-[#292929] text-[18px] after-small placeholder-[#AFAFAF] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                                title ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                        ]"
                        />
                    </div>
                </div>
            </div>
            <div class="px-2 bg-[#F9F9F9] border-b border-[#EFEFEF] py-[6px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">과정상태</label>
                <DropUser
                    :options="statusOptions.map(o => o.label)"
                    v-model="statusLabel"
                />
            </div>

            <!-- 4 -->
            <div class="px-2 bg-[#FFFFFF] border-b border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">연수주관</label>
                    <div class="w-2/3 flex gap-0">
                    <input v-model="type" type="radio" name="type" id="academy" value="연수원" class="hidden peer/academy" />
                    <label for="academy" 
                        class="flex-1 h-[45px] text-center cursor-pointer px-4 py-2 text-[18px] after-small max-sm:leading-[2] border 
                                border-[#B5B5B5] text-[#B5B5B5] bg-[#F3F3F3] 
                                peer-checked/academy:bg-[#EDF3FF] peer-checked/academy:text-[#2B5BBB] peer-checked/academy:border-[#2B5BBB]
                                rounded-l-lg">
                        연수원
                    </label>
                    <input v-model="type" type="radio" name="type" id="research" value="연구회" class="hidden peer/research" />
                    <label for="research"
                        class="flex-1 h-[45px] text-center cursor-pointer px-4 py-2 text-[18px] after-small max-sm:leading-[2] border-t border-b border-r 
                                border-[#B5B5B5] text-[#B5B5B5] bg-[#F3F3F3] 
                                peer-checked/research:bg-[#EDF3FF] peer-checked/research:text-[#2B5BBB] peer-checked/research:border-[#2B5BBB]
                                rounded-r-lg">
                        연구회
                    </label>
                </div>
            </div>
            <div class="px-2 bg-[#FFFFFF] after-gray border-b border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">직무</label>
                <DropUser
                    :options="positionOptions"
                    v-model="position"
                />
            </div>

            <!-- 5 -->
            <div class="px-2 bg-[#F9F9F9] after-white border-b border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">종목</label>
                <DropUser
                    :options="divisionOptions"
                    v-model="division"
                />
            </div>
            <div class="px-2 bg-[#F9F9F9] border-b border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">과정
                </label>
                <DropUser
                    :options="courseOptions"
                    v-model="course"
                />
            </div>

            <!-- 6 -->
            <div class="px-2 bg-[#FEFEFE] border-b border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">적용년도</label>
                <div class="w-2/3 flex items-center gap-2 max-sm:gap-1">
                        <input type="number" v-model="year" placeholder="2025 (숫자만 입력)"
                        :class="[
                            'w-full flex-1 h-[45px] text-[#292929] text-[18px] after-small placeholder-[#AFAFAF] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                            year ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                        ]"
                    />
                </div>
            </div>
            <div class="px-2 bg-[#FEFEFE] after-gray border-b border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">학기
                </label>
                <DropUser
                    :options="semesterOptions"
                    v-model="semester"
                />
            </div>

            <!-- 6 -->
            <div class="px-2 bg-[#F9F9F9] after-white border-b border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">회차
                </label>
                <DropUser
                    :options="roundOptions"
                    v-model="round"
                />
            </div>
            <div class="px-2 bg-[#F9F9F9] border-b border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">
                    요일
                </label>
                <DropUser
                    :options="dayOptions"
                    v-model="day"
                />
            </div>
            

            <!-- 7 -->
            <div class="px-2 bg-[#FEFEFE] border-b border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">이수시간</label>
                <div class="w-2/3 flex items-center gap-2 max-sm:gap-1">
                        <input type="number" v-model="hour" placeholder="30 (숫자만 입력)"
                        :class="[
                            'w-full flex-1 h-[45px] text-[#292929] placeholder-[#AFAFAF] text-[18px] after-small px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                            hour ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                        ]"
                    />
                </div>
            </div>
            <div class="px-2 bg-[#FEFEFE] after-gray border-b border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">학점</label>
                <div class="w-2/3 flex items-center gap-2 max-sm:gap-1">
                        <input type="number" v-model="grade" placeholder="3 (숫자만 입력)"
                        :class="[
                            'w-full flex-1 h-[45px] text-[#292929] placeholder-[#AFAFAF] text-[18px] after-small px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                            grade ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                        ]"
                    />
                </div>
            </div>
            
            <!-- 8 -->
            <div class="px-2 bg-[#F9F9F9] after-white border-b border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">수강료</label>
                <div class="w-2/3 flex items-center gap-2 max-sm:gap-1">
                        <input type="number" v-model="tuitionFee" placeholder="140000 (숫자만 입력)"
                        :class="[
                            'w-full flex-1 h-[45px] text-[#292929] placeholder-[#AFAFAF] text-[18px] after-small px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                            tuitionFee ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                        ]"
                    />
                </div>
            </div>
            <div class="px-2 bg-[#F9F9F9] border-b border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">지원비</label>
                <div class="w-2/3 flex items-center gap-2 max-sm:gap-1">
                        <input type="number" v-model="applicationFee" placeholder="200000 (숫자만 입력)"
                        :class="[
                            'w-full flex-1 h-[45px] text-[#292929] placeholder-[#AFAFAF] text-[18px] after-small px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                            applicationFee ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                        ]"
                    />
                </div>
            </div>


            <!-- 9 -->
            <div class="px-2 py-[6px] bg-[#FEFEFE] border-b border-[#EFEFEF] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">
                연수기간
                </label>
                <div class="w-2/3 flex gap-2 max-sm:flex-col">
                    <input type="date" placeholder="YYYY-MM-DD" v-model="trainStartDate"
                    :class="[
                    'w-full flex-1 h-[45px] min-w-[0px] text-[#292929] text-[18px] after-small placeholder-[#AFAFAF] px-3 py-1.5 max-sm:px-2.5 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                    trainStartDate ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                    ]"
                    />
                    <input type="date" placeholder="YYYY-MM-DD" v-model="trainEndDate"
                    :class="[
                    'w-full flex-1 h-[45px] min-w-[0px] text-[#292929] text-[18px] after-small placeholder-[#AFAFAF] px-3 py-1.5 max-sm:px-2.5 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                    trainEndDate ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                    ]"
                    />
                </div>
            </div>
            <div class="px-2 bg-[#FEFEFE] after-gray border-b border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">
                    교육장소
                </label>
                <div class="w-2/3 flex gap-2">
                    <DropEduPlace
                        v-model="eduPlace"
                    />
                </div>
            </div>
            <div
                class="bg-[#F9F9F9] after-white context-wrap px-2 py-2 flex items-center max-sm:h-[100px]">
                <div class="context-label w-1/6 max-xl:w-1/4 max-sm:justify-start max-sm:w-full ">
                    <label
                        class="p-4 x-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929] flex items-center py-4 xl:hidden">교육내용</label>
                </div>
            </div>
            <div
                class="context-container col-span-2 max-xl:col-span-1 max-xl:flex max-xl:flex-col px-2 bg-[#F9F9F9] border-b border-[#EFEFEF] h-[500px] w-full grid grid-cols-6">
                <label
                    class="tiny-mc col-span-1 px-4 max-sm:px-0 text-[18px] max-sm:text-[15px] font-bold text-[#292929] flex items-center py-4 max-xl:hidden">교육내용</label>
                <div class="h-full w-full col-span-5">
                    <TinyEditor v-model="content" />
                </div>
            </div>
        </div>

        <div class="border-t-[2px] border-[#2B5BBB] mt-5"></div>

        <!-- 버튼 -->
        <div class="max-w-[1190px] container mt-[64px] mb-[50px]">
            <div class="max-w-[576px] flex gap-2 items-center mx-auto">
                <button @click.prevent="submitForm"
                    class="max-w-[282px] w-full px-5 py-2 text-white bg-[#2B5BBB] rounded-[10px] hover:bg-[#648DDF]">
                    등록하기
                </button>
                <button type="button" @click="cancelForm"
                    class="max-w-[282px] w-full px-5 py-2 bg-[#F5F5F5] rounded-[10px] hover:bg-[#EBEBEB] border border-[#DBDEE3]">
                    취소하기
                </button>
            </div>
        </div>

    </form>
    <!-- <p class="mt-4 text-gray-700">course_code(과정코드): {{ course_code }}</p>
    <p class="mt-4 text-gray-700">registDate(등록날짜): {{ registDate }}</p>
    <p class="mt-4 text-gray-700">course_post_end(접수마감날): {{ postEnd }}</p>
    <p class="mt-4 text-gray-700">title(과정명): {{ title }}</p>
    <p class="mt-4 text-gray-700">status(과정상태): {{ statusLabel }}</p>
    <p class="mt-4 text-gray-700">type(연수주관): {{ type }}</p>
    <p class="mt-4 text-gray-700">position(직무): {{ position }}</p>
    <p class="mt-4 text-gray-700">division(종목): {{ division }}</p>
    <p class="mt-4 text-gray-700">course(과정): {{ course }}</p>
    <p class="mt-4 text-gray-700">round(회차): {{ round }}</p>
    <p class="mt-4 text-gray-700">year(적용년도): {{ year }}</p>
    <p class="mt-4 text-gray-700">semester(학기): {{ semester }}</p>
    <p class="mt-4 text-gray-700">hour(이수시간): {{ hour }}</p>
    <p class="mt-4 text-gray-700">grade(학점): {{ grade }}</p>
    <p class="mt-4 text-gray-700">tuitionFee(수강료): {{ tuitionFee }}</p>
    <p class="mt-4 text-gray-700">applicationFee(지원금): {{ applicationFee }}</p>
    <p class="mt-4 text-gray-700">day(요일): {{ day }}</p>
    <p class="mt-4 text-gray-700">eduPlace(교육장소): {{ eduPlace }}</p>
    <p class="mt-4 text-gray-700">course_start(연수시작): {{ trainStartDate }} </p>
    <p class="mt-4 text-gray-700">course_end(연수끝): {{ trainEndDate }} </p> -->
</template>


<script setup>
    definePageMeta({ middleware: 'auth' });
    
    import { useState } from '#app'
    import { onMounted } from 'vue'
    import DropUser from '../../components/Drop/User.vue'
    import { useRouter } from 'vue-router';
    import TinyEditor from '../../../components/TinyEditor.vue'
    import DropEduPlace from '../../../components/Drop/EduPlace.vue'; 

    const { $toast } = useNuxtApp();
    const router = useRouter()

    const eduPlace = ref([]);
    const course_code = ref('2025-4-A01171601')
    const registDate = ref(getTodayDate());
    const postEnd = ref('');
    const title = ref('');
    const type = ref('');
    const year = ref(''); 
    const hour = ref('');
    const grade = ref(''); 
    const tuitionFee = ref('');
    const applicationFee = ref('');
    const trainStartDate = ref('')
    const trainEndDate = ref('')
    const content = ref('');

    const statusOptions = [
        { label: '선택하세요', value: null },
        { label: '과정개설 및 접수중', value: 1 },
        { label: '접수마감', value: 0 },
        { label: '과정종료', value: null }
    ];
    const statusLabel = ref('선택하세요');

    // statusLabel에 해당하는 statusOptions 객체 찾기
    const selectedStatusObj = computed(() => {
        return statusOptions.find(opt => opt.label === statusLabel.value) || null;
    });

    const positionOptions = ['선택하세요','서울직무', '경기직무', '자율'];
    const position = ref('')

    const courseOptions = ['선택하세요', '직무', '자율', '지도자'];
    const course = ref('')

    const divisionOptions = ['선택하세요', '댄스스포츠', '웰빙댄스', '라인댄스','라틴댄스'];
    const division = ref('')

    const roundOptions = ['선택하세요', '1회차', '2회차', '3회차', '4회차', '기타'];
    const round = ref('')
    
    const semesterOptions = ['선택하세요', '1학기', '하계', '2학기', '동계'];
    const semester = ref('')

    const dayOptions = ['선택하세요', '해당없음', 'perPage월요일', 'perPage화요일', 'perPage수요일', 'perPage목요일', 'perPage금요일', 'perPage토요일', 'perPage일요일'];
    const day = ref('')



    const token = useCookie('auth_token').value;

    const submitForm = async () => {
        // 기본 유효성 검사 (필수)
        if (!title.value || !type.value || !trainStartDate.value || !trainEndDate.value) {
            $toast.error('과정명, 연수주관, 연수기간...등을 모두 채워주세요.');
            return;
        }
        if (postEnd.value && postEnd.value < registDate.value) {
            $toast.error('접수마감일은 등록일 이후여야 합니다.');
            return;
        }

        // API 요청을 위한 데이터(페이로드) 준비
        const payload = {
            // user_id: 1, // 예시: 사용자 ID, 실제로는 인증된 사용자 ID를 사용해야 함
            // order: 1,
            opening: selectedStatusObj.value ? selectedStatusObj.value.value : null,
            course_code: course_code.value,
            course_name: title.value,
            status: selectedStatusObj.value ? selectedStatusObj.value.value : null,
            range: type.value, // '연수원' 또는 '연구회'
            job_classification: position.value === '선택하세요' ? null : position.value,
            division: division.value === '선택하세요' ? null : division.value,
            time: round.value === '선택하세요' ? null : round.value, // API는 'time' 필드를 회차로 사용
            application_year: year.value ? String(year.value) : null, // API가 문자열을 예상한다면 String()으로 변환
            semester: semester.value === '선택하세요' ? null : semester.value,
            hour: hour.value !== '' ? Number(hour.value) : null,
            grade: grade.value !== '' ? String(grade.value) : null,
            tuition: tuitionFee.value !== '' ? Number(tuitionFee.value) : null,
            application_fee: applicationFee.value !== '' ? Number(applicationFee.value) : null,
            day_of_week: day.value === '선택하세요' ? null : day.value,
            course_start: trainStartDate.value, // YYYY-MM-DD 형식
            course_end: trainEndDate.value,     // YYYY-MM-DD 형식
            course_post_end: postEnd.value, // 접수 종료일로 가정. 접수 시작일이 별도 필드면 추가해야 함.
            content: content.value,
            status: course.value === '선택하세요' ? null : course.value,
            // course_place는 API에서 배열을 예상하므로 배열로 보냅니다.
            course_place: eduPlace.value === '선택하세요' || !eduPlace.value.length ? null : eduPlace.value,
            // created_at 및 updated_at은 일반적으로 백엔드에서 설정하므로 프론트엔드에서 보낼 필요 없음
            // 만약 API에서 특정 created_at을 요구한다면, registDate와 registTime을 조합하여 보낼 수 있음
            // created_at: `${registDate.value}T${registTime.value}:00.000000Z`, // 예시
        };

        // API가 접수 시작일과 종료일을 구분한다면, `applyStartDate` 필드를 여기에 추가
        // payload.application_start_date = applyStartDate.value; // 예시

        console.log("전송할 페이로드:", payload);

        try {
            // useFetch를 사용하여 POST 요청 수행
            const { data, error } = await useFetch('http://localhost:8000/api/admin/courses', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json', // JSON 페이로드임을 알림
                    'Accept': 'application/json' // JSON 응답을 선호함을 알림
                },
                body: JSON.stringify(payload),
            });

            if (error.value) {
                console.error('연수 등록 실패:', error.value.data || error.value);
                // API에서 보낸 상세 에러 메시지가 있다면 사용
                const errorMessage = error.value?.data?.message || error.value?.message || '연수 등록에 실패했습니다.';
                $toast.error(errorMessage);
                return;
            }

            if (data.value) {
                $toast.success('연수가 성공적으로 등록되었습니다!');
                // 등록 성공 후 연수 목록 페이지로 이동
                router.push('/training/manage');
            }

        } catch (e) {
            console.error('연수 등록 중 오류 발생:', e);
            $toast.error('연수 등록 중 알 수 없는 오류가 발생했습니다.');
        }
    }

    // ✅ 취소 버튼 클릭 시 호출될 함수
    const cancelForm = () => {
        router.push('/training/manage'); // Manage > index.vue 로 이동
    };
    // ✅ 오늘 날짜 가져오기
    function getTodayDate() {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }


    // ✅ 페이지 타이틀 설정
    const pageTitle = useState('pageTitle')
    pageTitle.value = '연수수정'

</script>

<style scoped> 

    .mob-br {
        display: none;
    }
    .context-wrap {
        grid-column: span 2 / span 2; /* col-span-2 */
    }
    .button-wrap {
        display: flex;
        width: 83.3333%; /* w-5/6 */
        gap: 0.5rem;      /* gap-2 */
    }
    .context-container {
        grid-column: span 2 / span 2; /* col-span-2 */
        display: grid;                /* grid */
        grid-template-columns: repeat(6, minmax(0, 1fr)); /* grid-cols-6 */
    }
    .context-label { 
        width: 16.666667%;
    }
    .tiny-mc { 
        grid-column: span 1 / span 1;
    }
    @media (max-width: 1280px) {
        .box {
            display: grid;
            grid-template-columns: 1fr;
        }
        .after-gray {
            background-color: #F9F9F9;
        }
        .after-white {
            background-color: #FFFFFF;
        }
        .border-none {
            border-bottom: 0;
        }
        .wrap {
            width: 80%;
        }
        .context-wrap {
            grid-column: span 1 / span 1;
        }
        .context-container {
            grid-column: span 1 / span 1;   
            display: flex;                  
            flex-direction: column;     
        }
        .context-label {
            width: 38%; 
        }
    }
    @media (max-width: 767px) {
        .mob-br {
            display: block;
        }
        .after-small {
            font-size: 16px;
        }
        .after-toosmall {
            font-size: 15px;
        }
        .btn {
            min-width: 95px;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
        }
        .box {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
        }
        label {
            padding-left: 0.1rem;
            padding-right: 0.1rem;
        }
        .wrap {
            width: 100%;
        }
        .tighter {
            letter-spacing: -1px;
        }
        .button-wrap {
            width: 100%;    /* max-sm:w-full */
            gap: 0.25rem;   /* max-sm:gap-1 */
        }
        .context-label {

            width: 30%; /* max-sm:w-full */
            justify-content: flex-start; /* max-sm:justify-start */
        }
    }
    @media (max-width: 480px) {
        .context-wrap {
            flex-direction: column; /* max-sm:flex-col */
            height: 100px;
            align-items: flex-start; /* max-sm:items-start */
        }
    }

</style>