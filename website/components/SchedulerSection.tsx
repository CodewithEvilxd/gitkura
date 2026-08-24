'use client'

import {
  Clock,
  Cpu,
  CheckCircle2,
  Bell,
  HardDrive,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react'
import WashiTape from './WashiTape'

const daemonFeatures = [
  {
    title: 'Silent Background Automation',
    subtitle: 'Automated node-cron scheduling',
    description:
      'Configure your synchronization schedule once (daily, weekly, or custom hours), and GitKura quietly runs in the background, updating all your repositories and snapshots without interrupting your active development flow.',
    badge: 'Set & Forget',
    icon: Clock,
    tapeVariant: 'purple' as const,
  },
  {
    title: 'Ultra-Light System Tray Daemon',
    subtitle: 'Under 35MB of RAM footprint',
    description:
      'When minimized, GitKura lives silently in your macOS menu bar or Windows notification area. It consumes negligible memory and CPU, waking up only to execute scheduled differential pulls and cloud snapshots.',
    badge: 'Lightweight',
    icon: Cpu,
    tapeVariant: 'blue' as const,
  },
  {
    title: 'Intelligent Thread Concurrency',
    subtitle: 'Parallel worker throttling with p-limit',
    description:
      'Syncing 50+ repositories at once? GitKura uses intelligent parallel queue workers that fetch delta commits concurrently while respecting GitHub API secondary rate limits and network bandwidth.',
    badge: 'Smart Queues',
    icon: Layers,
    tapeVariant: 'green' as const,
  },
  {
    title: 'Real-Time Telegram & Desktop Alerts',
    subtitle: 'Instant mobile backup verification',
    description:
      'Whenever a scheduled backup finishes, GitKura can dispatch a detailed summary directly to your private Telegram channel with repository file sizes, branch counts, and timestamps so you know your code is safe.',
    badge: 'Instant Alerts',
    icon: Bell,
    tapeVariant: 'yellow' as const,
  },
]

export default function SchedulerSection() {
  return (
    <section id="scheduler" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-purple-50/90 border-2 border-pencil-black shadow-scribely-sm rounded-full -rotate-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6] animate-pulse" />
          <span className="font-caveat font-bold text-lg text-purple-950">
            background automation daemon
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-marker uppercase leading-[1.25] text-[#17365D] tracking-tight">
          UNATTENDED{' '}
          <span className="relative inline-block text-[#E9A51A] whitespace-nowrap">
            BACKGROUND PROTECTION.
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
          GitKura stands guard in your system tray, backing up your repositories quietly on your schedule.
        </p>
      </div>

      {/* 4 Background Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {daemonFeatures.map((feat, idx) => {
          const Icon = feat.icon
          return (
            <div
              key={idx}
              className="scribely-card p-6 sm:p-8 bg-white shadow-scribely-lg relative flex flex-col justify-between"
            >
              <WashiTape variant={feat.tapeVariant} className="-top-3 right-8" />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-[#faf8f5] border-2 border-pencil-black shadow-scribely-sm flex items-center justify-center text-ink-blue">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-gaegu font-bold bg-[#faf8f5] text-ink-blue px-2.5 py-1 rounded-lg border border-pencil-black">
                    {feat.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-black font-display text-ink-blue">
                    {feat.title}
                  </h3>
                  <p className="font-architects text-xs font-bold text-[#64748b] mt-0.5">
                    {feat.subtitle}
                  </p>
                </div>

                <p className="font-patrick text-sm text-[#475569] leading-relaxed font-medium">
                  {feat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t-2 border-dashed border-pencil-black/15 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#15803d] flex-shrink-0" />
                <span className="font-gaegu text-base font-bold text-[#15803d]">Zero configuration required after initial setup</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Cute Bottom Note */}
      <div className="mt-8 text-center">
        <span className="font-gaegu text-lg sm:text-xl font-bold text-purple-900 bg-purple-100/60 px-5 py-1.5 rounded-full border border-purple-300 inline-flex items-center gap-1.5 shadow-sm -rotate-0.5">
          Silent background daemon consumes under 35MB RAM!
        </span>
      </div>
    </section>
  )
}
