import { createStore, combineReducers, applyMiddleware } from 'redux'
import { todoReducer } from './reducer'
import thunk from 'redux-thunk'

const reducers = combineReducers({
  todo: todoReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

const update = () => {
  console.log(store.getState())
}
store.subscribe(update)

export default store
