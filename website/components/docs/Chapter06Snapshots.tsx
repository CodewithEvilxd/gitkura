'use client'

import React, { useState, useMemo } from 'react'
import { FileCheck, Binary, Layers, Archive, HardDrive, CheckCircle2 } from 'lucide-react'
import CodeTerminalBlock from '@/components/CodeTerminalBlock'
import InkanStamp from '@/components/InkanStamp'
import HighlighterBadge from '@/components/HighlighterBadge'

export default function Chapter06Snapshots() {
  const [dailyRetention, setDailyRetention] = useState(7)
  const [weeklyRetention, setWeeklyRetention] = useState(4)
  const [monthlyRetention, setMonthlyRetention] = useState(12)
  const [snapshotSizeMb, setSnapshotSizeMb] = useState(45)

  const totalSnapshots = dailyRetention + weeklyRetention + monthlyRetention
  const totalDiskUsedGb = ((totalSnapshots * snapshotSizeMb) / 1024).toFixed(2)

  return (
    <div className="space-y-6 pt-2">
      {/* Chapter Stamp Header */}
      <div className="flex items-center justify-between border-b-2 border-dashed border-pencil-black/20 pb-3">
        <InkanStamp kanji="圧" subtext="ATOMIC SNAPSHOTS" variant="navy" />
        <HighlighterBadge color="yellow" variant="ribbon" size="md">
          Packaging &bull; Chapter 06
        </HighlighterBadge>
      </div>

      <div className="space-y-3 font-patrick text-base text-[#334155] leading-relaxed">
        <p>
          While live mirrored working trees are ideal for immediate disaster recovery, multi-cloud replication requires self-contained, point-in-time snapshot bundles.
        </p>
        <p>
          GitKura streams compressed `.tar.gz` and `.zip` archives directly from disk inodes using <strong>Atomic Write Guards</strong>. In addition, every archive generates a cryptographic SHA-256 digest to ensure that network corruption or bit rot is detected before remote dispatch.
        </p>
      </div>

      {/* 3 Integrity Guards Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
        <div className="p-4 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black space-y-1 shadow-scribely-xs">
          <div className="flex items-center gap-2 font-display font-black text-ink-blue text-sm">
            <FileCheck className="w-4 h-4 text-purple-600" />
            <span>1. Atomic Temp Swap</span>
          </div>
          <p className="text-[#64748b]">
            Writes to `.archive.tar.gz.tmp` first and swaps atomically upon compression success.
          </p>
        </div>

        <div className="p-4 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black space-y-1 shadow-scribely-xs">
          <div className="flex items-center gap-2 font-display font-black text-ink-blue text-sm">
            <Binary className="w-4 h-4 text-blue-600" />
            <span>2. SHA-256 Checksum</span>
          </div>
          <p className="text-[#64748b]">
            Computes cryptographic hash to verify archive integrity before cloud dispatch.
          </p>
        </div>

        <div className="p-4 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black space-y-1 shadow-scribely-xs">
          <div className="flex items-center gap-2 font-display font-black text-ink-blue text-sm">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>3. Immutable Point-in-Time</span>
          </div>
          <p className="text-[#64748b]">
            Each archive is standalone and self-contained with complete git refs and tags.
          </p>
        </div>
      </div>

      {/* Atomic Snapshot Lifecycle Note */}
      <div className="p-5 bg-[#fdfbf7] rounded-3xl border-2 border-pencil-black shadow-scribely-sm space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between border-b-2 border-dashed border-pencil-black/20 pb-3">
          <span className="font-display font-black text-ink-blue text-sm">
            Atomic Inode Swap &amp; SHA-256 Verification Flow
          </span>
          <HighlighterBadge color="purple" variant="ribbon" size="sm">
            POSIX Atomic rename()
          </HighlighterBadge>
        </div>

        <div className="space-y-2 text-[#475569]">
          <div className="p-3 bg-white rounded-xl border border-pencil-black/10 flex items-start sm:items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5 sm:mt-0">A</span>
            <span className="break-all">Stream raw repo files &rarr; <code className="bg-slate-100 px-1 py-0.5 rounded text-ink-blue">.archives/owner__repo_2026-08-26.tar.gz.tmp</code></span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-pencil-black/10 flex items-start sm:items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5 sm:mt-0">B</span>
            <span className="break-all">Compute SHA-256 stream hash: <code className="bg-slate-100 px-1 py-0.5 rounded text-ink-blue">H = sha256(byte_stream)</code></span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-pencil-black/10 flex items-start sm:items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5 sm:mt-0">C</span>
            <span className="break-all">On stream finish &rarr; Atomic swap <code className="bg-slate-100 px-1 py-0.5 rounded text-ink-blue">rename(.tmp, .tar.gz)</code> + write <code className="bg-slate-100 px-1 py-0.5 rounded text-ink-blue">.sha256</code></span>
          </div>
        </div>
        <p className="font-kalam text-sm text-[#6b21a8]">
          ↳ If power is lost or laptop lid closes mid-backup, no half-written `.tar.gz` will ever contaminate your vault!
        </p>
      </div>

      {/* GFS Retention & Pruning Strategy Calculator */}
      <div className="p-5 sm:p-7 bg-[#fdfbf7] rounded-3xl border-2 border-pencil-black shadow-scribely-sm space-y-4">
        <div className="border-b-2 border-dashed border-pencil-black/20 pb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-black font-display text-ink-blue">
              Grandfather-Father-Son (GFS) Snapshot Retention
            </h3>
            <p className="font-caveat text-base text-[#64748b] font-bold">
              Automated lifecycle pruning keeps disk space bounded while maintaining historical recovery depth
            </p>
          </div>
          <HighlighterBadge color="purple" variant="ribbon" size="md">
            {totalSnapshots} Archives &bull; {totalDiskUsedGb} GB Total
          </HighlighterBadge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-3 bg-white rounded-xl border border-pencil-black/20 space-y-1">
            <label className="text-[#64748b] block text-[11px]">Daily Archives to Keep: {dailyRetention}</label>
            <input
              type="range"
              min="1"
              max="30"
              value={dailyRetention}
              onChange={(e) => setDailyRetention(Number(e.target.value))}
              className="w-full accent-ink-blue"
            />
            <span className="text-[10px] text-[#64748b] block">Recent 7-day point-in-time history</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-pencil-black/20 space-y-1">
            <label className="text-[#64748b] block text-[11px]">Weekly Archives to Keep: {weeklyRetention}</label>
            <input
              type="range"
              min="1"
              max="12"
              value={weeklyRetention}
              onChange={(e) => setWeeklyRetention(Number(e.target.value))}
              className="w-full accent-ink-blue"
            />
            <span className="text-[10px] text-[#64748b] block">Sunday weekly milestone backups</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-pencil-black/20 space-y-1">
            <label className="text-[#64748b] block text-[11px]">Monthly Archives to Keep: {monthlyRetention}</label>
            <input
              type="range"
              min="1"
              max="24"
              value={monthlyRetention}
              onChange={(e) => setMonthlyRetention(Number(e.target.value))}
              className="w-full accent-ink-blue"
            />
            <span className="text-[10px] text-[#64748b] block">1st of month long-term archives</span>
          </div>
        </div>
      </div>

      {/* Manual SHA-256 Verification Terminal */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-ink-blue block">
          Manual Checksum Integrity Verification (CLI):
        </span>
        <CodeTerminalBlock
          title="bash - verify tarball sha256 checksum"
          language="bash"
          code={`# 1. Generate sha256 checksum file alongside snapshot
sha256sum owner__repo_2026-08-26.tar.gz > owner__repo_2026-08-26.tar.gz.sha256

# 2. Verify archive integrity after downloading from cloud
sha256sum -c owner__repo_2026-08-26.tar.gz.sha256
# Output: owner__repo_2026-08-26.tar.gz: OK`}
        />
      </div>

      {/* Vault Storage Layout Code Box */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-ink-blue block">
          Vault Storage Directory Tree on Local Hard Drive:
        </span>
        <CodeTerminalBlock
          title="vault-tree-layout"
          code={`/Vault-Root/
├── .archives/                          # Point-in-time standalone archives
│   ├── octocat__repo-one_2026-08-26.tar.gz       # Compressed snapshot (tar.gz)
│   └── acme-corp__backend-api_2026-08-26.tar.gz
├── octocat/                            # User workspace
│   └── repo-one/                       # Live uncompressed Git working tree
│       ├── .git/                       # Full Git objects, refs, tags
│       └── src/
└── acme-corp/                          # Organization workspace
    └── backend-api/`}
          language="bash"
        />
      </div>

      {/* Compression Code Block */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-ink-blue block">
          Atomic GZIP Compression Pipeline (compress.service.ts):
        </span>
        <CodeTerminalBlock
          title="compress.service.ts"
          language="typescript"
          code={`import * as tar from 'tar'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

export async function createImmutableSnapshot(repoPath: string, archiveDest: string): Promise<{ path: string; hash: string }> {
  const tempPath = \`\${archiveDest}.tmp\`
  
  // 1. Pack directory to temporary archive
  await tar.create(
    {
      gzip: true,
      file: tempPath,
      cwd: path.dirname(repoPath),
    },
    [path.basename(repoPath)]
  )

  // 2. Perform atomic filesystem rename
  await fs.promises.rename(tempPath, archiveDest)

  // 3. Compute SHA-256 Checksum
  const fileBuffer = await fs.promises.readFile(archiveDest)
  const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex')

  return { path: archiveDest, hash }
}`}
        />
      </div>
    </div>
  )
}
