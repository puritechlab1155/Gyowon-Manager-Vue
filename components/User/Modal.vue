<template>
    <div class="fixed inset-0 bg-black/50 z-[800] hidden flex justify-center items-center" @click.self="emit('close')">
        <div class="bg-white rounded-lg p-6 w-[90%] max-w-6xl max-h-[90vh] shadow-lg relative overflow-y-auto scroll-round">
            <img src="../../assets/img/close.png" alt="닫기" @click="$emit('close')" class="absolute top-4 right-4 w-6 h-6 cursor-pointer">
            <!-- <h1 class="h1-title paperlogy font-normal text-[#292929] pb-4 text-center">{{ user.name }}님의 상세정보</h1> -->
            <h1 class="h1-title paperlogy font-normal text-[#292929] pb-4 text-center">개인정보</h1>
            <div class="flex items-center justify-center">
                <div
                    class="flex items-start justify-center max-md:items-center max-md:flex-col gap-5 h-full w-full p-5">
                    <div class="left-box">
                        <!-- 개인 정보 섹션 -->
                        <div class="flex pb-4 justify-start flex-col text-left">
                            <div class="text-left">
                                <p class="font-bold text-[20px] text-[#292929]">{{ user.name }} ({{ user.gender }})</p>
                                <div class="flex items-center space-x-1 mt-1">
                                    <p class="text-[16px] font-medium text-[#727272] whitespace-nowrap tracking-tighter">{{ user.birthDate }}</p>
                                    <span class="text-[16px] font-medium text-[#727272]">|</span>
                                    <p class="text-[16px] font-medium text-[#727272] whitespace-nowrap tracking-tighter">{{ user.position }}</p>
                                    <span class="text-[16px] font-medium text-[#727272]">|</span>
                                    <p class="text-[16px] font-medium text-[#727272] whitespace-nowrap tracking-tighter">{{ user.major }}</p>
                                </div>
                            </div>
                            <div class="text-left mt-2">
                                <div class="flex items-center space-x-1">
                                    <p class="text-[14px] font-medium text-[#727272]">등록일: 24.07.08</p>
                                    <span class="text-[14px] font-medium text-[#727272]">|</span>
                                    <p class="text-[14px] font-medium text-[#727272]">10:51:26</p>
                                </div>
                                <div class="flex items-center space-x-1 max-md:mt-0">
                                    <p class="text-[14px] font-medium text-[#727272]">수정일: 24.07.08</p>
                                    <span class="text-[14px] font-medium text-[#727272]">|</span>
                                    <p class="text-[14px] font-medium text-[#727272]">10:51:26</p>
                                </div>
                            </div>
                        </div>

                        <div class="">
                            <!-- 상세 정보 섹션 -->
                            <div class="bg-[#F8F8F8] flex flex-col rounded-[10px] p-5 gap-5 max-xl:w-full">
                                <div class="flex flex-col text-left">
                                    <span class="text-[14px] font-medium text-[#727272]">아이디</span>
                                    <span
                                        class="text-[16px] font-medium text-[#292929] tracking-tighter">{{ user.userId }}</span>
                                </div>
                                <div class="flex flex-col text-left">
                                    <span class="text-[14px] font-medium text-[#727272]">이메일</span>
                                    <span
                                        class="text-[16px] font-medium text-[#292929] tracking-tighter">{{ user.email }}</span>
                                </div>
                                <div class="flex flex-col text-left">
                                    <span class="text-[14px] font-medium text-[#727272]">소속교육지원청</span>
                                    <span class="text-[16px] font-medium text-[#292929] tracking-tighter">{{ user.educationOffice }}</span>
                                </div>
                                <div class="flex flex-col text-left">
                                    <span class="text-[14px] font-medium text-[#727272]">직장명</span>
                                    <span class="text-[16px] font-medium text-[#292929] tracking-tighter">{{ user.workplace }}</span>
                                </div>
                                <div class="flex flex-col text-left">
                                    <span class="text-[14px] font-medium text-[#727272]">주소</span>
                                    <span class="text-[16px] font-medium text-[#292929] tracking-tighter">{{ user.address }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="right-box">
                        <div class="min-w-[700px]">
                            <!-- 연수 기록 테이블 -->
                            <h2 class="text-[20px] font-semibold text-[#292929] mb-5">연수기록</h2>
                            <table class="text-center w-full text-left mt-2">
                                <thead class="bg-[#F8F8F8] rounded-t-[10px]">
                                    <tr>
                                        <th class="p-2 font-semibold text-[#292929] rounded-tl-[10px]">과정명</th>
                                        <th class="p-2 font-semibold text-[#292929]">직무</th>
                                        <th class="p-2 font-semibold text-[#292929]">종목</th>
                                        <th class="p-2 font-semibold text-[#292929]">시기</th>
                                        <th class="p-2 font-semibold text-[#292929]">시간</th>
                                        <th class="p-2 font-semibold text-[#292929]">연수기간</th>
                                        <th class="p-2 font-semibold text-[#292929] rounded-tr-[10px]">상태</th>
                                    </tr>
                                </thead>
                                <tbody class="text-[#727272]">
                                    <tr class="bg-[#FEFEFE] border-b-[1px] border-b-[#EEEEEE]">
                                        <td class="text-left p-2 font-medium text-[#727272]">라인댄스심화</td>
                                        <td class="p-2 font-medium text-[#727272]">자율</td>
                                        <td class="p-2 font-medium text-[#727272]">
                                            <BandLine/>
                                        </td>
                                        <td class="p-2 font-medium text-[#727272]">1학기</td>
                                        <td class="p-2 font-medium text-[#727272]">35</td>
                                        <td class="p-2 font-medium text-[#727272]">
                                            <div class="text-[#727272]">25.05.09 ~
                                            </div>
                                            <div class=" text-[#727272]">25.08.14</div>
                                        </td>
                                        <td class="p-2 font-medium text-[16px] text-[#727272]">수강확정</td>
                                    </tr>
                                    <tr class="bg-[#F8F8F8] border-b-[1px] border-b-[#EEEEEE]">
                                        <td class="text-left p-2 font-medium text-[#727272]">라틴2종 파티대비B</td>
                                        <td class="p-2 font-medium text-[#727272]">자율</td>
                                        <td class="p-2 font-medium text-[#727272]">
                                            <BandDance/>
                                        </td>
                                        <td class="p-2 font-medium text-[#727272]">1학기</td>
                                        <td class="p-2 font-medium text-[#727272]">24</td>
                                        <td class="p-2 font-medium text-[#727272]">
                                            <div class="text-[#727272]">25.04.01 ~ </div>
                                            <div class=" text-[#727272]">25.03.27</div>
                                        </td>
                                        <td class="p-2 font-medium text-[#727272]">진행중</td>
                                    </tr>
                                    <tr class="bg-[#FEFEFE] border-b-[1px] border-b-[#EEEEEE]">
                                        <td class="text-left p-2 font-medium text-[#727272]">역량을 키우는 라인댄스 기초</td>
                                        <td class="p-2 font-medium text-[#727272]">서울</td>
                                        <td class="p-2 font-medium text-[#727272]">
                                            <BandLine/>
                                        </td>
                                        <td class="p-2 font-medium text-[#727272]">1학기</td>
                                        <td class="p-2 font-medium text-[#727272]">35</td>
                                        <td class="p-2 font-medium text-[#727272]">
                                            <div class="text-[#727272]">24.07.29 ~ </div>
                                            <div class=" text-[#727272]">24.08.02</div>
                                        </td>
                                        <td class="p-2">
                                            <BtnCertification @open-slide="showSlideCerti = true" />
                                            <BtnReceipt @open-slide="showSlideRece = true" />
                                        </td>
                                    </tr>
                                    <tr class="bg-[#F8F8F8] border-b-[1px] border-b-[#EEEEEE]">
                                        <td class="text-left p-2 font-medium text-[#727272]">희망을 키우는 웰빙댄스 초중급Ⅱ</td>
                                        <td class="p-2 font-medium text-[#727272]">경기</td>
                                        <td class="p-2 font-medium text-[#727272]">
                                            <BandWelbing/>
                                        </td>
                                        <td class="p-2 font-medium text-[#727272]">2학기</td>
                                        <td class="p-2 font-medium text-[#727272]">30</td>
                                        <td class="p-2 font-medium text-[#727272]">
                                            <div class="text-[#727272]">24.07.29 ~ </div>
                                            <div class=" text-[#727272]">24.08.02</div>
                                        </td>
                                        <td class="p-2">
                                            <BtnCertification @open-slide="showSlideCerti = true" />
                                            <BtnReceipt @open-slide="showSlideRece = true" />
                                        </td>
                                    </tr>
                                    <tr class="bg-[#FEFEFE] border-b-[1px] border-b-[#EEEEEE]">
                                        <td class="text-left p-2 font-medium text-[#727272]">역량을 키우는 필라테스 기초</td>
                                        <td class="p-2 font-medium text-[#727272]">서울</td>
                                        <td class="p-2 font-medium text-[#727272]">
                                            <BandPilates/>
                                        </td>
                                        <td class="p-2 font-medium text-[#727272]">1학기</td>
                                        <td class="p-2 font-medium text-[#727272]">35</td>
                                        <td class="p-2 font-medium text-[#727272]">
                                            <div class="text-[#727272]">24-07-29 ~ </div>
                                            <div class=" text-[#727272]">24-08-02</div>
                                        </td>
                                        <td class="p-2">
                                            <BtnCertification @open-slide="showSlideCerti = true" />
                                            <BtnReceipt @open-slide="showSlideRece = true" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <!-- 수강 횟수 -->
                            <div class="flex justify-start space-x-2 mt-5 mb-20 text-[14px]">
                                <div class="text-[#727272] font-semibold px-1 text-left">
                                    댄스스포츠
                                    <span
                                        class="text-[#727272] bg-[#EEEEEE] font-semibold px-2 py-1 rounded-md">1</span>
                                </div>
                                <div class="text-[#727272] font-semibold px-1 text-left">
                                    라인댄스
                                    <span
                                        class="text-[#727272] bg-[#EEEEEE] font-semibold px-2 py-1 rounded-md">3</span>
                                </div>
                                <div class="text-[#727272] font-semibold px-1 text-left">
                                    웰빙댄스
                                    <span
                                        class="text-[#727272] bg-[#EEEEEE] font-semibold px-2 py-1 rounded-md">1</span>
                                </div>
                                <div class="text-[#727272] font-semibold px-1 text-left">
                                    필라테스
                                    <span
                                        class="text-[#727272] bg-[#EEEEEE] font-semibold px-2 py-1 rounded-md">0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <UserSlideCerti v-if="showSlideCerti" :user="user" @close="showSlideCerti = false" />
    <UserSlideRece v-if="showSlideRece" :user="user" @close="showSlideRece = false" />
    
</template>

<script setup>
    import { ref } from 'vue'
    import BtnCertification from '../Btn/Certification.vue'
    import UserSlideCerti from './SlideCerti.vue'
    import UserSlideRece from './SlideRece.vue'
    import BtnReceipt from '../Btn/Receipt.vue'

    const showSlideCerti = ref(false)
    const showSlideRece = ref(false)
    const props = defineProps({
        user: Object,
    })
    const emit = defineEmits(['close'])
</script>

<style scoped>

    .left-box {
        width: 25%;
        min-width: 280px;
        overflow-y: auto;
    }
    .right-box {
        width: 75%;
        overflow-x: auto;
    }
    @media (max-width: 768px) {
        .left-box {
            width: 100%;
            min-width: 0;
        }
        .right-box {
            width: 100%;
            min-width: 0;
        }
    }
</style>