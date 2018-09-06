import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import store from './store'

const todoChangeHandler = (value) => store.dispatch({type: 'CURRENT_UPDATE', payload: value})

const render = () => {
    const state = store.getState()

    ReactDOM.render(<App
            todos={state.todos}
            currentTodo={state.currentTodo}
            changeCurrent={todoChangeHandler}
        />,
        document.getElementById('root'));
}

render()

store.subscribe(render)

registerServiceWorker();
