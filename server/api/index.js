const router = require('express').Router()
const axios = require('axios')
const {client_id, client_secret, redirect_uri} = require('../../secrets')
const {User} = require('../db/models')

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
    const songId = data.item.id
    const songName = data.item.name
    const details = await axios.get(
      `https://api.spotify.com/v1/audio-features/${songId}`,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
    const tempo = details.data.tempo
    res.send({title: songName, tempo})
  } catch (error) {
    if (error.response.status === 401) {
      try {
        const refreshToken = req.user.dataValues.refreshToken
        const response = await axios({
          method: 'post',
          url: 'https://accounts.spotify.com/api/token',
          params: {
            client_id: client_id,
            client_secret: client_secret,
            refresh_token: refreshToken,
            grant_type: 'refresh_token'
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })

        const newToken = response.data.access_token
        await User.update(
          {
            accessToken: newToken
          },
          {
            where: {
              spotifyId: req.user.dataValues.spotifyId
            },
            returning: true,
            plain: true
          }
        )
        const {data} = await axios.get(
          'https://api.spotify.com/v1/me/player/currently-playing',
          {
            headers: {
              Authorization: 'Bearer ' + newToken
            }
          }
        )
        console.log(data)
        const songId = data.item.id
        const songName = data.item.name
        const details = await axios.get(
          `https://api.spotify.com/v1/audio-features/${songId}`,
          {
            headers: {
              Authorization: 'Bearer ' + newToken
            }
          }
        )
        const tempo = details.data.tempo
        res.send({title: songName, tempo})
      } catch (error) {
        next(error)
      }
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
