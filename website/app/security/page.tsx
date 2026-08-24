'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  ShieldCheck,
  Lock,
  EyeOff,
  KeyRound,
  CheckCircle2,
  FileCode,
  Shield,
  Terminal,
} from 'lucide-react'

export default function SecurityPage() {
  const securityFeatures = [
    {
      title: 'AES-256 Local Store Encryption',
      spec: 'electron-store with custom PBKDF2 derivative key',
      description: 'Personal Access Tokens (PAT), Telegram Bot Tokens, AWS S3 keys, and Google Service Account JSONs are encrypted locally on disk. Plaintext secrets are never stored anywhere.',
      codeSnippet: `// electron/store/store.ts
const store = new Store<StoreSchema>({
  name: 'gitkura-vault-store',
  encryptionKey: 'gitkura-vault-secret-key-v2', // AES-256 on disk
  defaults: { ... }
})`,
    },
    {
      title: 'ContextBridge IPC Sandboxing',
      spec: 'contextIsolation: true & nodeIntegration: false',
      description: 'The React renderer process has zero access to Node.js APIs or child_process execution. Communication is restricted strictly to whitelisted IPC channels.',
      codeSnippet: `// electron/preload.ts
contextBridge.exposeInMainWorld('api', {
  invoke: (channel: string, ...args: unknown[]) => {
    if (!invokeSet.has(channel)) {
      throw new Error(\`IPC channel "\${channel}" is not allowed\`)
    }
    return ipcRenderer.invoke(channel, ...args)
  }
})`,
    },
    {
      title: '100% Zero-Telemetry Guarantee',
      spec: 'No Sentry, No PostHog, No Google Analytics, No Beacons',
      description: 'GitKura contains no tracking scripts or remote analytics. Your repository lists, metadata, and commits travel exclusively between your machine and your chosen cloud endpoints.',
      codeSnippet: `// Network Policy: Direct P2P Client-to-Server
[Your Computer] ─────────(HTTPS Direct)─────────> [GitHub API]
[Your Computer] ─────────(HTTPS Direct)─────────> [Telegram / S3 / GDrive]
// Zero intermediary servers or analytics proxies exist.`,
    },
    {
      title: 'Memory Token Sanitization & Scrubbing',
      spec: 'In-flight credential scrubbing from Git remote URLs & logs',
      description: 'Whenever Git transactions finish, authentication tokens are immediately removed from the remote origin URL and sanitized from local logs to prevent leakage.',
      codeSnippet: `// electron/services/git.service.ts
const authUrl = this.sanitizeUrl(cloneUrl, token)
await git.remote(['set-url', 'origin', authUrl])
await git.fetch(['--all', '--prune'])
// Immediately scrub token after operation:
await git.remote(['set-url', 'origin', cloneUrl])`,
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
            <span className="text-ink-blue">Security &amp; Cryptography Vault</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border-2 border-pencil-black shadow-scribely-sm rounded-full -rotate-1">
            <span className="w-2.5 h-2.5 rounded-full bg-ink-blue" />
            <span className="text-xs font-mono font-black uppercase tracking-wider text-ink-blue">
              Chapter 05 &bull; Cryptography &amp; Zero Trust
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-display text-ink-blue tracking-tight">
            Air-Gapped Security &amp; Cryptography
          </h1>
          <p className="font-hand text-2xl text-[#475569] max-w-3xl font-medium">
            Local AES-256 disk encryption, zero-telemetry architecture, and sandboxed IPC memory isolation.
          </p>
        </div>

        {/* Security Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {securityFeatures.map((sec, idx) => (
            <div
              key={idx}
              className="scribely-card p-6 sm:p-8 bg-white shadow-scribely-xl space-y-4 relative flex flex-col justify-between"
            >
              <div className="washi-tape -top-2.5 right-8 rotate-1" />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black font-display text-ink-blue">
                    {sec.title}
                  </h2>
                  <ShieldCheck className="w-5 h-5 text-[#15803d]" />
                </div>

                <span className="text-xs font-mono font-bold bg-[#fdfbf7] text-[#64748b] px-2.5 py-1 rounded border border-pencil-black block">
                  {sec.spec}
                </span>

                <p className="font-hand text-lg text-[#475569] leading-relaxed font-medium">
                  {sec.description}
                </p>
              </div>

              <div className="bg-[#1e293b] rounded-xl p-4 border-2 border-pencil-black font-mono text-xs text-slate-200 shadow-inner overflow-x-auto mt-4">
                <pre className="text-slate-300 whitespace-pre leading-relaxed">{sec.codeSnippet}</pre>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
