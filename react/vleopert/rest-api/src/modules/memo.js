import { createAction, handleActions } from 'redux-actions'
import { pender } from 'redux-pender'

import * as WebAPI from 'lib/web-api'

// 액션 타입
const GET_INITIAL_MEMO = 'memo/GET_INITIAL_MEMO'
const CREATE_MEMO = 'memo/CREATE_MEMO'
const GET_RECENT_MEMO = 'memo/GET_RECENT_MEMO'

// 액션 생성자
export const getInitialMemo = createAction(GET_INITIAL_MEMO, WebAPI.getInitialMemo)
export const createMemo = createAction(CREATE_MEMO, WebAPI.createMemo) // { title, body }
export const getRecentMemo = createAction(GET_RECENT_MEMO, WebAPI.getRecentMemo)

const initialState = {
    data: []
}

export default handleActions({
    ...pender({
        type: GET_INITIAL_MEMO,
        onSuccess: (state, action) => {
            const result = action.payload.data

            return { data: result }
        }
    }),
    ...pender({
        type: GET_RECENT_MEMO,
        onSuccess: (state, action) => {
            const result = action.payload.data.concat(state.data)

            return { data: result }
        }
    })

}, initialState)
