import React from 'react'

export default function SongDisplay({title}) {
  return (
    <div>
      <h2>Now dancing to:</h2>
      <h3>{title}</h3>
    </div>
  )
}
