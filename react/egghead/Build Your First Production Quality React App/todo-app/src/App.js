import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import PropTypes from 'prop-types'

import { TodoForm, TodoList, Footer } from "./components/todo";
import { addTodo, findById, generateId, toggleTodo, updateTodo, removeTodo, filterTodos } from './lib/todoHelpers'
import { pipe, partial } from './lib/utils'
import { loadTodos, createTodo, saveTodo, destroyTodo } from './lib/todoService'

class App extends Component {

    state = {
        todos: [],
        currentTodo: ''
    }

    static contextTypes = {
        route: PropTypes.string
    }

    componentDidMount() {
        loadTodos()
            .then(todos => this.setState({todos}))
    }

    handleInputChange = (e) => {
        this.setState({
            currentTodo: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        if (this.state.currentTodo) {
            const newId = generateId()
            const newTodo = {id: newId, name: this.state.currentTodo, isComplete: false}
            const updatedTodos = addTodo(this.state.todos, newTodo)

            this.setState({
                todos: updatedTodos,
                currentTodo: ''
            })

            createTodo(newTodo)
                .then(() => console.log('Todo added'))
        }
    }

    handleEmptySubmit = (e) => {
        e.preventDefault()

        this.setState({
            errorMessage: 'Please supply a todo name'
        })
    }

    handleToggle = (id) => {
        const getToggledTodo = pipe(findById, toggleTodo)
        const updated = getToggledTodo(id, this.state.todos)
        const getUpdatedTodos = partial(updateTodo, this.state.todos)
        const updatedTodos = getUpdatedTodos(updated)

        this.setState({todos: updatedTodos})

        saveTodo(updated)
            .then(() => this.showTempMessage('Todo Updated'))
    }

    handleRemove = (id, e) => {
        e.preventDefault()

        const updatedTodos = removeTodo(this.state.todos, id)

        this.setState({todos: updatedTodos})

        destroyTodo(id)
    }

    showTempMessage = (msg) => {
        this.setState({message: msg})
        setTimeout(() => this.setState({message: ''}), 2500)
    }

    render() {
        const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit

        const displayTodos = filterTodos(this.state.todos, this.context.route)

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">React Todos</h1>
                </header>

                <div className="Todo-App">
                    {this.state.errorMessage && <span className='error'>{this.state.errorMessage}</span>}
                    <TodoForm
                        handleInputChange={this.handleInputChange}
                        handleSubmit={submitHandler}
                        currentTodo={this.state.currentTodo}
                    />

                    <TodoList
                        handleToggle={this.handleToggle}
                        handleRemove={this.handleRemove}
                        todos={displayTodos}
                    />
                </div>

                <Footer />
            </div>
        );
    }
}

export default App;
