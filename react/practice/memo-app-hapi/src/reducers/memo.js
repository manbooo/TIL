import { MEMO_ADD, MEMO_REMOVE, MEMO_UPDATE } from './../actions/ActionTypes'
import {addMemo, removeMemo, updateMemo} from "../lib/memoHelpers";
import { handleActions } from "redux-actions";

const initState = {
    memos: []
}

let id = 0

export default handleActions({
    [MEMO_ADD]: (state, action) => {
        let result = addMemo(state.memos, {id: id++, ...action.payload})

        return { memos: result }
    },
    [MEMO_REMOVE]: (state, action) => {
        let result = removeMemo(state.memos, action.payload)

        return { memos: result }
    },
    [MEMO_UPDATE]: (state, action) => {
        let result = updateMemo(state.memos, action.payload)

        return { memos: result }
    }
}, initState)
