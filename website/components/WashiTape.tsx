'use client'

import React, { useId } from 'react'

interface WashiTapeProps {
  variant?: 'yellow' | 'green' | 'blue' | 'rose' | 'purple' | 'orange'
  className?: string
  rotate?: string
}

export default function WashiTape({
  variant = 'yellow',
  className = '',
  rotate = '-rotate-1',
}: WashiTapeProps) {
  const uniqueId = useId().replace(/:/g, '')

  const colorConfig = {
    yellow: {
      fill: '#fef08a',
      opacity: 0.88,
      fiberColor: 'rgba(202, 138, 4, 0.18)',
      highlight: 'rgba(255, 255, 255, 0.75)',
    },
    green: {
      fill: '#bbf7d0',
      opacity: 0.88,
      fiberColor: 'rgba(22, 163, 74, 0.18)',
      highlight: 'rgba(255, 255, 255, 0.75)',
    },
    blue: {
      fill: '#bfdbfe',
      opacity: 0.88,
      fiberColor: 'rgba(37, 99, 235, 0.18)',
      highlight: 'rgba(255, 255, 255, 0.75)',
    },
    rose: {
      fill: '#fecdd3',
      opacity: 0.88,
      fiberColor: 'rgba(225, 29, 72, 0.18)',
      highlight: 'rgba(255, 255, 255, 0.75)',
    },
    purple: {
      fill: '#e9d5ff',
      opacity: 0.88,
      fiberColor: 'rgba(147, 51, 234, 0.18)',
      highlight: 'rgba(255, 255, 255, 0.75)',
    },
    orange: {
      fill: '#fed7aa',
      opacity: 0.88,
      fiberColor: 'rgba(234, 88, 12, 0.18)',
      highlight: 'rgba(255, 255, 255, 0.75)',
    },
  }

  const c = colorConfig[variant] || colorConfig.yellow

  return (
    <div
      className={`absolute z-30 pointer-events-none select-none ${rotate} ${className}`}
      style={{ mixBlendMode: 'multiply' }}
      aria-hidden="true"
    >
      <svg
        width="112"
        height="32"
        viewBox="0 0 112 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          {/* Mathematical Fractal Noise Distortion Filter for Organic Ripped Paper Tears */}
          <filter
            id={`torn-tape-${uniqueId}`}
            x="-15%"
            y="-15%"
            width="130%"
            height="130%"
            filterUnits="userSpaceOnUse"
          >
            {/* High-frequency fiber turbulence on horizontal rip ends */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.09 0.75"
              numOctaves="4"
              result="noise"
            />
            {/* Displace the edges of the strip according to the noise map */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="4.5"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displacedTape"
            />
            {/* Soft, physical contact shadow underneath the torn tape */}
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="1.8"
              floodColor="#1e293b"
              floodOpacity="0.22"
            />
          </filter>

          {/* Authentic Washi Kozo Mulberry Paper Fiber Texture Pattern */}
          <pattern
            id={`washi-fiber-${uniqueId}`}
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="2" x2="8" y2="2" stroke={c.fiberColor} strokeWidth="0.6" strokeDasharray="2 3" />
            <line x1="0" y1="6" x2="8" y2="6" stroke={c.fiberColor} strokeWidth="0.6" strokeDasharray="3 2" />
            <line x1="3" y1="0" x2="3" y2="8" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
          </pattern>
        </defs>

        {/* The Translucent, Fractal-Displaced Washi Tape Strip */}
        <g filter={`url(#torn-tape-${uniqueId})`}>
          {/* Main tape body with torn ends */}
          <path
            d="
              M 7,5
              Q 56,4.5 105,5
              L 104,8
              L 106,12
              L 103,16
              L 106,20
              L 104,24
              L 105,27
              Q 56,27.5 7,27
              L 8,23
              L 5,19
              L 8,15
              L 5,11
              L 8,7
              Z
            "
            fill={c.fill}
            fillOpacity={c.opacity}
          />

          {/* Overlay paper fiber grid */}
          <path
            d="
              M 7,5
              Q 56,4.5 105,5
              L 104,8
              L 106,12
              L 103,16
              L 106,20
              L 104,24
              L 105,27
              Q 56,27.5 7,27
              L 8,23
              L 5,19
              L 8,15
              L 5,11
              L 8,7
              Z
            "
            fill={`url(#washi-fiber-${uniqueId})`}
          />

          {/* Specular Light Reflection Along the Top Waxy Edge */}
          <path
            d="M 9,6.5 Q 56,6 103,6.5"
            stroke={c.highlight}
            strokeWidth="0.8"
            strokeLinecap="round"
          />

          {/* Left Frayed Paper Fiber Highlight */}
          <path
            d="M 7,5 L 8,7 L 5,11 L 8,15 L 5,19 L 8,23 L 7,27"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="0.75"
            strokeLinecap="round"
          />

          {/* Right Frayed Paper Fiber Highlight */}
          <path
            d="M 105,5 L 104,8 L 106,12 L 103,16 L 106,20 L 104,24 L 105,27"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="0.75"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  )
}
