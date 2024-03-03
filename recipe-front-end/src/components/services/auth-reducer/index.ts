import { tokenKey } from "../../reducers/token";

const getTokenFromLocalStore = () => (
  localStorage.getItem(tokenKey) == null ? null : localStorage.getItem(tokenKey) 
)

const hasTokenPresent = (fun: Function) => (
  fun() == null ? false : true
)

const setTokenToSession = (accessToken: string) => {
  localStorage.setItem(tokenKey, accessToken);
}

const removeSessionToken = () => {
  localStorage.removeItem(tokenKey);
}

export {
  getTokenFromLocalStore,
  hasTokenPresent,
  setTokenToSession,
  removeSessionToken
}