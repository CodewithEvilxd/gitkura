'use client'

import React, { useId } from 'react'

export type WashiVariant =
  | 'yellow'
  | 'green'
  | 'blue'
  | 'rose'
  | 'purple'
  | 'orange'
  | 'kraft'
  | 'white'

export type WashiPattern = 'plain' | 'grid' | 'dots' | 'stripes'

interface WashiTapeProps {
  variant?: WashiVariant
  pattern?: WashiPattern
  className?: string
  rotate?: string
  width?: number | string
  height?: number | string
  opacity?: number
}

export default function WashiTape({
  variant = 'yellow',
  pattern = 'plain',
  className = '',
  rotate = '-rotate-1',
  width = 120,
  height = 32,
  opacity,
}: WashiTapeProps) {
  const uniqueId = useId().replace(/:/g, '')

  const palette: Record<
    WashiVariant,
    {
      baseColor: string
      gradientTop: string
      gradientBottom: string
      defaultOpacity: number
      fiberColor: string
      creaseHighlight: string
      creaseShadow: string
      rimHighlight: string
      patternColor: string
    }
  > = {
    yellow: {
      baseColor: '#fef08a',
      gradientTop: '#fef9c3',
      gradientBottom: '#fde047',
      defaultOpacity: 0.86,
      fiberColor: 'rgba(161, 98, 7, 0.16)',
      creaseHighlight: 'rgba(255, 255, 255, 0.55)',
      creaseShadow: 'rgba(113, 63, 18, 0.08)',
      rimHighlight: 'rgba(255, 255, 255, 0.85)',
      patternColor: 'rgba(161, 98, 7, 0.12)',
    },
    green: {
      baseColor: '#bbf7d0',
      gradientTop: '#dcfce7',
      gradientBottom: '#86efac',
      defaultOpacity: 0.86,
      fiberColor: 'rgba(21, 128, 61, 0.16)',
      creaseHighlight: 'rgba(255, 255, 255, 0.55)',
      creaseShadow: 'rgba(20, 83, 45, 0.08)',
      rimHighlight: 'rgba(255, 255, 255, 0.85)',
      patternColor: 'rgba(21, 128, 61, 0.12)',
    },
    blue: {
      baseColor: '#bfdbfe',
      gradientTop: '#dbeafe',
      gradientBottom: '#93c5fd',
      defaultOpacity: 0.86,
      fiberColor: 'rgba(29, 78, 216, 0.16)',
      creaseHighlight: 'rgba(255, 255, 255, 0.55)',
      creaseShadow: 'rgba(30, 58, 138, 0.08)',
      rimHighlight: 'rgba(255, 255, 255, 0.85)',
      patternColor: 'rgba(29, 78, 216, 0.12)',
    },
    rose: {
      baseColor: '#fecdd3',
      gradientTop: '#ffe4e6',
      gradientBottom: '#fda4af',
      defaultOpacity: 0.86,
      fiberColor: 'rgba(190, 18, 60, 0.16)',
      creaseHighlight: 'rgba(255, 255, 255, 0.55)',
      creaseShadow: 'rgba(136, 19, 55, 0.08)',
      rimHighlight: 'rgba(255, 255, 255, 0.85)',
      patternColor: 'rgba(190, 18, 60, 0.12)',
    },
    purple: {
      baseColor: '#e9d5ff',
      gradientTop: '#f3e8ff',
      gradientBottom: '#d8b4fe',
      defaultOpacity: 0.86,
      fiberColor: 'rgba(126, 34, 206, 0.16)',
      creaseHighlight: 'rgba(255, 255, 255, 0.55)',
      creaseShadow: 'rgba(88, 28, 135, 0.08)',
      rimHighlight: 'rgba(255, 255, 255, 0.85)',
      patternColor: 'rgba(126, 34, 206, 0.12)',
    },
    orange: {
      baseColor: '#fed7aa',
      gradientTop: '#ffedd5',
      gradientBottom: '#fdba74',
      defaultOpacity: 0.86,
      fiberColor: 'rgba(194, 65, 12, 0.16)',
      creaseHighlight: 'rgba(255, 255, 255, 0.55)',
      creaseShadow: 'rgba(124, 45, 18, 0.08)',
      rimHighlight: 'rgba(255, 255, 255, 0.85)',
      patternColor: 'rgba(194, 65, 12, 0.12)',
    },
    kraft: {
      baseColor: '#e2d4b7',
      gradientTop: '#ebe2cc',
      gradientBottom: '#d5c39e',
      defaultOpacity: 0.9,
      fiberColor: 'rgba(120, 85, 40, 0.22)',
      creaseHighlight: 'rgba(255, 255, 255, 0.45)',
      creaseShadow: 'rgba(70, 45, 15, 0.12)',
      rimHighlight: 'rgba(255, 255, 255, 0.75)',
      patternColor: 'rgba(120, 85, 40, 0.15)',
    },
    white: {
      baseColor: '#ffffff',
      gradientTop: '#ffffff',
      gradientBottom: '#f1f5f9',
      defaultOpacity: 0.78,
      fiberColor: 'rgba(100, 116, 139, 0.15)',
      creaseHighlight: 'rgba(255, 255, 255, 0.7)',
      creaseShadow: 'rgba(15, 23, 42, 0.06)',
      rimHighlight: 'rgba(255, 255, 255, 0.95)',
      patternColor: 'rgba(100, 116, 139, 0.1)',
    },
  }

  const c = palette[variant] || palette.yellow
  const effectiveOpacity = opacity !== undefined ? opacity : c.defaultOpacity

  // Ultra-detailed natural torn edge path (serrated paper fibers, uneven rip teeth)
  // Dimensions calibrated for 120 x 32 viewBox
  const mainTapePath = `
    M 7.5,3.2
    Q 60,1.8 112.5,3.2
    L 114.2,5.5
    L 111.8,7.8
    L 115.0,10.2
    L 112.4,13.0
    L 116.2,16.0
    L 112.0,19.2
    L 115.4,22.5
    L 112.2,25.8
    L 114.5,28.8
    Q 60,30.2 7.5,28.8
    L 5.8,26.2
    L 8.2,23.5
    L 4.8,20.0
    L 8.0,16.5
    L 4.5,13.2
    L 7.8,9.8
    L 5.2,6.5
    Z
  `

  return (
    <div
      className={`absolute z-30 pointer-events-none select-none ${rotate} ${className}`}
      style={{
        width,
        height,
        filter: 'drop-shadow(0px 2px 3px rgba(30, 41, 59, 0.16)) drop-shadow(0px 1px 1px rgba(30, 41, 59, 0.08))',
      }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 120 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="overflow-visible"
      >
        <defs>
          {/* Vertical sheen / translucent gradient */}
          <linearGradient id={`tape-grad-${uniqueId}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={c.gradientTop} stopOpacity={effectiveOpacity} />
            <stop offset="30%" stopColor={c.baseColor} stopOpacity={effectiveOpacity} />
            <stop offset="85%" stopColor={c.gradientBottom} stopOpacity={effectiveOpacity} />
            <stop offset="100%" stopColor={c.baseColor} stopOpacity={effectiveOpacity * 0.95} />
          </linearGradient>

          {/* Authentic Washi Kozo Mulberry Paper Texture Pattern */}
          <pattern
            id={`kozo-fiber-${uniqueId}`}
            width="12"
            height="12"
            patternUnits="userSpaceOnUse"
          >
            {/* Fine longitudinal pulp fibers */}
            <line x1="0" y1="3" x2="12" y2="3" stroke={c.fiberColor} strokeWidth="0.5" strokeDasharray="3 4 2 3" />
            <line x1="0" y1="8" x2="12" y2="8" stroke={c.fiberColor} strokeWidth="0.5" strokeDasharray="4 2 3 3" />
            <line x1="0" y1="11" x2="12" y2="11" stroke={c.fiberColor} strokeWidth="0.4" strokeDasharray="2 5" />
            {/* Delicate diagonal kozo threads */}
            <path d="M 0 12 L 12 0" stroke={c.fiberColor} strokeWidth="0.35" strokeDasharray="1 6" />
            <path d="M 0 6 L 6 0" stroke={c.fiberColor} strokeWidth="0.3" strokeDasharray="2 5" />
          </pattern>

          {/* Optional Stationery Patterns */}
          {pattern === 'grid' && (
            <pattern id={`pattern-grid-${uniqueId}`} width="6" height="6" patternUnits="userSpaceOnUse">
              <path d="M 6 0 L 0 0 0 6" fill="none" stroke={c.patternColor} strokeWidth="0.5" />
            </pattern>
          )}

          {pattern === 'dots' && (
            <pattern id={`pattern-dots-${uniqueId}`} width="6" height="6" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="0.75" fill={c.patternColor} />
            </pattern>
          )}

          {pattern === 'stripes' && (
            <pattern id={`pattern-stripes-${uniqueId}`} width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke={c.patternColor} strokeWidth="2" />
            </pattern>
          )}
        </defs>

        {/* 1. Underlying Adhesive Shadow Layer (Simulates contact bond to paper surface) */}
        <path
          d={mainTapePath}
          fill="rgba(15, 23, 42, 0.05)"
          transform="translate(0, 0.6)"
        />

        {/* 2. Main Translucent Washi Tape Body */}
        <path
          d={mainTapePath}
          fill={`url(#tape-grad-${uniqueId})`}
        />

        {/* 3. Authentic Mulberry Fiber Texture Overlay */}
        <path
          d={mainTapePath}
          fill={`url(#kozo-fiber-${uniqueId})`}
        />

        {/* 4. Pattern Overlay (if grid / dots / stripes selected) */}
        {pattern !== 'plain' && (
          <path
            d={mainTapePath}
            fill={`url(#pattern-${pattern}-${uniqueId})`}
          />
        )}

        {/* 5. Realistic Paper Creases & Press Wrinkles (Where thumb pressed the tape) */}
        {/* Wrinkle 1 (left side) */}
        <path
          d="M 32,2.8 Q 36,15 39,29.2"
          stroke={c.creaseHighlight}
          strokeWidth="0.75"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 33,2.8 Q 37,15 40,29.2"
          stroke={c.creaseShadow}
          strokeWidth="0.75"
          strokeLinecap="round"
          fill="none"
        />

        {/* Wrinkle 2 (right side) */}
        <path
          d="M 84,2.8 Q 87,17 90,29.2"
          stroke={c.creaseHighlight}
          strokeWidth="0.75"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 85,2.8 Q 88,17 91,29.2"
          stroke={c.creaseShadow}
          strokeWidth="0.75"
          strokeLinecap="round"
          fill="none"
        />

        {/* 6. Top Waxy Specular Sheen (Micro reflection along smooth manufactured edge) */}
        <path
          d="M 9,3.8 Q 60,2.5 111,3.8"
          stroke={c.rimHighlight}
          strokeWidth="0.85"
          strokeLinecap="round"
          fill="none"
        />

        {/* 7. Bottom Edge Contact Line (Slight adhesive thickness shadow) */}
        <path
          d="M 9,28.2 Q 60,29.4 111,28.2"
          stroke="rgba(0, 0, 0, 0.12)"
          strokeWidth="0.65"
          strokeLinecap="round"
          fill="none"
        />

        {/* 8. Left Torn Edge Exposed Paper White Core Highlights (Micro fibrils) */}
        <path
          d="M 7.5,3.2 L 5.2,6.5 L 7.8,9.8 L 4.5,13.2 L 8.0,16.5 L 4.8,20.0 L 8.2,23.5 L 5.8,26.2 L 7.5,28.8"
          stroke={c.rimHighlight}
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* 9. Right Torn Edge Exposed Paper White Core Highlights */}
        <path
          d="M 112.5,3.2 L 114.2,5.5 L 111.8,7.8 L 115.0,10.2 L 112.4,13.0 L 116.2,16.0 L 112.0,19.2 L 115.4,22.5 L 112.2,25.8 L 114.5,28.8"
          stroke={c.rimHighlight}
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  )
}
