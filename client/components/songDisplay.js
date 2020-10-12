import React from 'react'

export default function SongDisplay({title}) {
  return (
    <div className="song-display">
      <h2>Now dancing to:</h2>
      <h3>{title}</h3>
    </div>
  )
}
