import React, { useCallback, useEffect, useState } from 'react'
import isEmpty from 'lodash.isempty';
import { LOGIN_USER } from './gql_state';
import { useLazyQuery } from '@apollo/client';
import { setCurrentUserAttr, singOutUser, loadingUserState, notUserLoading } from '../../action-creators/userAuthActions';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { errorMessageDark, infoMessageDark } from '../../ToasterType';
import './index.css'
import { signInUserAuth,  } from '../../action-creators/authAction';

const initialFormData = {
  email: "",
  password: ""
}

const Login = (props: any) => {
  const [formData, setFormData] = useState(initialFormData);
  const [formFieldError, setFormFieldError] = useState("");
  const [formSubmit, setFormSubmit] = useState(false);
  const [submitLogin, { data, loading, error }] = useLazyQuery(LOGIN_USER, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'no-cache',
  })
  const handleForm = (event: React.FormEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.currentTarget.name]: event.currentTarget.value })
  }

  const validateFormData = () => {
    setFormFieldError("")

    if (isEmpty(formData.email)) {
      setFormFieldError("Email can't be blank")
    }

    if (isEmpty(formData.password)) {
      setFormFieldError((prevError) => prevError + " Password can't be blank")
    }
  }
  // e: React.SyntheticEvent
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    validateFormData()
    setFormSubmit(true);
  }

  
  useEffect(() => {
    if (formSubmit && isEmpty(formFieldError)) {
      props.action.loadingUserState()
      submitLogin({
        variables: formData
      });
    }
    setFormSubmit(false);
  }, [formSubmit])

  useEffect(() => {
    if (data) {
      const { validateUser, user } = data?.login;
      if (validateUser) {
        props.action.setCurrentUserAttr(user)
        props.action.signInUserAuth(user)
        infoMessageDark('Welcome ' + user.name)
        setFormData(initialFormData);
      }
      else {
        props.action.notUserLoading()
        errorMessageDark('User email or password not found.')
      }
    }
  }, [data])
  
  if(error){
    errorMessageDark(error.message)
  }
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 min-vh-100 d-flex flex-column justify-content-center">
          <div className="row">
            <div className="col-lg-6 col-md-8 mx-auto">
              <div className="card rounded shadow shadow shadow-lg p-3 mb-5 bg-body rounded">
                <div className="card-header p-4 text-center shadow-lg p-3 mb-5 bg-body rounded">
                  <h3 className="mb-0">Login</h3>
                </div>
                <div className="card-body shadow-lg p-4 mb-5 bg-body rounded">
                  <form className="form" role="form" autoComplete="off" id="formLogin">
                    <div className={`form-group bg-danger ${isEmpty(formFieldError) ? "invalid-feedback" : null}`}>
                      <h6 className='p-3'>{formFieldError}.</h6>
                    </div>

                    <div className="form-group p-4">
                      <label>Email</label>
                      <input type="text" className="form-control form-control-lg rounded-0 m-2" value={formData.email} name='email' onChange={handleForm} id="uname1" required={true} />
                    </div>
                    <div className="form-group p-4">
                      <label>Password</label>
                      <input type="password" className="form-control form-control-lg rounded-0 m-2" value={formData.password} name='password' onChange={handleForm} id="pwd1" required={true}/>
                      <div className="invalid-feedback">Enter your password too!</div>
                    </div>
                    <div>
                      <label className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" />
                        <span className="custom-control-indicator"></span>
                        <span className="custom-control-description small text-dark p-2">Remember me on this computer</span>
                      </label>
                    </div>
                    < div className='d-flex justify-content-center'>
                      <button type="submit" onClick={handleSubmit} className="btn btn-success btn-lg float-right m-4 text-center" id="btnLogin" disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

const mapDispatchToProps = (dispatch: any) => ({
    action: bindActionCreators({
      loadingUserState,
      notUserLoading,
      setCurrentUserAttr,
      singOutUser,
      signInUserAuth,
    }, dispatch)
})

export default connect(null, mapDispatchToProps)(Login)