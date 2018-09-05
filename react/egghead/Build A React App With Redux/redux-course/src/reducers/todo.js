const inintState = {
    todos: []
}
export default (state=inintState, action) => {
    switch (action.type) {
        case 'TODO_ADD':
            return {...state, todos: state.todos.concat(action.payload)}

        default:
            return state
    }
}