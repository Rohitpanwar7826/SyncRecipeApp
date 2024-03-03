import * as types from './types';
import { actionType } from './interfaceAndType';

const initialUserState = {
  name: null,
  email: null,
  id: null,
  loading: false
}

const userReducer = (state=initialUserState, action: actionType) => {
  switch(action.type){
    case types.addUser: 
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        id: action.payload.id,
        loading: false
      }
    case types.removeUser:
      return initialUserState
    case types.loadingUser:
      return {
        ...state,
        loading: true
      }
    case types.notLoading:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
}
export default userReducer;
export {
  initialUserState,
}