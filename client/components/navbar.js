import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../store'

const Navbar = ({logoutUser, isLoggedIn}) => (
  <React.Fragment>
    {isLoggedIn ? (
      <nav className="header">
        <h1 className="app-header">Spookify</h1>
        <div>
          <button type="button" className="logout-button" onClick={logoutUser}>
            Logout
          </button>
        </div>
      </nav>
    ) : (
      ''
    )}
  </React.Fragment>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    email: state.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    logoutUser: () => dispatch(logout())
  }
}

export default connect(mapState, mapDispatch)(Navbar)
