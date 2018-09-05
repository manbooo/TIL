import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

// Shallow rendering
describe('<App />', () => {
    const wrapper = shallow(<App />)

    it('should render App', () => {
        console.log(wrapper.debug())
    })

    it('should contain 1 p', () => {
        expect(wrapper.find('p').length).toBe(1)
    })

    it('should contain class name is App-intro', () => {
        expect(wrapper.find('.App-intro').exists()).toBe(true)
    })

    it('should have 3 children in ul tag ', () => {
        expect(wrapper.find('ul').children().length).toBe(3)
    })

    it('should have ul class name is tyler ', () => {
        expect(wrapper.find('ul').hasClass('tyler')).toBe(true)
    })

})

