'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Download,
  Github,
  Menu,
  X,
  Shield,
  Cloud,
  Zap,
  BookOpen,
  CheckCircle2,
} from 'lucide-react'
import BrutalistButton from './BrutalistButton'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Features', href: '/#features' },
    { label: 'Cloud Sync', href: '/#cloud' },
    { label: 'How It Works', href: '/#story' },
    { label: 'Security', href: '/#security' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Docs', href: '/docs' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-[#faf8f5]/90 backdrop-blur-md border-b-2 border-pencil-black px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Kanji Badge */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-white border-2 border-pencil-black shadow-scribely-sm flex items-center justify-center overflow-hidden group-hover:-rotate-3 transition-transform">
            <Image
              src="/logo.png"
              alt="GitKura Logo"
              width={40}
              height={40}
              className="object-cover scale-110"
              priority
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black font-display tracking-tight text-ink-blue">
                GitKura
              </span>
              <span className="px-1.5 py-0.2 text-[10px] font-black font-display bg-highlighter-yellow text-ink-blue border-2 border-pencil-black rounded-md shadow-xs">
                蔵
              </span>
            </div>
            <p className="font-caveat font-bold text-sm text-indigo-900 leading-none">
              git vault &amp; safehouse
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display text-xs font-bold uppercase tracking-wider text-[#475569] hover:text-ink-blue transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action CTAs: Brutalist Button */}
        <div className="hidden sm:flex items-center gap-3">
          <BrutalistButton href="https://github.com/nishantgaurav/gitkura" />
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl border-2 border-pencil-black bg-highlighter-yellow text-pencil-black shadow-scribely-sm cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-4 bg-[#fdfbf7] border-2 border-pencil-black rounded-2xl shadow-scribely space-y-2">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-bold font-display text-ink-blue hover:bg-highlighter-yellow/40"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 border-t-2 border-dashed border-pencil-black/20">
            <a
              href="https://github.com/nishantgaurav/gitkura"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2 bg-white border-2 border-pencil-black text-pencil-black rounded-xl text-xs font-bold font-display flex items-center justify-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository (MIT)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
