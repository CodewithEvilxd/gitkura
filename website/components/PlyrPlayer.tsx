'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Rewind,
  Volume2,
  Volume1,
  VolumeX,
  Settings,
  Maximize,
  Minimize,
  PictureInPicture2,
  Download,
  Repeat,
  Check,
  Loader2,
} from 'lucide-react'

export interface PlyrPlayerProps {
  src: string
  poster?: string
  className?: string
  onPlayerReady?: (player: any) => void
}

export default function PlyrPlayer({
  src,
  poster,
  className = '',
  onPlayerReady,
}: PlyrPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const onPlayerReadyRef = useRef(onPlayerReady)

  useEffect(() => {
    onPlayerReadyRef.current = onPlayerReady
  }, [onPlayerReady])

  // State
  const [isPlaying, setIsPlaying] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [progress, setProgress] = useState(0)
  const [bufferProgress, setBufferProgress] = useState(0)
  const [currentTimeStr, setCurrentTimeStr] = useState('0:00')
  const [durationStr, setDurationStr] = useState('0:00')
  const [rawCurrentTime, setRawCurrentTime] = useState(0)
  const [rawDuration, setRawDuration] = useState(0)
  const [invertTime, setInvertTime] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [isLooping, setIsLooping] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isVolumeHovered, setIsVolumeHovered] = useState(false)
  const [hoverTime, setHoverTime] = useState<string | null>(null)
  const [hoverPosition, setHoverPosition] = useState(0)
  const [centerRipple, setCenterRipple] = useState<'play' | 'pause' | null>(null)

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Format time utility
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  // Handle Controls Fade Inactivity
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
        setIsBuffering(false)
        setCenterRipple('play')
        setTimeout(() => setCenterRipple(null), 500)
      }).catch(() => {
        video.muted = true
        setIsMuted(true)
        video.play().then(() => {
          setIsPlaying(true)
          setIsBuffering(false)
        }).catch((err) => console.error(err))
      })
    } else {
      video.pause()
      setIsPlaying(false)
      setIsBuffering(false)
      setCenterRipple('pause')
      setTimeout(() => setCenterRipple(null), 500)
    }
  }, [])

  // Restart
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

  // Seek ±10s
  const handleSeekDelta = useCallback((delta: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    const video = videoRef.current
    if (!video) return
    const newTime = Math.max(0, Math.min(video.duration || 0, video.currentTime + delta))
    video.currentTime = newTime
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

  // Timeline Click / Scrub
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    const bar = progressBarRef.current
    const video = videoRef.current
    if (!bar || !video || !video.duration) return

    const rect = bar.getBoundingClientRect()
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    video.currentTime = pos * video.duration
    setProgress(pos * 100)
  }

  // Timeline Hover Timestamp
  const handleTimelineHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = progressBarRef.current
    const video = videoRef.current
    if (!bar || !video || !video.duration) return

    const rect = bar.getBoundingClientRect()
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    setHoverTime(formatTime(pos * video.duration))
    setHoverPosition(pos * 100)
  }

  // Speed Change
  const handleSpeedChange = (speed: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (videoRef.current) {
      videoRef.current.playbackRate = speed
      setPlaybackSpeed(speed)
      setIsSettingsOpen(false)
    }
  }

  // Loop Toggle
  const toggleLoop = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    const video = videoRef.current
    if (!video) return
    video.loop = !isLooping
    setIsLooping(!isLooping)
  }

  // Picture in Picture
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

  // Fullscreen
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

  // Expose player controller API to parent
  useEffect(() => {
    if (onPlayerReadyRef.current && videoRef.current) {
      onPlayerReadyRef.current({
        play: () => videoRef.current?.play(),
        pause: () => videoRef.current?.pause(),
        restart: () => {
          if (videoRef.current) {
            videoRef.current.currentTime = 0
            videoRef.current.play()
          }
        },
        seek: (time: number) => {
          if (videoRef.current) {
            videoRef.current.currentTime = time
            videoRef.current.play()
          }
        },
      })
    }
  }, [])

  // Global Keyboard Shortcuts
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
      } else if (e.key === 'l' || e.code === 'ArrowRight') {
        e.preventDefault()
        handleSeekDelta(10)
      } else if (e.key === 'j' || e.code === 'ArrowLeft') {
        e.preventDefault()
        handleSeekDelta(-10)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [togglePlay, toggleMute, toggleFullscreen, handleSeekDelta])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className={`relative group bg-[#090d16] rounded-xl overflow-hidden shadow-md select-none font-sans aspect-[1554/972] ${className}`}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        preload="auto"
        onClick={(e) => togglePlay(e)}
        onDoubleClick={(e) => toggleFullscreen(e)}
        onPlay={() => {
          setIsPlaying(true)
          setIsBuffering(false)
        }}
        onPlaying={() => {
          setIsPlaying(true)
          setIsBuffering(false)
        }}
        onCanPlay={() => setIsBuffering(false)}
        onLoadedData={() => setIsBuffering(false)}
        onPause={() => {
          setIsPlaying(false)
          setIsBuffering(false)
        }}
        onWaiting={() => setIsBuffering(true)}
        onTimeUpdate={() => {
          const video = videoRef.current
          if (!video || !video.duration) return
          setIsBuffering(false)
          setRawCurrentTime(video.currentTime)
          setRawDuration(video.duration)
          setCurrentTimeStr(formatTime(video.currentTime))
          setDurationStr(formatTime(video.duration))
          setProgress((video.currentTime / video.duration) * 100)

          if (video.buffered.length > 0) {
            const bufferedEnd = video.buffered.end(video.buffered.length - 1)
            setBufferProgress((bufferedEnd / video.duration) * 100)
          }
        }}
        onLoadedMetadata={() => {
          const video = videoRef.current
          if (video) {
            setDurationStr(formatTime(video.duration))
            setRawDuration(video.duration)
          }
        }}
        onEnded={() => {
          setIsPlaying(false)
          setIsBuffering(false)
          setProgress(100)
        }}
        className="w-full h-full object-cover cursor-pointer"
      />

      {/* Buffering Spinner */}
      {isBuffering && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
          <div className="p-3 bg-black/75 rounded-full backdrop-blur-sm border border-white/20">
            <Loader2 className="w-8 h-8 text-[#fef08a] animate-spin" />
          </div>
        </div>
      )}

      {/* Center Action Ripple Indicator */}
      {centerRipple && !isBuffering && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
          <div className="w-20 h-20 rounded-full bg-black/70 backdrop-blur-md border border-white/25 text-white flex items-center justify-center animate-ping">
            {centerRipple === 'play' ? (
              <Play className="w-9 h-9 fill-white ml-1" />
            ) : (
              <Pause className="w-9 h-9 fill-white" />
            )}
          </div>
        </div>
      )}

      {/* Big Center Overlaid Play Button */}
      {!isPlaying && (
        <div
          className="absolute inset-0 bg-black/35 backdrop-blur-[2px] flex items-center justify-center z-10 cursor-pointer"
          onClick={(e) => togglePlay(e)}
        >
          <button
            type="button"
            onClick={(e) => togglePlay(e)}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#fef08a] text-[#0f172a] border-3 border-[#0f172a] shadow-[6px_6px_0px_#0f172a] hover:scale-105 active:scale-95 transition-transform flex items-center justify-center pl-1 cursor-pointer"
            aria-label="Play video"
          >
            <Play className="w-10 h-10 sm:w-12 sm:h-12 fill-[#0f172a]" />
          </button>
        </div>
      )}

      {/* Complete Plyr-Styled Bottom Control Bar */}
      <div
        className={`absolute bottom-0 inset-x-0 p-2.5 sm:p-4 bg-gradient-to-t from-[#0f172a]/95 via-[#0f172a]/75 to-transparent transition-opacity duration-300 z-30 ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#0f172a]/90 backdrop-blur-md border border-white/15 rounded-xl p-2 sm:p-3 shadow-2xl flex flex-col gap-2">
          
          {/* Progress Bar Scrubber */}
          <div
            ref={progressBarRef}
            onClick={handleTimelineClick}
            onMouseMove={handleTimelineHover}
            onMouseLeave={() => setHoverTime(null)}
            className="relative h-3 w-full bg-white/20 rounded-full cursor-pointer group/slider py-1 flex items-center"
          >
            {/* Buffer Progress */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-white/30 rounded-full pointer-events-none"
              style={{ width: `${bufferProgress}%` }}
            />

            {/* Active Playback Progress */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-[#fef08a] rounded-full pointer-events-none"
              style={{ width: `${progress}%` }}
            />

            {/* Scrubber Thumb */}
            <div
              className="absolute w-3.5 h-3.5 bg-white border-2 border-[#0f172a] rounded-full shadow-md -ml-1.5 top-1/2 -translate-y-1/2 transition-transform scale-0 group-hover/slider:scale-100 z-20"
              style={{ left: `${progress}%` }}
            />

            {/* Hover Timestamp Tooltip */}
            {hoverTime && (
              <div
                className="absolute -top-8 -translate-x-1/2 bg-black/90 text-white text-[11px] font-mono px-2 py-0.5 rounded border border-white/20 pointer-events-none shadow-lg z-30"
                style={{ left: `${hoverPosition}%` }}
              >
                {hoverTime}
              </div>
            )}
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between text-white text-xs font-mono">
            {/* Left Button Group */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Restart */}
              <button
                type="button"
                onClick={(e) => handleRestart(e)}
                className="p-1.5 hover:bg-white/15 rounded-lg text-white/90 hover:text-white transition-colors cursor-pointer"
                title="Restart"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Rewind 10s */}
              <button
                type="button"
                onClick={(e) => handleSeekDelta(-10, e)}
                className="p-1.5 hover:bg-white/15 rounded-lg text-white/90 hover:text-white transition-colors cursor-pointer"
                title="Rewind 10s"
              >
                <Rewind className="w-4 h-4" />
              </button>

              {/* Play / Pause Toggle Button */}
              <button
                type="button"
                onClick={(e) => togglePlay(e)}
                className="p-1.5 bg-[#fef08a] text-[#0f172a] hover:bg-[#fde047] rounded-lg font-bold transition-transform active:scale-95 cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-[#0f172a]" /> : <Play className="w-4 h-4 fill-[#0f172a] ml-0.5" />}
              </button>

              {/* Fast Forward 10s */}
              <button
                type="button"
                onClick={(e) => handleSeekDelta(10, e)}
                className="p-1.5 hover:bg-white/15 rounded-lg text-white/90 hover:text-white transition-colors cursor-pointer"
                title="Forward 10s"
              >
                <FastForward className="w-4 h-4" />
              </button>

              {/* Volume Button & Hover Slider */}
              <div
                className="relative flex items-center ml-1"
                onMouseEnter={() => setIsVolumeHovered(true)}
                onMouseLeave={() => setIsVolumeHovered(false)}
              >
                <button
                  type="button"
                  onClick={(e) => toggleMute(e)}
                  className="p-1.5 hover:bg-white/15 rounded-lg text-white transition-colors cursor-pointer"
                  title={isMuted ? 'Unmute' : 'Mute'}
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
              <button
                type="button"
                onClick={() => setInvertTime(!invertTime)}
                className="text-[11px] text-white/80 hover:text-white font-mono select-none px-1.5 py-0.5 rounded hover:bg-white/10 transition-colors hidden xs:inline-block cursor-pointer"
                title="Click to toggle remaining time"
              >
                <span className="text-white font-bold">{currentTimeStr}</span>
                <span className="text-white/40 mx-1">/</span>
                <span>
                  {invertTime
                    ? `-${formatTime(Math.max(0, rawDuration - rawCurrentTime))}`
                    : durationStr}
                </span>
              </button>
            </div>

            {/* Right Button Group: Settings, PiP, Download, Fullscreen */}
            <div className="flex items-center gap-1 sm:gap-1.5 relative">
              {/* Settings Popover */}
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
                  title="Settings"
                >
                  <span className="text-[11px] font-bold font-mono text-[#fef08a]">
                    {playbackSpeed}x
                  </span>
                  <Settings className="w-3.5 h-3.5 text-white/80" />
                </button>

                {/* Settings Popup Menu */}
                {isSettingsOpen && (
                  <div className="absolute bottom-10 right-0 w-44 bg-[#0f172a] border border-white/20 rounded-xl p-2 shadow-2xl flex flex-col gap-1 z-40">
                    <div className="px-2 py-1 text-[10px] font-bold text-[#94a3b8] uppercase border-b border-white/10 flex items-center justify-between">
                      <span>Speed</span>
                      <span className="text-[#fef08a]">{playbackSpeed}x</span>
                    </div>

                    <div className="grid grid-cols-3 gap-1 py-1">
                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={(e) => handleSpeedChange(s, e)}
                          className={`px-1.5 py-1 rounded text-center text-xs font-mono transition-colors cursor-pointer ${
                            playbackSpeed === s
                              ? 'bg-[#fef08a] text-[#0f172a] font-bold'
                              : 'text-white hover:bg-white/10'
                          }`}
                        >
                          {s}x
                        </button>
                      ))}
                    </div>

                    <div className="border-t border-white/10 pt-1 mt-1">
                      <button
                        type="button"
                        onClick={(e) => toggleLoop(e)}
                        className="w-full flex items-center justify-between px-2 py-1.5 rounded text-xs font-mono text-white hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-1.5">
                          <Repeat className="w-3.5 h-3.5 text-[#fef08a]" />
                          <span>Loop Video</span>
                        </div>
                        {isLooping && <Check className="w-3.5 h-3.5 text-[#22c55e]" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Picture in Picture */}
              <button
                type="button"
                onClick={(e) => togglePiP(e)}
                className="p-1.5 hover:bg-white/15 rounded-lg text-white transition-colors cursor-pointer hidden sm:inline-flex"
                title="Picture in Picture"
              >
                <PictureInPicture2 className="w-4 h-4" />
              </button>

              {/* Fullscreen */}
              <button
                type="button"
                onClick={(e) => toggleFullscreen(e)}
                className="p-1.5 hover:bg-white/15 rounded-lg text-white transition-colors cursor-pointer"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
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
