import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { bindActionCreators } from "redux";
import { signOutUserAuth } from "../action-creators/authAction";
import { singOutUser } from "../action-creators/userAuthActions";
import { useQuery } from "@apollo/client";
import { GET_LIST_COUNT_AND_CATEGORE_COUNT } from "./gql_list_count_and_categore_count";
import Loader from "../shared/Loader";


const styleColorTheme = {
  nav: {
    backgroundColor: "#434344",
  },
  fontColor: {
    color: "#D0D0D1"
  }
}


const Header = (props: any) => {
  const { data, loading } = useQuery(GET_LIST_COUNT_AND_CATEGORE_COUNT, {
    fetchPolicy: 'network-only'
  })

  const handleSingOut = () => {
    props.action.signOutUserAuth()
    props.action.singOutUser()
  }
  const { pathname } = useLocation();

  return (
    <>
      {
        props.isLoggedIn ? <nav className="navbar navbar-expand-lg navbar-light p-2" style={styleColorTheme.nav}>
          <div className="container-fluid">
            <Link to="/" className="navbar-brand border border-2 px-4 p-2" style={styleColorTheme.fontColor}>R.K Recipe's_</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto border border-2 py-1 px-3">
                <li className="nav-item">
                  <Link to="/" className={`nav-link ${pathname === '/' ? 'text-success' : null}`} style={styleColorTheme.fontColor} >R.K_ Home</Link>
                </li>
                {
                  loading ?  <li className="nav-item text-center my-auto  mx-2 text-info">LOADING...</li> :
                    <>
                      <li className="nav-item border  mx-1">
                        <Link className={`nav-link mx-2 ${pathname === '/favorite-lists' ? 'text-success' : 'text-white'}`} to="favorite-lists"> List Favourite <span className="text-info bold mx-2">{data?.listCount}</span></Link>
                      </li>
                      <li className="nav-item border mx-1">
                        <Link className={`nav-link mx-2 ${pathname === '/favorite-category' ? 'text-success' : 'text-white'}`} to="favorite-category"> Category Favourite <span className="text-info bold">{data?.categoreCount}</span></Link>
                      </li>
                    </>
                }
                <li className="nav-item mx-2">
                  <Link to="/recent-liked" className={`nav-link ${pathname === '/recent-liked' ? 'text-success' : null}`} style={styleColorTheme.fontColor} >Recent Liked BY RK!</Link>
                </li>
                {!props.isLoggedIn ? (< Link to="/login" className="nav-link border border-2" style={styleColorTheme.fontColor}> Login </Link>) :
                  <div className="dropdown m-0 p-0 border-2">
                    <button className="btn btn-success dropdown-toggle border-0 m-1" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      Welcome | {props.user.name}
                    </button>
                    <ul className="dropdown-menu mx-4" aria-labelledby="dropdownMenuButton1">
                      <li><button className="dropdown-item" onClick={handleSingOut}>Log out</button></li>
                    </ul>
                  </div>}
              </ul>
            </div>
          </div>
        </nav> : null
      }
    </>
  )
}
const mapStateToProps = (state: any) => ({
  isLoggedIn: state.auth.isLogged,
  user: state.user
})

const mapDispatchToProps = (dispatch: any) => ({
  action: bindActionCreators({
    signOutUserAuth,
    singOutUser
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)

