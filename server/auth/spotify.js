const passport = require('passport')
const router = require('express').Router()
const axios = require('axios')
const SpotifyStrategy = require('passport-spotify').Strategy
const {User} = require('../db/models')
module.exports = router

let clientID
let clientSecret
let redirectUri

if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
  console.log('NO ENV VARIABLES')
  const {client_id, client_secret, redirect_uri} = require('../../secrets')
  clientID = client_id
  clientSecret = client_secret
  redirectUri = redirect_uri
} else {
  console.log('FOUND ENV VARIABLES')
  clientID = process.env.SPOTIFY_CLIENT_ID
  clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  redirectUri = process.env.SPOTIFY_CALLBACK
}

passport.use(
  new SpotifyStrategy(
    {
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: redirectUri
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      User.findOrCreate({
        where: {spotifyId: profile.id},
        defaults: {
          email: profile.displayName,
          accessToken: accessToken,
          refreshToken: refreshToken
        }
      })
        .then(([user]) => done(null, user))
        .catch(done)
    }
  )
)

router.get(
  '/',
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-currently-playing'],
    showDialog: true
  })
)

router.get(
  '/callback',
  passport.authenticate('spotify', {failureRedirect: '/login'}),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/home')
  }
)

router.get('/refresh_token', async function(req, res, next) {
  try {
    const refreshToken = req.user.dataValues.refreshToken
    const {data} = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      params: {
        client_id: clientID,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    await User.update(
      {
        accessToken: data.access_token
      },
      {
        where: {
          spotifyId: req.user.dataValues.spotifyId
        },
        returning: true,
        plain: true
      }
    )
    res.send(data.access_token)
  } catch (error) {
    next(error)
  }
})
