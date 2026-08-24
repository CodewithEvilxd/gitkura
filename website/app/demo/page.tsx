'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  Play,
  RotateCcw,
  Terminal,
  Shield,
  Send,
  Cloud,
  Database,
  HardDrive,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Layers,
} from 'lucide-react'

interface CustomRepo {
  id: string
  name: string
  owner: string
  sizeMB: number
  status: 'idle' | 'cloning' | 'compressing' | 'uploading' | 'secured' | 'error'
  progress: number
}

export default function DemoPlaygroundPage() {
  const [targetCloud, setTargetCloud] = useState<'telegram' | 'gdrive' | 's3' | 'r2' | 'minio' | 'local'>('telegram')
  const [concurrency, setConcurrency] = useState(4)
  const [isSyncing, setIsSyncing] = useState(false)
  const [repos, setRepos] = useState<CustomRepo[]>([
    { id: '1', owner: 'facebook', name: 'react', sizeMB: 38.5, status: 'idle', progress: 0 },
    { id: '2', owner: 'vercel', name: 'next.js', sizeMB: 124.2, status: 'idle', progress: 0 },
    { id: '3', owner: 'torvalds', name: 'linux', sizeMB: 840.0, status: 'idle', progress: 0 },
    { id: '4', owner: 'tailwindlabs', name: 'tailwindcss', sizeMB: 18.2, status: 'idle', progress: 0 },
  ])
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'GitKura Virtual Sandbox Engine Initialized.',
    'Ready for simulated differential sync and cloud replication dispatch.',
  ])

  const startSimulation = () => {
    setIsSyncing(true)
    setTerminalLogs((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] Armed sync for ${repos.length} repositories (Target: ${targetCloud.toUpperCase()}, Threads: ${concurrency})...`,
    ])

    // Stage 1: Cloning
    setRepos((prev) => prev.map((r) => ({ ...r, status: 'cloning', progress: 20 })))

    setTimeout(() => {
      setRepos((prev) => prev.map((r, i) => ({
        ...r,
        status: i % 2 === 0 ? 'compressing' : 'cloning',
        progress: i % 2 === 0 ? 60 : 40,
      })))
      setTerminalLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Packaging working copies into .tar.gz snapshots with atomic guards...`,
      ])
    }, 1200)

    setTimeout(() => {
      setRepos((prev) => prev.map((r) => ({
        ...r,
        status: 'uploading',
        progress: 85,
      })))
      setTerminalLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Dispatching snapshots to ${targetCloud.toUpperCase()} endpoint...`,
      ])
    }, 2400)

    setTimeout(() => {
      setRepos((prev) => prev.map((r) => ({
        ...r,
        status: 'secured',
        progress: 100,
      })))
      setTerminalLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Sync Successful: All ${repos.length} repositories secured in vault!`,
      ])
      setIsSyncing(false)
    }, 3800)
  }

  const resetSimulation = () => {
    setIsSyncing(false)
    setRepos((prev) => prev.map((r) => ({ ...r, status: 'idle', progress: 0 })))
    setTerminalLogs(['Sandbox reset. Select targets and click "Run Simulation".'])
  }

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-highlighter-yellow selection:text-ink-blue">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12 w-full">
        {/* Breadcrumb Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#64748b]">
            <Link href="/" className="hover:text-ink-blue underline">GitKura Home</Link>
            <span>/</span>
            <span className="text-ink-blue">Interactive Vault Sandbox</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border-2 border-pencil-black shadow-scribely-sm rounded-full -rotate-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
            <span className="text-xs font-mono font-black uppercase tracking-wider text-ink-blue">
              Interactive Simulator &bull; Live Telemetry
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-display text-ink-blue tracking-tight">
            Interactive Vault Simulator Playground
          </h1>
          <p className="font-hand text-2xl text-[#475569] max-w-3xl font-medium">
            Test and simulate the entire differential Git mirroring, compression, and multi-cloud dispatching pipeline in real-time.
          </p>
        </div>

        {/* Sandbox Container */}
        <div className="scribely-card p-6 sm:p-10 bg-white shadow-scribely-xl space-y-8 relative">
          <div className="washi-tape -top-3 left-10 -rotate-2" />

          {/* Control Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black">
            <div>
              <label className="block text-xs font-mono font-bold text-ink-blue mb-1.5">
                Target Cloud Destination:
              </label>
              <select
                value={targetCloud}
                onChange={(e: any) => setTargetCloud(e.target.value)}
                className="w-full bg-white border-2 border-pencil-black rounded-xl px-3 py-2 text-xs font-mono font-bold text-ink-blue"
              >
                <option value="telegram">Telegram Bot API</option>
                <option value="gdrive">Google Drive V3 Resumable</option>
                <option value="s3">AWS S3 Multipart Stream</option>
                <option value="r2">Cloudflare R2 (Zero Egress)</option>
                <option value="minio">Self-Hosted MinIO</option>
                <option value="local">Air-Gapped Local Disk Only</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono font-bold text-ink-blue mb-1.5">
                <span>Thread Concurrency:</span>
                <span className="bg-white px-2 py-0.5 rounded border border-pencil-black">{concurrency} Threads</span>
              </div>
              <input
                type="range"
                min={1}
                max={8}
                value={concurrency}
                onChange={(e) => setConcurrency(Number(e.target.value))}
                className="w-full accent-ink-blue cursor-pointer"
              />
            </div>

            <div className="flex items-end gap-3">
              <button
                type="button"
                onClick={startSimulation}
                disabled={isSyncing}
                className="flex-1 py-2.5 bg-ink-blue hover:bg-ink-hover disabled:bg-[#cbd5e1] text-white scribely-btn rounded-xl text-xs font-black font-display flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                <Play className="w-4 h-4 text-highlighter-yellow fill-highlighter-yellow" />
                <span>{isSyncing ? 'Simulating Pipeline...' : 'Run Simulation'}</span>
              </button>

              <button
                type="button"
                onClick={resetSimulation}
                className="p-2.5 bg-white hover:bg-[#fdfbf7] text-pencil-black scribely-btn rounded-xl cursor-pointer"
                title="Reset simulation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Repositories Queue Grid */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-black uppercase text-ink-blue block">
              Simulated Repository Queue ({repos.length} Repositories)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {repos.map((r) => {
                const isDone = r.status === 'secured'
                return (
                  <div
                    key={r.id}
                    className={`p-4 rounded-2xl border-2 border-pencil-black shadow-scribely-sm space-y-3 transition-all ${
                      isDone ? 'bg-[#dcfce7]' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-[#fdfbf7] border border-pencil-black text-ink-blue">
                        {r.status}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#64748b]">{r.sizeMB} MB</span>
                    </div>

                    <div>
                      <p className="text-xs font-mono font-bold text-[#64748b]">@{r.owner}</p>
                      <p className="text-sm font-black font-display text-ink-blue truncate">{r.name}</p>
                    </div>

                    <div className="h-2 bg-[#e2e8f0] rounded-full overflow-hidden border border-pencil-black">
                      <div
                        className="h-full bg-ink-blue transition-all duration-300"
                        style={{ width: `${r.progress}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Live Terminal Log Box */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-black uppercase text-ink-blue block flex items-center gap-2">
              <Terminal className="w-4 h-4 text-ink-blue" />
              <span>Real-Time Simulated Telemetry Stream</span>
            </span>

            <div className="bg-[#1e293b] rounded-2xl p-5 border-2 border-pencil-black font-mono text-xs text-slate-200 shadow-inner max-h-56 overflow-y-auto space-y-1.5">
              {terminalLogs.map((log, idx) => (
                <div key={idx} className="flex gap-2 font-mono">
                  <span className="text-slate-500 select-none">&gt;</span>
                  <span className={idx === terminalLogs.length - 1 ? 'text-highlighter-yellow font-bold' : 'text-slate-300'}>
                    {log}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
