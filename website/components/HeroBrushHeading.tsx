'use client'

export default function HeroBrushHeading() {
  return (
    <div className="relative flex flex-col items-center justify-center mx-auto text-center select-none w-full">
      <h1
        className="font-marker uppercase select-text text-center mx-auto w-full flex flex-col items-center justify-center tracking-tight"
        style={{
          fontSize: 'clamp(1.45rem, 4.8vw, 4.6rem)',
          lineHeight: 1.15,
          filter: 'url(#dry-brush-heavy)',
          WebkitFontSmoothing: 'antialiased',
          textRendering: 'geometricPrecision',
        }}
      >
        {/* Line 1: THE FIREPROOF VAULT with clean outward-bursting marker doodles */}
        <div
          className="relative inline-block text-[#173B68] text-center"
          style={{ textShadow: '0 0.5px 0.5px rgba(23, 59, 104, 0.18)' }}
        >
          {/* Top-left yellow 3-ray fan burst - radiating cleanly outward */}
          <svg
            className="absolute -top-2 sm:-top-4 -left-4 sm:-left-7 w-4 h-4 sm:w-7 sm:h-7 text-[#E9A51A] select-none pointer-events-none"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
          >
            <path d="M 18 14 L 10 4" />
            <path d="M 14 18 L 3 12" />
            <path d="M 15 22 L 4 23" />
          </svg>

          THE FIREPROOF VAULT

          {/* Top-right navy 3-ray fan burst - radiating cleanly outward */}
          <svg
            className="absolute -top-2 sm:-top-4 -right-4 sm:-right-7 w-4 h-4 sm:w-7 sm:h-7 text-[#173B68] select-none pointer-events-none"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
          >
            <path d="M 6 14 L 14 4" />
            <path d="M 10 18 L 21 12" />
            <path d="M 9 22 L 20 23" />
          </svg>
        </div>

        {/* Line 2: FOR YOUR GIT REPOSITORIES. with 100% exact mathematical center */}
        <div className="mt-2 sm:mt-3.5 mx-auto text-center inline-block">
          <span
            className="text-[#173B68]"
            style={{ textShadow: '0 0.5px 0.5px rgba(23, 59, 104, 0.18)' }}
          >
            FOR YOUR{' '}
          </span>
          <span
            className="relative inline-block text-[#E9A51A]"
            style={{ textShadow: '0 0.5px 0.5px rgba(233, 165, 26, 0.22)' }}
          >
            GIT REPOSITORIES.
            {/* Organic Hand-Drawn Golden Underline with clean breathing gap */}
            <svg
              className="absolute left-0 -bottom-2 sm:-bottom-3 w-full h-2.5 sm:h-3.5 select-none pointer-events-none"
              viewBox="0 0 240 8"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M 2 4.2 Q 120 2.2 238 4.8"
                stroke="#E9A51A"
                strokeWidth="3.8"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>
      </h1>
    </div>
  )
}
