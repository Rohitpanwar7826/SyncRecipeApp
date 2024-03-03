import { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import {useNavigate} from "react-router-dom"

const PublicSection = (props: any) => {
  const navigate = useNavigate();

  useEffect(() => {
    if(props.loggedIn){
      navigate(-1)
    }
  }, [props.loggedIn, navigate])

  return !props.loggedIn ? < props.element /> : null; 
}

const mapStateToprops = (state: any) => ({
  hasToken: state.auth.hasToken,
  loggedIn: state.auth.isLogged
})
export default connect(mapStateToprops)(PublicSection)