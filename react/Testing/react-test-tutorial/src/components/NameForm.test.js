import React from 'react'
import { shallow } from 'enzyme'
import NameForm from './NameForm'
// import renderer from 'react-test-renderer'

describe('NameForm', () => {
    let component = null

    let changed = null

    const onInsert = (name) => {
        changed = name
    }

    it('renders correcty', () => {
        // component = renderer.create(<NameForm />)
        component = shallow(<NameForm onInsert={onInsert} />)

    })

    it('matches snapshot', () => {
        // const tree = component.toJSON()
        // expect(tree).toMatchSnapshot()

        expect(component).toMatchSnapshot()
    })

    describe('insert new text', () => {
        it('has a form', () => {
            expect(component.find('form').exists()).toBe(true);
        })

        it('has an input', () => {
            expect(component.find('input').exists()).toBe(true);
        })

        it('simulates input change', () => {
            const mockedEvent = {
                target: {
                    value: 'hello'
                }
            }

            // 이벤트를 시뮬레이트 합니다. 두번째 파라미터는 이벤트 객체
            component.find('input').simulate('change', mockedEvent)

            expect(component.state().name).toBe('hello')
        })

        it('simulates form submit', () => {
            const mockedEvent = {
                preventDefault: () => null
            }

            component.find('form').simulate('submit', mockedEvent)

            expect(component.state().name).toBe('');
            expect(changed).toBe('hello')
        })
    })
})


