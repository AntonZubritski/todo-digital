import { createStore, combineReducers, applyMiddleware } from 'redux'
import { todoReducer, changeReducer } from './reducer'
import thunk from 'redux-thunk'

const reducers = combineReducers({
  todo: todoReducer,
  change: changeReducer,
})
const store = createStore(reducers, applyMiddleware(thunk))
export default store
