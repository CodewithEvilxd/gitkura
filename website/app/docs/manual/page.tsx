'use client'

import React, { useState, useMemo, useEffect } from 'react'
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
  Sparkles,
  LayoutGrid,
  CheckCircle2,
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
  title: string
  subtitle: string
  category: 'Foundation & Lore' | 'Core Mirror Engine' | 'Cloud & Automation' | 'Security & Recovery'
  estimatedRead: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Crucial'
  icon: React.ComponentType<{ className?: string }>
  badgeBg: string
  badgeText: string
  tape: 'yellow' | 'green' | 'blue' | 'rose' | 'purple' | 'orange'
  sections: { title: string; id: string }[]
}

const chapters: ChapterMeta[] = [
  {
    id: 'rough-notebook',
    num: '草',
    title: 'Engineering Rough Notebook (Handwritten Drafts)',
    subtitle: '4 authentic hand-sketched engineering sheets, DAG math & triage flowcharts',
    category: 'Foundation & Lore',
    estimatedRead: '6 min read',
    difficulty: 'Intermediate',
    icon: PenTool,
    badgeBg: 'bg-[#fef9c3]',
    badgeText: 'text-[#854d0e]',
    tape: 'yellow',
    sections: [
      { title: 'Draft 01: Process Security & Sandboxing', id: 'draft-01' },
      { title: 'Draft 02: Git Commit DAG & Delta Math', id: 'draft-02' },
      { title: 'Draft 03: Multi-Cloud Replication Topology', id: 'draft-03' },
      { title: 'Draft 04: Atomic Inode & Disaster Recovery', id: 'draft-04' },
    ],
  },
  {
    id: 'lore',
    num: '01',
    title: 'Lore, Philosophy & The Digital Kura',
    subtitle: 'Why sovereign developers need air-gapped local repositories',
    category: 'Foundation & Lore',
    estimatedRead: '5 min read',
    difficulty: 'Beginner',
    icon: Shield,
    badgeBg: 'bg-[#fef08a]',
    badgeText: 'text-[#854d0e]',
    tape: 'yellow',
    sections: [
      { title: 'The Ancient Japanese Kura (蔵)', id: 'lore-kura' },
      { title: 'Cloud SaaS Lock-in & Arbitrary Account Lockouts', id: 'lore-threat' },
      { title: 'Mathematical Redundancy Principle', id: 'lore-math' },
      { title: 'Architecture Comparison Matrix', id: 'lore-benchmark' },
    ],
  },
  {
    id: 'quickstart',
    num: '02',
    title: 'Quickstart & Binary Installation',
    subtitle: 'Windows, macOS & Linux standalone binaries and first setup',
    category: 'Foundation & Lore',
    estimatedRead: '3 min read',
    difficulty: 'Beginner',
    icon: Terminal,
    badgeBg: 'bg-[#bbf7d0]',
    badgeText: 'text-[#166534]',
    tape: 'green',
    sections: [
      { title: 'Direct OS Binary Downloads', id: 'quickstart-downloads' },
      { title: 'Three-Step Initialization Flow', id: 'quickstart-steps' },
      { title: 'Package Manager One-Liners (winget, brew, curl)', id: 'quickstart-cli' },
      { title: 'Vault Directory Structure on Disk', id: 'quickstart-layout' },
    ],
  },
  {
    id: 'auth',
    num: '03',
    title: 'GitHub Token Scopes & Security',
    subtitle: 'Least privilege access, fine-grained PATs & key safety',
    category: 'Foundation & Lore',
    estimatedRead: '4 min read',
    difficulty: 'Intermediate',
    icon: Lock,
    badgeBg: 'bg-[#fed7aa]',
    badgeText: 'text-[#9a3412]',
    tape: 'orange',
    sections: [
      { title: 'Classic PAT vs Fine-Grained Tokens', id: 'auth-tokens' },
      { title: 'Minimal Scope Permission Checklist', id: 'auth-scopes' },
      { title: 'In-Memory Token Sanitization Rule', id: 'auth-sanitization' },
      { title: 'Interactive Scope Calculator Tool', id: 'auth-calculator' },
    ],
  },
  {
    id: 'discovery',
    num: '04',
    title: 'Repository Discovery & Scoping Engine',
    subtitle: 'Granular repository filtering across personal and enterprise accounts',
    category: 'Core Mirror Engine',
    estimatedRead: '5 min read',
    difficulty: 'Intermediate',
    icon: FolderGit2,
    badgeBg: 'bg-[#bfdbfe]',
    badgeText: 'text-[#1e40af]',
    tape: 'blue',
    sections: [
      { title: 'Pagination & Auto-Throttling Stream', id: 'discovery-stream' },
      { title: 'Live Regex Match Sandbox', id: 'discovery-regex' },
      { title: 'Organization & Team Scoping Rules', id: 'discovery-orgs' },
      { title: 'Fork & Archived Repository Filters', id: 'discovery-filters' },
    ],
  },
  {
    id: 'git-engine',
    num: '05',
    title: 'Differential Git Synchronization',
    subtitle: 'High-performance atomic delta sync vs redundant full clones',
    category: 'Core Mirror Engine',
    estimatedRead: '7 min read',
    difficulty: 'Advanced',
    icon: GitBranch,
    badgeBg: 'bg-[#fde047]',
    badgeText: 'text-[#713f12]',
    tape: 'yellow',
    sections: [
      { title: 'Figure 5.1: Differential Sync vs Full Clone', id: 'git-fig-5-1' },
      { title: 'Refspec Mapping Architecture', id: 'git-refspecs' },
      { title: 'Delta Fetch Pipeline Execution', id: 'git-pipeline' },
      { title: 'Live Terminal Synchronization Audit', id: 'git-audit' },
    ],
  },
  {
    id: 'snapshots',
    num: '06',
    title: 'Snapshot Packaging & Compression',
    subtitle: 'Automated point-in-time tarball snapshots with SHA-256 integrity',
    category: 'Core Mirror Engine',
    estimatedRead: '6 min read',
    difficulty: 'Intermediate',
    icon: HardDrive,
    badgeBg: 'bg-[#e9d5ff]',
    badgeText: 'text-[#581c87]',
    tape: 'purple',
    sections: [
      { title: 'POSIX Atomic File Swapping', id: 'snapshot-atomic' },
      { title: 'SHA-256 Stream Checksum Algorithm', id: 'snapshot-checksum' },
      { title: 'Grandfather-Father-Son (GFS) Retention Calculator', id: 'snapshot-gfs' },
      { title: 'Immutable Local Archive Storage Layout', id: 'snapshot-layout' },
    ],
  },
  {
    id: 'cloud',
    num: '07',
    title: 'Multi-Cloud Replication Protocols',
    subtitle: 'Telegram, Google Drive, AWS S3, Cloudflare R2, and MinIO NAS',
    category: 'Cloud & Automation',
    estimatedRead: '8 min read',
    difficulty: 'Advanced',
    icon: Cloud,
    badgeBg: 'bg-[#fecdd3]',
    badgeText: 'text-[#881337]',
    tape: 'rose',
    sections: [
      { title: 'Figure 7.1: Multi-Cloud Replication Mesh', id: 'cloud-fig-7-1' },
      { title: 'Exponential Backoff with Full Jitter Formula', id: 'cloud-backoff' },
      { title: 'Live Multi-Cloud Credentials Generator', id: 'cloud-generator' },
      { title: 'Protocol Implementations (Telegram, GDrive, S3, R2, MinIO)', id: 'cloud-tabs' },
    ],
  },
  {
    id: 'daemon',
    num: '08',
    title: 'Background Daemon & Cron Engine',
    subtitle: 'Lightweight background loop with sleep-wake detection',
    category: 'Cloud & Automation',
    estimatedRead: '4 min read',
    difficulty: 'Intermediate',
    icon: Clock,
    badgeBg: 'bg-[#fed7aa]',
    badgeText: 'text-[#7c2d12]',
    tape: 'orange',
    sections: [
      { title: 'node-cron Scheduling Engine', id: 'daemon-cron' },
      { title: 'Interactive Cron Expression Simulator', id: 'daemon-simulator' },
      { title: 'Electron powerMonitor Sleep-Wake Loop', id: 'daemon-power' },
      { title: '32.4 MB Idle Memory Optimization', id: 'daemon-memory' },
    ],
  },
  {
    id: 'concurrency',
    num: '09',
    title: 'Concurrency, Workers & Rate Limits',
    subtitle: 'Optimal thread pooling and secondary GitHub API rate limits',
    category: 'Cloud & Automation',
    estimatedRead: '5 min read',
    difficulty: 'Advanced',
    icon: Cpu,
    badgeBg: 'bg-[#bfdbfe]',
    badgeText: 'text-[#172554]',
    tape: 'blue',
    sections: [
      { title: 'Worker Pool Throughput Benchmarks', id: 'concurrency-benchmarks' },
      { title: 'Sliding Window Token Bucket Algorithm', id: 'concurrency-bucket' },
      { title: 'Interactive Concurrency Sizer Tool', id: 'concurrency-sizer' },
      { title: 'HTTP 429 Throttle Handler Implementation', id: 'concurrency-code' },
    ],
  },
  {
    id: 'security',
    num: '10',
    title: 'Zero-Trust Cryptography & Vault Security',
    subtitle: 'AES-256-CBC, PBKDF2 salt, and Electron process isolation',
    category: 'Security & Recovery',
    estimatedRead: '7 min read',
    difficulty: 'Crucial',
    icon: ShieldCheck,
    badgeBg: 'bg-[#dcfce7]',
    badgeText: 'text-[#14532d]',
    tape: 'green',
    sections: [
      { title: 'Figure 10.1: Electron Process Boundary Architecture', id: 'sec-fig-10-1' },
      { title: 'AES-256-CBC with PBKDF2 Key Derivation', id: 'sec-crypto' },
      { title: 'Strict ContextIsolation & Preload Whitelisting', id: 'sec-preload' },
      { title: 'Zero Plaintext Invariant Proof', id: 'sec-proof' },
    ],
  },
  {
    id: 'disaster-recovery',
    num: '11',
    title: 'Disaster Recovery & Rapid Failover',
    subtitle: 'RTO < 30s recovery runbook, local tree promotion, and cold restores',
    category: 'Security & Recovery',
    estimatedRead: '6 min read',
    difficulty: 'Crucial',
    icon: AlertTriangle,
    badgeBg: 'bg-[#ffe4e6]',
    badgeText: 'text-[#9f1239]',
    tape: 'rose',
    sections: [
      { title: 'Figure 11.1: Incident Response Playbook', id: 'dr-fig-11-1' },
      { title: 'Interactive Recovery Triage Flow (4 Scenarios)', id: 'dr-triage' },
      { title: 'Sub-30-Second Local Working Tree Promotion', id: 'dr-promotion' },
      { title: 'Cold-Boot Air-Gapped Rebuild Strategy', id: 'dr-coldboot' },
    ],
  },
  {
    id: 'troubleshooting',
    num: '12',
    title: 'Diagnostics, Error Codes & FAQ',
    subtitle: 'Self-test scripts, error resolution matrix, and architecture FAQs',
    category: 'Security & Recovery',
    estimatedRead: '5 min read',
    difficulty: 'Beginner',
    icon: HelpCircle,
    badgeBg: 'bg-[#fef9c3]',
    badgeText: 'text-[#854d0e]',
    tape: 'yellow',
    sections: [
      { title: '1-Click Diagnostic Self-Test Script', id: 'diag-selftest' },
      { title: 'Searchable Error Diagnostic Matrix', id: 'diag-matrix' },
      { title: 'Frequently Asked Questions (FAQs)', id: 'diag-faq' },
      { title: 'Community Support & Bug Triage', id: 'diag-support' },
    ],
  },
]

export default function ManualPage() {
  const [activeChapter, setActiveChapter] = useState<ChapterId>('rough-notebook')
  const [searchQuery, setSearchQuery] = useState('')
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [lightboxImg, setLightboxImg] = useState<{ src: string; caption: string } | null>(null)

  // Auto-detect chapter from URL params or hash
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const hash = window.location.hash.replace('#', '')
      const requested = (params.get('chapter') || hash) as ChapterId
      if (requested && chapters.some((c) => c.id === requested)) {
        setActiveChapter(requested)
      }
    }
  }, [])

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const current = (window.scrollY / totalHeight) * 100
        setScrollProgress(Math.min(100, Math.max(0, current)))
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Filtered chapters for search
  const filteredChapters = useMemo(() => {
    if (!searchQuery.trim()) return chapters
    const q = searchQuery.toLowerCase()
    return chapters.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.num.toLowerCase().includes(q) ||
        c.sections.some((s) => s.title.toLowerCase().includes(q))
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
        {/* TOP BREADCRUMB & BACK TO HUB */}
        <div className="flex items-center justify-between gap-3 mb-6 pb-2 border-b border-pencil-black/10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#64748b] overflow-x-auto whitespace-nowrap no-scrollbar">
            <Link href="/" className="hover:text-ink-blue underline shrink-0">
              GitKura Home
            </Link>
            <span className="shrink-0">/</span>
            <Link href="/docs" className="hover:text-ink-blue underline shrink-0">
              Docs Hub
            </Link>
            <span className="shrink-0">/</span>
            <span className="font-bold text-ink-blue shrink-0">
              CH {activeMeta.num}: {activeMeta.title}
            </span>
          </div>

          <Link
            href="/docs"
            className="px-3 py-1 bg-white hover:bg-yellow-50 text-ink-blue border-2 border-pencil-black rounded-xl text-xs font-mono font-bold shadow-scribely-xs shrink-0 flex items-center gap-1.5"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-ink-blue" />
            <span>← Overview Hub</span>
          </Link>
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

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsCommandPaletteOpen(true)}
              className="p-1.5 rounded-xl bg-white border border-pencil-black text-ink-blue shadow-scribely-xs"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setMobileDrawerOpen((prev) => !prev)}
              className="px-3 py-1.5 rounded-xl bg-[#f1f5f9] hover:bg-yellow-50 text-ink-blue border border-pencil-black font-mono text-xs font-bold shadow-scribely-xs cursor-pointer flex items-center gap-1"
            >
              <span>{mobileDrawerOpen ? 'Close' : 'Chapters ▾'}</span>
            </button>
          </div>
        </div>

        {/* 2-COLUMN WORKSPACE: LEFT STICKY SIDEBAR + RIGHT CHAPTER READER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* LEFT SIDEBAR: 13-CHAPTER ORGANIZED DRAWER */}
          <aside className={`lg:col-span-4 lg:sticky lg:top-24 space-y-4 ${mobileDrawerOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="scribely-card p-4 sm:p-5 bg-white shadow-scribely relative space-y-4 border-2 border-pencil-black rounded-2xl sm:rounded-3xl">
              <WashiTape variant="yellow" className="-top-3 left-6 scale-90" />

              <div className="flex items-center justify-between pb-3 border-b-2 border-pencil-black/10">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-ink-blue" />
                  <span className="font-display font-black text-sm text-ink-blue">Field Manual Chapters</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCommandPaletteOpen(true)}
                  className="text-[10px] font-mono font-bold bg-[#f1f5f9] hover:bg-yellow-50 text-ink-blue px-2 py-0.5 rounded border border-pencil-black/20 cursor-pointer"
                >
                  Ctrl+K
                </button>
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

          {/* RIGHT CANVAS: DEEP TECHNICAL CHAPTER CONTENT */}
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
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-gaegu font-bold text-xs sm:text-sm text-[#64748b] uppercase tracking-wider">
                        Chapter {activeMeta.num} &bull; {activeMeta.category}
                      </span>
                      <HighlighterBadge color="yellow" variant="ribbon" size="sm">
                        {activeMeta.difficulty}
                      </HighlighterBadge>
                    </div>
                    <h2 className="text-xl sm:text-3xl lg:text-4xl font-black font-display text-ink-blue leading-tight mt-0.5">
                      {activeMeta.title}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-xs font-bold text-ink-blue px-3 py-1 bg-[#faf8f5] rounded-xl border border-pencil-black/30">
                    {activeMeta.estimatedRead}
                  </span>
                </div>
              </div>

              <p className="font-patrick text-base sm:text-lg lg:text-xl text-[#334155] leading-relaxed">
                {activeMeta.subtitle}
              </p>

              {/* Section Jump Ribbons */}
              <div className="pt-2 flex flex-wrap gap-2">
                {activeMeta.sections.map((sec, idx) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="cursor-pointer"
                  >
                    <HighlighterBadge
                      color={idx === 0 ? 'yellow' : idx === 1 ? 'peach' : idx === 2 ? 'rose' : 'sky'}
                      variant="ribbon"
                      size="sm"
                    >
                      §{idx + 1}: {sec.title}
                    </HighlighterBadge>
                  </a>
                ))}
              </div>
            </div>

            {/* DYNAMIC CHAPTER CONTENT SWITCHER */}
            <div className="space-y-6 sm:space-y-8">
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

            {/* PREV & NEXT CHAPTER NAVIGATION BAR */}
            <div className="pt-8 sm:pt-10 pb-2 sm:pb-4 border-t-2 border-dashed border-pencil-black/20 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
              {prevChapter ? (
                <button
                  type="button"
                  onClick={() => selectChapter(prevChapter.id)}
                  className="w-full sm:w-auto group flex items-center gap-3 text-left cursor-pointer p-2 sm:p-0 rounded-xl hover:bg-yellow-50/50 sm:hover:bg-transparent transition-colors"
                >
                  <img
                    src="/stickers/human-book.png"
                    alt="Storybook Sticker"
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

                  <img
                    src="/stickers/human-plane.png"
                    alt="Paper Plane Sticker"
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
      </main>

      {/* LIGHTBOX MODAL */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-white rounded-3xl border-3 border-pencil-black shadow-scribely-xl overflow-hidden p-4 space-y-3"
          >
            <button
              type="button"
              onClick={() => setLightboxImg(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white border-2 border-pencil-black flex items-center justify-center text-ink-blue hover:bg-yellow-100 cursor-pointer shadow-scribely-sm"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-full max-h-[80vh] overflow-auto rounded-2xl border border-pencil-black/20 flex items-center justify-center bg-[#faf8f5]">
              <img
                src={lightboxImg.src}
                alt={lightboxImg.caption}
                className="w-full h-auto max-h-[75vh] object-contain select-none"
              />
            </div>
            <p className="font-patrick text-base text-ink-blue text-center font-bold">
              {lightboxImg.caption}
            </p>
          </div>
        </div>
      )}

      {/* UNIVERSAL COMMAND PALETTE */}
      <CommandPalette
        open={isCommandPaletteOpen}
        onOpenChange={setIsCommandPaletteOpen}
        onSelectChapter={selectChapter}
      />

      <Footer />
    </div>
  )
}
