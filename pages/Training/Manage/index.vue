<template>
    <div class="pt-5 pb-5 max-lg:flex max-lg:flex-col-reverse">
        <div class="top w-full flex items-center justify-between max-lg:mt-[15px] max-2xl:flex-col max-2xl:items-stretch max-2xl:gap-5 max-lg:flex-col-reverse">
            <!-- left-content -->
            <TrainingTab :tabs="tabs" :selectedTab="selectedTab" @update:selectedTab="val => selectedTab = val" />
            <div v-if="selectedTab === 'academy'"></div>
            <div v-else-if="selectedTab === 'research'"></div>
            <div id="selectedFilters" class="flex flex-wrap gap-2 mt-2 block lg:hidden"></div>
            
            <!-- right-content (탭들) -->
            <div class="right-content flex justify-end text-lg gap-2 max-2xl:self-end max-lg:justify-between max-lg:w-full">
                <div class="flex justify-between gap-2 max-lg:hidden">
                    <DropYear v-model="selectedYear"/>
                    <DropSemester v-model="selectedSemester"/>
                    <DropPosition v-model="selectedPosition"/>
                    <DropCourse v-model="selectedCourse"/>
                    <DropEduPlace v-model="selectedEduPlace"/>
                </div>
                <div
                    class=" flex justify-between items-center max-lg:grid max-lg:grid-cols-5 max-lg:gap-2 max-lg:w-full">
                    <div class="max-lg:col-span-4 w-full">
                        <SearchBar/>
                    </div>
                    <div class="filter hidden max-lg:block">
                        <button id="filterButton w-full max-lg:col-span-1 "
                            class="text-[#202020] flex justify-between items-center px-1 py-3 max-sm:py-2 w-full rounded-md bg-[#ECECEC]">
                            <div class="w-14 text-center min-w-[30px]">필터</div>
                            <img class="w-8 h-6" src="../../../assets/img/filter.png" alt="필터 아이콘" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-between mt-5 max-sm:mt-0 max-sm:flex-col-reverse max-sm:gap-3 ">
            <!-- left-content -->
            <div class="left-content flex items-center justify-between max-sm:justify-start gap-2">
            <!-- <button id="selectAllBtn" class="left-content flex items-center justify-center gap-2 pl-5 pr-5 rounded-lg focus:outline-none whitespace-nowrap"> -->
            <CheckboxAll
                :modelValue="isAllSelected"
                @update:modelValue="toggleSelectAll"
            />          
            <DropStatus v-model="selectedStatus"/>
            <BtnUpdate @click="onApply" />
            </div>
            <!-- right-content (탭들) -->
            <div class="right-content flex justify-end max-sm:justify-start">
                <BtnCreate class="btn" @click="goToTrainingCreate">연수 등록하기</BtnCreate>
            </div>
        </div>
    </div>
    <!-- <p class="mt-4 text-gray-700">선택된 년도: {{ selectedYear }}</p>
    <p class="mt-4 text-gray-700">선택된 학기: {{ selectedSemester }}</p>
    <p class="mt-4 text-gray-700">선택된 직무: {{ selectedPosition }}</p>
    <p class="mt-4 text-gray-700">선택된 과정명: {{ selectedCourse }}</p>
    <p class="mt-4 text-gray-700">선택된 교육장소: {{ selectedEduPlace }}</p> -->
    <div class="list-wrap w-full flex flex-col gap-10 overflow-x-auto">
        <div
            class="list-box flex justify-between gap-3 md:min-w-[1024px] max-md:flex-col max-sm:p-3 bg-gray-100 p-5 bg-white rounded-xl shadow border border-[#E3E6EA]">
            <div class="w-[2%]">
                <div v-for="item in items" :key="item" class="mt-2">
                    <CheckboxItem
                        v-for="item in items"
                        :key="item"
                        :modelValue="selectedItems.includes(item)"
                        @update:modelValue="(checked) => toggleItem(item, checked)"
                    />
                </div>
            </div>
            <div class="w-[98%] max-sm:w-full">
                <div class="flex items-start justify-between gap-5">
                    <div class="flex flex-col">
                        <div
                            class="flex items-center gap-2 max-sm:gap-1 max-sm:flex-col-reverse max-sm:items-start ">
                            <span
                                class="paperlogy font-medium text-[30px] max-sm:text-[25px] text-[#2B5BBB] text-[#292929]">모던
                                초중급</span>
                            <div class="flex justify-start gap-2">
                                <span
                                    class="text-xs px-2 py-1 border border-[#4E9DFB] bg-[#4E9DFB] text-[#FEFEFE] rounded-md">댄스스포츠</span>
                                <span
                                    class="text-xs px-2 py-1 border border-[#2B5BBB] bg-[#FEFEFE] text-[#2B5BBB] rounded-md">자율</span>
                            </div>
                        </div>
                        <span class="text-base text-[#A1A1A1] mt-1">25.04.01 ｜ 12:12:03</span>
                    </div>

                    <!-- 우측 드롭다운 및 버튼 -->
                    <div class="flex items-center gap-2 max-sm:flex-col">
                        <DropStatus v-model="selectedStatus"/>
                        <div class="flex justify-between gap-2">
                            <button type="button"
                                class="editModalBtn bg-[#FFF3E5] flex justify-center items-center align-middle hover:bg-[#FFECBA] p-3 rounded-lg">
                                <span class="inline-block align-middle">
                                    <img src="../../../assets/img/pen.png" alt="수정 아이콘" class="w-5 h-5" />
                                </span>
                            </button>
                            <button type="button"
                                class="deleteButton bg-[#FFEFF1] flex justify-center items-center align-middle hover:bg-[#FFDFE3] p-2.5 rounded-lg">
                                <span class="inline-block align-middle">
                                    <img src="../../../assets/img/training-mgmt/delete.png" alt="삭제 아이콘" class="w-6 h-6" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <hr class="my-4 border-[1.5px] border-[#2B5BBB]" />
                <!-- 하단 정보들 -->
                <div class="grid max-md:grid-cols-3 grid-cols-10 gap-y-4 gap-x-4 text-base text-[#292929]">
                    <div
                        class="flex items-center col-span-3 max-md:col-span-1 max-md:flex-col max-md:items-start">
                        <span class="w-20 text-[#727272] max-md:text-[16px]">적용시기</span>
                        <span class="text-[20px] max-md:text-[18px]">2025 · 1학기</span>
                    </div>
                    <div
                        class="flex items-center col-span-3 max-md:col-span-1 max-md:flex-col max-md:items-start">
                        <span class="w-20 text-[#727272] max-md:text-[16px]">연수기간</span>
                        <span class="text-[20px] max-md:text-[18px]">25.04.09 ~ 25.07.14</span>
                    </div>
                    <div
                        class="flex items-center col-span-2 max-md:col-span-1 max-md:flex-col max-md:items-start">
                        <span class="w-20 text-[#727272] max-md:text-[16px]">요일회차</span>
                        <span class="text-[20px] max-md:text-[18px]">수요일 0차</span>
                    </div>
                    <div class="col-span-3 hidden max-md:block">
                        <hr class="border-[1px] border-[#EFEFEF]" />
                    </div>
                    <div
                        class="flex items-center col-span-2 max-md:col-span-1 max-md:flex-col max-md:items-start">
                        <span class="w-20 text-[#727272] max-md:text-[16px]">이수학점</span>
                        <span class="text-[20px] max-md:text-[18px]">30시간 0점</span>
                    </div>
                    <div class="col-span-10 max-md:hidden">
                        <hr class="border-[1px] border-[#EFEFEF]" />
                    </div>
                    <div
                        class="flex items-center col-span-3 max-md:col-span-1 max-md:flex-col max-md:items-start">
                        <span class="w-20 text-[#727272] max-md:text-[16px]">교육장소</span>
                        <span class="text-[20px] max-md:text-[18px]">서울디자인고 | 컨실초</span>
                    </div>
                    <div
                        class="flex items-center col-span-3 max-md:col-span-1 max-md:flex-col max-md:items-start">
                        <span class="w-20 text-[#727272] max-md:text-[16px]">지정번호</span>
                        <span class="text-[20px] max-md:text-[18px]">경기-교육-2025-216</span>
                    </div>
                    <div class="col-span-3 hidden max-md:block">
                        <hr class="border-[1px] border-[#EFEFEF]" />
                    </div>
                    <div
                        class="flex items-center col-span-2 max-md:col-span-1 max-md:flex-col max-md:items-start">
                        <span class="w-20 text-[#727272] max-md:text-[16px]">수강료</span>
                        <span class="text-[20px] max-md:text-[18px]">₩ 140,000</span>
                    </div>
                    <div
                        class="flex items-center col-span-2 max-md:col-span-1 max-md:flex-col max-md:items-start">
                        <span class="w-20 text-[#727272] max-md:text-[16px]">지원금액</span>
                        <span class="text-[20px] max-md:text-[18px]">₩ 0</span>
                    </div>
                </div>

                <!-- 토클 버튼 -->
                <div class="flex justify-end mt-2">
                    <button onclick="toggleDetails()"
                        class="bg-[#EFEFEF] flex justify-center items-center align-middle hover:bg-[#DDDDDD] p-2.5 rounded-lg"
                        id="toggle-icon">
                        <span class="inline-block align-middle">
                            <img src="img/down-arrow.png" alt="토글 아이콘" class="w-5 h-5" />
                        </span>
                    </button>
                </div>
                <!-- 토글 콘텐츠 -->
                <div id="training-details(this)" class="hidden mt-8">
                    <span class="w-20 text-[#727272]">연수내용</span>
                    <div
                        class="bg-[#FAFAFA] border border-[#E3E6EA] rounded-xl p-8 text-[#292929] mt-4 text-base">
                        <span>자율 웰빙초중급 (지터벅, 블루스에 관심 있는 사람은 누구나)</span>
                        <ul class="list-disc ml-5 mt-2 space-y-1">
                            <li>장소: 서울디자인고 4층 체육관</li>
                            <li>시간: 2025.2.1(토) 개강 / 10 ~ 12시</li>
                            <li>지터벅, 블루스</li>
                            <li>준비물: 댄스화, 개인음료, 편한 복장</li>
                            <li class="list-none text-[#A1A1A1] text-sm mt-[20px]">※ 댄스화 구매를 원하실 경우, 연수 시작 전 미리
                                주문해 주세요.</li>
                            <li class="list-none text-[#A1A1A1] text-sm">※ 문의: 010-6661-9191</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
        <div
            class="list-box flex justify-between gap-3 md:min-w-[1024px] max-md:flex-col max-sm:p-3 bg-gray-100 p-5 bg-white rounded-xl shadow border border-[#E3E6EA]">
            <div class="w-[2%]">
                <input type="checkbox" class="check-target font-semibold w-5 h-5 mt-2 appearance-none border border-[#2B5BBB] rounded-sm bg-[#FEFEFE] relative align-middle
                    checked:bg-[#2B5BBB] checked:border-[#2B5BBB]
                    checked:after:content-['✓'] checked:after:text-white
                    checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 
                    checked:after:-translate-x-1/2 checked:after:-translate-y-1/2
                    checked:after:text-[16px]
                    self-center" />
            </div>
            <div class="w-[98%] max-sm:w-full">
                <div class="flex items-start justify-between gap-5">
                    <div class="flex flex-col">
                        <div
                            class="flex items-center gap-2 max-sm:gap-1 max-sm:flex-col-reverse max-sm:items-start ">
                            <span
                                class="paperlogy font-medium text-[30px] max-sm:text-[25px] text-[#2B5BBB] text-[#292929]">라인댄스 초중급</span>
                            <div class="flex justify-start gap-2">
                                <span
                                    class="text-xs px-2 py-1 border border-[#8B98F5 bg-[#8B98F5] text-[#FEFEFE] rounded-md">라인댄스</span>
                                <span
                                    class="text-xs px-2 py-1 border border-[#2B5BBB] bg-[#FEFEFE] text-[#2B5BBB] rounded-md">서울</span>
                            </div>
                        </div>
                        <span class="text-base text-[#A1A1A1] mt-1">25.04.01 ｜ 12:12:03</span>
                    </div>

                    <!-- 우측 드롭다운 및 버튼 -->
                    <div class="flex items-center gap-2 max-sm:flex-col">
                        <div class="relative dropdown w-[120px] max-sm:w-[100px]">
                            <button
                                class="dropdown-button w-full bg-[#FFFFFF] border border-[1px] border-[#DBDEE3] focus:border-[#2B5BBB] text-[#727272] py-2 max-sm:px-2 px-3 pr-2 max-sm:py-2.5 rounded-md focus:outline-none focus:border-[#2B5BBB] flex justify-between items-center gap-0">
                                <span
                                    class="selected-option text-[18px] text-[#727272] pr-2 max-sm:pr-0 whitespace-nowrap max-sm:text-[16px] ">과정상태</span>
                                <svg class="w-5 h-5 text-[#292929] flex-shrink-0"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <!-- 드롭다운 옵션 -->
                            <div
                                class="dropdown-menu absolute left-0 w-full bg-[#FAFAFA] border border-[#DBDEE3] rounded-md shadow-lg hidden">
                                <div
                                    class="dropdown-item px-3 py-2 cursor-pointer text-[#727272] text-[16px] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap">
                                    접수중</div>
                                <div
                                    class="dropdown-item px-3 py-3 truncate cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap">
                                    접수마감</div>
                                <div
                                    class="dropdown-item px-3 py-3 truncate cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap">
                                    과정종료</div>
                            </div>
                        </div>
                        <div class="flex justify-between gap-2">
                            <button type="button"
                                class="editModalBtn bg-[#FFF3E5] flex justify-center items-center align-middle hover:bg-[#FFECBA] p-3 rounded-lg">
                                <span class="inline-block align-middle">
                                    <img src="../../../assets/img/pen.png" alt="수정 아이콘" class="w-5 h-5" />
                                </span>
                            </button>
                            <button type="button"
                                class="deleteButton bg-[#FFEFF1] flex justify-center items-center align-middle hover:bg-[#FFDFE3] p-2.5 rounded-lg">
                                <span class="inline-block align-middle">
                                    <img src="../../../assets/img/training-mgmt/delete.png" alt="삭제 아이콘" class="w-6 h-6" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <hr class="my-4 border-[1.5px] border-[#2B5BBB]" />
                <!-- 하단 정보들 -->
                <div class="grid max-md:grid-cols-3 grid-cols-10 gap-y-4 gap-x-4 text-base text-[#292929]">
                    <div
                        class="flex items-center col-span-3 max-md:col-span-1 max-md:flex-col max-md:items-start">
                        <span class="w-20 text-[#727272] max-md:text-[16px]">적용시기</span>
                        <span class="text-[20px] max-md:text-[18px]">2025 · 1학기</span>
                    </div>
                    <div
                        class="flex items-center col-span-3 max-md:col-span-1 max-md:flex-col max-md:items-start">
                        <span class="w-20 text-[#727272] max-md:text-[16px]">연수기간</span>
                        <span class="text-[20px] max-md:text-[18px]">25.04.09 ~ 25.07.14</span>
                    </div>
                    <div
                        class="flex items-center col-span-2 max-md:col-span-1 max-md:flex-col max-md:items-start">
                        <span class="w-20 text-[#727272] max-md:text-[16px]">요일회차</span>
                        <span class="text-[20px] max-md:text-[18px]">수요일 0차</span>
                    </div>
                    <div class="col-span-3 hidden max-md:block">
                        <hr class="border-[1px] border-[#EFEFEF]" />
                    </div>
                    <div
                        class="flex items-center col-span-2 max-md:col-span-1 max-md:flex-col max-md:items-start">
                        <span class="w-20 text-[#727272] max-md:text-[16px]">이수학점</span>
                        <span class="text-[20px] max-md:text-[18px]">30시간 0점</span>
                    </div>
                    <div class="col-span-10 max-md:hidden">
                        <hr class="border-[1px] border-[#EFEFEF]" />
                    </div>
                    <div
                        class="flex items-center col-span-3 max-md:col-span-1 max-md:flex-col max-md:items-start">
                        <span class="w-20 text-[#727272] max-md:text-[16px]">교육장소</span>
                        <span class="text-[20px] max-md:text-[18px]">서울디자인고 | 컨실초</span>
                    </div>
                    <div
                        class="flex items-center col-span-3 max-md:col-span-1 max-md:flex-col max-md:items-start">
                        <span class="w-20 text-[#727272] max-md:text-[16px]">지정번호</span>
                        <span class="text-[20px] max-md:text-[18px]">경기-교육-2025-216</span>
                    </div>
                    <div class="col-span-3 hidden max-md:block">
                        <hr class="border-[1px] border-[#EFEFEF]" />
                    </div>
                    <div
                        class="flex items-center col-span-2 max-md:col-span-1 max-md:flex-col max-md:items-start">
                        <span class="w-20 text-[#727272] max-md:text-[16px]">수강료</span>
                        <span class="text-[20px] max-md:text-[18px]">₩ 140,000</span>
                    </div>
                    <div
                        class="flex items-center col-span-2 max-md:col-span-1 max-md:flex-col max-md:items-start">
                        <span class="w-20 text-[#727272] max-md:text-[16px]">지원금액</span>
                        <span class="text-[20px] max-md:text-[18px]">₩ 0</span>
                    </div>
                </div>

                <!-- 토클 버튼 -->
                <div class="flex justify-end mt-2">
                    <button onclick="toggleDetails()"
                        class="bg-[#EFEFEF] flex justify-center items-center align-middle hover:bg-[#DDDDDD] p-2.5 rounded-lg"
                        id="toggle-icon">
                        <span class="inline-block align-middle">
                            <img src="../../../assets/img/down-arrow.png" alt="토글 아이콘" class="w-5 h-5" />
                        </span>
                    </button>
                </div>
                <!-- 토글 콘텐츠 -->
                <div id="training-details(this)" class="hidden mt-8">
                    <span class="w-20 text-[#727272]">연수내용</span>
                    <div
                        class="bg-[#FAFAFA] border border-[#E3E6EA] rounded-xl p-8 text-[#292929] mt-4 text-base">
                        <span>자율 웰빙초중급 (지터벅, 블루스에 관심 있는 사람은 누구나)</span>
                        <ul class="list-disc ml-5 mt-2 space-y-1">
                            <li>장소: 서울디자인고 4층 체육관</li>
                            <li>시간: 2025.2.1(토) 개강 / 10 ~ 12시</li>
                            <li>지터벅, 블루스</li>
                            <li>준비물: 댄스화, 개인음료, 편한 복장</li>
                            <li class="list-none text-[#A1A1A1] text-sm mt-[20px]">※ 댄스화 구매를 원하실 경우, 연수 시작 전 미리
                                주문해 주세요.</li>
                            <li class="list-none text-[#A1A1A1] text-sm">※ 문의: 010-6661-9191</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
        <div
        class="list-box flex justify-between gap-3 md:min-w-[1024px] max-md:flex-col max-sm:p-3 bg-gray-100 p-5 bg-white rounded-xl shadow border border-[#E3E6EA]">
        <div class="w-[2%]">
            <input type="checkbox" class="check-target font-semibold w-5 h-5 appearance-none border border-[#2B5BBB] rounded-sm bg-[#FEFEFE] relative align-middle
                checked:bg-[#2B5BBB] checked:border-[#2B5BBB]
                checked:after:content-['✓'] checked:after:text-white
                checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 
                checked:after:-translate-x-1/2 checked:after:-translate-y-1/2
                checked:after:text-[16px]
                self-center" />
        </div>
        <div class="w-[98%] max-sm:w-full">
            <div class="flex items-start justify-between gap-5">
                <div class="flex flex-col">
                    <div
                        class="flex items-center gap-2 max-sm:gap-1 max-sm:flex-col-reverse max-sm:items-start ">
                        <span
                            class="paperlogy font-medium text-[30px] max-sm:text-[25px] text-[#2B5BBB] text-[#292929]">웰빙댄스
                            초중급</span>
                        <div class="flex justify-start gap-2">
                            <span
                                class="text-xs px-2 py-1 border border-[#AFE7E0] bg-[#AFE7E0] text-[#292929] rounded-md">웰빙댄스</span>
                            <span
                                class="text-xs px-2 py-1 border border-[#2B5BBB] bg-[#FEFEFE] text-[#2B5BBB] rounded-md">경기</span>
                        </div>
                    </div>
                    <span class="text-base text-[#A1A1A1] mt-1">25.04.01 ｜ 12:12:03</span>
                </div>

                <!-- 우측 드롭다운 및 버튼 -->
                <div class="flex items-center gap-2 max-sm:flex-col">
                    <div class="relative dropdown w-[120px] max-sm:w-[100px]">
                        <button
                            class="dropdown-button w-full bg-[#FFFFFF] border border-[1px] border-[#DBDEE3] focus:border-[#2B5BBB] text-[#727272] py-2 max-sm:px-2 px-3 pr-2 max-sm:py-2.5 rounded-md focus:outline-none focus:border-[#2B5BBB] flex justify-between items-center gap-0">
                            <span
                                class="selected-option text-[18px] text-[#727272] pr-2 max-sm:pr-0 whitespace-nowrap max-sm:text-[16px]">과정상태</span>
                            <svg class="w-5 h-5 text-[#292929] flex-shrink-0"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <!-- 드롭다운 옵션 -->
                        <div
                            class="dropdown-menu absolute left-0 w-full bg-[#FAFAFA] border border-[#DBDEE3] rounded-md shadow-lg hidden">
                            <div
                                class="dropdown-item px-3 py-2 cursor-pointer text-[#727272] text-[16px] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap">
                                접수중</div>
                            <div
                                class="dropdown-item px-3 py-3 truncate cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap">
                                접수마감</div>
                            <div
                                class="dropdown-item px-3 py-3 truncate cursor-pointer text-[#727272] hover:bg-[#E7F0FD] hover:text-[#292929] whitespace-nowrap">
                                과정종료</div>
                        </div>
                    </div>
                    <div class="flex justify-between gap-2">
                        <button type="button"
                            class="editModalBtn bg-[#FFF3E5] flex justify-center items-center align-middle hover:bg-[#FFECBA] p-3 rounded-lg">
                            <span class="inline-block align-middle">
                                <img src="../../../assets/img/pen.png" alt="수정 아이콘" class="w-5 h-5" />
                            </span>
                        </button>
                        <button type="button"
                            class="deleteButton bg-[#FFEFF1] flex justify-center items-center align-middle hover:bg-[#FFDFE3] p-2.5 rounded-lg">
                            <span class="inline-block align-middle">
                                <img src="../../../assets/img/training-mgmt/delete.png" alt="삭제 아이콘" class="w-6 h-6" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <hr class="my-4 border-[1.5px] border-[#2B5BBB]" />
            <!-- 하단 정보들 -->
            <div class="grid max-md:grid-cols-3 grid-cols-10 gap-y-4 gap-x-4 text-base text-[#292929]">
                <div
                    class="flex items-center col-span-3 max-md:col-span-1 max-md:flex-col max-md:items-start">
                    <span class="w-20 text-[#727272] max-md:text-[16px]">적용시기</span>
                    <span class="text-[20px] max-md:text-[18px]">2025 · 1학기</span>
                </div>
                <div
                    class="flex items-center col-span-3 max-md:col-span-1 max-md:flex-col max-md:items-start">
                    <span class="w-20 text-[#727272] max-md:text-[16px]">연수기간</span>
                    <span class="text-[20px] max-md:text-[18px]">25.04.09 ~ 25.07.14</span>
                </div>
                <div
                    class="flex items-center col-span-2 max-md:col-span-1 max-md:flex-col max-md:items-start">
                    <span class="w-20 text-[#727272] max-md:text-[16px]">요일회차</span>
                    <span class="text-[20px] max-md:text-[18px]">수요일 0차</span>
                </div>
                <div class="col-span-3 hidden max-md:block">
                    <hr class="border-[1px] border-[#EFEFEF]" />
                </div>
                <div
                    class="flex items-center col-span-2 max-md:col-span-1 max-md:flex-col max-md:items-start">
                    <span class="w-20 text-[#727272] max-md:text-[16px]">이수학점</span>
                    <span class="text-[20px] max-md:text-[18px]">30시간 0점</span>
                </div>
                <div class="col-span-10 max-md:hidden">
                    <hr class="border-[1px] border-[#EFEFEF]" />
                </div>
                <div
                    class="flex items-center col-span-3 max-md:col-span-1 max-md:flex-col max-md:items-start">
                    <span class="w-20 text-[#727272] max-md:text-[16px]">교육장소</span>
                    <span class="text-[20px] max-md:text-[18px]">서울디자인고 | 컨실초</span>
                </div>
                <div
                    class="flex items-center col-span-3 max-md:col-span-1 max-md:flex-col max-md:items-start">
                    <span class="w-20 text-[#727272] max-md:text-[16px]">지정번호</span>
                    <span class="text-[20px] max-md:text-[18px]">경기-교육-2025-216</span>
                </div>
                <div class="col-span-3 hidden max-md:block">
                    <hr class="border-[1px] border-[#EFEFEF]" />
                </div>
                <div
                    class="flex items-center col-span-2 max-md:col-span-1 max-md:flex-col max-md:items-start">
                    <span class="w-20 text-[#727272] max-md:text-[16px]">수강료</span>
                    <span class="text-[20px] max-md:text-[18px]">₩ 140,000</span>
                </div>
                <div
                    class="flex items-center col-span-2 max-md:col-span-1 max-md:flex-col max-md:items-start">
                    <span class="w-20 text-[#727272] max-md:text-[16px]">지원금액</span>
                    <span class="text-[20px] max-md:text-[18px]">₩ 0</span>
                </div>
            </div>

            <!-- 토클 버튼 -->
            <div class="flex justify-end mt-2">
                <button onclick="toggleDetails()"
                    class="bg-[#EFEFEF] flex justify-center items-center align-middle hover:bg-[#DDDDDD] p-2.5 rounded-lg"
                    id="toggle-icon">
                    <span class="inline-block align-middle">
                        <img src="../../../assets/img/down-arrow.png" alt="토글 아이콘" class="w-5 h-5" />
                    </span>
                </button>
            </div>
            <!-- 토글 콘텐츠 -->
            <div id="training-details(this)" class="hidden mt-8">
                <span class="w-20 text-[#727272]">연수내용</span>
                <div
                    class="bg-[#FAFAFA] border border-[#E3E6EA] rounded-xl p-8 text-[#292929] mt-4 text-base">
                    <span>자율 웰빙초중급 (지터벅, 블루스에 관심 있는 사람은 누구나)</span>
                    <ul class="list-disc ml-5 mt-2 space-y-1">
                        <li>장소: 서울디자인고 4층 체육관</li>
                        <li>시간: 2025.2.1(토) 개강 / 10 ~ 12시</li>
                        <li>지터벅, 블루스</li>
                        <li>준비물: 댄스화, 개인음료, 편한 복장</li>
                        <li class="list-none text-[#A1A1A1] text-sm mt-[20px]">※ 댄스화 구매를 원하실 경우, 연수 시작 전 미리
                            주문해 주세요.</li>
                        <li class="list-none text-[#A1A1A1] text-sm">※ 문의: 010-6661-9191</li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
    </div>
    <div class="flex justify-center items-center mt-4 mt-[100px]">
        <!-- 이전 / 다음 버튼 그룹 -->
        <div class="flex items-center space-x-3 max-lg:space-x-1">
            <button
                class="px-2 py-4 max-sm:py-2 max-sm:px-2 text-[#727272] rounded-md flex items-center justify-center group">
                <svg width="12" height="20" viewbox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-[#727272] group-hover:fill-[#2B5BBB]">
                    <path d="M0.68629 9.89949L10.5858 19.799L12 18.3848L3.51471 9.8995L12 1.41421L10.5858 -6.18172e-08L0.68629 9.89949Z"/>
                    
                </svg>
                <span class="hidden lg:inline-block group-hover:text-[#2B5BBB] group-hover:font-semibold ml-2">이전</span>
            </button>

            <!-- 페이지 번호들 -->
            <div class="flex space-x-2 max-lg:space-x-2">
                <button class="w-12 h-12 max-sm:w-8 max-sm:h-8 flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF] focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    1
                </button>
                <button class="w-12 h-12 max-sm:w-8 max-sm:h-8 flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF] focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    2
                </button>
                <button class="w-12 h-12 max-sm:w-8 max-sm:h-8 flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF] focus:text-[#EDF3FF]">
                    3
                </button>
                <button class="w-12 h-12 max-sm:w-8 max-sm:h-8 flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF] focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    4
                </button>
                <button class="w-12 h-12 max-sm:w-8 max-sm:h-8 flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF] focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    5
                </button>
                <button class="w-12 h-12 max-sm:w-8 max-sm:h-8 max-lg:hidden flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF]  focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    6
                </button>
                <button class="w-12 h-12 max-sm:w-8 max-sm:h-8 max-lg:hidden flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF]  focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    7
                </button>
                <button class="w-12 h-12 max-sm:w-8 max-sm:h-8 max-lg:hidden flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF]  focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    8
                </button>
                <button class="w-12 h-12 max-sm:w-8 max-sm:h-8 max-lg:hidden flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF]  focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    9
                </button>
                <button class="w-12 h-12 max-sm:w-8 max-sm:h-8 max-lg:hidden flex items-center justify-center text-[#727272] font-medium rounded-md hover:bg-[#2B5BBB] hover:text-[#EDF3FF]  focus:bg-[#2B5BBB] focus:text-[#EDF3FF]">
                    10
                </button>
            </div>
            <!-- 다음 버튼 -->
            <button class="px-2 py-4 max-sm:py-2 max-sm:px-2 text-[#727272] rounded-md flex items-center justify-center group">
                <span class="hidden lg:inline-block group-hover:text-[#2B5BBB] group-hover:font-semibold mr-2">다음</span>
                <svg width="12" height="20" viewbox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-[#727272] group-hover:fill-[#2B5BBB]">
                    <path d="M11.3137 10.1005L1.41423 0.201019L2.07232e-05 1.61523L8.48529 10.1005L1.68643e-08 18.5858L1.41421 20L11.3137 10.1005Z"/>
                </svg>
            </button>
        </div>
    </div>
</template>


<script setup>
    import { useState } from '#app'
    import { useRouter } from 'vue-router';
    import TrainingTab from '../../../components/Training/Tab.vue'
    import SearchBar from '~/components/SearchBar.vue'
    import DropYear from '~/components/Drop/Year.vue'
    import DropSemester from '~/components/Drop/Semester.vue'
    import DropPosition from '~/components/Drop/Position.vue'
    import DropCourse from '~/components/Drop/Course.vue'
    import DropEduPlace from '~/components/Drop/EduPlace.vue'
    import DropStatus from '~/components/Drop/Status.vue'
    import BtnCreate from '../../../components/Btn/Create.vue';
    import BtnUpdate from '../../../components/Btn/Update.vue'

    import { ref, onMounted } from 'vue'
    import { useCheckboxGroup } from '../../../composables/useCheckboxGroup'
    import CheckboxAll from '~/components/Checkbox/All.vue'
    import CheckboxItem from '~/components/Checkbox/Item.vue'

    const selectedYear = ref('')
    const selectedSemester = ref('')
    const selectedPosition = ref('')
    const selectedCourse = ref('')
    const selectedEduPlace = ref('')
    const selectedStatus = ref('')

    const selectedTab = ref('academy')

    const tabs = [
        { id: 'academy', label: '연수원' },
        { id: 'research', label: '연구회' }
    ]


    // ✅ 체크박스
    const items = ref([])
    const {
        selectedItems,
        isAllSelected,
        toggleItem,
        toggleSelectAll
    } = useCheckboxGroup(items)

    // 예시용 API
    async function fetchTrainingItems() {
        return ['연수1'] // 나중엔 axios 등으로 대체
    }

    fetchTrainingItems().then(data => {
        items.value = data
    })

    // ✅ 일괄적용 추후에 작업
    function onApply() {
    // 버튼 클릭 시 처리할 로직
        console.log('일괄적용 버튼 클릭됨')
    }

    // ✅ 페이지 타이틀 설정
    const pageTitle = useState('pageTitle')
    pageTitle.value = '연수관리'

    // ✅ 연수등록 버튼 이동
    const router = useRouter();
    function goToTrainingCreate() {
        router.push('/Training/Manage/Create');
    }


</script>


<style scoped>
    .btn {
        padding-top: 0.75rem;
        padding-right: 1.7rem;
        padding-left: 1.7rem;
        padding-bottom: 0.6rem;
    }
    @media (max-width: 639.9px) {
        .left-content {
            justify-content: start;
        }
        .right-content {
            justify-content: start;
        }
    }
</style>
