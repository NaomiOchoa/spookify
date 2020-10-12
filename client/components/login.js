import React from 'react'

/**
 * COMPONENT
 */
export default function Login(props) {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <h1>Welcome to Spookify!</h1>
      <ol>
        <li>Step 1: Connect to your Spotify account</li>
        <li>Step 2: Start playing your favorite playlist</li>
        <li>Step 3: Dance to the beat with a friendly ghost</li>
      </ol>
      <h2>Get started:</h2>
      <a href="/auth/spotify">Connect to Spotify</a>
    </div>
  )
}
