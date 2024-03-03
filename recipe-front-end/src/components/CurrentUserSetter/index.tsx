import { useQuery } from '@apollo/client'
import { connect } from 'react-redux'
import { GET_CURRENT_USER } from './gql_state'
import Loader from '../shared/Loader'
import { bindActionCreators } from 'redux'
import { useEffect } from 'react'
import { setCurrentUserAttr, singOutUser } from '../action-creators/userAuthActions'
import { infoMessageDark, errorMessageDark } from '../ToasterType'
import { signInUserAuth } from '../action-creators/authAction'

const CurrentUserSetter = (props: any) => {
  const { loading, data, error } = useQuery(GET_CURRENT_USER, { variables: { token: props.token }, skip: !props.token })
  useEffect(() => {
    if (data?.currentUser?.user) {
      const user = data.currentUser.user;
      props.action.signInUserAuth(user);
      props.action.setCurrentUserAttr(user);
      infoMessageDark("Successfully Logged In...")
    }
    if (!loading && data?.currentUser.validateUser === false) {
      alert("not valid")
      props.action.singOutUser();
      errorMessageDark("Waring token...!")
    }

    if (error) {
      props.action.singOutUser();
      errorMessageDark(error.message)
    }

    // if (!props.hasToken) {
    //   props.action.notUserLoading();
    // }
  }, [data, loading, error, props.action])
  if (loading) return < Loader />
  return (props.children)
}

const mapStateToProps = (state: any) => ({
  token: state.auth.token,
  stateLoading: state.user.loading
})

const mapDispatchToProps = (dispatch: any) => ({
  action: bindActionCreators({
    setCurrentUserAttr,
    singOutUser,
    signInUserAuth
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUserSetter);
