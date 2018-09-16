import { createStore, applyMiddleware, compose } from 'redux'
import PenderMiddleware from 'redux-pender'

import reducer from 'modules/memo'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, composeEnhancers(
    applyMiddleware(PenderMiddleware())
))

export default store
