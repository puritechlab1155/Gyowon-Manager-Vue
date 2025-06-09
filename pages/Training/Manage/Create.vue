<template>
        <!-- 폼1 -->
    <form class="wrap create-top mt-[30px] max-w-[1200px] w-full mx-auto ">
        <div class="flex justify-between items-end mb-2">
            <h2 class="h1-title font-normal paperlogy">연수등록</h2>
            <p class="text-[16px] font-semibold text-[#2B5BBB]">* 표시는 필수 입력입니다 </p>
        </div>
        <div class="border-t-[2px] border-[#2B5BBB] mb-5"></div>

        <div class="box grid grid-cols-2 py-4 text-left max-xl:grid-cols-1 mx-auto max-sm:px-0 px-6 bg-[#FFFFFF]">
            <!-- Row Template -->
            <!-- 1 -->
            <div class="px-2 bg-[#FFFFFF] border-b border-t border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 text-[18px] text-[#2B5BBB] after-small font-bold text-[#292929] max-sm:px-0">과정코드</label>
                <div class="w-2/3 flex items-center gap-2 max-sm:gap-1">
                    <input type="text" v-model="code"
                            class="text-center w-full bg-[#5279C9] text-[#FFFFFF] text-[16px] max-sm:px-1 px-4 py-1.5 max-sm:text-[14px] rounded-lg border border-[#2B5BBB] focus:outline-none tracking-wider"/>
                </div>
            </div>
            <div class="px-2 bg-[#FFFFFF] border-b border-t border-[#EFEFEF] h-[60px] flex items-center px-4 max-xl:hidden ">
            </div>

            <!-- 2 -->
            <div class="px-2 bg-[#F9F9F9] border-b border-[#EFEFEF] py-2 flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">등록날짜</label>
                <div class="w-2/3 flex flex-col">
                    <input type="date" placeholder="YYYY-MM-DD" v-model="registDate"
                    :class="[
                    'w-full flex-1 h-[45px] text-[#292929] text-[18px] after-small placeholder-[#AFAFAF] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                    registDate ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                    ]"
                    />
                </div>
            </div>
            <div class="px-2 bg-[#F9F9F9] border-b border-[#EFEFEF] py-2 flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">등록시간</label>
                <div class="w-2/3 flex flex-col">
                    <input type="time" v-model="registTime"
                    :class="[
                    'w-full flex-1 h-[45px] text-[#292929] text-[18px] after-small placeholder-[#AFAFAF] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                    registTime ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                    ]"
                    />
                </div>
            </div>

            <!-- 3 -->
            <div class="px-2 bg-[#F9F9F9] border-b border-[#EFEFEF] py-[6px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">과정명</label>
                <div class="w-2/3 flex flex-col">
                    <div class="flex items-center gap-2 max-sm:gap-1">
                        <input type="text" v-model="title"
                        :class="[
                                'w-full flex-1 h-[45px] text-[#292929] placeholder-[#AFAFAF] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                                title ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                        ]"
                        />
                    </div>
                </div>
            </div>
            <div class="px-2 bg-[#F9F9F9] after-gray border-b border-[#EFEFEF] py-[6px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">과정상태</label>
                <DropUser
                    :options="statusOptions"
                    v-model="status"
                />
            </div>

            <!-- 4 -->
            <div class="px-2 bg-[#F9F9F9] after-white border-b border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">연수주관</label>
                    <div class="w-2/3 flex gap-0">
                    <input v-model="type" type="radio" name="type" id="academy" value="연수원" class="hidden peer/academy" />
                    <label for="academy" 
                        class="flex-1 h-[45px] text-center cursor-pointer px-4 py-2 text-[16px] max-sm:text-sm max-sm:leading-[2] border 
                                border-[#B5B5B5] text-[#B5B5B5] bg-[#F3F3F3] 
                                peer-checked/academy:bg-[#EDF3FF] peer-checked/academy:text-[#2B5BBB] peer-checked/academy:border-[#2B5BBB]
                                rounded-l-lg">
                        연수원
                    </label>
                    <input v-model="type" type="radio" name="type" id="research" value="연구회" class="hidden peer/research" />
                    <label for="research"
                        class="flex-1 text-center cursor-pointer px-4 py-2 text-[16px] max-sm:text-sm max-sm:leading-[2] border-t border-b border-r 
                                border-[#B5B5B5] text-[#B5B5B5] bg-[#F3F3F3] 
                                peer-checked/research:bg-[#EDF3FF] peer-checked/research:text-[#2B5BBB] peer-checked/research:border-[#2B5BBB]
                                rounded-r-lg">
                        연구회
                    </label>
                </div>
            </div>
            <div class="px-2 bg-[#F9F9F9] border-b border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">직무</label>
                <DropUser
                    :options="positionOptions"
                    v-model="position"
                />
            </div>

            <!-- 5 -->
            <div class="px-2 bg-[#FFFFFF] border-b border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">종목</label>
                <DropUser
                    :options="catagoryOptions"
                    v-model="catagory"
                />
            </div>
            <div class="px-2 bg-[#FFFFFF] after-gray border-b border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">회차
                </label>
                <DropUser
                    :options="roundOptions"
                    v-model="round"
                />
            </div>

            <!-- 6 -->
            <div class="px-2 bg-[#FFFFFF] border-b border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">적용년도</label>
                <div class="w-2/3 flex items-center gap-2 max-sm:gap-1">
                        <input type="number" v-model="year" placeholder="2025 (숫자만 입력)"
                        :class="[
                            'w-full flex-1 h-[45px] text-[#292929] placeholder-[#AFAFAF] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                            year ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                        ]"
                    />
                </div>
            </div>
            <div class="px-2 bg-[#FFFFFF] after-gray border-b border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">회차
                </label>
                <DropUser
                    :options="semesterOptions"
                    v-model="semester"
                />
            </div>
            
            <!-- 7 -->
            <div class="px-2 bg-[#FFFFFF] border-b border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">이수시간</label>
                <div class="w-2/3 flex items-center gap-2 max-sm:gap-1">
                        <input type="number" v-model="completeTime" placeholder="30 (숫자만 입력)"
                        :class="[
                            'w-full flex-1 h-[45px] text-[#292929] placeholder-[#AFAFAF] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                            completeTime ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                        ]"
                    />
                </div>
            </div>
            <div class="px-2 bg-[#FFFFFF] border-b border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">학점</label>
                <div class="w-2/3 flex items-center gap-2 max-sm:gap-1">
                        <input type="number" v-model="credit" placeholder="3 (숫자만 입력)"
                        :class="[
                            'w-full flex-1 h-[45px] text-[#292929] placeholder-[#AFAFAF] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                            credit ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                        ]"
                    />
                </div>
            </div>
            
            <!-- 8 -->
            <div class="px-2 bg-[#FFFFFF] border-b border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">수강료</label>
                <div class="w-2/3 flex items-center gap-2 max-sm:gap-1">
                        <input type="number" v-model="tuitionFee" placeholder="140000 (숫자만 입력)"
                        :class="[
                            'w-full flex-1 h-[45px] text-[#292929] placeholder-[#AFAFAF] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                            tuitionFee ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                        ]"
                    />
                </div>
            </div>
            <div class="px-2 bg-[#FFFFFF] border-b border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">지원비</label>
                <div class="w-2/3 flex items-center gap-2 max-sm:gap-1">
                        <input type="number" v-model="applicationFee" placeholder="200000 (숫자만 입력)"
                        :class="[
                            'w-full flex-1 h-[45px] text-[#292929] placeholder-[#AFAFAF] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                            applicationFee ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                        ]"
                    />
                </div>
            </div>

            <!-- 9 -->
            <div class="px-2 bg-[#F9F9F9] after-gray border-b border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">
                    요일
                </label>
                <DropUser
                    :options="dayOptions"
                    v-model="day"
                />
            </div>
            <div class="px-2 bg-[#F9F9F9]  after-white border-b border-[#EFEFEF] h-[60px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">
                    교육장소
                </label>
                <DropUser
                    :options="eduplaceOptions"
                    v-model="eduplace"
                />
            </div>

            <!-- 10 -->
            <div class="px-2 py-[6px] bg-[#FFFFFF] border-b border-[#EFEFEF] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">
                연수기간
                </label>
                <div class="w-2/3 flex gap-2">
                    <input type="date" placeholder="YYYY-MM-DD" v-model="trainStartDate"
                    :class="[
                    'w-full flex-1 h-[45px] text-[#292929] text-[18px] after-small placeholder-[#AFAFAF] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                    startDate ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                    ]"
                    />
                    <input type="date" placeholder="YYYY-MM-DD" v-model="trainEndDate"
                    :class="[
                    'w-full flex-1 h-[45px] text-[#292929] text-[18px] after-small placeholder-[#AFAFAF] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                    endDate ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                    ]"
                    />
                </div>
            </div>
            <div class="w-full px-2 bg-[#F9F9F9] after-gray border-b border-[#EFEFEF] border-none py-[6px] flex items-center">
                <label class="w-1/3 px-4 max-sm:px-0 text-[18px] after-small font-bold text-[#292929]">
                    접수기간
                </label>
                <div class="w-2/3 flex gap-2">
                    <input type="date" placeholder="YYYY-MM-DD" v-model="applicateStartDate"
                    :class="[
                    'w-full flex-1 h-[45px] text-[#292929] text-[18px] after-small placeholder-[#AFAFAF] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                    applicationDate ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                    ]"
                    />
                    <input type="date" placeholder="YYYY-MM-DD" v-model="applicateEndDate"
                    :class="[
                    'w-full flex-1 h-[45px] text-[#292929] text-[18px] after-small placeholder-[#AFAFAF] px-3 py-1.5 max-sm:px-2 rounded-lg border border-[#DBDEE3] focus:outline-none focus:border-[#2B5BBB]',
                    endDate ? 'bg-[#FFFFFF]' : 'bg-[#F3F3F3]'
                    ]"
                    />
                </div>
            </div>
            <div
                class="bg-[#F9F9F9] max-xl:bg-[#FEFEFE] col-span-2 px-2 h-[60px] flex items-center max-xl:col-span-1 max-sm:flex-col max-sm:h-[100px]">
                <div class="w-1/6 max-xl:w-1/4 max-sm:justify-start max-sm:w-full">
                    <label
                        class="p-4 x-4 max-sm:px-0 text-[18px] max-sm:text-[16px] font-bold text-[#292929] flex items-center py-4 xl:hidden">교육내용</label>
                </div>
                <div
                    class="w-5/6 max-xl:w-3/4 max-sm:w-full max-xl:justify-end max-sm:gap-1 max-xl:justify-start flex gap-2">
                    <button
                        class="rounded-lg bg-[#EFEFEF] hover:bg-[#ECECEC] px-2 py-2 flex items-center justify-center">
                        <img src="../../assets/../../assets/img/training-mgmt/bold.png" alt="글씨 굵게하기 버튼"
                            class="w-6 h-6 max-xl:w-5 max-xl:h-5 bject-contain" />
                    </button>
                    <button
                        class="rounded-lg bg-[#EFEFEF] hover:bg-[#ECECEC] px-2 py-2 flex items-center justify-center">
                        <img src="../../assets/../../assets/img/training-mgmt/underline.png" alt="밑줄 버튼"
                            class="w-6 h-6 max-xl:w-5 max-xl:h-5  object-contain" />
                    </button>
                    <button
                        class="rounded-lg bg-[#EFEFEF] hover:bg-[#ECECEC] px-2 py-2 flex items-center justify-center">
                        <img src="../../assets/../../assets/img/training-mgmt/strikethrough.png" alt="중간선 버튼"
                            class="w-6 h-6 max-xl:w-5 max-xl:h-5  object-contain" />
                    </button>
                    <div class="relative">
                        <button id="colorToggleBtn" type="button"
                            class="rounded-lg bg-[#EFEFEF] hover:bg-[#ECECEC] px-2 py-2 flex items-center justify-center">
                            <img src="../../assets/../../assets/img/training-mgmt/color.png" alt="글자색 버튼"
                                class="w-6 h-6 max-xl:w-5 max-xl:h-5 object-contain" />
                        </button>
                        <div id="colorPalette"
                            class="style-pop absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-md p-2 hidden z-[10]">
                            <!-- X 닫기 버튼 -->
                            <div class="flex justify-end mb-2">
                                <button id="closePaletteBtn" type="button"
                                    class="text-gray-500 hover:text-gray-700 text-sm">✕</button>
                            </div>
                            <ul class="array-box title-color flex flex-col gap-2">
                                <div class="g-15 flex gap-2">
                                    <button type="button" class="pop-list">
                                        <div class="circle-color w-6 h-6 rounded-full bg-red-500"></div>
                                    </button>
                                    <button type="button" class="pop-list">
                                        <div class="circle-color w-6 h-6 rounded-full bg-orange-400"></div>
                                    </button>
                                    <button type="button" class="pop-list">
                                        <div class="circle-color w-6 h-6 rounded-full bg-yellow-400"></div>
                                    </button>
                                    <button type="button" class="pop-list">
                                        <div class="circle-color w-6 h-6 rounded-full bg-green-400"></div>
                                    </button>
                                    <button type="button" class="pop-list">
                                        <div class="circle-color w-6 h-6 rounded-full bg-blue-400"></div>
                                    </button>
                                </div>
                                <div class="g-15 flex gap-2">
                                    <button type="button" class="pop-list">
                                        <div class="circle-color w-6 h-6 rounded-full bg-purple-400"></div>
                                    </button>
                                    <button type="button" class="pop-list">
                                        <div class="circle-color w-6 h-6 rounded-full bg-pink-400"></div>
                                    </button>
                                    <button type="button" class="pop-list">
                                        <div class="circle-color w-6 h-6 rounded-full bg-gray-400"></div>
                                    </button>
                                    <button type="button" class="pop-list">
                                        <div class="circle-color w-6 h-6 rounded-full bg-black"></div>
                                    </button>
                                    <button type="button" class="pop-list">
                                        <div
                                            class="circle-color w-6 h-6 rounded-full bg-white border border-gray-300">
                                        </div>
                                    </button>
                                </div>
                            </ul>
                        </div>
                    </div>
                    <div class="relative">
                        <button id="bgToggleBtn" type="button"
                            class="rounded-lg bg-[#EFEFEF] hover:bg-[#ECECEC] px-2 py-2 flex items-center justify-center">
                            <img src="../../assets/../../assets/img/training-mgmt/bg-color.png" alt="글자 배경색 버튼"
                                class="w-6 h-6 max-xl:w-5 max-xl:h-5 object-contain" />
                        </button>

                        <div id="bgColorPalette"
                            class="style-pop absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-md p-2 hidden z-[10]">
                            <div class="flex justify-end mb-2">
                                <button id="closeBgPaletteBtn" type="button"
                                    class="text-gray-500 hover:text-gray-700 text-sm">✕</button>
                            </div>
                            <ul class="array-box bg-color flex flex-col gap-2">
                                <div class="g-15 flex gap-2">
                                    <button type="button" class="bg-pop-list">
                                        <div class="circle-color w-6 h-6 rounded-full bg-red-300"></div>
                                    </button>
                                    <button type="button" class="bg-pop-list">
                                        <div class="circle-color w-6 h-6 rounded-full bg-orange-200"></div>
                                    </button>
                                    <button type="button" class="bg-pop-list">
                                        <div class="circle-color w-6 h-6 rounded-full bg-yellow-200"></div>
                                    </button>
                                    <button type="button" class="bg-pop-list">
                                        <div class="circle-color w-6 h-6 rounded-full bg-green-200"></div>
                                    </button>
                                    <button type="button" class="bg-pop-list">
                                        <div class="circle-color w-6 h-6 rounded-full bg-blue-300"></div>
                                    </button>
                                </div>
                                <div class="g-15 flex gap-2">
                                    <button type="button" class="bg-pop-list">
                                        <div class="circle-color w-6 h-6 rounded-full bg-purple-200"></div>
                                    </button>
                                    <button type="button" class="bg-pop-list">
                                        <div class="circle-color w-6 h-6 rounded-full bg-pink-200"></div>
                                    </button>
                                    <button type="button" class="bg-pop-list">
                                        <div class="circle-color w-6 h-6 rounded-full bg-gray-200"></div>
                                    </button>
                                    <button type="button" class="bg-pop-list">
                                        <div class="circle-color w-6 h-6 rounded-full bg-teal-200"></div>
                                    </button>
                                    <button type="button" class="bg-pop-list">
                                        <div class="circle-color w-6 h-6 rounded-full bg-indigo-200"></div>
                                    </button>
                                </div>
                            </ul>
                        </div>
                    </div>
                    <button
                        class="rounded-lg bg-[#EFEFEF] hover:bg-[#ECECEC] px-2 py-2 flex items-center justify-center">
                        <img src="../../assets/img/training-mgmt/left-align.png" alt="왼쪽 정렬 버튼"
                            class="w-6 h-6 max-xl:w-5 max-xl:h-5 object-contain" />
                    </button>
                    <button
                        class="rounded-lg bg-[#EFEFEF] hover:bg-[#ECECEC] px-2 py-2 flex items-center justify-center">
                        <img src="../../assets/img/training-mgmt/center-align.png" alt="가운데 정렬 버튼"
                            class="w-6 h-6 max-xl:w-5 max-xl:h-5 object-contain" />
                    </button>
                    <button
                        class="rounded-lg bg-[#EFEFEF] hover:bg-[#ECECEC] px-2 py-2 flex items-center justify-center">
                        <img src="../../assets/img/training-mgmt/right-align.png" alt="오른쪽 정렬 버튼"
                            class="w-6 h-6 max-xl:w-5 max-xl:h-5 object-contain" />
                    </button>
                </div>
            </div>
            <div id="colorPalette"
                class="style-pop absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-md p-2 hidden z-[10]">
                <ul class="array-box title-color flex flex-col gap-2">
                    <div class="g-15 flex gap-2">
                        <button type="button" class="pop-list">
                            <div class="circle-color w-6 h-6 rounded-full bg-red-500"></div>
                        </button>
                        <button type="button" class="pop-list">
                            <div class="circle-color w-6 h-6 rounded-full bg-orange-400"></div>
                        </button>
                        <button type="button" class="pop-list">
                            <div class="circle-color w-6 h-6 rounded-full bg-yellow-400"></div>
                        </button>
                        <button type="button" class="pop-list">
                            <div class="circle-color w-6 h-6 rounded-full bg-green-400"></div>
                        </button>
                        <button type="button" class="pop-list">
                            <div class="circle-color w-6 h-6 rounded-full bg-blue-400"></div>
                        </button>
                    </div>
                    <div class="g-15 flex gap-2">
                        <button type="button" class="pop-list">
                            <div class="circle-color w-6 h-6 rounded-full bg-purple-400"></div>
                        </button>
                        <button type="button" class="pop-list">
                            <div class="circle-color w-6 h-6 rounded-full bg-pink-400"></div>
                        </button>
                        <button type="button" class="pop-list">
                            <div class="circle-color w-6 h-6 rounded-full bg-gray-400"></div>
                        </button>
                        <button type="button" class="pop-list">
                            <div class="circle-color w-6 h-6 rounded-full bg-black"></div>
                        </button>
                        <button type="button" class="pop-list">
                            <div class="circle-color w-6 h-6 rounded-full bg-white border border-gray-300">
                            </div>
                        </button>
                    </div>
                </ul>
            </div>
            <div
                class="col-span-2 max-xl:col-span-1 max-xl:flex max-xl:flex-col px-2 bg-[#F9F9F9] border-b border-[#EFEFEF] h-[500px] w-full grid grid-cols-6">
                <label
                    class="col-span-1 px-4 max-sm:px-0 text-[18px] max-sm:text-[15px] font-bold text-[#292929] flex items-center py-4 max-xl:hidden">교육내용</label>
                    <div class="col-span-5 flex items-center h-full">
                        <div class="w-full bg-[#FFFFFF] border border-[#EFEFEF] rounded-xl h-[480px] flex items-center">
                        <textarea
                            class="w-full h-full px-4 py-4 text-[16px] text-[#292929] rounded-xl resize-none focus:outline-none focus:border-[#2B5BBB] placeholder-[#AFAFAF]"
                            placeholder="교육내용을 입력하세요"></textarea>
                        </div>
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
                <button type="button" onclick="window.location.href='user.html'"
                    class="max-w-[282px] w-full px-5 py-2 bg-[#F5F5F5] rounded-[10px] hover:bg-[#EBEBEB] border border-[#DBDEE3]">
                    취소하기
                </button>
            </div>
        </div>

    </form>
    <p class="mt-4 text-gray-700">username(아이디): {{ username }}</p>
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
    <p class="mt-4 text-gray-700">nicenumber(NICE 번호): {{ niceNumber }}</p>
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

    const statusOptions = ['선택하세요', '과정개설 및 접수중', '접수마감', '과정종료'];
    const status = ref('')

    const positionOptions = ['선택하세요','서울', '경기', '자율'];
    const position = ref('')

    const catagoryOptions = ['선택하세요', '댄스스포츠', '웰빙댄스', '라인댄스','라틴댄스'];
    const catagory = ref('')

    const roundOptions = ['선택하세요', '1회차', '2회차', '3회차', '4회차', '기타'];
    const round = ref('')
    
    const semesterOptions = ['선택하세요', '1학기', '하계', '2학기', '동계'];
    const semester = ref('')

    const dayOptions = ['선택하세요', '매주 월요일', '매주 화요일', '매주 수요일', '매주 목요일', '매주 금요일', '매주 토요일', '매주 일요일'];
    const day = ref('')

    const eduplaceOptions = ['선택하세요', '', '', '', '', '', '', ''];
    const eduplace = ref('')

</script>