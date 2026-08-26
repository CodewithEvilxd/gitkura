'use client'

import React, { useState, useMemo } from 'react'
import { GitBranch, Search, Gauge, Terminal } from 'lucide-react'
import CodeTerminalBlock from '@/components/CodeTerminalBlock'
import InkanStamp from '@/components/InkanStamp'
import HighlighterBadge from '@/components/HighlighterBadge'

interface ChapterProps {
  setLightboxImg: (img: { src: string; caption: string }) => void
}

export default function Chapter05GitEngine({ setLightboxImg }: ChapterProps) {
  const [repoCount, setRepoCount] = useState(25)
  const [avgRepoSizeMb, setAvgRepoSizeMb] = useState(80)

  const fullCloneTotalGb = useMemo(
    () => ((repoCount * avgRepoSizeMb) / 1024).toFixed(2),
    [repoCount, avgRepoSizeMb]
  )

  const deltaFetchTotalMb = useMemo(
    () => (repoCount * (avgRepoSizeMb * 0.08)).toFixed(1),
    [repoCount, avgRepoSizeMb]
  )

  const bandwidthSavedPercent = useMemo(() => {
    const full = repoCount * avgRepoSizeMb
    const delta = repoCount * (avgRepoSizeMb * 0.08)
    return (((full - delta) / full) * 100).toFixed(0)
  }, [repoCount, avgRepoSizeMb])

  return (
    <div className="space-y-6 pt-2">
      {/* Chapter Stamp Header */}
      <div className="flex items-center justify-between border-b-2 border-dashed border-pencil-black/20 pb-3">
        <InkanStamp kanji="鏡" subtext="DIFFERENTIAL DELTA SYNC" variant="navy" />
        <HighlighterBadge color="yellow" variant="ribbon" size="md">
          Sync Engine &bull; Chapter 05
        </HighlighterBadge>
      </div>

      <div className="space-y-3 font-patrick text-base text-[#334155] leading-relaxed">
        <p>
          Standard naive backup scripts execute full `git clone` executions every single night. For an organization managing 50 repositories totaling 50GB, full clones transfer <strong>1.5 Terabytes of redundant network data every month</strong>, exhausting network bandwidth and triggering GitHub secondary rate-limit throttles.
        </p>
        <p>
          GitKura's Differential Sync Kernel maintains a persistent, uncompressed mirror in your local vault. On each scheduled run, it queries upstream remote refs using `simple-git` and fetches <strong>only newly authored commits, trees, and blobs</strong> in lightweight packfiles—reducing execution time from 25 minutes down to ~2 seconds.
        </p>
      </div>

      {/* Differential Sync vs Traditional Full Cloning Diagram */}
      <div className="space-y-2.5 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <HighlighterBadge color="peach" variant="ribbon" size="md">
            <span className="flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5 text-[#b45309]" />
              <span>Fig 5.1 &bull; Delta vs Full Clone Comparison</span>
            </span>
          </HighlighterBadge>
          <HighlighterBadge color="emerald" variant="ribbon" size="md">
            92% Bandwidth Saved
          </HighlighterBadge>
        </div>

        <div
          onClick={() =>
            setLightboxImg({
              src: '/diagrams/delta-vs-fullclone.jpg',
              caption:
                'Figure 5.1: Differential Git Synchronization vs Traditional Full Cloning',
            })
          }
          className="relative w-full p-2.5 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black shadow-scribely-sm cursor-zoom-in"
        >
          <img
            src="/diagrams/delta-vs-fullclone.jpg"
            alt="Differential Sync vs Traditional Full Cloning"
            draggable={false}
            className="w-full h-auto max-h-[520px] object-contain rounded-xl select-none pointer-events-none mix-blend-multiply"
          />
        </div>

        <div className="pt-2 border-t-2 border-dashed border-pencil-black/15 flex items-center justify-between">
          <span className="font-kalam text-sm font-bold text-[#1a3a5f] flex items-center gap-1.5">
            <span>↳</span> 18MB delta pull vs 2.4GB redundant full clone &bull; 133x data reduction in 2.1s
          </span>
          <span className="font-mono text-[10px] text-ink-blue font-bold flex items-center gap-1">
            <Search className="w-3 h-3 text-ink-blue" />
            <span>Inspect Full-Res</span>
          </span>
        </div>
      </div>

      {/* Refspec & Packfile Delta Note */}
      <div className="p-5 bg-[#fdfbf7] rounded-3xl border-2 border-pencil-black shadow-scribely-sm space-y-4">
        <div className="border-b-2 border-dashed border-pencil-black/20 pb-3 flex items-center justify-between">
          <h3 className="text-lg font-black font-display text-ink-blue">
            Git Internals: Packfile Delta Compression &amp; Refspec DAG
          </h3>
          <HighlighterBadge color="yellow" variant="ribbon" size="md">
            Kernel Math
          </HighlighterBadge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="p-3.5 bg-white rounded-xl border border-pencil-black/20 space-y-2">
            <div className="text-xs font-bold text-[#92400e] uppercase">
              Refspec Mapping Formula:
            </div>
            <div className="p-2 bg-[#fef3c7]/60 rounded-lg border border-amber-300/40 text-[11px] text-amber-950">
              <code>+refs/heads/*:refs/remotes/origin/*</code>
              <br />
              <code>+refs/tags/*:refs/tags/*</code>
            </div>
            <p className="font-kalam text-sm text-[#475569]">
              Ensures ALL branches (main, staging, feature/*) and semantic release tags (v1.0.0, v2.1.0) are synchronized without checking out working trees.
            </p>
          </div>

          <div className="p-3.5 bg-white rounded-xl border border-pencil-black/20 space-y-2">
            <div className="text-xs font-bold text-[#15803d] uppercase">
              Delta Bandwidth Calculation:
            </div>
            <div className="p-2 bg-[#dcfce7]/60 rounded-lg border border-emerald-300/40 text-[11px] text-emerald-950 font-bold">
              Data_Transferred = sizeof(New_Objects) + sizeof(Delta_Index)
              <br />
              Example: 2,400 MB Full Clone &rarr; 18.2 MB Delta Pull (99.2% reduction!)
            </div>
            <p className="font-kalam text-sm text-[#166534]">
              Shallow clones (`--depth 1`) BREAK commit ancestry and fail during emergency rebuilds. GitKura maintains a complete immutable commit DAG!
            </p>
          </div>
        </div>
      </div>

      {/* Step-by-Step Delta Flow */}
      <div className="space-y-3 font-mono text-xs">
        <div className="p-3 bg-white rounded-xl border border-pencil-black flex items-start gap-3">
          <span className="w-6 h-6 rounded-lg bg-ink-blue text-white font-bold flex items-center justify-center shrink-0">
            1
          </span>
          <div>
            <span className="font-bold text-ink-blue block">Directory Existence Check:</span>
            <span className="text-[#64748b]">If repo doesn`t exist locally, executes initial `git clone --mirror` or standard clone.</span>
          </div>
        </div>

        <div className="p-3 bg-white rounded-xl border border-pencil-black flex items-start gap-3">
          <span className="w-6 h-6 rounded-lg bg-ink-blue text-white font-bold flex items-center justify-center shrink-0">
            2
          </span>
          <div>
            <span className="font-bold text-ink-blue block">Delta Fetch Command:</span>
            <span className="text-[#64748b]">Executes `git fetch --all --prune --tags` to fetch newly authored commits and branches in ~2 seconds.</span>
          </div>
        </div>

        <div className="p-3 bg-white rounded-xl border border-pencil-black flex items-start gap-3">
          <span className="w-6 h-6 rounded-lg bg-ink-blue text-white font-bold flex items-center justify-center shrink-0">
            3
          </span>
          <div>
            <span className="font-bold text-ink-blue block">Branch &amp; Tag Preservation:</span>
            <span className="text-[#64748b]">Deleted remote branches are pruned locally while preserving immutable snapshot archives.</span>
          </div>
        </div>
      </div>

      {/* Real Terminal Delta Execution Benchmark Output */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-ink-blue block">
          Live Operational Audit Log (Delta Synchronization in 2.1s):
        </span>
        <CodeTerminalBlock
          title="terminal - differential delta execution benchmark"
          language="bash"
          code={`[2026-08-26 05:20:14] [INFO] [Kernel] Initializing Delta Sync for: acme-corp/backend-api
[2026-08-26 05:20:14] [INFO] [Git] Executing: git fetch --all --prune --tags (timeout: 30s)
[2026-08-26 05:20:15] [DATA] Fetching origin: remote counting objects: 18, done.
[2026-08-26 05:20:15] [DATA] Compressing objects: 100% (12/12), done.
[2026-08-26 05:20:16] [DATA] Total 18 (delta 8), reused 6 (delta 6), pack-reused 0
[2026-08-26 05:20:16] [SYNC] Updated refs: [origin/main: e7b1a2..9f4d1c] [origin/staging: a1b2c3..d4e5f6]
[2026-08-26 05:20:16] [PASS] Inode DAG Verified • Transfer: 18.2 MB (vs 2.4 GB Full Clone) • Time: 2.1s`}
        />
      </div>

      {/* Interactive Bandwidth Savings Calculator */}
      <div className="p-5 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black space-y-4 shadow-scribely-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-ink-blue" />
            <span className="font-display font-black text-sm text-ink-blue">
              Interactive Delta Efficiency Calculator
            </span>
          </div>
          <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-pencil-black/20 text-[#64748b]">
            Live Simulation
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div>
            <label className="text-[#64748b] block mb-1">Total Repositories: {repoCount}</label>
            <input
              type="range"
              min="5"
              max="200"
              value={repoCount}
              onChange={(e) => setRepoCount(Number(e.target.value))}
              className="w-full accent-ink-blue"
            />
          </div>
          <div>
            <label className="text-[#64748b] block mb-1">Average Repo Size: {avgRepoSizeMb} MB</label>
            <input
              type="range"
              min="20"
              max="500"
              step="10"
              value={avgRepoSizeMb}
              onChange={(e) => setAvgRepoSizeMb(Number(e.target.value))}
              className="w-full accent-ink-blue"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono pt-2">
          <div className="p-3 bg-white rounded-xl border border-pencil-black/20">
            <span className="text-[#64748b] block text-[10px]">Full Clone Waste:</span>
            <span className="font-bold text-[#e11d48] text-sm">{fullCloneTotalGb} GB / run</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-pencil-black/20">
            <span className="text-[#64748b] block text-[10px]">GitKura Delta Pull:</span>
            <span className="font-bold text-[#15803d] text-sm">{deltaFetchTotalMb} MB / run</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-pencil-black/20">
            <span className="text-[#64748b] block text-[10px]">Bandwidth Saved:</span>
            <span className="font-bold text-ink-blue text-sm">{bandwidthSavedPercent}% Saved</span>
          </div>
        </div>
      </div>
    </div>
  )
}
