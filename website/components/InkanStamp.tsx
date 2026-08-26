import React from 'react'

interface InkanStampProps {
  kanji: string
  subtext: string
  variant?: 'red' | 'navy' | 'emerald'
}

export default function InkanStamp({ kanji, subtext, variant = 'red' }: InkanStampProps) {
  const colorStyles = {
    red: {
      border: 'border-[#b91c1c]',
      text: 'text-[#b91c1c]',
      sub: 'text-[#991b1b]',
      bg: 'bg-[#fff1f2]/70',
      ring: 'ring-1 ring-[#ef4444]/40',
    },
    navy: {
      border: 'border-[#1a3a5f]',
      text: 'text-[#1a3a5f]',
      sub: 'text-[#0f2744]',
      bg: 'bg-[#f0f9ff]/70',
      ring: 'ring-1 ring-[#0284c7]/40',
    },
    emerald: {
      border: 'border-[#15803d]',
      text: 'text-[#15803d]',
      sub: 'text-[#166534]',
      bg: 'bg-[#f0fdf4]/70',
      ring: 'ring-1 ring-[#22c55e]/40',
    },
  }[variant]

  return (
    <div
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-lg border-2 ${colorStyles.border} ${colorStyles.bg} ${colorStyles.ring} select-none transform -rotate-1 shadow-[1px_2px_0px_rgba(0,0,0,0.08)]`}
    >
      <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center font-serif font-black text-xs leading-none">
        {kanji}
      </span>
      <span className={`font-mono text-[10px] font-bold uppercase tracking-widest ${colorStyles.sub}`}>
        {subtext}
      </span>
    </div>
  )
}
