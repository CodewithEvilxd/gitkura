'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  Terminal,
  Zap,
  GitBranch,
  GitCommit,
  Layers,
  Copy,
  Check,
  CheckCircle2,
  TrendingDown,
  Code2,
} from 'lucide-react'

export default function GitEnginePage() {
  const [repoSizeMB, setRepoSizeMB] = useState(300)
  const [deltaPercent, setDeltaPercent] = useState(5)
  const [copied, setCopied] = useState(false)

  const fullCloneCost = repoSizeMB
  const diffCost = Number(((repoSizeMB * (deltaPercent / 100)) + 1.5).toFixed(1))
  const savedMB = Number((fullCloneCost - diffCost).toFixed(1))
  const efficiency = Math.round((savedMB / fullCloneCost) * 100)

  const gitCodeSnippet = `// electron/services/git.service.ts
import simpleGit from 'simple-git'

export class GitService {
  async cloneOrUpdate(cloneUrl: string, repoPath: string, token: string) {
    if (this.repoExists(repoPath)) {
      // Differential update of all remote branches
      const git = simpleGit(repoPath)
      const authUrl = this.sanitizeUrl(cloneUrl, token)
      
      await git.remote(['set-url', 'origin', authUrl])
      await git.fetch(['--all', '--prune', '--progress'])
      
      const currentBranch = (await git.branch()).current
      await git.pull('origin', currentBranch, ['--ff-only'])
      
      // Clean auth tokens from remote URL immediately
      await git.remote(['set-url', 'origin', cloneUrl])
      return 'updated'
    } else {
      // Initial full mirror clone with remote checkout
      await this.cloneRepo(cloneUrl, repoPath, token)
      return 'cloned'
    }
  }
}`

  const copyCode = () => {
    navigator.clipboard.writeText(gitCodeSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
            <span className="text-ink-blue">Differential Git Kernel</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border-2 border-pencil-black shadow-scribely-sm rounded-full -rotate-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
            <span className="text-xs font-mono font-black uppercase tracking-wider text-ink-blue">
              Chapter 02 &bull; SimpleGit Engine
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-display text-ink-blue tracking-tight">
            Differential Git Mirroring Kernel
          </h1>
          <p className="font-hand text-2xl text-[#475569] max-w-3xl font-medium">
            Atomic delta pulls that save over 90% bandwidth by fetching only changed commit packs, branches, and tags.
          </p>
        </div>

        {/* Interactive Benchmark Calculator */}
        <div className="scribely-card p-6 sm:p-10 bg-white shadow-scribely-xl space-y-8 relative">
          <div className="washi-tape-blue -top-3 left-10 -rotate-2" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black">
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="font-black text-ink-blue">Simulated Repository Size:</span>
                <span className="bg-white px-2.5 py-1 rounded-lg border border-pencil-black font-black text-ink-blue">
                  {repoSizeMB} MB
                </span>
              </div>
              <input
                type="range"
                min={50}
                max={2000}
                step={50}
                value={repoSizeMB}
                onChange={(e) => setRepoSizeMB(Number(e.target.value))}
                className="w-full accent-ink-blue cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="font-black text-ink-blue">Daily Commit Delta Size:</span>
                <span className="bg-white px-2.5 py-1 rounded-lg border border-pencil-black font-black text-[#15803d]">
                  {deltaPercent}% Delta
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={25}
                step={1}
                value={deltaPercent}
                onChange={(e) => setDeltaPercent(Number(e.target.value))}
                className="w-full accent-[#15803d] cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border-2 border-pencil-black bg-[#fee2e2]/60 shadow-scribely-sm space-y-2">
              <span className="text-xs font-mono font-bold text-[#991b1b]">Standard Naive Clone</span>
              <div className="text-3xl font-black font-display text-[#dc2626]">{fullCloneCost} MB</div>
              <p className="font-hand text-sm text-[#475569]">Re-downloads all packs every time from scratch.</p>
            </div>

            <div className="p-6 rounded-2xl border-2 border-pencil-black bg-[#dcfce7] shadow-scribely-sm space-y-2">
              <span className="text-xs font-mono font-bold text-[#15803d]">GitKura Differential Pull</span>
              <div className="text-3xl font-black font-display text-[#15803d]">{diffCost} MB</div>
              <p className="font-hand text-sm text-[#166534]">Downloads only changed commit tree deltas.</p>
            </div>

            <div className="p-6 rounded-2xl border-2 border-pencil-black bg-highlighter-yellow shadow-scribely-sm space-y-2">
              <span className="text-xs font-mono font-bold text-ink-blue">Bandwidth Saved</span>
              <div className="text-3xl font-black font-display text-ink-blue">{efficiency}% Saved</div>
              <p className="font-hand text-sm text-[#475569]">{savedMB} MB saved per sync run.</p>
            </div>
          </div>

          {/* Code Viewer */}
          <div className="space-y-3 pt-4 border-t-2 border-dashed border-pencil-black/20">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-black text-ink-blue uppercase flex items-center gap-2">
                <Code2 className="w-4 h-4 text-ink-blue" />
                <span>Source Implementation (electron/services/git.service.ts)</span>
              </span>

              <button
                type="button"
                onClick={copyCode}
                className="px-4 py-2 bg-[#fdfbf7] hover:bg-white text-ink-blue scribely-btn rounded-xl text-xs font-mono font-bold flex items-center gap-2 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-[#15803d]" /> : <Copy className="w-4 h-4 text-ink-blue" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <div className="bg-[#1e293b] rounded-2xl p-5 border-2 border-pencil-black font-mono text-xs text-slate-200 shadow-inner overflow-x-auto">
              <pre className="text-slate-300 whitespace-pre leading-relaxed">{gitCodeSnippet}</pre>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
