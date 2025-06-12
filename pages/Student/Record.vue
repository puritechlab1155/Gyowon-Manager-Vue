<template>
    <div class="pt-5 pb-5 max-lg:flex max-lg:flex-col-reverse">
        <div
            class="w-full flex items-center justify-end max-lg:mt-[20px] max-2xl:flex-col max-2xl:items-stretch max-2xl:gap-5 max-lg:flex-col-reverse">
            <div id="selectedFilters" class="flex flex-wrap gap-2 mt-2 block lg:hidden"></div>
            <!-- right-content (탭들) -->
            <div
                class="right-content flex justify-end text-lg max-lg:space-x-0 max-2xl:space-x-1 space-x-2 max-2xl:self-end max-lg:justify-between max-lg:w-full">
                <div class="flex justify-between space-x-2 max-2xl:space-x-1 max-lg:hidden">
                    <DropCourse v-model="selectedCourse" :options="courseOptions"/>
                    <DropAll v-model="selectedEduPlace" :options="eduPlaceOptions"/>
                    <DropDay v-model="selectedDay" :options="dayOptions"/>
                    <DropRound v-model="selectedRound" :options="roundOptions"/>
                </div>
                <div
                    class=" flex justify-between items-center space-x-2 max-lg:space-x-0 max-lg:grid max-lg:grid-cols-5 max-lg:gap-2 max-lg:w-full">
                    <div
                        class="flex justify-between space-x-2 max-lg:space-x-0 max-2xl:space-x-1  max-lg:col-span-4">
                        <input type="text" placeholder="검색"
                            class="bg-[#FEFEFE] text-[#AFAFAF] placeholder-[#AFAFAF] border border-[#DBDEE3] 
                        focus:outline-none focus:border-[#2B5BBB] rounded-[8px] px-2 max-lg:w-full max-xl:w-[140px] h-[50px] max-sm:h-[45px] max-lg:rounded-tr-none max-lg:rounded-br-none" />
                        <button
                            class="bg-[#2B5BBB] w-16 py-2 px-3 max-sm:h-[45px] rounded-lg hover:bg-[#648DDF] focus:outline-none max-lg:rounded-tl-none max-lg:rounded-bl-none flex justify-center items-center gap-2">
                            <img src="../../assets/img/search.png" alt="검색 아이콘" class="hidden max-lg:block h-6 w-6" />
                            <span class="text-[#EDF3FF] max-lg:hidden">검색</span>
                        </button>
                    </div>
                    <div class="w-full max-lg:col-span-1 hidden max-lg:block">
                        <button id="filterButton"
                            class="text-[#202020] flex justify-between items-center px-1 py-3 max-sm:py-2 w-full rounded-md bg-[#ECECEC]">
                            <div class="w-14 text-center min-w-[30px] max-sm:text-[14px]">필터</div>
                            <img class="w-8 h-6" src="../../assets/img/filter.png" alt="필터 아이콘" />
                        </button>
                    </div>
                </div>
            </div>
        </div>



    </div>                
    <!-- // 처음엔 숨긴 후 옵션 선택후 나타나기 -->
    <div class="flex justify-between max-lg:flex-col-reverse max-lg:gap-3 pb-5">
        <div class="text-[14px] font-semibold text-[#64748B]">
            ※ "과목명, 교육장소, 요일, 회차"를 선택하시면 <br class="hidden max-sm:block" />[ 기초자료 | 과정출석부 | 명찰 ]이 화면에 표시됩니다.
            <br/> ※ 미입금이여도 수강확정이면 표시됩니다.
        </div>
        <!-- left-content -->
        <div class="left-content flex items-center justify-end gap-2">
            <!-- 기초자료 버튼 -->
            <div class="relative group">
                <button
                    class="openBasicDataModal bg-[#EDF3FF] text-[#2B5BBB] text-[18px] max-lg:px-5 max-sm:text-sm max-sm:py-2.5 px-6 py-2 rounded-lg hover:bg-[#D3E1FB] border border-[#2B5BBB] focus:outline-none whitespace-nowrap">
                    기초자료
                </button>
                <div
                    class="pointer-events-none text-center absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-2 min-w-[120px] rounded bg-black text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    PDF, Excel<br />다운로드
                </div>
            </div>

            <!-- 과정출석부 버튼 -->
            <div class="relative group">
                <button
                    class="openAttendanceModal bg-[#EDF3FF] text-[#2B5BBB] text-[18px] max-lg:px-5 max-sm:text-sm max-sm:py-2.5 px-6 py-2 rounded-lg hover:bg-[#D3E1FB] border border-[#2B5BBB] focus:outline-none whitespace-nowrap">
                    과정출석부
                </button>
                <div
                    class="pointer-events-none text-center  absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-2 min-w-[120px] rounded bg-black text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    PDF, Excel<br />다운로드
                </div>
            </div>

            <!-- 명찰 버튼 -->
            <div class="relative group">
                <button
                    class="openNameTagModal bg-[#EDF3FF] text-[#2B5BBB] text-[18px] max-lg:px-5 max-sm:text-sm max-sm:py-2.5 px-6 py-2 rounded-lg hover:bg-[#D3E1FB] border border-[#2B5BBB] focus:outline-none whitespace-nowrap">
                    명찰
                </button>
                <div
                    class="pointer-events-none text-center absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-2 min-w-[120px] rounded bg-black text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    PDF<br />다운로드
                </div>
            </div>
        </div>
    </div>

    <div class="w-full">
        <div class="overflow-x-auto">
            <div class="min-w-[1450px]">
                <!-- 테이블 헤더 부분 -->
                <table class="w-full bg-[#FEFEFE] rounded-[12px] text-center table-fixed drop-shadow ">
                    <thead>
                        <tr class="h-[70px]">
                            <th class="px-2 py-2 font-semibold w-[4%] ">번호</th>
                            <th class="px-2 py-2 font-semibold w-[9%] ">소속교육지원청</th>
                            <th class="px-2 py-2 font-semibold w-[9%] ">직장명</th>
                            <th class="px-2 py-2 font-semibold w-[6%] ">이름</th>
                            <th class="px-2 py-2 font-semibold w-[8%] ">생년월일</th>
                            <th class="px-2 py-2 font-semibold w-[7%] ">직급</th>
                            <th class="px-2 py-2 font-semibold w-[4%] ">설립</th>
                            <th class="px-2 py-2 font-semibold w-[7%] ">과목</th>
                            <th class="px-2 py-2 font-semibold w-[8%] ">직무 · 종목</th>
                            <th class="px-2 py-2 font-semibold w-[15%] ">과정명</th>
                            <th class="px-2 py-2 font-semibold w-[6%] ">요일</th>
                            <th class="px-2 py-2 font-semibold w-[9%] ">교육장소</th>
                            <th class="px-2 py-2 font-semibold w-[8%] ">입금내역</th>
                        </tr>
                    </thead>
                </table>

                <!-- 테이블 본문 부분 -->
                <table
                    class="table-fixed w-full rounded-[12px] overflow-hidden text-center mt-4 bg-[#FEFEFE]">
                    <tbody>
                        <tr class="bg-[#FEFEFE] h-[110px] border-b">
                            <td class="px-2 py-2 w-[4%] text-[#727272]">333</td>
                            <td class="px-2 py-2 w-[9%] text-[#727272]">본청</td>
                            <td class="px-2 py-2 w-[9%] text-[#727272]">누원고</td>
                            <td class="w-[6%] text-[#2B5BBB]">
                                <a class="font-semibold hover:underline openInfoModal" href="#">가나다라</a>
                            </td>
                            <td class="px-2 py-2 w-[8%] text-[#727272] leading-tight">1987-12-02</td>
                            <td class="px-2 py-2 w-[7%] text-[#727272]">주무관</td>
                            <td class="px-2 py-2 w-[4%] text-[#727272]">공립</td>
                            <td class="px-2 py-2 w-[7%] text-[#727272]">교육행정</td>
                            <td class="px-2 py-2 w-[8%] text-[#727272]">
                                <div class="flex flex-col items-center gap-2">
                                    <div
                                        class="bg-[#FEFEFE] text-[16px] text-[#2B5BBB] border border-[#2B5BBB] rounded-lg text-center px-3 py-1">
                                        자율
                                    </div>
                                    <div
                                        class="bg-[#4EC3E8] text-[16px] text-[#FEFEFE] border border-[#4EC3E8] rounded-lg text-center px-3 py-1">
                                        필라테스
                                    </div>
                                </div>
                            </td>
                            <td class="px-2 py-2 w-[15%] text-[#727272] text-left">꿈을 펼치는 라틴 초중급</td>
                            <td class="px-2 py-2 w-[6%] text-[#727272]">월요일</td>
                            <td class="px-2 py-2 w-[9%] text-[#727272]">서울디자인고</td>
                            <td class="px-2 py-2 w-[8%]">
                                <div class="flex justify-center items-center">
                                    <div
                                        class="bg-[#F34457] text-[16px] text-[#FEFEFE] flex justify-center items-center align-middle px-3 py-1 rounded-sm">
                                        미입금
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="bg-[#F8F8F8] h-[110px] border-b">
                            <td class="px-2 py-2 w-[4%] text-[#727272]">333</td>
                            <td class="px-2 py-2 w-[9%] text-[#727272]">화성오산</td>
                            <td class="px-2 py-2 w-[9%] text-[#727272]">배곧해솔</td>
                            <td class="w-[6%] text-[#2B5BBB]">
                                <a class="font-semibold hover:underline openInfoModal" href="#">가나다라</a>
                            </td>
                            <td class="px-2 py-2 w-[8%] text-[#727272] leading-tight">1987-12-02</td>
                            <td class="px-2 py-2 w-[7%] text-[#727272]">기간제</td>
                            <td class="px-2 py-2 w-[4%] text-[#727272]">공립</td>
                            <td class="px-2 py-2 w-[7%] text-[#727272]">보건</td>
                            <td class="px-2 py-2 w-[8%] text-[#727272]">
                                <div class="flex flex-col items-center gap-2">
                                    <div
                                        class="bg-[#FEFEFE] text-[16px] text-[#2B5BBB] border border-[#2B5BBB] rounded-lg text-center px-3 py-1">
                                        서울
                                    </div>
                                    <div
                                        class="bg-[#4E9DFB] text-[16px] text-[#FEFEFE] border border-[#4E9DFB] rounded-lg text-center px-3 py-1">
                                        댄스스포츠
                                    </div>
                                </div>
                            </td>
                            <td class="px-2 py-2 w-[15%] text-[#727272] text-left">라틴2급자격 자이브</td>
                            <td class="px-2 py-2 w-[6%] text-[#727272]">해당없음</td>
                            <td class="px-2 py-2 w-[9%] text-[#727272]">서울디자인고</td>
                            <td class="px-2 py-2 w-[8%]">
                                <div class="flex justify-center items-center">
                                    <div
                                        class="bg-[#22BEB5] text-[16px] text-[#FEFEFE] flex justify-center items-center align-middle px-3 py-1 rounded-sm">
                                        입금
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="bg-[#FEFEFE] h-[110px] border-b">
                            <td class="px-2 py-2 w-[4%] text-[#727272]">333</td>
                            <td class="px-2 py-2 w-[9%] text-[#727272]">강남서초</td>
                            <td class="px-2 py-2 w-[9%] text-[#727272]">영신</td>
                            <td class="w-[6%] text-[#2B5BBB]">
                                <a class="font-semibold hover:underline openInfoModal" href="#">가나다라</a>
                            </td>
                            <td class="px-2 py-2 w-[8%] text-[#727272] leading-tight">1987-12-02</td>
                            <td class="px-2 py-2 w-[7%] text-[#727272]">설립자</td>
                            <td class="px-2 py-2 w-[4%] text-[#727272]">공립</td>
                            <td class="px-2 py-2 w-[7%] text-[#727272]">음악</td>
                            <td class="px-2 py-2 w-[8%] text-[#727272]">
                                <div class="flex flex-col items-center gap-2">
                                    <div
                                        class="bg-[#FEFEFE] text-[16px] text-[#2B5BBB] border border-[#2B5BBB] rounded-lg text-center px-3 py-1">
                                        경기
                                    </div>
                                    <div
                                        class="bg-[#AFE7E0] text-[16px] text-[#292929] border border-[#AFE7E0] rounded-lg text-center px-3 py-1">
                                        웰빙댄스
                                    </div>
                                </div>
                            </td>
                            <td class="px-2 py-2 w-[15%] text-[#727272] text-left">라인댄스중급</td>
                            <td class="px-2 py-2 w-[6%] text-[#727272]">목요일</td>
                            <td class="px-2 py-2 w-[9%] text-[#727272]">서울디자인고</td>
                            <td class="px-2 py-2 w-[8%]">
                                <div class="flex justify-center items-center">
                                    <div
                                        class="bg-[#22BEB5] text-[16px] text-[#FEFEFE] flex justify-center items-center align-middle px-3 py-1 rounded-sm">
                                        입금
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="bg-[#F8F8F8] h-[110px] border-b">
                            <td class="px-2 py-2 w-[4%] text-[#727272]">333</td>
                            <td class="px-2 py-2 w-[9%] text-[#727272]">수원</td>
                            <td class="px-2 py-2 w-[9%] text-[#727272]">영덕</td>
                            <td class="w-[6%] text-[#2B5BBB]">
                                <a class="font-semibold hover:underline openInfoModal" href="#">가나다라</a>
                            </td>
                            <td class="px-2 py-2 w-[8%] text-[#727272] leading-tight">1987-12-02</td>
                            <td class="px-2 py-2 w-[7%] text-[#727272]">교장</td>
                            <td class="px-2 py-2 w-[4%] text-[#727272]">공립</td>
                            <td class="px-2 py-2 w-[7%] text-[#727272]">음악</td>
                            <td class="px-2 py-2 w-[8%] text-[#727272]">
                                <div class="flex flex-col items-center gap-2">
                                    <div
                                        class="bg-[#FEFEFE] text-[16px] text-[#2B5BBB] border border-[#2B5BBB] rounded-lg text-center px-3 py-1">
                                        경기
                                    </div>
                                    <div
                                        class="bg-[#4E9DFB] text-[16px] text-[#FEFEFE] border border-[#4E9DFB] rounded-lg text-center px-3 py-1">
                                        댄스스포츠
                                    </div>
                                </div>
                            </td>
                            <td class="px-2 py-2 w-[15%] text-[#727272] text-left">필라테스초중급</td>
                            <td class="px-2 py-2 w-[6%] text-[#727272]">일요일</td>
                            <td class="px-2 py-2 w-[9%] text-[#727272]">서울디자인고</td>
                            <td class="px-2 py-2 w-[8%]">
                                <div class="flex justify-center items-center">
                                    <div
                                        class="bg-[#22BEB5] text-[16px] text-[#FEFEFE] flex justify-center items-center align-middle px-3 py-1 rounded-sm">
                                        입금
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="bg-[#FEFEFE] h-[110px] border-b">
                            <td class="px-2 py-2 w-[4%] text-[#727272]">333</td>
                            <td class="px-2 py-2 w-[9%] text-[#727272]">북부</td>
                            <td class="px-2 py-2 w-[9%] text-[#727272]">평택여자</td>
                            <td class="w-[7%] text-[#2B5BBB]">
                                <a class="font-semibold hover:underline openInfoModal" href="#">가나다라</a>
                            </td>
                            <td class="px-2 py-2 w-[8%] text-[#727272] leading-tight">1987-12-02</td>
                            <td class="px-2 py-2 w-[7%] text-[#727272]">교육공무직</td>
                            <td class="px-2 py-2 w-[4%] text-[#727272]">공립</td>
                            <td class="px-2 py-2 w-[7%] text-[#727272]">정보컴퓨터</td>
                            <td class="px-2 py-2 w-[8%] text-[#727272]">
                                <div class="flex flex-col items-center gap-2">
                                    <div
                                        class="bg-[#FEFEFE] text-[16px] text-[#2B5BBB] border border-[#2B5BBB] rounded-lg text-center px-3 py-1">
                                        자율
                                    </div>
                                    <div
                                        class="bg-[#4E9DFB] text-[16px] text-[#FEFEFE] border border-[#4E9DFB] rounded-lg text-center px-3 py-1">
                                        댄스스포츠
                                    </div>
                                </div>
                            </td>
                            <td class="px-2 py-2 w-[15%] text-[#727272] text-left">라틴심화 룸바</td>
                            <td class="px-2 py-2 w-[6%] text-[#727272]">해당없음</td>
                            <td class="px-2 py-2 w-[9%] text-[#727272]">서울디자인고</td>
                            <td class="px-2 py-2 w-[8%]">
                                <div class="flex justify-center items-center">
                                    <div
                                        class="bg-[#F34457] text-[16px] text-[#FEFEFE] flex justify-center items-center align-middle px-3 py-1 rounded-sm">
                                        미입금
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="bg-[#F8F8F8] h-[110px] border-b">
                            <td class="px-2 py-2 w-[4%] text-[#727272]">333</td>
                            <td class="px-2 py-2 w-[9%] text-[#727272]">구리남양주</td>
                            <td class="px-2 py-2 w-[9%] text-[#727272]">발안바이오과학</td>
                            <td class="w-[6%] text-[#2B5BBB]">
                                <a class="font-semibold hover:underline openInfoModal" href="#">가나다라</a>
                            </td>
                            <td class="px-2 py-2 w-[8%] text-[#727272] leading-tight">1987-12-02</td>
                            <td class="px-2 py-2 w-[7%] text-[#727272]">퇴직교사</td>
                            <td class="px-2 py-2 w-[4%] text-[#727272]">공립</td>
                            <td class="px-2 py-2 w-[7%] text-[#727272]">일본어</td>
                            <td class="px-2 py-2 w-[8%] text-[#727272]">
                                <div class="flex flex-col items-center gap-2">
                                    <div
                                        class="bg-[#FEFEFE] text-[16px] text-[#2B5BBB] border border-[#2B5BBB] rounded-lg text-center px-3 py-1">
                                        자율
                                    </div>
                                    <div
                                        class="bg-[#8B98F5] text-[16px] text-[#FEFEFE] border border-[#8B98F5] rounded-lg text-center px-3 py-1">
                                        라인댄스
                                    </div>
                                </div>
                            </td>
                            <td class="px-2 py-2 w-[15%] text-[#727272] text-left">모던2급자격 퀵스텝</td>
                            <td class="px-2 py-2 w-[6%] text-[#727272]">화요일</td>
                            <td class="px-2 py-2 w-[9%] text-[#727272]">서울디자인고</td>
                            <td class="px-2 py-2 w-[8%]">
                                <div class="flex justify-center items-center">
                                    <div
                                        class="bg-[#22BEB5] text-[16px] text-[#FEFEFE] flex justify-center items-center align-middle px-3 py-1 rounded-sm">
                                        입금
                                    </div>
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useState } from '#app'

    const pageTitle = useState('pageTitle')
    pageTitle.value = '과정출석부'
</script>