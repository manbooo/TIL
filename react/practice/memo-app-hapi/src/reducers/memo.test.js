import reducer from './memo'

describe('memo Reducer', () => {
    test('returns a state object', () => {
        const result = reducer(undefined, {type: 'ANYTHING'})

        expect(result).toBeDefined()
    })

    test('add a memo', () => {
        const prev = {
            memos: [
                {id: 1, name: 'test1'},
                {id: 2, name: 'test2'},
                {id: 3, name: 'test3'}
            ]
        }

        const expected = {
            memos: [
                {id: 1, name: 'test1'},
                {id: 2, name: 'test2'},
                {id: 3, name: 'test3'},
                {id: 4, name: 'test4'}
            ]
        }

        const action = {type: 'MEMO_ADD', payload: {id: 4, name: 'test4'}}

        const result = reducer(prev, action)

        expect(result).toEqual(expected)
    })

    test('remove a memo', () => {
        const prev = {
            memos: [
                {id: 1, name: 'test1'},
                {id: 2, name: 'test2'},
                {id: 3, name: 'test3'},
                {id: 4, name: 'test4'}

            ]
        }

        const expected = {
            memos: [
                {id: 1, name: 'test1'},
                {id: 3, name: 'test3'},
                {id: 4, name: 'test4'}
            ]
        }

        const action = {type: 'MEMO_REMOVE', payload: 2}

        const result = reducer(prev, action)

        expect(result).toEqual(expected)
    })

    test('update a memo', () => {
        const prev = {
            memos: [
                {id: 1, name: 'test1'},
                {id: 2, name: 'test2'},
                {id: 3, name: 'test3'}
            ]
        }

        const expected = {
            memos: [
                {id: 1, name: 'test1'},
                {id: 2, name: 'test2'},
                {id: 3, name: 'test3_edit'}
            ]
        }

        const action = {type: 'MEMO_UPDATE', payload: {id: 3, name: 'test3_edit'}}

        const result = reducer(prev, action)

        expect(result).toEqual(expected)
    })

})
