'use client'

import { useState } from 'react'
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
} from 'lucide-react'

export default function ArchitectureView() {
  const [selectedLayer, setSelectedLayer] = useState<'renderer' | 'preload' | 'main'>('main')

  return (
    <section id="architecture" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-emerald-50/90 border-2 border-pencil-black shadow-scribely-sm rounded-full -rotate-1">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
          <span className="font-caveat font-bold text-lg text-emerald-950">
            technical architecture &bull; electron 41 + react 19
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-marker uppercase leading-[1.25] text-[#17365D] tracking-tight">
          SYSTEM ARCHITECTURE &amp;{' '}
          <span className="relative inline-block text-[#E9A51A] whitespace-nowrap">
            DATA PIPELINE.
            <svg
              className="absolute left-0 -bottom-2 w-full h-3 select-none pointer-events-none"
              viewBox="0 0 200 8"
              fill="none"
              preserveAspectRatio="none"
            >
              <path d="M 2 5 Q 100 2 198 5" stroke="#E9A51A" strokeWidth="3.6" strokeLinecap="round" />
            </svg>
          </span>
        </h2>
        <p className="font-patrick text-xl text-[#64748b] font-medium">
          A deeply sandboxed, multi-process architecture engineered for resilience, speed, and privacy.
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Cute Layer Switcher Prompt without box */}
        <div className="flex justify-center items-center gap-1.5 mb-4 select-none pointer-events-none">
          <span className="font-caveat font-bold text-xl text-emerald-900 -rotate-1">
            explore the 3-tier sandboxed architecture
          </span>
          <svg className="w-5 h-5 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M 12 4 L 12 18 M 6 12 L 12 18 L 18 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Layer Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setSelectedLayer('renderer')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-black font-display border-2 transition-all cursor-pointer ${
              selectedLayer === 'renderer'
                ? 'bg-highlighter-yellow text-ink-blue border-pencil-black shadow-scribely -rotate-0.5'
                : 'bg-white text-[#64748b] border-pencil-black/30 hover:border-pencil-black'
            }`}
          >
            01 &bull; Renderer Process (React 19)
          </button>
          <button
            type="button"
            onClick={() => setSelectedLayer('preload')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-black font-display border-2 transition-all cursor-pointer ${
              selectedLayer === 'preload'
                ? 'bg-highlighter-yellow text-ink-blue border-pencil-black shadow-scribely rotate-0.5'
                : 'bg-white text-[#64748b] border-pencil-black/30 hover:border-pencil-black'
            }`}
          >
            02 &bull; Preload ContextBridge (Security Gate)
          </button>
          <button
            type="button"
            onClick={() => setSelectedLayer('main')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-black font-display border-2 transition-all cursor-pointer ${
              selectedLayer === 'main'
                ? 'bg-highlighter-yellow text-ink-blue border-pencil-black shadow-scribely -rotate-0.5'
                : 'bg-white text-[#64748b] border-pencil-black/30 hover:border-pencil-black'
            }`}
          >
            03 &bull; Main Process (Electron &amp; Node Core)
          </button>
        </div>

        {/* Dynamic Layer Card */}
        <div className="scribely-card p-6 sm:p-10 bg-white shadow-scribely-xl relative">
          <div className="washi-tape-blue -top-3 left-10 -rotate-1" />

          {selectedLayer === 'renderer' && (
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#dbeafe] border-2 border-pencil-black flex items-center justify-center text-ink-blue">
                  <Code2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black font-display text-ink-blue">
                    Renderer Process (React 19 &bull; Vite &bull; Tailwind)
                  </h3>
                  <p className="font-hand text-sm text-[#64748b]">
                    sandboxed client interface with zero direct Node.js access
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-4 bg-[#fdfbf7] rounded-xl border-2 border-pencil-black space-y-1.5">
                  <span className="font-bold text-ink-blue block">SetupPage.tsx</span>
                  <p className="text-[#64748b]">Token validation, storage directory picker, and cloud destination configuration.</p>
                </div>
                <div className="p-4 bg-[#fdfbf7] rounded-xl border-2 border-pencil-black space-y-1.5">
                  <span className="font-bold text-ink-blue block">ReposPage.tsx</span>
                  <p className="text-[#64748b]">Live GitHub repository discovery, search filters, and queue selection grid.</p>
                </div>
                <div className="p-4 bg-[#fdfbf7] rounded-xl border-2 border-pencil-black space-y-1.5">
                  <span className="font-bold text-ink-blue block">BackupPage.tsx</span>
                  <p className="text-[#64748b]">Live terminal log streams, throttled progress bars, and execution summaries.</p>
                </div>
              </div>
            </div>
          )}

          {selectedLayer === 'preload' && (
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#dcfce7] border-2 border-pencil-black flex items-center justify-center text-[#15803d]">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black font-display text-ink-blue">
                    Preload ContextBridge (Strict IPC Security Whitelist)
                  </h3>
                  <p className="font-hand text-sm text-[#64748b]">
                    guarantees isolated memory spaces and strict message whitelisting
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#1e293b] rounded-xl border-2 border-pencil-black font-mono text-xs text-slate-200 space-y-2">
                <p className="text-highlighter-yellow font-bold">// Whitelisted IPC Invoke Channels</p>
                <code className="text-slate-300 block leading-relaxed">
                  kura:github:validate-token &bull; kura:github:fetch-repos &bull; kura:git:clone &bull; kura:cloud:test-connection &bull; kura:backup:start &bull; kura:archives:list &bull; kura:settings:get
                </code>
              </div>
            </div>
          )}

          {selectedLayer === 'main' && (
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-highlighter-yellow border-2 border-pencil-black flex items-center justify-center text-ink-blue">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black font-display text-ink-blue">
                    Main Process (SimpleGit &bull; Octokit &bull; AWS SDK &bull; Archiver)
                  </h3>
                  <p className="font-architects text-sm text-[#64748b]">
                    the core asynchronous engine executing mirrors, encryption, and uploads
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 bg-[#fdfbf7] rounded-xl border-2 border-pencil-black space-y-1">
                  <span className="font-black text-ink-blue block">SimpleGit Mirror Kernel:</span>
                  <p className="font-sans text-[#64748b]">Executes differential pulls, tracks all remote branches, and scrubs credentials.</p>
                </div>
                <div className="p-4 bg-[#fdfbf7] rounded-xl border-2 border-pencil-black space-y-1">
                  <span className="font-black text-ink-blue block">Point-in-Time Snapshot Engine:</span>
                  <p className="font-sans text-[#64748b]">node-tar &amp; archiver ZIP streams with atomic temp-swap file rename guards.</p>
                </div>
                <div className="p-4 bg-[#fdfbf7] rounded-xl border-2 border-pencil-black space-y-1">
                  <span className="font-black text-ink-blue block">Cloud Replication Dispatcher:</span>
                  <p className="font-sans text-[#64748b]">Telegram Bot API, Google Drive V3 resumable, and AWS SDK multi-part uploads.</p>
                </div>
                <div className="p-4 bg-[#fdfbf7] rounded-xl border-2 border-pencil-black space-y-1">
                  <span className="font-black text-ink-blue block">Background node-cron Daemon:</span>
                  <p className="font-sans text-[#64748b]">System Tray menu controller and unattended daily/weekly schedule triggers.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
