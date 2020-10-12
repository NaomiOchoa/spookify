import axios from 'axios'

const SET_SONG = 'SET_SONG'

const defaultSong = {title: 'Start playing on Spotify', tempo: 50}

const setCurrentSong = song => ({
  type: SET_SONG,
  song
})

export const fetchCurrentSong = () => async dispatch => {
  try {
    const res = await axios.get('/api/current-song')
    dispatch(setCurrentSong(res.data || defaultSong))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultSong, action) {
  switch (action.type) {
    case SET_SONG:
      return action.song
    default:
      return state
  }
}
