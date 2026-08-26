'use client'

import React, { useState } from 'react'
import { AlertTriangle, Search, Printer, CheckCircle2, ShieldAlert, Zap, LifeBuoy } from 'lucide-react'
import CodeTerminalBlock from '@/components/CodeTerminalBlock'
import InkanStamp from '@/components/InkanStamp'
import HighlighterBadge from '@/components/HighlighterBadge'

interface ChapterProps {
  setLightboxImg: (img: { src: string; caption: string }) => void
}

export default function Chapter11DisasterRecovery({ setLightboxImg }: ChapterProps) {
  const [drScenario, setDrScenario] = useState<'local' | 'archive' | 'relocate' | 'airgap'>('local')

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6 pt-2">
      {/* Chapter Stamp Header */}
      <div className="flex items-center justify-between border-b-2 border-dashed border-pencil-black/20 pb-3">
        <InkanStamp kanji="救" subtext="DISASTER RECOVERY" variant="red" />
        <div className="flex items-center gap-3">
          <HighlighterBadge color="yellow" variant="ribbon" size="md">
            Rescue &bull; Chapter 11
          </HighlighterBadge>
          <button
            type="button"
            onClick={handlePrint}
            className="px-3 py-1 bg-white border-2 border-pencil-black rounded-xl text-xs font-mono font-bold text-ink-blue hover:bg-yellow-50 cursor-pointer shadow-scribely-xs flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5 text-ink-blue" />
            <span>Print / PDF Runbook</span>
          </button>
        </div>
      </div>

      {/* Emergency Disaster Recovery Runbook Diagram */}
      <div className="space-y-2.5 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <HighlighterBadge color="purple" variant="ribbon" size="md">
            <span className="flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-[#7c3aed]" />
              <span>Fig 11.1 &bull; Emergency Recovery Runbook</span>
            </span>
          </HighlighterBadge>
          <HighlighterBadge color="emerald" variant="ribbon" size="md">
            RTO &lt; 30s Guaranteed
          </HighlighterBadge>
        </div>

        <div
          onClick={() =>
            setLightboxImg({
              src: '/diagrams/disaster-recovery-runbook.jpg',
              caption:
                'Figure 11.1: Emergency Disaster Recovery Runbook — 3 Proven Pathways',
            })
          }
          className="relative w-full p-2.5 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black shadow-scribely-sm cursor-zoom-in"
        >
          <img
            src="/diagrams/disaster-recovery-runbook.jpg"
            alt="Emergency Disaster Recovery Runbook"
            draggable={false}
            className="w-full h-auto max-h-[520px] object-contain rounded-xl select-none pointer-events-none mix-blend-multiply"
          />
        </div>

        <div className="pt-2 border-t-2 border-dashed border-pencil-black/15 flex items-center justify-between">
          <span className="font-kalam text-sm font-bold text-[#1a3a5f] flex items-center gap-1.5">
            <span>↳</span> 3 emergency pathways: Instant Local Tree (0s) &bull; Snapshot Extract (5s) &bull; Cloud Remote Relocate (15s)
          </span>
          <span className="font-mono text-[10px] text-ink-blue font-bold flex items-center gap-1">
            <Search className="w-3 h-3 text-ink-blue" />
            <span>Inspect Full-Res</span>
          </span>
        </div>
      </div>

      {/* Interactive Disaster Triage Decision Tree */}
      <div className="p-5 sm:p-7 bg-[#fdfbf7] rounded-3xl border-2 border-pencil-black shadow-scribely-sm space-y-4">
        <div className="border-b-2 border-dashed border-pencil-black/20 pb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-black font-display text-ink-blue">
              Interactive Disaster Recovery Triage Wizard
            </h3>
            <p className="font-caveat text-base text-[#64748b] font-bold">
              Select your incident type to get instant, battle-tested terminal remediation steps
            </p>
          </div>
          <HighlighterBadge color="rose" variant="ribbon" size="md">
            Incident Response
          </HighlighterBadge>
        </div>

        {/* 4 Scenario Selector Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 font-mono text-xs">
          {[
            { key: 'local', label: '1. GitHub Outage (0s)', sub: 'Local tree access' },
            { key: 'archive', label: '2. Upstream Deleted (5s)', sub: 'Extract .tar.gz' },
            { key: 'relocate', label: '3. Account Ban / DMCA', sub: 'Push to GitLab / Gitea' },
            { key: 'airgap', label: '4. Cold Air-Gap Boot', sub: 'Rebuild from USB' },
          ].map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setDrScenario(s.key as any)}
              className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer break-words min-w-0 ${
                drScenario === s.key
                  ? 'bg-ink-blue text-white border-pencil-black shadow-scribely-sm'
                  : 'bg-white text-ink-blue border-pencil-black/20 hover:border-pencil-black'
              }`}
            >
              <span className="font-bold block break-words">{s.label}</span>
              <span className={`text-[10px] block mt-0.5 break-words ${drScenario === s.key ? 'text-slate-300' : 'text-[#64748b]'}`}>
                {s.sub}
              </span>
            </button>
          ))}
        </div>

        {/* Scenario A Code */}
        {drScenario === 'local' && (
          <div className="space-y-2 pt-1">
            <p className="text-xs font-mono text-[#475569]">
              Your local vault already contains live, uncompressed working trees. Zero download required:
            </p>
            <CodeTerminalBlock
              title="bash - instant local workspace access (0s RTO)"
              code={`# 1. Navigate directly to local mirrored repository
cd "C:/GitKura-Vault/acme-corp/backend-api"

# 2. Check full Git status and branches
git status
git branch -a

# 3. Continue development or spin up local test runner immediately!
npm run test`}
              language="bash"
            />
          </div>
        )}

        {/* Scenario B Code */}
        {drScenario === 'archive' && (
          <div className="space-y-2 pt-1">
            <p className="text-xs font-mono text-[#475569]">
              Restoring from immutable point-in-time snapshot archives:
            </p>
            <CodeTerminalBlock
              title="bash - extract snapshot archive"
              code={`# 1. Extract snapshot archive
tar -xzf .archives/acme-corp__backend-api_2026-08-26.tar.gz

# 2. Enter extracted directory and verify refs
cd acme-corp/backend-api
git log --oneline -n 10`}
              language="bash"
            />
          </div>
        )}

        {/* Scenario C Code */}
        {drScenario === 'relocate' && (
          <div className="space-y-2 pt-1">
            <p className="text-xs font-mono text-[#475569]">
              Pushing mirrored codebase to a new remote (GitLab, Gitea, or Private Server):
            </p>
            <CodeTerminalBlock
              title="bash - emergency upstream relocation"
              code={`# 1. Enter local mirrored repository
cd "C:/GitKura-Vault/acme-corp/backend-api"

# 2. Add new emergency remote (GitLab, Self-Hosted Gitea, Bitbucket)
git remote add failover https://gitlab.com/emergency-rescue/backend-api.git

# 3. Push ALL branches and semantic tags in a single command
git push failover --all
git push failover --tags`}
              language="bash"
            />
          </div>
        )}

        {/* Scenario D Code */}
        {drScenario === 'airgap' && (
          <div className="space-y-2 pt-1">
            <p className="text-xs font-mono text-[#475569]">
              Rebuilding engineering environment on a cold air-gapped machine with zero internet connection:
            </p>
            <CodeTerminalBlock
              title="bash - air-gapped local git clone"
              code={`# 1. Mount external USB drive containing GitKura Vault
cd /media/usb-drive/GitKura-Vault/acme-corp

# 2. Clone directly from local filesystem mirror without network:
git clone ./backend-api /home/developer/workspace/backend-api

# 3. Start coding offline with 100% commit history!`}
              language="bash"
            />
          </div>
        )}
      </div>
    </div>
  )
}
