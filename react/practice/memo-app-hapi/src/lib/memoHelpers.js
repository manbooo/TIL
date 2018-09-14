export const addMemo = (list, memo) => [...list, memo]

export const removeMemo = (list, id) => {
    const removeIndex = list.findIndex(item => item.id === id)

    const result = [
        ...list.slice(0, removeIndex),
        ...list.slice(removeIndex + 1)
    ]

    return result
}

export const updateMemo = (list, updatedItem) => {
    const updateIndex = list.findIndex(item => item.id === updatedItem.id)

    const result = [
        ...list.slice(0, updateIndex),
        updatedItem,
        ...list.slice(updateIndex + 1)
    ]

    return result
}
