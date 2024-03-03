import authReducer from './authReducer'
import userReducer from './userReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer
})

export default rootReducer