'use client'

import { useState } from 'react'
import {
  TrendingDown,
  Gauge,
  CheckCircle2,
  Zap,
  ArrowRight,
} from 'lucide-react'

export default function GitEngineDemo() {
  const [repoSizeMB, setRepoSizeMB] = useState(350)
  const [deltaPercentage, setDeltaPercentage] = useState(4)

  const fullCloneTransfer = repoSizeMB
  const differentialTransfer = Number(((repoSizeMB * (deltaPercentage / 100)) + 1.2).toFixed(1))
  const savedBandwidth = Number((fullCloneTransfer - differentialTransfer).toFixed(1))
  const percentageSaved = Math.round((savedBandwidth / fullCloneTransfer) * 100)

  return (
    <section id="features" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-amber-50/90 border-2 border-pencil-black shadow-scribely-sm rounded-full -rotate-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] animate-pulse" />
          <span className="font-caveat font-bold text-lg text-amber-950">
            smart incremental sync engine
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-marker uppercase leading-[1.25] text-[#17365D] tracking-tight">
          SAVE UP TO{' '}
          <span className="relative inline-block text-[#E9A51A] whitespace-nowrap">
            90% BANDWIDTH
            <svg
              className="absolute left-0 -bottom-2 w-full h-3 select-none pointer-events-none"
              viewBox="0 0 160 8"
              fill="none"
              preserveAspectRatio="none"
            >
              <path d="M 2 5 Q 80 2 158 5" stroke="#E9A51A" strokeWidth="3.6" strokeLinecap="round" />
            </svg>
          </span>{' '}
          WITH DIFFERENTIAL SYNC.
        </h2>
        <p className="font-kalam text-xl text-[#64748b] font-bold">
          Instead of re-downloading entire gigabytes of code history on every run, GitKura fetches only new commits, branches, and tags.
        </p>
      </div>

      <div className="max-w-5xl mx-auto relative">
        <div className="washi-tape-blue -top-3 left-10 -rotate-2" />

        <div className="scribely-card p-6 sm:p-10 bg-white shadow-scribely-xl space-y-8">
          {/* Interactive Calculator Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-[#faf8f5] rounded-2xl border-2 border-pencil-black">
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="font-bold text-ink-blue">Total Repository Size:</span>
                <span className="bg-white px-2.5 py-1 rounded-lg border border-pencil-black font-bold text-ink-blue">
                  {repoSizeMB} MB
                </span>
              </div>
              <input
                type="range"
                min={50}
                max={1500}
                step={25}
                value={repoSizeMB}
                onChange={(e) => setRepoSizeMB(Number(e.target.value))}
                className="w-full accent-ink-blue cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#64748b] mt-1">
                <span>50 MB (Small Project)</span>
                <span>1500 MB (Large Monorepo)</span>
              </div>
            </div>

            {/* Slider 2: Changed Delta % */}
            <div className="space-y-2 relative">
              {/* Cute Interactive Pointer without box */}
              <div className="hidden sm:inline-flex items-center gap-1.5 absolute -top-7 right-0 rotate-3 select-none pointer-events-none">
                <span className="font-caveat font-bold text-lg text-emerald-800">
                  try sliding this!
                </span>
                <svg className="w-5 h-5 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M 4 4 Q 14 16 16 16" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 10 14 L 16 16 L 14 22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div className="flex justify-between text-xs font-mono text-ink-blue">
                <span className="font-bold">Daily Changed Code / Delta:</span>
                <span className="bg-white px-2.5 py-1 rounded-lg border border-pencil-black font-bold text-[#15803d]">
                  {deltaPercentage}% Delta
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={20}
                step={1}
                value={deltaPercentage}
                onChange={(e) => setDeltaPercentage(Number(e.target.value))}
                className="w-full accent-[#15803d] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#64748b] mt-1">
                <span>1% (Minor commits)</span>
                <span>20% (Heavy refactors)</span>
              </div>
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Standard Naive Clone */}
            <div className="p-6 rounded-2xl border-2 border-pencil-black bg-[#fee2e2]/50 shadow-scribely-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-[#991b1b] bg-white px-2 py-0.5 rounded border border-[#dc2626]">
                  Standard Tools
                </span>
                <span className="text-xs font-mono text-[#64748b]">Per Backup Run</span>
              </div>

              <h3 className="text-xl font-black font-display text-pencil-black">
                Re-Clones Whole Repo Every Time
              </h3>

              <div className="text-4xl font-black font-display text-[#dc2626]">
                {fullCloneTransfer} MB
              </div>

              <p className="font-architects text-sm text-[#475569] leading-snug">
                Re-downloads the complete Git pack file from scratch. Wastes data, slows down syncs, and triggers rate-limits.
              </p>
            </div>

            {/* GitKura Differential Engine */}
            <div className="p-6 rounded-2xl border-2 border-pencil-black bg-[#dcfce7] shadow-scribely-sm space-y-3 -rotate-0.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-[#15803d] bg-white px-2 py-0.5 rounded border border-[#16a34a]">
                  GitKura Differential
                </span>
                <span className="text-xs font-mono font-bold text-[#15803d]">Saved {percentageSaved}%</span>
              </div>

              <h3 className="text-xl font-black font-display text-ink-blue">
                Fetches Only Changed Commits
              </h3>

              <div className="text-4xl font-black font-display text-[#15803d]">
                {differentialTransfer} MB
              </div>

              <p className="font-kalam text-sm text-[#166534] leading-snug font-bold">
                Pulls delta updates across all tracked remote branches in seconds. Fast, lightweight, and gentle on bandwidth.
              </p>
            </div>
          </div>

          {/* Efficiency Summary Banner */}
          <div className="p-5 bg-[#faf8f5] rounded-2xl border-2 border-pencil-black shadow-scribely-sm flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-highlighter-yellow border-2 border-pencil-black flex items-center justify-center text-ink-blue">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-black font-display text-ink-blue">
                  Net Bandwidth Saved: {savedBandwidth} MB ({percentageSaved}% reduction)
                </p>
                <p className="font-gaegu text-base text-[#64748b] font-bold">
                  Lightning fast sync speeds even on large monorepos with hundreds of branches!
                </p>
              </div>
            </div>
            <div className="text-xs font-mono font-bold bg-[#dbeafe] text-ink-blue px-3 py-1.5 rounded-xl border border-pencil-black">
              10x Faster Backups
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
