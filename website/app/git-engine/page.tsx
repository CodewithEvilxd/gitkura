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
  Search,
  X,
} from 'lucide-react'

export default function GitEnginePage() {
  const [repoSizeMB, setRepoSizeMB] = useState(300)
  const [deltaPercent, setDeltaPercent] = useState(5)
  const [copied, setCopied] = useState(false)
  const [lightboxImg, setLightboxImg] = useState<{ src: string; caption: string } | null>(null)

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
    <div className="min-h-screen flex flex-col justify-between selection:bg-highlighter-yellow selection:text-ink-blue bg-[#faf8f5]">
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
              Chapter 05 &bull; SimpleGit Engine
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-display text-ink-blue tracking-tight">
            Differential Git Mirroring Kernel
          </h1>
          <p className="font-patrick text-2xl text-[#475569] max-w-3xl font-medium">
            Atomic delta pulls that save over 90% bandwidth by fetching only changed commit packs, branches, and tags.
          </p>
        </div>

        {/* Master Comparison Diagram Card */}
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#fef3c7] border-2 border-pencil-black rounded-xl shadow-scribely-sm">
              <GitBranch className="w-3.5 h-3.5 text-[#b45309]" />
              <span className="text-xs font-mono font-bold text-[#92400e] uppercase tracking-wide">
                Fig 5.1 &bull; Delta vs Full Clone Comparison
              </span>
            </div>
            <span className="text-xs font-mono font-bold bg-[#dcfce7] text-[#15803d] px-2.5 py-0.5 rounded-full border-2 border-pencil-black shadow-scribely-sm">
              92% Bandwidth Saved
            </span>
          </div>

          <div
            onClick={() => setLightboxImg({ src: '/diagrams/delta-vs-fullclone.jpg', caption: 'Figure 5.1: Differential Git Synchronization vs Traditional Full Cloning (18MB vs 2.4GB)' })}
            className="relative w-full p-2.5 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black shadow-scribely-sm cursor-zoom-in"
          >
            <img
              src="/diagrams/delta-vs-fullclone.jpg"
              alt="Differential Sync vs Traditional Full Cloning"
              className="w-full h-auto max-h-[520px] object-contain rounded-xl select-none mix-blend-multiply"
            />
          </div>

          <div className="pt-2 border-t-2 border-dashed border-pencil-black/15 flex items-center justify-between">
            <span className="font-kalam text-sm font-bold text-[#1a3a5f] flex items-center gap-1.5">
              <span>↳</span> 18MB delta pull vs 2.4GB redundant full clone &bull; 133x data reduction in 2.1s
            </span>
            <span className="font-mono text-[10px] text-ink-blue font-bold flex items-center gap-1">
              <Search className="w-3 h-3 text-ink-blue" />
              <span>Inspect Full-Res</span>
            </span>
          </div>
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
              <p className="font-patrick text-sm text-[#475569]">Re-downloads all packs every time from scratch.</p>
            </div>

            <div className="p-6 rounded-2xl border-2 border-pencil-black bg-[#dcfce7] shadow-scribely-sm space-y-2">
              <span className="text-xs font-mono font-bold text-[#15803d]">GitKura Differential Pull</span>
              <div className="text-3xl font-black font-display text-[#15803d]">{diffCost} MB</div>
              <p className="font-patrick text-sm text-[#166534]">Downloads only changed commit tree deltas.</p>
            </div>

            <div className="p-6 rounded-2xl border-2 border-pencil-black bg-highlighter-yellow shadow-scribely-sm space-y-2">
              <span className="text-xs font-mono font-bold text-ink-blue">Bandwidth Saved</span>
              <div className="text-3xl font-black font-display text-ink-blue">{efficiency}% Saved</div>
              <p className="font-patrick text-sm text-[#475569]">{savedMB} MB saved per sync run.</p>
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

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxImg(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-white p-4 rounded-3xl border-3 border-pencil-black shadow-scribely-xl space-y-3 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b-2 border-pencil-black/10 pb-2">
              <span className="font-display font-black text-sm text-ink-blue">
                {lightboxImg.caption}
              </span>
              <button
                type="button"
                onClick={() => setLightboxImg(null)}
                className="w-8 h-8 rounded-full bg-[#f1f5f9] hover:bg-pencil-black hover:text-white border-2 border-pencil-black font-bold flex items-center justify-center cursor-pointer transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-auto flex items-center justify-center p-2 bg-[#faf8f5] rounded-2xl border border-pencil-black/10">
              <img
                src={lightboxImg.src}
                alt={lightboxImg.caption}
                className="max-h-[75vh] w-auto object-contain rounded-xl select-none"
              />
            </div>
            <p className="text-[11px] font-mono text-center text-[#64748b]">
              Press ESC or click close button to return
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
