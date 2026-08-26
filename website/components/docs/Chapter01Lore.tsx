import React from 'react'
import {
  Compass,
  Search,
  AlertTriangle,
  Server,
  GitBranch,
  Shield,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Layers,
} from 'lucide-react'
import InkanStamp from '@/components/InkanStamp'
import HighlighterBadge from '@/components/HighlighterBadge'

interface ChapterProps {
  setLightboxImg: (img: { src: string; caption: string }) => void
}

export default function Chapter01Lore({ setLightboxImg }: ChapterProps) {
  return (
    <div className="space-y-6 pt-2">
      {/* Chapter Stamp Badge Header */}
      <div className="flex items-center justify-between border-b-2 border-dashed border-pencil-black/20 pb-3">
        <InkanStamp kanji="蔵" subtext="AIR-GAPPED SOVEREIGN" variant="red" />
        <HighlighterBadge color="yellow" variant="ribbon" size="md">
          Core Doctrine &bull; Chapter 01
        </HighlighterBadge>
      </div>

      <div className="space-y-4 text-sm sm:text-base font-patrick text-[#334155] leading-relaxed">
        <p className="text-lg text-ink-blue font-bold">
          In traditional Japanese architecture, a <strong>Kura (蔵)</strong> was a fortified, fireproof storehouse constructed alongside family estates. While standard residential homes were vulnerable to city-wide fires and earthquakes, the Kura shielded sacred heirlooms, family legal deeds, and vital records with multi-layered earthen walls, cedar framing, and heavy iron-reinforced locking gates.
        </p>
        <p>
          In modern software engineering, developers have surrendered code sovereignty to single cloud monopolies. When your entire engineering ecosystem lives exclusively on one remote vendor, your organization is exposed to catastrophic operational failure modes: account suspension, regional data center splits, corrupted remote refs, and silent upstream repository deletions.
        </p>
      </div>

      {/* Master Architecture Blueprint Diagram */}
      <div className="space-y-2.5 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffedd5] border-2 border-pencil-black rounded-xl shadow-scribely-sm">
            <Compass className="w-3.5 h-3.5 text-[#ea580c]" />
            <span className="text-xs font-mono font-bold text-[#9a3412] uppercase tracking-wide">
              Fig 1.1 &bull; Mirroring Engine Schematic
            </span>
          </div>
          <span className="text-xs font-mono font-bold bg-[#dcfce7] text-[#15803d] px-2.5 py-0.5 rounded-full border-2 border-pencil-black shadow-scribely-sm">
            Air-Gapped Sovereign
          </span>
        </div>

        <div
          onClick={() =>
            setLightboxImg({
              src: '/diagrams/architecture-master.jpg',
              caption:
                'Figure 1.1: GitKura (Git蔵) Mirroring Engine — Master Architectural Blueprint',
            })
          }
          className="relative w-full p-2.5 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black shadow-scribely-sm cursor-zoom-in"
        >
          <img
            src="/diagrams/architecture-master.jpg"
            alt="GitKura Master Architecture Blueprint"
            draggable={false}
            className="w-full h-auto max-h-[520px] object-contain rounded-xl select-none pointer-events-none mix-blend-multiply"
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

      {/* Threat Modeling & Sovereignty Math - Clean Paper Sketch Card */}
      <div className="p-5 sm:p-7 bg-[#fdfbf7] rounded-3xl border-2 border-pencil-black shadow-scribely-sm space-y-4 relative overflow-hidden">
        <div className="border-b-2 border-dashed border-pencil-black/20 pb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-black font-display text-ink-blue">
              Threat Modeling &amp; Code Sovereignty Formula
            </h3>
            <p className="font-caveat text-lg text-[#64748b] font-bold">
              Architectural comparison: Single Point of Failure vs Air-Gapped Dual-Mirror
            </p>
          </div>
          <span className="px-2.5 py-1 bg-white border border-pencil-black rounded-lg text-xs font-mono font-bold text-ink-blue shadow-scribely-xs">
            Sovereignty Audit
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* SPoF vs Dual Mirror Cards */}
          <div className="p-4 bg-[#fff1f2] rounded-2xl border border-pencil-black/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-black uppercase text-[#991b1b]">
                Traditional Single Point of Failure
              </span>
              <span className="font-caveat text-base text-[#ef4444] font-bold">
                1 failure = 100% lockout
              </span>
            </div>
            <div className="font-mono text-xs text-[#475569] space-y-1.5 p-2.5 bg-white rounded-xl border border-[#ef4444]/20 break-words">
              <div className="break-all">{'[Dev Workstation] → [GitHub Remote Only]'}</div>
              <div className="text-[#dc2626] font-bold">
                Risk: Automated compliance flag / Outage / Force-push
              </div>
              <div className="text-[11px] font-kalam text-[#b91c1c]">
                Result: Deployment blocked, CI/CD halted, zero raw code access!
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#f0fdf4] rounded-2xl border border-pencil-black/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-black uppercase text-[#15803d]">
                GitKura Dual-Mirror Topology
              </span>
              <span className="font-caveat text-base text-[#15803d] font-bold">
                RTO &lt; 30s &bull; RPO &lt; 1hr
              </span>
            </div>
            <div className="font-mono text-xs text-[#475569] space-y-1.5 p-2.5 bg-white rounded-xl border border-[#15803d]/20 break-words">
              <div className="break-all">{'[Dev Machine] → [Local AES-256 Vault] → [6 Multi-Cloud Targets]'}</div>
              <div className="text-[#15803d] font-bold">
                Redundancy: 1 local raw tree + 1 point-in-time tarball + 1 cloud
              </div>
              <div className="text-[11px] font-kalam text-[#166534]">
                Result: If GitHub goes down at 3 AM, cd into vault &amp; ship production immediately!
              </div>
            </div>
          </div>
        </div>

        {/* Sovereignty Math */}
        <div className="p-4 bg-[#fef3c7]/60 rounded-2xl border border-amber-300/60 flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1 min-w-0">
            <span className="text-[11px] font-mono font-bold text-amber-900 uppercase tracking-wider block">
              Sovereignty Math:
            </span>
            <p className="font-caveat text-xl sm:text-2xl text-amber-950 font-bold break-words">
              Total_Security = Local_Raw_Tree + Encrypted_Snapshots(AES_256) + Zero_SaaS_Middleman
            </p>
          </div>
          <span className="px-3 py-1 bg-white border border-pencil-black rounded-xl text-xs font-mono font-bold text-[#15803d] shadow-scribely-xs">
            100% Air-Gapped
          </span>
        </div>
      </div>

      {/* 4 Threat Vectors Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="p-4 bg-[#fff1f2] rounded-2xl border-2 border-pencil-black space-y-1.5 shadow-scribely-sm">
          <div className="flex items-center gap-2 font-display font-black text-sm text-[#9f1239]">
            <AlertTriangle className="w-4 h-4 text-[#e11d48]" />
            <span>1. Arbitrary Account Flagging</span>
          </div>
          <p className="font-mono text-xs text-[#475569] leading-relaxed">
            Automated billing disputes, compliance flags, or false-positive spam triggers can lock organization accounts with zero phone support.
          </p>
        </div>

        <div className="p-4 bg-[#fff7ed] rounded-2xl border-2 border-pencil-black space-y-1.5 shadow-scribely-sm">
          <div className="flex items-center gap-2 font-display font-black text-sm text-[#9a3412]">
            <Server className="w-4 h-4 text-[#ea580c]" />
            <span>2. Cloud Outages &amp; Network Splits</span>
          </div>
          <p className="font-mono text-xs text-[#475569] leading-relaxed">
            Data-center degradation halts CI/CD pipelines and deployment rollbacks when developers cannot clone or fetch repositories.
          </p>
        </div>

        <div className="p-4 bg-[#f0fdf4] rounded-2xl border-2 border-pencil-black space-y-1.5 shadow-scribely-sm">
          <div className="flex items-center gap-2 font-display font-black text-sm text-[#166534]">
            <GitBranch className="w-4 h-4 text-[#15803d]" />
            <span>3. Accidental Branch Deletions</span>
          </div>
          <p className="font-mono text-xs text-[#475569] leading-relaxed">
            Force-pushing (`git push -f`) over critical branches or deleting repository tags permanently alters remote commit graphs.
          </p>
        </div>

        <div className="p-4 bg-[#f0f9ff] rounded-2xl border-2 border-pencil-black space-y-1.5 shadow-scribely-sm">
          <div className="flex items-center gap-2 font-display font-black text-sm text-[#075985]">
            <Shield className="w-4 h-4 text-[#0284c7]" />
            <span>4. Loss of Code Sovereignty</span>
          </div>
          <p className="font-mono text-xs text-[#475569] leading-relaxed">
            True sovereignty means owning uncompressed raw Git packfiles and encrypted snapshots on independent physical and cloud storage.
          </p>
        </div>
      </div>

      {/* 3-2-1 Rule Callout */}
      <div className="p-5 bg-[#fdfbf7] rounded-2xl border-2 border-dashed border-pencil-black/30 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-ink-blue uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-[#15803d]" />
          <span>The 3-2-1 Backup Golden Rule in GitKura</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div className="p-3 bg-white rounded-xl border border-pencil-black/20 space-y-1">
            <span className="font-bold text-ink-blue block">3 Copies of Data</span>
            <span className="text-[#64748b]">1 Upstream + 1 Local Mirror + 1 Cloud Snapshot</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-pencil-black/20 space-y-1">
            <span className="font-bold text-ink-blue block">2 Different Formats</span>
            <span className="text-[#64748b]">Raw uncompressed Git tree + Compressed .tar.gz archive</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-pencil-black/20 space-y-1">
            <span className="font-bold text-ink-blue block">1 Off-Site Target</span>
            <span className="text-[#64748b]">Encrypted dispatch to Telegram, S3, R2, or Google Drive</span>
          </div>
        </div>
      </div>

      {/* Competitor & Alternatives Feature Comparison Matrix */}
      <div className="p-5 sm:p-7 bg-[#fdfbf7] rounded-3xl border-2 border-pencil-black shadow-scribely-sm space-y-4">
        <div className="border-b-2 border-dashed border-pencil-black/20 pb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-black font-display text-ink-blue">
              Architectural Comparison Matrix
            </h3>
            <p className="font-caveat text-lg text-[#64748b] font-bold">
              GitKura vs Traditional SaaS Backup &amp; CLI Scripts
            </p>
          </div>
          <HighlighterBadge color="emerald" variant="ribbon" size="md">
            Zero-Telemetry Benchmark
          </HighlighterBadge>
        </div>

        <div className="border-2 border-pencil-black rounded-2xl overflow-x-auto bg-white">
          <table className="w-full min-w-[600px] text-xs font-mono text-left border-collapse">
            <thead className="bg-[#f1f5f9] border-b-2 border-pencil-black text-ink-blue">
              <tr>
                <th className="p-3 border-r border-pencil-black/20">Feature / Metric</th>
                <th className="p-3 border-r border-pencil-black/20 bg-emerald-50 text-emerald-950 font-black">
                  GitKura (Git蔵)
                </th>
                <th className="p-3 border-r border-pencil-black/20">GitHub Archive</th>
                <th className="p-3 border-r border-pencil-black/20">gh CLI Scripts</th>
                <th className="p-3">Commercial SaaS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pencil-black/10 text-[#334155]">
              <tr className="hover:bg-yellow-50/50">
                <td className="p-3 font-bold border-r border-pencil-black/20">Storage Architecture</td>
                <td className="p-3 font-bold text-[#15803d] border-r border-pencil-black/20 bg-emerald-50/40">
                  Local-First Air-Gapped + Multi-Cloud
                </td>
                <td className="p-3 border-r border-pencil-black/20">Cloud VM only</td>
                <td className="p-3 border-r border-pencil-black/20">Local disk only</td>
                <td className="p-3">Vendor Cloud (SaaS lock-in)</td>
              </tr>
              <tr className="hover:bg-yellow-50/50">
                <td className="p-3 font-bold border-r border-pencil-black/20">Encryption at Rest</td>
                <td className="p-3 font-bold text-[#15803d] border-r border-pencil-black/20 bg-emerald-50/40">
                  AES-256-CBC with PBKDF2 salt
                </td>
                <td className="p-3 border-r border-pencil-black/20">None (Plaintext)</td>
                <td className="p-3 border-r border-pencil-black/20">None (Plaintext)</td>
                <td className="p-3">Vendor KMS Managed</td>
              </tr>
              <tr className="hover:bg-yellow-50/50">
                <td className="p-3 font-bold border-r border-pencil-black/20">Sync Performance</td>
                <td className="p-3 font-bold text-[#15803d] border-r border-pencil-black/20 bg-emerald-50/40">
                  Differential Delta Sync (~2s)
                </td>
                <td className="p-3 border-r border-pencil-black/20">Full Clone (~20min)</td>
                <td className="p-3 border-r border-pencil-black/20">Full Clone (~20min)</td>
                <td className="p-3">Variable Webhook Sync</td>
              </tr>
              <tr className="hover:bg-yellow-50/50">
                <td className="p-3 font-bold border-r border-pencil-black/20">Multi-Cloud Targets</td>
                <td className="p-3 font-bold text-[#15803d] border-r border-pencil-black/20 bg-emerald-50/40">
                  6 Targets (Telegram, GDrive, S3, R2, MinIO, Wasabi)
                </td>
                <td className="p-3 border-r border-pencil-black/20">Single S3 / Azure</td>
                <td className="p-3 border-r border-pencil-black/20">None (Manual rsync)</td>
                <td className="p-3">Proprietary S3 Only</td>
              </tr>
              <tr className="hover:bg-yellow-50/50">
                <td className="p-3 font-bold border-r border-pencil-black/20">Idle Memory Footprint</td>
                <td className="p-3 font-bold text-[#15803d] border-r border-pencil-black/20 bg-emerald-50/40">
                  ~32.4 MB RAM (Tray Daemon)
                </td>
                <td className="p-3 border-r border-pencil-black/20">&gt; 512 MB (Server VM)</td>
                <td className="p-3 border-r border-pencil-black/20">N/A (Transient process)</td>
                <td className="p-3">Web browser tab (~200MB)</td>
              </tr>
              <tr className="hover:bg-yellow-50/50">
                <td className="p-3 font-bold border-r border-pencil-black/20">Telemetry &amp; Tracking</td>
                <td className="p-3 font-bold text-[#15803d] border-r border-pencil-black/20 bg-emerald-50/40">
                  0% (Zero analytics, 100% Offline)
                </td>
                <td className="p-3 border-r border-pencil-black/20">Cloud Logs Tracked</td>
                <td className="p-3 border-r border-pencil-black/20">gh usage telemetry</td>
                <td className="p-3">Continuous user tracking</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
