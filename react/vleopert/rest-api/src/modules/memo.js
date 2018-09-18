import { createAction, handleActions } from 'redux-actions'
import { pender } from 'redux-pender'

import * as WebAPI from 'lib/web-api'

// 액션 타입
const GET_INITIAL_MEMO = 'memo/GET_INITIAL_MEMO'
const CREATE_MEMO = 'memo/CREATE_MEMO'
const GET_RECENT_MEMO = 'memo/GET_RECENT_MEMO'
const UPDATE_MEMO = 'memo/UPDATE_MEMO'
const DELETE_MEMO = 'memo/DELETE_MEMO'

// 액션 생성자
export const getInitialMemo = createAction(GET_INITIAL_MEMO, WebAPI.getInitialMemo)
export const createMemo = createAction(CREATE_MEMO, WebAPI.createMemo) // { title, body }
export const getRecentMemo = createAction(GET_RECENT_MEMO, WebAPI.getRecentMemo)
export const updateMemo = createAction(UPDATE_MEMO, WebAPI.updateMemo, payload => payload) // { id, memo: {title,body} }
export const deleteMemo = createAction(DELETE_MEMO, WebAPI.deleteMemo, payload => payload) // id


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
    }),
    ...pender({
        type: UPDATE_MEMO,
        onSuccess: (state, action) => {
            const { id } = action.meta
            const index = state.data.findIndex(memo => memo.id === id)

            return {
                data: [
                    ...state.data.slice(0, index),
                    {id: id, ...action.payload},
                    ...state.data.slice(index + 1)
                ]
            }
        }
    }),
    ...pender({
        type: DELETE_MEMO,
        onSuccess: (state, action) => {
            const id = action.meta
            const index = state.data.findIndex(memo => memo.id === id)
            return {
                data: [
                    ...state.data.slice(0, index),
                    ...state.data.slice(index + 1)
                ]
            }
        }
    })
}, initialState)
