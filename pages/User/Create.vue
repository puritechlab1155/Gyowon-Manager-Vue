<template>
    <!-- 폼1 -->
    <form class="wrap create-top mt-[30px] max-w-[1200px] w-full mx-auto ">
        <div class="flex justify-between items-end mb-2">
            <h2 class="h1-title font-normal paperlogy">회원등록</h2>
            <p class="text-[16px] font-semibold text-[#2B5BBB]">* 표시는 필수 입력입니다 </p>
        </div>
        <div class="border-t-[2px] border-[#2B5BBB] mb-5"></div>

        <div class="box grid grid-cols-2 py-4 text-left max-xl:grid-cols-1 mx-auto max-sm:px-0 px-6 bg-[#FFFFFF]">
            <!-- Row Template -->
            <!-- 1 -->
            <div class="px-2 bg-[#FFFFFF] border-b border-t border-[#EFEFEF] h-[80px] flex items-center">
                <label class="w-1/3 px-4 text-[18px] after-small font-bold text-[#292929] max-sm:px-0">아이디 <span
                        class="text-[#2B5BBB]">*</span></label>
                <div class="w-2/3 flex flex-col">
                    <div class="flex items-center gap-2 max-sm:gap-1">
                        <input type="text" v-model="username"
                        :class="[
                            'w-full flex-1 h-[45px] text-[18px] after-small text-[#292929] placeholder-[#AFAFAF] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                            username ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                        ]"/>
                        <button type="button" @click="onClickCheckUsername" :disabled="isChecking"
                            class="bg-[#EDF3FF] text-[#2B5BBB] text-[16px] h-[45px] px-4 py-1.5 after-toosmall  rounded-lg border border-[#DBDEE3] focus:outline-none hover:bg-[#D3E1FB]">중복확인</button>
                    </div>
                    <p class="text-[14px] font-semibold text-[#64748B]"> ※ 영문, 숫자 조합 (5~13자리)</p>
                </div>
            </div>
            <div class="px-2 bg-[#FFFFFF] border-b border-t border-[#EFEFEF] h-[80px] flex items-center px-4 max-xl:hidden ">
            </div>

            <!-- 2 -->
            <div class="px-2 bg-[#F9F9F9] border-b border-[#EFEFEF] py-[6px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">비밀번호 <span
                        class="text-[#2B5BBB]">*</span></label>
                <div class="w-2/3 flex flex-col">
                    <div class="flex items-center gap-2 max-sm:gap-1">
                        <input type="password" v-model="password"
                        :class="[
                                'w-full flex-1 h-[45px] text-[#292929] placeholder-[#AFAFAF] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                                password ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                        ]"
                        />
                    </div>
                    <p class="text-[14px] font-semibold text-[#64748B]"> ※ 영문, 숫자, 특수문자 조합 (4~16 자리)</p>
                </div>
            </div>
            <div class="px-2 bg-[#F9F9F9] after-white border-b border-[#EFEFEF] h-[80px] max-xl:h-[60px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">비밀번호 <br class="mob-br"/>확인 <span
                        class="text-[#2B5BBB]">*</span></label>
                <input type="password" v-model="passwordConfirm" @blur="checkPasswordMatch"
                        :class="[
                        'w-full flex-1 h-[45px] text-[#292929] placeholder-[#AFAFAF] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                        passwordConfirm ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                        ]"
                        />
            
            </div>

            <!-- 3 -->
            <div class="px-2 bg-[#FFFFFF] after-gray border-b border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 text-[18px] after-small font-bold text-[#292929] max-sm:px-0">이메일 <span
                class="text-[#2B5BBB]">*</span></label>
                <div class="w-2/3 flex flex-col">
                    <div class="flex items-center gap-2 max-sm:gap-1">
                        <input type="text" v-model="email"
                            :class="[
                                'w-full flex-1 h-[45px] text-[18px] after-small text-[#292929] placeholder-[#AFAFAF] bg-[#F3F3F3] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                                email ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                            ]"
                            />
                        <button type="button" @click="onClickCheckEmail" :disabled="isCheckingEmail"
                            class="bg-[#EDF3FF] text-[#2B5BBB] text-[16px] h-[45px] px-4 py-1.5 after-toosmall rounded-lg border border-[#DBDEE3] focus:outline-none hover:bg-[#D3E1FB]">중복확인</button>
                    </div>
                </div>                       
            </div>
            <div class="px-2 bg-[#FFFFFF] border-b border-[#EFEFEF] h-[60px] flex items-center px-4 max-xl:hidden">
            </div>

            <!-- 4 -->
            <div class="px-2 bg-[#F9F9F9] after-white border-b border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">성명 <span
                        class="text-[#2B5BBB]">*</span></label>
                <input type="text" v-model="name"
                        :class="[
                        'w-full flex-1 h-[45px] text-[18px] after-small text-[#292929] placeholder-[#AFAFAF] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                        name ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                        ]"
                        />
            </div>
            <div class="px-2 bg-[#F9F9F9] border-b border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">성별 <span
                    class="text-[#2B5BBB]">*</span></label>
                <div class="w-2/3 flex gap-0">
                    <input v-model="gender" type="radio" name="gender" id="female" value="여" class="hidden peer/female" />
                    <label for="female" 
                        class="flex-1 h-[45px] text-center cursor-pointer px-4 py-2 text-[16px] max-sm:text-sm max-sm:leading-[2] border 
                                border-[#B5B5B5] text-[#B5B5B5] bg-[#F3F3F3] 
                                peer-checked/female:bg-[#EDF3FF] peer-checked/female:text-[#2B5BBB] peer-checked/female:border-[#2B5BBB]
                                rounded-l-lg">
                        여자
                    </label>
                    
                    <!-- 남자 -->
                    <input v-model="gender" type="radio" name="gender" id="male" value="남" class="hidden peer/male" />
                    <label for="male"
                        class="flex-1 text-center cursor-pointer px-4 py-2 text-[16px] max-sm:text-sm max-sm:leading-[2] border-t border-b border-r 
                                border-[#B5B5B5] text-[#B5B5B5] bg-[#F3F3F3] 
                                peer-checked/male:bg-[#EDF3FF] peer-checked/male:text-[#2B5BBB] peer-checked/male:border-[#2B5BBB]
                                rounded-r-lg">
                        남자
                    </label>
                </div>
            </div>

            <!-- 5 -->
            <div class="px-2 bg-[#FFFFFF] border-b border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">생년월일 <span
                        class="text-[#2B5BBB]">*</span></label>
                <input type="date" placeholder="YYYY-MM-DD" v-model="birthInput"
                    :class="[
                    'w-full flex-1 h-[45px] text-[#292929] text-[18px] after-small placeholder-[#AFAFAF] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                    birthInput ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                    ]"
                    />
                <!-- <input id="birthday" type="text" placeholder="YYYY-MM-DD" class="w-2/3 text-[16px] bg-[#F3F3F3] px-3 py-1.5 rounded-lg border border-[#DBDEE3] placeholder-[#AFAFAF] focus:outline-none focus:border-[#2B5BBB]"/> -->
            </div>
            <div class="px-2 bg-[#FFFFFF] after-gray border-b border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">휴대번호 <span class="text-[#2B5BBB]">*</span>
                </label>
                <div class="w-2/3 flex flex-col relative">
                    <div class="flex items-center gap-2 max-sm:gap-1">
                        <input type="tel" inputmode="numeric" oninput="this.value = this.value.replace(/[^0-9]/g, '')" 
                        placeholder="01012345678 (숫자만 입력)" v-model="phone"
                        :class="[
                            'w-full flex-1 h-[45px] text-[18px] after-small text-[#292929] placeholder-[#AFAFAF] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                            phone ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                        ]"
                        />
                    </div>
                </div>
            </div>
            
            <!-- 6 주소 (3줄) -->
            <div class="px-2 bg-[#F9F9F9] after-white border-b border-[#EFEFEF] flex items-center">
                <label class="w-1/3 block px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929] mb-2">주소 <span
                        class="text-[#2B5BBB]">*</span></label>
                <div class="w-2/3 py-2">
                    <div class="flex gap-2 mb-2">
                        <input type="text" placeholder="우편번호" disabled v-model="zipcode"
                            :class="[
                            'w-full flex-1 h-[45px] text-[18px] after-small text-[#292929] placeholder-[#AFAFAF] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                            zipcode ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                            ]"
                            />
                        <button type="button" @click="onClickSearch"
                            class="btn bg-[#EDF3FF] text-[16px] text-[#2B5BBB] px-4 py-2 after-toosmall rounded-lg border border-[#DBDEE3] focus:outline-none hover:#D3E1FB hover:bg-[#D3E1FB]">우편번호찾기</button>
                    </div>
                    <div class="mb-2">
                        <input type="text" placeholder="주소" disabled v-model="address"
                            :class="[
                                'w-full flex-1 h-[45px] text-[18px] after-small  text-[#292929] placeholder-[#AFAFAF] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                                address ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                                ]"
                        />
                    </div>
                    <div>
                        <input type="text" placeholder="상세주소" v-model="address_detail"
                        :class="[
                                'w-full flex-1 h-[45px] text-[18px] after-small  text-[#292929] placeholder-[#AFAFAF] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                                address_detail ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                                ]"
                            />
                    </div>
                </div>
            </div>
            <div class="px-2 bg-[#F9F9F9] after-gray border-b border-[#EFEFEF] py-[6px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">근무지역</label>
                <DropUser
                    :options="workStateOptions"
                    v-model="workState"
                />
            </div>
            
            <!-- 7 -->
            <div class="px-2 bg-[#FFFFFF] border-b border-none border-[#EFEFEF] py-[6px] flex items-center ">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">
                직장명 <span class="text-[#2B5BBB]">*</span>
                </label>
                <div class="w-2/3 flex flex-col">
                    <div class="flex items-center gap-2 max-sm:gap-1">
                        <input type="text" placeholder='양재 or 일반' v-model="workPlaceName"
                            :class="[
                                'w-full flex-1 h-[45px] text-[18px] after-small text-[#292929] placeholder-[#AFAFAF] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                                workPlaceName ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                            ]"
                        />
                    </div>
                </div>
            </div>
            <div class="bg-[#FFFFFF] border-b border-[#EFEFEF] h-auto flex items-center max-xl:px-4">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929] hidden max-xl:block">
                </label>
                <p class="text-[14px] font-semibold text-[#64748B] tighter"> * 학교명 입력시 이름만 입력하세요.  <br class="mob-br"/>(예: 양재고등학교 → 양재) <br/> * 무직인 경우 일반으로 입력하세요. <br class="mob-br"/> (예: 무직 → 일반)</p>
            </div>

            <!-- 8 -->
            <div class="px-2 bg-[#F9F9F9] after-gray border-b border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">
                    소속기관 <span class="text-[12px] font-semibold text-[#2B5BBB] max-sm:block">[교원]</span>
                </label>
                <DropUser
                    :options="schoolTypeOptions"
                    v-model="schoolType"
                />
            </div>
            <div class="px-2 bg-[#F9F9F9]  after-white border-b border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">설립구분
                    <span class="text-[12px] font-semibold text-[#2B5BBB] max-sm:block">[교원]</span>
                </label>
                <DropUser
                    :options="establishmentOptions"
                    v-model="establishmentType"
                />
            </div>

            <!-- 8 -->
            <div class="px-2 py-[6px] bg-[#FFFFFF] after-gray border-b border-[#EFEFEF] flex items-center whitespace-nowrap">
                <label class="w-1/3 px-4 max-sm:px-0 text-[17px] after-small font-bold text-[#292929]">소속교육지원청
                    <span class="text-[12px] font-semibold text-[#2B5BBB] max-sm:block">[교원]</span>
                </label>
                <DropUser
                    :options="officeOptions"
                    v-model="officeName"
                />
            </div>

            <!-- 9 -->
            <div class="px-2 py-[6px] bg-[#FFFFFF] border-b border-[#EFEFEF] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">직급
                    <span class="text-[12px] font-semibold text-[#2B5BBB] max-sm:block">[교원]</span>
                </label>
                <DropUser
                    :options="jobPositionOptions"
                    v-model="jobPosition"
                />
            </div>

            <!-- 10 -->
            <div class="w-full px-2 bg-[#F9F9F9] after-gray border-b border-[#EFEFEF] border-none py-[6px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">
                    전공과목 <span class="text-[12px] font-semibold text-[#2B5BBB] max-sm:block">[교원]</span>
                </label>
                <div class="w-2/3 flex flex-col relative">
                    <div class="flex items-center gap-2 max-sm:gap-1">
                        <input v-model="majorSubject"
                        type="text" placeholder="초등 or 유아 or 특수 or 상담"
                        :class="[
                            'w-full flex-1 h-[45px] text-[18px] after-small text-[#292929] placeholder-[#AFAFAF] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                            majorSubject ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                        ]"
                        />
                    </div>
                </div>
            </div>

            <div class="bg-[#F9F9F9] border-b border-[#EFEFEF] flex items-center max-xl:px-4 h-auto">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929] hidden max-xl:block"></label>
                <p class="text-[14px] font-semibold text-[#64748B] tighter">
                ※ "교육" 또는 "전문" 생략해주세요. <br/>
                (초등교육/유아교육/특수교육/전문상담 <br class="mob-br"/> → 초등/유아/특수/상담)
                </p>
            </div>

            <!-- 11 -->
            <div class="px-2 py-[6px] bg-[#FFFFFF] after-gray border-b border-[#EFEFEF] flex items-center whitespace-nowrap">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">NICE 번호
                    <span class="text-[12px] font-semibold text-[#2B5BBB] max-sm:block">[교원]</span>
                </label>
                <input v-model="niceNumber"
                    placeholder="직무연수 희망자 필수입력"
                    :class="[
                        'w-full flex-1 h-[45px] text-[18px] after-small text-[#292929] placeholder-[#AFAFAF] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                        niceNumber ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                        ]"
                    />
            </div>
            <div class="px-2 py-[6px] bg-[#FFFFFF] border-b border-[#EFEFEF] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">가입경로</label>
                <DropUser
                    :options="referralSourceOptions"
                    v-model="referralSource"
                />
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
                <button type="button" onclick="window.location.href='user.html'"
                    class="max-w-[282px] w-full px-5 py-2 bg-[#F5F5F5] rounded-[10px] hover:bg-[#EBEBEB] border border-[#DBDEE3]">
                    취소하기
                </button>
            </div>
        </div>

    </form>
    <!-- <p class="mt-4 text-gray-700">username(아이디): {{ username }}</p>
    <p class="mt-4 text-gray-700">password(비밀번호): {{ password }}</p>
    <p class="mt-4 text-gray-700">email(이메일): {{ email }}</p>
    <p class="mt-4 text-gray-700">name(이름): {{ name }}</p>
    <p class="mt-4 text-gray-700">gender(성별): {{ gender }}</p>
    <p class="mt-4 text-gray-700">birth(생년월일): {{ birth }}</p>
    <p class="mt-4 text-gray-700">phone(휴대번호): {{ phone }}</p>
    <p class="mt-4 text-gray-700">zipcode(우편번호): {{ zipcode }}</p>
    <p class="mt-4 text-gray-700">address(주소): {{ address }}</p>
    <p class="mt-4 text-gray-700">address_detail(상세주소): {{ addressDetail }}</p>
    <p class="mt-4 text-gray-700">work_state(근무지역): {{ workState }}</p>
    <p class="mt-4 text-gray-700">workplace_name(직장명): {{ workPlaceName }}</p>
    <p class="mt-4 text-gray-700">school_type(소속기관): {{ schoolType }}</p>
    <p class="mt-4 text-gray-700">establishment_type(설립구분): {{ establishmentType }}</p>
    <p class="mt-4 text-gray-700">job_position(직급): {{ jobPosition }}</p>
    <p class="mt-4 text-gray-700">major_subject(전공과목): {{ majorSubject }}</p>
    <p class="mt-4 text-gray-700">referral_source(가입경로): {{ referralSource }}</p>
    <p class="mt-4 text-gray-700">office_name(소속교육지원청): {{ officeName }}</p>
    <p class="mt-4 text-gray-700">nicenumber(NICE 번호): {{ niceNumber }}</p> -->
</template>

<script setup>
    import { useState } from '#app'
    import { onMounted } from 'vue'
    import DropUser from '../../components/Drop/User.vue'
    import { useToast } from 'vue-toastification'
    import { useDebounceFn } from '@vueuse/core'
    import { useRouter } from 'vue-router';

    const router = useRouter()
    const toast = useToast()

    const username = ref('')
    const password = ref('')
    const passwordConfirm = ref('')
    const email = ref('')
    const name = ref('')
    const gender = ref('')
    const birthInput = ref('')
    const birth = ref('')
    const zipcode = ref('')
    const address = ref('')
    const addressDetail = ref('')
    const phone = ref('')
    const workPlaceName = ref('')
    const majorSubject = ref('')
    const niceNumber = ref('')

    const workStateOptions = ['선택하세요', '서울', '경기', '부산', '대구', '인천', '광주', '대전', '울산', '강원도', '충청북도', '충청남도', '경상북도', '전라북도', '전라남도', '제주'];
    const workState = ref('')

    const schoolTypeOptions = ['선택하세요', '유치원', '초등학교', '중학교', '고등학교', '특수학교', '교육청', '대학교', '대학원'];
    const schoolType = ref('')

    const establishmentOptions = ['선택하세요', '공립', '사립', '국립'];
    const establishmentType = ref('')

    const jobPositionOptions = ['선택하세요', '교사', '기간제', '부장', '교감', '교장', '원감', '교육전문직', '행정실장', '지방공무원', '교육공무직', '감사', '퇴직', '기타'];
    const jobPosition = ref('')
    
    const referralSourceOptions = ['선택하세요', '인터넷 검색', '동료교사 추천', '연수안내 공문', '교육청 단체연수', '연수안내 책자', '기타'];
    const referralSource = ref('')

    const officeOptions = ref()
    const officeName = ref('')

    const isChecking = ref(false)          // 아이디 중복 체크 중 상태
    const isCheckingEmail = ref(false)     // 이메일 중복 체크 중 상태

    const isUsernameChecked = ref(false) // 아이디 중복체크 통과 여부
    const isEmailChecked = ref(false) // 이메일 중복체크 통과 여부
    const isPasswordValid = ref(false) // 비밀번호 동일 통과 여부


    const token = useCookie('auth_token').value

    const originalOffices = ref([])

    // ✅ 소속교육지원청 옵션리스트 받기
    const fetchOfficeOptions = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/admin/offices', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            const json = await res.json()

            if (json.result && json.data) {
                officeOptions.value = ['선택하세요', ...json.data.map(item => item.office_name)]

                // '선택하세요' 기본 옵션과 API 데이터 합치기
                originalOffices.value = json.data
            } else {

            console.error('오피스 데이터 불러오기 실패:', json.message)
            }
        } catch (error) {
            console.error('오피스 API 호출 오류:', error)
        }
    }

    
    // ✅ 아이디 중복체크
    const checkUsername = async () => {
        if (isChecking.value) return  // 중복체크 중복 호출 방지
        isChecking.value = true
        
        const usernameValue = username.value.trim()

        // 1. 입력 여부 확인
        if (!username.value) {
            toast.error('아이디를 입력해주세요.')
            isChecking.value = false
            isUsernameChecked.value = false
            return
        }
        const usernameRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,13}$/
        if (!usernameRegex.test(usernameValue)) {
            toast.warning('아이디는 영문과 숫자 조합의 5~13자리여야 합니다.')
            isChecking.value = false
            isUsernameChecked.value = false
            return
        }

        // 3. 서버 요청
        try {
            const res = await fetch(`http://localhost:8000/api/admin/user-id/1?username=${username.value}`, {
                method: 'POST', 
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            const json = await res.json()

            if (json.result) {
                toast.success(json.message)  // 예: "사용 가능한 아이디입니다."
                isUsernameChecked.value = true
            } else {
                toast.error(json.message)    // 예: "이미 사용중인 아이디입니다."
                isUsernameChecked.value = false
                }
        } catch (err) {
            toast.error('서버 오류가 발생했습니다.')
            console.error(err)
            isUsernameChecked.value = false
            } finally {
            isChecking.value = false
        }
    }

    // ✅ 이메일 중복체크
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const checkEmail = async () => {
        if (isCheckingEmail.value) return
        isCheckingEmail.value = true

        const emailValue = email.value.trim()
        
        // 입력 여부 및 유효성 검사
        if (!emailValue) {
            toast.error('이메일을 입력해주세요.')
            isEmailChecked.value = false
            isCheckingEmail.value = false

            return
        }
        if (!emailRegex.test(emailValue)) {
            toast.warning('유효한 이메일 주소를 입력해주세요.')
            isEmailChecked.value = false
            isCheckingEmail.value = false
            return
        }

    try {
        const res = await fetch('http://localhost:8000/api/admin/user-email/1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ email: emailValue }),
        })
        const json = await res.json()

        if (json.result) {
            toast.success(json.message || '사용 가능한 이메일입니다.')
            isEmailChecked.value = true
        } else {
            toast.error(json.message || '이미 사용 중인 이메일입니다.')
            isEmailChecked.value = false
        }
        } catch (err) {
            toast.error('서버 오류가 발생했습니다.')
            console.error(err)
            isEmailChecked.value = false
        } finally {
            isCheckingEmail.value = false
        }
    }

    const onClickCheckUsername = () => {
        checkUsername()
    }

    const onClickCheckEmail = () => {
        checkEmail()
    }

    // ✅ 비밀번호 체크
    const checkPasswordMatch = () => {
        const pwd = password.value.trim()
        const pwdConfirm = passwordConfirm.value.trim()

        const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=~`[\]{}|\\:;"'<>,.?/]).{4,16}$/

        if (!pwd) {
            toast.warning('비밀번호를 입력해주세요.')
            isPasswordValid.value = false
            return
        }

        if (!pwdRegex.test(pwd)) {
            toast.error('비밀번호는 4~16자리이며 영문자, 숫자, 특수문자를 모두 포함해야 합니다.')
            isPasswordValid.value = false
            return
        }

        if (!pwdConfirm) {
            toast.warning('비밀번호 확인을 입력해주세요.')
            isPasswordValid.value = false
            return
        }

        if (pwd !== pwdConfirm) {
            toast.error('비밀번호가 일치하지 않습니다.')
            isPasswordValid.value = false
        } else {
            toast.success('비밀번호가 일치합니다.')
            isPasswordValid.value = true
        }
    }

    // ✅ 생년월일
    watch(birthInput, (newVal) => {
        if (!newVal) {
            birth.value = ''
            return
        }
        // 예: '1999-02-02' -> '19990202'
        birth.value = newVal.replace(/-/g, '')
    })


    // ✅ 우편번호 찾기
    function loadDaumPostcodeScript() {
        return new Promise((resolve, reject) => {
            if (window.daum) {
            resolve();
            return;
            }
            const script = document.createElement('script');
            script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load Daum Postcode script'));
            document.head.appendChild(script);
        });
    }

    async function onClickSearch() {
        try {
            await loadDaumPostcodeScript();
            new daum.Postcode({
            oncomplete: function (data) {
                zipcode.value = data.zonecode;                     // ref에 값 할당
                address.value = data.roadAddress || data.address;  // ref에 값 할당
            }
            }).open();
        } catch (error) {
            console.error(error);
        }
    }

    // ✅ 회원등록하기
    const submitForm = async () => {
        try {
            if (!isUsernameChecked.value) {
                toast.error('아이디 중복 체크를 완료해주세요.')
                return
            }
            if (!isEmailChecked.value) {
                toast.error('이메일 중복 체크를 완료해주세요.')
                return
            }
            if (!isPasswordValid.value) {
                toast.error('비밀번호를 올바르게 입력해주세요.')
                return
            }
            // 기존 필수 입력값 체크 (username, password, email, name, gender, birth, phone, zipcode, address, workPlaceName)
            if (
                !username.value ||
                !password.value ||
                !email.value ||
                !name.value ||
                !gender.value ||
                !birth.value ||
                !phone.value ||
                !zipcode.value ||
                !address.value ||
                !workPlaceName.value
            ) {
                toast.error('모든 필수 입력값을 입력해주세요.')
                return
            }
            const selectedOffice = originalOffices.value.find(
                office => office.office_name === officeName.value
                ) || null;

            const hasOffice = selectedOffice !== null;

            const payload = {
                username: username.value,
                password: password.value,
                email: email.value,
                name: name.value,
                gender: gender.value,
                birth: birth.value,
                phone: phone.value,
                zipcode: zipcode.value,
                address: address.value,
                address_detail: addressDetail.value,
                work_state: workState.value,
                workplace_name: workPlaceName.value,
                school_type: schoolType.value,
                establishment_type: establishmentType.value,
                job_position: jobPosition.value,
                major_subject: majorSubject.value,
                referral_source: referralSource.value,
                office_id: selectedOffice ? selectedOffice.id : null,
                office: selectedOffice ? {
                    id: selectedOffice.id,
                    office_name: selectedOffice.office_name,
                } : null, // ✅ 없을 경우 null
                nicenumber: niceNumber.value
            }
            console.log('payload:', payload);
            const res = await fetch('http://localhost:8000/api/admin/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (data.result) {
                toast.success('회원이 성공적으로 등록되었습니다');
                await router.push('/user');
                } else {
                toast.error('회원 등록에 실패했습니다: ' + data.message);
                }
            } catch (error) {
                toast.error('오류가 발생했습니다: ' + error.message);
        }
    };

    // ✅ 페이지 타이틀 설정
    const pageTitle = useState('pageTitle')
        onMounted(async () => {
            pageTitle.value = '회원등록'
            fetchOfficeOptions();
    })
</script>

<style scoped>

    .mob-br {
        display: none;
    }
    .btn {
            min-width: 120px;
    }
    @media (max-width: 1280px) {
        .box {
            display: grid;
            grid-template-columns: repeat(1, minmax(0, 1fr));
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
    }
</style>