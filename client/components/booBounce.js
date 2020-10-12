import React, {useEffect} from 'react'
import {gsap} from 'gsap'

export default function BooBounce(props) {
  const {tempo} = props
  const mainTL = React.useRef(gsap.timeline({repeat: -1}))

  const scoot = (xScoot, eyeMove) => {
    const tl = gsap.timeline()
    tl.addLabel('in')
    tl.to(
      '.top-rings',
      {
        ease: 'sine.out',
        scale: 0.75
      },
      'in'
    )
    tl.to(
      '.lower-rings',
      {
        y: 10,
        ease: 'sine.out',
        stagger: 0.05,
        scale: 0.7,
        duration: 1
      },
      'in'
    )
    tl.to(
      '.mouth',
      {
        ease: 'sine.out',
        scale: 1,
        duration: 1
      },
      'in'
    )
    tl.addLabel('out')
    tl.to(
      '.face',
      {
        ease: 'sine.out',
        x: eyeMove,
        duration: 1
      },
      'out'
    )
    tl.to(
      '.top-rings',
      {
        ease: 'sine.out',
        x: xScoot,
        scale: 1
      },
      'out'
    )
    tl.to(
      '.lower-rings',
      {
        y: 0,
        x: xScoot,
        ease: 'sine.out',
        stagger: 0.05,
        rotation: 0,
        delay: -0.4,
        scale: 1,
        duration: 1
      },
      'out'
    )
    tl.to(
      '.mouth',
      {
        ease: 'sine.out',
        scale: 1.5,
        duration: 1
      },
      'out'
    )
    return tl
  }

  useEffect(() => {
    gsap.set('.lower-rings', {
      transformOrigin: '50% 50%'
    })

    gsap.set('.mouth', {
      transformOrigin: '50% 50%',
      scale: 1.5
    })

    gsap.set('.face', {
      transformOrigin: '50% 50%'
    })

    gsap.set('.top-rings', {
      transformOrigin: '50% 50%',
      y: 10
    })

    mainTL.current.add(scoot(20, 1.2 * 20))
    mainTL.current.add(scoot(0, -0.2))
    mainTL.current.duration(120 / tempo)
  }, [])

  useEffect(
    () => {
      //update tempo
      mainTL.current.duration(120 / tempo)
    },
    [tempo]
  )

  return (
    <div className="boo-container">
      <svg
        id="Body"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-10 -30 250.73 150.21"
      >
        <g className="top-rings">
          <path
            id="boo-top"
            d="M650.26,272.75c0-3.52-4-6.72-10.56-9.06a161.2,161.2,0,0,0-12.54-10.22c-6.63-4.45-19.1-4.31-25.82,0-2.9,1.86-8,5.78-12.8,9.64-7.54,2.37-12.3,5.81-12.3,9.64,0,.13,0,.25,0,.38l0,0c0,7.16,16.57,13,37,13s37-5.8,37-13l0,0C650.24,273,650.26,272.88,650.26,272.75Z"
            transform="translate(-544.89 -250.19)"
            fill="#87c5f4"
            opacity="0.4"
          />
        </g>
        <ellipse
          className="lower-rings"
          id="ring-5"
          cx="68.36"
          cy="28.97"
          rx="44.41"
          ry="15.55"
          fill="#87c5f4"
          opacity="0.4"
        />
        <ellipse
          className="lower-rings"
          id="ring-6"
          cx="68.36"
          cy="33.97"
          rx="49.81"
          ry="18.66"
          fill="#87c5f4"
          opacity="0.4"
        />
        <ellipse
          className="lower-rings"
          id="ring-7"
          cx="68.36"
          cy="39.97"
          rx="55.77"
          ry="22.39"
          fill="#87c5f4"
          opacity="0.4"
        />
        <ellipse
          className="lower-rings"
          id="ring-8"
          cx="68.36"
          cy="44.97"
          rx="62.12"
          ry="26.87"
          fill="#87c5f4"
          opacity="0.4"
        />
        <ellipse
          className="lower-rings"
          id="ring-9"
          cx="68.36"
          cy="49.97"
          rx="68.36"
          ry="32.25"
          fill="#87c5f4"
          opacity="0.4"
        />
        <g id="face" className="face">
          <ellipse cx="60.9" cy="29.88" rx="2.5" ry="4" />
          <ellipse cx="75.9" cy="29.88" rx="2.5" ry="4" />
          <ellipse className="mouth" cx="67.9" cy="40.88" rx="3.5" ry="2.5" />
        </g>
      </svg>
    </div>
  )
}
