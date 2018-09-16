import { createAction, handleActions } from 'redux-actions'
import * as WebAPI from 'lib/web-api'

// 액션 타입
const CREATE_MEMO = 'memo/CREATE_MEMO'

// 액션 생성자
export const createMemo = createAction(CREATE_MEMO, WebAPI.createMemo) // { title, body }

const initialState = {
    memo: []

}

export default handleActions({

}, initialState)
