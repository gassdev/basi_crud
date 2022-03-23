import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  articleCreateReducer,
  articleDeleteReducer,
  articleDetailsReducer,
  articleListReducer,
  articleUpdateReducer,
} from './reducers/articleReducers'

const reducer = combineReducers({
  articleList: articleListReducer,
  articleDetails: articleDetailsReducer,
  articleDelete: articleDeleteReducer,
  articleCreate: articleCreateReducer,
  articleUpdate: articleUpdateReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
)

export default store
