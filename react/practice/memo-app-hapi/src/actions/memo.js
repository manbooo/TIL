import {
    MEMO_ADD,
    MEMO_REMOVE,
    MEMO_UPDATE
} from './ActionTypes'

import { createAction } from 'redux-actions'

export const memoAdd = createAction(MEMO_ADD, value => value)
export const memoRemove = createAction(MEMO_REMOVE, id => id)
export const memoUpdate = createAction(MEMO_UPDATE, value => value)
