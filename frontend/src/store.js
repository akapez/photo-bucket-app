import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {postListReducer} from './reducers/postReducers'
import {userLoginReducer} from './reducers/userReducers'

const reducer = combineReducers({
    postList: postListReducer,
    userLogin: userLoginReducer
    
})

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(
    applyMiddleware(...middleware)
))

export default store