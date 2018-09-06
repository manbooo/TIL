import React from 'react';
import {connect} from 'react-redux'

const TodoItem = ({id, name, isChecked}) => (
    <li>
        <input type="checkbox"  defaultChecked={isChecked}/> {name}
    </li>
)


const TodoList = (props) => (
    console.log('List rendering') ||
    <div className="Todo-List">
        <ul>
            {props.todos.map(todo => <TodoItem key={todo.id} {...todo} />)}
        </ul>
    </div>
)

export default connect(
    (state) => ({todos: state.todos})
)(TodoList)