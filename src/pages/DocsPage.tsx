import { useState } from 'react'

type ChapterKey = 'overview' | 'architecture' | 'cloud' | 'security' | 'recovery'

interface Chapter {
  id: ChapterKey
  num: string
  title: string
  subtitle: string
  accentBorder: string
  textColor: string
  activeBg: string
  tapeClass: string
}

const chapters: Chapter[] = [
  {
    id: 'overview',
    num: 'CH 01',
    title: 'Mission & Lore',
    subtitle: 'why GitKura was sketched',
    accentBorder: 'border-[#fb923c]',
    textColor: 'text-[#ea580c]',
    activeBg: 'bg-[#fff7ed]',
    tapeClass: 'washi-tape-orange',
  },
  {
    id: 'architecture',
    num: 'CH 02',
    title: 'Engine Architecture',
    subtitle: 'mirroring & packaging flow',
    accentBorder: 'border-[#38bdf8]',
    textColor: 'text-[#0284c7]',
    activeBg: 'bg-[#f0f9ff]',
    tapeClass: 'washi-tape-blue',
  },
  {
    id: 'cloud',
    num: 'CH 03',
    title: 'Cloud & Telegram',
    subtitle: 'multi-channel replication',
    accentBorder: 'border-[#c084fc]',
    textColor: 'text-[#7c3aed]',
    activeBg: 'bg-[#faf5ff]',
    tapeClass: 'washi-tape-purple',
  },
  {
    id: 'security',
    num: 'CH 04',
    title: 'Security Vault',
    subtitle: 'AES encryption & 0-telemetry',
    accentBorder: 'border-[#4ade80]',
    textColor: 'text-[#16a34a]',
    activeBg: 'bg-[#f0fdf4]',
    tapeClass: 'washi-tape-green',
  },
  {
    id: 'recovery',
    num: 'CH 05',
    title: 'Disaster Recovery',
    subtitle: 'restoring from .tar.gz vaults',
    accentBorder: 'border-[#f43f5e]',
    textColor: 'text-[#e11d48]',
    activeBg: 'bg-[#fff1f2]',
    tapeClass: 'washi-tape-rose',
  },
]

export default function DocsPage() {
  const [activeChapter, setActiveChapter] = useState<ChapterKey>('overview')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-7 pb-12">
      {/* ========================================================================= */}
      {/* HANDWRITTEN COLORED PENCIL HEADER                                         */}
      {/* ========================================================================= */}
      <div className="scribely-card p-8 relative bg-white border-2 border-[#2d2d2d]">
        <div className="washi-tape -top-2.5 left-10 -rotate-2" />
        <div className="washi-tape-blue -top-2.5 right-10 rotate-2" />

        <div className="flex items-center gap-2 px-3.5 py-1 bg-[#fdfbf7] border-2 border-[#2d2d2d] shadow-scribely-sm rounded-full w-fit mb-3 -rotate-0.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#15803d]" />
          <span className="text-sm font-pencil font-bold text-[#1a3a5f]">
            Handwritten Pencil Field Manual &amp; Reference
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-pencil font-black tracking-tight text-[#1a3a5f] leading-tight">
          <span className="pencil-red">GitKura</span>{' '}
          <span className="pencil-orange">(Git蔵)</span>{' '}
          <span className="pencil-blue">System</span>{' '}
          <span className="pencil-green">Documentation</span>
        </h1>

        <p className="font-pencil text-2xl text-[#475569] mt-2 font-bold leading-relaxed">
          Complete guide on local Git mirroring, disaster-resilience, encrypted cloud replication, and snapshot restoration.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* COLORED PENCIL CHAPTER TABS                                               */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {chapters.map((ch) => {
          const isActive = activeChapter === ch.id
          return (
            <button
              key={ch.id}
              onClick={() => setActiveChapter(ch.id)}
              className={`p-3.5 rounded-2xl border-2 transition-all text-left cursor-pointer relative flex flex-col justify-between ${
                isActive
                  ? `${ch.activeBg} border-[#2d2d2d] shadow-scribely -rotate-0.5 scale-[1.02]`
                  : 'bg-white border-[#2d2d2d]/30 hover:border-[#2d2d2d] hover:bg-[#fdfbf7] shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className={`text-sm font-pencil font-bold px-2 py-0.5 rounded border bg-white ${ch.accentBorder} ${ch.textColor}`}>
                  {ch.num}
                </span>
                <span className={`w-2.5 h-2.5 rounded-full border border-[#2d2d2d] ${isActive ? 'bg-[#2d2d2d]' : 'bg-transparent'}`} />
              </div>
              <div>
                <p className={`text-lg font-pencil font-bold leading-tight ${isActive ? 'text-[#1a3a5f]' : 'text-[#334155]'}`}>
                  {ch.title}
                </p>
                <p className="font-pencil text-sm text-[#64748b] leading-tight mt-0.5 truncate">
                  {ch.subtitle}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {/* ========================================================================= */}
      {/* CHAPTER CONTENT CARDS                                                     */}
      {/* ========================================================================= */}
      <div className="space-y-7">
        {/* CHAPTER 1: MISSION & PHILOSOPHY */}
        {activeChapter === 'overview' && (
          <div className="space-y-6">
            <div className="scribely-card p-8 relative bg-white border-2 border-[#2d2d2d]">
              <div className="washi-tape-orange -top-2.5 left-10 -rotate-1" />

              {/* Title */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#ffedd5] border-2 border-[#2d2d2d] shadow-scribely-sm flex items-center justify-center text-[#ea580c] -rotate-1 flex-shrink-0">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-pencil font-bold text-[#ea580c] uppercase tracking-wider">
                    Chapter 01 • Philosophy &amp; Mission
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-pencil font-black text-[#1a3a5f]">
                    Why Was GitKura (Git蔵) Built?
                  </h2>
                </div>
              </div>

              {/* Colored Pencil Text Explanations */}
              <div className="space-y-4">
                <p className="font-pencil text-2xl text-[#1e293b] leading-relaxed">
                  In Japanese heritage architecture, a <strong className="pencil-orange font-bold text-3xl underline decoration-[#f59e0b] decoration-wavy underline-offset-4">Kura (蔵)</strong> is a traditional, fireproof, disaster-resilient storehouse built alongside residences to protect the family’s most sacred heirlooms, documents, and assets from catastrophe.
                </p>
                <p className="font-pencil text-2xl text-[#334155] leading-relaxed">
                  <strong className="pencil-blue font-bold">GitKura</strong> brings this exact architectural philosophy to software engineering. Centralizing 100% of your source code and commits inside a single cloud provider creates severe operational risks.
                </p>
              </div>

              {/* 4 Light Pastel Colored Pencil Shaded Callout Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-7">
                {/* 1. Light Lemon Pencil Box */}
                <div className="p-5 rounded-2xl border-2 border-[#2d2d2d] pencil-shading-light-lemon shadow-scribely-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#fde047] border border-[#2d2d2d]" />
                    <h3 className="text-xl font-pencil font-bold text-[#854d0e]">
                      Single Cloud Lock-in Risk
                    </h3>
                  </div>
                  <p className="font-pencil text-lg text-[#475569] leading-snug">
                    Account lockouts, billing disputes, accidental deletions, or platform outages can instantly cut off access to your codebases.
                  </p>
                </div>

                {/* 2. Light Rose Pencil Box */}
                <div className="p-5 rounded-2xl border-2 border-[#2d2d2d] pencil-shading-light-rose shadow-scribely-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#fda4af] border border-[#2d2d2d]" />
                    <h3 className="text-xl font-pencil font-bold text-[#9f1239]">
                      Autonomous Air-Gapped Vault
                    </h3>
                  </div>
                  <p className="font-pencil text-lg text-[#475569] leading-snug">
                    GitKura mirrors raw Git branches, commits, and tags to your local disk, giving you 100% offline ownership without third-party dependencies.
                  </p>
                </div>

                {/* 3. Light Sky Pencil Box */}
                <div className="p-5 rounded-2xl border-2 border-[#2d2d2d] pencil-shading-light-sky shadow-scribely-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#7dd3fc] border border-[#2d2d2d]" />
                    <h3 className="text-xl font-pencil font-bold text-[#0369a1]">
                      Multi-Cloud Redundancy
                    </h3>
                  </div>
                  <p className="font-pencil text-lg text-[#475569] leading-snug">
                    Push encrypted point-in-time `.tar.gz` snapshots to Telegram, Google Drive, AWS S3, Cloudflare R2, or MinIO automatically.
                  </p>
                </div>

                {/* 4. Light Mint Pencil Box */}
                <div className="p-5 rounded-2xl border-2 border-[#2d2d2d] pencil-shading-light-mint shadow-scribely-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#86efac] border border-[#2d2d2d]" />
                    <h3 className="text-xl font-pencil font-bold text-[#15803d]">
                      Zero-Telemetry Privacy
                    </h3>
                  </div>
                  <p className="font-pencil text-lg text-[#475569] leading-snug">
                    No analytics, no intermediary backend servers, and zero cloud tracking. Your PAT tokens and code never touch anything except your designated destinations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CHAPTER 2: ENGINE ARCHITECTURE */}
        {activeChapter === 'architecture' && (
          <div className="space-y-6">
            <div className="scribely-card p-8 relative bg-white border-2 border-[#2d2d2d]">
              <div className="washi-tape-blue -top-2.5 left-10 -rotate-1" />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#e0f2fe] border-2 border-[#2d2d2d] shadow-scribely-sm flex items-center justify-center text-[#0284c7] rotate-1 flex-shrink-0">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                    <line x1="6" y1="6" x2="6.01" y2="6" />
                    <line x1="6" y1="18" x2="6.01" y2="18" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-pencil font-bold text-[#0284c7] uppercase tracking-wider">
                    Chapter 02 • Technical Architecture
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-pencil font-black text-[#1a3a5f]">
                    How the GitKura Engine Operates
                  </h2>
                </div>
              </div>

              <p className="font-pencil text-2xl text-[#334155] leading-relaxed mb-6">
                GitKura executes an automated 5-step pipeline orchestrated with parallel thread concurrency control:
              </p>

              {/* 5-Step Pipeline Walkthrough */}
              <div className="space-y-4">
                <div className="p-4 bg-[#fdfbf7] rounded-2xl border-2 border-[#2d2d2d] flex items-start gap-4">
                  <span className="w-10 h-10 rounded-xl bg-[#e11d48] text-white font-pencil font-black flex items-center justify-center text-lg flex-shrink-0">
                    01
                  </span>
                  <div>
                    <h3 className="text-xl font-pencil font-bold text-[#e11d48]">
                      Scope Query via GitHub API
                    </h3>
                    <p className="font-pencil text-lg text-[#64748b] mt-0.5">
                      Uses <span className="pencil-blue font-bold">@octokit/rest</span> to discover owned repos, org repositories, starred repos, and forks.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[#fdfbf7] rounded-2xl border-2 border-[#2d2d2d] flex items-start gap-4">
                  <span className="w-10 h-10 rounded-xl bg-[#0284c7] text-white font-pencil font-black flex items-center justify-center text-lg flex-shrink-0">
                    02
                  </span>
                  <div>
                    <h3 className="text-xl font-pencil font-bold text-[#0369a1]">
                      Differential Git Mirroring (<span className="pencil-orange font-bold">simple-git</span>)
                    </h3>
                    <p className="font-pencil text-lg text-[#64748b] mt-0.5">
                      Executes fast differential pulls (<span className="pencil-purple font-bold">git fetch --all --prune --tags</span>) so only updated commits and branches are downloaded.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[#fdfbf7] rounded-2xl border-2 border-[#2d2d2d] flex items-start gap-4">
                  <span className="w-10 h-10 rounded-xl bg-[#ca8a04] text-white font-pencil font-black flex items-center justify-center text-lg flex-shrink-0">
                    03
                  </span>
                  <div>
                    <h3 className="text-xl font-pencil font-bold text-[#854d0e]">
                      Point-in-Time GZIP Packaging (<span className="pencil-green font-bold">.tar.gz</span>)
                    </h3>
                    <p className="font-pencil text-lg text-[#64748b] mt-0.5">
                      Packs immutable snapshot archives into <span className="pencil-blue font-bold">.archives/owner__repo.tar.gz</span> with atomic renames to avoid partial corruptions.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[#fdfbf7] rounded-2xl border-2 border-[#2d2d2d] flex items-start gap-4">
                  <span className="w-10 h-10 rounded-xl bg-[#7c3aed] text-white font-pencil font-black flex items-center justify-center text-lg flex-shrink-0">
                    04
                  </span>
                  <div>
                    <h3 className="text-xl font-pencil font-bold text-[#6b21a8]">
                      Cloud &amp; Telegram Replication Dispatch
                    </h3>
                    <p className="font-pencil text-lg text-[#64748b] mt-0.5">
                      Transmits the snapshot archive to Telegram Channel Bot, Google Drive Resumable API, or S3 Multipart with live percent progress streaming.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[#fdfbf7] rounded-2xl border-2 border-[#2d2d2d] flex items-start gap-4">
                  <span className="w-10 h-10 rounded-xl bg-[#15803d] text-white font-pencil font-black flex items-center justify-center text-lg flex-shrink-0">
                    05
                  </span>
                  <div>
                    <h3 className="text-xl font-pencil font-bold text-[#15803d]">
                      Audit Telemetry &amp; Tray Scheduler
                    </h3>
                    <p className="font-pencil text-lg text-[#64748b] mt-0.5">
                      Emits completion status, updates Windows System Tray tooltip, and arms the <span className="pencil-orange font-bold">node-cron</span> scheduler for future intervals.
                    </p>
                  </div>
                </div>
              </div>

              {/* Handwritten Colored Pencil File Tree Box */}
              <div className="mt-7">
                <div className="flex items-center justify-between text-base font-pencil font-bold text-[#1a3a5f] mb-2">
                  <span>Vault Storage Layout on Disk:</span>
                  <button
                    onClick={() => copyToClipboard(`/Vault-Directory/\n├── .archives/\n│   ├── octocat__hello-world.tar.gz\n│   └── myorg__backend-api.tar.gz\n├── octocat/\n│   └── hello-world/\n│       ├── .git/\n│       └── src/\n└── myorg/\n    └── backend-api/`, 'vault-tree')}
                    className="text-sm bg-white border-2 border-[#2d2d2d] px-3 py-1 rounded-xl hover:bg-[#f1f5f9] cursor-pointer shadow-xs font-pencil font-bold text-[#1a3a5f]"
                  >
                    {copiedCode === 'vault-tree' ? 'Copied!' : 'Copy Tree'}
                  </button>
                </div>
                <div className="bg-[#fcfaf5] p-5 rounded-2xl border-2 border-dashed border-[#2d2d2d] font-pencil-code text-lg leading-relaxed shadow-scribely-sm">
                  <p className="pencil-blue font-bold">/Vault-Directory/</p>
                  <p className="pencil-purple font-bold">├── .archives/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="pencil-green text-sm"># Compressed snapshots</span></p>
                  <p className="pencil-orange">│ &nbsp; ├── octocat__hello-world.tar.gz &nbsp;&nbsp;&nbsp;<span className="pencil-green text-sm"># Standalone GZIP archive</span></p>
                  <p className="pencil-orange">│ &nbsp; └── myorg__backend-api.tar.gz</p>
                  <p className="pencil-blue font-bold">├── octocat/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="pencil-green text-sm"># Owner workspace</span></p>
                  <p className="pencil-teal">│ &nbsp; └── hello-world/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="pencil-green text-sm"># Active git directory</span></p>
                  <p className="pencil-red">│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ├── .git/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="pencil-green text-sm"># Full history &amp; tags</span></p>
                  <p className="pencil-red">│ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; └── src/</p>
                  <p className="pencil-blue font-bold">└── myorg/</p>
                  <p className="pencil-teal">&nbsp;&nbsp;&nbsp; └── backend-api/</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CHAPTER 3: CLOUD & TELEGRAM */}
        {activeChapter === 'cloud' && (
          <div className="space-y-6">
            <div className="scribely-card p-8 relative bg-white border-2 border-[#2d2d2d]">
              <div className="washi-tape-purple -top-2.5 left-10 -rotate-1" />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#f3e8ff] border-2 border-[#2d2d2d] shadow-scribely-sm flex items-center justify-center text-[#7c3aed] -rotate-1 flex-shrink-0">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-pencil font-bold text-[#7c3aed] uppercase tracking-wider">
                    Chapter 03 • Replication Protocols
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-pencil font-black text-[#1a3a5f]">
                    Multi-Cloud &amp; Telegram Protocols
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Telegram Card */}
                <div className="p-6 bg-[#fdfbf7] rounded-2xl border-2 border-[#2d2d2d] space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className="p-1 rounded-lg bg-[#24A1DE] text-white flex items-center justify-center shadow-xs">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z" />
                      </svg>
                    </span>
                    <h3 className="text-xl font-pencil font-bold text-[#1a3a5f]">
                      Telegram Channel Vault
                    </h3>
                  </div>
                  <p className="font-pencil text-lg text-[#475569] leading-relaxed">
                    Direct multipart push to Telegram Bot API <span className="pencil-blue font-bold">sendDocument</span> with rich Markdown repository metadata and smart supergroup <span className="pencil-orange font-bold">-100</span> auto-resolution.
                  </p>
                  <div className="text-sm font-pencil font-bold text-[#64748b] bg-white p-2.5 rounded-xl border border-[#cbd5e1]">
                    Limit: Standard 50 MB per snapshot archive
                  </div>
                </div>

                {/* Google Drive Card */}
                <div className="p-6 bg-[#fdfbf7] rounded-2xl border-2 border-[#2d2d2d] space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className="p-1 rounded-lg bg-white border border-[#e2e8f0] flex items-center justify-center shadow-xs">
                      <svg className="w-5 h-5" viewBox="0 0 87.3 78" fill="none">
                        <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5l5.4 9.35z" fill="#0066DA" />
                        <path d="M43.65 25L29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44A8.9 8.9 0 000 53h27.5L43.65 25z" fill="#00AC47" />
                        <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.8l5.85 10.15 7.9 13.65z" fill="#EA4335" />
                        <path d="M43.65 25L57.4 1.2C56.05.4 54.5 0 52.85 0H34.45c-1.65 0-3.2.4-4.55 1.2L43.65 25z" fill="#00832D" />
                        <path d="M59.8 53H27.5L13.75 76.8c1.35.8 2.9 1.2 4.55 1.2h50.7c1.65 0 3.2-.4 4.55-1.2L59.8 53z" fill="#2684FC" />
                        <path d="M73.4 26.5l-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25l16.15 28h27.5c0-1.55-.4-3.1-1.2-4.5l-12.7-22z" fill="#FFBA00" />
                      </svg>
                    </span>
                    <h3 className="text-xl font-pencil font-bold text-[#1a3a5f]">
                      Google Drive V3 Resumable
                    </h3>
                  </div>
                  <p className="font-pencil text-lg text-[#475569] leading-relaxed">
                    Supports <strong className="pencil-green font-bold">Dual-Mode Auth</strong>: Google Service Account JSON (with native RSA-SHA256 JWT signing) or OAuth2 Access Token. Direct upload to target folder IDs.
                  </p>
                  <div className="text-sm font-pencil font-bold text-[#64748b] bg-white p-2.5 rounded-xl border border-[#cbd5e1]">
                    Auth: Zero external SDK dependencies (Node crypto)
                  </div>
                </div>

                {/* S3 & Cloudflare R2 Card */}
                <div className="p-6 bg-[#fdfbf7] rounded-2xl border-2 border-[#2d2d2d] space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className="p-1 rounded-lg bg-white border border-[#e2e8f0] flex items-center justify-center shadow-xs">
                      <svg className="w-5 h-5" viewBox="0 0 428 512" fill="none">
                        <path fill="#e25444" fillRule="evenodd" d="M378,99L295,257l83,158,34-19V118Z" />
                        <path fill="#7b1d13" fillRule="evenodd" d="M378,99L212,118,127.5,257,212,396l166,19V99Z" />
                        <path fill="#58150d" fillRule="evenodd" d="M43,99L16,111V403l27,12L212,257Z" />
                        <path fill="#e25444" fillRule="evenodd" d="M42.637,98.667l169.587,47.111V372.444L42.637,415.111V98.667Z" />
                        <path fill="#58150d" fillRule="evenodd" d="M212.313,170.667l-72.008-11.556,72.008-81.778,71.83,81.778Z" />
                        <path fill="#58150d" fillRule="evenodd" d="M284.143,159.111l-71.919,11.733-71.919-11.733V77.333" />
                        <path fill="#58150d" fillRule="evenodd" d="M212.313,342.222l-72.008,13.334,72.008,70.222,71.83-70.222Z" />
                        <path fill="#7b1d13" fillRule="evenodd" d="M212,16L140,54V159l72.224-20.333Z" />
                        <path fill="#7b1d13" fillRule="evenodd" d="M212.224,196.444l-71.919,7.823V309.105l71.919,8.228V196.444Z" />
                        <path fill="#7b1d13" fillRule="evenodd" d="M212.224,373.333L140.305,355.3V458.363L212.224,496V373.333Z" />
                        <path fill="#e25444" fillRule="evenodd" d="M284.143,355.3l-71.919,18.038V496l71.919-37.637V355.3Z" />
                        <path fill="#e25444" fillRule="evenodd" d="M212.224,196.444l71.919,7.823V309.105l-71.919,8.228V196.444Z" />
                        <path fill="#e25444" fillRule="evenodd" d="M212,16l72,38V159l-72-20V16Z" />
                      </svg>
                    </span>
                    <h3 className="text-xl font-pencil font-bold text-[#1a3a5f]">
                      Amazon S3 &amp; Cloudflare R2
                    </h3>
                  </div>
                  <p className="font-pencil text-lg text-[#475569] leading-relaxed">
                    Official AWS SDK S3 client with multi-part parallel upload streaming and custom prefix path support for zero-egress Cloudflare R2 buckets.
                  </p>
                </div>

                {/* MinIO / Custom S3 Card */}
                <div className="p-6 bg-[#fdfbf7] rounded-2xl border-2 border-[#2d2d2d] space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className="p-1 rounded-lg bg-white border border-[#e2e8f0] flex items-center justify-center shadow-xs">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#C72C48">
                        <path d="M12 2.5L2 8.2v7.6l10 5.7 10-5.7V8.2L12 2.5zm0 2.3l7.6 4.3L12 13.5 4.4 9.1 12 4.8zm-8 6.1l7 4v6.8l-7-4V10.9zm16 6.8l-7 4v-6.8l7-4v6.8z" />
                      </svg>
                    </span>
                    <h3 className="text-xl font-pencil font-bold text-[#1a3a5f]">
                      Self-Hosted MinIO &amp; Wasabi
                    </h3>
                  </div>
                  <p className="font-pencil text-lg text-[#475569] leading-relaxed">
                    Connects to self-hosted MinIO, Wasabi, or Backblaze B2 using <span className="pencil-red font-bold">forcePathStyle: true</span> and custom endpoint definitions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CHAPTER 4: SECURITY */}
        {activeChapter === 'security' && (
          <div className="space-y-6">
            <div className="scribely-card p-8 relative bg-white border-2 border-[#2d2d2d]">
              <div className="washi-tape-green -top-2.5 left-10 -rotate-1" />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#dcfce7] border-2 border-[#2d2d2d] shadow-scribely-sm flex items-center justify-center text-[#15803d] rotate-1 flex-shrink-0">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-pencil font-bold text-[#15803d] uppercase tracking-wider">
                    Chapter 04 • Cryptography &amp; Privacy
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-pencil font-black text-[#1a3a5f]">
                    Security &amp; Encryption Guarantees
                  </h2>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-5 bg-[#fdfbf7] rounded-2xl border-2 border-[#2d2d2d] space-y-2">
                  <h3 className="text-xl font-pencil font-bold text-[#15803d] flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#15803d]" />
                    Local AES Disk Encryption
                  </h3>
                  <p className="font-pencil text-lg text-[#475569] leading-relaxed">
                    All GitHub Personal Access Tokens (PATs), Google Cloud Service Account JSON keys, and Telegram Bot Tokens are encrypted on your local disk using AES-256 via <span className="pencil-blue font-bold">electron-store</span>.
                  </p>
                </div>

                <div className="p-5 bg-[#fdfbf7] rounded-2xl border-2 border-[#2d2d2d] space-y-2">
                  <h3 className="text-xl font-pencil font-bold text-[#0369a1] flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#0284c7]" />
                    Context-Isolated IPC Sandboxing
                  </h3>
                  <p className="font-pencil text-lg text-[#475569] leading-relaxed">
                    The frontend runs strictly with <span className="pencil-purple font-bold">contextIsolation: true</span> and <span className="pencil-purple font-bold">nodeIntegration: false</span>. All Git processes pass through an explicit Preload bridge.
                  </p>
                </div>

                <div className="p-5 bg-[#fdfbf7] rounded-2xl border-2 border-[#2d2d2d] space-y-2">
                  <h3 className="text-xl font-pencil font-bold text-[#ea580c] flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#ea580c]" />
                    Absolute Zero Telemetry
                  </h3>
                  <p className="font-pencil text-lg text-[#475569] leading-relaxed">
                    No analytics, no Sentry, no telemetry. All communications are direct point-to-point connections between your machine and GitHub/Cloud providers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CHAPTER 5: RECOVERY */}
        {activeChapter === 'recovery' && (
          <div className="space-y-6">
            <div className="scribely-card p-8 relative bg-white border-2 border-[#2d2d2d]">
              <div className="washi-tape-rose -top-2.5 left-10 -rotate-1" />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#ffe4e6] border-2 border-[#2d2d2d] shadow-scribely-sm flex items-center justify-center text-[#e11d48] -rotate-1 flex-shrink-0">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="21 8 21 21 3 21 3 8" />
                    <rect x="1" y="3" width="22" height="5" />
                    <line x1="10" y1="12" x2="14" y2="12" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-pencil font-bold text-[#e11d48] uppercase tracking-wider">
                    Chapter 05 • Disaster Recovery
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-pencil font-black text-[#1a3a5f]">
                    Disaster Recovery &amp; Restoration Guide
                  </h2>
                </div>
              </div>

              <p className="font-pencil text-2xl text-[#334155] leading-relaxed mb-6">
                If GitHub experiences an outage or a repository is deleted, you can instantly restore any repository with full commit history, branches, and tags from your GitKura vault:
              </p>

              <div className="space-y-5">
                {/* Method A */}
                <div className="p-5 bg-[#fdfbf7] rounded-2xl border-2 border-[#2d2d2d] space-y-3">
                  <h3 className="text-xl font-pencil font-bold text-[#1a3a5f]">
                    Method A: Instant Local Workspace Access
                  </h3>
                  <p className="font-pencil text-lg text-[#475569] leading-relaxed">
                    Your local vault directory already contains complete uncompressed git working directories. You can open any terminal and immediately start working:
                  </p>
                  <div className="bg-[#fcfaf5] p-4 rounded-xl border-2 border-dashed border-[#2d2d2d] font-pencil-code text-lg leading-relaxed shadow-xs">
                    <p className="pencil-orange font-bold">cd <span className="pencil-blue">&quot;C:/Your-Vault-Path/owner/repo-name&quot;</span></p>
                    <p className="pencil-purple font-bold">git status</p>
                    <p className="pencil-green font-bold">git log --oneline -n 10</p>
                  </div>
                </div>

                {/* Method B */}
                <div className="p-5 bg-[#fdfbf7] rounded-2xl border-2 border-[#2d2d2d] space-y-3">
                  <h3 className="text-xl font-pencil font-bold text-[#0369a1]">
                    Method B: Restoring from Downloaded <span className="pencil-green font-bold">.tar.gz</span> Archive
                  </h3>
                  <p className="font-pencil text-lg text-[#475569] leading-relaxed">
                    If you downloaded a snapshot from your Telegram Channel, Google Drive, or S3 bucket:
                  </p>
                  <div className="bg-[#fcfaf5] p-4 rounded-xl border-2 border-dashed border-[#2d2d2d] font-pencil-code text-lg leading-relaxed shadow-xs">
                    <p className="pencil-green text-sm"><span className="pencil-green font-bold"># 1. Extract the compressed snapshot archive</span></p>
                    <p className="pencil-orange font-bold">tar <span className="pencil-purple">-xzf</span> owner__repo-name.tar.gz</p>
                    <p className="pencil-green text-sm mt-2"><span className="pencil-green font-bold"># 2. Navigate into restored repository</span></p>
                    <p className="pencil-orange font-bold">cd owner/repo-name</p>
                    <p className="pencil-purple font-bold">git branch -a</p>
                    <p className="pencil-teal font-bold">git remote -v</p>
                  </div>
                </div>

                {/* Method C */}
                <div className="p-5 bg-[#fdfbf7] rounded-2xl border-2 border-[#2d2d2d] space-y-3">
                  <h3 className="text-xl font-pencil font-bold text-[#15803d]">
                    Method C: Republishing to New Host (GitLab / Codeberg)
                  </h3>
                  <p className="font-pencil text-lg text-[#475569] leading-relaxed">
                    To republish the recovered repository with all branches and tags intact:
                  </p>
                  <div className="bg-[#fcfaf5] p-4 rounded-xl border-2 border-dashed border-[#2d2d2d] font-pencil-code text-lg leading-relaxed shadow-xs">
                    <p className="pencil-orange font-bold">git remote set-url origin <span className="pencil-blue">https://gitlab.com/new-user/new-repo.git</span></p>
                    <p className="pencil-purple font-bold">git push <span className="pencil-teal">--all</span> origin</p>
                    <p className="pencil-purple font-bold">git push <span className="pencil-teal">--tags</span> origin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
