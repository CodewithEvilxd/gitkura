'use client'

import React, { useState, useRef } from 'react'
import {
  Check,
  X,
  ShieldCheck,
  Zap,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import WashiTape from './WashiTape'

const comparisonRows = [
  {
    feature: 'Differential Delta Sync (90% Bandwidth Saved)',
    manualClone: false,
    genericCloud: false,
    gitKura: true,
    tag: 'Speed & Bandwidth',
  },
  {
    feature: 'All Remote Branches & Tags Mirrored Locally',
    manualClone: 'Partial',
    genericCloud: false,
    gitKura: true,
    tag: 'Git Integrity',
  },
  {
    feature: 'Standalone Point-in-Time .tar.gz & .zip Archives',
    manualClone: false,
    genericCloud: 'Partial',
    gitKura: true,
    tag: 'Snapshots',
  },
  {
    feature: 'Telegram Channel Snapshot Push (Up to 50MB)',
    manualClone: false,
    genericCloud: false,
    gitKura: true,
    tag: 'Mobile Backup',
  },
  {
    feature: 'AES-256 Local Disk Encryption for All Secrets',
    manualClone: false,
    genericCloud: 'Unknown',
    gitKura: true,
    tag: 'Security',
  },
  {
    feature: '100% Zero Telemetry & Air-Gapped Offline Operation',
    manualClone: true,
    genericCloud: false,
    gitKura: true,
    tag: 'Privacy',
  },
  {
    feature: 'Automated Background System Tray Daemon',
    manualClone: false,
    genericCloud: true,
    gitKura: true,
    tag: 'Automation',
  },
  {
    feature: '100% Free & Open-Source (MIT License)',
    manualClone: true,
    genericCloud: false,
    gitKura: true,
    tag: 'License',
  },
]

export default function ComparisonSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeCardIndex, setActiveCardIndex] = useState(0)

  const handleMobileScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, clientWidth } = scrollRef.current
    const newIdx = Math.round(scrollLeft / (clientWidth * 0.85))
    setActiveCardIndex(Math.min(comparisonRows.length - 1, Math.max(0, newIdx)))
  }

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return
    const cardWidth = scrollRef.current.clientWidth * 0.85
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    })
    setActiveCardIndex(index)
  }

  return (
    <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto select-none">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-emerald-50/90 border-2 border-pencil-black shadow-scribely-sm rounded-full -rotate-1">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
          <span className="font-caveat font-bold text-lg text-emerald-950">
            why developers choose gitkura 蔵
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-marker uppercase leading-[1.25] text-[#17365D] tracking-tight">
          <span className="relative inline-block text-[#E9A51A] sm:whitespace-nowrap">
            HOW GITKURA COMPARES
            <svg
              className="absolute left-0 -bottom-2 w-full h-3 select-none pointer-events-none"
              viewBox="0 0 240 8"
              fill="none"
              preserveAspectRatio="none"
            >
              <path d="M 2 5 Q 120 2 238 5" stroke="#E9A51A" strokeWidth="3.6" strokeLinecap="round" />
            </svg>
          </span>{' '}
          TO ALTERNATIVES.
        </h2>
        <p className="font-kalam text-xl text-[#64748b] font-bold">
          See why engineering teams and developers choose an air-gapped vault over fragile shell scripts and expensive cloud SaaS.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* 1. DESKTOP VIEW: FULL CLEAN BRUTALIST COMPARISON TABLE                    */}
      {/* ========================================================================= */}
      <div className="hidden md:block max-w-5xl mx-auto relative">
        <WashiTape variant="yellow" className="-top-3 right-12" />

        <div className="scribely-card overflow-hidden bg-white shadow-scribely-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#faf8f5] border-b-2 border-pencil-black text-xs font-mono font-bold text-ink-blue">
                <th className="p-5 font-mono">Capability &amp; Security Feature</th>
                <th className="p-5 text-center font-mono text-[#64748b]">Manual Git Clones</th>
                <th className="p-5 text-center font-mono text-[#64748b]">Generic Cloud SaaS</th>
                <th className="p-5 text-center bg-highlighter-yellow/40 border-l-2 border-pencil-black text-ink-blue font-black font-display">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 select-none pointer-events-none mb-0.5">
                      <span className="text-xs font-caveat font-bold text-emerald-800 -rotate-2">
                        air-gapped safe choice
                      </span>
                      <svg className="w-3.5 h-3.5 text-emerald-700" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                        <path d="M 8 2 L 8 12 M 4 8 L 8 12 L 12 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span>GitKura Vault 蔵</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-dashed divide-pencil-black/15 text-xs font-mono">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#faf8f5]/60 transition-colors">
                  <td className="p-5 font-sans font-bold text-sm text-pencil-black">
                    {row.feature}
                  </td>

                  <td className="p-5 text-center font-mono">
                    {typeof row.manualClone === 'boolean' ? (
                      row.manualClone ? (
                        <Check className="w-4 h-4 text-[#15803d] mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-[#dc2626] mx-auto opacity-50" />
                      )
                    ) : (
                      <span className="text-[#64748b]">{row.manualClone}</span>
                    )}
                  </td>

                  <td className="p-5 text-center font-mono">
                    {typeof row.genericCloud === 'boolean' ? (
                      row.genericCloud ? (
                        <Check className="w-4 h-4 text-[#15803d] mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-[#dc2626] mx-auto opacity-50" />
                      )
                    ) : (
                      <span className="text-[#64748b]">{row.genericCloud}</span>
                    )}
                  </td>

                  <td className="p-5 text-center bg-highlighter-yellow/20 border-l-2 border-pencil-black font-bold text-[#15803d]">
                    <div className="flex items-center justify-center gap-1">
                      <Check className="w-4 h-4 text-[#15803d] stroke-[3]" />
                      <span className="text-[11px] font-mono uppercase font-black">Yes</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MOBILE VIEW: POLISHED INTERACTIVE COMPARISON SCORECARDS CAROUSEL       */}
      {/* ========================================================================= */}
      <div className="md:hidden max-w-md mx-auto relative">
        <WashiTape variant="yellow" className="-top-3 right-6 scale-90" />

        {/* Swipeable Feature Cards */}
        <div
          ref={scrollRef}
          onScroll={handleMobileScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pt-4 pb-4 px-2 no-scrollbar overscroll-x-contain touch-pan-y touch-pan-x"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {comparisonRows.map((row, idx) => (
            <div
              key={idx}
              className="w-[84vw] max-w-[340px] flex-shrink-0 snap-center bg-white border-2 border-pencil-black rounded-2xl p-5 shadow-[4px_4px_0px_#17365D] flex flex-col justify-between"
            >
              {/* Header with Feature Counter & Category Badge */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 bg-slate-100 border border-pencil-black/20 rounded-md text-[#17365D]">
                    {idx + 1} / {comparisonRows.length}
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-[#faf8f5] text-slate-700 px-2 py-0.5 rounded-full border border-slate-300">
                    {row.tag}
                  </span>
                </div>

                {/* Feature Title */}
                <h3 className="font-display font-bold text-base text-[#17365D] leading-snug mt-1 mb-4">
                  {row.feature}
                </h3>
              </div>

              {/* 3-Way Comparison Scoreboard */}
              <div className="space-y-2 pt-3 border-t-2 border-dashed border-pencil-black/15">
                {/* 1. GitKura (Highlighted Winner) */}
                <div className="flex items-center justify-between p-2.5 bg-[#dcfce7] border-2 border-[#15803d]/40 rounded-xl shadow-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-marker text-[#15803d]">GitKura 蔵</span>
                    <span className="text-[10px] font-caveat font-bold text-emerald-800">(air-gapped)</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#15803d] font-mono font-black text-xs bg-white px-2 py-0.5 rounded-md border border-[#15803d]/30">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>YES</span>
                  </div>
                </div>

                {/* 2. Manual Git Clone */}
                <div className="flex items-center justify-between p-2.5 bg-[#faf8f5] border border-pencil-black/20 rounded-xl">
                  <span className="text-xs font-mono font-bold text-slate-600">Manual Git Clone</span>
                  <div className="flex items-center gap-1 font-mono text-xs">
                    {typeof row.manualClone === 'boolean' ? (
                      row.manualClone ? (
                        <span className="text-[#15803d] font-bold flex items-center gap-1"><Check className="w-3.5 h-3.5" /> YES</span>
                      ) : (
                        <span className="text-[#dc2626] font-bold flex items-center gap-1"><X className="w-3.5 h-3.5" /> NO</span>
                      )
                    ) : (
                      <span className="text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 text-[11px]">{row.manualClone}</span>
                    )}
                  </div>
                </div>

                {/* 3. Generic Cloud SaaS */}
                <div className="flex items-center justify-between p-2.5 bg-[#faf8f5] border border-pencil-black/20 rounded-xl">
                  <span className="text-xs font-mono font-bold text-slate-600">Generic Cloud SaaS</span>
                  <div className="flex items-center gap-1 font-mono text-xs">
                    {typeof row.genericCloud === 'boolean' ? (
                      row.genericCloud ? (
                        <span className="text-[#15803d] font-bold flex items-center gap-1"><Check className="w-3.5 h-3.5" /> YES</span>
                      ) : (
                        <span className="text-[#dc2626] font-bold flex items-center gap-1"><X className="w-3.5 h-3.5" /> NO</span>
                      )
                    ) : (
                      <span className="text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 text-[11px]">{row.genericCloud}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Pagination Dots */}
        <div className="flex flex-col items-center gap-2 pt-3 select-none">
          <div className="flex items-center gap-1.5">
            {comparisonRows.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToIndex(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeCardIndex === idx
                    ? 'w-5 h-2 bg-[#17365D] border border-pencil-black'
                    : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to comparison feature ${idx + 1}`}
              />
            ))}
          </div>
          <span className="font-caveat font-bold text-sm text-emerald-950">
            ← swipe to compare all {comparisonRows.length} features →
          </span>
        </div>
      </div>

      {/* Cute Bottom Callout */}
      <div className="mt-8 text-center">
        <span className="font-gaegu text-lg sm:text-xl font-bold text-emerald-900 bg-emerald-100/70 px-5 py-1.5 rounded-full border border-emerald-300 shadow-sm inline-flex items-center gap-1.5">
          100% Free &amp; Open-Source (MIT License) &bull; Zero Telemetry Guarantee!
        </span>
      </div>
    </section>
  )
}
