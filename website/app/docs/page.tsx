'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WashiTape from '@/components/WashiTape'
import Chapter01Lore from '@/components/docs/Chapter01Lore'
import Chapter02Installation from '@/components/docs/Chapter02Installation'
import Chapter03Security from '@/components/docs/Chapter03Security'
import Chapter04Discovery from '@/components/docs/Chapter04Discovery'
import Chapter05GitEngine from '@/components/docs/Chapter05GitEngine'
import Chapter06Snapshots from '@/components/docs/Chapter06Snapshots'
import Chapter07CloudProtocols from '@/components/docs/Chapter07CloudProtocols'
import Chapter08Daemon from '@/components/docs/Chapter08Daemon'
import Chapter09Concurrency from '@/components/docs/Chapter09Concurrency'
import Chapter10Security from '@/components/docs/Chapter10Security'
import Chapter11DisasterRecovery from '@/components/docs/Chapter11DisasterRecovery'
import Chapter12Troubleshooting from '@/components/docs/Chapter12Troubleshooting'
import ChapterRoughNotebook from '@/components/docs/ChapterRoughNotebook'
import InkanStamp from '@/components/InkanStamp'
import CommandPalette from '@/components/CommandPalette'
import HighlighterBadge from '@/components/HighlighterBadge'
import {
  BookOpen,
  Terminal,
  Shield,
  ShieldCheck,
  Layers,
  Search,
  Zap,
  GitBranch,
  Clock,
  HardDrive,
  Cloud,
  Cpu,
  Lock,
  AlertTriangle,
  Sliders,
  FolderGit2,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  PenTool,
  X,
} from 'lucide-react'

export type ChapterId =
  | 'rough-notebook'
  | 'lore'
  | 'quickstart'
  | 'auth'
  | 'discovery'
  | 'git-engine'
  | 'snapshots'
  | 'cloud'
  | 'daemon'
  | 'concurrency'
  | 'security'
  | 'disaster-recovery'
  | 'troubleshooting'

interface ChapterMeta {
  id: ChapterId
  num: string
  kanji: string
  title: string
  subtitle: string
  readTime: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Enterprise'
  icon: any
  category: 'Foundation & Lore' | 'Core Mirror Engine' | 'Cloud & Automation' | 'Security & Recovery'
  tape: 'yellow' | 'blue' | 'rose' | 'green' | 'purple'
  color: string
  badgeBg: string
  badgeText: string
  sections: string[]
}

const chapters: ChapterMeta[] = [
  {
    id: 'rough-notebook',
    num: '草',
    kanji: '草',
    title: 'Engineering Rough Notebook (Handwritten Drafts)',
    subtitle: '4 authentic hand-sketched engineering sheets, DAG math & triage flowcharts',
    readTime: '6 min read',
    difficulty: 'Intermediate',
    icon: PenTool,
    category: 'Foundation & Lore',
    tape: 'yellow',
    color: '#ea580c',
    badgeBg: 'bg-[#ffedd5]',
    badgeText: 'text-[#9a3412]',
    sections: ['Draft 01: Zero-Trust Security Kernel', 'Draft 02: Git Commit DAG & Delta Math', 'Draft 03: Multi-Cloud Dispatch Mesh', 'Draft 04: Atomic Inode Recovery'],
  },
  {
    id: 'lore',
    num: '01',
    kanji: '蔵',
    title: 'Lore, Philosophy & The Digital Kura',
    subtitle: 'Why sovereign developers need air-gapped local repositories',
    readTime: '4 min read',
    difficulty: 'Beginner',
    icon: BookOpen,
    category: 'Foundation & Lore',
    tape: 'yellow',
    color: '#ea580c',
    badgeBg: 'bg-[#ffedd5]',
    badgeText: 'text-[#9a3412]',
    sections: ['The Japanese Kura Heritage', 'The Risk of Single-Vendor SaaS', 'Threat Vectors in Remote Repositories', 'The 3-2-1 Backup Rule'],
  },
  {
    id: 'quickstart',
    num: '02',
    kanji: '始',
    title: 'Quickstart & Binary Installation',
    subtitle: 'Windows, macOS & Linux standalone binaries and first setup',
    readTime: '3 min read',
    difficulty: 'Beginner',
    icon: Terminal,
    category: 'Foundation & Lore',
    tape: 'blue',
    color: '#0284c7',
    badgeBg: 'bg-[#dbeafe]',
    badgeText: 'text-[#0284c7]',
    sections: ['Cross-Platform Downloads', 'First-Run Setup & Vault Initializer', 'Build from Source (Node 20+ / Electron 41)'],
  },
  {
    id: 'auth',
    num: '03',
    kanji: '鍵',
    title: 'GitHub Token Scopes & Security',
    subtitle: 'Least privilege access, fine-grained PATs & key safety',
    readTime: '5 min read',
    difficulty: 'Intermediate',
    icon: Lock,
    category: 'Foundation & Lore',
    tape: 'rose',
    color: '#e11d48',
    badgeBg: 'bg-[#ffe4e6]',
    badgeText: 'text-[#e11d48]',
    sections: ['Principle of Least Privilege', 'Required Token Scopes Matrix', 'Fine-Grained vs Classic PATs', 'Token Storage Encryption (AES-256)'],
  },
  {
    id: 'discovery',
    num: '04',
    kanji: '探',
    title: 'Repository Discovery & Scoping Engine',
    subtitle: 'Granular repository filtering across personal and enterprise accounts',
    readTime: '4 min read',
    difficulty: 'Intermediate',
    icon: FolderGit2,
    category: 'Core Mirror Engine',
    tape: 'green',
    color: '#15803d',
    badgeBg: 'bg-[#dcfce7]',
    badgeText: 'text-[#15803d]',
    sections: ['Multi-Account Enumeration', '5 Filter Taxonomies', 'Pagination & Large Org Scans', 'Discovery State Persistence'],
  },
  {
    id: 'git-engine',
    num: '05',
    kanji: '鏡',
    title: 'Differential Git Synchronization',
    subtitle: 'High-performance atomic delta sync vs redundant full clones',
    readTime: '7 min read',
    difficulty: 'Advanced',
    icon: GitBranch,
    category: 'Core Mirror Engine',
    tape: 'yellow',
    color: '#ea580c',
    badgeBg: 'bg-[#ffedd5]',
    badgeText: 'text-[#9a3412]',
    sections: ['Delta Fetch vs Full Clone Math', 'simple-git Under the Hood', 'Atomic Branch & Tag Mirroring', 'Bandwidth Savings Calculator'],
  },
  {
    id: 'snapshots',
    num: '06',
    kanji: '圧',
    title: 'Snapshot Packaging & Compression',
    subtitle: 'Automated point-in-time tarball snapshots with SHA-256 integrity',
    readTime: '5 min read',
    difficulty: 'Intermediate',
    icon: HardDrive,
    category: 'Core Mirror Engine',
    tape: 'purple',
    color: '#7c3aed',
    badgeBg: 'bg-[#f3e8ff]',
    badgeText: 'text-[#7c3aed]',
    sections: ['Live Working Tree vs Snapshot Tarball', 'Atomic Writing (.tmp swap)', 'SHA-256 Cryptographic Checksums', 'Retention & Pruning Strategy'],
  },
  {
    id: 'cloud',
    num: '07',
    kanji: '雲',
    title: 'Multi-Cloud Replication Protocols',
    subtitle: 'Dispatching snapshots to Telegram, Drive, S3, R2 & MinIO NAS',
    readTime: '8 min read',
    difficulty: 'Advanced',
    icon: Cloud,
    category: 'Cloud & Automation',
    tape: 'rose',
    color: '#e11d48',
    badgeBg: 'bg-[#ffe4e6]',
    badgeText: 'text-[#e11d48]',
    sections: ['Cloud Replication Architecture', 'Telegram Bot API (50MB Chunking)', 'Google Drive V3 Resumable RSA JWT', 'AWS S3 & Cloudflare R2 Least Privilege', 'Self-Hosted MinIO & Wasabi NAS'],
  },
  {
    id: 'daemon',
    num: '08',
    kanji: '時',
    title: 'Background Daemon & System Tray',
    subtitle: 'Unattended background execution with node-cron & 35MB memory footprint',
    readTime: '5 min read',
    difficulty: 'Intermediate',
    icon: Cpu,
    category: 'Cloud & Automation',
    tape: 'yellow',
    color: '#ea580c',
    badgeBg: 'bg-[#ffedd5]',
    badgeText: 'text-[#9a3412]',
    sections: ['node-cron Precision Engine', 'Low Memory Architecture (~35MB RAM)', 'Sleep & Wake Catch-Up Scheduling', 'Tray Controls & Notification Gateway'],
  },
  {
    id: 'concurrency',
    num: '09',
    kanji: '並',
    title: 'Concurrency Tuning & Rate Limits',
    subtitle: 'Thread pool limiter, network optimization & backoff jitter',
    readTime: '5 min read',
    difficulty: 'Advanced',
    icon: Sliders,
    category: 'Cloud & Automation',
    tape: 'blue',
    color: '#0284c7',
    badgeBg: 'bg-[#dbeafe]',
    badgeText: 'text-[#0284c7]',
    sections: ['p-limit Concurrency Architecture', 'GitHub 5000 req/hr Defense', 'Exponential Backoff with Jitter', 'Throughput Benchmark Curve'],
  },
  {
    id: 'security',
    num: '10',
    kanji: '盾',
    title: 'Security, Cryptography & Sandboxing',
    subtitle: 'AES-256 at rest, Electron IPC gates & zero-telemetry blueprint',
    readTime: '7 min read',
    difficulty: 'Enterprise',
    icon: Shield,
    category: 'Security & Recovery',
    tape: 'green',
    color: '#15803d',
    badgeBg: 'bg-[#dcfce7]',
    badgeText: 'text-[#15803d]',
    sections: ['Zero-Trust & Sandboxing Model', 'AES-256-CBC with PBKDF2', 'Preload ContextIsolation Bridge', 'Memory & Log Header Scrubbing', 'Zero-Telemetry Audit'],
  },
  {
    id: 'disaster-recovery',
    num: '11',
    kanji: '救',
    title: 'Disaster Recovery Runbook',
    subtitle: '3 emergency restoration pathways, integrity audits & failover',
    readTime: '8 min read',
    difficulty: 'Enterprise',
    icon: AlertTriangle,
    category: 'Security & Recovery',
    tape: 'rose',
    color: '#e11d48',
    badgeBg: 'bg-[#ffe4e6]',
    badgeText: 'text-[#e11d48]',
    sections: ['Emergency Runbook Infographic', 'Pathway A: Instant Local Tree', 'Pathway B: Snapshot Extract', 'Pathway C: Emergency Relocation', 'Integrity Health Check CLI'],
  },
  {
    id: 'troubleshooting',
    num: '12',
    kanji: '診',
    title: 'Troubleshooting Matrix & Technical FAQs',
    subtitle: 'Diagnostic error table, root causes & 10 developer FAQs',
    readTime: '6 min read',
    difficulty: 'Beginner',
    icon: HelpCircle,
    category: 'Security & Recovery',
    tape: 'purple',
    color: '#7c3aed',
    badgeBg: 'bg-[#f3e8ff]',
    badgeText: 'text-[#7c3aed]',
    sections: ['Interactive Error Code Lookup', 'Complete Diagnostic Resolution Matrix', 'Frequently Asked Questions (FAQs)'],
  },
]

export default function DocsPage() {
  const [activeChapter, setActiveChapter] = useState<ChapterId>('lore')
  const [searchQuery, setSearchQuery] = useState('')
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  // Lightbox modal for high-res diagrams
  const [lightboxImg, setLightboxImg] = useState<{ src: string; caption: string } | null>(null)

  // Reading Progress Calculation
  const [scrollProgress, setScrollProgress] = useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Keyboard shortcut listener for Ctrl+K / Cmd+K and Escape
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsCommandPaletteOpen((prev) => !prev)
      } else if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false)
        setLightboxImg(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const filteredChapters = useMemo(() => {
    if (!searchQuery.trim()) return chapters
    const q = searchQuery.toLowerCase()
    return chapters.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.num.includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.sections.some((s) => s.toLowerCase().includes(q))
    )
  }, [searchQuery])

  const currentIndex = chapters.findIndex((c) => c.id === activeChapter)
  const activeMeta = chapters[currentIndex] || chapters[0]
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null

  const categories = ['Foundation & Lore', 'Core Mirror Engine', 'Cloud & Automation', 'Security & Recovery'] as const

  const selectChapter = (id: ChapterId) => {
    setActiveChapter(id)
    setIsCommandPaletteOpen(false)
    setMobileDrawerOpen(false)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] text-pencil-black selection:bg-highlighter-yellow selection:text-ink-blue">
      {/* Top Colored Pencil Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1.5 bg-pencil-black/10">
        <div
          className="h-full bg-gradient-to-r from-[#ea580c] via-[#0284c7] to-[#15803d] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Navbar />

      <main className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-14">
        {/* TOP HERO HEADER — PAPER PASSPORT & FIELD NOTEBOOK SPREAD */}
        <div className="space-y-4 mb-8 sm:mb-10">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold text-[#64748b]">
            <Link href="/" className="hover:text-ink-blue underline">
              GitKura Home
            </Link>
            <span>/</span>
            <span className="text-ink-blue">Technical Documentation</span>
            <span>/</span>
            <span className="font-bold text-ink-blue truncate">Field Manual v1.1.0 Dossier</span>
          </div>

          <div className="scribely-card p-4 sm:p-7 lg:p-9 bg-[#fdfbf7] shadow-scribely-xl relative space-y-5 sm:space-y-6 border-2 sm:border-3 border-pencil-black rounded-2xl sm:rounded-3xl">
            {/* Washi Tapes at Corners (Realistic Physical Placement) */}
            <WashiTape variant="yellow" rotate="-rotate-2" className="-top-4 left-6 sm:left-12" />
            <WashiTape variant="rose" rotate="rotate-2" className="-top-4 right-6 sm:right-14" />

            {/* Background Japanese Watermark */}
            <div className="absolute right-4 -bottom-8 sm:-bottom-10 select-none pointer-events-none text-[120px] sm:text-[200px] lg:text-[220px] font-serif font-black text-[#1a3a5f]/[0.03] leading-none z-0 overflow-hidden">
              蔵
            </div>

            {/* Top Passport Dossier Bar */}
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-dashed border-pencil-black/20 pb-3 sm:pb-4">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <InkanStamp kanji="極秘" subtext="AIR-GAPPED SOVEREIGN" variant="red" />
                <HighlighterBadge color="sky" variant="ribbon" size="sm">
                  DOSSIER REF: GK-2026-v1.1.0
                </HighlighterBadge>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="font-caveat font-black text-base text-[#64748b]">Quick Jump:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: '01 Lore', id: 'lore', color: 'yellow' as const },
                    { label: '05 Delta', id: 'git-engine', color: 'peach' as const },
                    { label: '07 Cloud', id: 'cloud', color: 'rose' as const },
                    { label: '10 Crypto', id: 'security', color: 'emerald' as const },
                    { label: '11 Rescue', id: 'disaster-recovery', color: 'purple' as const },
                  ].map((tag) => (
                    <button
                      key={tag.label}
                      type="button"
                      onClick={() => selectChapter(tag.id as any)}
                      className="cursor-pointer"
                    >
                      <HighlighterBadge color={tag.color} variant="ribbon" size="sm">
                        {tag.label}
                      </HighlighterBadge>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Title & Search Section */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center">
              <div className="lg:col-span-7 space-y-2">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display text-ink-blue tracking-tight leading-tight">
                  GitKura (Git蔵) Field Manual
                </h1>
                <p className="font-patrick text-lg sm:text-xl lg:text-2xl text-[#475569] leading-snug">
                  Air-gapped repository vaults, differential git synchronization, and zero-telemetry multi-cloud replication.
                </p>
              </div>

              {/* Integrated Search Box */}
              <div className="lg:col-span-5 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-[#64748b]">
                  <span>Universal Index Search</span>
                  <button
                    type="button"
                    onClick={() => setIsCommandPaletteOpen(true)}
                    className="text-[10px] bg-white text-ink-blue px-2 py-0.5 rounded border border-pencil-black/30 hover:border-pencil-black cursor-pointer shadow-scribely-xs"
                  >
                    Press Ctrl + K
                  </button>
                </div>

                <div
                  onClick={() => setIsCommandPaletteOpen(true)}
                  className="relative group cursor-pointer"
                >
                  <Search className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2 group-hover:text-ink-blue transition-colors" />
                  <input
                    type="text"
                    readOnly
                    value={searchQuery}
                    placeholder="Search 13 chapters, CLI, errors..."
                    className="w-full pl-10 pr-16 py-2.5 sm:py-3 bg-white border-2 border-pencil-black rounded-xl sm:rounded-2xl text-xs font-mono focus:outline-none shadow-scribely-sm cursor-pointer group-hover:bg-yellow-50/50 transition-all text-[#334155]"
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold bg-ink-blue text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg">
                    ⌘K
                  </span>
                </div>
              </div>
            </div>

            {/* Seamless Specification Tape (Quality Certificate Ribbon) */}
            <div className="relative z-10 p-3 sm:p-4 bg-white/95 rounded-xl sm:rounded-2xl border-2 border-pencil-black shadow-scribely-sm">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 text-xs font-mono">
                {/* 1. Chapters */}
                <div className="p-2 bg-[#f8fafc] sm:bg-transparent rounded-lg sm:rounded-none sm:border-r border-pencil-black/10 space-y-0.5">
                  <div className="flex items-center gap-1.5 text-[#64748b] text-[10px] uppercase font-bold">
                    <BookOpen className="w-3.5 h-3.5 text-ink-blue" />
                    <span>Chapters</span>
                  </div>
                  <span className="font-display font-black text-xs sm:text-sm text-ink-blue block">12 In-Depth</span>
                  <span className="text-[10px] text-[#64748b] font-caveat font-bold text-xs sm:text-sm block leading-none truncate">Complete Doctrine</span>
                </div>

                {/* 2. Replication */}
                <div className="p-2 bg-[#fff1f2] sm:bg-transparent rounded-lg sm:rounded-none sm:border-r border-pencil-black/10 space-y-0.5">
                  <div className="flex items-center gap-1.5 text-[#9f1239] text-[10px] uppercase font-bold">
                    <Cloud className="w-3.5 h-3.5 text-[#e11d48]" />
                    <span>Replication</span>
                  </div>
                  <span className="font-display font-black text-xs sm:text-sm text-[#e11d48] block">6 Targets</span>
                  <span className="text-[10px] text-[#9f1239] font-caveat font-bold text-xs sm:text-sm block leading-none truncate">Telegram, S3, R2, Drive</span>
                </div>

                {/* 3. Delta Sync */}
                <div className="p-2 bg-[#fefce8] sm:bg-transparent rounded-lg sm:rounded-none sm:border-r border-pencil-black/10 space-y-0.5">
                  <div className="flex items-center gap-1.5 text-[#854d0e] text-[10px] uppercase font-bold">
                    <Zap className="w-3.5 h-3.5 text-[#ca8a04]" />
                    <span>Delta Engine</span>
                  </div>
                  <span className="font-display font-black text-xs sm:text-sm text-[#854d0e] block">92% Saved</span>
                  <span className="text-[10px] text-[#854d0e] font-caveat font-bold text-xs sm:text-sm block leading-none truncate">Differential Inodes</span>
                </div>

                {/* 4. Cryptography */}
                <div className="p-2 bg-[#f0fdf4] sm:bg-transparent rounded-lg sm:rounded-none sm:border-r border-pencil-black/10 space-y-0.5">
                  <div className="flex items-center gap-1.5 text-[#166534] text-[10px] uppercase font-bold">
                    <Lock className="w-3.5 h-3.5 text-[#15803d]" />
                    <span>Crypto</span>
                  </div>
                  <span className="font-display font-black text-xs sm:text-sm text-[#15803d] block">AES-256-CBC</span>
                  <span className="text-[10px] text-[#166534] font-caveat font-bold text-xs sm:text-sm block leading-none truncate">PBKDF2 10k Salt</span>
                </div>

                {/* 5. Memory */}
                <div className="p-2 bg-[#f5f3ff] sm:bg-transparent rounded-lg sm:rounded-none sm:border-r border-pencil-black/10 space-y-0.5">
                  <div className="flex items-center gap-1.5 text-[#5b21b6] text-[10px] uppercase font-bold">
                    <Cpu className="w-3.5 h-3.5 text-[#7c3aed]" />
                    <span>Daemon</span>
                  </div>
                  <span className="font-display font-black text-xs sm:text-sm text-[#7c3aed] block">~32 MB RAM</span>
                  <span className="text-[10px] text-[#5b21b6] font-caveat font-bold text-xs sm:text-sm block leading-none truncate">System Tray Loop</span>
                </div>

                {/* 6. Telemetry */}
                <div className="p-2 bg-[#ecfdf5] sm:bg-transparent rounded-lg sm:rounded-none space-y-0.5">
                  <div className="flex items-center gap-1.5 text-[#065f46] text-[10px] uppercase font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
                    <span>Telemetry</span>
                  </div>
                  <span className="font-display font-black text-xs sm:text-sm text-[#059669] block">0 Beacons</span>
                  <span className="text-[10px] text-[#065f46] font-caveat font-bold text-xs sm:text-sm block leading-none truncate">100% Air-Gapped</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Quick Switcher Bar (< lg screens) */}
        <div className="lg:hidden mb-6 p-3 bg-white border-2 border-pencil-black rounded-2xl shadow-scribely-sm flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-7 h-7 rounded-lg bg-highlighter-yellow border border-pencil-black flex items-center justify-center font-display font-black text-xs text-ink-blue shrink-0">
              {activeMeta.num}
            </span>
            <div className="min-w-0">
              <span className="font-display font-black text-xs text-ink-blue block truncate">
                {activeMeta.title}
              </span>
              <span className="font-caveat font-bold text-xs text-[#64748b] block leading-none">
                {activeMeta.category}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileDrawerOpen((prev) => !prev)}
            className="px-3 py-1.5 rounded-xl bg-[#f1f5f9] hover:bg-yellow-50 text-ink-blue border border-pencil-black font-mono text-xs font-bold shadow-scribely-xs shrink-0 cursor-pointer flex items-center gap-1"
          >
            <span>{mobileDrawerOpen ? 'Close Menu' : 'All Chapters ▾'}</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 2-COLUMN WORKSPACE: LEFT STICKY SIDEBAR + RIGHT CENTER CONTENT CANVAS     */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* ======================================================================= */}
          {/* LEFT SIDEBAR: 12-CHAPTER ORGANIZED DRAWER                               */}
          {/* ======================================================================= */}
          <aside className={`lg:col-span-4 lg:sticky lg:top-24 space-y-4 ${mobileDrawerOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="scribely-card p-4 sm:p-5 bg-white shadow-scribely relative space-y-4 border-2 border-pencil-black rounded-2xl sm:rounded-3xl">
              <WashiTape variant="yellow" className="-top-3 left-6 scale-90" />

              <div className="flex items-center justify-between pb-3 border-b-2 border-pencil-black/10">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-ink-blue" />
                  <span className="font-display font-black text-sm text-ink-blue">Field Manual Chapters</span>
                </div>
                <span className="text-[11px] font-mono font-bold bg-[#f1f5f9] text-ink-blue px-2 py-0.5 rounded border border-pencil-black/20">
                  {filteredChapters.length} / 13
                </span>
              </div>

              {/* Categorized Chapter Navigation */}
              <div className="space-y-4 max-h-[60vh] lg:max-h-[75vh] overflow-y-auto pr-1 no-scrollbar">
                {categories.map((cat) => {
                  const catChapters = filteredChapters.filter((c) => c.category === cat)
                  if (catChapters.length === 0) return null
                  return (
                    <div key={cat} className="space-y-1.5">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748b] px-2 block">
                        {cat}
                      </span>
                      <div className="space-y-1">
                        {catChapters.map((ch) => {
                          const Icon = ch.icon
                          const isActive = activeChapter === ch.id
                          return (
                            <button
                              key={ch.id}
                              type="button"
                              onClick={() => selectChapter(ch.id)}
                              className={`w-full text-left p-2.5 sm:p-3 rounded-xl border-2 transition-colors cursor-pointer flex items-center gap-3 ${
                                isActive
                                  ? 'bg-highlighter-yellow/30 border-pencil-black shadow-scribely-sm'
                                  : 'bg-[#faf8f5] hover:bg-yellow-50/70 border-pencil-black/20 hover:border-pencil-black'
                              }`}
                            >
                              <div
                                className={`w-8 h-8 rounded-lg ${ch.badgeBg} border border-pencil-black flex items-center justify-center ${ch.badgeText} shrink-0 text-xs font-black font-display`}
                              >
                                {ch.num}
                              </div>
                              <div className="flex-1 min-w-0">
                                <span
                                  className={`text-xs font-display font-black truncate block ${
                                    isActive ? 'text-ink-blue' : 'text-[#334155]'
                                  }`}
                                >
                                  {ch.title}
                                </span>
                                <span className="text-[10px] font-mono text-[#64748b] truncate block">
                                  {ch.subtitle}
                                </span>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Quick Specs Technical Box */}
            <div className="scribely-card p-4 bg-[#f8fafc] border-2 border-pencil-black shadow-scribely-sm space-y-2 rounded-2xl hidden sm:block">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-ink-blue">
                <ShieldCheck className="w-4 h-4 text-[#15803d]" />
                <span>Zero-Trust Architecture Spec</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[#475569] pt-1">
                <div className="p-2 bg-white rounded-lg border border-pencil-black/15">
                  <span className="text-[#64748b] block text-[9px]">Cryptography:</span>
                  <span className="font-bold text-ink-blue">AES-256-CBC</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-pencil-black/15">
                  <span className="text-[#64748b] block text-[9px]">Key Derivation:</span>
                  <span className="font-bold text-ink-blue">PBKDF2 10k</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-pencil-black/15">
                  <span className="text-[#64748b] block text-[9px]">Process Isolation:</span>
                  <span className="font-bold text-ink-blue">ContextBridge</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-pencil-black/15">
                  <span className="text-[#64748b] block text-[9px]">Telemetry:</span>
                  <span className="font-bold text-[#15803d]">0 Beacons</span>
                </div>
              </div>
            </div>
          </aside>

          {/* ======================================================================= */}
          {/* RIGHT CANVAS: EXHAUSTIVE DEEP TECHNICAL CHAPTER CONTENT                 */}
          {/* ======================================================================= */}
          <div id="chapter-content-view" className="lg:col-span-8 space-y-6 sm:space-y-8 scroll-mt-24 min-w-0">
            {/* CHAPTER HEADER CARD */}
            <div className="scribely-card p-4 sm:p-6 lg:p-8 bg-white shadow-scribely-lg relative space-y-5 sm:space-y-6 border-2 sm:border-3 border-pencil-black rounded-2xl sm:rounded-3xl">
              <WashiTape variant={activeMeta.tape} rotate="-rotate-1" className="-top-4 left-6 sm:left-12" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-dashed border-pencil-black/20">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div
                    className={`w-11 h-11 sm:w-14 sm:h-14 rounded-2xl ${activeMeta.badgeBg} border-2 border-pencil-black flex items-center justify-center ${activeMeta.badgeText} shadow-scribely-sm shrink-0`}
                  >
                    <activeMeta.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-caveat font-extrabold text-base text-[#64748b] tracking-wide">
                        Chapter {activeMeta.num} &bull; {activeMeta.category}
                      </span>
                      <HighlighterBadge
                        color={
                          activeMeta.difficulty === 'Beginner'
                            ? 'emerald'
                            : activeMeta.difficulty === 'Intermediate'
                            ? 'sky'
                            : activeMeta.difficulty === 'Advanced'
                            ? 'amber'
                            : 'purple'
                        }
                        variant="ribbon"
                        size="md"
                      >
                        {activeMeta.difficulty}
                      </HighlighterBadge>
                    </div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-black font-display text-ink-blue tracking-tight leading-snug">
                      {activeMeta.title}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-[#64748b] shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{activeMeta.readTime}</span>
                </div>
              </div>

              {/* Subsection Jump Pills (Curved Highlighter Ribbon Style) */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="font-caveat font-black text-base uppercase text-[#64748b]">Sections:</span>
                {activeMeta.sections.map((sec, idx) => (
                  <HighlighterBadge
                    key={idx}
                    color="yellow"
                    variant="ribbon"
                    size="sm"
                    rotate={idx % 2 === 0 ? '-rotate-0.5' : 'rotate-0.5'}
                  >
                    {idx + 1}. {sec}
                  </HighlighterBadge>
                ))}
              </div>

              {/* ===================================================================== */}
              {/* MODULAR CHAPTER RENDERERS (12 DEDICATED CHAPTER FILES)                 */}
              {/* ===================================================================== */}
              <div className="overflow-x-hidden min-w-0">
                {activeChapter === 'rough-notebook' && <ChapterRoughNotebook setLightboxImg={setLightboxImg} />}
                {activeChapter === 'lore' && <Chapter01Lore setLightboxImg={setLightboxImg} />}
                {activeChapter === 'quickstart' && <Chapter02Installation />}
                {activeChapter === 'auth' && <Chapter03Security />}
                {activeChapter === 'discovery' && <Chapter04Discovery />}
                {activeChapter === 'git-engine' && <Chapter05GitEngine setLightboxImg={setLightboxImg} />}
                {activeChapter === 'snapshots' && <Chapter06Snapshots />}
                {activeChapter === 'cloud' && <Chapter07CloudProtocols setLightboxImg={setLightboxImg} />}
                {activeChapter === 'daemon' && <Chapter08Daemon />}
                {activeChapter === 'concurrency' && <Chapter09Concurrency />}
                {activeChapter === 'security' && <Chapter10Security setLightboxImg={setLightboxImg} />}
                {activeChapter === 'disaster-recovery' && <Chapter11DisasterRecovery setLightboxImg={setLightboxImg} />}
                {activeChapter === 'troubleshooting' && <Chapter12Troubleshooting />}
              </div>

              {/* PREV & NEXT CHAPTER NAVIGATION BAR (TRANSPARENT AUTHENTIC COLORED PENCIL STICKERS) */}
              <div className="pt-8 sm:pt-10 pb-2 sm:pb-4 border-t-2 border-dashed border-pencil-black/20 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
                {prevChapter ? (
                  <button
                    type="button"
                    onClick={() => selectChapter(prevChapter.id)}
                    className="w-full sm:w-auto group flex items-center gap-3 text-left cursor-pointer p-2 sm:p-0 rounded-xl hover:bg-yellow-50/50 sm:hover:bg-transparent transition-colors"
                  >
                    {/* Transparent Hand-Drawn Colored Pencil Storybook Sticker */}
                    <img
                      src="/stickers/human-book.png"
                      alt="Colored Pencil Storybook Sticker"
                      draggable={false}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-contain flex-shrink-0 select-none pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)]"
                    />

                    <div className="space-y-0.5 min-w-0">
                      <span className="font-caveat font-extrabold text-sm sm:text-base text-[#0284c7] tracking-wide block leading-none">
                        Previous Chapter
                      </span>
                      <span className="font-patrick text-lg sm:text-xl font-bold text-ink-blue block leading-snug group-hover:text-[#0284c7] transition-colors truncate sm:whitespace-normal">
                        CH {prevChapter.num}: {prevChapter.title}
                      </span>
                    </div>
                  </button>
                ) : (
                  <div />
                )}

                {nextChapter ? (
                  <button
                    type="button"
                    onClick={() => selectChapter(nextChapter.id)}
                    className="w-full sm:w-auto group flex items-center justify-end gap-3 text-right cursor-pointer ml-auto p-2 sm:p-0 rounded-xl hover:bg-yellow-50/50 sm:hover:bg-transparent transition-colors"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <span className="font-caveat font-extrabold text-sm sm:text-base text-[#d97706] tracking-wide block leading-none">
                        Next Chapter
                      </span>
                      <span className="font-patrick text-lg sm:text-xl font-bold text-ink-blue block leading-snug group-hover:text-[#d97706] transition-colors truncate sm:whitespace-normal">
                        CH {nextChapter.num}: {nextChapter.title}
                      </span>
                    </div>

                    {/* Transparent Hand-Drawn Colored Pencil Paper Plane Sticker */}
                    <img
                      src="/stickers/human-plane.png"
                      alt="Colored Pencil Paper Plane Sticker"
                      draggable={false}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-contain flex-shrink-0 select-none pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)]"
                    />
                  </button>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MODULAR COMMAND PALETTE (CTRL+K / CMD+K) */}
      <CommandPalette
        open={isCommandPaletteOpen}
        onOpenChange={setIsCommandPaletteOpen}
        onSelectChapter={selectChapter}
      />

      {/* LIGHTBOX MODAL FOR DIAGRAMS */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxImg(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-white p-4 rounded-3xl border-3 border-pencil-black shadow-scribely-xl space-y-3 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b-2 border-pencil-black/10 pb-2">
              <span className="font-display font-black text-sm text-ink-blue">
                {lightboxImg.caption}
              </span>
              <button
                type="button"
                onClick={() => setLightboxImg(null)}
                className="w-8 h-8 rounded-full bg-[#f1f5f9] hover:bg-pencil-black hover:text-white border-2 border-pencil-black font-bold flex items-center justify-center cursor-pointer transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-auto flex items-center justify-center p-2 bg-[#faf8f5] rounded-2xl border border-pencil-black/10">
              <img
                src={lightboxImg.src}
                alt={lightboxImg.caption}
                draggable={false}
                className="max-h-[75vh] w-auto object-contain rounded-xl select-none pointer-events-none"
              />
            </div>
            <p className="text-[11px] font-mono text-center text-[#64748b]">
              Press ESC or click close button to return to documentation
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
