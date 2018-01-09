import * as types from '../actions/ActionTypes';

// reducer의 초기 상태 정의
const initialState = {
  number: 0,
  dummy: 'dummy dummy',
  dumbObject: {
    d: 0,
    u: 1,
    m: 2,
    b: 4
  }
};

// state가 undefine일 경우 initialState를 사용한다.
export default function counter(state = initialState, action) {
    /* ... */
    switch(action.type) {
        case types.INCREMENT:
            return {
                ...state,
                number: state.number + 1,
                dumbObject: { ...state.dumbObject, u: 0 }
            };
        case types.DECREMENT:
            return {
                ...state,
                number: state.number - 1
            };
        default:
            return state;
    }
}
