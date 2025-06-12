<template>
    <!-- 폼1 -->
    <form class="wrap create-top mt-[30px] max-w-[1200px] w-full mx-auto ">
        <div class="flex justify-between items-end mb-2">
            <h2 class="h1-title font-normal paperlogy">연수수정</h2>
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
                            class="text-center w-full bg-[#5279C9] text-[#FFFFFF] text-[18px] after-small max-sm:px-1 px-4 py-1.5 rounded-lg border border-[#2B5BBB] focus:outline-none tracking-wider"/>
                </div>
            </div>
            <div class="px-2 bg-[#F9F9F9] border-b border-t border-[#EFEFEF] h-[60px] flex items-center px-4 max-xl:hidden ">
            </div>

            <!-- 2 -->
            <div class="label-box px-2 bg-[#FFFFFF] border-b border-[#EFEFEF] py-2 flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">수정날짜</label>
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
                    v-if="statusLabel"
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
                    수정하기
                </button>
                <button type="button" @click="cancelForm"
                    class="max-w-[282px] w-full px-5 py-2 bg-[#F5F5F5] rounded-[10px] hover:bg-[#EBEBEB] border border-[#DBDEE3]">
                    취소하기
                </button>
            </div>
        </div>

    </form>
</template>

<script setup>
    definePageMeta({ middleware: 'auth' });
    
    import { useState } from '#app'
    import { ref, computed, onMounted } from 'vue'
    import DropUser from '../../components/Drop/User.vue'
    import { useToast } from 'vue-toastification'
    import { useRouter } from 'vue-router';
    import TinyEditor from '../../../components/TinyEditor.vue'
    import DropEduPlace from '../../../components/Drop/EduPlace.vue'; 

    const eduPlace = ref([]);

    const router = useRouter();
    const route = useRoute();
    const toast = useToast();

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

    const dayOptions = ['선택하세요', '해당없음', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];
    const day = ref('')


    const token = useCookie('auth_token').value;
    
    // ✅ 수정할 연수데이터 받기
    const fetchTrainingData = async (id) => {
        try {
            const url = `http://localhost:8000/api/admin/courses/${id}`;
            const { data, error } = await useFetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                // transform을 사용하여 데이터를 폼 필드에 맞게 가공합니다.
                transform: (response) => {
                    console.log('1. API 응답 raw 데이터 :', response.data); // API 응답 확인
                    const course = response.data; // API 응답 구조에 따라 조정

                    const rawContent = course.content || '';
                    console.log('2. content 원본 문자열:', rawContent); 

                    let tempContent = rawContent;
                    try {
                        // rawContent가 JSON 문자열로 감싸져 있지 않다면 직접 감싸줍니다.
                        if (!rawContent.startsWith('"') || !rawContent.endsWith('"')) {
                            tempContent = `"${rawContent.replace(/"/g, '\\"')}"`;
                        }
                        tempContent = JSON.parse(tempContent);
                    } catch (e) {
                            console.warn("JSON.parse failed for content, using raw content directly:", e);
                            tempContent = rawContent; // 파싱 실패 시 원본 그대로 사용
                    }

                    // 2. 실제 \r\n 또는 \n 제어 문자를 HTML <br /> 태그로 변환
                    let finalContent = tempContent.replace(/\r?\n/g, '<br />'); 
                        
                    // 3. HTML 엔티티로 변환된 문자열 복원 (이미 HTML로 넘어오는 경우가 많으므로 안전장치)
                    finalContent = finalContent
                        .replace(/&quot;/g, '"')
                        .replace(/&#39;/g, "'")
                        .replace(/&amp;/g, '&')
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>');

                    // 4. font-size 스타일 제거 (유지)
                    finalContent = finalContent.replace(/font-size:\s*[^;"]+;?/gi, '').trim();
                    finalContent = finalContent.replace(/(<br\s*\/?>\s*){2,}/gi, '<br />');
                    // 5. 내용이 비어있거나 HTML 태그가 없는 순수 텍스트인 경우 <p></p>로 감싸기
                    if (!finalContent) {
                        finalContent = '<p></p>';
                    } else if (!/<[a-z][\s\S]*>/i.test(finalContent)) {
                        finalContent = `<p>${finalContent}</p>`;
                    }
                    console.log('3. content 전처리 후 문자열 (HTML):', finalContent)
                    const eduPlaceValue = course.course_place && course.course_place.length > 0 
                                      ? course.course_place // API에서 배열로 오면 배열 그대로
                                      : []; // 없으면 빈 배열로 할당 (문자열 '선택하세요' 대신)
                    return {
                        id: course.id,
                        course_code: course.course_code || '',
                        registDate: course.created_at ? course.created_at.substring(0, 10) : getTodayDate(), // 등록 날짜 (created_at)
                        postEnd: course.course_post_end || '',
                        title: course.course_name || '',
                        type: course.range || '', // 연수주관 (연수원/연구회)
                        year: course.application_year ? String(course.application_year) : '',
                        hour: course.hour || '',
                        grade: course.grade || '',
                        tuitionFee: course.tuition || '',
                        applicationFee: course.application_fee || '',
                        trainStartDate: course.course_start || '',
                        trainEndDate: course.course_end || '',
                        content: course.content || '',
                        statusLabel: statusOptions.find(opt => opt.value === (course.opening === null ? null : Number(course.opening)))?.label || '선택하세요', // opening 값을 label로 변환
                        position: course.job_classification 
                        ? course.job_classification.replace('직무', '').trim() 
                        : '-', 
                        division: course.division || '선택하세요',
                        course: course.status || '선택하세요', // course_name을 course 드롭다운에 매핑
                        round: course.time || '선택하세요',
                        semester: course.semester || '선택하세요',
                        day: course.day_of_week || '선택하세요',
                        eduPlace: eduPlaceValue,
                        content: finalContent, 
                    };
                }
            });

            if (error.value) {
                console.error('연수 데이터 불러오기 실패:', error.value.data || error.value);
                toast.error('연수 데이터를 불러오는 데 실패했습니다.');
                router.push('/training/manage'); // 실패 시 목록 페이지로 리다이렉트
                return;
            }

            if (data.value) {
                // 불러온 데이터를 폼 필드에 할당
                course_code.value = data.value.course_code;
                registDate.value = data.value.registDate;
                postEnd.value = data.value.postEnd;
                title.value = data.value.title;
                type.value = data.value.type;
                year.value = data.value.year;
                hour.value = data.value.hour;
                grade.value = data.value.grade;
                tuitionFee.value = data.value.tuitionFee;
                applicationFee.value = data.value.applicationFee;
                trainStartDate.value = data.value.trainStartDate;
                trainEndDate.value = data.value.trainEndDate;
                content.value = data.value.content;
                statusLabel.value = data.value.statusLabel;
                position.value = data.value.position;
                division.value = data.value.division;
                course.value = data.value.course;
                round.value = data.value.round;
                semester.value = data.value.semester;
                day.value = data.value.day;
                eduPlace.value = data.value.eduPlace;
                courseOptions.value = ['선택하세요', data.value.course]; 
                // 과정명 드롭다운(courseOptions)은 해당 과정명만 선택되어 있도록 업데이트
                // (일반적으로는 필터링된 과정명 전체를 다시 불러와야 할 수 있습니다. 여기서는 선택된 값만 반영)
                // 만약 course 드롭다운이 현재 선택된 값 외에 다른 과정명들도 보여줘야 한다면,
                // fetchCourseNames 함수를 호출하여 해당 필터에 맞는 과정명 리스트를 다시 채워야 합니다.
                // 여기서는 선택된 course_name만 드롭다운에 반영하는 예시입니다.
                // 선택된 과정명을 포함하도록
            }

        } catch (e) {
            console.error('연수 데이터 불러오기 중 오류 발생:', e);
            toast.error('연수 데이터를 불러오는 중 알 수 없는 오류가 발생했습니다.');
            router.push('/training/manage'); // 오류 발생 시 목록 페이지로 리다이렉트
        }
    };

    // ✅ 수정하기 클릭
    const submitForm = async () => {
        // 폼 데이터 수집 및 백엔드 형식에 맞게 가공
        const payload = {
            course_code: course_code.value,
            created_at: registDate.value, // 등록 날짜 (created_at)
            course_post_end: postEnd.value,
            course_name: title.value,
            range: type.value,
            application_year: Number(year.value), // 숫자로 변환
            hour: Number(hour.value), // 숫자로 변환
            grade: Number(grade.value), // 숫자로 변환
            tuition: Number(tuitionFee.value), // 숫자로 변환
            application_fee: Number(applicationFee.value), // 숫자로 변환
            course_start: trainStartDate.value,
            course_end: trainEndDate.value,
            content: content.value,
            // statusLabel을 백엔드가 원하는 opening 값 (숫자)으로 다시 변환
            opening: statusOptions.find(opt => opt.label === statusLabel.value)?.value,
            job_classification: position.value,
            division: division.value,
            status: course.value, // 백엔드의 status 필드에 course 드롭다운 값을 매핑
            time: round.value,
            semester: semester.value,
            day_of_week: day.value,
            course_place: eduPlace.value === '선택하세요' || !eduPlace.value.length ? null : eduPlace.value,
            // 기타 필드...
        };

        // '선택하세요' 값은 null 또는 빈 문자열로 처리하여 백엔드로 보내지 않음
        for (const key in payload) {
            if (payload[key] === '선택하세요' || payload[key] === '') {
                payload[key] = null; // 백엔드 요구사항에 따라 null 또는 undefined
            }
            // 숫자로 변환된 값 중 NaN이 있다면 null로 처리 (예: Number('') => NaN)
            if (typeof payload[key] === 'number' && isNaN(payload[key])) {
                payload[key] = null;
            }
        }

        console.log('Payload for update:', payload);

        try {
            const courseId = route.params.id; // 현재 URL에서 ID 가져오기
            const url = `http://localhost:8000/api/admin/courses/${courseId}`;
            const { error } = await useFetch(url, {
                method: 'PUT', // PUT 메서드 사용
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload), // JSON 형태로 바디 전송
            });

            if (error.value) {
                console.error('연수 수정 실패:', error.value.data || error.value);
                toast.error(`연수 수정에 실패했습니다: ${error.value.data?.message || '알 수 없는 오류'}`);
            } else {
                toast.success('연수 정보가 성공적으로 수정되었습니다.');
                router.push('/training/manage'); // 수정 후 목록 페이지로 이동
            }
        } catch (e) {
            console.error('연수 수정 중 오류 발생:', e);
            toast.error('연수 수정 중 알 수 없는 오류가 발생했습니다.');
        }
    };
    
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

    const pageTitle = useState('pageTitle')
    onMounted(async () => {
        pageTitle.value = '연수수정'
        const trainingId = route.params.id; 

        if (trainingId) {
            console.log('Fetching data for training ID:', trainingId); // 디버깅을 위한 로그
            await fetchTrainingData(trainingId); // 가져온 id를 함수에 전달
        } else {
            console.error('수정할 연수 ID를 찾을 수 없습니다. 라우터 파라미터를 확인하세요.');
            toast.error('수정할 연수 ID를 찾을 수 없습니다.');
            router.push('/training/manage'); // ID가 없으면 목록 페이지로 리다이렉트
        }

    })
</script>