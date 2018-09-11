import App, { doIncrement, doDecrement, Counter } from './App'
import React from 'react';
import axios from 'axios'

import { expect } from 'chai'
import { mount, render, shallow,  configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'

configure({ adapter: new Adapter() })

describe('Local State', () => {
    // describe: 테스트의 묶음
    // it : 테스트 케이 정의
    // 값을 정의하고(arrange), 실행하고(act), 단언한다.(assert)

    it('should increment the counter in state', () => {
        const state = { counter: 0 }
        const newState = doIncrement(state)

        expect(newState.counter).toEqual(1)
    })

    it('should decrement the counter in state', () => {
        const state = { counter: 0 }
        const newState = doDecrement(state)

        expect(newState.counter).toEqual(-1)
    })
})

describe('App Component', () => {
    const result = [3, 5, 9]
    const promise = Promise.resolve(result)

    before(() => {
        sinon.stub(axios, 'get').withArgs('http://mydomain/counter').returns(promise)
    })

    after(() => {
        axios.get.restore()
    })

    it('componentDidMount를 호출한다', () => {
        sinon.spy(App.prototype, 'componentDidMount')

        const wrapper = mount(<App />)
        expect(App.prototype.componentDidMount().calledOnce).to.equal(true)
    })

    it('비동기로 카운터를 가져온다', () => {
        const wrapper = shallow(<App />)

        expect(wrapper.state().asyncCounters).to.equal(null)

        promise.then(() => {
            expect(wrapper.state().asyncCounters).to.equal(result)
        })
    })

    it('Counter 래퍼를 그린다', () => {
        const wrapper = shallow(<App />)

        expect(wrapper.find(Counter).length).to.equal(1)
    })

    it('Counter 래퍼에 모든 Prop이 전달되었다', () => {
        const wrapper = shallow(<App />)
        let counterWrapper = wrapper.find(Counter)

        wrapper.setState({ counter: 0 })
        expect(counterWrapper.props().counter).to.equal(0)

        wrapper.setState({ counter: -2 })
        counterWrapper = wrapper.find(Counter)
        expect(counterWrapper.props().counter).to.equal(-2)
    })

    it('Counter를 하나 올린다', () => {
        const wrapper = shallow(<App />)

        wrapper.setState({ counter: 0 })
        wrapper.find('button').at(0).simulate('click')

        expect(wrapper.state().counter).to.equal(1)
    })

    it('Counter를 하나 내린다', () => {
        const wrapper = shallow(<App />)

        wrapper.setState({ counter: 0 })
        wrapper.find('button').at(1).simulate('click')

        expect(wrapper.state().counter).to.equal(-1)
    })
})
