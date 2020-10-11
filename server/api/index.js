const router = require('express').Router()
const axios = require('axios')
module.exports = router

router.use('/users', require('./users'))

router.get('/current-song', async (req, res, next) => {
  try {
    const token = req.user.dataValues.accessToken
    const {data} = await axios.get(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
    console.log(data)
    const songId = data.item.id
    const result = await axios.get(
      `https://api.spotify.com/v1/audio-features/${songId}`,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
    console.log(result.data)
    res.sendStatus(200)
  } catch (error) {
    if (error.state === 401) {
      const newToken = axios.get('/auth/spotify/refresh_token')
      const token = newToken.data
      const {data} = await axios.get(
        'https://api.spotify.com/v1/me/player/currently-playing',
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      )
      console.log(data)
      const songId = data.item.id
      const result = await axios.get(
        `https://api.spotify.com/v1/audio-features/${songId}`,
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      )
      console.log(result.data)
      res.sendStatus(200)
    } else {
      next(error)
    }
  }
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
