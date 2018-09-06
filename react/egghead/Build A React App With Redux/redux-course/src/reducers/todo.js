import {getTodos} from '../lib/todoServices'

const inintState = {
    todos: [],
    currentTodo: ''
}

// action name
const TODO_ADD = 'TODO_ADD'
const TODO_LOAD = 'TODO_LOAD'
const CURRENT_UPDATE = 'CURRENT_UPDATE'


export const updateCurrent = (value) => ({type: CURRENT_UPDATE, payload: value})

export const loadTodos = (todos) => ({type: TODO_LOAD, payload: todos})

export const fetchTodos = () => {
    return (dispatch) => {
        getTodos()
            .then(todos => dispatch(loadTodos(todos)))
    }
}

export default (state=inintState, action) => {
    switch (action.type) {
        case TODO_ADD:
            return {...state, todos: state.todos.concat(action.payload)}
        case TODO_LOAD:
            return {...state, todos: action.payload}
        case CURRENT_UPDATE:
            return {...state, currentTodo: action.payload}
        default:
            return state
    }
}