import { addMemo, removeMemo, updateMemo } from './memoHelpers'

test('addMemo should add the passed memo to the list', () => {
    const prev = [
        {id: 1, content: 'one'},
        {id: 2, content: 'two'}
    ]

    const expected = [
        {id: 1, content: 'one'},
        {id: 2, content: 'two'},
        {id: 3, content: 'three'}
    ]

    const newMemo = {id: 3, content: 'three'}

    const result = addMemo(prev, newMemo)

    expect(result).toEqual(expected)
})

test('addMemo should not mutate the existing memo array', () => {
    const prev = [
        {id: 1, content: 'one'},
        {id: 2, content: 'two'}
    ]

    const expected = [
        {id: 1, content: 'one'},
        {id: 2, content: 'two'},
        {id: 3, content: 'three'}
    ]

    const newMemo = {id: 3, content: 'three'}

    const result = addMemo(prev, newMemo)

    expect(result).not.toBe(prev)

})

test('removeMemo should remove an item by id', () => {
    const prev = [
        {id:1, name: 'one', isComplete: false},
        {id:2, name: 'two', isComplete: false},
        {id:3, name: 'three', isComplete: false}
    ]


    const expected = [
        {id:1, name: 'one', isComplete: false},
        {id:3, name: 'three', isComplete: false}
    ]

    const targetId = 2

    const result = removeMemo(prev, targetId)

    expect(result).toEqual(expected)
})

test('removeMemo should not mutate the original array', () => {
    const prev = [
        {id:1, name: 'one', isComplete: false},
        {id:2, name: 'two', isComplete: false},
        {id:3, name: 'three', isComplete: false}
    ]

    const targetId = 2

    const result = removeMemo(prev, targetId)

    expect(result).not.toBe(prev)
})


test('findById should return the expected item from an array', () => {
    const prev = [
        {id: 1, content: 'one'},
        {id: 2, content: 'two'},
        {id: 3, content: 'three'}
    ]

    const expected = {id:2, content: 'two'}

    const result = findById(prev, 2)

    expect(result).toEqual(expected)
})

test('updateMemo should update an item by id', () => {
    const prev = [
        {id: 1, content: 'one'},
        {id: 2, content: 'two'},
        {id: 3, content: 'three'}
    ]

    const expected = [
        {id: 1, content: 'one'},
        {id: 2, content: 'update test_2'},
        {id: 3, content: 'three'}
    ]

    const updated = {id: 2, content: 'update test_2'}

    const result = updateMemo(prev, updated)

    expect(result).toEqual(expected)
})

test('updateMemo should not mutate the original array', () => {
    const prev = [
        {id: 1, content: 'one'},
        {id: 2, content: 'two'},
        {id: 3, content: 'three'}
    ]

    const updated = {id: 2, content: 'update test_2'}

    const result = updateMemo(prev, updated)

    expect(result).not.toBe(prev)
})
