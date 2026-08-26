'use client'

import React, { useState } from 'react'
import { Lock, ShieldCheck, Terminal, Search, Shield, Eye, EyeOff, Check } from 'lucide-react'
import CodeTerminalBlock from '@/components/CodeTerminalBlock'
import InkanStamp from '@/components/InkanStamp'
import HighlighterBadge from '@/components/HighlighterBadge'

interface ChapterProps {
  setLightboxImg: (img: { src: string; caption: string }) => void
}

export default function Chapter10Security({ setLightboxImg }: ChapterProps) {
  const [plaintextInput, setPlaintextInput] = useState('ghp_928374981729384719283471928347192834')
  const [showSecret, setShowSecret] = useState(false)
  const [copiedCipher, setCopiedCipher] = useState(false)

  // Deterministic mock AES-256-CBC output simulation
  const mockSalt = '7f8a1c9e3b4d2f0a'
  const mockIv = 'a1b2c3d4e5f60718'
  const mockCiphertext = '9e4a7c8b2d1f0e3a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a'

  const handleCopyCipher = () => {
    navigator.clipboard.writeText(mockCiphertext)
    setCopiedCipher(true)
    setTimeout(() => setCopiedCipher(false), 2000)
  }

  return (
    <div className="space-y-6 pt-2">
      {/* Chapter Stamp Header */}
      <div className="flex items-center justify-between border-b-2 border-dashed border-pencil-black/20 pb-3">
        <InkanStamp kanji="秘" subtext="ZERO-TRUST ENCRYPTION" variant="red" />
        <HighlighterBadge color="yellow" variant="ribbon" size="md">
          Cryptography &bull; Chapter 10
        </HighlighterBadge>
      </div>

      <div className="space-y-3 font-patrick text-base text-[#334155] leading-relaxed">
        <p>
          GitKura operates under a strict <strong>Zero-Trust Process Isolation Architecture</strong>. The Electron Renderer process runs in a sandboxed, isolated Chromium execution environment with <code>nodeIntegration: false</code> and <code>contextIsolation: true</code>.
        </p>
        <p>
          All sensitive cryptographic operations, master key derivations, and raw filesystem I/O are strictly contained within the Node.js Main Process. The UI interacts solely via explicit, whitelisted IPC channel invocations exposed through the <code>contextBridge</code> gateway.
        </p>
      </div>

      {/* 3 Sandboxing Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
        <div className="p-4 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black space-y-1 shadow-scribely-xs">
          <div className="flex items-center gap-2 font-display font-black text-ink-blue text-sm">
            <Lock className="w-4 h-4 text-purple-600" />
            <span>Process Sandboxing</span>
          </div>
          <p className="text-[11px] text-[#64748b]">
            Zero Node.js primitives exposed to Chromium UI window.
          </p>
        </div>

        <div className="p-4 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black space-y-1 shadow-scribely-xs">
          <div className="flex items-center gap-2 font-display font-black text-ink-blue text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>AES-256-CBC</span>
          </div>
          <p className="text-[11px] text-[#64748b]">
            10,000 PBKDF2 iterations with unique per-repo salt.
          </p>
        </div>

        <div className="p-4 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black space-y-1 shadow-scribely-xs">
          <div className="flex items-center gap-2 font-display font-black text-ink-blue text-sm">
            <Terminal className="w-4 h-4 text-blue-600" />
            <span>IPC Whitelisting</span>
          </div>
          <p className="text-[11px] text-[#64748b]">
            Only verified channels exposed via <code>preload.js</code>.
          </p>
        </div>
      </div>

      {/* Process Isolation Blueprint Diagram */}
      <div className="space-y-2.5 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <HighlighterBadge color="purple" variant="ribbon" size="md">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#7c3aed]" />
              <span>Fig 10.1 &bull; Electron Sandboxing Topology</span>
            </span>
          </HighlighterBadge>
          <HighlighterBadge color="amber" variant="ribbon" size="md">
            Zero-Trust Isolation
          </HighlighterBadge>
        </div>

        <div
          onClick={() =>
            setLightboxImg({
              src: '/diagrams/zero-trust-sandboxing.jpg',
              caption: 'Figure 10.1: GitKura Electron Sandboxing & Process Boundary',
            })
          }
          className="relative w-full p-2.5 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black shadow-scribely-sm cursor-zoom-in"
        >
          <img
            src="/diagrams/zero-trust-sandboxing.jpg"
            alt="GitKura Electron Sandboxing & Process Boundary"
            draggable={false}
            className="w-full h-auto max-h-[520px] object-contain rounded-xl select-none pointer-events-none mix-blend-multiply"
          />
        </div>

        <div className="pt-2 border-t-2 border-dashed border-pencil-black/15 flex items-center justify-between">
          <span className="font-kalam text-sm font-bold text-[#1a3a5f] flex items-center gap-1.5">
            <span>↳</span> Isolated Preload bridge blocks remote code execution &bull; AES-256 cipher locks secrets
          </span>
          <span className="font-mono text-[10px] text-ink-blue font-bold flex items-center gap-1">
            <Search className="w-3 h-3 text-ink-blue" />
            <span>Inspect Full-Res</span>
          </span>
        </div>
      </div>

      {/* Process Boundary Defense Note */}
      <div className="p-5 bg-[#fdfbf7] rounded-3xl border-2 border-pencil-black shadow-scribely-sm space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between border-b-2 border-dashed border-pencil-black/20 pb-3">
          <span className="font-display font-black text-ink-blue text-sm">
            Electron Zero-Trust Boundary &amp; PBKDF2 Cost Analysis
          </span>
          <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-pencil-black/20 text-[#64748b]">
            Defense-in-Depth
          </span>
        </div>
        <div className="p-3 bg-white rounded-xl border border-pencil-black/10 space-y-2 text-[#475569] break-words">
          <div className="text-[#b91c1c] font-bold">
            [Renderer Web Context] &rarr; nodeIntegration: false, contextIsolation: true
          </div>
          <div className="text-[#1d4ed8] font-bold">
            [Preload IPC Gateway] &rarr; Whitelist only (backup:start, config:get)
          </div>
          <div className="text-[#15803d] font-bold">
            [Main Kernel] &rarr; AES-256-CBC cipher with 10,000 PBKDF2 iterations (SHA-512)
          </div>
        </div>
        <p className="font-kalam text-sm text-[#1d4ed8]">
          ↳ Even if malicious third-party HTML/JS were injected into the UI, it can NEVER execute arbitrary shell commands or access raw files!
        </p>
      </div>

      {/* AES-256 Cryptographic Engine Implementation Code */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-ink-blue block">
          Cryptographic Key Derivation &amp; AES-256 Cipher (crypto.service.ts):
        </span>
        <CodeTerminalBlock
          title="crypto.service.ts"
          language="typescript"
          code={`import crypto from 'crypto'

const ALGORITHM = 'aes-256-cbc'
const PBKDF2_ITERATIONS = 10000
const KEY_LEN = 32
const IV_LEN = 16

// 1. Derive strong cryptographic key using PBKDF2 + SHA-512
export function deriveKey(masterPassword: string, salt: Buffer): Buffer {
  return crypto.pbkdf2Sync(masterPassword, salt, PBKDF2_ITERATIONS, KEY_LEN, 'sha512')
}

// 2. Encrypt buffer payload with random IV prefix
export function encryptPayload(data: Buffer, key: Buffer): Buffer {
  const iv = crypto.randomBytes(IV_LEN)
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)
  const encrypted = Buffer.concat([cipher.update(data), cipher.final()])
  // Store IV prepended to ciphertext: [16 bytes IV][Ciphertext]
  return Buffer.concat([iv, encrypted])
}

// 3. Decrypt buffer payload
export function decryptPayload(encryptedBuffer: Buffer, key: Buffer): Buffer {
  const iv = encryptedBuffer.subarray(0, IV_LEN)
  const ciphertext = encryptedBuffer.subarray(IV_LEN)
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
  return Buffer.concat([decipher.update(ciphertext), decipher.final()])
}`}
        />
      </div>

      {/* Preload ContextBridge Code */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-ink-blue block">
          Electron Process Isolation &amp; IPC Whitelist (preload.ts):
        </span>
        <CodeTerminalBlock
          title="electron/preload.ts"
          language="typescript"
          code={`// Strict ContextIsolation Bridge
import { contextBridge, ipcRenderer } from 'electron'

const WHITELIST_CHANNELS = [
  'backup:start',
  'backup:cancel',
  'config:get',
  'config:set',
  'repos:list',
  'logs:stream',
]

contextBridge.exposeInMainWorld('electronAPI', {
  invoke: (channel: string, data?: any) => {
    if (WHITELIST_CHANNELS.includes(channel)) {
      return ipcRenderer.invoke(channel, data)
    }
    throw new Error(\`Unauthorized IPC channel: \${channel}\`)
  },
})`}
        />
      </div>
    </div>
  )
}
