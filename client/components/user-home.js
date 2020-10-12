import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import SongDisplay from './songDisplay'
import BooBounce from './booBounce'
import {fetchCurrentSong} from '../store/song'

/**
 * COMPONENT
 */
export function UserHome(props) {
  const {email, title, tempo, getCurrentSong} = props
  return (
    <div>
      <h3>Welcome, {email}</h3>
      <ol>
        <li>Step 1: Connect to your Spotify account - DONE</li>
        <li>Step 2: Start playing your favorite playlist</li>
        <li>Step 3: Dance to the beat with a friendly ghost</li>
      </ol>
      <button type="button" onClick={getCurrentSong}>
        Dance
      </button>
      <SongDisplay title={title} />
      <BooBounce tempo={tempo} />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    title: state.song.title,
    tempo: state.song.tempo
  }
}

const mapDispatch = dispatch => {
  return {
    getCurrentSong: () => dispatch(fetchCurrentSong())
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
