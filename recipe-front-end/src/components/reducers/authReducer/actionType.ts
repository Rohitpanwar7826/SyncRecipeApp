import { singIn, singOut } from './types'


interface SingAction {
  type: typeof singIn,
  payload: {
    isLoggedIn: boolean,
    token: string,
    hasToken: boolean
  }
}

interface SingOutAction {
  type: typeof singOut
}

type authActionType = SingAction | SingOutAction;

export default authActionType