'use client'

import React, { useId } from 'react'

interface TornPaperCardProps {
  children: React.ReactNode
  className?: string
}

export default function TornPaperCard({ children, className = '' }: TornPaperCardProps) {
  const uniqueId = useId().replace(/:/g, '')

  return (
    <div className={`relative ${className}`}>
      
      {/* SVG Mathematical Fractal Noise Paper Displacement Filters */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          {/* Heavy Torn Edge Fraying Filter */}
          <filter id={`heavy-tear-${uniqueId}`} x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.05 0.15"
              numOctaves="5"
              seed="77"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="7"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Hairline Paper Fissure Filter */}
          <filter id={`paper-fissure-${uniqueId}`} x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.08 0.2"
              numOctaves="4"
              seed="33"
              result="crackNoise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="crackNoise"
              scale="4"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Layer 0: Cast 3D Paper Shadow */}
      <div 
        className="absolute inset-0 bg-[#0f172a]/20 rounded-[28px] translate-x-2.5 translate-y-3.5 blur-md pointer-events-none"
      />

      {/* Layer 1: Underneath Parchment Base Sheet */}
      <div 
        className="absolute inset-0 bg-[#ede4d8] border-2 border-pencil-black rounded-[26px] translate-x-1 translate-y-1.5 -rotate-[0.6deg] pointer-events-none select-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(30, 41, 59, 0.08) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />

      {/* Layer 2: Main Foreground Heavy Ripped Card */}
      <div className="relative bg-[#faf7f2] border-2 border-pencil-black rounded-[26px] p-3 sm:p-6 sm:pb-5 overflow-hidden shadow-2xl">
        
        {/* Paper Grain & Texture Blend */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
          style={{
            backgroundImage: 'radial-gradient(rgba(30, 41, 59, 0.1) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />

        {/* Outer Perimeter Torn Paper Edges (Ripped Fiber Top, Bottom & Sides) */}
        
        {/* Top Edge Ripped Fiber Layer */}
        <div className="absolute -top-1 inset-x-0 h-4 pointer-events-none select-none z-20">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 20" fill="none">
            {/* White Raw Pulp Highlights */}
            <path
              d="M 0 0 Q 100 12 200 4 Q 350 16 500 6 Q 650 14 800 5 Q 900 12 1000 0 L 1000 0 L 0 0 Z"
              fill="#ffffff"
              opacity="0.8"
              filter={`url(#heavy-tear-${uniqueId})`}
            />
            {/* Dark Frayed Fiber Line */}
            <path
              d="M 0 0 Q 100 10 200 3 Q 350 14 500 5 Q 650 12 800 4 Q 900 10 1000 0"
              stroke="#1e293b"
              strokeWidth="1.5"
              filter={`url(#paper-fissure-${uniqueId})`}
            />
          </svg>
        </div>

        {/* Bottom Edge Ripped Fiber Layer */}
        <div className="absolute -bottom-1 inset-x-0 h-5 pointer-events-none select-none z-20">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 24" fill="none">
            {/* White Raw Pulp Highlights */}
            <path
              d="M 0 24 Q 120 10 250 18 Q 400 6 550 16 Q 700 8 850 18 Q 950 10 1000 24 L 1000 24 L 0 24 Z"
              fill="#ffffff"
              opacity="0.85"
              filter={`url(#heavy-tear-${uniqueId})`}
            />
            {/* Dark Frayed Fiber Line */}
            <path
              d="M 0 24 Q 120 12 250 20 Q 400 8 550 18 Q 700 10 850 20 Q 950 12 1000 24"
              stroke="#1e293b"
              strokeWidth="1.5"
              filter={`url(#paper-fissure-${uniqueId})`}
            />
          </svg>
        </div>

        {/* Left Edge Ripped Fiber Layer */}
        <div className="absolute inset-y-0 -left-1 w-4 pointer-events-none select-none z-20">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 20 600" fill="none">
            <path
              d="M 0 0 Q 12 100 4 200 Q 14 350 5 450 Q 12 550 0 600"
              stroke="#ffffff"
              strokeWidth="4"
              filter={`url(#heavy-tear-${uniqueId})`}
            />
            <path
              d="M 0 0 Q 10 100 3 200 Q 12 350 4 450 Q 10 550 0 600"
              stroke="#1e293b"
              strokeWidth="1.4"
              filter={`url(#paper-fissure-${uniqueId})`}
            />
          </svg>
        </div>

        {/* Right Edge Ripped Fiber Layer */}
        <div className="absolute inset-y-0 -right-1 w-4 pointer-events-none select-none z-20">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 20 600" fill="none">
            <path
              d="M 20 0 Q 8 100 16 200 Q 6 350 15 450 Q 8 550 20 600"
              stroke="#ffffff"
              strokeWidth="4"
              filter={`url(#heavy-tear-${uniqueId})`}
            />
            <path
              d="M 20 0 Q 10 100 17 200 Q 8 350 16 450 Q 10 550 20 600"
              stroke="#1e293b"
              strokeWidth="1.4"
              filter={`url(#paper-fissure-${uniqueId})`}
            />
          </svg>
        </div>

        {/* Content Container */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  )
}
