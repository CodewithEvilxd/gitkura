'use client'

import React, { useState, useRef } from 'react'
import {
  KeyRound,
  CloudUpload,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  FolderGit2,
} from 'lucide-react'
import WashiTape from './WashiTape'

const steps = [
  {
    step: '01',
    title: 'Connect Your GitHub Account',
    subtitle: 'Read-only access with zero write permissions',
    description:
      'Generate a standard GitHub Personal Access Token (PAT) with read-only scopes. GitKura immediately discovers all your personal, organization, forked, and starred repositories.',
    note: 'Your token is encrypted locally with AES-256 and never leaves your computer.',
    badge: 'Quick 30-Sec Setup',
    tapeVariant: 'yellow' as const,
  },
  {
    step: '02',
    title: 'Choose Your Vault & Cloud Targets',
    subtitle: 'Local hard drives, Telegram, or AWS S3',
    description:
      'Select any folder on your laptop, external SSD, or network-attached storage (NAS). Optionally configure secondary cloud targets like your private Telegram channel or Google Drive.',
    note: 'Works completely offline without configuring any third-party cloud if desired.',
    badge: '6 Storage Options',
    tapeVariant: 'blue' as const,
  },
  {
    step: '03',
    title: 'Automatic Background Synchronization',
    subtitle: 'Silent system tray daemon on your schedule',
    description:
      'Choose a backup frequency (daily, weekly, or monthly) or trigger manual syncs with a single click. GitKura differential-mirrors commits in the background consuming under 35MB RAM.',
    note: 'Receive instant Telegram notifications or check backup logs anytime.',
    badge: 'Set & Forget',
    tapeVariant: 'green' as const,
  },
]

export default function WorkflowSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, clientWidth } = scrollRef.current
    const newIndex = Math.round(scrollLeft / (clientWidth * 0.85))
    setActiveIndex(Math.min(2, Math.max(0, newIndex)))
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
    <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto select-none">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-amber-50/90 border-2 border-pencil-black shadow-scribely-sm rounded-full -rotate-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] animate-pulse" />
          <span className="font-caveat font-bold text-lg text-amber-950">
            simple 3-step setup workflow
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-marker uppercase leading-[1.25] text-[#17365D] tracking-tight">
          PROTECTED IN{' '}
          <span className="relative inline-block text-[#E9A51A] sm:whitespace-nowrap">
            UNDER 60 SECONDS.
            <svg
              className="absolute left-0 -bottom-2 w-full h-3 select-none pointer-events-none"
              viewBox="0 0 200 8"
              fill="none"
              preserveAspectRatio="none"
            >
              <path d="M 2 5 Q 100 2 198 5" stroke="#E9A51A" strokeWidth="3.6" strokeLinecap="round" />
            </svg>
          </span>
        </h2>
        <p className="font-patrick text-xl text-[#64748b] font-medium">
          No complex infrastructure, no server configurations, and no subscription fees. Just install and run.
        </p>
      </div>

      {/* 3 Step Cards Grid on Desktop, Swipe Carousel on Mobile */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex md:grid md:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto relative overflow-x-auto md:overflow-visible snap-x snap-mandatory pt-4 pb-4 px-2 md:px-0 -mx-2 md:mx-0 no-scrollbar overscroll-x-contain touch-pan-y touch-pan-x"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {steps.map((s, idx) => (
          <div
            key={idx}
            className="w-[84vw] max-w-[340px] md:w-auto flex-shrink-0 snap-center scribely-card p-6 sm:p-8 bg-white shadow-scribely-lg relative flex flex-col justify-between"
          >
            <WashiTape variant={s.tapeVariant} className="-top-3 left-8" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-black font-display text-ink-blue">
                  {s.step}
                </span>
                <span className="text-[11px] font-gaegu font-bold bg-[#faf8f5] text-ink-blue px-2.5 py-1 rounded-lg border border-pencil-black">
                  {s.badge}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black font-display text-ink-blue">
                  {s.title}
                </h3>
                <p className="font-architects text-xs font-bold text-[#64748b] mt-0.5">
                  {s.subtitle}
                </p>
              </div>

              <p className="font-sans text-sm text-[#475569] leading-relaxed font-normal">
                {s.description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t-2 border-dashed border-pencil-black/15">
              <p className="font-caveat font-bold text-lg text-indigo-900 flex items-center gap-1.5">
                <span className="text-amber-500">✦</span> {s.note}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Swipe Indicator Dots */}
      <div className="md:hidden flex flex-col items-center gap-2 pt-2 select-none">
        <div className="flex items-center gap-2">
          {steps.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToIndex(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                activeIndex === idx
                  ? 'w-7 h-2.5 bg-[#17365D] border border-pencil-black'
                  : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to step ${idx + 1}`}
            />
          ))}
        </div>
        <span className="font-caveat font-bold text-sm text-amber-900">
          ← swipe steps horizontally →
        </span>
      </div>
    </section>
  )
}
