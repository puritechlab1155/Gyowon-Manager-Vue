// composables/useCheckboxGroup.js
import { ref, computed, watch } from 'vue'

export function useCheckboxGroup(itemsRef) {
    const selectedItems = ref([])

    const isAllSelected = computed(() =>
        itemsRef.value.length > 0 &&
        selectedItems.value.length === itemsRef.value.length
    )

    const toggleItem = (item) => {
        const index = selectedItems.value.indexOf(item)
        if (index > -1) {
            selectedItems.value.splice(index, 1)
        } else {
            selectedItems.value.push(item)
        }
    }

    const toggleSelectAll = () => {
        if (isAllSelected.value) {
            selectedItems.value = []
        } else {
            selectedItems.value = [...itemsRef.value]
        }
    }

    return {
        selectedItems,
        isAllSelected,
        toggleItem,
        toggleSelectAll,
    }
}