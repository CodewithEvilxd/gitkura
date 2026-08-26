'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WashiTape from '@/components/WashiTape'
import InkanStamp from '@/components/InkanStamp'
import ResearchBentoGrid from '@/components/ui/research-bento-grid'
import {
  Layers,
  GitBranch,
  Key,
  Cloud,
  ArrowRight,
  Maximize2,
  X,
  FileText,
  Sparkles,
  BookOpen,
} from 'lucide-react'

interface DiagramData {
  id: string
  title: string
  shortTitle: string
  icon: typeof Layers
  src: string
  alt: string
  washiColor: 'yellow' | 'rose' | 'blue' | 'purple'
  noteTitle: string
  noteText: string
  noteHighlight: string
  chapterLink: string
}

const DIAGRAMS: DiagramData[] = [
  {
    id: 'architecture',
    title: 'KuraGit End-to-End System Architecture',
    shortTitle: '1. Architecture Flow',
    icon: Layers,
    src: '/diagrams/flow-01-architecture.png',
    alt: 'KuraGit Architecture Diagram showing Electron Renderer, ContextBridge Firewall, Main Kernel, Local Vault and Multi-Cloud Mesh',
    washiColor: 'yellow',
    noteTitle: 'Zero-Trust Process Isolation',
    noteText: 'The renderer process runs in an isolated sandbox with zero Node.js filesystem access. All synchronization requests pass through a strictly validated ContextBridge IPC firewall.',
    noteHighlight: 'Air-Gapped IPC Barrier',
    chapterLink: 'lore',
  },
  {
    id: 'delta-sync',
    title: 'Differential Delta Sync vs Full Clone Mechanism',
    shortTitle: '2. Delta Sync Flow',
    icon: GitBranch,
    src: '/diagrams/flow-02-deltasync.png',
    alt: 'Differential Delta Sync vs Full Clone Flowchart showing 18.2MB thin-pack stream saving 92% bandwidth vs 2.4GB redundant clone',
    washiColor: 'blue',
    noteTitle: 'Commit DAG Graph Traversal',
    noteText: 'Instead of re-cloning 2.4GB repositories, GitKura scans inodes in 12ms and streams only incremental differential thin-packs, cutting egress bandwidth by 92%.',
    noteHighlight: '-92% Bandwidth Saved',
    chapterLink: 'git-engine',
  },
  {
    id: 'crypto-dfd',
    title: 'Zero-Trust Cryptographic Dataflow (DFD)',
    shortTitle: '3. Cryptographic DFD',
    icon: Key,
    src: '/diagrams/flow-03-cryptodfd.png',
    alt: 'Zero-Trust Cryptographic Dataflow Diagram showing PBKDF2 10,000 iterations, 32-byte AES key derivation and Zero Disk Leaks',
    washiColor: 'purple',
    noteTitle: 'Ephemeral Memory Enclave',
    noteText: 'Master passphrase & machine-unique salt derive a 32-byte AES-256-GCM key via PBKDF2. Key exists exclusively in RAM heap and is zero-filled (0x00) on app lock.',
    noteHighlight: 'Zero Disk Persistence',
    chapterLink: 'auth',
  },
  {
    id: 'cloud-mesh',
    title: 'Multi-Cloud Replication & Jitter Queue Topology',
    shortTitle: '4. Multi-Cloud Topology',
    icon: Cloud,
    src: '/diagrams/flow-04-cloudmesh.png',
    alt: 'Multi-Cloud Replication Topology showing Cloudflare R2, Telegram Bot 50MB Chunks, AWS S3, Google Drive and Exponential Jitter Backoff',
    washiColor: 'rose',
    noteTitle: 'Full Jitter Concurrency Hub',
    noteText: 'Parallel workers dispatch encrypted chunk streams across Cloudflare R2, Telegram, S3, and Google Drive with exponential backoff to prevent thundering herd rate-limits.',
    noteHighlight: '$0 Egress & 50MB Chunks',
    chapterLink: 'cloud',
  },
]

export default function DocsPage() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const activeDiagram = DIAGRAMS[activeIdx]

  return (
    <div className="min-h-screen bg-[#faf8f5] text-pencil-black flex flex-col justify-between selection:bg-highlighter-yellow selection:text-ink-blue relative overflow-hidden font-sans">
      {/* Background Japanese Watermarks */}
      <div className="absolute right-4 -bottom-16 select-none pointer-events-none text-[200px] sm:text-[320px] font-serif font-black text-[#1a3a5f]/[0.02] leading-none z-0">
        蔵
      </div>
      <div className="absolute left-6 top-24 select-none pointer-events-none text-[150px] sm:text-[220px] font-serif font-black text-[#dc2626]/[0.02] leading-none z-0">
        極秘
      </div>

      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-12 space-y-6 flex-1 relative z-10 my-auto">
        {/* ========================================================================= */}
        {/* TOP MASTER LINK & HAND-DRAWN ANNOTATION WITH DOWNWARD CURVED ARROW        */}
        {/* ========================================================================= */}
        <div className="relative flex flex-col items-center justify-center pt-4 pb-14 sm:pb-20 select-none space-y-4">
          {/* Pure Handwritten Annotation & Downward Sweeping Curved Arrow (No Box, No Movement) */}
          <div className="relative flex items-center justify-center">
            <div className="flex items-center gap-2.5">
              {/* Cinnabar Red Handwritten Callout */}
              <span className="font-caveat font-black text-2xl sm:text-3xl text-[#e11d48] tracking-tight transform -rotate-1">
                Click here to read the whole field manual
              </span>

              {/* Hand-Drawn Sweeping Curved Arrow that curls down towards the title */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-[#e11d48]"
                >
                  <path
                    d="M 8,10 C 28,6 40,20 30,38"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  {/* Arrowhead pointing down towards the link */}
                  <path
                    d="M 21,30 L 30,39 L 37,28"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Master Calligraphic Link (Completely Static & Fixed, No Movement) */}
          <Link
            href="/docs/manual"
            className="group relative inline-flex items-center justify-center gap-3 text-2xl sm:text-4xl lg:text-5xl font-caveat font-black text-ink-blue hover:text-[#e11d48] transition-colors duration-200 cursor-pointer py-1 px-4"
          >
            <span className="relative pb-1">
              <span className="tracking-tight">Enter Complete Documentation (Chapter 01 → 12)</span>
              {/* Flowing Organic Pastel Peach-Coral Mildliner Gradient Stroke */}
              <span className="absolute left-0 bottom-0.5 w-full h-3 sm:h-4.5 bg-gradient-to-r from-[#fbcfe8] via-[#fed7aa] to-[#fef08a] -z-10 rounded-lg opacity-90 group-hover:opacity-100 transition-opacity duration-200 shadow-xs" />
            </span>
            <span className="text-2xl sm:text-4xl lg:text-5xl text-[#e11d48]">
              ➔
            </span>
          </Link>
        </div>

        {/* ========================================================================= */}
        {/* DEVELOPER SERVICE BENTO SHOWCASE (MULTI-CLOUD ARCHITECTURE GRID)          */}
        {/* ========================================================================= */}
        <div className="relative pt-2 pb-10 sm:pb-16 space-y-4">
          <div className="flex items-center justify-center gap-2 select-none">
            <span className="text-amber-500 font-bold">✦</span>
            <span className="font-caveat font-black text-2xl sm:text-3xl text-ink-blue">
              Interactive Multi-Cloud Mesh &amp; Delta-Sync Engine
            </span>
            <span className="text-amber-500 font-bold">✦</span>
          </div>

          <ResearchBentoGrid />
        </div>

        {/* ========================================================================= */}
        {/* CUTTING & STICKING SCRAPBOOK CANVAS (OPEN & BORDERLESS)                   */}
        {/* ========================================================================= */}
        <div className="relative space-y-6 pt-8 sm:pt-14 border-t-2 border-dashed border-pencil-black/15">
          {/* ======================================================================= */}
          {/* STYLISH HANDWRITTEN TABS WITH ORGANIC HIGHLIGHTER STROKE                */}
          {/* ======================================================================= */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 pb-3 border-b-2 border-dashed border-pencil-black/15">
            {DIAGRAMS.map((diagram, idx) => {
              const Icon = diagram.icon
              const isActive = idx === activeIdx
              return (
                <button
                  key={diagram.id}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`group relative text-lg sm:text-2xl lg:text-[26px] font-caveat font-black transition-all flex items-center justify-center gap-2 cursor-pointer py-1.5 px-3 rounded-xl ${
                    isActive
                      ? 'text-ink-blue scale-105'
                      : 'text-[#64748b] hover:text-ink-blue'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-transform ${
                      isActive
                        ? 'text-[#d97706] scale-110'
                        : 'text-[#94a3b8] group-hover:text-ink-blue'
                    }`}
                  />
                  <span className="tracking-tight truncate">{diagram.shortTitle}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeTabHighlighter"
                      className="absolute inset-0 -z-10 bg-highlighter-yellow/85 rounded-xl transform -rotate-1 scale-105 shadow-2xs"
                      transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* ======================================================================= */}
          {/* CUT-OUT PHOTO BOARD WITH REALISTIC CORNER WASHI TAPES                   */}
          {/* ======================================================================= */}
          <div className="relative bg-white rounded-2xl border-2 border-pencil-black p-3 sm:p-5 shadow-[0_12px_36px_rgba(0,0,0,0.09)]">
            {/* Authentic Diagonal Washi Tape Pins on Corners */}
            <WashiTape variant="yellow" rotate="-rotate-12" width={110} height={32} className="-top-4 -left-3 z-30 shadow-xs" />
            <WashiTape variant="rose" rotate="rotate-12" width={110} height={32} className="-top-4 -right-3 z-30 shadow-xs" />
            <WashiTape variant="blue" rotate="-rotate-6" width={90} height={28} className="-bottom-3 right-12 z-30 shadow-xs" />

            {/* Click to Expand Button Overlay */}
            <button
              type="button"
              onClick={() => setIsZoomed(true)}
              className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-xl bg-white/95 hover:bg-white text-ink-blue border border-pencil-black shadow-scribely-xs text-xs font-mono font-bold flex items-center gap-1.5 opacity-90 hover:opacity-100 hover:scale-105 transition-all cursor-pointer"
              title="Click to Zoom Fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Zoom Fullscreen</span>
            </button>

            {/* Active Diagram Graphic (Cutting & Sticking Photo Sheet) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDiagram.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                onClick={() => setIsZoomed(true)}
                className="relative w-full aspect-[16/9] min-h-[280px] sm:min-h-[420px] md:min-h-[520px] rounded-xl overflow-hidden cursor-zoom-in bg-[#fbf9f6] border border-pencil-black/10 flex items-center justify-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeDiagram.src}
                  alt={activeDiagram.alt}
                  className="w-full h-full object-contain select-none"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ======================================================================= */}
          {/* SCRAPBOOK MARGINALIA: PURE HANDWRITTEN NOTE (NO BOXES)                  */}
          {/* ======================================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center pt-3 select-none">
            {/* Left/Center: Pure Handwritten Field Note */}
            <div className="md:col-span-2 space-y-1.5 text-left">
              <div className="flex flex-wrap items-baseline gap-2.5">
                <span className="text-lg text-[#e11d48]">✎</span>
                <h4 className="font-caveat font-black text-2xl sm:text-3xl text-ink-blue tracking-tight">
                  {activeDiagram.noteTitle}
                </h4>
                <span className="font-caveat font-black text-lg sm:text-xl text-[#d97706]">
                  &mdash; {activeDiagram.noteHighlight}
                </span>
              </div>
              <p className="font-caveat font-bold text-xl sm:text-2xl text-[#334155] leading-snug">
                {activeDiagram.noteText}
              </p>
            </div>

            {/* Right: Deep Dive Link & Japanese Seal Stamp */}
            <div className="flex flex-col items-center md:items-end justify-center space-y-2.5">
              <Link
                href={`/docs/manual?chapter=${activeDiagram.chapterLink}`}
                className="group inline-flex items-center gap-2 text-xl sm:text-2xl font-caveat font-black text-ink-blue hover:text-[#e11d48] transition-colors"
              >
                <span>Read Full Technical Chapter</span>
                <span className="text-[#e11d48]">➔</span>
              </Link>

              <div className="flex items-center gap-3">
                <InkanStamp kanji="極秘" subtext="AIR-GAPPED VAULT" variant="red" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* FULLSCREEN LIGHTBOX ZOOM MODAL                                            */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 sm:p-8 flex flex-col items-center justify-center cursor-zoom-out"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-3xl border-2 border-pencil-black p-3 sm:p-5 shadow-2xl flex flex-col space-y-3 cursor-default"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 px-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <h3 className="font-display font-black text-base text-ink-blue">
                    {activeDiagram.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsZoomed(false)}
                  className="p-1.5 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* High-Res Image View */}
              <div className="relative w-full h-[65vh] sm:h-[75vh] rounded-xl overflow-hidden bg-[#faf8f5] flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeDiagram.src}
                  alt={activeDiagram.alt}
                  className="w-full h-full object-contain select-none"
                />
              </div>

              {/* Modal Footer Note */}
              <div className="text-center text-xs font-mono text-slate-500 pt-1">
                Press anywhere outside or click ✕ to close &bull; High Resolution Vector Architecture View
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
