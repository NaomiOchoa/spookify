import {func} from 'prop-types'
import React from 'react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="attribution">Powered by:</div>
      <img
        className="footer-logo"
        src="Spotify_Logo_RGB_Green.png"
        alt="Spotify Logo"
      />

      <div className="attribution personal">Created by: Naomi Ochoa</div>
    </footer>
  )
}
