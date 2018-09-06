const inintState = {
    todos: [
        {id: 1, name: "Rendering Static UI", isChecked: true},
        {id: 2, name: "Create Initial State", isChecked: true},
        {id: 3, name: "Use State to Render UI", isChecked: false},
    ],
    currentTodo: ''
}
export default (state=inintState, action) => {
    switch (action.type) {
        case 'TODO_ADD':
            return {...state, todos: state.todos.concat(action.payload)}
        case 'CURRENT_UPDATE':
            return {...state, currentTodo: action.payload}

        default:
            return state
    }
}