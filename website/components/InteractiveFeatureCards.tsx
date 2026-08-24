'use client'

import React from 'react'
import {
  FolderGit2,
  Zap,
  Cloud,
  Sparkles,
  Lock,
} from 'lucide-react'
import WashiTape from './WashiTape'

export default function InteractiveFeatureCards() {
  return (
    <div className="py-6 sm:py-8 max-w-6xl mx-auto w-full px-3 sm:px-6 select-none">
      {/* ========================================================================= */}
      {/* 3 HIGH-POLISH HANDCRAFTED CARDS WITH SEAMLESS HIGH-RES ILLUSTRATIONS      */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        
        {/* =================================================================== */}
        {/* CARD 01: FULL RAW GIT TREES (LOCAL MIRROR)                          */}
        {/* =================================================================== */}
        <div className="relative bg-white border-2 border-pencil-black rounded-2xl p-5 shadow-[4px_4px_0px_#17365D] flex flex-col justify-between select-none">
          {/* Top Washi Tape */}
          <WashiTape variant="yellow" className="-top-2.5 left-8 shadow-xs scale-90" />

          {/* Top Floating Note */}
          <div className="absolute -top-6 right-4 flex items-center gap-1 select-none pointer-events-none">
            <span className="font-caveat font-bold text-base text-amber-900">
              raw disk files
            </span>
            <svg className="w-4 h-4 text-amber-800" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M 4 4 C 12 4, 18 10, 18 20" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M 12 16 L 18 20 L 22 14" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="space-y-3">
            {/* Header: Briefcase Icon + Title + Air-Gapped Pill */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-amber-50 rounded-lg border border-pencil-black/20">
                <FolderGit2 className="w-3.5 h-3.5 text-amber-900" />
                <span className="text-[11px] font-mono font-bold text-amber-950 uppercase tracking-wide">
                  01 / Local Mirror
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold bg-[#dcfce7] text-[#15803d] px-2.5 py-0.5 rounded-full border border-[#15803d]/30">
                Air-Gapped
              </span>
            </div>

            {/* Title & Subhead */}
            <div>
              <h3 className="text-xl font-marker text-[#17365D] tracking-tight">
                Full Raw Git Trees
              </h3>
              <p className="font-patrick text-xs text-[#64748b] font-medium mt-0.5">
                Stored uncompressed directly on your SSD or NAS
              </p>
            </div>

            {/* Seamless High-Res Hand-Drawn Vault Illustration (Native Paper Blend) */}
            <div className="relative w-full py-1 flex items-center justify-center pointer-events-none select-none">
              <img
                src="/illustrations/vault-safe.png"
                alt="Local Code Vault"
                draggable={false}
                className="w-full h-44 sm:h-48 object-contain mix-blend-multiply pointer-events-none select-none"
              />
            </div>

            {/* Explainer Body */}
            <p className="font-patrick text-xs text-[#475569] leading-relaxed font-medium">
              If GitHub suffers an outage, your team can cd directly into your local vault directory and keep coding or deploying immediately.
            </p>
          </div>

          {/* Bottom Note */}
          <div className="mt-4 pt-2.5 border-t-2 border-dashed border-pencil-black/15 flex items-center justify-between">
            <span className="font-kalam text-sm font-bold text-[#17365D] flex items-center gap-1.5">
              <span>↳</span> Instant terminal access &bull; zero downtime
            </span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          </div>
        </div>

        {/* =================================================================== */}
        {/* CARD 02: DIFFERENTIAL ENGINE (DELTA SYNC)                            */}
        {/* =================================================================== */}
        <div className="relative bg-white border-2 border-pencil-black rounded-2xl p-5 shadow-[4px_4px_0px_#17365D] flex flex-col justify-between select-none">
          {/* Top Washi Tape */}
          <WashiTape variant="green" className="-top-2.5 left-8 shadow-xs scale-90" />

          {/* Top Floating Note */}
          <div className="absolute -top-6 right-4 flex items-center gap-1 select-none pointer-events-none">
            <span className="font-caveat font-bold text-base text-emerald-900">
              2-sec delta sync
            </span>
            <svg className="w-4 h-4 text-emerald-800" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M 4 4 C 12 4, 18 10, 18 20" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M 12 16 L 18 20 L 22 14" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="space-y-3">
            {/* Header: Icon + Title + 92% Saved Pill */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-50 rounded-lg border border-pencil-black/20">
                <Zap className="w-3.5 h-3.5 text-emerald-700" />
                <span className="text-[11px] font-mono font-bold text-emerald-950 uppercase tracking-wide">
                  02 / Delta Sync
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-300">
                92% Saved
              </span>
            </div>

            {/* Title & Subhead */}
            <div>
              <h3 className="text-xl font-marker text-[#17365D] tracking-tight">
                Differential Engine
              </h3>
              <p className="font-patrick text-xs text-[#64748b] font-medium mt-0.5">
                Only fetches newly authored commits &amp; packfiles
              </p>
            </div>

            {/* Seamless High-Res Hand-Drawn Delta Transfer Illustration */}
            <div className="relative w-full py-1 flex items-center justify-center pointer-events-none select-none">
              <img
                src="/illustrations/delta-sync.png"
                alt="Smart Delta Transfer"
                draggable={false}
                className="w-full h-44 sm:h-48 object-contain mix-blend-multiply pointer-events-none select-none"
              />
            </div>

            {/* Explainer Body */}
            <p className="font-patrick text-xs text-[#475569] leading-relaxed font-medium">
              Pulls incremental changes across 50+ repositories in seconds without wasting bandwidth or exhausting GitHub quotas.
            </p>
          </div>

          {/* Bottom Note */}
          <div className="mt-4 pt-2.5 border-t-2 border-dashed border-pencil-black/15 flex items-center justify-between">
            <span className="font-kalam text-sm font-bold text-[#15803d] flex items-center gap-1.5">
              <span>↳</span> Lightning sync speeds on large repos
            </span>
            <Zap className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          </div>
        </div>

        {/* =================================================================== */}
        {/* CARD 03: ENCRYPTED SNAPSHOTS (CLOUD DISPATCH)                       */}
        {/* =================================================================== */}
        <div className="relative bg-white border-2 border-pencil-black rounded-2xl p-5 shadow-[4px_4px_0px_#17365D] flex flex-col justify-between select-none">
          {/* Top Washi Tape */}
          <WashiTape variant="blue" className="-top-2.5 left-8 shadow-xs scale-90" />

          {/* Top Floating Note */}
          <div className="absolute -top-6 right-4 flex items-center gap-1 select-none pointer-events-none">
            <span className="font-caveat font-bold text-base text-sky-900">
              6 cloud destinations
            </span>
            <svg className="w-4 h-4 text-sky-800" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M 4 4 C 12 4, 18 10, 18 20" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M 12 16 L 18 20 L 22 14" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="space-y-3">
            {/* Header: Icon + Title + 6 Targets Pill */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-sky-50 rounded-lg border border-pencil-black/20">
                <Cloud className="w-3.5 h-3.5 text-sky-700" />
                <span className="text-[11px] font-mono font-bold text-sky-950 uppercase tracking-wide">
                  03 / Cloud Fleet
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold bg-sky-100 text-sky-900 px-2.5 py-0.5 rounded-full border border-sky-300">
                6 Targets
              </span>
            </div>

            {/* Title & Subhead */}
            <div>
              <h3 className="text-xl font-marker text-[#17365D] tracking-tight">
                Encrypted Snapshots
              </h3>
              <p className="font-patrick text-xs text-[#64748b] font-medium mt-0.5">
                Multi-cloud broadcast with zero provider lock-in
              </p>
            </div>

            {/* Seamless High-Res Hand-Drawn Cloud Dispatch Illustration */}
            <div className="relative w-full py-1 flex items-center justify-center pointer-events-none select-none">
              <img
                src="/illustrations/cloud-dispatch.jpg"
                alt="Multi Cloud Dispatch"
                draggable={false}
                className="w-full h-44 sm:h-48 object-contain mix-blend-multiply pointer-events-none select-none"
              />
            </div>

            {/* Explainer Body */}
            <p className="font-patrick text-xs text-[#475569] leading-relaxed font-medium">
              Broadcast point-in-time backups to secondary cloud storage encrypted with AES-256 before leaving your machine.
            </p>
          </div>

          {/* Bottom Note */}
          <div className="mt-4 pt-2.5 border-t-2 border-dashed border-pencil-black/15 flex items-center justify-between">
            <span className="font-kalam text-sm font-bold text-[#17365D] flex items-center gap-1.5">
              <span>↳</span> Never trust a single cloud provider alone
            </span>
            <Lock className="w-3.5 h-3.5 text-sky-700 shrink-0" />
          </div>
        </div>

      </div>
    </div>
  )
}
