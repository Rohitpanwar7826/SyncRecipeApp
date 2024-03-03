import { isEmpty } from "lodash";
import { singIn , singOut} from "../reducers/authReducer/types";
interface userObject {
  id: string,
  token: string
}

const signInUserAuth = (user: userObject) => (
  {
    type: singIn,
    payload: {
      isLoggedIn: isEmpty(user) ? false : true,
      token: user.token,
      hasToken: true
    }
  } 
)

const signOutUserAuth = () => (
  {
    type: singOut
  } 
)

export {
  signInUserAuth,
  signOutUserAuth
}