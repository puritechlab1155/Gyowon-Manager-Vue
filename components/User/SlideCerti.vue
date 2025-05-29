<template>
    <div class="fixed inset-0 z-[999]" @click.self="emit('close')" >
        <div
            id="certificateSlidePanel"
            :class="[
            'fixed top-0 right-0 w-full max-w-[550px] h-full bg-white shadow-lg z-50 transition-all duration-300 ',
            isVisible ? 'right-0' : 'right-[-100%]']"
        >
            <div class="p-6 shrink-0 h-full">
                <h2 class="paperlogy text-[26px] max-md:text-[22px] font-medium mt-2 mb-2">이수증</h2>
                <div class="text-[16px] text-[#555] font-medium mb-2">
                    ※ 발급기관: <span class="text-[#000]">한국댄스스포츠협회</span>
                </div>
                <div class="border-t-[1px] border-[#DBDEE3] mb-2"></div>
                <div class="flex-grow overflow-y-auto no-scrollbar">
                    <div class="printArea ">
                        <div class="relative bg-white certificate-box  min-w-[450px] max-w-[450px]">
                            <img src="../../assets/img/certificate-bg.png" alt="이수증 배경"
                                class="absolute inset-0 w-full h-full object-cover z-0" />
                            <div class="certificate-inner absolute inset-0 z-10 px-16 py-[70px] text-center text-[#222]">
                                <h2 class="text-[20px] font-medium">교육연수</h2>
                                <h1 class="text-[25px] font-bold mb-6">이수증</h1>
                                <p class="certificate-info text-left text-[14px] mb-4 tracking-tighter">
                                    경기도교육청 지정 <br> [전국] 유초중등교원 특수분야연수기관 <br> ( 지정번호 : 경기-교육-2024-08 )
                                </p>

                                <div class="text-left mb-6 grid grid-cols-2 gap-x-6 detail">
                                    <!-- 나머지는 한 줄 전체 사용 -->
                                    <div class="col-span-2 text-[12px] mb-2">
                                        <span class="font-semibold text-[16px]">이수번호 : </span>
                                        <span class="certificate-id text-[14px]">경기도교육-유초중-한단연-직무-2024-04028</span>
                                    </div>

                                    <!-- 성명 / 생년월일 -->
                                    <div class="text-[15px] mb-2">
                                        <span
                                            class="font-semibold text-[16px]">성&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;명
                                            : </span>
                                        <span class="certificate-name text-[14px]">{{ user.name }}</span>
                                    </div>
                                    <div class="mb-2">
                                        <span class="font-semibold text-[16px]">생년월일 : </span>
                                        <span class="certificate-name text-[14px]">{{ user.birthDate }}</span>
                                    </div>

                                    <!-- 연수종별 / 이수시간 -->
                                    <div class="mb-2">
                                        <span class="font-semibold text-[16px]">연수종별 : </span>
                                        <span class="certificate-type text-[14px]">직무연수</span>
                                    </div>
                                    <div class="mb-2">
                                        <span class="font-semibold text-[16px]">이수시간 : </span>
                                        <span class="certificate-hours text-[14px]">15시간</span>
                                    </div>

                                    <div class="col-span-2 mb-2">
                                        <span class="font-semibold text-[16px]">연수과정명 : </span>
                                        <span class="certificate-course-name text-[14px]">미래역량을 키우는 라틴초급</span>
                                    </div>
                                    <div class="col-span-2 mb-2">
                                        <span class="text-[15px] font-semibold">연수기간 : </span>
                                        <span class="certificate-course-period text-[14px]">2025.01.20 ~ 2025.01.24</span>
                                    </div>
                                    <div class="col-span-2">
                                        <span class="text-[16px] font-semibold">연수성적 : </span>
                                        <span class="certificate-grade text-[14px]">해당없음</span>
                                    </div>
                                </div>
                                <p class="mt-6 text-[14px]">위와 같이 이수하였음을 증명합니다.</p>
                                <p class="mt-2 text-[14px]">{{ formattedDate }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 하단 버튼 영역 -->
                <div class="p-6 pt-4 sticky bottom-0 bg-white border-t-[1px] border-[#DBDEE3] z-[1000]">
                    <div class="flex justify-between">
                        <BtnPdf :targetClass="'printArea'" />
                        <button @click="$emit('close')" class="closeCertificateSlide px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
                            닫기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import BtnPdf from '../Btn/Pdf.vue'

    const emit = defineEmits(['close'])

    const isVisible = ref(false)
    // 오늘 날짜 구하기
    const today = new Date()

    // 포맷: 2025년 5월 28일
    const formattedDate = ref(`${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`)
    
    const props = defineProps({
        user: Object,
    })

    onMounted(() => {
        requestAnimationFrame(() => {
            isVisible.value = true
        })
    })


</script>