'use client'

import {
  FolderTree,
  FileArchive,
  Share2,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'
import WashiTape from './WashiTape'

const recoveryScenarios = [
  {
    id: 'outage',
    title: '1. Major Cloud Outage (Zero Downtime Access)',
    badge: 'Immediate Local Access',
    problem:
      'GitHub or your cloud host suffers an unexpected global outage or network partition right before a critical deployment deadline.',
    solution:
      'Because GitKura keeps a living, uncompressed local Git mirror on your drive, your developers can immediately cd into the local vault repository. All branches, commit trees, and tags are ready to review, test, build, and deploy without waiting for upstream servers to recover.',
    benefit: 'Zero minutes lost waiting for cloud vendors to restore service.',
    icon: FolderTree,
    tapeVariant: 'green' as const,
  },
  {
    id: 'corruption',
    title: '2. Accidental Branch Deletion & Force-Push Rollbacks',
    badge: 'Point-in-Time Restore',
    problem:
      'A team member accidentally force-pushes over a production branch, or an automated script wipes repository history upstream.',
    solution:
      'Every synchronization run creates standalone, verified `.tar.gz` and `.zip` point-in-time snapshots stored in your local `.archives/` folder and replicated to your Telegram / S3 cloud storage. Simply unpack the snapshot from any historical date to restore your exact repository state.',
    benefit: 'Instantly roll back any repository to any verified point-in-time snapshot.',
    icon: FileArchive,
    tapeVariant: 'yellow' as const,
  },
  {
    id: 'evacuation',
    title: '3. Instant Migration to GitLab, Bitbucket or Self-Hosted Gitea',
    badge: 'Total Cloud Sovereignty',
    problem:
      'Your GitHub organization account is unexpectedly suspended, flagged for billing review, or your enterprise decides to migrate to private infrastructure.',
    solution:
      'Unlike shallow zip downloaders, GitKura preserves 100% of your Git refs, commit trees, and tags. You can re-point the remote origin URL to a new GitLab, Bitbucket, or private on-premise Gitea server and push your entire multi-year repository history in seconds.',
    benefit: 'Never get locked into any single cloud platform or proprietary ecosystem.',
    icon: Share2,
    tapeVariant: 'rose' as const,
  },
]

export default function DisasterRecovery() {
  return (
    <section id="recovery" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-rose-50/90 border-2 border-pencil-black shadow-scribely-sm rounded-full -rotate-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626] animate-pulse" />
          <span className="font-caveat font-bold text-lg text-rose-950">
            disaster recovery &amp; restoration playbook
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-marker uppercase leading-[1.25] text-[#17365D] tracking-tight">
          HOW TO RESTORE CODE WHEN{' '}
          <span className="relative inline-block text-[#E9A51A] sm:whitespace-nowrap">
            DISASTER STRIKES.
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
        <p className="font-kalam text-xl text-[#64748b] font-bold">
          Three proven recovery pathways engineered so your development team never experiences downtime or data loss.
        </p>
      </div>

      {/* 3 Scenario Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {recoveryScenarios.map((scenario) => {
          const Icon = scenario.icon
          return (
            <div
              key={scenario.id}
              className="scribely-card p-6 sm:p-8 bg-white shadow-scribely-lg relative flex flex-col justify-between"
            >
              <WashiTape variant={scenario.tapeVariant} className="-top-3 left-8" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-[#faf8f5] border-2 border-pencil-black shadow-scribely-sm flex items-center justify-center text-ink-blue">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-[#faf8f5] text-ink-blue px-2.5 py-1 rounded-lg border border-pencil-black">
                    {scenario.badge}
                  </span>
                </div>

                <h3 className="text-xl font-black font-display text-ink-blue leading-snug">
                  {scenario.title}
                </h3>

                <div className="p-3.5 bg-[#fff7ed] rounded-xl border border-pencil-black/20 text-xs">
                  <span className="font-bold text-[#c2410c] block mb-1">When this happens:</span>
                  <p className="text-[#7c2d12] font-sans leading-relaxed">{scenario.problem}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748b]">
                    How GitKura Resolves It:
                  </span>
                  <p className="font-kalam text-sm text-[#475569] leading-relaxed font-bold">
                    {scenario.solution}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t-2 border-dashed border-pencil-black/15 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#15803d] flex-shrink-0" />
                <span className="font-gaegu text-base font-bold text-[#15803d]">{scenario.benefit}</span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
