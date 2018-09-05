import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList';

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'


// addTodo with button click
// removeTodo with li click
// matches snapshot

configure({ adapter: new Adapter() })

describe('<TodoList />', () => {
    const testTodos = [
        {id: 1, name: 'test1', isChecked: false},
        {id: 2, name: 'test2', isChecked: false},
        {id: 3, name: 'test3', isChecked: true},
    ]

    it('todolist has todoitem like todos props length', () => {
        const wrapper = shallow(<TodoList todos={testTodos}/>)

        expect(wrapper.find('ul').children().length).toBe(testTodos.length)
        expect(wrapper.find('TodoItem').length).toBe(testTodos.length)
    })
})

