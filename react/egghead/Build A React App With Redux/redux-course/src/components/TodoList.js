import React from 'react';

const TodoItem = ({id, name, isChecked}) => (
    <li>
        <input type="checkbox"  defaultChecked={isChecked}/> {name}
    </li>
)


export default (props) => (
    <div className="Todo-List">
        <ul>
            {props.todos.map(todo => <TodoItem key={todo.id} {...todo} />)}
        </ul>
    </div>
)