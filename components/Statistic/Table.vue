<!-- components/StatisticTable.vue -->
<template>
  <div class="w-full">
    <div class="overflow-x-auto">
      <div class="min-w-[1400px]">
        <!-- 테이블 헤더 -->
        <table :id="headerId" class="w-full bg-[#FEFEFE] rounded-[12px] text-center table-fixed drop-shadow">
          <StatisticHeader />
        </table>

        <!-- 테이블 본문 -->
        <table :id="tableId" class="table-fixed w-full rounded-[12px] overflow-hidden text-center mt-4 bg-[#FEFEFE]">
          <tbody>
            <StatisticRow
              v-for="(item, index) in data"
              :key="item.id || index"
              :item="item"
              @click="() => $emit('row-clicked', item)"
            />
            <tr v-if="!data || data.length === 0">
              <td colspan="8" class="text-center text-[#727272] py-4">데이터가 없습니다.</td>
            </tr>
            <StatisticSummary
              :totalPaid="totalPaid"
              :totalUnpaid="totalUnpaid"
              :totalCount="totalCount"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import StatisticHeader from './Header.vue'
import StatisticRow from './Row.vue'
import StatisticSummary from './Summary.vue'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  tableId: {
    type: String,
    default: '',
  },
  headerId: {
    type: String,
    default: '',
  }
})

const emit = defineEmits(['row-clicked'])

const totalPaid = computed(() =>
  props.data.reduce((sum, item) => sum + (item.yes_pay || 0), 0)
)

const totalUnpaid = computed(() =>
  props.data.reduce((sum, item) => sum + (item.no_pay || 0), 0)
)

const totalCount = computed(() => totalPaid.value + totalUnpaid.value)
</script>