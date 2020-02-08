 import { combineReducers, createStore, applyMiddleware } from 'redux'
 import thunk from 'redux-thunk'
 import objects from './objects/reducer'

// combine all reducers
const rootReducer = combineReducers({
  objects,
})

// create store
const store = createStore(rootReducer, applyMiddleware(thunk))
export default store