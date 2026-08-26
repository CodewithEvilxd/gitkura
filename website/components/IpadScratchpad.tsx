'use client'

import React from 'react'
import { Edit3, Sparkles } from 'lucide-react'

interface IpadScratchpadProps {
  title: string
  subtitle?: string
  badge?: string
  children: React.ReactNode
  accentColor?: 'yellow' | 'blue' | 'rose' | 'emerald' | 'purple'
}

export default function IpadScratchpad({
  title,
  subtitle,
  badge = 'Engineering Draft',
  children,
  accentColor = 'yellow',
}: IpadScratchpadProps) {
  const accentBorders = {
    yellow: 'border-[#f59e0b]/40',
    blue: 'border-[#3b82f6]/40',
    rose: 'border-[#f43f5e]/40',
    emerald: 'border-[#10b981]/40',
    purple: 'border-[#8b5cf6]/40',
  }

  const badgeBgs = {
    yellow: 'bg-[#fef3c7] text-[#92400e] border-[#f59e0b]/50',
    blue: 'bg-[#dbeafe] text-[#1e40af] border-[#3b82f6]/50',
    rose: 'bg-[#ffe4e6] text-[#9f1239] border-[#f43f5e]/50',
    emerald: 'bg-[#dcfce7] text-[#166534] border-[#10b981]/50',
    purple: 'bg-[#f3e8ff] text-[#6b21a8] border-[#8b5cf6]/50',
  }

  return (
    <div className="my-6 relative rounded-2xl sm:rounded-3xl border-2 border-pencil-black/35 bg-[#fefdfb] shadow-scribely-sm overflow-hidden">
      {/* Top Tablet Navigation / Status Bar */}
      <div className="px-4 py-2.5 bg-[#f8fafc] border-b-2 border-pencil-black/15 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/70 border border-pencil-black/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/70 border border-pencil-black/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/70 border border-pencil-black/30" />
          </div>
          <span className="text-[11px] font-mono font-bold text-[#64748b] ml-1">
            engineering_notes.draft
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className={`px-2.5 py-0.5 rounded-full border text-[10px] font-mono font-bold uppercase tracking-wider ${badgeBgs[accentColor]}`}>
            <span className="inline-flex items-center gap-1">
              <Edit3 className="w-2.5 h-2.5" />
              <span>{badge}</span>
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#94a3b8]">Technical Draft &bull; Graph Grid</span>
        </div>
      </div>

      {/* iPad Paper Canvas with Technical Grid Pattern */}
      <div
        className="p-5 sm:p-7 relative space-y-4"
        style={{
          backgroundImage:
            'radial-gradient(#cbd5e1 1.1px, transparent 1.1px), radial-gradient(#cbd5e1 1.1px, #fefdfb 1.1px)',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px',
        }}
      >
        {/* Header Title with Handwritten Marker Vibe */}
        <div className="border-b border-dashed border-pencil-black/20 pb-3 space-y-1">
          <h3 className="text-xl sm:text-2xl font-black font-display text-ink-blue flex items-center gap-2">
            <span>{title}</span>
          </h3>
          {subtitle && (
            <p className="font-caveat text-lg sm:text-xl text-[#64748b] font-bold">
              {subtitle}
            </p>
          )}
        </div>

        {/* Content Body */}
        <div className="space-y-4 text-[#334155]">
          {children}
        </div>
      </div>
    </div>
  )
}
