import React from 'react'

export type HighlighterColor =
  | 'peach'
  | 'yellow'
  | 'sky'
  | 'emerald'
  | 'purple'
  | 'rose'
  | 'amber'

export type HighlighterVariant = 'ribbon' | 'chisel' | 'wavy'

export interface HighlighterBadgeProps {
  children: React.ReactNode
  color?: HighlighterColor
  variant?: HighlighterVariant
  className?: string
  rotate?: string
  size?: 'sm' | 'md' | 'lg'
}

const colorMap: Record<
  HighlighterColor,
  { fill: string; stroke: string; text: string }
> = {
  peach: {
    fill: '#fed7aa', // soft warm peach/apricot from user photo
    stroke: '#fdba74',
    text: 'text-[#7c2d12]',
  },
  yellow: {
    fill: '#fef08a', // vibrant sun highlighter
    stroke: '#fde047',
    text: 'text-[#713f12]',
  },
  sky: {
    fill: '#bae6fd', // pastel sky blue highlighter
    stroke: '#7dd3fc',
    text: 'text-[#0369a1]',
  },
  emerald: {
    fill: '#bbf7d0', // pastel mint green highlighter
    stroke: '#86efac',
    text: 'text-[#14532d]',
  },
  purple: {
    fill: '#e9d5ff', // pastel lavender highlighter
    stroke: '#d8b4fe',
    text: 'text-[#581c87]',
  },
  rose: {
    fill: '#fecdd3', // pastel strawberry pink highlighter
    stroke: '#fda4af',
    text: 'text-[#881337]',
  },
  amber: {
    fill: '#fde68a', // warm honey highlighter
    stroke: '#fcd34d',
    text: 'text-[#78350f]',
  },
}

export default function HighlighterBadge({
  children,
  color = 'peach',
  variant = 'ribbon',
  className = '',
  rotate = '-rotate-1',
  size = 'md',
}: HighlighterBadgeProps) {
  const theme = colorMap[color] || colorMap.peach

  const sizeClasses =
    size === 'sm'
      ? 'px-3 py-0.5 text-sm font-caveat font-extrabold'
      : size === 'lg'
      ? 'px-4.5 py-1.5 text-lg sm:text-xl font-caveat font-black'
      : 'px-3.5 py-1 text-base sm:text-lg font-caveat font-extrabold'

  return (
    <span
      className={`relative inline-flex items-center justify-center select-none ${rotate} ${className} transition-transform hover:scale-105`}
    >
      {/* SVG Curved Highlighter Banner Background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.06)]"
        viewBox="0 0 100 32"
        preserveAspectRatio="none"
      >
        {variant === 'ribbon' && (
          <path
            d="M 6 2 Q 0 16 6 30 Q 50 31.5 94 30 Q 100 16 94 2 Q 50 0.5 6 2 Z"
            fill={theme.fill}
            opacity="0.95"
          />
        )}
        {variant === 'chisel' && (
          <path
            d="M 3 4 Q 0 16 5 28 Q 50 30 95 29 Q 100 16 97 3 Q 50 1 3 4 Z"
            fill={theme.fill}
            opacity="0.95"
          />
        )}
        {variant === 'wavy' && (
          <path
            d="M 4 2 Q 0 16 4 30 Q 25 31.5 50 30 Q 75 28.5 96 30 Q 100 16 96 2 Q 75 3.5 50 2 Q 25 0.5 4 2 Z"
            fill={theme.fill}
            opacity="0.95"
          />
        )}
      </svg>

      {/* Foreground Content */}
      <span
        className={`relative z-10 ${theme.text} tracking-wide leading-none ${sizeClasses}`}
      >
        {children}
      </span>
    </span>
  )
}
