import reducer from './todo'

describe('Todo Reducer', () => {
    test('returns a state object', () => {
        const result = reducer(undefined, {type: 'ANYTHING'})

        expect(result).toBeDefined()
    })

    test('adds a todo', () => {
        const startState = {
            todos: [
                {id: 1, name: 'test1', isChecked: false},
                {id: 2, name: 'test2', isChecked: false},
                {id: 3, name: 'test3', isChecked: true},
            ]
        }

        const expectedState = {
            todos: [
                {id: 1, name: 'test1', isChecked: false},
                {id: 2, name: 'test2', isChecked: false},
                {id: 3, name: 'test3', isChecked: true},
                {id: 4, name: 'test4', isChecked: false},
            ]
        }

        const action = {type: 'TODO_ADD', payload: {id: 4, name: 'test4', isChecked: false}}

        const result = reducer(startState, action)

        expect(result).toEqual(expectedState)
    })
})