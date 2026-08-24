'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Github, ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="mt-20 border-t-2 border-pencil-black bg-[#faf8f5] py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-white border-2 border-pencil-black shadow-scribely-sm flex items-center justify-center overflow-hidden">
            <Image
              src="/logo.png"
              alt="GitKura Logo"
              width={28}
              height={28}
              className="object-cover scale-110"
            />
          </div>
          <span className="font-bold text-sm font-display text-ink-blue">
            GitKura 蔵
          </span>
          <span className="text-[#64748b] hidden sm:inline">&bull;</span>
          <span className="font-gaegu font-bold text-xs bg-emerald-100/90 text-emerald-800 px-2 py-0.5 rounded border border-emerald-300 hidden sm:inline">
            MIT Open Source License
          </span>
        </div>

        {/* Center: Author Credit */}
        <div className="flex items-center gap-2 text-[#475569]">
          <span className="font-patrick text-sm font-bold">Handcrafted with care by</span>
          <span className="font-caveat font-bold text-xl text-ink-blue bg-highlighter-yellow px-2.5 py-0.5 rounded-lg border-2 border-pencil-black shadow-scribely-sm -rotate-1">
            Nishant Gaurav
          </span>
        </div>

        {/* Right: GitHub & Back to Top */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/nishantgaurav/gitkura"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-[#475569] hover:text-ink-blue font-bold transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <span className="text-[#64748b]">&bull;</span>

          <button
            type="button"
            onClick={scrollToTop}
            className="p-1.5 bg-white hover:bg-[#faf8f5] text-ink-blue scribely-btn rounded-lg cursor-pointer"
            title="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
