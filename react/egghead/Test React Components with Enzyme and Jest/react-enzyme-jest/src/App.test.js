import React from 'react';
import ReactDOM from 'react-dom';
import App, {Link} from './App';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

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

    // Snapshot
    it('matches the snapshot', () => {
        const tree = shallow(<App />)
        expect(toJson(tree)).toMatchSnapshot()
    })
})

describe('<Link /', () => {
    // using instance
    it('link component accepts address prop', () => {
        const wrapper = shallow(<Link address="www.google.com"/>)
        expect(wrapper.instance().props.address).toBe('www.google.com')
    })

    // using props values
    it('a tag node renders href correctly', () => {
        const wrapper = shallow(<Link address="www.google.com"/>)
        expect(wrapper.props().href).toBe('www.google.com')
    })

    it('returns null with true hide prop', () =>{
        const wrapper = shallow(<Link hide={false} />)
        expect(wrapper.find('a').length).toBe(1)

        wrapper.setProps({hide: true})
        expect(wrapper.get(0)).toBeNull()
    })
})


