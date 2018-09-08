import { createStore } from 'redux'
import reducer from './reducers/memo'

export default createStore(
    reducer
)