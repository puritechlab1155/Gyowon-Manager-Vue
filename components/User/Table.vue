<template>
    <div class="w-full overflow-x-auto scroll-hidden">
        <table :id="headerId" class="min-w-[1280px] w-full rounded-[12px] text-center bg-[#Fefefe] drop-shadow">
            <thead>
                <tr class="text-[18px] h-[70px]">
                    <th class="w-[4%] font-semibold">번호</th>
                    <th class="w-[7%] font-semibold">아이디</th>
                    <th class="w-[6%] font-semibold">성명</th>
                    <th class="w-[4%] font-semibold">성별</th>
                    <th class="w-[7%] font-semibold">생년월일</th>
                    <th class="w-[5%] font-semibold">근무지역</th>
                    <th class="w-[10%] font-semibold">소속교육지원청</th>
                    <th class="w-[9%] font-semibold">직장명</th>
                    <th class="w-[5%] font-semibold">설립구분</th>
                    <th class="w-[7%] font-semibold">직급</th>
                    <th class="w-[7%] font-semibold">전공과목</th>
                    <th class="w-[8%] font-semibold">연락처</th>
                    <th class="w-[12%] font-semibold">관리</th>
                </tr>
            </thead>
        </table>
        <table :id="id" class="mt-4 min-w-[1280px] w-full text-center border-collapse">
            <tbody class="rounded-[12px]">
                <tr v-for="(row, index) in data" :key="row.id" 
                    class="text-[#727272] text-[18px] font-normal h-[70px] border-b border-gray-300">
                    <td class="w-[4%]">{{ row.number }}</td>
                    <td class="w-[7%]">{{ row.userId }}</td>
                    <td class="w-[6%] text-[#2B5BBB]">
                        <span class="font-semibold hover:underline cursor-pointer" @click.prevent="handleNameClick(row)">{{ row.name }}</span>
                    </td>
                    <td class="w-[4%]">{{ row.gender }}</td>
                    <td class="w-[7%]">{{ row.birthDate }}</td>
                    <td class="w-[5%]">{{ row.workArea }}</td>
                    <td class="w-[10%]">{{ row.educationOffice }}</td>
                    <td class="w-[9%]">{{ row.workplace }}</td>
                    <td class="w-[5%]">{{ row.establishmentType }}</td>
                    <td class="w-[7%]">{{ row.position }}</td>
                    <td class="w-[7%]">{{ row.major }}</td>
                    <td class="w-[8%]">
                        <a :href="`tel:${row.contact}`" class="text-[#2B5BBB] font-semibold">{{ row.contact }}</a>
                    </td>
                    <td class="w-[12%]">
                        <div class="flex justify-center gap-2 px-2">
                            <EditBtn :to="`/User/Edit/${row.id}`" />
                            <SubjectApply :userId="row.userId" />
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

    <script setup>
    import EditBtn from '~/components/Btn/Edit.vue'
    import SubjectApply from './Apply.vue'

    const props = defineProps({
        data: {
            type: Array,
            required: true
        },
        id: String,
        headerId: String
    })

    const emit = defineEmits(['name-clicked'])

    function handleNameClick(user) {
        console.log('handleNameClick user:', user)
        emit('name-clicked', user)
    }

</script>