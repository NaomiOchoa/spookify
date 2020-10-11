const passport = require('passport')
const router = require('express').Router()
const axios = require('axios')
const SpotifyStrategy = require('passport-spotify').Strategy
const {User} = require('../db/models')
const {client_id, client_secret, redirect_uri} = require('../../secrets')
module.exports = router

passport.use(
  new SpotifyStrategy(
    {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: redirect_uri
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      console.log('profile: ', profile.displayName)
      console.log('accessToken: ', accessToken)
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
  const refreshToken = req.user.dataValues.refreshToken
  try {
    const {data} = await axios({
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
    console.log(data)
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
