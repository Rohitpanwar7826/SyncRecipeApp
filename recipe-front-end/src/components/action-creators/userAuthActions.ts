import { addUser, removeUser, loadingUser, notLoading } from '../reducers/userReducer/types'
interface userObject {
  id: string, 
  name: string, 
  email: string,
  loading: boolean
}
const setCurrentUserAttr = (user: userObject) => {
  return {
  type: addUser,
  payload: {
    id: user.id,
    name: user.name,
    email: user.email,
    loading: user.loading
  }
}};

const singOutUser = () => ({
  type: removeUser,
})

const loadingUserState = () => {
  return {
  type: loadingUser,
}}

const notUserLoading = () => ({
  type: notLoading
})

export {
  setCurrentUserAttr,
  singOutUser,
  loadingUserState,
  notUserLoading
}