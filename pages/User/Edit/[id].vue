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
                        <input type="text" v-model="username" readonly disabled
                            class="w-full flex-1 h-[45px] text-[18px] after-small text-[#292929] placeholder-[#AFAFAF] bg-[#F3F3F3] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]"
                            />
                    </div>
                    <p class="text-[14px] font-semibold text-[#64748B]"> ※ 아이디 수정불가합니다</p>
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
                        <input type="password" v-model="password" placeholder="변경하지 않으려면 비워두세요"
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
                <input type="password" v-model="passwordConfirm" @blur="checkPasswordMatch" placeholder="변경하지 않으려면 비워두세요"
                        :class="[
                        'w-full flex-1 h-[45px] text-[#292929] placeholder-[#AFAFAF] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                        passwordConfirm ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                        ]"
                        />
            
            </div>

            <!-- 3 -->
            <div class="px-2 bg-[#FFFFFF] after-gray border-b border-[#EFEFEF] py-2 flex items-center">
                <label class="w-1/3 px-4 text-[18px] after-small font-bold text-[#292929] max-sm:px-0">이메일 <span
                class="text-[#2B5BBB]">*</span></label>
                <div class="w-2/3 flex flex-col">
                    <div class="flex items-center gap-2 max-sm:gap-1">
                        <input type="text" v-model="email" readonly disabled
                            class="w-full flex-1 h-[45px] text-[18px] after-small text-[#292929] placeholder-[#AFAFAF] bg-[#F3F3F3] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]"
                            />
                    </div>
                    <p class="text-[14px] font-semibold text-[#64748B]"> ※ 이메일 수정불가합니다</p>
                </div>                       
            </div>
            <div class="px-2 bg-[#FFFFFF] border-b border-[#EFEFEF] flex items-center px-4 max-xl:hidden">
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
                <button @click.prevent="submitForm" :disabled="isLoading"
                    :class="[
                        'max-w-[282px] w-full px-5 py-2 text-white rounded-[10px] transition-colors',
                        isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2B5BBB] hover:bg-[#648DDF]'
                    ]">
                    {{ isLoading ? '수정 중...' : '수정하기' }}
                </button>
                <button type="button" @click="cancelEdit"
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
    definePageMeta({ middleware: 'auth' });
    
    import { ref, computed, onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { useToast } from 'vue-toastification'

    const route = useRoute()
    const router = useRouter()
    const toast = useToast()

    // 페이지 제목 설정
    const pageTitle = useState('pageTitle')
    onMounted(async () => {
        pageTitle.value = '회원수정'
        await fetchOfficeOptions()
        await fetchUserData()
    })

    // 사용자 ID 가져오기
    const userId = route.params.id

    // 토큰 가져오기
    const token = useCookie('auth_token').value

    // 폼 데이터 반응형 변수들
    const username = ref('')
    const password = ref('')
    const passwordConfirm = ref('')
    const email = ref('')
    const name = ref('')
    const gender = ref('')
    const birth = ref('')
    const birthInput = computed({
        get: () => {
            // Format birth to YYYY-MM-DD for display if it's YYYYMMDD
            if (birth.value && birth.value.length === 8) {
                return `${birth.value.substring(0, 4)}-${birth.value.substring(4, 6)}-${birth.value.substring(6, 8)}`
            }
            return birth.value
        },
        set: (value) => {
            // Store birth as YYYYMMDD
            birth.value = value ? value.replace(/-/g, '') : ''
        }
    })
    const phone = ref('')
    const zipcode = ref('')
    const address = ref('')
    const addressDetail = ref('')
    const workState = ref('')
    const workPlaceName = ref('')
    const schoolType = ref('')
    const establishmentType = ref('')
    const officeName = ref('')
    const jobPosition = ref('')
    const majorSubject = ref('')
    const niceNumber = ref('')
    const referralSource = ref('')

    // 로딩 상태
    const isLoading = ref(false)

    const isPasswordValid = ref(true) //

    // 드롭다운 옵션들 (from create.vue)
    const workStateOptions = ['선택하세요', '서울', '경기', '부산', '대구', '인천', '광주', '대전', '울산', '강원도', '충청북도', '충청남도', '경상북도', '전라북도', '전라남도', '제주'];
    const schoolTypeOptions = ['선택하세요', '유치원', '초등학교', '중학교', '고등학교', '특수학교', '교육청', '대학교', '대학원'];
    const establishmentOptions = ['선택하세요', '공립', '사립', '국립'];
    const jobPositionOptions = ['선택하세요', '교사', '기간제', '부장', '교감', '교장', '원감', '교육전문직', '행정실장', '지방공무원', '교육공무직', '감사', '퇴직', '기타'];
    const referralSourceOptions = ['선택하세요', '인터넷 검색', '동료교사 추천', '연수안내 공문', '교육청 단체연수', '연수안내 책자', '기타'];


    const officeOptions = ref([])
    const originalOffices = ref([]) 

    // ✅ 소속교육지원청 옵션리스트 받기 (from create.vue)
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
                originalOffices.value = json.data
            } else {
                console.error('오피스 데이터 불러오기 실패:', json.message)
            }
        } catch (error) {
            console.error('오피스 API 호출 오류:', error)
        }
    }

    // 사용자 데이터 불러오기
    const fetchUserData = async () => {
        if (!userId) {
            console.error('사용자 ID가 없습니다.')
            toast.error('사용자 ID를 찾을 수 없습니다.')
            return
        }

        isLoading.value = true
        try {
            const { data, error } = await useFetch(`http://localhost:8000/api/admin/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (error.value) {
                console.error('사용자 데이터 불러오기 실패:', error.value)
                toast.error('사용자 데이터 로드에 실패했습니다.')
                return
            }

            const user = data.value.data || data.value

            // 폼 필드에 데이터 설정 (아이디와 이메일은 수정 불가하므로 고정)
            username.value = user.username || ''
            email.value = user.email || '' // Assuming email is fixed for edit
            name.value = user.name || ''
            gender.value = user.gender || ''
            birth.value = user.birth || '' // Stored as YYYYMMDD
            phone.value = user.phone || ''
            zipcode.value = user.zipcode || ''
            address.value = user.address || ''
            addressDetail.value = user.address_detail || ''
            workState.value = user.work_state || ''
            workPlaceName.value = user.workplace_name || ''
            schoolType.value = user.school_type || ''
            establishmentType.value = user.establishment_type || ''
            officeName.value = user.office?.office_name || '선택하세요' // Set office name
            jobPosition.value = user.job_position || ''
            majorSubject.value = user.major_subject || ''
            niceNumber.value = user.nicenumber || '' // Corrected to nicenumber
            referralSource.value = user.referral_source || ''

            console.log('✅ 사용자 데이터 로드 완료:', user)
        } catch (e) {
            console.error('❌ 사용자 데이터 불러오기 중 예외:', e)
            toast.error('사용자 데이터 로드 중 오류가 발생했습니다.')
        } finally {
            isLoading.value = false
        }
    }


    // ✅ 비밀번호 체크 (from create.vue)
    const checkPasswordMatch = () => {
        const pwd = password.value.trim()
        const pwdConfirm = passwordConfirm.value.trim()

        // Only validate if passwords are being entered/changed
        if (!pwd && !pwdConfirm) {
            isPasswordValid.value = true // If no password is entered, it's considered valid (not changed)
            return
        }

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

    // ✅ 우편번호 찾기 (from create.vue)
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
                    zipcode.value = data.zonecode;
                    address.value = data.roadAddress || data.address;
                }
            }).open();
        } catch (error) {
            console.error(error);
            toast.error('우편번호 검색 중 오류가 발생했습니다.')
        }
    }

    // 폼 유효성 검사 (Modified from create.vue to fit edit requirements)
    const validateForm = () => {
        const requiredFields = [
            { field: name.value, name: '성명' },
            { field: gender.value, name: '성별' },
            { field: birth.value, name: '생년월일' },
            { field: phone.value, name: '휴대번호' },
            { field: zipcode.value, name: '우편번호' },
            { field: address.value, name: '주소' },
            { field: workPlaceName.value, name: '직장명' }
        ]

        for (const { field, name } of requiredFields) {
            if (!field || field.trim() === '' || field === '선택하세요') { // Added '선택하세요' check for dropdowns
                toast.error(`${name}을(를) 입력하거나 선택해주세요.`)
                return false
            }
        }

        // Only validate password if it's being changed
        if (password.value.trim() !== '' || passwordConfirm.value.trim() !== '') {
            if (!isPasswordValid.value) {
                toast.error('비밀번호를 올바르게 입력해주세요.')
                return false
            }
        }

        return true
    }

    // 폼 제출 (Modified to PUT and align with create.vue payload structure)
    const submitForm = async () => {
        if (!validateForm()) {
            return
        }

        isLoading.value = true
        try {
            const selectedOffice = originalOffices.value.find(
                office => office.office_name === officeName.value
            ) || null;

            const payload = {
                username: username.value, // username is included but typically not changed via PUT
                name: name.value,
                gender: gender.value,
                birth: birth.value, // YYYYMMDD format
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
                // office: selectedOffice ? { // Not typically sent back in update payload, server reconstructs
                //     id: selectedOffice.id,
                //     office_name: selectedOffice.office_name,
                // } : null,
                nicenumber: niceNumber.value // Corrected to nicenumber
            }

            // Only include password fields if they are being changed
            if (password.value.trim() !== '') {
                payload.password = password.value
                payload.password_confirmation = passwordConfirm.value
            }

            console.log('Update Payload:', payload);

            const { data, error } = await useFetch(`http://localhost:8000/api/admin/users/${userId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (error.value) {
                console.error('사용자 수정 실패:', error.value)
                toast.error('사용자 수정에 실패했습니다.')
                return
            }

            // Check if data.value.result exists and is true for success
            if (data.value && data.value.result) {
                toast.success('사용자 정보가 성공적으로 수정되었습니다.')
                router.push('/User') // 사용자 목록 페이지로 이동
            } else {
                toast.error(data.value.message || '사용자 수정에 실패했습니다.')
            }
        } catch (e) {
            console.error('사용자 수정 중 예외:', e)
            toast.error('사용자 수정 중 오류가 발생했습니다.')
        } finally {
            isLoading.value = false
        }
    }

    // 취소 버튼
    const cancelEdit = () => {
        if (confirm('수정을 취소하시겠습니까? 변경사항이 저장되지 않습니다.')) {
            router.push('/User')
        }
    }

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