'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  Play,
  Pause,
  Volume2,
  Volume1,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  RotateCcw,
  PictureInPicture2,
  Check,
  FastForward,
  Rewind,
  Loader2,
} from 'lucide-react'

interface VideoPlayerProps {
  src: string
  poster?: string
  className?: string
}

export default function VideoPlayer({ src, poster, className = '' }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const timeSliderRef = useRef<HTMLDivElement>(null)

  // Player States
  const [isPlaying, setIsPlaying] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [progress, setProgress] = useState(0)
  const [bufferProgress, setBufferProgress] = useState(0)
  const [currentTimeStr, setCurrentTimeStr] = useState('0:00')
  const [durationStr, setDurationStr] = useState('0:00')
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isVolumeHovered, setIsVolumeHovered] = useState(false)
  const [hoverTime, setHoverTime] = useState<string | null>(null)
  const [hoverPosition, setHoverPosition] = useState(0)
  const [centerAction, setCenterAction] = useState<'play' | 'pause' | null>(null)
  const [seekFeedback, setSeekFeedback] = useState<{ direction: 'left' | 'right'; amount: number } | null>(null)

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Format time utility
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  // Handle Controls Visibility
  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current)
    if (isPlaying && !isSettingsOpen) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 2500)
    }
  }

  // Play / Pause Toggle
  const togglePlay = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    const video = videoRef.current
    if (!video) return

    if (video.paused || video.ended) {
      video.play().then(() => {
        setIsPlaying(true)
        setCenterAction('play')
        setTimeout(() => setCenterAction(null), 500)
      }).catch((err) => {
        console.warn('Playback error, trying unmuted fallback:', err)
        // Fallback if browser blocks unmuted playback
        video.muted = true
        setIsMuted(true)
        video.play().catch(e => console.error("Fatal playback error:", e))
      })
    } else {
      video.pause()
      setIsPlaying(false)
      setCenterAction('pause')
      setTimeout(() => setCenterAction(null), 500)
    }
  }, [])

  // Mute Toggle
  const toggleMute = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    const video = videoRef.current
    if (!video) return

    if (video.muted || video.volume === 0) {
      video.muted = false
      const targetVol = volume > 0 ? volume : 0.8
      video.volume = targetVol
      setIsMuted(false)
      setVolume(targetVol)
    } else {
      video.muted = true
      setIsMuted(true)
    }
  }, [volume])

  // Volume Slider Change
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

  // Seek Timeline on Click
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    const slider = timeSliderRef.current
    const video = videoRef.current
    if (!slider || !video || !video.duration) return

    const rect = slider.getBoundingClientRect()
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    video.currentTime = pos * video.duration
    setProgress(pos * 100)
  }

  // Timeline Hover Timestamp Preview
  const handleTimelineHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const slider = timeSliderRef.current
    const video = videoRef.current
    if (!slider || !video || !video.duration) return

    const rect = slider.getBoundingClientRect()
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const hoverSeconds = pos * video.duration
    setHoverTime(formatTime(hoverSeconds))
    setHoverPosition(pos * 100)
  }

  // Jump Seek (±5s)
  const jumpTime = useCallback((seconds: number) => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = Math.max(0, Math.min(video.duration || 0, video.currentTime + seconds))
    setSeekFeedback({
      direction: seconds > 0 ? 'right' : 'left',
      amount: Math.abs(seconds),
    })
    setTimeout(() => setSeekFeedback(null), 600)
  }, [])

  // Change Speed
  const handleSpeedChange = (speed: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (videoRef.current) {
      videoRef.current.playbackRate = speed
      setPlaybackSpeed(speed)
      setIsSettingsOpen(false)
    }
  }

  // Toggle Picture in Picture
  const togglePiP = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    const video = videoRef.current
    if (!video) return
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture()
      } else if (document.pictureInPictureEnabled) {
        await video.requestPictureInPicture()
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Toggle Fullscreen
  const toggleFullscreen = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    const container = containerRef.current
    if (!container) return

    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {})
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {})
    }
  }, [])

  // Hotkeys Listener
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
      } else if (e.key === 'i') {
        e.preventDefault()
        togglePiP()
      } else if (e.code === 'ArrowRight') {
        e.preventDefault()
        jumpTime(5)
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault()
        jumpTime(-5)
      } else if (e.code === 'ArrowUp') {
        e.preventDefault()
        const newVol = Math.min(1, volume + 0.1)
        setVolume(newVol)
        if (videoRef.current) videoRef.current.volume = newVol
      } else if (e.code === 'ArrowDown') {
        e.preventDefault()
        const newVol = Math.max(0, volume - 0.1)
        setVolume(newVol)
        if (videoRef.current) videoRef.current.volume = newVol
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [togglePlay, toggleMute, toggleFullscreen, jumpTime, volume])

  // Fullscreen change listener
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFsChange)
    return () => document.removeEventListener('fullscreenchange', handleFsChange)
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className={`relative group bg-[#090d16] rounded-2xl overflow-hidden shadow-2xl select-none font-sans aspect-video ${className}`}
    >
      {/* Native HTML5 Video Element with Direct Event Handlers */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        preload="auto"
        onClick={(e) => togglePlay(e)}
        onDoubleClick={(e) => toggleFullscreen(e)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => setIsBuffering(false)}
        onTimeUpdate={() => {
          const video = videoRef.current
          if (!video || !video.duration) return
          setCurrentTimeStr(formatTime(video.currentTime))
          setProgress((video.currentTime / video.duration) * 100)

          if (video.buffered.length > 0) {
            const bufferedEnd = video.buffered.end(video.buffered.length - 1)
            setBufferProgress((bufferedEnd / video.duration) * 100)
          }
        }}
        onLoadedMetadata={() => {
          const video = videoRef.current
          if (video) setDurationStr(formatTime(video.duration))
        }}
        onEnded={() => {
          setIsPlaying(false)
          setProgress(100)
        }}
        className="w-full h-full object-contain cursor-pointer"
      />

      {/* Buffering Spinner */}
      {isBuffering && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
          <div className="p-3 bg-black/70 rounded-full backdrop-blur-sm">
            <Loader2 className="w-8 h-8 text-[#fef08a] animate-spin" />
          </div>
        </div>
      )}

      {/* Center Action Feedback Ripple (Play / Pause) */}
      {centerAction && !isBuffering && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
          <div className="w-16 h-16 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center animate-ping">
            {centerAction === 'play' ? (
              <Play className="w-8 h-8 fill-white ml-1" />
            ) : (
              <Pause className="w-8 h-8 fill-white" />
            )}
          </div>
        </div>
      )}

      {/* Double Tap Seek Feedback */}
      {seekFeedback && (
        <div
          className={`absolute inset-y-0 ${
            seekFeedback.direction === 'left' ? 'left-8' : 'right-8'
          } flex items-center justify-center pointer-events-none z-20`}
        >
          <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-mono font-bold border border-white/15 animate-pulse">
            {seekFeedback.direction === 'left' ? (
              <>
                <Rewind className="w-4 h-4 text-[#fef08a]" />
                <span>-{seekFeedback.amount}s</span>
              </>
            ) : (
              <>
                <span>+{seekFeedback.amount}s</span>
                <FastForward className="w-4 h-4 text-[#fef08a]" />
              </>
            )}
          </div>
        </div>
      )}

      {/* Big Center Play Button Overlay (when paused on load) */}
      {!isPlaying && (
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-10 cursor-pointer"
          onClick={(e) => togglePlay(e)}
        >
          <button
            type="button"
            onClick={(e) => togglePlay(e)}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#fef08a] text-[#0f172a] border-3 border-[#0f172a] shadow-[6px_6px_0px_#0f172a] hover:scale-105 active:scale-95 transition-transform flex items-center justify-center pl-1 cursor-pointer"
            aria-label="Play video"
          >
            <Play className="w-9 h-9 sm:w-10 sm:h-10 fill-[#0f172a]" />
          </button>
        </div>
      )}

      {/* Floating Controls Bar */}
      <div
        className={`absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent transition-opacity duration-300 z-30 ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#0f172a]/95 backdrop-blur-md border border-white/15 rounded-xl p-2.5 sm:p-3 shadow-2xl flex flex-col gap-2">
          
          {/* Time Slider Track & Hover Timestamp */}
          <div
            ref={timeSliderRef}
            onClick={handleTimelineClick}
            onMouseMove={handleTimelineHover}
            onMouseLeave={() => setHoverTime(null)}
            className="relative h-2.5 w-full bg-white/20 rounded-full cursor-pointer group/slider py-1 flex items-center"
          >
            {/* Buffer progress */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-white/30 rounded-full pointer-events-none transition-all duration-150"
              style={{ width: `${bufferProgress}%` }}
            />

            {/* Active playback progress */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-[#fef08a] rounded-full pointer-events-none"
              style={{ width: `${progress}%` }}
            />

            {/* Slider Thumb */}
            <div
              className="absolute w-3.5 h-3.5 bg-white border-2 border-[#0f172a] rounded-full shadow-md -ml-1.5 top-1/2 -translate-y-1/2 transition-transform scale-0 group-hover/slider:scale-100"
              style={{ left: `${progress}%` }}
            />

            {/* Hover Timestamp Tooltip */}
            {hoverTime && (
              <div
                className="absolute -top-8 -translate-x-1/2 bg-black/90 text-white text-[11px] font-mono px-2 py-0.5 rounded border border-white/20 pointer-events-none shadow-lg"
                style={{ left: `${hoverPosition}%` }}
              >
                {hoverTime}
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between text-white text-xs font-mono">
            {/* Left Button Group: Play/Pause, Volume, Time */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Play/Pause */}
              <button
                type="button"
                onClick={(e) => togglePlay(e)}
                className="p-1.5 hover:bg-white/15 rounded-lg text-white transition-colors cursor-pointer"
                title={isPlaying ? 'Pause (k / Space)' : 'Play (k / Space)'}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
              </button>

              {/* Volume Button & Hover Slider */}
              <div
                className="relative flex items-center"
                onMouseEnter={() => setIsVolumeHovered(true)}
                onMouseLeave={() => setIsVolumeHovered(false)}
              >
                <button
                  type="button"
                  onClick={(e) => toggleMute(e)}
                  className="p-1.5 hover:bg-white/15 rounded-lg text-white transition-colors cursor-pointer"
                  title={isMuted ? 'Unmute (m)' : 'Mute (m)'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-[#ef4444]" />
                  ) : volume < 0.5 ? (
                    <Volume1 className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>

                {/* Horizontal Volume Slider */}
                <div
                  className={`overflow-hidden transition-all duration-200 flex items-center ${
                    isVolumeHovered ? 'w-16 sm:w-20 opacity-100 ml-1' : 'w-0 opacity-0'
                  }`}
                >
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#fef08a]"
                  />
                </div>
              </div>

              {/* Time Indicator */}
              <div className="text-[11px] text-white/80 font-mono select-none hidden xs:inline">
                <span className="text-white font-bold">{currentTimeStr}</span>
                <span className="text-white/40 mx-1">/</span>
                <span>{durationStr}</span>
              </div>
            </div>

            {/* Right Button Group: Speed Menu, PiP, Fullscreen */}
            <div className="flex items-center gap-1.5 sm:gap-2 relative">
              {/* Settings / Playback Speed Popover */}
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsSettingsOpen(!isSettingsOpen)
                  }}
                  className={`p-1.5 hover:bg-white/15 rounded-lg text-white transition-colors flex items-center gap-1 cursor-pointer ${
                    isSettingsOpen ? 'bg-white/20' : ''
                  }`}
                  title="Settings / Speed"
                >
                  <span className="text-[11px] font-bold font-mono text-[#fef08a]">
                    {playbackSpeed}x
                  </span>
                  <Settings className="w-3.5 h-3.5 text-white/80" />
                </button>

                {/* Speed Menu Popup */}
                {isSettingsOpen && (
                  <div className="absolute bottom-10 right-0 w-36 bg-[#0f172a] border border-white/20 rounded-xl p-1.5 shadow-2xl flex flex-col gap-0.5 z-40">
                    <div className="px-2 py-1 text-[10px] font-bold text-[#94a3b8] uppercase border-b border-white/10 mb-1">
                      Playback Speed
                    </div>
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={(e) => handleSpeedChange(s, e)}
                        className={`flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-mono transition-colors text-left cursor-pointer ${
                          playbackSpeed === s
                            ? 'bg-[#fef08a] text-[#0f172a] font-black'
                            : 'text-white hover:bg-white/10'
                        }`}
                      >
                        <span>{s === 1 ? '1.0x (Normal)' : `${s}x`}</span>
                        {playbackSpeed === s && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Picture in Picture */}
              <button
                type="button"
                onClick={(e) => togglePiP(e)}
                className="p-1.5 hover:bg-white/15 rounded-lg text-white transition-colors cursor-pointer hidden sm:inline-flex"
                title="Picture in Picture (i)"
              >
                <PictureInPicture2 className="w-4 h-4" />
              </button>

              {/* Fullscreen */}
              <button
                type="button"
                onClick={(e) => toggleFullscreen(e)}
                className="p-1.5 hover:bg-white/15 rounded-lg text-white transition-colors cursor-pointer"
                title={isFullscreen ? 'Exit Fullscreen (f)' : 'Fullscreen (f)'}
              >
                {isFullscreen ? (
                  <Minimize className="w-4 h-4" />
                ) : (
                  <Maximize className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
