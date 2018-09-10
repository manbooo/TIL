import { doIncrement, doDecrement } from './App'

describe('Local State', () => {
    // describe: 테스트의 묶음
    // it : 테스트 케이 정의
    // 값을 정의하고(arrange), 실행하고(act), 단언한다.(assert)

    it('should increment the counter in state', () => {
        const state = { counter: 0 }
        const newState = doIncrement(state)

        expect(newState.counter).to.equal(1)
    })

    it('should decrement the counter in state', () => {
        const state = { counter: 0 }
        const newState = doDecrement(state)

        expect(newState.counter).to.equal(-1)
    })
})
