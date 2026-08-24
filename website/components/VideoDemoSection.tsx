'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Volume1,
  VolumeX,
  Maximize,
  Minimize,
  Loader2,
  Settings,
  Repeat,
  Check,
} from 'lucide-react'

export default function VideoDemoSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false)
  const [currentTimeStr, setCurrentTimeStr] = useState('0:00')
  const [durationStr, setDurationStr] = useState('0:00')
  const [progress, setProgress] = useState(0)
  const [bufferProgress, setBufferProgress] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [isVolumeHovered, setIsVolumeHovered] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [hoverTime, setHoverTime] = useState<string | null>(null)
  const [hoverPosition, setHoverPosition] = useState(0)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [centerAction, setCenterAction] = useState<'play' | 'pause' | null>(null)

  const hideControlsTimer = useRef<NodeJS.Timeout | null>(null)

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00'
    const mins = Math.floor(seconds / 60)
    return `${mins}:${seconds % 60 < 10 ? '0' : ''}${Math.floor(seconds % 60)}`
  }

  // Auto-hide controls during playback on inactivity
  const handleMouseMove = () => {
    setShowControls(true)
    if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current)
    if (isPlaying && !isSettingsOpen) {
      hideControlsTimer.current = setTimeout(() => {
        setShowControls(false)
      }, 2500)
    }
  }

  const togglePlay = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    const video = videoRef.current
    if (!video) return

    if (video.paused || video.ended) {
      video.play().then(() => {
        setIsPlaying(true)
        setIsBuffering(false)
        setCenterAction('play')
        setTimeout(() => setCenterAction(null), 400)
      }).catch(() => {
        video.muted = true
        setIsMuted(true)
        video.play().then(() => {
          setIsPlaying(true)
          setIsBuffering(false)
        }).catch(() => {})
      })
    } else {
      video.pause()
      setIsPlaying(false)
      setCenterAction('pause')
      setTimeout(() => setCenterAction(null), 400)
    }
  }, [])

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    const val = parseFloat(e.target.value)
    setVolume(val)
    if (videoRef.current) {
      videoRef.current.volume = val
      videoRef.current.muted = val === 0
      setIsMuted(val === 0)
    }
  }

  const toggleFullscreen = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    const container = containerRef.current
    if (!container) return
    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {})
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {})
    }
  }

  const handleRestart = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    const video = videoRef.current
    if (!video) return
    video.currentTime = 0
    video.play().then(() => {
      setIsPlaying(true)
      setIsBuffering(false)
    }).catch(() => {})
  }

  const handleSpeedChange = (speed: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (videoRef.current) {
      videoRef.current.playbackRate = speed
      setPlaybackSpeed(speed)
      setIsSettingsOpen(false)
    }
  }

  const toggleLoop = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    const video = videoRef.current
    if (!video) return
    video.loop = !isLooping
    setIsLooping(!isLooping)
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video || !video.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    video.currentTime = pos * video.duration
    setProgress(pos * 100)
  }

  const handleTimelineHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    if (!video || !video.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    setHoverTime(formatTime(pos * video.duration))
    setHoverPosition(pos * 100)
  }

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return
      if (e.code === 'Space' || e.key === 'k') {
        e.preventDefault()
        togglePlay()
      } else if (e.key === 'm') {
        e.preventDefault()
        toggleMute()
      } else if (e.key === 'f') {
        e.preventDefault()
        toggleFullscreen()
      } else if (e.key === 'ArrowRight' || e.key === 'l') {
        e.preventDefault()
        if (videoRef.current) videoRef.current.currentTime += 5
      } else if (e.key === 'ArrowLeft' || e.key === 'j') {
        e.preventDefault()
        if (videoRef.current) videoRef.current.currentTime -= 5
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [togglePlay])

  return (
    <section id="demo" className="py-16 sm:py-28 px-3 sm:px-6 max-w-6xl mx-auto relative select-none overflow-hidden xl:overflow-visible">
      
      {/* ------------------------------------------------------------- */}
      {/* SECTION HEADER: EXACT 1:1 CRAYON COLORED PENCIL REPLICA       */}
      {/* ------------------------------------------------------------- */}
      <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14 relative select-none">
        
        {/* Color Pencil King Crown Badge at Top-Left Header */}
        <div className="hidden sm:inline-flex items-center gap-2 absolute -top-8 left-2 md:left-8 select-none -rotate-6">
          {/* Hand-Drawn Brown/Gold Color Pencil Crown */}
          <svg className="w-7 h-6 text-[#9a3412] filter drop-shadow-sm" viewBox="0 0 32 26" fill="none" stroke="currentColor">
            <path
              d="M 3 20 L 4 7 L 10 13 L 16 3 L 22 13 L 28 7 L 29 20 Z"
              fill="#fef08a"
              fillOpacity="0.4"
              stroke="#9a3412"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M 6 17 L 26 17" stroke="#b45309" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="4" cy="6" r="1.5" fill="#ef4444" />
            <circle cx="16" cy="3" r="1.8" fill="#3b82f6" />
            <circle cx="28" cy="6" r="1.5" fill="#10b981" />
          </svg>

          <span 
            className="text-xl sm:text-2xl text-[#9a3412] font-bold tracking-wide select-none"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            the king of git backup
          </span>
        </div>

        {/* Main Title: Commanding Section Heading in Cabin Sketch (Single Line) */}
        <div className="relative inline-flex items-center justify-center gap-3 sm:gap-5 mt-4 sm:mt-2 max-w-full overflow-visible py-2">
          
          <h2 
            className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none select-none font-bold flex flex-wrap sm:inline-flex items-baseline justify-center"
            style={{ 
              fontFamily: "'Cabin Sketch', cursive",
              filter: 'drop-shadow(0 3px 3px rgba(0,0,0,0.08))',
            }}
          >
            {/* Word: "See" in Denim Blue Crayon */}
            <span 
              className="text-[#1e3a8a] inline-block -rotate-2 translate-y-0.5 mr-2 sm:mr-3.5 font-bold"
              style={{ textShadow: '1.2px 1.2px 0px rgba(30, 58, 138, 0.25)' }}
            >
              See
            </span>

            {/* Word: "GitKura" in Arched Multi-Colored Pencil Letters */}
            <span className="inline-flex items-baseline font-bold">
              <span className="text-[#1d4ed8] inline-block -rotate-3 -translate-y-0.5" style={{ textShadow: '1.2px 1.2px 0px rgba(29, 78, 216, 0.25)' }}>G</span>
              <span className="text-[#0284c7] inline-block rotate-2 -translate-y-1 relative" style={{ textShadow: '1.2px 1.2px 0px rgba(2, 132, 199, 0.25)' }}>
                i
                {/* Tiny cute golden sparkle on the letter i */}
                <span className="absolute -top-4 left-0.5 text-xs sm:text-sm text-[#f59e0b] font-mono pointer-events-none select-none">✦</span>
              </span>
              <span className="text-[#0d9488] inline-block -rotate-1 -translate-y-1.5" style={{ textShadow: '1.2px 1.2px 0px rgba(13, 148, 136, 0.25)' }}>t</span>
              <span className="text-[#7c3aed] inline-block rotate-3 -translate-y-2" style={{ textShadow: '1.2px 1.2px 0px rgba(124, 58, 237, 0.25)' }}>K</span>
              <span className="text-[#ea580c] inline-block -rotate-2 -translate-y-1.5" style={{ textShadow: '1.2px 1.2px 0px rgba(234, 88, 12, 0.25)' }}>u</span>
              <span className="text-[#dc2626] inline-block rotate-2 -translate-y-0.5" style={{ textShadow: '1.2px 1.2px 0px rgba(220, 38, 38, 0.25)' }}>r</span>
              <span className="text-[#e11d48] inline-block -rotate-3 translate-y-0" style={{ textShadow: '1.2px 1.2px 0px rgba(225, 29, 72, 0.25)' }}>a</span>
            </span>

            {/* Word: "in Action" in Indigo Navy with Double Green Pencil Underline */}
            <span 
              className="relative inline-block text-[#1e3a8a] rotate-1 translate-y-0.5 ml-2.5 sm:ml-4 font-bold"
              style={{ textShadow: '1.2px 1.2px 0px rgba(30, 58, 138, 0.25)' }}
            >
              in Action
              {/* Double Green Colored Pencil Cute Wavy Underline */}
              <svg 
                className="absolute -bottom-2.5 sm:-bottom-3.5 left-0 w-full h-3 sm:h-4 text-[#16a34a] pointer-events-none" 
                viewBox="0 0 160 14" 
                fill="none"
              >
                <path d="M 2 4 C 40 1, 80 7, 120 2 C 140 0, 155 4, 158 5" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
                <path d="M 6 9 C 45 6, 85 12, 125 7 C 142 5, 150 8, 153 9" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
              </svg>
            </span>
          </h2>

          {/* Hand-Drawn Cute Orange/Gold Star with Crayon Rays */}
          <div className="hidden sm:inline-block relative -top-3 sm:-top-5 -rotate-6 select-none flex-shrink-0">
            <svg 
              className="w-10 h-10 sm:w-14 sm:h-14 text-[#ea580c]" 
              viewBox="0 0 44 44" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              style={{ filter: 'drop-shadow(0 2px 2px rgba(234,88,12,0.2))' }}
            >
              <path 
                d="M 22 4 L 27 15 L 39 16 L 29 25 L 32 37 L 22 30 L 12 37 L 15 25 L 5 16 L 17 15 Z" 
                fill="#fef08a" 
                fillOpacity="0.4" 
              />
              {/* Crayon Rays */}
              <path d="M 37 8 L 42 5 M 39 13 L 44 13 M 24 2 L 24 0" stroke="#f97316" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Subtitle in Natural Handwritten Ink */}
        <p 
          className="text-xl sm:text-2xl lg:text-3xl text-[#334155] font-medium max-w-2xl mx-auto mt-6 sm:mt-8 leading-relaxed"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          Watch how GitKura differential-syncs 50+ Git repositories directly to your local drive and multi-cloud targets in seconds.
        </p>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* MAIN CONTAINER WITH EXACT PLACED COLOR PENCIL ANNOTATIONS     */}
      {/* ------------------------------------------------------------- */}
      <div className="relative max-w-4xl mx-auto">

        {/* ------------------------------------------------------------- */}
        {/* 1. TOP-LEFT: 🛡️ air-gapped local vault ⤵                      */}
        {/* ------------------------------------------------------------- */}
        <div className="hidden sm:inline-flex items-center gap-2 absolute -top-10 left-2 md:left-6 z-30 pointer-events-none select-none -rotate-2">
          {/* Blue Color Pencil Shield */}
          <svg className="w-6 h-6 text-[#2563eb]" viewBox="0 0 28 28" fill="none" stroke="currentColor">
            <path d="M 14 3 C 19 5, 23 5, 23 11 C 23 18, 17 23, 14 25 C 11 23, 5 18, 5 11 C 5 5, 9 5, 14 3 Z" fill="#dbeafe" fillOpacity="0.4" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 9 10 L 19 10 M 8 13 L 20 13 M 10 16 L 18 16" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 14 7 L 14 21" stroke="#1d4ed8" strokeWidth="1.4" strokeLinecap="round" />
          </svg>

          <span 
            className="text-xl sm:text-2xl text-[#1d4ed8] font-bold tracking-wide select-none leading-none"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            air-gapped local vault
          </span>

          {/* Curved Blue Arrow ⤵ pointing into frame */}
          <svg className="w-8 h-6 text-[#2563eb] select-none ml-0.5" viewBox="0 0 35 25" fill="none" stroke="currentColor">
            <path d="M 3 6 C 14 4, 22 10, 30 20" strokeWidth="2" strokeLinecap="round" />
            <path d="M 22 19 L 30 20 L 29 11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 2. TOP-RIGHT: ↙ 60 fps live delta demo ☆                      */}
        {/* ------------------------------------------------------------- */}
        <div className="hidden sm:inline-flex items-center gap-2 absolute -top-10 right-2 md:right-6 z-30 pointer-events-none select-none rotate-2">
          {/* Curved Red Arrow ↙ pointing into frame */}
          <svg className="w-8 h-6 text-[#b91c1c] select-none mr-0.5" viewBox="0 0 35 25" fill="none" stroke="currentColor">
            <path d="M 32 6 C 21 4, 13 10, 5 20" strokeWidth="2" strokeLinecap="round" />
            <path d="M 13 19 L 5 20 L 6 11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <span 
            className="text-xl sm:text-2xl text-[#b91c1c] font-bold tracking-wide select-none leading-none"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            60 fps live delta demo
          </span>

          {/* Hand-Drawn Red Star Outline ☆ */}
          <svg className="w-5 h-5 text-[#b91c1c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 12 2 L 15 8 L 22 9 L 17 14 L 18 21 L 12 17 L 6 21 L 7 14 L 2 9 L 9 8 Z" fill="#fee2e2" fillOpacity="0.5" />
          </svg>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 3. MID-LEFT: ⚡ differential sync ➔                           */}
        {/* ------------------------------------------------------------- */}
        <div className="hidden xl:inline-flex items-center gap-2 absolute top-[36%] -left-52 z-30 pointer-events-none select-none -rotate-3">
          {/* Yellow Crayon Lightning Bolt ⚡ */}
          <svg className="w-6 h-7 text-[#d97706]" viewBox="0 0 24 28" fill="none" stroke="currentColor">
            <path d="M 13 2 L 4 15 L 11 15 L 9 26 L 20 11 L 13 11 Z" fill="#fef08a" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <div className="flex flex-col items-start">
            <span 
              className="text-2xl text-[#15803d] font-bold tracking-wide select-none leading-none"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              differential sync
            </span>
            <span 
              className="text-base text-[#166534] font-medium tracking-wide select-none mt-0.5"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              (only modified delta bytes!)
            </span>
          </div>

          {/* Green Arrow ➔ pointing into frame */}
          <svg className="w-9 h-5 text-[#15803d] select-none ml-1" viewBox="0 0 40 20" fill="none" stroke="currentColor">
            <path d="M 3 10 C 14 5, 24 15, 36 10" strokeWidth="2" strokeLinecap="round" />
            <path d="M 28 4 L 36 10 L 29 16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 4. MID-RIGHT: ⬅ multi-target vault ☁️                          */}
        {/* ------------------------------------------------------------- */}
        <div className="hidden xl:inline-flex items-center gap-2 absolute top-[36%] -right-56 z-30 pointer-events-none select-none rotate-2">
          {/* Blue Arrow ⬅ pointing into frame */}
          <svg className="w-9 h-5 text-[#1d4ed8] select-none mr-1" viewBox="0 0 40 20" fill="none" stroke="currentColor">
            <path d="M 37 10 C 26 5, 16 15, 4 10" strokeWidth="2" strokeLinecap="round" />
            <path d="M 12 4 L 4 10 L 11 16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <div className="flex flex-col items-start">
            <div className="flex items-center gap-1.5">
              <span 
                className="text-2xl text-[#1d4ed8] font-bold tracking-wide select-none leading-none"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                multi-target vault
              </span>
              {/* Hand-Drawn Blue Pencil Cloud ☁️ */}
              <svg className="w-7 h-5 text-[#2563eb]" viewBox="0 0 32 24" fill="none" stroke="currentColor">
                <path d="M 8 18 C 4 18, 2 15, 2 12 C 2 9, 5 8, 7 8 C 8 4, 12 2, 17 2 C 22 2, 25 5, 25 9 C 28 9, 30 11, 30 14 C 30 17, 27 18, 24 18 Z" fill="#dbeafe" fillOpacity="0.4" stroke="#1d4ed8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span 
              className="text-base text-[#1e40af] font-medium tracking-wide select-none mt-0.5"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              Telegram, S3, Drive, Azure, HDD
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 5. BOTTOM-LEFT: 🔒 AES-256 zero-knowledge ↗                   */}
        {/* ------------------------------------------------------------- */}
        <div className="hidden sm:inline-flex items-center gap-2 absolute -bottom-10 left-2 md:left-8 z-30 pointer-events-none select-none -rotate-2">
          {/* Purple Color Pencil Padlock 🔒 */}
          <svg className="w-6 h-6 text-[#6b21a8]" viewBox="0 0 28 28" fill="none" stroke="currentColor">
            <rect x="5" y="11" width="18" height="14" rx="2.5" fill="#f3e8ff" fillOpacity="0.5" stroke="#6b21a8" strokeWidth="2" strokeLinecap="round" />
            <path d="M 9 11 L 9 7 C 9 4, 11 3, 14 3 C 17 3, 19 4, 19 7 L 19 11" stroke="#6b21a8" strokeWidth="2" strokeLinecap="round" />
            <circle cx="14" cy="17" r="1.8" fill="#7c3aed" />
          </svg>

          <span 
            className="text-xl sm:text-2xl text-[#6b21a8] font-bold tracking-wide select-none leading-none"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            AES-256 zero-knowledge
          </span>

          {/* Curved Purple Arrow ↗ pointing up into frame */}
          <svg className="w-8 h-6 text-[#6b21a8] select-none ml-0.5" viewBox="0 0 35 25" fill="none" stroke="currentColor">
            <path d="M 3 20 C 14 20, 22 14, 30 4" strokeWidth="2" strokeLinecap="round" />
            <path d="M 22 4 L 30 4 L 29 13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 6. BOTTOM-RIGHT: ↖ 1-click disaster recovery ♡                */}
        {/* ------------------------------------------------------------- */}
        <div className="hidden sm:inline-flex items-center gap-2 absolute -bottom-10 right-2 md:right-8 z-30 pointer-events-none select-none rotate-2">
          {/* Curved Red Arrow ↖ pointing up into frame */}
          <svg className="w-8 h-6 text-[#b91c1c] select-none mr-0.5" viewBox="0 0 35 25" fill="none" stroke="currentColor">
            <path d="M 32 20 C 21 20, 13 14, 5 4" strokeWidth="2" strokeLinecap="round" />
            <path d="M 13 4 L 5 4 L 6 13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <span 
            className="text-xl sm:text-2xl text-[#b91c1c] font-bold tracking-wide select-none leading-none"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            1-click disaster recovery
          </span>

          {/* Hand-Drawn Red Heart Outline ♡ */}
          <svg className="w-5 h-5 text-[#b91c1c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 12 21 C 12 21, 3 14, 3 8 C 3 4.5, 6 2, 9 2 C 11 2, 12 3.5, 12 4.5 C 12 3.5, 13 2, 15 2 C 18 2, 21 4.5, 21 8 C 21 14, 12 21, 12 21 Z" fill="#fee2e2" fillOpacity="0.5" />
          </svg>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* AUTHENTIC TORN PAPER PASSE-PARTOUT FRAME SHOWCASE              */}
        {/* ------------------------------------------------------------- */}
        <div 
          ref={containerRef}
          className="relative max-w-4xl mx-auto aspect-[1024/695] filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.16)]"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isPlaying && setShowControls(false)}
        >
          
          {/* Layer 1: Live Video Player Underneath (Positioned inside the exact torn cutout) */}
          <div 
            className="absolute z-10 overflow-hidden bg-[#090d16] cursor-pointer"
            style={{
              left: '8.5%',
              top: '14.5%',
              width: '83.0%',
              height: '65.0%',
            }}
            onClick={(e) => togglePlay(e)}
            onDoubleClick={(e) => toggleFullscreen(e)}
          >
            {/* Live Video Element */}
            <video
              ref={videoRef}
              src="/export-1787519527893.mp4"
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
              onPlay={() => {
                setIsPlaying(true)
                setIsBuffering(false)
              }}
              onPause={() => {
                setIsPlaying(false)
                setIsBuffering(false)
              }}
              onWaiting={() => setIsBuffering(true)}
              onPlaying={() => setIsBuffering(false)}
              onTimeUpdate={() => {
                const v = videoRef.current
                if (!v || !v.duration) return
                setCurrentTimeStr(formatTime(v.currentTime))
                setDurationStr(formatTime(v.duration))
                setProgress((v.currentTime / v.duration) * 100)

                if (v.buffered.length > 0) {
                  const bufferedEnd = v.buffered.end(v.buffered.length - 1)
                  setBufferProgress((bufferedEnd / v.duration) * 100)
                }
              }}
              onEnded={() => {
                setIsPlaying(false)
                setProgress(100)
              }}
            />

            {/* Buffering Spinner */}
            {isBuffering && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-30 pointer-events-none">
                <Loader2 className="w-10 h-10 text-[#fef08a] animate-spin" />
              </div>
            )}

            {/* Center Play/Pause Ripple Indicator */}
            {centerAction && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 animate-ping">
                <div className="w-16 h-16 rounded-full bg-black/70 text-white flex items-center justify-center border border-white/30">
                  {centerAction === 'play' ? <Play className="w-8 h-8 fill-white ml-0.5" /> : <Pause className="w-8 h-8 fill-white" />}
                </div>
              </div>
            )}

            {/* Big Center Play Button Overlay (when paused) */}
            {!isPlaying && !isBuffering && !centerAction && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/15 backdrop-blur-[1px] z-30 pointer-events-none gap-2">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#fde047] text-[#0f172a] border-3 border-[#0f172a] shadow-[4px_4px_0px_#0f172a] flex items-center justify-center pl-1 transform transition-transform hover:scale-105">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-[#0f172a]" />
                </div>
                
                {/* Floating Handwritten prompt */}
                <div className="flex items-center gap-1.5 -rotate-2 select-none">
                  <span 
                    className="text-2xl sm:text-3xl text-white font-bold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                    style={{ fontFamily: "'Caveat', cursive" }}
                  >
                    click to inspect live desktop sync
                  </span>
                </div>
              </div>
            )}

            {/* Minimal Floating Controls Bar */}
            <div
              className={`absolute bottom-2.5 sm:bottom-3.5 inset-x-2 sm:inset-x-4 p-2 bg-[#0f172a]/90 backdrop-blur-md border border-white/20 rounded-xl transition-opacity duration-200 z-30 ${
                showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Scrubber */}
              <div
                ref={progressBarRef}
                onClick={handleSeek}
                onMouseMove={handleTimelineHover}
                onMouseLeave={() => setHoverTime(null)}
                className="relative h-2 w-full bg-white/20 rounded-full cursor-pointer flex items-center mb-1"
              >
                {/* Buffer Progress */}
                <div
                  className="absolute left-0 top-0 bottom-0 bg-white/30 rounded-full pointer-events-none"
                  style={{ width: `${bufferProgress}%` }}
                />
                {/* Active Progress */}
                <div
                  className="absolute left-0 top-0 bottom-0 bg-[#fde047] rounded-full pointer-events-none"
                  style={{ width: `${progress}%` }}
                />
                {/* Scrubber Thumb */}
                <div
                  className="absolute w-3 h-3 bg-white border border-black rounded-full shadow -ml-1.5"
                  style={{ left: `${progress}%` }}
                />
                {/* Tooltip */}
                {hoverTime && (
                  <div
                    className="absolute -top-7 -translate-x-1/2 bg-black/90 text-white text-[10px] font-mono px-1.5 py-0.5 rounded border border-white/20 pointer-events-none"
                    style={{ left: `${hoverPosition}%` }}
                  >
                    {hoverTime}
                  </div>
                )}
              </div>

              {/* Actions Row */}
              <div className="flex items-center justify-between text-white text-[11px] font-mono">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {/* Restart */}
                  <button
                    type="button"
                    onClick={(e) => handleRestart(e)}
                    className="p-1 hover:bg-white/20 rounded cursor-pointer"
                    title="Restart"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  {/* Play / Pause */}
                  <button
                    type="button"
                    onClick={(e) => togglePlay(e)}
                    className="p-1 hover:bg-white/20 rounded cursor-pointer"
                    title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
                  </button>

                  {/* Volume & Hover Slider */}
                  <div
                    className="relative flex items-center"
                    onMouseEnter={() => setIsVolumeHovered(true)}
                    onMouseLeave={() => setIsVolumeHovered(false)}
                  >
                    <button
                      type="button"
                      onClick={(e) => toggleMute(e)}
                      className="p-1 hover:bg-white/20 rounded cursor-pointer"
                      title={isMuted ? 'Unmute (m)' : 'Mute (m)'}
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-3.5 h-3.5 text-[#ef4444]" />
                      ) : volume < 0.5 ? (
                        <Volume1 className="w-3.5 h-3.5" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-200 flex items-center ${
                        isVolumeHovered ? 'w-14 sm:w-16 opacity-100 ml-1' : 'w-0 opacity-0'
                      }`}
                    >
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#fde047]"
                      />
                    </div>
                  </div>

                  {/* Timestamp */}
                  <span className="text-white/80 hidden xs:inline text-[10px]">
                    {currentTimeStr} / {durationStr}
                  </span>
                </div>

                {/* Right Side: Speed Settings, Fullscreen */}
                <div className="flex items-center gap-1.5 relative">
                  {/* Speed Selector */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsSettingsOpen(!isSettingsOpen)
                      }}
                      className="p-1 hover:bg-white/20 rounded flex items-center gap-0.5 text-[#fde047] font-bold cursor-pointer"
                      title="Playback Speed"
                    >
                      <span>{playbackSpeed}x</span>
                      <Settings className="w-3 h-3 text-white/70" />
                    </button>

                    {/* Settings Menu */}
                    {isSettingsOpen && (
                      <div className="absolute bottom-9 right-0 w-36 bg-[#0f172a] border border-white/20 rounded-lg p-1.5 shadow-2xl flex flex-col gap-1 z-40 text-white">
                        <div className="px-1.5 py-0.5 text-[9px] font-bold text-[#94a3b8] uppercase border-b border-white/10">
                          Speed
                        </div>
                        <div className="grid grid-cols-3 gap-0.5 py-0.5">
                          {[0.5, 1, 1.25, 1.5, 2].map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={(e) => handleSpeedChange(s, e)}
                              className={`px-1 py-0.5 rounded text-center text-[10px] font-mono cursor-pointer ${
                                playbackSpeed === s ? 'bg-[#fde047] text-black font-bold' : 'hover:bg-white/10'
                              }`}
                            >
                              {s}x
                            </button>
                          ))}
                        </div>
                        <div className="border-t border-white/10 pt-1">
                          <button
                            type="button"
                            onClick={(e) => toggleLoop(e)}
                            className="w-full flex items-center justify-between px-1.5 py-0.5 rounded text-[10px] hover:bg-white/10 cursor-pointer"
                          >
                            <div className="flex items-center gap-1">
                              <Repeat className="w-3 h-3 text-[#fde047]" />
                              <span>Loop</span>
                            </div>
                            {isLooping && <Check className="w-3.5 h-3.5 text-[#22c55e]" />}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Fullscreen Toggle */}
                  <button
                    type="button"
                    onClick={(e) => toggleFullscreen(e)}
                    className="p-1 hover:bg-white/20 rounded cursor-pointer"
                    title="Fullscreen (f)"
                  >
                    {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Layer 2: On-Top Exact User Torn Paper Frame */}
          <img
            src="/user-torn-frame.png"
            alt="GitKura Photorealistic Torn Paper Frame"
            className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none z-20"
          />

        </div>

      </div>

    </section>
  )
}
