<template>
        <div class="fixed inset-0 z-[999]" @click.self="emit('close')">
        <div id="receiptSlidePanel"
            :class="[
            'fixed top-0 right-0 w-full max-w-[650px] h-full bg-white shadow-lg z-50 transition-all duration-300 overflow-y-auto',
            isVisible ? 'right-0' : 'right-[-100%]']"
            >
            <div class="p-6">
                <h2 class="paperlogy text-[26px] max-md:text-[22px] font-medium mb-2">영수증</h2>
                <div class="text-[16px] text-[#555] font-medium mb-2">
                    ※ 은행명: <span class="text-[#000]">기업은행</span>
                </div>
                <div class="border-t-[1px] border-[#DBDEE3] mb-2"></div>
                <div class="printArea overflow-x-auto overflow-auto no-scrollbar">
                    <div class="relative bg-white receipt-box max-h-[650px] max-w-[600px] min-w-[600px] p-8">
                        <div class="w-full border-2 border-black text-[14px]">
                            <div class="col-span-6">
                                <h1 class="text-center text-[25px] font-bold mt-8 mb-8">영 수 증</h1>
                            </div>
                            <div class="col-span-6">
                                <div class="flex items-center justify-start mb-2 w-32 ml-4">
                                    <div class="border-b border-black flex-grow mr-2 text-center">
                                        <span class=" text-[18px]">{{ user.name }}</span>
                                    </div>
                                    <p class="w-10 font-semibold text-[18px]">귀하</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-7 border-b border-t border-black grid-six">
                                <div class="row-span-4 border-r border-black px-2 py-2 font-semibold text-left text-[18px]  text-center flex items-center justify-center col-span-1">공급자</div>
                                <div class="border-b border-r border-black px-2 py-1 font-semibold text-left text-[18px] text-center flex items-center justify-center col-span-2">사업자 등록번호</div>
                                <div class="border-b border-black px-2 py-1 text-[16px]  flex items-center col-span-4">000-0000-0000</div>
                                <div class="border-b border-r border-black px-2 py-1 font-semibold text-left text-[18px]  text-center flex items-center justify-center col-span-2">상 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;호</div>
                                <div class="border-b border-black px-2 py-1 text-[16px]  flex items-center col-span-4">서울초중등댄스스포츠교육연구회</div>
                                <div class="border-b border-r border-black px-2 py-1 font-semibold text-left text-[18px]  text-center flex items-center justify-center col-span-2">성 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;명</div>
                                <div class="border-b border-black px-2 py-1 text-[16px]  flex items-center col-span-4">김남현</div>
                                <div class="border-r border-black px-2 py-1 font-semibold text-left text-[18px]  text-center flex items-center justify-center col-span-2">사업장 소재지</div>
                                <div class="border-black px-2 py-1 text-[16px] flex items-center col-span-4">서울특별시 강남대로 42길 13, 호성빌딩 B1</div>
                                <div></div>
                            </div>
                            
                            <div class="flex border-b border-black">
                                <div colspan="2" class="border-black border-r px-2 py-2 font-semibold text-left text-[18px]  w-1/3 text-center flex items-center justify-center">성 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;함</div>
                                <div colspan="4" class="px-2 py-2 text-[18px]  w-2/3 flex items-center">김복녀</div>
                            </div>
                            <div class="flex border-b border-black">
                                <div colspan="2" class="border-black border-r px-2 py-2 font-semibold text-left text-[18px]  w-1/3 text-center flex items-center justify-center">직 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;장</div>
                                <div colspan="4" class="px-2 py-2 text-[18px]  w-2/3 flex items-center">서울디자인고등학교</div>
                            </div>
                            <div class="flex border-b border-black">
                                <div colspan="2" class="border-r border-black px-2 py-2 font-semibold text-left text-[18px]  w-1/3 text-center flex items-center justify-center">연 수 과 정</div>
                                <div colspan="4" class="px-2 py-2 text-[18px]  w-2/3 flex items-center">희망을 키우는 웰빙댄스 초중급Ⅱ</div>
                            </div>
                            <div class="flex border-b border-black">
                                <div colspan="2" class="border-r border-black px-2 py-2 font-semibold text-left text-[18px]  w-1/3 text-center flex items-center justify-center">수 &nbsp; 강 &nbsp; 비</div>
                                <div colspan="4" class="px-2 py-2 text-[18px]  w-2/3 flex items-center">120,000원</div>
                            </div>
                            <div class="flex border-b border-black">
                                <div colspan="2" class="border-r border-black px-2 py-2 font-semibold text-left text-[18px]  w-1/3 text-center flex items-center justify-center">연 수 기 간</div>
                                <div colspan="4" class="px-2 py-2 text-[18px]  w-2/3 flex items-center">2025.08.04 ~ 2025.08.08</div>
                            </div>
                            <div class="col-span-6">
                                <div class="text-center mt-8">
                                    <p class="text-[18px] ">상기 연수비를 납입하였음을 확인합니다.</p>
                                    <p class="mb-4 text-[18px] ">(직무연수 수강료)</p>
                                    <p class="mb-4 text-[18px] ">2025년 04월 10일</p>
                                    <div class="w-[300px] mx-auto mb-4">
                                        <img src="../../assets/img/receipt-bottom.png" alt="한국댄스스포츠연수원장 직인">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="border-t-[1px] border-[#DBDEE3] mb-4"></div>

                <!-- 하단 버튼 영역 -->
                <div class="flex justify-between">
                    <BtnPdf :targetClass="'printArea'" />
                    <button @click="$emit('close')" class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
                        닫기
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import BtnPdf from '../Btn/Pdf.vue'

    const emit = defineEmits(['close'])

    const isVisible = ref(false)
    const props = defineProps({
        user: Object,
    })

    onMounted(() => {
        requestAnimationFrame(() => {
            isVisible.value = true
        })
    })

</script>