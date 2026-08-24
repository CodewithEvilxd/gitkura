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
} from 'lucide-react'

export default function ArchitecturePage() {
  const [activeLayer, setActiveLayer] = useState<'main' | 'preload' | 'renderer'>('main')

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
    <div className="min-h-screen flex flex-col justify-between selection:bg-highlighter-yellow selection:text-ink-blue">
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
          <p className="font-hand text-2xl text-[#475569] max-w-3xl font-medium">
            A sandboxed, multi-process architectural blueprint engineered for security, high-throughput mirroring, and total code sovereignty.
          </p>
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
                className={`p-4 rounded-2xl border-2 transition-all text-left flex items-center gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-highlighter-yellow border-pencil-black shadow-scribely -rotate-0.5'
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
            <p className="font-hand text-xl text-[#475569] font-medium leading-relaxed">
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
                  <p className="font-hand text-base text-[#475569] leading-snug">
                    {comp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* End-to-End Pipeline Diagram */}
          <div className="pt-6 border-t-2 border-dashed border-pencil-black/20 space-y-3">
            <span className="text-xs font-mono font-black uppercase text-ink-blue block">
              End-to-End Vault Execution Pipeline
            </span>

            <div className="bg-[#1e293b] rounded-2xl p-5 border-2 border-pencil-black font-mono text-xs text-slate-200 shadow-inner overflow-x-auto">
              <pre className="text-slate-300 whitespace-pre leading-relaxed">
{`[GitHub REST API] ──(Pagination & Discovery)──> [Octokit Engine]
                                                        │
                                                        ▼
[Local Vault Disk] <──(git fetch --all --prune)── [SimpleGit Kernel]
        │
        ▼
[.archives/ Directory] <──(.tar.gz / .zip Packaging)── [Archiver & Tar Engine]
        │
        ▼
[Cloud Dispatcher] ───┬───> [Telegram Bot API (sendDocument Multipart)]
                      ├───> [Google Drive V3 (RSA-SHA256 JWT Signed)]
                      ├───> [AWS S3 Standard / IA (Multipart Stream)]
                      ├───> [Cloudflare R2 (Zero Egress Endpoint)]
                      └───> [MinIO / Wasabi (On-Premise Intranet)]`}</pre>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
