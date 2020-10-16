import React from 'react'

export default function SongDisplay({title}) {
  return (
    <div className="song-display">
      <h2>Now dancing to:</h2>
      {title === 'DefaultText' ? (
        <h3>
          Start Playing On{' '}
          <a
            className="spotify-link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://open.spotify.com/"
          >
            Spotify
          </a>{' '}
          - Then Click Dance!
        </h3>
      ) : (
        <h3>{title}</h3>
      )}
    </div>
  )
}
