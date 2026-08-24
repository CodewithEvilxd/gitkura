'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  BookOpen,
  Terminal,
  Shield,
  Layers,
  CheckCircle2,
  Copy,
  Check,
  Download,
} from 'lucide-react'

export default function DocsPage() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null)

  const copySnippet = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedSection(id)
    setTimeout(() => setCopiedSection(null), 2000)
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
            <span className="text-ink-blue">Handwritten Field Manual &amp; Docs</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border-2 border-pencil-black shadow-scribely-sm rounded-full -rotate-1">
            <span className="w-2.5 h-2.5 rounded-full bg-ink-blue" />
            <span className="text-xs font-mono font-black uppercase tracking-wider text-ink-blue">
              Field Manual &bull; Comprehensive Reference
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-display text-ink-blue tracking-tight">
            GitKura (Git蔵) Field Manual
          </h1>
          <p className="font-hand text-2xl text-[#475569] max-w-3xl font-medium">
            The complete operational reference for setting up air-gapped repositories, configuring tokens, and securing multi-cloud pipelines.
          </p>
        </div>

        {/* Manual Chapters Layout */}
        <div className="space-y-8 max-w-5xl mx-auto">
          {/* Chapter 1: The Lore & Philosophy */}
          <div className="scribely-card p-6 sm:p-8 bg-white shadow-scribely-xl space-y-4 relative">
            <div className="washi-tape -top-3 left-10 -rotate-1" />
            <span className="text-xs font-mono font-bold bg-[#dbeafe] text-ink-blue px-2 py-0.5 rounded border border-pencil-black">
              Chapter 01 &bull; Lore &amp; Philosophy
            </span>
            <h2 className="text-2xl font-black font-display text-ink-blue">
              The Architecture of a Kura (蔵)
            </h2>
            <p className="font-kalam text-base sm:text-lg text-[#475569] leading-relaxed font-bold">
              In traditional Japanese towns, a Kura (蔵) was built with thick earthen walls, fire-resistant timber, and dual heavy locking gates. While residential homes were vulnerable to city fires, the Kura protected legal deeds, family treasures, and sacred scrolls.
            </p>
            <p className="font-kalam text-base sm:text-lg text-[#475569] leading-relaxed font-bold">
              GitKura translates this ancient architectural wisdom into the modern software era. By maintaining local uncompressed mirrors and redundant encrypted cloud snapshots, your source code is preserved even if upstream clouds suffer severe catastrophic failure.
            </p>
          </div>

          {/* Chapter 2: Quick Start & Installation */}
          <div className="scribely-card p-6 sm:p-8 bg-white shadow-scribely-xl space-y-4 relative">
            <div className="washi-tape-blue -top-3 right-10 rotate-1" />
            <span className="text-xs font-mono font-bold bg-highlighter-mint text-[#15803d] px-2 py-0.5 rounded border border-pencil-black">
              Chapter 02 &bull; Quick Start &amp; Setup
            </span>
            <h2 className="text-2xl font-black font-display text-ink-blue">
              Developer Prerequisites &amp; Installation
            </h2>
            <p className="font-hand text-lg text-[#475569] leading-relaxed font-medium">
              GitKura requires Git to be installed on your operating system and a GitHub Personal Access Token (PAT) with `repo` and `read:org` scopes.
            </p>

            <div className="bg-[#1e293b] rounded-2xl p-5 border-2 border-pencil-black font-mono text-xs text-slate-200 shadow-inner">
              <pre className="text-slate-300 leading-relaxed whitespace-pre">
{`# 1. Clone repository from GitHub
git clone https://github.com/nishantgaurav/gitkura.git
cd gitkura

# 2. Install dependencies
npm install

# 3. Launch application in development mode
npm run dev

# 4. Package standalone installer for your OS
npm run package:win    # Windows .exe & portable
npm run package:mac    # macOS .dmg universal
npm run package:linux  # Linux .AppImage & .deb`}</pre>
            </div>
          </div>

          {/* Chapter 3: PAT Security & Scopes */}
          <div className="scribely-card p-6 sm:p-8 bg-white shadow-scribely-xl space-y-4 relative">
            <div className="washi-tape-green -top-3 left-10 -rotate-2" />
            <span className="text-xs font-mono font-bold bg-[#fef08a] text-ink-blue px-2 py-0.5 rounded border border-pencil-black">
              Chapter 03 &bull; Security &amp; Token Scopes
            </span>
            <h2 className="text-2xl font-black font-display text-ink-blue">
              Token Generation &amp; Scope Checklist
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 bg-[#fdfbf7] rounded-xl border border-pencil-black space-y-1">
                <span className="font-bold text-ink-blue block">`repo` Scope (Mandatory)</span>
                <p className="text-[#64748b]">Grants read access to clone private, organization, and public repositories.</p>
              </div>
              <div className="p-4 bg-[#fdfbf7] rounded-xl border border-pencil-black space-y-1">
                <span className="font-bold text-ink-blue block">`read:org` Scope (Optional)</span>
                <p className="text-[#64748b]">Enables repository discovery across enterprise organizations and team memberships.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
