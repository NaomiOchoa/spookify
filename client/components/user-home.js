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
  const [start, setStart] = React.useState(false)

  React.useEffect(
    () => {
      let interval
      if (start) {
        interval = setInterval(getCurrentSong, 3000)
      }
      return () => clearInterval(interval)
    },
    [start]
  )

  return (
    <div className="main-content">
      <SongDisplay title={title} />
      <div className="dance-section">
        <button
          type="button"
          className="dance-button"
          onClick={() => {
            getCurrentSong()
            setStart(true)
          }}
        >
          Dance
        </button>
        <BooBounce tempo={tempo} />
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
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
