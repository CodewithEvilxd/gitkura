'use client'

import { useState, useEffect, useRef } from 'react'
import anime from 'animejs'
import {
  AlertTriangle,
  FolderGit2,
  Package,
  Send,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react'

interface StoryScene {
  id: number
  badge: string
  title: string
  subtitle: string
  problemTitle: string
  problemText: string
  solutionTitle: string
  solutionText: string
  keyTakeaway: string
  color: string
  bgColor: string
  tapeClass: string
  icon: any
}

const scenes: StoryScene[] = [
  {
    id: 1,
    badge: 'ACT 01 &bull; THE CLOUD FRAGILITY TRAP',
    title: 'The Single-Point-of-Failure Risk',
    subtitle: 'Relying 100% on a single cloud vendor leaves your engineering team exposed.',
    problemTitle: 'The Real Threat:',
    problemText:
      'Account billing flags, automated DMCA suspensions, upstream DDoS outages, and rogue force-pushes happen every week. When GitHub or GitLab goes down, your developers are blocked from shipping code, reviewing PRs, and running deployments.',
    solutionTitle: 'The GitKura Solution:',
    solutionText:
      'GitKura creates an autonomous, air-gapped local mirror on your machine. You always hold the complete source code, refs, and history on hardware you physically own.',
    keyTakeaway: 'Zero reliance on upstream vendor availability.',
    color: 'text-[#dc2626]',
    bgColor: 'bg-[#fee2e2]/50',
    tapeClass: 'washi-tape-rose',
    icon: AlertTriangle,
  },
  {
    id: 2,
    badge: 'ACT 02 &bull; DIFFERENTIAL GIT MIRRORING',
    title: 'Smart Incremental Synchronization',
    subtitle: 'Mirror all remote branches and commits without burning bandwidth.',
    problemTitle: 'Why Naive Clones Fail:',
    problemText:
      'Traditional backup scripts run `git clone --mirror` from scratch every hour. On 500MB+ repositories, this exhausts your data quota, slows down syncs to a crawl, and quickly triggers GitHub API rate-limits.',
    solutionTitle: 'How SimpleGit Differential Works:',
    solutionText:
      'On the first run, GitKura creates a full mirror. On every subsequent run, it executes an atomic `git fetch --all --prune --tags` that downloads only changed commit deltas and new branch heads in 2 to 4 seconds.',
    keyTakeaway: 'Over 90% bandwidth and storage saved on every run.',
    color: 'text-ink-blue',
    bgColor: 'bg-[#dbeafe]/50',
    tapeClass: 'washi-tape-blue',
    icon: FolderGit2,
  },
  {
    id: 3,
    badge: 'ACT 03 &bull; POINT-IN-TIME ARCHIVES',
    title: 'Atomic Snapshot Packaging',
    subtitle: 'Clean, standalone compressed archives with atomic rename integrity guards.',
    problemTitle: 'The Silent Corruption Danger:',
    problemText:
      'If a backup process is interrupted halfway through, partially written files can silently corrupt your backup archives, leaving you stranded during a disaster.',
    solutionTitle: 'Atomic Temp-Swap Safety:',
    solutionText:
      'GitKura bundles the entire repository tree into standalone `.tar.gz` and universal `.zip` snapshots. Files are written to temporary `.tmp` buffers first and only swapped to final filenames once SHA-256 compression is 100% verified.',
    keyTakeaway: 'Every snapshot in your vault is guaranteed pristine and self-contained.',
    color: 'text-[#854d0e]',
    bgColor: 'bg-[#fef9c3]/50',
    tapeClass: 'washi-tape',
    icon: Package,
  },
  {
    id: 4,
    badge: 'ACT 04 &bull; MULTI-DESTINATION REPLICATION',
    title: 'Zero-Egress Multi-Cloud Dispatch',
    subtitle: 'Broadcast snapshots across private Telegram channels, Google Drive, AWS S3, and MinIO.',
    problemTitle: 'Local-Only Storage Risk:',
    problemText:
      'Keeping backups solely on a single laptop leaves you vulnerable if the machine is lost, stolen, or hardware fails.',
    solutionTitle: 'Parallel Cloud Replication:',
    solutionText:
      'GitKura replicates your verified snapshots across up to 6 cloud targets simultaneously. Get instant code snapshot deliveries directly on your phone via Telegram, or stream to AWS S3, Google Drive, Cloudflare R2, and private MinIO clusters.',
    keyTakeaway: 'Total redundancy across local disks and multiple cloud providers.',
    color: 'text-[#15803d]',
    bgColor: 'bg-[#dcfce7]/50',
    tapeClass: 'washi-tape-green',
    icon: Send,
  },
]

export default function ScrollStory() {
  const [activeScene, setActiveScene] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneCardRef = useRef<HTMLDivElement>(null)

  // lets-scroll sticky scrub listener
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const totalScrollable = rect.height - window.innerHeight
      if (totalScrollable <= 0) return

      const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1)
      setScrollProgress(Math.round(progress * 100))

      const targetScene = Math.min(Math.floor(progress * scenes.length), scenes.length - 1)
      if (targetScene !== activeScene) {
        setActiveScene(targetScene)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeScene])

  useEffect(() => {
    if (sceneCardRef.current) {
      anime({
        targets: sceneCardRef.current,
        opacity: [0.5, 1],
        translateY: [10, 0],
        duration: 350,
        easing: 'easeOutQuad',
      })
    }
  }, [activeScene])

  const current = scenes[activeScene]
  const Icon = current.icon

  return (
    <section ref={containerRef} id="story" className="relative min-h-[220vh] py-16 px-4 sm:px-8">
      {/* Sticky Viewport Stage (lets-scroll pinned camera) */}
      <div className="sticky top-20 max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-indigo-50/90 border-2 border-pencil-black shadow-scribely-sm rounded-full -rotate-1">
            <span className="w-2.5 h-2.5 rounded-full bg-ink-blue animate-pulse" />
            <span className="font-caveat font-bold text-lg text-indigo-950">
              the gitkura chronicles &bull; 4-act journey
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-marker uppercase leading-[1.25] text-[#17365D] tracking-tight">
            HOW GITKURA{' '}
            <span className="relative inline-block text-[#E9A51A] whitespace-nowrap">
              SECURES YOUR CODEBASE.
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
          <p className="font-patrick text-xl text-[#64748b] font-medium">
            Scroll down to explore the 4-act journey from single-cloud vulnerability to complete code sovereignty.
          </p>

          {/* Timeline Gauge */}
          <div className="max-w-md mx-auto pt-2">
            <div className="flex justify-between text-[11px] font-mono font-bold text-ink-blue mb-1">
              <span>Timeline Progress:</span>
              <span>Act 0{activeScene + 1} of 04 ({scrollProgress}%)</span>
            </div>
            <div className="h-2 bg-white rounded-full border-2 border-pencil-black overflow-hidden shadow-2xs">
              <div
                className="h-full bg-highlighter-yellow transition-all duration-150"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Step Navigator Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
          {scenes.map((s, idx) => {
            const isSelected = activeScene === idx
            const StepIcon = s.icon
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveScene(idx)}
                className={`p-3.5 rounded-2xl border-2 transition-all text-left relative cursor-pointer ${
                  isSelected
                    ? 'bg-white border-pencil-black shadow-scribely -rotate-0.5'
                    : 'bg-[#faf8f5] border-pencil-black/25 hover:border-pencil-black hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-[#64748b]">0{s.id}</span>
                  <StepIcon className={`w-4 h-4 ${isSelected ? s.color : 'text-[#64748b]'}`} />
                </div>
                <p className="text-xs font-black font-display text-ink-blue truncate">{s.title}</p>
              </button>
            )
          })}
        </div>

        {/* Main Active Scene Card */}
        <div ref={sceneCardRef} className="max-w-5xl mx-auto relative">
          <div className={`${current.tapeClass} -top-3 left-12 -rotate-1`} />

          <div className="scribely-card p-6 sm:p-10 bg-white shadow-scribely-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-dashed border-pencil-black/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#faf8f5] border-2 border-pencil-black shadow-scribely-sm flex items-center justify-center text-ink-blue -rotate-1">
                  <Icon className={`w-5 h-5 ${current.color}`} />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-[#64748b] block">{current.badge}</span>
                  <h3 className="text-xl sm:text-2xl font-black font-display text-ink-blue">
                    {current.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveScene((prev) => (prev > 0 ? prev - 1 : scenes.length - 1))}
                  className="px-3 py-1.5 bg-[#faf8f5] hover:bg-white text-pencil-black scribely-btn rounded-xl text-xs font-bold font-display cursor-pointer"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() => setActiveScene((prev) => (prev < scenes.length - 1 ? prev + 1 : 0))}
                  className="px-4 py-1.5 bg-ink-blue hover:bg-ink-hover text-white scribely-btn rounded-xl text-xs font-bold font-display flex items-center gap-1 cursor-pointer"
                >
                  <span>Next Act</span>
                  <ArrowRight className="w-3 h-3 text-highlighter-yellow" />
                </button>
              </div>
            </div>

            <p className="font-architects text-lg sm:text-xl text-ink-blue font-bold">
              &ldquo;{current.subtitle}&rdquo;
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Problem Breakdown */}
              <div className="p-5 rounded-2xl border-2 border-pencil-black bg-[#fee2e2]/40 space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-[#991b1b]">{current.problemTitle}</span>
                <p className="font-sans text-sm text-[#475569] leading-relaxed font-normal">
                  {current.problemText}
                </p>
              </div>

              {/* Solution Breakdown */}
              <div className="p-5 rounded-2xl border-2 border-pencil-black bg-[#dcfce7]/40 space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-[#15803d]">{current.solutionTitle}</span>
                <p className="font-kalam text-sm sm:text-base text-[#166534] leading-relaxed font-bold">
                  {current.solutionText}
                </p>
              </div>
            </div>

            {/* Key Takeaway Strip */}
            <div className="p-3.5 bg-[#faf8f5] rounded-xl border-2 border-pencil-black flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#15803d] flex-shrink-0" />
              <span className="font-gaegu text-base sm:text-lg font-bold text-ink-blue">
                <strong className="text-[#15803d]">Key Advantage:</strong> {current.keyTakeaway}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
