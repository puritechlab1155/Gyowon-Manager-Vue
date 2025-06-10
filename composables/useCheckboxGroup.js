import { ref, computed } from 'vue'

export function useCheckboxGroup(itemsRef) {
    const selectedItems = ref([])

    const isAllSelected = computed(() =>
        itemsRef.value.length > 0 &&
        selectedItems.value.length === itemsRef.value.length
    )

    const toggleItem = (itemId, checked) => {
        const index = selectedItems.value.indexOf(itemId)
        if (checked && index === -1) {
            selectedItems.value.push(itemId)
        } else if (!checked && index > -1) {
            selectedItems.value.splice(index, 1)
        }
    }

    const toggleSelectAll = (checked) => {
        if (checked) {
            // 전체 선택: 모든 아이템의 number를 selectedItems에 추가
            selectedItems.value = itemsRef.value.map(item => item.id)
        } else {
            // 전체 해제: selectedItems 배열 초기화
            selectedItems.value = []
        }
    }

    return {
        selectedItems,
        isAllSelected,
        toggleItem,
        toggleSelectAll,
    }
}