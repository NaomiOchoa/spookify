import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../store'

const Navbar = ({logoutUser, isLoggedIn}) => (
  <React.Fragment>
    {isLoggedIn ? (
      <nav>
        <h1>Spookify</h1>
        <div>
          {/* The navbar will show these links after you log in */}
          <button type="button" onClick={logoutUser}>
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
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    logoutUser: () => dispatch(logout())
  }
}

export default connect(mapState, mapDispatch)(Navbar)
