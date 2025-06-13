<!-- components/StatisticSummary.vue -->
<template>
  <tr class="h-[60px] border-b bg-[#EDF3FF]">
    <td class="px-2 w-[57%] text-[#727272] border-r" colspan="5">
      합계 (환불, 취소, 연기된 회원은 포함되지 않음)
    </td>
    <td class="px-2 w-[7%] text-[#727272] border-r">{{ totalPaid }}</td>
    <td class="px-2 w-[7%] text-[#727272] border-r">{{ totalUnpaid }}</td>
    <td class="px-2 w-[7%] text-[#2B5BBB] font-semibold">{{ totalCount }}</td>
  </tr>
</template>

<script setup>
defineProps({
  totalPaid: Number,
  totalUnpaid: Number,
  totalCount: Number
})
</script>
