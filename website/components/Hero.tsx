'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Download,
  Github,
  ShieldCheck,
  Lock,
  Zap,
  HardDrive,
  Send,
  Cloud,
  Database,
  CheckCircle2,
  FolderGit2,
  Clock,
  ArrowDown,
  Server,
  GitBranch,
  FileArchive,
  Layers,
  Sparkles,
} from 'lucide-react'
import WashiTape from './WashiTape'
import HeroBrushHeading from './HeroBrushHeading'
import InteractiveFeatureCards from './InteractiveFeatureCards'
import PixelatedImageTrail from './ui/pixelated-image-trail'

export default function Hero() {
  const [activeOS, setActiveOS] = useState<'win' | 'mac' | 'linux'>('win')

  const osConfig = {
    win: {
      name: 'Windows 10 / 11',
      file: 'GitKura-Setup-1.1.0.exe',
      format: '64-bit Installer & Portable .exe',
      size: '84 MB',
      badge: 'Windows .exe',
    },
    mac: {
      name: 'macOS (Universal)',
      file: 'GitKura-1.1.0-universal.dmg',
      format: 'Apple Silicon (M1/M2/M3) & Intel',
      size: '88 MB',
      badge: 'macOS .dmg',
    },
    linux: {
      name: 'Linux (x86_64)',
      file: 'GitKura-1.1.0.AppImage',
      format: 'AppImage & Debian .deb',
      size: '79 MB',
      badge: 'Linux AppImage',
    },
  }

  const current = osConfig[activeOS]

  return (
    <section className="w-full relative overflow-visible select-none">
      {/* Background Decorative Paper Accent Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-highlighter-yellow/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Interactive Cursor Trail of Hand-Drawn Stickers (Temporarily commented out) */}
      {/* <PixelatedImageTrail
        imageSize={125}
        slices={5}
        smoothing={0.35}
        spawnThreshold={32}
        sideZonesOnly={true}
        sideZoneRatio={0.28}
        className="z-0 pointer-events-auto"
        config={{
          imageLifespan: 1300,
          inDuration: 260,
          outDuration: 520,
          slideDuration: 1100,
        }}
      /> */}

      <div className="px-4 sm:px-8 max-w-7xl mx-auto relative overflow-visible z-10">
        {/* ========================================================================= */}
        {/* 1. DEDICATED FULL-SCREEN HERO VIEW (PURE, MAJESTIC, UNCLUTTERED)          */}
        {/* ========================================================================= */}
        <div className="min-h-[calc(100vh-90px)] flex flex-col justify-center items-center text-center py-12 sm:py-16 w-full px-4">
          <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center space-y-6">
            {/* Majestic Headline EXACTLY matching user reference sketch */}
            <HeroBrushHeading />

            {/* Human-Centered, Readable Subtitle */}
            <p className="font-patrick text-xl sm:text-2xl text-[#475569] max-w-2xl mx-auto leading-relaxed font-medium">
              GitKura automatically mirrors all your GitHub code, branches, and tags into an encrypted local safehouse — and replicates point-in-time snapshots to Telegram, Google Drive, AWS S3, and Cloudflare R2 on autopilot.
            </p>

            {/* Platform Download Action Bar */}
            <div className="pt-2 flex flex-col items-center gap-3">
              {/* OS Switcher Pills */}
              <div className="inline-flex items-center gap-1.5 p-1 bg-white border-2 border-pencil-black rounded-xl shadow-scribely-sm">
                {(['win', 'mac', 'linux'] as const).map((os) => (
                  <button
                    key={os}
                    type="button"
                    onClick={() => setActiveOS(os)}
                    className={`px-3.5 py-1 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer ${
                      activeOS === os
                        ? 'bg-highlighter-yellow text-ink-blue border border-pencil-black'
                        : 'text-[#64748b] hover:text-ink-blue'
                    }`}
                  >
                    {os === 'win' ? 'Windows' : os === 'mac' ? 'macOS' : 'Linux'}
                  </button>
                ))}
              </div>

              {/* Primary Action Button Bar */}
              <div className="relative flex flex-wrap items-center justify-center gap-3">
                <a
                  href="https://github.com/nishantgaurav/gitkura/releases"
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-3.5 bg-ink-blue hover:bg-ink-hover text-white scribely-btn rounded-2xl text-sm sm:text-base font-black font-display flex items-center gap-2.5 cursor-pointer shadow-scribely"
                >
                  <Download className="w-4 h-4 text-highlighter-yellow" />
                  <span>Download for {current.name.split(' ')[0]} ({current.badge})</span>
                </a>

                <a
                  href="https://github.com/nishantgaurav/gitkura"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3.5 bg-white hover:bg-[#faf8f5] text-pencil-black scribely-btn rounded-2xl text-xs sm:text-sm font-bold font-display flex items-center gap-2 cursor-pointer"
                >
                  <Github className="w-4 h-4 text-pencil-black" />
                  <span>GitHub (MIT)</span>
                </a>

                {/* Desktop Callout: placed to the right of the GitHub button (original desktop layout) */}
                <div className="hidden lg:flex items-center gap-2 absolute -right-36 top-2 select-none pointer-events-none">
                  <svg className="w-8 h-8 text-[#0284c7]" viewBox="0 0 36 36" fill="none" stroke="currentColor">
                    <path d="M 30 8 C 20 6, 8 14, 8 28" strokeWidth="2.2" strokeLinecap="round" />
                    <path d="M 16 24 L 8 28 L 6 18" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-caveat font-bold text-xl text-sky-800 rotate-2 whitespace-nowrap">
                    one-click setup!
                  </span>
                </div>
              </div>

              {/* Mobile Callout: placed BELOW buttons on mobile/tablet screens only */}
              <div className="lg:hidden flex items-center justify-center gap-1.5 select-none pointer-events-none -rotate-1 -mt-0.5">
                <span className="font-caveat font-bold text-base sm:text-xl text-sky-800 rotate-1 whitespace-nowrap">
                  one-click setup!
                </span>
                {/* Curved hand-drawn arrow ⤴ pointing straight up into button */}
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#0284c7] select-none flex-shrink-0" viewBox="0 0 28 28" fill="none" stroke="currentColor">
                  <path d="M 6 22 C 14 22, 16 14, 16 6" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M 10 12 L 16 6 L 22 12" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Handwritten Cute Annotation Caption */}
              <p className="font-caveat text-xl sm:text-2xl font-bold text-[#475569] pt-1">
                Free forever &bull; 100% offline-first &bull; AES-256 encrypted on disk &bull; No account required
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. THE THREE PILLARS (SCRIBELY INTERACTIVE FEATURE DESK SPREAD)          */}
        {/* ========================================================================= */}
        <InteractiveFeatureCards />
      </div>
    </section>
  )
}
