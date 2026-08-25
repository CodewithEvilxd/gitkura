'use client'

import React, { useState, useRef } from 'react'
import {
  Lock,
  ShieldCheck,
  EyeOff,
  KeyRound,
  CheckCircle2,
  HardDrive,
} from 'lucide-react'
import WashiTape from './WashiTape'

const securityPillars = [
  {
    id: 1,
    title: 'AES-256 Local Encryption',
    subtitle: 'Zero plaintext tokens on your drive',
    description:
      'All GitHub Personal Access Tokens, Telegram Bot Tokens, AWS S3 keys, and Google Service Account credentials are encrypted with AES-256 before being written to disk.',
    badge: 'AES-256 Encrypted',
    icon: Lock,
    tapeVariant: 'green' as const,
  },
  {
    id: 2,
    title: '100% Zero-Telemetry Guarantee',
    subtitle: 'No analytics, no tracking beacons',
    description:
      'GitKura has no analytics SDKs, no Sentry crash beacons, and no tracking servers. Your repository metadata and code files never pass through any middleman.',
    badge: 'Zero Tracking',
    icon: EyeOff,
    tapeVariant: 'yellow' as const,
  },
  {
    id: 3,
    title: 'Strict Sandbox Isolation',
    subtitle: 'Isolated memory & context bridge',
    description:
      'The UI runs in a secure isolated context. Authentication keys and file systems are protected behind a sandboxed bridge that prevents unauthorized access.',
    badge: 'Sandboxed',
    icon: ShieldCheck,
    tapeVariant: 'blue' as const,
  },
  {
    id: 4,
    title: 'Automatic In-Memory Scrubbing',
    subtitle: 'Tokens wiped from logs & URLs',
    description:
      'Whenever Git sync operations complete, authorization headers and secret tokens are sanitized from memory and console logs immediately to prevent accidental exposure.',
    badge: 'Auto-Sanitized',
    icon: KeyRound,
    tapeVariant: 'purple' as const,
  },
]

export default function SecurityVault() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, clientWidth } = scrollRef.current
    const newIndex = Math.round(scrollLeft / (clientWidth * 0.85))
    setActiveIndex(Math.min(3, Math.max(0, newIndex)))
  }

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return
    const cardWidth = scrollRef.current.clientWidth * 0.85
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    })
    setActiveIndex(index)
  }

  return (
    <section id="security" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto select-none">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-purple-50/90 border-2 border-pencil-black shadow-scribely-sm rounded-full -rotate-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6] animate-pulse" />
          <span className="font-caveat font-bold text-lg text-purple-950">
            air-gapped zero-trust vault
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-marker uppercase leading-[1.25] text-[#17365D] tracking-tight">
          ENGINEERED FOR{' '}
          <span className="relative inline-block text-[#E9A51A] sm:whitespace-nowrap">
            MAXIMUM CODE PRIVACY.
            <svg
              className="absolute left-0 -bottom-2 w-full h-3 select-none pointer-events-none"
              viewBox="0 0 240 8"
              fill="none"
              preserveAspectRatio="none"
            >
              <path d="M 2 5 Q 120 2 238 5" stroke="#E9A51A" strokeWidth="3.6" strokeLinecap="round" />
            </svg>
          </span>
        </h2>
        <p className="font-gloria text-xl text-[#64748b] font-medium">
          Built from the ground up to protect your most sensitive proprietary code and confidential business logic.
        </p>
      </div>

      {/* Desktop Grid Layout (Clean 2x2 grid, perfectly centered with max-w-5xl mx-auto) */}
      <div className="hidden md:grid md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full">
        {securityPillars.map((p) => {
          const Icon = p.icon
          return (
            <div
              key={`desktop-${p.id}`}
              className="scribely-card p-6 sm:p-8 bg-white shadow-scribely-lg relative flex flex-col justify-between"
            >
              <WashiTape variant={p.tapeVariant} className="-top-3 right-8" />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-[#faf8f5] border-2 border-pencil-black shadow-scribely-sm flex items-center justify-center text-ink-blue">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-gaegu font-bold bg-[#faf8f5] text-ink-blue px-2.5 py-1 rounded-lg border border-pencil-black">
                    {p.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-black font-display text-ink-blue">
                    {p.title}
                  </h3>
                  <p className="font-architects text-xs font-bold text-[#64748b] mt-0.5">
                    {p.subtitle}
                  </p>
                </div>

                <p className="font-patrick text-sm text-[#475569] leading-relaxed font-medium">
                  {p.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t-2 border-dashed border-pencil-black/15 flex items-center gap-2 text-xs font-mono font-bold text-[#15803d]">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-gaegu text-base font-bold text-[#15803d]">Verified Zero-Trust Architecture</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Mobile Swipeable Carousel Layout */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pt-4 pb-4 px-2 no-scrollbar overscroll-x-contain touch-pan-y touch-pan-x w-full"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {securityPillars.map((p) => {
          const Icon = p.icon
          return (
            <div
              key={`mobile-${p.id}`}
              className="w-[84vw] max-w-[340px] flex-shrink-0 snap-center scribely-card p-6 sm:p-8 bg-white shadow-scribely-lg relative flex flex-col justify-between"
            >
              <WashiTape variant={p.tapeVariant} className="-top-3 right-8" />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-[#faf8f5] border-2 border-pencil-black shadow-scribely-sm flex items-center justify-center text-ink-blue">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-gaegu font-bold bg-[#faf8f5] text-ink-blue px-2.5 py-1 rounded-lg border border-pencil-black">
                    {p.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-black font-display text-ink-blue">
                    {p.title}
                  </h3>
                  <p className="font-architects text-xs font-bold text-[#64748b] mt-0.5">
                    {p.subtitle}
                  </p>
                </div>

                <p className="font-patrick text-sm text-[#475569] leading-relaxed font-medium">
                  {p.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t-2 border-dashed border-pencil-black/15 flex items-center gap-2 text-xs font-mono font-bold text-[#15803d]">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-gaegu text-base font-bold text-[#15803d]">Verified Zero-Trust Architecture</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Mobile Swipe Indicator Dots */}
      <div className="md:hidden flex flex-col items-center gap-2 pt-2 select-none">
        <div className="flex items-center gap-2">
          {securityPillars.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToIndex(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                activeIndex === idx
                  ? 'w-7 h-2.5 bg-[#17365D] border border-pencil-black'
                  : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to security card ${idx + 1}`}
            />
          ))}
        </div>
        <span className="font-caveat font-bold text-sm text-purple-950">
          ← swipe security features horizontally →
        </span>
      </div>
    </section>
  )
}
