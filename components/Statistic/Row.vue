<!-- components/StatisticRow.vue -->
<template>
  <tr class="bg-[#FEFEFE] h-[60px] border-b">
    <td class="px-2 w-[17%] text-[#727272] border-r">
      <div class="flex justify-center items-center gap-3">
        <div class="bg-[#FEFEFE] text-[16px] text-[#2B5BBB] border border-[#2B5BBB] rounded-lg text-center px-3 py-1">
          {{ item.job_classification }}
        </div>
        <div class="bg-[#4E9DFB] text-[16px] text-[#FEFEFE] border border-[#4E9DFB] rounded-lg text-center px-3 py-1">
          {{ item.division }}
        </div>
      </div> 
    </td>
    <td class="px-2 w-[17%] text-[#727272] text-left border-r">{{ item.course_name }}</td>
    <td class="px-2 w-[12%] text-[#727272] border-r">{{ item.course_place }}</td>
    <td class="px-2 w-[10%] text-[#727272] border-r">{{ item.day_of_week }}</td>
    <td class="px-2 w-[7%] text-[#727272] border-r">{{ item.time }}</td>   
    <td class="px-2 w-[7%] text-[#727272] border-r">{{ item.yes_pay }}</td>
    <td class="px-2 w-[7%] text-[#727272] border-r">{{ item.no_pay }}</td>
    <td class="px-2 w-[7%] text-[#2B5BBB]">
      <a class="font-semibold hover:underline" href="student-pay.html">{{ item.total_pay }}</a>
    </td>
  </tr>
</template>

<script setup>
defineProps({
  item: Object
})
</script>
