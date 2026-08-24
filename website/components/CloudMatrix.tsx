'use client'

import { useState } from 'react'
import {
  Send,
  HardDrive,
  Cloud,
  Database,
  Shield,
  Server,
  CheckCircle2,
  Lock,
  ArrowRight,
  ExternalLink,
} from 'lucide-react'
import WashiTape from './WashiTape'

interface CloudTarget {
  id: string
  name: string
  badge: string
  tagline: string
  useCase: string
  highlights: string[]
  icon: any
  cardBg: string
  tapeColor: string
}

const cloudTargets: CloudTarget[] = [
  {
    id: 'telegram',
    name: 'Telegram Channel Vault',
    badge: 'Instant Mobile Backup',
    tagline: 'Get point-in-time code archives pushed straight to your private Telegram channel.',
    useCase: 'Best for solopreneurs & indie hackers who want instant code downloads on their phone anywhere.',
    highlights: [
      'Automatic .tar.gz document uploads (up to 50MB)',
      'Rich Markdown commit summaries & timestamp notifications',
      'One-tap archive download directly to your mobile device',
      'Zero monthly storage bills or server setup',
    ],
    icon: Send,
    cardBg: 'bg-[#dbeafe]/40',
    tapeColor: 'washi-tape-blue',
  },
  {
    id: 'gdrive',
    name: 'Google Drive V3',
    badge: 'Team Collaboration',
    tagline: 'Synchronize repository archives directly into designated Google Drive folders.',
    useCase: 'Best for agencies & startups sharing backup access across their engineering teams.',
    highlights: [
      'Target specific Google Drive shared folders',
      'Service account RSA-SHA256 background authentication',
      'Resumable chunked uploads for large repositories',
      'Native integration with Google Workspace permissions',
    ],
    icon: Cloud,
    cardBg: 'bg-[#dcfce7]/40',
    tapeColor: 'washi-tape-green',
  },
  {
    id: 's3',
    name: 'Amazon Web Services S3',
    badge: 'Enterprise Standard',
    tagline: 'Stream multi-part archives into Amazon S3 with lifecycle archiving rules.',
    useCase: 'Best for enterprise companies requiring Glacier Deep Archive tiering and compliance retention.',
    highlights: [
      'Multi-part streaming with real-time upload progress',
      'Configurable S3 path prefixes (e.g. daily-backups/)',
      'Automatic tiering to AWS Glacier for ultra-low cost storage',
      'Full compatibility with IAM policies and role restrictions',
    ],
    icon: Database,
    cardBg: 'bg-[#fee2e2]/40',
    tapeColor: 'washi-tape-rose',
  },
  {
    id: 'r2',
    name: 'Cloudflare R2',
    badge: 'Zero Egress Fees',
    tagline: 'High-speed S3-compatible cloud storage with $0 egress bandwidth download fees.',
    useCase: 'Best for teams with large monorepos who want free emergency restores without bandwidth bills.',
    highlights: [
      '100% Zero egress fees when restoring archives',
      'Distributed globally across Cloudflare’s 300+ edge cities',
      'Drop-in S3-compatible endpoint URL compatibility',
      'Blazing fast line-rate snapshot downloads',
    ],
    icon: Shield,
    cardBg: 'bg-[#f3e8ff]/40',
    tapeColor: 'washi-tape-purple',
  },
  {
    id: 'custom',
    name: 'Self-Hosted MinIO & Wasabi',
    badge: 'Private Clouds',
    tagline: 'Full data sovereignty for private Kubernetes clusters, Wasabi, and internal data centers.',
    useCase: 'Best for privacy-conscious teams running on-premise infrastructure behind corporate firewalls.',
    highlights: [
      'Runs completely inside your private corporate intranet',
      'Custom S3 endpoints with path-style addressing',
      'Works with Wasabi, Backblaze B2, and local MinIO servers',
      'No data ever touches third-party public clouds',
    ],
    icon: Server,
    cardBg: 'bg-[#ffedd5]/40',
    tapeColor: 'washi-tape-orange',
  },
  {
    id: 'none',
    name: 'Air-Gapped Local Disk Only',
    badge: 'Maximum Offline Privacy',
    tagline: 'Write uncompressed Git mirrors and point-in-time snapshots strictly to your local hard drive or NAS.',
    useCase: 'Best for secret IP, proprietary algorithms, and offline hardware-encrypted cold storage.',
    highlights: [
      '100% offline — zero packets ever sent over the internet',
      'Full raw Git mirror ready to use in your local terminal',
      'Standalone .tar.gz snapshots stored in .archives/',
      'Direct external SSD, USB, and network drive support',
    ],
    icon: HardDrive,
    cardBg: 'bg-white',
    tapeColor: 'washi-tape',
  },
]

export default function CloudMatrix() {
  const [activeTarget, setActiveTarget] = useState('telegram')
  const current = cloudTargets.find((t) => t.id === activeTarget) || cloudTargets[0]
  const Icon = current.icon

  return (
    <section id="cloud" className="pt-6 pb-16 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto select-none">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-emerald-50/90 border-2 border-pencil-black shadow-scribely-sm rounded-full -rotate-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#15803d] animate-pulse" />
          <span className="font-caveat font-bold text-lg text-emerald-950">
            multi-cloud replication matrix
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-marker uppercase leading-[1.25] text-[#17365D] tracking-tight">
          BACKUP TO THE{' '}
          <span className="relative inline-block text-[#E9A51A] sm:whitespace-nowrap">
            CLOUDS YOU ALREADY USE.
            <svg
              className="absolute left-0 -bottom-2 w-full h-3 select-none pointer-events-none"
              viewBox="0 0 240 8"
              fill="none"
              preserveAspectRatio="none"
            >
              <path d="M 2 5 Q 120 2 238 5" stroke="#E9A51A" strokeWidth="3.6" strokeLinecap="round" />
            </svg>
          </span>
        </h2>
        <p className="font-indie text-xl text-[#64748b] font-bold">
          Broadcast encrypted code archives across 6 versatile destinations — from Telegram channels to Amazon S3.
        </p>
      </div>

      {/* Cute Selector Instruction Note without box */}
      <div className="flex justify-center items-center gap-1.5 mb-4 select-none pointer-events-none">
        <span className="font-caveat font-bold text-xl text-indigo-900 -rotate-1">
          click any destination to inspect setup
        </span>
        <svg className="w-5 h-5 text-indigo-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M 12 4 L 12 18 M 6 12 L 12 18 L 18 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Grid of 6 Cloud Target Selector Tabs (Horizontally Swipeable on Mobile, Grid on Tablet/Desktop) */}
      <div className="flex overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-6xl mx-auto mb-8 no-scrollbar py-2 -mx-2 px-2 sm:mx-auto sm:px-0 touch-pan-x">
        {cloudTargets.map((target) => {
          const isSelected = target.id === activeTarget
          const TargetIcon = target.icon
          return (
            <button
              key={target.id}
              type="button"
              onClick={() => setActiveTarget(target.id)}
              className={`w-[145px] sm:w-auto flex-shrink-0 snap-start p-3.5 rounded-2xl border-2 transition-all text-left flex flex-col justify-between min-h-[110px] cursor-pointer ${
                isSelected
                  ? 'bg-highlighter-yellow border-pencil-black shadow-scribely'
                  : 'bg-white border-pencil-black/25 hover:border-pencil-black hover:bg-[#faf8f5]'
              }`}
            >
              <TargetIcon className="w-5 h-5 text-ink-blue" />
              <div>
                <span className="text-[10px] font-gaegu font-bold uppercase text-[#64748b] block">
                  {target.badge.split(' ')[0]}
                </span>
                <p className="text-xs font-black font-display text-ink-blue leading-tight mt-0.5">
                  {target.name}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Active Cloud Showcase Card */}
      <div className="max-w-5xl mx-auto relative">
        <WashiTape variant="blue" className="-top-3 right-12" />

        <div className="scribely-card p-6 sm:p-10 bg-white shadow-scribely-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#faf8f5] border-2 border-pencil-black shadow-scribely-sm flex items-center justify-center text-ink-blue">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black font-display text-ink-blue">
                    {current.name}
                  </h3>
                  <span className="text-xs font-mono font-bold bg-[#dbeafe] text-ink-blue px-2 py-0.5 rounded border border-ink-blue/40">
                    {current.badge}
                  </span>
                </div>
              </div>

              <p className="font-patrick text-xl text-[#475569] leading-relaxed font-medium">
                {current.tagline}
              </p>

              <div className="p-4 bg-[#faf8f5] rounded-xl border-2 border-pencil-black text-xs font-mono space-y-1">
                <span className="text-[#64748b] block font-bold">Recommended Use Case:</span>
                <p className="text-ink-blue font-kalam font-bold text-base leading-snug">{current.useCase}</p>
              </div>

              {/* Highlights */}
              <div className="pt-2 space-y-2">
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748b]">Key Capabilities:</p>
                {current.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-mono text-pencil-black">
                    <CheckCircle2 className="w-4 h-4 text-[#15803d] flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual Summary Card */}
            <div className="md:col-span-5 space-y-4">
              <div className={`p-6 rounded-2xl border-2 border-pencil-black shadow-scribely-sm ${current.cardBg} space-y-4`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase text-[#64748b]">Destination Status</span>
                  <span className="text-xs font-mono font-bold text-[#15803d] bg-white px-2 py-0.5 rounded border border-[#15803d]">Ready</span>
                </div>

                <div className="p-4 bg-white rounded-xl border-2 border-pencil-black text-xs font-mono space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#64748b]">Encryption:</span>
                    <span className="text-ink-blue font-bold">AES-256 On Disk</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748b]">Format:</span>
                    <span className="text-ink-blue font-bold">.tar.gz &bull; .zip</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748b]">Telemetry:</span>
                    <span className="text-[#15803d] font-bold">0% Sent to Third Parties</span>
                  </div>
                </div>

                <p className="font-shadows text-base font-bold text-[#475569] leading-snug">
                  All authorization tokens and private keys are encrypted on your computer with AES-256 before transmission.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
