import React from 'react'

/**
 * COMPONENT
 */
export default function Login(props) {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="login-page">
      <h1 className="welcome-title">Welcome to</h1>
      <h1 className="app-title">Spookify</h1>
      <ol className="intro-steps">
        <li>Step 1: Connect to your Spotify account</li>
        <li>Step 2: Start playing your favorite playlist</li>
        <li>Step 3: Dance to the beat with a friendly ghost</li>
      </ol>
      <h2>Get started:</h2>
      <a href="/auth/spotify" className="connect-button">
        Connect to Spotify
      </a>
    </div>
  )
}
