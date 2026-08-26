'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  Layers,
  Cpu,
  Shield,
  HardDrive,
  Cloud,
  Terminal,
  Code2,
  Lock,
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  GitBranch,
  KeyRound,
  Compass,
  Search,
  FileCode2,
  X,
} from 'lucide-react'

export default function ArchitecturePage() {
  const [activeLayer, setActiveLayer] = useState<'main' | 'preload' | 'renderer'>('main')
  const [activeDraft, setActiveDraft] = useState<'process' | 'delta' | 'cloud' | 'recovery'>('process')
  const [lightboxImg, setLightboxImg] = useState<{ src: string; caption: string } | null>(null)

  const roughDrafts = {
    process: {
      id: 'process',
      num: '01',
      title: 'Draft 01 • Process Isolation & Sandbox Security',
      tagline: 'Hand-drawn process boundaries, V8 event loop isolation, and Preload ContextBridge firewall.',
      src: '/diagrams/rough-page-01-security.jpg',
      annotation: '↳ Main Node.js Kernel -> Preload Gateway -> React UI with strict CSP, PBKDF2 derived keys, and memory isolation',
    },
    delta: {
      id: 'delta',
      num: '02',
      title: 'Draft 02 • Commit DAG & Differential Delta Pull Math',
      tagline: 'Commit hash traversal math, crossed-out full clone waste, and O(delta) thin-pack generation.',
      src: '/diagrams/rough-page-02-deltasync.jpg',
      annotation: '↳ 18.2MB differential pull vs 2.4GB redundant clone • Commit DAG negotiation, refspec mapping & packfile delta',
    },
    cloud: {
      id: 'cloud',
      num: '03',
      title: 'Draft 03 • Multi-Cloud Vault Dispatch & Jitter Math',
      tagline: 'Parallel worker dispatch to 5 cloud targets, Telegram 50MB chunking, and backoff ladder formula.',
      src: '/diagrams/rough-page-03-multicloud.jpg',
      annotation: '↳ Central vault dispatch with exponential backoff with jitter ladder curve & Cloudflare R2 zero-egress',
    },
    recovery: {
      id: 'recovery',
      num: '04',
      title: 'Draft 04 • Atomic Snapshot Lifecycle & Disaster Recovery Triage',
      tagline: 'POSIX atomic renameSync(), SHA-256 integrity verification, and 3-path incident response triage.',
      src: '/diagrams/rough-page-04-recovery.jpg',
      annotation: '↳ 4-step atomic .tmp swap lifecycle & 3-path emergency incident decision tree (0s local RTO vs archive extraction)',
    },
  }

  const layers = {
    main: {
      name: 'Main Process (Electron & Node.js Core)',
      badge: 'Protected Core Kernel',
      tagline: 'Executes all heavy I/O, Git differential operations, AES-256 cryptography, and multi-cloud streaming.',
      components: [
        {
          title: 'SimpleGit Differential Mirror',
          description: 'Executes atomic delta pulls (git fetch --all --prune --tags) and tracks all remote branches without re-cloning.',
        },
        {
          title: 'AES-256 Encrypted Store',
          description: 'Persists GitHub Personal Access Tokens and cloud secrets locally encrypted via electron-store with PBKDF2 keys.',
        },
        {
          title: 'Snapshot Compression Engine',
          description: 'Packages mirrored trees into .tar.gz and .zip archives with atomic temp-swap file renaming integrity guards.',
        },
        {
          title: 'Multi-Cloud Replication Dispatcher',
          description: 'Handles parallel streaming uploads to Telegram Bot API, Google Drive V3 (RSA JWT), AWS S3, Cloudflare R2, and MinIO.',
        },
        {
          title: 'Background Scheduler Daemon',
          description: 'node-cron timing engine and OS System Tray controller standing guard with minimal memory footprint.',
        },
      ],
    },
    preload: {
      name: 'Preload ContextBridge (Security Gate)',
      badge: 'Zero Trust Isolation',
      tagline: 'Enforces strict contextIsolation: true and nodeIntegration: false, exposing only whitelisted IPC methods.',
      components: [
        {
          title: 'Strict Channel Whitelisting',
          description: 'Guarantees the frontend renderer can never call arbitrary Node.js APIs or shell commands.',
        },
        {
          title: 'Bidirectional IPC Gateways',
          description: 'Exposes secure invoke() for queries and on() listeners for real-time progress callbacks.',
        },
        {
          title: 'Memory Isolation Barrier',
          description: 'Ensures DOM scripts and web content cannot tamper with or inspect backend credential buffers.',
        },
      ],
    },
    renderer: {
      name: 'Renderer Process (React 19 & Vite)',
      badge: 'Sandboxed Client UI',
      tagline: 'Modern, reactive single-page interface for repository discovery, progress monitoring, and vault setup.',
      components: [
        {
          title: 'Token & Cloud Setup',
          description: 'Validates GitHub PAT tokens, browses local vault directories, and tests cloud endpoint connections.',
        },
        {
          title: 'Repository Discovery Matrix',
          description: 'Paginates and filters owned, organization, starred, and forked repositories with real-time search.',
        },
        {
          title: 'Live Telemetry Dashboard',
          description: 'Real-time progress bars, stage indicators, and streaming terminal log console with auto-scroll.',
        },
        {
          title: 'Snapshot Archives Explorer',
          description: 'Inspects point-in-time tarballs and zip archives with 1-click reveal in OS file manager.',
        },
      ],
    },
  }

  const current = layers[activeLayer]

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-highlighter-yellow selection:text-ink-blue bg-[#faf8f5]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12 w-full">
        {/* Breadcrumb Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#64748b]">
            <Link href="/" className="hover:text-ink-blue underline">GitKura Home</Link>
            <span>/</span>
            <span className="text-ink-blue">System Architecture</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border-2 border-pencil-black shadow-scribely-sm rounded-full -rotate-1">
            <span className="w-2.5 h-2.5 rounded-full bg-ink-blue" />
            <span className="text-xs font-mono font-black uppercase tracking-wider text-ink-blue">
              Technical Blueprint &bull; Electron 41 + React 19
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-display text-ink-blue tracking-tight">
            System Architecture &amp; Data Pipeline
          </h1>
          <p className="font-patrick text-2xl text-[#475569] max-w-3xl font-medium">
            A sandboxed, multi-process architectural blueprint engineered for security, high-throughput mirroring, and total code sovereignty.
          </p>
        </div>

        {/* Master Architecture Visual Blueprint Card */}
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffedd5] border-2 border-pencil-black rounded-xl shadow-scribely-sm">
              <Compass className="w-3.5 h-3.5 text-[#ea580c]" />
              <span className="text-xs font-mono font-bold text-[#9a3412] uppercase tracking-wide">
                Fig 1.1 &bull; Architectural Blueprint v1.0
              </span>
            </div>
            <span className="text-xs font-mono font-bold bg-[#dcfce7] text-[#15803d] px-2.5 py-0.5 rounded-full border-2 border-pencil-black shadow-scribely-sm">
              Level 4 Air-Gap
            </span>
          </div>

          <div
            onClick={() => setLightboxImg({ src: '/diagrams/architecture-master.jpg', caption: 'Figure 1.1: GitKura (Git蔵) Mirroring Engine — Master Architectural Blueprint' })}
            className="relative w-full p-2.5 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black shadow-scribely-sm cursor-zoom-in"
          >
            <img
              src="/diagrams/architecture-master.jpg"
              alt="GitKura Master Architecture Blueprint"
              className="w-full h-auto max-h-[520px] object-contain rounded-xl select-none mix-blend-multiply"
            />
          </div>

          <div className="pt-2 border-t-2 border-dashed border-pencil-black/15 flex items-center justify-between">
            <span className="font-kalam text-sm font-bold text-[#1a3a5f] flex items-center gap-1.5">
              <span>↳</span> End-to-end execution pipeline from Octokit stream to multi-cloud dispatch
            </span>
            <span className="font-mono text-[10px] text-ink-blue font-bold flex items-center gap-1">
              <Search className="w-3 h-3 text-ink-blue" />
              <span>Inspect Full-Res</span>
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ENGINEERING NOTEBOOK: HAND-DRAWN SYSTEM DESIGN ROUGH SKETCHES             */}
        {/* ========================================================================= */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-dashed border-pencil-black/20 pb-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#fef3c7] border-2 border-pencil-black rounded-xl shadow-scribely-sm">
                <FileCode2 className="w-3.5 h-3.5 text-[#b45309]" />
                <span className="text-xs font-mono font-bold text-[#92400e] uppercase tracking-wide">
                  Engineering Notebook &bull; System Design Rough Work
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-ink-blue">
                Kernel Design Drafts &amp; Mathematical Notes
              </h2>
              <p className="font-patrick text-base sm:text-lg text-[#475569]">
                Authentic hand-drawn engineering rough sketches and mathematical derivations created during the GitKura core kernel design phase.
              </p>
            </div>

            {/* Draft Selector Buttons */}
            <div className="flex flex-wrap gap-2 shrink-0">
              {Object.values(roughDrafts).map((draft) => (
                <button
                  key={draft.id}
                  type="button"
                  onClick={() => setActiveDraft(draft.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl border-2 text-xs font-mono font-bold transition-all cursor-pointer ${
                    activeDraft === draft.id
                      ? 'bg-ink-blue text-white border-pencil-black shadow-scribely-sm'
                      : 'bg-white text-ink-blue border-pencil-black/25 hover:border-pencil-black hover:bg-[#fdfbf7]'
                  }`}
                >
                  Draft {draft.num}
                </button>
              ))}
            </div>
          </div>

          {/* Active Rough Draft Card */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-ink-blue">
                  {roughDrafts[activeDraft].title}
                </span>
              </div>
              <span className="text-xs font-mono text-[#64748b] bg-[#f1f5f9] px-2.5 py-0.5 rounded-md border border-pencil-black/15">
                Click sketch to inspect in high resolution
              </span>
            </div>

            <div
              onClick={() =>
                setLightboxImg({
                  src: roughDrafts[activeDraft].src,
                  caption: roughDrafts[activeDraft].title,
                })
              }
              className="relative w-full p-2.5 sm:p-3 bg-[#fdfbf7] rounded-3xl border-2 border-pencil-black shadow-scribely-md cursor-zoom-in group"
            >
              <img
                src={roughDrafts[activeDraft].src}
                alt={roughDrafts[activeDraft].title}
                className="w-full h-auto max-h-[580px] object-contain rounded-2xl select-none mix-blend-multiply"
              />
            </div>

            <div className="pt-2 border-t-2 border-dashed border-pencil-black/15 flex items-center justify-between">
              <span className="font-kalam text-sm sm:text-base font-bold text-[#1a3a5f] flex items-center gap-1.5">
                {roughDrafts[activeDraft].annotation}
              </span>
              <span className="font-mono text-[10px] text-ink-blue font-bold flex items-center gap-1 shrink-0">
                <Search className="w-3 h-3 text-ink-blue" />
                <span>Inspect Full-Res</span>
              </span>
            </div>
          </div>

          {/* 4 Thumbnails Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            {Object.values(roughDrafts).map((draft) => (
              <button
                key={draft.id}
                type="button"
                onClick={() => setActiveDraft(draft.id as any)}
                className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-start gap-3 ${
                  activeDraft === draft.id
                    ? 'bg-white border-pencil-black ring-2 ring-ink-blue shadow-scribely-sm'
                    : 'bg-[#faf8f5] border-pencil-black/20 hover:border-pencil-black hover:bg-white'
                }`}
              >
                <div className="w-16 h-12 rounded-lg overflow-hidden border border-pencil-black/20 shrink-0 bg-[#fdfbf7]">
                  <img
                    src={draft.src}
                    alt={draft.title}
                    className="w-full h-full object-cover mix-blend-multiply"
                  />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <span className="text-xs font-mono font-bold text-ink-blue block truncate">
                    {draft.title}
                  </span>
                  <p className="text-[11px] font-mono text-[#64748b] line-clamp-2">
                    {draft.tagline}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Invariants Grid Card */}
        <div className="p-6 bg-[#fdfbf7] rounded-3xl border-2 border-pencil-black shadow-scribely-sm space-y-4">
          <span className="text-xs font-mono font-black uppercase text-ink-blue block">
            System Invariants &amp; Architectural Guarantees
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-white rounded-2xl border border-pencil-black/20 space-y-1.5">
              <div className="font-bold text-ink-blue flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-ink-blue" />
                Invariant 1: Zero SaaS Hub
              </div>
              <p className="text-[#64748b] leading-relaxed">
                No central backend server ever proxies your repository data. All transfers occur directly from GitHub to your chosen vault targets.
              </p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-pencil-black/20 space-y-1.5">
              <div className="font-bold text-[#15803d] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#15803d]" />
                Invariant 2: AES-256 Vault
              </div>
              <p className="text-[#64748b] leading-relaxed">
                Tokens are stored locally encrypted with 10,000 PBKDF2 iterations. Memory buffers automatically sanitize authorization headers.
              </p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-pencil-black/20 space-y-1.5">
              <div className="font-bold text-[#92400e] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#92400e]" />
                Invariant 3: Atomic Snapshots
              </div>
              <p className="text-[#64748b] leading-relaxed">
                Archive generation streams to staging `.tmp` inodes before atomic POSIX renaming, preventing half-written corrupted archives.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Layer Switcher */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(
            [
              { id: 'main', label: '01 • Main Process (Node Core)', icon: Cpu },
              { id: 'preload', label: '02 • Preload ContextBridge', icon: Lock },
              { id: 'renderer', label: '03 • Renderer Process (React 19)', icon: Code2 },
            ] as const
          ).map((item) => {
            const isSelected = activeLayer === item.id
            const Icon = item.icon
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveLayer(item.id)}
                className={`p-4 rounded-2xl border-2 transition-colors text-left flex items-center gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-highlighter-yellow border-pencil-black shadow-scribely'
                    : 'bg-white border-pencil-black/25 hover:border-pencil-black hover:bg-[#fdfbf7]'
                }`}
              >
                <Icon className="w-5 h-5 text-ink-blue flex-shrink-0" />
                <span className="text-xs font-black font-display text-ink-blue">{item.label}</span>
              </button>
            )
          })}
        </div>

        {/* Active Layer Details Card */}
        <div className="scribely-card p-6 sm:p-10 bg-white shadow-scribely-xl space-y-8 relative">
          <div className="washi-tape-blue -top-3 left-10 -rotate-1" />

          <div className="border-b-2 border-dashed border-pencil-black/20 pb-5 space-y-2">
            <span className="text-xs font-mono font-bold bg-[#dbeafe] text-ink-blue px-2.5 py-1 rounded-lg border border-pencil-black">
              {current.badge}
            </span>
            <h2 className="text-3xl font-black font-display text-ink-blue">
              {current.name}
            </h2>
            <p className="font-patrick text-xl text-[#475569] font-medium leading-relaxed">
              {current.tagline}
            </p>
          </div>

          {/* Component Modules Grid */}
          <div className="space-y-4">
            <span className="text-xs font-mono font-black uppercase text-ink-blue block">
              Core Modules &amp; Subsystems
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {current.components.map((comp, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black shadow-scribely-sm space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#15803d] flex-shrink-0" />
                    <h3 className="text-base font-black font-display text-ink-blue">
                      {comp.title}
                    </h3>
                  </div>
                  <p className="font-patrick text-base text-[#475569] leading-snug">
                    {comp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Zero-Trust Model Card */}
          <div className="space-y-2.5 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#dcfce7] border-2 border-pencil-black rounded-xl shadow-scribely-sm">
                <Shield className="w-3.5 h-3.5 text-[#15803d]" />
                <span className="text-xs font-mono font-bold text-[#166534] uppercase tracking-wide">
                  Fig 1.2 &bull; Zero-Trust Process Isolation
                </span>
              </div>
              <span className="text-xs font-mono font-bold bg-[#ffedd5] text-[#ea580c] px-2.5 py-0.5 rounded-full border-2 border-pencil-black shadow-scribely-sm">
                ContextBridge Sandboxing
              </span>
            </div>

            <div
              onClick={() => setLightboxImg({ src: '/diagrams/zero-trust-sandboxing.jpg', caption: 'Figure 1.2: GitKura Zero-Trust Process Isolation & Sandboxing Security Model' })}
              className="relative w-full p-2.5 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black shadow-scribely-sm cursor-zoom-in"
            >
              <img
                src="/diagrams/zero-trust-sandboxing.jpg"
                alt="Zero Trust Sandboxing Model"
                className="w-full h-auto max-h-[520px] object-contain rounded-xl select-none mix-blend-multiply"
              />
            </div>

            <div className="pt-2 border-t-2 border-dashed border-pencil-black/15 flex items-center justify-between">
              <span className="font-kalam text-sm font-bold text-[#1a3a5f] flex items-center gap-1.5">
                <span>↳</span> Renderer process has zero direct access to Node.js, shell, or raw filesystem
              </span>
              <span className="font-mono text-[10px] text-ink-blue font-bold flex items-center gap-1">
                <Search className="w-3 h-3 text-ink-blue" />
                <span>Inspect Full-Res</span>
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
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
                className="max-h-[75vh] w-auto object-contain rounded-xl select-none"
              />
            </div>
            <p className="text-[11px] font-mono text-center text-[#64748b]">
              Press ESC or click close button to return
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
