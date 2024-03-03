import { singIn, singOut } from './types'
import authActionType from './actionType'
import {   getTokenFromLocalStore,
  hasTokenPresent,
  setTokenToSession,
  removeSessionToken 
} from '../../services/auth-reducer';

const intitialState = {
  isLogged: null,
  token: getTokenFromLocalStore(),
  hasToken: hasTokenPresent(getTokenFromLocalStore)
}

const authReducer = (state=intitialState, action: authActionType) => {
  switch(action.type) {
    case singIn:
      setTokenToSession(action.payload.token)
      return {
        ...state,
        isLogged: action.payload.isLoggedIn,
        token: action.payload.token,
        hasToken: action.payload.hasToken
      }
    case singOut:
      removeSessionToken();
      return(intitialState)
      
    default:
      return state
  }
}
  
export default authReducer