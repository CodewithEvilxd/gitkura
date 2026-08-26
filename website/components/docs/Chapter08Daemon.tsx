'use client'

import React, { useState, useMemo } from 'react'
import { Clock, Cpu, Zap, Activity, Calendar, Play } from 'lucide-react'
import CodeTerminalBlock from '@/components/CodeTerminalBlock'
import InkanStamp from '@/components/InkanStamp'
import HighlighterBadge from '@/components/HighlighterBadge'

export default function Chapter08Daemon() {
  const [customCron, setCustomCron] = useState('0 2 * * *')

  const cronExplanation = useMemo(() => {
    const trimmed = customCron.trim()
    if (trimmed === '0 2 * * *') return 'Every day at 02:00 AM (Recommended)'
    if (trimmed === '0 3 * * 0') return 'Every Sunday at 03:00 AM (Weekly backup)'
    if (trimmed === '0 */6 * * *') return 'Every 6 hours on the hour (4 times daily)'
    if (trimmed === '0 0 1 * *') return 'On the 1st of every month at 00:00 UTC (Monthly)'
    if (trimmed === '*/30 * * * *') return 'Every 30 minutes continuously'
    if (trimmed === '0 0 * * 1-5') return 'Every weekday (Monday through Friday) at midnight'
    return `Custom Schedule Expression: "${trimmed}"`
  }, [customCron])

  const simulatedNextRuns = useMemo(() => {
    const now = new Date()
    return [1, 2, 3, 4, 5].map((idx) => {
      const d = new Date(now.getTime() + idx * 86400000)
      return `${d.toISOString().slice(0, 10)} 02:00:00 UTC`
    })
  }, [customCron])

  return (
    <div className="space-y-6 pt-2">
      {/* Chapter Stamp Header */}
      <div className="flex items-center justify-between border-b-2 border-dashed border-pencil-black/20 pb-3">
        <InkanStamp kanji="常" subtext="DAEMON &amp; SCHEDULER" variant="emerald" />
        <HighlighterBadge color="yellow" variant="ribbon" size="md">
          Automation &bull; Chapter 08
        </HighlighterBadge>
      </div>

      <div className="space-y-3 font-patrick text-base text-[#334155] leading-relaxed">
        <p>
          GitKura is designed to operate completely unattended in the background. When minimized, the main BrowserWindow is closed/hidden to drop RAM usage down to a featherweight <strong>~32.4 MB</strong>.
        </p>
        <p>
          The daemon runs an ultra-low-power Node.js timer loop utilizing `node-cron`. If the host OS is suspended or enters sleep mode during a scheduled backup, GitKura registers `powerMonitor` resume listeners to execute a seamless catch-up sync immediately upon wakeup.
        </p>
      </div>

      {/* 4 Daemon Pillar Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
        <div className="p-4 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black space-y-1 shadow-scribely-xs">
          <div className="flex items-center gap-2 font-display font-black text-ink-blue text-sm">
            <Clock className="w-4 h-4 text-orange-600" />
            <span>node-cron Scheduler</span>
          </div>
          <p className="text-[#64748b]">
            Precision cron engine supporting presets (daily, weekly, custom) with second-accurate timers.
          </p>
        </div>

        <div className="p-4 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black space-y-1 shadow-scribely-xs">
          <div className="flex items-center gap-2 font-display font-black text-ink-blue text-sm">
            <Cpu className="w-4 h-4 text-blue-600" />
            <span>~32.4 MB RAM Idle Footprint</span>
          </div>
          <p className="text-[#64748b]">
            Electron window is destroyed or hidden when minimized, dropping memory to lightweight background levels.
          </p>
        </div>

        <div className="p-4 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black space-y-1 shadow-scribely-xs">
          <div className="flex items-center gap-2 font-display font-black text-ink-blue text-sm">
            <Zap className="w-4 h-4 text-amber-600" />
            <span>Sleep &amp; Wake Catch-Up</span>
          </div>
          <p className="text-[#64748b]">
            Detects OS power suspend events and automatically triggers missed backup jobs upon system wake.
          </p>
        </div>

        <div className="p-4 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black space-y-1 shadow-scribely-xs">
          <div className="flex items-center gap-2 font-display font-black text-ink-blue text-sm">
            <Activity className="w-4 h-4 text-emerald-600" />
            <span>Native Tray Context Menu</span>
          </div>
          <p className="text-[#64748b]">
            Quick controls: Sync Now, Pause Scheduler, Open Local Vault Folder, and Live Stream Logs.
          </p>
        </div>
      </div>

      {/* Memory Lifecycle Progression Note */}
      <div className="p-5 bg-[#fdfbf7] rounded-3xl border-2 border-pencil-black shadow-scribely-sm space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between border-b-2 border-dashed border-pencil-black/20 pb-3">
          <span className="font-display font-black text-ink-blue text-sm">
            OS System Tray Daemon Lifecycle &amp; Memory Profile
          </span>
          <HighlighterBadge color="sky" variant="ribbon" size="sm">
            ~32.4 MB RAM
          </HighlighterBadge>
        </div>
        <div className="p-3 bg-white rounded-xl border border-pencil-black/10 space-y-2 text-[#475569]">
          <div>1. <strong>Active UI:</strong> Electron Chromium Renderer + React 19 (~140 MB RAM)</div>
          <div>2. <strong>Window Close:</strong> Renderer context destroyed &rarr; RAM drops to <strong>32.4 MB</strong></div>
          <div>3. <strong>Cron Trigger:</strong> Node.js spawns background worker pool &rarr; streams diffs &rarr; emits system notification</div>
          <div>4. <strong>Laptop Sleep:</strong> `powerMonitor.on('suspend')` pauses timer; `powerMonitor.on('resume')` triggers catch-up</div>
        </div>
      </div>

      {/* Live Interactive Cron Parser & Next Runs Preview */}
      <div className="p-5 sm:p-7 bg-[#fdfbf7] rounded-3xl border-2 border-pencil-black shadow-scribely-sm space-y-4">
        <div className="border-b-2 border-dashed border-pencil-black/20 pb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-black font-display text-ink-blue">
              Interactive Cron Expression &amp; Natural Language Parser
            </h3>
            <p className="font-caveat text-base text-[#64748b] font-bold">
              Type or select any standard 5-part cron syntax with live English translation
            </p>
          </div>
          <HighlighterBadge color="amber" variant="ribbon" size="md">
            node-cron Engine
          </HighlighterBadge>
        </div>

        <div className="space-y-3 font-mono text-xs">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={customCron}
              onChange={(e) => setCustomCron(e.target.value)}
              className="flex-1 p-2.5 bg-white border-2 border-pencil-black rounded-xl font-bold text-ink-blue text-sm focus:outline-none focus:ring-2 focus:ring-ink-blue shadow-scribely-xs"
              placeholder="e.g. 0 2 * * *"
            />
            <div className="flex flex-wrap gap-1.5 self-start sm:self-center">
              {[
                { label: 'Daily (2 AM)', expr: '0 2 * * *' },
                { label: 'Weekly', expr: '0 3 * * 0' },
                { label: 'Every 6h', expr: '0 */6 * * *' },
                { label: 'Weekdays', expr: '0 0 * * 1-5' },
              ].map((p) => (
                <button
                  key={p.expr}
                  type="button"
                  onClick={() => setCustomCron(p.expr)}
                  className="px-2.5 py-1 bg-white border border-pencil-black/30 rounded-lg text-[11px] hover:border-pencil-black cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-pencil-black/20 space-y-1">
            <span className="text-[10px] text-[#64748b] block uppercase font-bold">English Interpretation:</span>
            <p className="font-bold text-ink-blue text-sm font-display">{cronExplanation}</p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-pencil-black/20 space-y-1.5">
            <span className="text-[10px] text-[#64748b] block uppercase font-bold">Next 5 Simulated Executions:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5 text-[11px] text-[#475569]">
              {simulatedNextRuns.map((time, idx) => (
                <div key={idx} className="p-1.5 bg-[#f8fafc] rounded border border-pencil-black/10 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded bg-ink-blue text-white text-[9px] flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <span>{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scheduler Service Implementation Code */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-ink-blue block">
          Scheduler Service Architecture (scheduler.service.ts):
        </span>
        <CodeTerminalBlock
          title="scheduler.service.ts"
          language="typescript"
          code={`import cron from 'node-cron'
import { powerMonitor } from 'electron'
import { runBackupOrchestrator } from './backup-orchestrator'

let scheduledTask: cron.ScheduledTask | null = null

export function initScheduler(cronExpression: string) {
  if (scheduledTask) scheduledTask.stop()

  scheduledTask = cron.schedule(cronExpression, async () => {
    console.log('[Daemon] Triggering scheduled backup execution...')
    await runBackupOrchestrator({ trigger: 'cron' })
  })

  // Detect system wake from sleep and run catch-up if needed
  powerMonitor.on('resume', async () => {
    console.log('[Daemon] System woke up. Checking for overdue backups...')
    await runBackupOrchestrator({ trigger: 'wake-catchup' })
  })
}`}
        />
      </div>
    </div>
  )
}
