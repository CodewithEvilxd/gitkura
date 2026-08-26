'use client'

import React, { useState } from 'react'
import { Download, FolderTree, Terminal, CheckCircle2, Play, Key, HardDrive, ArrowRight } from 'lucide-react'
import CodeTerminalBlock from '@/components/CodeTerminalBlock'
import InkanStamp from '@/components/InkanStamp'
import HighlighterBadge from '@/components/HighlighterBadge'

export default function Chapter02Installation() {
  const [pkgTab, setPkgTab] = useState<'winget' | 'brew' | 'linux' | 'portable'>('winget')

  return (
    <div className="space-y-6 pt-2">
      {/* Chapter Stamp Header */}
      <div className="flex items-center justify-between border-b-2 border-dashed border-pencil-black/20 pb-3">
        <InkanStamp kanji="始" subtext="STANDALONE BINARIES" variant="navy" />
        <HighlighterBadge color="yellow" variant="ribbon" size="md">
          Setup &bull; Chapter 02
        </HighlighterBadge>
      </div>

      <p className="font-patrick text-base text-[#475569]">
        GitKura is distributed as standalone, air-gapped desktop binaries for Windows, macOS, and Linux with zero external telemetry dependencies. It runs completely offline on your host OS.
      </p>

      {/* 3 OS Download Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black space-y-3 shadow-scribely-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-ink-blue">Windows</span>
            <HighlighterBadge color="sky" variant="ribbon" size="sm">
              64-bit
            </HighlighterBadge>
          </div>
          <div className="text-xs font-mono text-[#64748b] space-y-1">
            <div>Package: <span className="font-bold text-ink-blue">NSIS Setup</span></div>
            <div>File: <span className="text-ink-blue font-bold">GitKura.Setup.1.1.0.exe</span></div>
            <div>Size: <span className="font-bold">100 MB</span></div>
          </div>
          <a
            href="https://github.com/CodewithEvilxd/gitkura/releases/download/v1.1.0/GitKura.Setup.1.1.0.exe"
            className="w-full py-2 bg-ink-blue text-white rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 hover:bg-ink-hover cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-highlighter-yellow" />
            <span>Download .exe</span>
          </a>
        </div>

        <div className="p-4 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black space-y-3 shadow-scribely-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-ink-blue">macOS</span>
            <HighlighterBadge color="purple" variant="ribbon" size="sm">
              Universal
            </HighlighterBadge>
          </div>
          <div className="text-xs font-mono text-[#64748b] space-y-1">
            <div>Arch: <span className="font-bold text-ink-blue">Apple Silicon &amp; Intel</span></div>
            <div>File: <span className="text-ink-blue font-bold">GitKura-1.1.0-arm64.dmg</span></div>
            <div>Size: <span className="font-bold">117 MB</span></div>
          </div>
          <a
            href="https://github.com/CodewithEvilxd/gitkura/releases/download/v1.1.0/GitKura-1.1.0-arm64.dmg"
            className="w-full py-2 bg-ink-blue text-white rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 hover:bg-ink-hover cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-highlighter-yellow" />
            <span>Download .dmg</span>
          </a>
        </div>

        <div className="p-4 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black space-y-3 shadow-scribely-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-ink-blue">Linux</span>
            <HighlighterBadge color="emerald" variant="ribbon" size="sm">
              AppImage
            </HighlighterBadge>
          </div>
          <div className="text-xs font-mono text-[#64748b] space-y-1">
            <div>Format: <span className="font-bold text-ink-blue">Standalone AppImage</span></div>
            <div>File: <span className="text-ink-blue font-bold">GitKura-1.1.0.AppImage</span></div>
            <div>Size: <span className="font-bold">123 MB</span></div>
          </div>
          <a
            href="https://github.com/CodewithEvilxd/gitkura/releases/download/v1.1.0/GitKura-1.1.0.AppImage"
            className="w-full py-2 bg-ink-blue text-white rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 hover:bg-ink-hover cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-highlighter-yellow" />
            <span>Download AppImage</span>
          </a>
        </div>
      </div>

      {/* 3-Step First Run Visual Guide */}
      <div className="p-5 sm:p-7 bg-[#fdfbf7] rounded-3xl border-2 border-pencil-black shadow-scribely-sm space-y-4">
        <div className="border-b-2 border-dashed border-pencil-black/20 pb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-black font-display text-ink-blue">
              First-Run Setup Flow (Under 60 Seconds)
            </h3>
            <p className="font-caveat text-base text-[#64748b] font-bold">
              3 simple steps from fresh download to first full vault snapshot
            </p>
          </div>
          <HighlighterBadge color="yellow" variant="ribbon" size="md">
            Quickstart Flow
          </HighlighterBadge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 bg-white rounded-2xl border-2 border-pencil-black/20 space-y-2 relative">
            <div className="w-7 h-7 rounded-full bg-ink-blue text-white font-mono font-black text-xs flex items-center justify-center">
              1
            </div>
            <span className="font-display font-black text-sm text-ink-blue block">
              Paste GitHub PAT Token
            </span>
            <p className="font-mono text-xs text-[#475569]">
              Enter your token with `repo` and `read:org` scopes. It is encrypted on disk with AES-256 immediately.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border-2 border-pencil-black/20 space-y-2 relative">
            <div className="w-7 h-7 rounded-full bg-ink-blue text-white font-mono font-black text-xs flex items-center justify-center">
              2
            </div>
            <span className="font-display font-black text-sm text-ink-blue block">
              Choose Local Vault Folder
            </span>
            <p className="font-mono text-xs text-[#475569]">
              Pick your local drive path, external SSD, or NAS folder (e.g. `C:/GitKura-Vault` or `/Volumes/Vault`).
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border-2 border-pencil-black/20 space-y-2 relative">
            <div className="w-7 h-7 rounded-full bg-[#15803d] text-white font-mono font-black text-xs flex items-center justify-center">
              3
            </div>
            <span className="font-display font-black text-sm text-[#15803d] block">
              Start Mirroring
            </span>
            <p className="font-mono text-xs text-[#475569]">
              Click Start Mirroring to stream all repositories, packfiles, tags, and cloud backups in parallel.
            </p>
          </div>
        </div>
      </div>

      {/* Package Manager One-Liners */}
      <div className="p-5 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black space-y-3 shadow-scribely-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-dashed border-pencil-black/20 pb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-ink-blue" />
            <span className="font-display font-black text-sm text-ink-blue">
              CLI &amp; Package Manager Install One-Liners
            </span>
          </div>
          <div className="flex gap-1.5">
            {[
              { key: 'winget', label: 'winget (Windows)' },
              { key: 'brew', label: 'Homebrew (macOS)' },
              { key: 'linux', label: 'curl (Linux)' },
              { key: 'portable', label: 'Portable ZIP' },
            ].map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setPkgTab(t.key as any)}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono font-bold transition-all cursor-pointer ${
                  pkgTab === t.key
                    ? 'bg-ink-blue text-white border-pencil-black shadow-scribely-xs'
                    : 'bg-white text-ink-blue border-pencil-black/20 hover:border-pencil-black'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {pkgTab === 'winget' && (
          <CodeTerminalBlock
            title="powershell - winget install"
            language="bash"
            code={`# Install GitKura via Windows Package Manager
winget install CodewithEvilxd.GitKura`}
          />
        )}

        {pkgTab === 'brew' && (
          <CodeTerminalBlock
            title="bash - homebrew cask"
            language="bash"
            code={`# Install GitKura via Homebrew on macOS (Intel & Apple Silicon)
brew install --cask codewithevilxd/tap/gitkura`}
          />
        )}

        {pkgTab === 'linux' && (
          <CodeTerminalBlock
            title="bash - direct standalone appimage"
            language="bash"
            code={`# Download and run standalone AppImage directly
curl -L -O https://github.com/CodewithEvilxd/gitkura/releases/download/v1.1.0/GitKura-1.1.0.AppImage
chmod +x GitKura-1.1.0.AppImage
./GitKura-1.1.0.AppImage`}
          />
        )}

        {pkgTab === 'portable' && (
          <CodeTerminalBlock
            title="bash - portable standalone binary"
            language="bash"
            code={`# Extract portable zero-install zip to any folder or USB drive
unzip GitKura-1.1.0-portable.zip -d ~/GitKura-App
~/GitKura-App/gitkura`}
          />
        )}
      </div>

      {/* Vault Directory Structure Card */}
      <div className="p-5 sm:p-7 bg-[#fdfbf7] rounded-3xl border-2 border-pencil-black shadow-scribely-sm space-y-3">
        <div className="flex items-center justify-between border-b-2 border-dashed border-pencil-black/20 pb-3">
          <div className="flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-ink-blue" />
            <h3 className="text-lg font-black font-display text-ink-blue">
              Vault Directory Hierarchy &amp; Inode Layout
            </h3>
          </div>
          <span className="text-xs font-mono text-[#64748b] bg-white px-2.5 py-1 rounded-lg border border-pencil-black/20">
            Self-Contained Storage
          </span>
        </div>

        <div className="p-4 bg-[#1e293b] text-slate-200 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed">
          <pre>{`C:/GitKura-Vault/
├── .archives/                # Point-in-time compressed snapshots (.tar.gz & .zip)
│   ├── owner__core-app_2026-08-26.tar.gz
│   └── owner__backend-api_2026-08-26.tar.gz
├── .logs/                    # Local audit journals & operational records (zero external telemetry)
│   └── sync-audit-2026-08.log
└── owner/                    # Direct uncompressed Git mirrors with all branches checked out
    ├── core-app/             # Raw Git repository: cd here & work directly during outages!
    │   ├── .git/
    │   └── src/
    └── backend-api/          # Full commit history & tags intact`}</pre>
        </div>
        <p className="font-kalam text-sm text-[#475569]">
          <span className="text-[#15803d] font-bold">↳ Pro-tip:</span> You can point your local vault directory to an external SSD, encrypted BitLocker volume, or local Synology NAS mount!
        </p>
      </div>

      {/* Terminal Code Block */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-ink-blue block">
          Build &amp; Run from Source (Developer Workflow):
        </span>
        <CodeTerminalBlock
          title="bash - gitkura build pipeline"
          tabs={[
            {
              label: 'Linux / macOS',
              language: 'bash',
              code: `# 1. Clone official repository
git clone https://github.com/CodewithEvilxd/gitkura.git
cd gitkura

# 2. Install dependencies (Electron 41, React 19, Simple-Git, AWS SDK)
npm install

# 3. Launch in development mode
npm run dev

# 4. Compile and package standalone binaries
npm run package:mac    # macOS Universal .dmg
npm run package:linux  # Linux .AppImage & .deb`,
            },
            {
              label: 'Windows (PowerShell)',
              language: 'bash',
              code: `# 1. Clone repository
git clone https://github.com/CodewithEvilxd/gitkura.git
cd gitkura

# 2. Install dependencies
npm install

# 3. Launch dev server
npm run dev

# 4. Package Windows NSIS Setup & Portable .exe
npm run package:win`,
            },
          ]}
        />
      </div>
    </div>
  )
}
