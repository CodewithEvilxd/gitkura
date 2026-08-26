'use client'

import React, { useState } from 'react'
import {
  PenTool,
  Shield,
  GitBranch,
  Cloud,
  AlertTriangle,
} from 'lucide-react'
import WashiTape from '@/components/WashiTape'
import HighlighterBadge, { HighlighterColor } from '@/components/HighlighterBadge'

interface ChapterProps {
  setLightboxImg: (img: { src: string; caption: string }) => void
}

export default function ChapterRoughNotebook({ setLightboxImg }: ChapterProps) {
  const [activeDraft, setActiveDraft] = useState<'security' | 'delta' | 'cloud' | 'recovery'>('security')

  const drafts: Record<string, any> = {
    security: {
      id: 'security',
      num: '01',
      title: 'Draft 01 • Process Boundary & Zero-Trust Sandbox Draft',
      tagline: 'Hand-drawn process boundaries, V8 event loop isolation, and Preload ContextBridge firewall.',
      src: '/diagrams/rough-page-01-security.jpg',
      badge: 'Zero-Trust Kernel',
      badgeColor: 'emerald' as HighlighterColor,
      topNotes: [
        {
          title: 'Renderer is 100% UNTRUSTED!',
          sub: '↳ Zero raw fs, child_process, or shell execution in UI',
          color: 'text-[#dc2626]',
          align: 'items-start',
          rotate: '-rotate-2',
        },
        {
          title: 'ContextBridge IPC Firewall Barrier',
          sub: '↳ Blocks direct Node.js access; whitelisted IPC only',
          color: 'text-[#1d4ed8]',
          align: 'items-end text-right',
          rotate: 'rotate-2',
        },
      ],
      bottomNotes: [
        {
          title: 'PBKDF2 (10,000 iter) -> 32B AES Key',
          sub: '↳ Derived in Main memory with per-repo crypt-salt',
          color: 'text-[#15803d]',
          align: 'items-start',
          rotate: 'rotate-1',
        },
        {
          title: 'Threat Defense: Never in localStorage!',
          sub: '↳ Crossed out bad ideas to eliminate token leakage',
          color: 'text-[#b91c1c]',
          align: 'items-end text-right',
          rotate: '-rotate-1',
        },
      ],
      arrowsSvg: (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible" viewBox="0 0 1000 562.5">
          {/* Top-Left Arrow -> Threat Model (x: 65, y: 200) */}
          <path d="M 90 -25 C 85 60, 60 140, 65 200" fill="none" stroke="#dc2626" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 52 180 L 65 200 L 78 182" fill="none" stroke="#dc2626" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Top-Right Arrow -> ContextBridge Barrier (x: 515, y: 145) */}
          <path d="M 750 -25 C 680 40, 590 80, 515 145" fill="none" stroke="#1d4ed8" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 535 130 L 515 145 L 530 158" fill="none" stroke="#1d4ed8" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Bottom-Left Arrow -> PBKDF2 Formula Oval (x: 205, y: 480) */}
          <path d="M 150 590 C 170 540, 190 510, 205 480" fill="none" stroke="#15803d" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 190 495 L 205 480 L 210 502" fill="none" stroke="#15803d" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Bottom-Right Arrow -> Crossed out localStorage (x: 880, y: 485) */}
          <path d="M 820 590 C 840 550, 865 515, 880 485" fill="none" stroke="#b91c1c" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 865 500 L 880 485 L 888 502" fill="none" stroke="#b91c1c" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    delta: {
      id: 'delta',
      num: '02',
      title: 'Draft 02 • Git Commit DAG & Differential Delta Pull Math',
      tagline: 'Commit hash traversal math, crossed-out full clone waste, and O(delta) thin-pack generation.',
      src: '/diagrams/rough-page-02-deltasync.jpg',
      badge: 'Delta Pull Math',
      badgeColor: 'amber' as HighlighterColor,
      topNotes: [
        {
          title: 'Commit DAG: c1 -> c2 -> c3 -> c4',
          sub: '↳ Finds common base commit (c2) have/want ACKs',
          color: 'text-[#7c3aed]',
          align: 'items-start',
          rotate: '-rotate-2',
        },
        {
          title: '99.2% Bandwidth Saved (18.2 MB Thin-Pack)',
          sub: '↳ Only transfers new packfile blobs; zero redundant clones',
          color: 'text-[#059669]',
          align: 'items-end text-right',
          rotate: 'rotate-2',
        },
      ],
      bottomNotes: [
        {
          title: 'Crossed-out Full Clones = 2.4 GB WASTE!',
          sub: '↳ No redundant packfile downloads; thin-pack generation only',
          color: 'text-[#b91c1c]',
          align: 'items-start',
          rotate: 'rotate-1',
        },
        {
          title: 'Direct ref update (refs/heads/*)',
          sub: '↳ Local tracking branch updated in ~2 seconds',
          color: 'text-[#1d4ed8]',
          align: 'items-end text-right',
          rotate: '-rotate-1',
        },
      ],
      arrowsSvg: (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible" viewBox="0 0 1000 562.5">
          {/* Top-Left Arrow -> Commit DAG (x: 215, y: 155) */}
          <path d="M 80 -25 C 90 40, 140 100, 215 155" fill="none" stroke="#7c3aed" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 195 145 L 215 155 L 208 172" fill="none" stroke="#7c3aed" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Top-Right Arrow -> 18.2 MB Thin-pack (x: 770, y: 155) */}
          <path d="M 850 -25 C 840 40, 810 100, 770 155" fill="none" stroke="#059669" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 788 142 L 770 155 L 766 135" fill="none" stroke="#059669" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Bottom-Left Arrow -> Crossed out Full clone (x: 215, y: 440) */}
          <path d="M 120 590 C 140 540, 180 490, 215 440" fill="none" stroke="#b91c1c" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 200 455 L 215 440 L 222 460" fill="none" stroke="#b91c1c" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Bottom-Right Arrow -> Direct Ref updates (x: 770, y: 440) */}
          <path d="M 880 590 C 850 540, 810 490, 770 440" fill="none" stroke="#1d4ed8" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 765 460 L 770 440 L 785 455" fill="none" stroke="#1d4ed8" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    cloud: {
      id: 'cloud',
      num: '03',
      title: 'Draft 03 • Multi-Cloud Replication Mesh & Backoff Jitter Curve',
      tagline: 'Parallel worker dispatch to 5 cloud targets, Telegram 50MB chunking, and backoff ladder formula.',
      src: '/diagrams/rough-page-03-multicloud.jpg',
      badge: 'Multi-Cloud Mesh',
      badgeColor: 'rose' as HighlighterColor,
      topNotes: [
        {
          title: 'Central Bare Mirror is Source of Truth',
          sub: '↳ SQLite local index streams signed manifests to cloud targets',
          color: 'text-[#0284c7]',
          align: 'items-start',
          rotate: '-rotate-2',
        },
        {
          title: 'ZERO EGRESS FEES on Cloudflare R2!',
          sub: '↳ Native S3-compatible SigV4 replication protocol',
          color: 'text-[#b45309]',
          align: 'items-end text-right',
          rotate: 'rotate-2',
        },
      ],
      bottomNotes: [
        {
          title: 'Exponential Backoff + Random Jitter',
          sub: '↳ Prevents API rate-limit hammering & thundering herds',
          color: 'text-[#dc2626]',
          align: 'items-start',
          rotate: 'rotate-1',
        },
        {
          title: 'Telegram 50MB Multipart Split',
          sub: '↳ Auto-chunks archives with chunk-index resume offset',
          color: 'text-[#15803d]',
          align: 'items-end text-right',
          rotate: '-rotate-1',
        },
      ],
      arrowsSvg: (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible" viewBox="0 0 1000 562.5">
          {/* Top-Left Arrow -> Central Vault Box (x: 445, y: 190) */}
          <path d="M 220 -25 C 290 50, 380 120, 445 190" fill="none" stroke="#0284c7" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 426 182 L 445 190 L 440 205" fill="none" stroke="#0284c7" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Top-Right Arrow -> Cloudflare R2 Box (x: 745, y: 305) */}
          <path d="M 780 -25 C 790 90, 780 200, 745 305" fill="none" stroke="#b45309" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 760 290 L 745 305 L 762 312" fill="none" stroke="#b45309" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Bottom-Left Arrow -> Plotted Jitter Curve (x: 140, y: 445) */}
          <path d="M 150 590 C 145 530, 140 480, 140 445" fill="none" stroke="#dc2626" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 130 462 L 140 445 L 150 462" fill="none" stroke="#dc2626" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Bottom-Right Arrow -> Telegram Stream (x: 745, y: 95) */}
          <path d="M 820 590 C 860 400, 830 220, 745 95" fill="none" stroke="#15803d" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 765 102 L 745 95 L 755 116" fill="none" stroke="#15803d" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    recovery: {
      id: 'recovery',
      num: '04',
      title: 'Draft 04 • Atomic Snapshot Lifecycle & Emergency Triage Flow',
      tagline: 'POSIX atomic renameSync(), SHA-256 integrity verification, and 3-path incident response triage.',
      src: '/diagrams/rough-page-04-recovery.jpg',
      badge: 'Disaster Recovery',
      badgeColor: 'purple' as HighlighterColor,
      topNotes: [
        {
          title: 'POSIX renameSync() Atomic Inode Swap',
          sub: '↳ Write to .tmp -> SHA-256 verify -> atomic swap (zero corrupt files)',
          color: 'text-[#15803d]',
          align: 'items-start',
          rotate: '-rotate-2',
        },
        {
          title: '0s RTO: Instant Local Vault Tree',
          sub: '↳ If GitHub is down at 3 AM, ship directly from local mirror',
          color: 'text-[#dc2626]',
          align: 'items-end text-right',
          rotate: 'rotate-2',
        },
      ],
      bottomNotes: [
        {
          title: 'Time Machine: tar -xzf in 5s',
          sub: '↳ Extract immutable point-in-time snapshot archive',
          color: 'text-[#b45309]',
          align: 'items-start',
          rotate: 'rotate-1',
        },
        {
          title: 'SHA-256 Integrity & Failover Remote',
          sub: '↳ Switch remote: git push failover --all in 1 single command',
          color: 'text-[#7c3aed]',
          align: 'items-end text-right',
          rotate: '-rotate-1',
        },
      ],
      arrowsSvg: (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible" viewBox="0 0 1000 562.5">
          {/* Top-Left Arrow -> Step 4 Atomic swap box (x: 580, y: 80) */}
          <path d="M 250 -25 C 380 15, 490 40, 580 80" fill="none" stroke="#15803d" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 560 72 L 580 80 L 568 95" fill="none" stroke="#15803d" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Top-Right Arrow -> 0s RTO Local Mirror Pathway (x: 310, y: 370) */}
          <path d="M 750 -25 C 600 100, 420 220, 310 370" fill="none" stroke="#dc2626" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 330 360 L 310 370 L 325 385" fill="none" stroke="#dc2626" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Bottom-Left Arrow -> tar -xzf command box / Time machine (x: 445, y: 460) */}
          <path d="M 250 590 C 320 540, 390 490, 445 460" fill="none" stroke="#b45309" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 426 470 L 445 460 L 435 482" fill="none" stroke="#b45309" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Bottom-Right Arrow -> Quick Commands / Failover Box (x: 795, y: 390) */}
          <path d="M 780 590 C 800 520, 805 450, 795 390" fill="none" stroke="#7c3aed" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 788 410 L 795 390 L 806 408" fill="none" stroke="#7c3aed" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  }

  const cur = drafts[activeDraft]

  return (
    <div className="space-y-8 pt-2">
      {/* Intro Philosophy Header */}
      <div className="space-y-3 font-patrick text-base text-[#334155] leading-relaxed">
        <p>
          These are the <strong>100% authentic handwritten engineering rough sheets</strong> created during the architectural design of GitKura. Annotated with real developer marker notes and hand-drawn arrows pointing directly into key kernel schematics.
        </p>
      </div>

      {/* 4 Draft Switcher Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { key: 'security', num: '01', title: 'Process Security & Sandbox', icon: Shield, color: 'text-emerald-700' },
          { key: 'delta', num: '02', title: 'Commit DAG & Delta Math', icon: GitBranch, color: 'text-amber-700' },
          { key: 'cloud', num: '03', title: 'Multi-Cloud & Jitter Curve', icon: Cloud, color: 'text-rose-700' },
          { key: 'recovery', num: '04', title: 'Atomic Inode & Recovery', icon: AlertTriangle, color: 'text-purple-700' },
        ].map((d) => {
          const Icon = d.icon
          const isActive = activeDraft === d.key
          return (
            <button
              key={d.key}
              type="button"
              onClick={() => setActiveDraft(d.key as any)}
              className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
                isActive
                  ? 'bg-ink-blue text-white border-pencil-black shadow-scribely-md scale-[1.02]'
                  : 'bg-white text-[#334155] border-pencil-black/20 hover:border-pencil-black hover:bg-[#faf8f5]'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <HighlighterBadge
                  color={isActive ? 'yellow' : 'peach'}
                  variant="ribbon"
                  size="sm"
                >
                  Page {d.num}
                </HighlighterBadge>
                <Icon className={`w-4 h-4 ${isActive ? 'text-highlighter-yellow' : d.color}`} />
              </div>
              <span className="text-xs font-display font-black leading-tight">
                {d.title}
              </span>
            </button>
          )
        })}
      </div>

      {/* Main Architect Workstation Canvas Container */}
      <div className="relative p-3 sm:p-6 bg-[#fdfbf7] rounded-3xl border-2 border-pencil-black shadow-scribely-lg space-y-6">
        <WashiTape variant="yellow" rotate="-rotate-2" className="-top-4 left-6 sm:left-12" />
        <WashiTape variant="blue" rotate="rotate-2" className="-top-4 right-6 sm:right-12" />

        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed border-pencil-black/20 pb-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-caveat font-extrabold text-base text-[#64748b] tracking-wide">
                Engineering Notebook &bull; Authentic Markup
              </span>
              <HighlighterBadge
                color={cur.badgeColor}
                variant="ribbon"
                size="md"
              >
                {cur.badge}
              </HighlighterBadge>
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-display text-ink-blue mt-0.5">
              {cur.title}
            </h3>
            <p className="font-caveat text-lg text-[#64748b] font-bold">
              {cur.tagline}
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* UNIFIED WORKSTATION: PURE HANDWRITTEN NOTES + PRECISE ARROWS             */}
        {/* ========================================================================= */}
        <div className="relative w-full space-y-4">
          {/* Top Row: Pure Handwritten Marker Text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 px-2 sm:px-6">
            {cur.topNotes.map((note: any, idx: number) => (
              <div
                key={idx}
                className={`flex flex-col ${note.align} ${note.rotate} select-none`}
              >
                <span className={`font-caveat font-extrabold text-xl sm:text-2xl lg:text-3xl ${note.color} leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,1)]`}>
                  {note.title}
                </span>
                <span className="font-kalam text-xs sm:text-sm text-[#475569] font-bold">
                  {note.sub}
                </span>
              </div>
            ))}
          </div>

          {/* Central Drawing Canvas with 16:9 aspect lock so SVG coordinates never distort */}
          <div className="relative w-full aspect-[16/9] bg-white rounded-2xl sm:rounded-3xl border-2 border-pencil-black shadow-scribely-md overflow-visible">
            <img
              src={cur.src}
              alt={cur.title}
              draggable={false}
              className="w-full h-full object-cover rounded-xl sm:rounded-2xl select-none pointer-events-none"
            />
            {/* Direct 1:1 SVG Overlay Layer */}
            {cur.arrowsSvg}
          </div>

          {/* Bottom Row: Pure Handwritten Marker Text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 px-2 sm:px-6">
            {cur.bottomNotes.map((note: any, idx: number) => (
              <div
                key={idx}
                className={`flex flex-col ${note.align} ${note.rotate} select-none`}
              >
                <span className={`font-caveat font-extrabold text-xl sm:text-2xl lg:text-3xl ${note.color} leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,1)]`}>
                  {note.title}
                </span>
                <span className="font-kalam text-xs sm:text-sm text-[#475569] font-bold">
                  {note.sub}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Marginalia Footer */}
        <div className="pt-2 border-t-2 border-dashed border-pencil-black/20 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-ink-blue">
            <PenTool className="w-4 h-4 text-ink-blue" />
            <span>4 Architectural Invariants Verified by Handwritten Proof</span>
          </div>
          <span className="font-caveat text-base text-[#64748b] font-bold">
            Zero cloud middleman &bull; 100% Offline-First
          </span>
        </div>
      </div>
    </div>
  )
}
