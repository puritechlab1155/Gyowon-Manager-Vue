<template>
    <div class="pt-5 pb-5">
        <div class="max-lg:flex max-lg:flex-col-reverse">
            <div
                class="w-full flex justify-end max-lg:mt-[20px] max-2xl:flex-col max-2xl:items-stretch max-2xl:gap-5 max-xl:flex-col-reverse">
                <div id="selectedFilters"
                    class="flex h-auto gap-2 mt-2 block lg:hidden whitespace-nowrap overflow-x-auto no-scrollbar">
                </div>
                <!-- right-content (탭들) -->
                <div class="right-content flex justify-end text-lg gap-2 max-2xl:self-end max-lg:justify-between max-lg:w-full">
                    <div class="flex justify-between gap-2 max-lg:hidden">
                        <DropYear v-model="selectedYear"/>
                        <DropSemester v-model="selectedSemester"/>
                        <DropCourse v-model="selectedCourse"/>
                        <DropEduPlace v-model="selectedEduPlace"/>
                        <DropDay v-model="selectedDay"/>
                        <DropRound v-model="selectedRound"/>
                        <DropPayStatus v-model="selectedPayStatus"/>
                    </div>
                    <div
                    class=" flex justify-between items-center max-lg:grid max-lg:grid-cols-5 max-lg:gap-2 max-lg:w-full">
                    <div class="max-lg:col-span-4 w-full">
                        <SearchBar placeholder="과정명을 입력하세요." @search="searchQuery = $event"/>
                    </div>
                    <div class="filter hidden max-lg:block">
                        <button id="filterButton w-full max-lg:col-span-1 "
                            class="text-[#202020] flex justify-between items-center px-1 py-3 max-sm:py-2 w-full rounded-md bg-[#ECECEC]">
                            <div class="w-14 text-center min-w-[30px]">필터</div>
                            <img class="w-8 h-6" src="../../assets/img/filter.png" alt="필터 아이콘" />
                        </button>
                    </div>
                </div>

                </div>
            </div>
            <div class="flex justify-between mt-5 gap-2 max-sm:flex-col-reverse">
            <!-- left-content -->
            <div class="left-content flex items-center justify-between max-sm:justify-start gap-2">
                <!-- <button id="selectAllBtn" class="left-content flex items-center justify-center gap-2 pl-5 pr-5 rounded-lg focus:outline-none whitespace-nowrap"> -->
                <CheckboxAll
                    :modelValue="isAllSelected"
                    @update:modelValue="toggleSelectAll"
                />         
                <DropPayStatus v-model="selectedPayStatus" width="105px" height="50px"/>
                <BtnUpdate @click="onApply" />
            </div>
                <!-- right-content (탭들) -->
                <div
                    class="right-content flex justify-end max-sm:justify-start">
                    <BtnExcel :targetTableId="tableId" :filename="fileName" :headerTableId="tableHeaderId"/>
                </div>
            </div>
        </div>
        <!-- <p class="mt-4 text-gray-700">선택된 년도: {{ selectedYear }}</p>
        <p class="mt-4 text-gray-700">선택된 학기: {{ selectedSemester }}</p>
        <p class="mt-4 text-gray-700">선택된 과정명: {{ selectedCourse }}</p>
        <p class="mt-4 text-gray-700">선택된 교육장소: {{ selectedEduPlace }}</p>
        <p class="mt-4 text-gray-700">선택된 요일: {{ selectedDay }}</p>
        <p class="mt-4 text-gray-700">선택된 회차: {{ selectedRound }}</p>
        <p class="mt-4 text-gray-700">선택된 상태: {{ selectedPayStatus }}</p> -->
        <div class="flex justify-between mt-5 maxlg:mt-2 border-b border-b-[#2B5BBB] border-b-[2px]">
            <div class="flex space-x-4 overflow-x-auto whitespace-nowrap no-scrollbar">
                <button
                    class="tab flex items-center gap-2 px-4 py-2 bg-[#2B5BBB] rounded-t-lg hover:text-[#FEFEFE] hover:font-semibold focus:text-[#FEFEFE] focus:font-semibold focus:outline-none">
                    <span class="text-[16px] text-[#FEFEFE] font-semibold">
                        전체
                    </span>
                    <span
                        class="flex font-semibold items-center justify-center bg-[#FEFEFE] rounded-md px-2 text-[#2B5BBB] text-[12px] leading-5">
                        186
                    </span>
                </button>
                <button
                    class="tab group flex items-center bg-[#D3E1FB] gap-2 px-4 py-2 border-2 border-transparent rounded-t-lg hover:text-[#2B5BBB] hover:bg-[#2B5BBB] focus:text-[#FEFEFE] focus:bg-[#2B5BBB] focus:font-semibold focus:outline-none">
                    <span
                        class="text-[16px] text-[#292929] font-medium group-hover:text-[#FEFEFE] group-focus:font-semibold group-focus:text-[#FEFEFE]">
                        입금 </span>
                    <span
                        class="flex font-semibold items-center justify-center bg-[#2B5BBB] text-[#FEFEFE] group-focus:bg-[#FEFEFE] group-hover:bg-[#FEFEFE] group-hover:text-[#2B5BBB]  group-focus:text-[#2B5BBB] rounded-md px-2 text-[#727272] text-[12px] leading-5">
                        120
                    </span>
                </button>
                <button
                class="tab group flex items-center bg-[#D3E1FB] gap-2 px-4 py-2 border-2 border-transparent rounded-t-lg hover:text-[#2B5BBB] hover:bg-[#2B5BBB] focus:text-[#FEFEFE] focus:bg-[#2B5BBB] focus:font-semibold focus:outline-none">
                    <span
                    class="text-[16px] text-[#292929] font-medium group-hover:text-[#FEFEFE] group-focus:font-semibold group-focus:text-[#FEFEFE]">
                        미입금 </span>
                    <span
                    class="flex font-semibold items-center justify-center bg-[#2B5BBB] text-[#FEFEFE] group-focus:bg-[#FEFEFE] group-hover:bg-[#FEFEFE] group-hover:text-[#2B5BBB]  group-focus:text-[#2B5BBB] rounded-md px-2 text-[#727272] text-[12px] leading-5">
                        120
                    </span>
                </button>
                <button
                class="tab group flex items-center bg-[#D3E1FB] gap-2 px-4 py-2 border-2 border-transparent rounded-t-lg hover:text-[#2B5BBB] hover:bg-[#2B5BBB] focus:text-[#FEFEFE] focus:bg-[#2B5BBB] focus:font-semibold focus:outline-none">
                    <span
                    class="text-[16px] text-[#292929] font-medium group-hover:text-[#FEFEFE] group-focus:font-semibold group-focus:text-[#FEFEFE]">
                        수강대기 </span>
                    <span
                        class="flex font-semibold items-center justify-center bg-[#2B5BBB] text-[#FEFEFE] group-focus:bg-[#FEFEFE] group-hover:bg-[#FEFEFE] group-hover:text-[#2B5BBB]  group-focus:text-[#2B5BBB] rounded-md px-2 text-[#727272] text-[12px] leading-5">
                        17
                    </span>
                </button>
                <button
                class="tab group flex items-center bg-[#D3E1FB] gap-2 px-4 py-2 border-2 border-transparent rounded-t-lg hover:text-[#2B5BBB] hover:bg-[#2B5BBB] focus:text-[#FEFEFE] focus:bg-[#2B5BBB] focus:font-semibold focus:outline-none">
                    <span
                    class="text-[16px] text-[#292929] font-medium group-hover:text-[#FEFEFE] group-focus:font-semibold group-focus:text-[#FEFEFE]">
                        수강확정 </span>
                    <span
                        class="flex font-semibold items-center justify-center bg-[#2B5BBB] text-[#FEFEFE] group-focus:bg-[#FEFEFE] group-hover:bg-[#FEFEFE] group-hover:text-[#2B5BBB]  group-focus:text-[#2B5BBB] rounded-md px-2 text-[#727272] text-[12px] leading-5">
                        120
                    </span>
                </button>
                <button
                class="tab group flex items-center bg-[#D3E1FB] gap-2 px-4 py-2 border-2 border-transparent rounded-t-lg hover:text-[#2B5BBB] hover:bg-[#2B5BBB] focus:text-[#FEFEFE] focus:bg-[#2B5BBB] focus:font-semibold focus:outline-none">
                    <span
                        class="text-[16px] text-[#292929] font-medium group-hover:text-[#FEFEFE] group-focus:font-semibold group-focus:text-[#FEFEFE]">
                        수강취소 </span>
                    <span
                        class="flex font-semibold items-center justify-center bg-[#2B5BBB] text-[#FEFEFE] group-focus:bg-[#FEFEFE] group-hover:bg-[#FEFEFE] group-hover:text-[#2B5BBB]  group-focus:text-[#2B5BBB] rounded-md px-2 text-[#727272] text-[12px] leading-5">
                        36
                    </span>
                </button>
                <button
                class="tab group flex items-center bg-[#D3E1FB] gap-2 px-4 py-2 border-2 border-transparent rounded-t-lg hover:text-[#2B5BBB] hover:bg-[#2B5BBB] focus:text-[#FEFEFE] focus:bg-[#2B5BBB] focus:font-semibold focus:outline-none">
                    <span
                        class="text-[16px] text-[#292929] font-medium group-hover:text-[#FEFEFE] group-focus:font-semibold group-focus:text-[#FEFEFE]">
                        수강연기 </span>
                    <span
                        class="flex font-semibold items-center justify-center bg-[#2B5BBB] text-[#FEFEFE] group-focus:bg-[#FEFEFE] group-hover:bg-[#FEFEFE] group-hover:text-[#2B5BBB]  group-focus:text-[#2B5BBB] rounded-md px-2 text-[#727272] text-[12px] leading-5">
                        137
                    </span>
                </button>
                <button
                class="tab group flex items-center bg-[#D3E1FB] gap-2 px-4 py-2 border-2 border-transparent rounded-t-lg hover:text-[#2B5BBB] hover:bg-[#2B5BBB] focus:text-[#FEFEFE] focus:bg-[#2B5BBB] focus:font-semibold focus:outline-none">
                    <span
                        class="text-[16px] text-[#292929] font-medium group-hover:text-[#FEFEFE] group-focus:font-semibold group-focus:text-[#FEFEFE]">
                        환불 </span>
                    <span
                        class="flex font-semibold items-center justify-center bg-[#2B5BBB] text-[#FEFEFE] group-focus:bg-[#FEFEFE] group-hover:bg-[#FEFEFE] group-hover:text-[#2B5BBB]  group-focus:text-[#2B5BBB] rounded-md px-2 text-[#727272] text-[12px] leading-5">
                        17
                    </span>
                </button>
            </div>
        </div>
    </div>

    <div class="w-full">
        <div class="overflow-x-auto">
            <div class="min-w-[1280px]">
                <!-- 테이블 헤더 부분 -->
                <table class="w-full bg-[#FEFEFE] rounded-[12px] text-center table-fixed drop-shadow ">
                    <thead>
                        <tr class="h-[70px]">
                            <th class="px-2 py-2 font-semibold w-[4%]" id="selectAllBtn">
                                선택
                            </th>
                            <th class="px-2 py-2 font-semibold w-[4%]">번호</th>
                            <th class="px-2 py-2 font-semibold w-[9%]">직무 · 종목</th>
                            <th class="px-2 py-2 font-semibold w-[15%]">과정명</th>
                            <th class="px-2 py-2 font-semibold w-[6%]">이름</th>
                            <th class="px-2 py-2 font-semibold w-[15%]">직장명</th>
                            <th class="px-2 py-2 font-semibold w-[9%]">교육장소</th>
                            <th class="px-2 py-2 font-semibold w-[8%]">연수기간</th>
                            <th class="px-2 py-2 font-semibold w-[6%]">요일</th>
                            <th class="px-2 py-2 font-semibold w-[5%]">회차</th>
                            <th class="px-2 py-2 font-semibold w-[9%]">입금내역</th>
                            <th class="px-2 py-2 font-semibold w-[10%]">관리</th>
                        </tr>
                    </thead>
                </table>

                <!-- 테이블 본문 부분 -->
                <table id="excelTable"
                    class="table-fixed w-full rounded-[12px] overflow-hidden text-center mt-4 bg-[#FEFEFE]">
                    <tbody>
                        <tr class="bg-[#FEFEFE] h-[120px] border-b border-dashed">
                            <td class="px-2 py-2 w-[4%] text-[#727272]">
                                <input type="checkbox" class="check-target font-semibold w-5 h-5 appearance-none border border-[#2B5BBB] rounded-sm bg-[#FEFEFE] relative align-middle
                                    checked:bg-[#2B5BBB] checked:border-[#2B5BBB]
                                    checked:after:content-['✓'] checked:after:text-white
                                    checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 
                                    checked:after:-translate-x-1/2 checked:after:-translate-y-1/2
                                    checked:after:text-[16px]
                                    self-center" />
                            </td>
                            <td class="px-2 py-2 w-[4%] text-[#727272]">333</td>
                            <td class="px-2 py-2 w-[9%] text-[#727272]">
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
                            <td class="px-2 py-2 w-[15%] text-[#727272] text-left">꿈을 펼치는 라틴 초중급</td>
                            <td class="px-2 py-2 w-[6%] text-[#292929] font-semibold ">가나다라</td>
                            <td class="px-2 py-2 w-[15%] text-[#727272]">중앙대학교 사범대학 부속고</td>
                            <td class="px-2 py-2 w-[9%] text-[#727272]">서울디자인고</td>
                            <td class="px-2 py-2 w-[8%] text-[#727272] leading-tight">25.04.08 <br /> -
                                <br/>
                                25.07.08</td>
                            <td class="px-2 py-2 w-[6%] text-[#727272]">해당없음</td>
                            <td class="px-2 py-2 w-[5%] text-[#727272]">0차</td>
                            <td class="px-2 py-2 w-[9%]">
                                <div class="text-[#727272]">25.04.09</div>
                                <!-- 미입금일 경우 영수증 아이콘 없음 / 메모작업 없을 경우 코멘트 아이콘 없음 -->
                                <div class="flex justify-center gap-2 px-2 mt-2">
                                    <div class="relative group">
                                        <button
                                            class="openReceiptSlide bg-[#E7F7F6] flex justify-center items-center p-2 rounded-lg">
                                            <img src="../../assets/img/receipt.png" alt="영수증 아이콘" class="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>
                            </td>
                            <td class="px-2 py-2 w-[10%]">
                                <div class="flex justify-center gap-2 px-2">
                                    <button type="button"
                                        class="editModalBtn bg-[#FFF3E5] flex justify-center items-center align-middle hover:bg-[#FFECBA] p-3 rounded-lg">
                                        <span class="inline-block align-middle">
                                            <img src="../../assets/img/pen.png" alt="수정 아이콘" class="w-5 h-5" />
                                        </span>
                                    </button>
                                    <button type="button"
                                        class="deleteButton bg-[#FFEFF1] flex justify-center items-center align-middle hover:bg-[#FFDFE3] p-2.5 rounded-lg">
                                        <span class="inline-block align-middle">
                                            <img src="../../assets/img/training-mgmt/delete.png" alt="삭제 아이콘"
                                                class="w-6 h-6" />
                                        </span>
                                    </button>
                                </div>
                                <div class="flex justify-center items-center mt-2">
                                    <div class="relative dropdown w-[100px]">
                                        <button
                                            class="dropdown-button w-full bg-[#FFFFFF] border border-[1px] border-[#DBDEE3] focus:border-[#2B5BBB] text-[#727272] py-2.5 px-2 pr-1 rounded-md focus:outline-none flex justify-between items-center 0">
                                            <span
                                                class="selected-option text-[18px] text-[#727272] whitespace-nowrap text-[16px] max-sm:text-sm">수강현황</span>
                                            <svg class="w-5 h-5 text-[#292929] flex-shrink-0"
                                                xmlns="http://www.w3.org/2000/svg" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    stroke-width="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        <!-- 드롭다운 옵션 -->
                                        <div
                                            class="text-[16px] dropdown-menu absolute left-0 w-full bg-[#FAFAFA] border border-[#DBDEE3] rounded-md shadow-lg hidden max-h-[200px] overflow-y-auto">
                                            <div
                                                class="dropdown-item px-2 py-2 cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap max-sm:text-sm">
                                                대기</div>
                                            <div
                                                class="dropdown-item px-2 py-2 truncate cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap max-sm:text-sm">
                                                확정</div>
                                            <div
                                                class="dropdown-item px-2 py-2 truncate cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap max-sm:text-sm">
                                                취소</div>
                                            <div
                                                class="dropdown-item px-2 py-2 truncate cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap max-sm:text-sm">
                                                연기</div>
                                            <div
                                                class="dropdown-item px-2 py-2 truncate cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap max-sm:text-sm">
                                                연기금</div>
                                            <div
                                                class="dropdown-item px-2 py-2 truncate cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap max-sm:text-sm">
                                                환불</div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="bg-[#FEFEFE] h-[50px] border-b w-[100%]">
                            <td colspan="13" class="px-2 py-2">
                                <span class="text-[#F44336] whitespace-nowrap mr-4">7만원 입금 3만원 부족</span>
                                <span class="text-[#2196F3] whitespace-nowrap mr-4">2종목 할인</span>
                                <span class="text-black whitespace-nowrap">전액연기</span>
                            </td>
                        </tr>
                        <tr class="bg-[#F8F8F8] h-[120px] border-b border-dashed">
                            <td class="px-2 py-2 w-[4%] text-[#727272]">
                                <input type="checkbox" class="check-target font-semibold w-5 h-5 appearance-none border border-[#2B5BBB] rounded-sm bg-[#FEFEFE] relative align-middle
                                    checked:bg-[#2B5BBB] checked:border-[#2B5BBB]
                                    checked:after:content-['✓'] checked:after:text-white
                                    checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 
                                    checked:after:-translate-x-1/2 checked:after:-translate-y-1/2
                                    checked:after:text-[16px]
                                    self-center" />
                            </td>
                            <td class="px-2 py-2 w-[4%] text-[#727272]">333</td>
                            <td class="px-2 py-2 w-[9%] text-[#727272]">
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
                            <td class="px-2 py-2 w-[15%] text-[#727272] text-left">꿈을 펼치는 라틴 초중급</td>
                            <td class="px-2 py-2 w-[6%] text-[#292929] font-semibold ">가나다라</td>
                            <td class="px-2 py-2 w-[15%] text-[#727272]">중앙대학교 사범대학 부속고</td>
                            <td class="px-2 py-2 w-[9%] text-[#727272]">서울디자인고</td>
                            <td class="px-2 py-2 w-[8%] text-[#727272] leading-tight">25.04.08 <br /> -
                                <br/>
                                25.07.08</td>
                            <td class="px-2 py-2 w-[6%] text-[#727272]">수요일</td>
                            <td class="px-2 py-2 w-[5%] text-[#727272]">0차</td>
                            <td class="px-2 py-2 w-[9%]">
                                <div class="text-[#727272]">25.04.09</div>
                                <div class="flex justify-center gap-2 px-2 mt-2">
                                    <div class="relative group">
                                        <button
                                            class="openReceiptSlide bg-[#E7F7F6] flex justify-center items-center p-2 rounded-lg">
                                            <img src="../../assets/img/receipt.png" alt="영수증 아이콘" class="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>
                            </td>
                            <td class="px-2 py-2 w-[10%]">
                                <div class="flex justify-center gap-2 px-2">
                                    <button type="button"
                                        class="editModalBtn bg-[#FFF3E5] flex justify-center items-center align-middle hover:bg-[#FFECBA] p-3 rounded-lg">
                                        <span class="inline-block align-middle">
                                            <img src="../../assets/img/pen.png" alt="수정 아이콘" class="w-5 h-5" />
                                        </span>
                                    </button>
                                    <button type="button"
                                        class="deleteButton bg-[#FFEFF1] flex justify-center items-center align-middle hover:bg-[#FFDFE3] p-2.5 rounded-lg">
                                        <span class="inline-block align-middle">
                                            <img src="../../assets/img/training-mgmt/delete.png" alt="삭제 아이콘"
                                                class="w-6 h-6" />
                                        </span>
                                    </button>
                                </div>
                                <div class="flex justify-center items-center mt-2">
                                    <div class="relative dropdown w-[100px]">
                                        <button
                                            class="dropdown-button w-full bg-[#FFFFFF] border border-[1px] border-[#DBDEE3] focus:border-[#2B5BBB] text-[#727272] py-2.5 px-2 pr-1 rounded-md focus:outline-none flex justify-between items-center 0">
                                            <span
                                                class="selected-option text-[18px] text-[#727272] whitespace-nowrap text-[16px] max-sm:text-sm">수강현황</span>
                                            <svg class="w-5 h-5 text-[#292929] flex-shrink-0"
                                                xmlns="http://www.w3.org/2000/svg" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    stroke-width="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        <!-- 드롭다운 옵션 -->
                                        <div
                                            class="text-[16px] dropdown-menu absolute left-0 w-full bg-[#FAFAFA] border border-[#DBDEE3] rounded-md shadow-lg hidden max-h-[200px] overflow-y-auto">
                                            <div
                                                class="dropdown-item px-2 py-2 cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap max-sm:text-sm">
                                                대기</div>
                                            <div
                                                class="dropdown-item px-2 py-2 truncate cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap max-sm:text-sm">
                                                확정</div>
                                            <div
                                                class="dropdown-item px-2 py-2 truncate cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap max-sm:text-sm">
                                                취소</div>
                                            <div
                                                class="dropdown-item px-2 py-2 truncate cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap max-sm:text-sm">
                                                연기</div>
                                            <div
                                                class="dropdown-item px-2 py-2 truncate cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap max-sm:text-sm">
                                                연기금</div>
                                            <div
                                                class="dropdown-item px-2 py-2 truncate cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap max-sm:text-sm">
                                                환불</div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="bg-[#F8F8F8] h-[50px] border-b w-[100%]">
                            <td colspan="13" class="px-2 py-2">
                                <!-- <span class="text-[#F44336] whitespace-nowrap mr-4">7만원 입금 3만원 부족</span>
                                <span class="text-[#2196F3] whitespace-nowrap mr-4">2종목 할인</span>
                                <span class="text-black whitespace-nowrap">전액연기</span> -->
                            </td>
                        </tr>
                        <tr class="bg-[#FEFEFE] h-[120px] border-b border-dashed">
                            <td class="px-2 py-2 w-[4%] text-[#727272]">
                                <input type="checkbox" class="check-target font-semibold w-5 h-5 appearance-none border border-[#2B5BBB] rounded-sm bg-[#FEFEFE] relative align-middle
                                    checked:bg-[#2B5BBB] checked:border-[#2B5BBB]
                                    checked:after:content-['✓'] checked:after:text-white
                                    checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 
                                    checked:after:-translate-x-1/2 checked:after:-translate-y-1/2
                                    checked:after:text-[16px]
                                    self-center" />
                            </td>
                            <td class="px-2 py-2 w-[4%] text-[#727272]">333</td>
                            <td class="px-2 py-2 w-[9%] text-[#727272]">
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
                            <td class="px-2 py-2 w-[15%] text-[#727272] text-left">꿈을 펼치는 라틴 초중급</td>
                            <td class="px-2 py-2 w-[6%] text-[#292929] font-semibold ">가나다라</td>
                            <td class="px-2 py-2 w-[15%] text-[#727272]">중앙대학교 사범대학 부속고</td>
                            <td class="px-2 py-2 w-[9%] text-[#727272]">서울디자인고</td>
                            <td class="px-2 py-2 w-[8%] text-[#727272] leading-tight">25.04.08 <br /> -
                                <br />
                                25.07.08</td>
                            <td class="px-2 py-2 w-[6%] text-[#727272]">수요일</td>
                            <td class="px-2 py-2 w-[5%] text-[#727272]">0차</td>
                            <td class="px-2 py-2 w-[9%]">
                                <div class="text-[#727272]"> - </div> 
                            </td>
                            <td class="px-2 py-2 w-[10%]">
                                <div class="flex justify-center gap-2 px-2">
                                    <button type="button"
                                        class="editModalBtn bg-[#FFF3E5] flex justify-center items-center align-middle hover:bg-[#FFECBA] p-3 rounded-lg">
                                        <span class="inline-block align-middle">
                                            <img src="../../assets/img/pen.png" alt="수정 아이콘" class="w-5 h-5" />
                                        </span>
                                    </button>
                                    <button type="button"
                                        class="deleteButton bg-[#FFEFF1] flex justify-center items-center align-middle hover:bg-[#FFDFE3] p-2.5 rounded-lg">
                                        <span class="inline-block align-middle">
                                            <img src="../../assets/img/training-mgmt/delete.png" alt="삭제 아이콘"
                                                class="w-6 h-6" />
                                        </span>
                                    </button>
                                </div>
                                <div class="flex justify-center items-center mt-2">
                                    <div class="relative dropdown w-[100px]">
                                        <button
                                            class="dropdown-button w-full bg-[#FFFFFF] border border-[1px] border-[#DBDEE3] focus:border-[#2B5BBB] text-[#727272] py-2.5 px-2 pr-1 rounded-md focus:outline-none flex justify-between items-center 0">
                                            <span
                                                class="selected-option text-[18px] text-[#727272] whitespace-nowrap text-[16px] max-sm:text-sm">수강현황</span>
                                            <svg class="w-5 h-5 text-[#292929] flex-shrink-0"
                                                xmlns="http://www.w3.org/2000/svg" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    stroke-width="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        <!-- 드롭다운 옵션 -->
                                        <div
                                            class="text-[16px] dropdown-menu absolute left-0 w-full bg-[#FAFAFA] border border-[#DBDEE3] rounded-md shadow-lg hidden max-h-[200px] overflow-y-auto">
                                            <div
                                                class="dropdown-item px-2 py-2 cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap max-sm:text-sm">
                                                대기</div>
                                            <div
                                                class="dropdown-item px-2 py-2 truncate cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap max-sm:text-sm">
                                                확정</div>
                                            <div
                                                class="dropdown-item px-2 py-2 truncate cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap max-sm:text-sm">
                                                취소</div>
                                            <div
                                                class="dropdown-item px-2 py-2 truncate cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap max-sm:text-sm">
                                                연기</div>
                                            <div
                                                class="dropdown-item px-2 py-2 truncate cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap max-sm:text-sm">
                                                연기금</div>
                                            <div
                                                class="dropdown-item px-2 py-2 truncate cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap max-sm:text-sm">
                                                환불</div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="bg-[#FEFEFE] h-[50px] border-b w-[100%]">
                            <td colspan="13" class="px-2 py-2">
                                <!-- <span class="text-[#F44336] whitespace-nowrap mr-4">15만원 입금 3만원 부족</span> -->
                                <!-- <span class="text-[#2196F3] whitespace-nowrap mr-4">2종목 할인</span> -->
                                <span class="text-black whitespace-nowrap">전액연기</span>
                            </td>
                        </tr>
                        <tr class="bg-[#F8F8F8] h-[120px] border-b border-dashed">
                            <td class="px-2 py-2 w-[4%] text-[#727272]">
                                <input type="checkbox" class="check-target font-semibold w-5 h-5 appearance-none border border-[#2B5BBB] rounded-sm bg-[#FEFEFE] relative align-middle
                                    checked:bg-[#2B5BBB] checked:border-[#2B5BBB]
                                    checked:after:content-['✓'] checked:after:text-white
                                    checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 
                                    checked:after:-translate-x-1/2 checked:after:-translate-y-1/2
                                    checked:after:text-[16px]
                                    self-center" />
                            </td>
                            <td class="px-2 py-2 w-[4%] text-[#727272]">333</td>
                            <td class="px-2 py-2 w-[9%] text-[#727272]">
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
                            <td class="px-2 py-2 w-[15%] text-[#727272] text-left">꿈을 펼치는 라틴 초중급</td>
                            <td class="px-2 py-2 w-[6%] text-[#292929] font-semibold ">가나다라</td>
                            <td class="px-2 py-2 w-[15%] text-[#727272]">중앙대학교 사범대학 부속고</td>
                            <td class="px-2 py-2 w-[9%] text-[#727272]">서울디자인고</td>
                            <td class="px-2 py-2 w-[8%] text-[#727272] leading-tight">25.04.08 <br /> -
                                <br/>
                                25.07.08</td>
                            <td class="px-2 py-2 w-[6%] text-[#727272]">수요일</td>
                            <td class="px-2 py-2 w-[5%] text-[#727272]">0차</td>
                            <td class="px-2 py-2 w-[9%]">
                                <div class="text-[#727272]">25.04.09</div>
                                <div class="flex justify-center gap-2 px-2 mt-2">
                                    <div class="relative group">
                                        <button
                                            class="openReceiptSlide bg-[#E7F7F6] flex justify-center items-center p-2 rounded-lg">
                                            <img src="../../assets/img/receipt.png" alt="영수증 아이콘" class="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>
                            </td>
                            <td class="px-2 py-2 w-[10%]">
                                <div class="flex justify-center gap-2 px-2">
                                    <button type="button"
                                        class="editModalBtn bg-[#FFF3E5] flex justify-center items-center align-middle hover:bg-[#FFECBA] p-3 rounded-lg">
                                        <span class="inline-block align-middle">
                                            <img src="../../assets/img/pen.png" alt="수정 아이콘" class="w-5 h-5" />
                                        </span>
                                    </button>
                                    <button type="button"
                                        class="deleteButton bg-[#FFEFF1] flex justify-center items-center align-middle hover:bg-[#FFDFE3] p-2.5 rounded-lg">
                                        <span class="inline-block align-middle">
                                            <img src="../../assets/img/training-mgmt/delete.png" alt="삭제 아이콘"
                                                class="w-6 h-6" />
                                        </span>
                                    </button>
                                </div>
                                <div class="flex justify-center items-center mt-2">
                                    <div class="relative dropdown w-[100px]">
                                        <button
                                            class="dropdown-button w-full bg-[#FFFFFF] border border-[1px] border-[#DBDEE3] focus:border-[#2B5BBB] text-[#727272] py-2.5 px-2 pr-1 rounded-md focus:outline-none flex justify-between items-center 0">
                                            <span
                                                class="selected-option text-[18px] text-[#727272] whitespace-nowrap text-[16px] max-sm:text-sm">수강현황</span>
                                            <svg class="w-5 h-5 text-[#292929] flex-shrink-0"
                                                xmlns="http://www.w3.org/2000/svg" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    stroke-width="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        <!-- 드롭다운 옵션 -->
                                        <div
                                            class="text-[16px] dropdown-menu absolute left-0 w-full bg-[#FAFAFA] border border-[#DBDEE3] rounded-md shadow-lg hidden max-h-[200px] overflow-y-auto">
                                            <div
                                                class="dropdown-item px-2 py-2 cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap max-sm:text-sm">
                                                대기</div>
                                            <div
                                                class="dropdown-item px-2 py-2 truncate cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap max-sm:text-sm">
                                                확정</div>
                                            <div
                                                class="dropdown-item px-2 py-2 truncate cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap max-sm:text-sm">
                                                취소</div>
                                            <div
                                                class="dropdown-item px-2 py-2 truncate cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap max-sm:text-sm">
                                                연기</div>
                                            <div
                                                class="dropdown-item px-2 py-2 truncate cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap max-sm:text-sm">
                                                연기금</div>
                                            <div
                                                class="dropdown-item px-2 py-2 truncate cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap max-sm:text-sm">
                                                환불</div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="bg-[#F8F8F8] h-[50px] border-b w-[100%]">
                            <td colspan="13" class="px-2 py-2">
                                <span class="text-[#F44336] whitespace-nowrap mr-4">7만원 입금 3만원 부족</span>
                                <!-- <span class="text-[#2196F3] whitespace-nowrap mr-4">2종목 할인</span>
                                <span class="text-black whitespace-nowrap">전액연기</span> -->
                            </td>
                        </tr>
                        <tr class="bg-[#FEFEFE] h-[120px] border-b border-dashed">
                            <td class="px-2 py-2 w-[4%] text-[#727272]">
                                <input type="checkbox" class="check-target font-semibold w-5 h-5 appearance-none border border-[#2B5BBB] rounded-sm bg-[#FEFEFE] relative align-middle
                                    checked:bg-[#2B5BBB] checked:border-[#2B5BBB]
                                    checked:after:content-['✓'] checked:after:text-white
                                    checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 
                                    checked:after:-translate-x-1/2 checked:after:-translate-y-1/2
                                    checked:after:text-[16px]
                                    self-center" />
                            </td>
                            <td class="px-2 py-2 w-[4%] text-[#727272]">333</td>
                            <td class="px-2 py-2 w-[9%] text-[#727272]">
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
                            <td class="px-2 py-2 w-[15%] text-[#727272] text-left">꿈을 펼치는 라틴 초중급</td>
                            <td class="px-2 py-2 w-[6%] text-[#292929] font-semibold ">가나다라</td>
                            <td class="px-2 py-2 w-[15%] text-[#727272]">중앙대학교 사범대학 부속고</td>
                            <td class="px-2 py-2 w-[9%] text-[#727272]">서울디자인고</td>
                            <td class="px-2 py-2 w-[8%] text-[#727272] leading-tight">25.04.08 <br /> -
                                <br />
                                25.07.08</td>
                            <td class="px-2 py-2 w-[6%] text-[#727272]">수요일</td>
                            <td class="px-2 py-2 w-[5%] text-[#727272]">0차</td>
                            <td class="px-2 py-2 w-[9%]">
                                <div class="text-[#727272]"> - </div> 
                            </td>
                            <td class="px-2 py-2 w-[10%]">
                                <div class="flex justify-center gap-2 px-2">
                                    <button type="button"
                                        class="editModalBtn bg-[#FFF3E5] flex justify-center items-center align-middle hover:bg-[#FFECBA] p-3 rounded-lg">
                                        <span class="inline-block align-middle">
                                            <img src="../../assets/img/pen.png" alt="수정 아이콘" class="w-5 h-5" />
                                        </span>
                                    </button>
                                    <button type="button"
                                        class="deleteButton bg-[#FFEFF1] flex justify-center items-center align-middle hover:bg-[#FFDFE3] p-2.5 rounded-lg">
                                        <span class="inline-block align-middle">
                                            <img src="../../assets/img/training-mgmt/delete.png" alt="삭제 아이콘"
                                                class="w-6 h-6" />
                                        </span>
                                    </button>
                                </div>
                                <div class="flex justify-center items-center mt-2">
                                    <div class="relative dropdown w-[100px]">
                                        <button
                                            class="dropdown-button w-full bg-[#FFFFFF] border border-[1px] border-[#DBDEE3] focus:border-[#2B5BBB] text-[#727272] py-2.5 px-2 pr-1 rounded-md focus:outline-none flex justify-between items-center 0">
                                            <span
                                                class="selected-option text-[18px] text-[#727272] whitespace-nowrap text-[16px] max-sm:text-sm">수강현황</span>
                                            <svg class="w-5 h-5 text-[#292929] flex-shrink-0"
                                                xmlns="http://www.w3.org/2000/svg" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    stroke-width="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        <!-- 드롭다운 옵션 -->
                                        <div
                                            class="text-[16px] dropdown-menu absolute left-0 w-full bg-[#FAFAFA] border border-[#DBDEE3] rounded-md shadow-lg hidden max-h-[200px] overflow-y-auto">
                                            <div
                                                class="dropdown-item px-2 py-2 cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap max-sm:text-sm">
                                                대기</div>
                                            <div
                                                class="dropdown-item px-2 py-2 truncate cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap max-sm:text-sm">
                                                확정</div>
                                            <div
                                                class="dropdown-item px-2 py-2 truncate cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap max-sm:text-sm">
                                                취소</div>
                                            <div
                                                class="dropdown-item px-2 py-2 truncate cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap max-sm:text-sm">
                                                연기</div>
                                            <div
                                                class="dropdown-item px-2 py-2 truncate cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap max-sm:text-sm">
                                                연기금</div>
                                            <div
                                                class="dropdown-item px-2 py-2 truncate cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap max-sm:text-sm">
                                                환불</div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="bg-[#FEFEFE] h-[50px] border-b w-[100%]">
                            <td colspan="13" class="px-2 py-2">
                                <!-- <span class="text-[#F44336] whitespace-nowrap mr-4">15만원 입금 3만원 부족</span> -->
                                <span class="text-[#2196F3] whitespace-nowrap mr-4">2종목 할인</span>
                                <!-- <span class="text-black whitespace-nowrap">전액연기</span> -->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="flex justify-center items-center mt-4 mt-[100px]">
        <!-- 이전 / 다음 버튼 그룹 -->
        <div class="flex items-center space-x-3 max-lg:space-x-1">
            <button
                class="px-2 py-4 max-sm:py-2 max-sm:px-2 text-[#727272] rounded-md flex items-center justify-center group">
                <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 fill-[#727272] group-hover:fill-[#2B5BBB]">
                    <path
                        d="M0.68629 9.89949L10.5858 19.799L12 18.3848L3.51471 9.8995L12 1.41421L10.5858 -6.18172e-08L0.68629 9.89949Z" />
                </svg>
                <span
                    class="hidden lg:inline-block group-hover:text-[#2B5BBB] group-hover:font-semibold ml-2">이전</span>
            </button>

            <!-- 페이지 번호들 -->
            <div class="flex space-x-2 max-lg:space-x-2">
                <button
                    class="w-12 h-12 max-sm:w-8 max-sm:h-8 flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF] focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    1
                </button>
                <button
                    class="w-12 h-12 max-sm:w-8 max-sm:h-8 flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF] focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    2
                </button>
                <button
                    class="w-12 h-12 max-sm:w-8 max-sm:h-8 flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF] focus:text-[#EDF3FF]">
                    3
                </button>
                <button
                    class="w-12 h-12 max-sm:w-8 max-sm:h-8 flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF] focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    4
                </button>
                <button
                    class="w-12 h-12 max-sm:w-8 max-sm:h-8 flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF] focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    5
                </button>
                <button
                    class="w-12 h-12 max-sm:w-8 max-sm:h-8 max-lg:hidden flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF]  focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    6
                </button>
                <button
                    class="w-12 h-12 max-sm:w-8 max-sm:h-8 max-lg:hidden flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF]  focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    7
                </button>
                <button
                    class="w-12 h-12 max-sm:w-8 max-sm:h-8 max-lg:hidden flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF]  focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    8
                </button>
                <button
                    class="w-12 h-12 max-sm:w-8 max-sm:h-8 max-lg:hidden flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF]  focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    9
                </button>
                <button
                    class="w-12 h-12 max-sm:w-8 max-sm:h-8 max-lg:hidden flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF]  focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    10
                </button>
            </div>
            <!-- 다음 버튼 -->
            <button
                class="px-2 py-4 max-sm:py-2 max-sm:px-2 text-[#727272] rounded-md flex items-center justify-center group">
                <span
                    class="hidden lg:inline-block group-hover:text-[#2B5BBB] group-hover:font-semibold mr-2">다음</span>
                <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 fill-[#727272] group-hover:fill-[#2B5BBB]">
                    <path
                        d="M11.3137 10.1005L1.41423 0.201019L2.07232e-05 1.61523L8.48529 10.1005L1.68643e-08 18.5858L1.41421 20L11.3137 10.1005Z" />
                </svg>

            </button>
        </div>
    </div>
</template>

<script setup>

    import { useState } from '#app'



    const selectedYear = ref('')
    const selectedSemester = ref('')
    const selectedCourse = ref('')
    const selectedEduPlace = ref('')
    const selectedDay = ref('')
    const selectedRound = ref('')
    const selectedPayStatus = ref('')

    const pageTitle = useState('pageTitle')
    pageTitle.value = '수강자 입금관리'


</script>


<style scoped>

@media (max-width: 639.9px) {
    .left-content {
        justify-content: start;
    }
    .right-content {
        justify-content: start;
    }
}

</style>