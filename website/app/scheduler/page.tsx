'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  Clock,
  Sliders,
  Bell,
  Cpu,
  Layers,
  CheckCircle2,
  Calendar,
  Code2,
} from 'lucide-react'

export default function SchedulerPage() {
  const [freq, setFreq] = useState<'daily' | 'weekly' | 'monthly'>('daily')
  const [time, setTime] = useState('02:00')
  const [threads, setThreads] = useState(5)

  const cronCode = `// electron/services/scheduler.service.ts
import * as cron from 'node-cron'

export class SchedulerService {
  start(config: ScheduleConfig) {
    this.stop()
    if (!config.enabled) return

    const expression = this.toCronExpression(config)
    this.task = cron.schedule(expression, () => {
      this.onTrigger?.() // Silently triggers Vault Orchestrator
    })
  }

  private toCronExpression(config: ScheduleConfig): string {
    const [hour, minute] = (config.time || '02:00').split(':').map(Number)
    switch (config.frequency) {
      case 'daily': return \`\${minute} \${hour} * * *\`
      case 'weekly': return \`\${minute} \${hour} * * \${config.dayOfWeek ?? 0}\`
      case 'monthly': return \`\${minute} \${hour} \${config.dayOfMonth ?? 1} * *\`
    }
  }
}`

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-highlighter-yellow selection:text-ink-blue">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12 w-full">
        {/* Breadcrumb Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#64748b]">
            <Link href="/" className="hover:text-ink-blue underline">GitKura Home</Link>
            <span>/</span>
            <span className="text-ink-blue">Automated Background Daemon</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border-2 border-pencil-black shadow-scribely-sm rounded-full -rotate-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6]" />
            <span className="text-xs font-mono font-black uppercase tracking-wider text-ink-blue">
              Chapter 06 &bull; Background Cron &amp; System Tray
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-display text-ink-blue tracking-tight">
            Automated Cron &amp; System Tray Daemon
          </h1>
          <p className="font-hand text-2xl text-[#475569] max-w-3xl font-medium">
            Silent, set-and-forget background synchronization consuming under 35 MB RAM while standing guard in your system tray.
          </p>
        </div>

        {/* Interactive Controls & Code */}
        <div className="scribely-card p-6 sm:p-10 bg-white shadow-scribely-xl space-y-8 relative">
          <div className="washi-tape-purple -top-3 left-10 -rotate-2" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Interactive Schedule Picker */}
            <div className="p-6 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black space-y-4">
              <h2 className="text-xl font-black font-display text-ink-blue">
                Simulate Schedule Parameters
              </h2>

              <div>
                <label className="block text-xs font-mono font-bold text-ink-blue mb-1.5">Frequency:</label>
                <div className="flex gap-2">
                  {(['daily', 'weekly', 'monthly'] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFreq(f)}
                      className={`px-4 py-2 rounded-xl text-xs font-black font-display border-2 transition-all cursor-pointer ${
                        freq === f
                          ? 'bg-highlighter-yellow text-ink-blue border-pencil-black shadow-scribely-sm'
                          : 'bg-white text-[#64748b] border-pencil-black/20 hover:border-pencil-black'
                      }`}
                    >
                      {f.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-ink-blue mb-1.5">Execution Time:</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="bg-white border-2 border-pencil-black rounded-xl px-4 py-2 text-sm font-mono font-bold text-pencil-black"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono font-bold text-ink-blue mb-1.5">
                  <span>Concurrency Worker Pool:</span>
                  <span className="bg-white px-2 py-0.5 rounded border border-pencil-black">{threads} Threads</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={threads}
                  onChange={(e) => setThreads(Number(e.target.value))}
                  className="w-full accent-ink-blue cursor-pointer"
                />
              </div>
            </div>

            {/* Generated Cron Preview Card */}
            <div className="p-6 bg-[#dbeafe]/50 rounded-2xl border-2 border-pencil-black space-y-3">
              <span className="text-xs font-mono font-bold uppercase text-ink-blue">Active Cron Pattern</span>
              <div className="text-3xl font-black font-mono text-ink-blue">
                {time.split(':')[1]} {time.split(':')[0]} * * {freq === 'weekly' ? '0' : '*'}
              </div>
              <p className="font-kalam text-lg text-[#475569] font-bold">
                Triggers unattended mirror pull &amp; cloud push {freq} at {time} UTC.
              </p>
              <div className="p-3 bg-white rounded-xl border border-pencil-black/30">
                <span className="font-gaegu text-base text-[#15803d] font-bold">
                  ⚡ System Tray Status: Standing Guard (32.4 MB RAM)
                </span>
              </div>
            </div>
          </div>

          {/* Implementation Code */}
          <div className="space-y-2 pt-4 border-t-2 border-dashed border-pencil-black/20">
            <span className="text-xs font-mono font-black uppercase text-ink-blue block">Implementation Code (electron/services/scheduler.service.ts)</span>
            <div className="bg-[#1e293b] rounded-2xl p-5 border-2 border-pencil-black font-mono text-xs text-slate-200 shadow-inner overflow-x-auto">
              <pre className="text-slate-300 whitespace-pre leading-relaxed">{cronCode}</pre>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
