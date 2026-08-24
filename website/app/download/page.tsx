'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  Download,
  ShieldCheck,
  Cpu,
  HardDrive,
  Terminal,
  Layers,
  Github,
  CheckCircle2,
} from 'lucide-react'

export default function DownloadPage() {
  const releases = [
    {
      os: 'Windows 10 / 11',
      version: 'v1.1.0',
      badge: 'Recommended',
      installerName: 'GitKura-Setup-1.1.0.exe',
      portableName: 'GitKura-Portable-1.1.0.exe',
      size: '84.2 MB',
      arch: 'x64 / ARM64',
      downloadUrl: 'https://github.com/nishantgaurav/gitkura/releases',
    },
    {
      os: 'macOS (Apple Silicon & Intel)',
      version: 'v1.1.0',
      badge: 'Universal Binary',
      installerName: 'GitKura-1.1.0-universal.dmg',
      portableName: 'GitKura-macOS.zip',
      size: '88.5 MB',
      arch: 'M1 / M2 / M3 & Intel x64',
      downloadUrl: 'https://github.com/nishantgaurav/gitkura/releases',
    },
    {
      os: 'Linux (Ubuntu, Debian, Fedora, Arch)',
      version: 'v1.1.0',
      badge: 'AppImage & DEB',
      installerName: 'GitKura-1.1.0.AppImage',
      portableName: 'gitkura_1.1.0_amd64.deb',
      size: '79.1 MB',
      arch: 'x86_64 / aarch64',
      downloadUrl: 'https://github.com/nishantgaurav/gitkura/releases',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-highlighter-yellow selection:text-ink-blue">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12 w-full">
        {/* Breadcrumb Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#64748b]">
            <Link href="/" className="hover:text-ink-blue underline">GitKura Home</Link>
            <span>/</span>
            <span className="text-ink-blue">Download Releases</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border-2 border-pencil-black shadow-scribely-sm rounded-full -rotate-1">
            <span className="w-2.5 h-2.5 rounded-full bg-ink-blue" />
            <span className="text-xs font-mono font-black uppercase tracking-wider text-ink-blue">
              Official Binaries &bull; v1.1.0 Stable
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-display text-ink-blue tracking-tight">
            Download GitKura Desktop Vault
          </h1>
          <p className="font-hand text-2xl text-[#475569] max-w-3xl font-medium">
            Standalone, air-gapped installers for Windows, macOS, and Linux. 100% free and open-source under MIT.
          </p>
        </div>

        {/* Release Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {releases.map((rel, idx) => (
            <div
              key={idx}
              className="scribely-card p-6 sm:p-8 bg-white shadow-scribely-xl space-y-6 relative flex flex-col justify-between"
            >
              <div className="washi-tape -top-2.5 left-8 rotate-1" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold bg-[#dbeafe] text-ink-blue px-2.5 py-1 rounded-lg border border-pencil-black">
                    {rel.badge}
                  </span>
                  <span className="text-xs font-mono font-black text-[#15803d]">
                    {rel.version}
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl font-black font-display text-ink-blue">
                    {rel.os}
                  </h2>
                  <p className="font-mono text-xs text-[#64748b] mt-1">
                    Architecture: {rel.arch} &bull; Size: {rel.size}
                  </p>
                </div>

                <div className="space-y-2 pt-2 text-xs font-mono">
                  <div className="p-3 bg-[#fdfbf7] rounded-xl border border-pencil-black">
                    <span className="text-[#64748b] block text-[10px]">Primary Package:</span>
                    <span className="font-bold text-ink-blue">{rel.installerName}</span>
                  </div>
                  <div className="p-3 bg-[#fdfbf7] rounded-xl border border-pencil-black">
                    <span className="text-[#64748b] block text-[10px]">Portable Package:</span>
                    <span className="font-bold text-ink-blue">{rel.portableName}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-dashed border-pencil-black/20">
                <a
                  href={rel.downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-ink-blue hover:bg-ink-hover text-white scribely-btn rounded-xl text-xs font-black font-display flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-highlighter-yellow" />
                  <span>Download Binary</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* System Requirements & Verification Box */}
        <div className="scribely-card p-6 sm:p-8 bg-white shadow-scribely-xl space-y-4">
          <h3 className="text-xl font-black font-display text-ink-blue flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#15803d]" />
            <span>System Prerequisites &amp; Verification</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-[#fdfbf7] rounded-xl border border-pencil-black space-y-1">
              <span className="font-black text-ink-blue block">Git CLI Installed</span>
              <p className="text-[#64748b]">Requires `git` accessible in system PATH for mirror operations.</p>
            </div>
            <div className="p-4 bg-[#fdfbf7] rounded-xl border border-pencil-black space-y-1">
              <span className="font-black text-ink-blue block">GitHub Personal Access Token</span>
              <p className="text-[#64748b]">Generate a PAT with `repo` and `read:org` scopes.</p>
            </div>
            <div className="p-4 bg-[#fdfbf7] rounded-xl border border-pencil-black space-y-1">
              <span className="font-black text-ink-blue block">RAM &amp; Storage</span>
              <p className="text-[#64748b]">Requires ~40MB RAM for background daemon + storage space for vault.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
