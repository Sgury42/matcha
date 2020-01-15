import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import locale from './locale/reducer'
// import snackbars from './snackbars/reducer'
// import applications from './applications/reducer'
// import modals from './modals/reducer'
// import fetchs from './fetchs/reducer'
// import theme from './theme/reducer'
​
import lists from './lists/reducer'
import objects from './objects/reducer'
​
// combine all reducers
const rootReducer = combineReducers({
  // locale,
  // snackbars,
  // applications,
  // modals,
  // lists,
  // objects,
  // fetchs,
  // theme,
  
})
​
// create store
const store = createStore(rootReducer, applyMiddleware(thunk))
export default store
Collapse



