'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  ShieldAlert,
  Copy,
  Check,
  Terminal,
  FolderTree,
  FileArchive,
  Share2,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react'

export default function DisasterRecoveryPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const scenarios = [
    {
      id: 'local',
      title: 'Method 1: Instant Local Workspace Access',
      badge: 'Zero Extraction Needed',
      situation: 'GitHub experiences an unscheduled outage, and you need to access commit history or deploy immediately.',
      description: 'Your local vault directory already stores raw uncompressed Git repositories with all branches checked out. You can immediately cd into the folder and work directly.',
      code: `# 1. Enter local vault repository directory
cd "C:/GitKura-Vault/owner/core-repo"

# 2. Inspect status and branches
git status
git log --oneline -n 10
git branch -a

# 3. Check out any desired branch immediately
git checkout feature/production-release`,
      icon: FolderTree,
    },
    {
      id: 'archive',
      title: 'Method 2: Point-in-Time .tar.gz Snapshot Extraction',
      badge: 'Point-in-Time Rollback',
      situation: 'A force-push corrupted a remote branch, or an entire repository was accidentally deleted upstream.',
      description: 'Extract the verified .tar.gz or .zip snapshot archive from your local .archives/ directory or download it from Telegram / S3.',
      code: `# 1. Extract snapshot archive
tar -xzf .archives/owner__core-repo.tar.gz

# 2. Enter restored directory
cd owner/core-repo

# 3. Verify git commit integrity and remotes
git fsck --full
git remote -v`,
      icon: FileArchive,
    },
    {
      id: 'republish',
      title: 'Method 3: Instant Migration to GitLab, Bitbucket or Self-Hosted',
      badge: 'Total Cloud Sovereignty',
      situation: 'Your GitHub organization is suspended, or you need to evacuate code to a private Gitea/GitLab server immediately.',
      description: 'Because GitKura retains all Git refs, branches, and tags, re-pointing the origin URL publishes the complete repository in seconds.',
      code: `# 1. Enter local repository mirror
cd "C:/GitKura-Vault/owner/core-repo"

# 2. Re-point remote origin URL to new host
git remote set-url origin https://gitlab.com/new-vault/core-repo.git

# 3. Push 100% of branches and tags to the new host
git push --all origin
git push --tags origin`,
      icon: Share2,
    },
  ]

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
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
            <span className="text-ink-blue">Disaster Recovery Playbook</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border-2 border-pencil-black shadow-scribely-sm rounded-full -rotate-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]" />
            <span className="text-xs font-mono font-black uppercase tracking-wider text-ink-blue">
              Chapter 04 &bull; Disaster Recovery Playbook
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-display text-ink-blue tracking-tight">
            Disaster Recovery &amp; Code Restoration
          </h1>
          <p className="font-hand text-2xl text-[#475569] max-w-3xl font-medium">
            Step-by-step restoration manuals to recover your codebase in seconds when upstream cloud outages or account lockouts occur.
          </p>
        </div>

        {/* 3 Scenarios Grid */}
        <div className="space-y-8">
          {scenarios.map((s, idx) => {
            const Icon = s.icon
            return (
              <div
                key={s.id}
                className="scribely-card p-6 sm:p-10 bg-white shadow-scribely-xl space-y-6 relative"
              >
                <div className="washi-tape-rose -top-3 left-10 -rotate-1" />

                <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-dashed border-pencil-black/20 pb-5">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-[#fdfbf7] border-2 border-pencil-black shadow-scribely-sm flex items-center justify-center text-ink-blue -rotate-1">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black font-display text-ink-blue">
                        {s.title}
                      </h2>
                      <span className="text-xs font-mono font-bold bg-[#dcfce7] text-[#15803d] px-2 py-0.5 rounded border border-pencil-black">
                        {s.badge}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(s.code, s.id)}
                    className="px-4 py-2 bg-[#fdfbf7] hover:bg-white text-ink-blue scribely-btn rounded-xl text-xs font-mono font-bold flex items-center gap-2 cursor-pointer"
                  >
                    {copiedId === s.id ? (
                      <>
                        <Check className="w-4 h-4 text-[#15803d]" />
                        <span>Copied Script!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-ink-blue" />
                        <span>Copy Commands</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 bg-[#fff7ed] rounded-xl border-2 border-pencil-black text-xs font-mono">
                  <span className="text-[#c2410c] font-black uppercase tracking-wider block mb-1">Scenario:</span>
                  <p className="font-kalam text-base text-[#7c2d12] font-bold">{s.situation}</p>
                </div>

                <p className="font-patrick text-lg text-[#475569] leading-relaxed font-medium">
                  {s.description}
                </p>

                <div className="bg-[#1e293b] rounded-2xl p-5 border-2 border-pencil-black font-mono text-xs text-slate-200 shadow-inner overflow-x-auto">
                  <pre className="text-slate-200 whitespace-pre leading-relaxed">{s.code}</pre>
                </div>
              </div>
            )
          })}
        </div>
      </main>

      <Footer />
    </div>
  )
}
