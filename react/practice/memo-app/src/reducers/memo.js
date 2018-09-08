const initState = {
    memo: []
}

// Action name
const ADD_MEMO = 'ADD_MEMO'
const REMOVE_MEMO = 'REMOVE_MEMO'
const FETCH_MEMO = 'FETCH_MEMO'

export const addMemo = (data) => ({ tyoe: ADD_MEMO, payload: data })
export const removeMemo = (id) => ({type: REMOVE_MEMO, payload: id})
export const fetchMemo = (data) => ({type: FETCH_MEMO, payload: data})

export default (state = initState, action) => {
    switch (action.type) {
        case ADD_MEMO:
            return [
                ...state,
                action.payload
            ]
        case REMOVE_MEMO:
            return (
                state.memo.filter(m => m.id !== action.payload)
            )
        default:
            state
    }
}