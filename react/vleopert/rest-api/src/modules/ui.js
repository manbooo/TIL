import { createAction, handleActions } from 'redux-actions'

const OPEN_VIEWER = 'OPEN_VIEWER'
const CLOSE_VIEWER = 'CLOSE_VIEWER'

export const openViewer = createAction(OPEN_VIEWER) // memo
export const closeViewer = createAction(CLOSE_VIEWER)

const initialState = {
    memo: {
        open: false,
        info: {
            id: null,
            title: null,
            body: null
        }
    }
}

export default handleActions({
    [OPEN_VIEWER]: (state, action) => {
        return {
            memo: {
                open: true,
                info: action.payload
            }
        }
    },
    [CLOSE_VIEWER]: (state, action) => {
        return {
            memo: {
                open: false,
                ...state.memo
            }
        }
    }
}, initialState)
