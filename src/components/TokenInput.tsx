import { useState } from 'react'
import { ipcInvoke } from '../hooks/useIpc'

interface TokenValidation {
  valid: boolean
  user?: string
  name?: string
  avatarUrl?: string
  profileUrl?: string
  publicRepos?: number
  privateRepos?: number
  scopes?: string[]
  error?: string
}

interface Props {
  token: string
  onTokenChange: (token: string) => void
}

export default function TokenInput({ token, onTokenChange }: Props) {
  const [validating, setValidating] = useState(false)
  const [status, setStatus] = useState<TokenValidation | null>(null)
  const [showToken, setShowToken] = useState(false)

  const validate = async () => {
    if (!token.trim()) return
    setValidating(true)
    setStatus(null)
    try {
      const result = await ipcInvoke<TokenValidation>(
        'kura:github:validate-token',
        token,
      )
      setStatus(result)
    } catch {
      setStatus({ valid: false, error: 'Failed to validate GitHub token' })
    } finally {
      setValidating(false)
    }
  }

  const disconnect = () => {
    onTokenChange('')
    setStatus(null)
  }

  return (
    <div className="scribely-card p-7 relative overflow-visible">
      {/* Washi Tape strip on top */}
      <div className="washi-tape -top-2.5 left-8 -rotate-1 shadow-xs" />

      {/* Header */}
      <div className="flex items-center gap-3.5 mb-5">
        <div className="w-12 h-12 bg-[#fef08a] border-2 border-[#2d2d2d] shadow-scribely-sm rounded-2xl flex items-center justify-center text-[#1a3a5f] flex-shrink-0 rotate-1">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-black font-display text-[#1a3a5f] tracking-tight">GitHub Authentication</h3>
            <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-[#dbeafe] text-[#1a3a5f] border border-[#1a3a5f]/40 rounded-md">
              PAT v2
            </span>
          </div>
          <p className="font-hand text-base text-[#64748b] leading-tight font-medium">
            generate a personal access token with repo permissions
          </p>
        </div>
      </div>

      {/* Input Group */}
      <div className="flex gap-3 mb-5">
        <div className="relative flex-1">
          <input
            type={showToken ? 'text' : 'password'}
            value={token}
            onChange={(e) => {
              onTokenChange(e.target.value)
              setStatus(null)
            }}
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            className="w-full bg-[#fdfbf7] border-2 border-[#2d2d2d] rounded-2xl px-4 py-3.5 text-sm text-[#2d2d2d] placeholder-[#94a3b8] focus:outline-none focus:bg-white focus:shadow-scribely-sm pr-16 font-mono font-bold transition-all"
          />
          <button
            type="button"
            onClick={() => setShowToken(!showToken)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#1a3a5f] text-xs font-bold px-2.5 py-1 bg-white rounded-lg border-2 border-[#2d2d2d] shadow-xs cursor-pointer active:scale-95"
          >
            {showToken ? 'Hide' : 'Show'}
          </button>
        </div>
        <button
          onClick={validate}
          disabled={validating || !token.trim()}
          className="px-6 py-3.5 bg-[#1a3a5f] hover:bg-[#244975] disabled:bg-[#cbd5e1] disabled:text-[#64748b] disabled:border-[#94a3b8] disabled:shadow-none text-white scribely-btn rounded-2xl text-sm font-black flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed flex-shrink-0"
        >
          {validating ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 text-[#fef08a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              <span>Verify & Lock</span>
            </>
          )}
        </button>
      </div>

      {/* Connected Account Card */}
      {status?.valid && (
        <div className="p-4 bg-[#dcfce7] border-2 border-[#15803d] rounded-2xl flex items-center justify-between mb-5 shadow-scribely-sm relative">
          <div className="washi-tape-green -top-2 right-6 rotate-1 shadow-xs" />
          <div className="flex items-center gap-3.5">
            <img
              src={status.avatarUrl}
              alt={status.user}
              className="w-10 h-10 rounded-full border-2 border-[#2d2d2d]"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black font-display text-[#1a3a5f]">{status.name || status.user}</span>
                <span className="text-xs text-[#15803d] font-mono font-bold">@{status.user}</span>
              </div>
              <p className="font-hand text-base text-[#166534] leading-tight font-medium">
                Verified: {status.publicRepos ?? 0} public, {status.privateRepos ?? 0} private repositories available for vault.
              </p>
            </div>
          </div>
          <button
            onClick={disconnect}
            className="text-xs font-bold text-[#b91c1c] hover:bg-[#fee2e2] px-3.5 py-1.5 rounded-xl border-2 border-[#b91c1c] bg-white shadow-xs cursor-pointer"
          >
            Disconnect
          </button>
        </div>
      )}

      {/* Error Card */}
      {status && !status.valid && (
        <div className="text-xs px-4 py-3 rounded-2xl bg-[#fee2e2] text-[#991b1b] border-2 border-[#dc2626] mb-5 flex items-center gap-2.5 font-bold shadow-scribely-sm">
          <svg className="w-4 h-4 text-[#dc2626] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <span>{status.error || 'Token validation failed. Please check permissions.'}</span>
        </div>
      )}

      {/* 3 Scribely Sticky Note Guides */}
      <div className="mt-2 p-5 bg-[#fdfbf7] rounded-2xl border-2 border-dashed border-[#2d2d2d]/30">
        <div className="flex items-center gap-2 mb-3.5">
          <span className="font-hand text-lg font-bold text-[#1a3a5f]">
            Sticky Guide • Generating Your PAT:
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
          <div className="p-3.5 bg-white rounded-xl border-2 border-[#2d2d2d] shadow-scribely-sm -rotate-0.5">
            <span className="font-mono font-bold text-[#1a3a5f] block mb-1">Step 1: Settings</span>
            <p className="font-hand text-xs text-[#475569] leading-snug">
              GitHub &gt; Settings &gt; Developer settings &gt; Personal access tokens.
            </p>
          </div>
          <div className="p-3.5 bg-[#fef08a] rounded-xl border-2 border-[#2d2d2d] shadow-scribely-sm rotate-0.5">
            <span className="font-mono font-bold text-[#1a3a5f] block mb-1">Step 2: Scopes</span>
            <p className="font-hand text-xs text-[#475569] leading-snug">
              Check <span className="font-bold underline">repo</span> (Full control) and <span className="font-bold underline">read:org</span>.
            </p>
          </div>
          <div className="p-3.5 bg-white rounded-xl border-2 border-[#2d2d2d] shadow-scribely-sm -rotate-0.5">
            <span className="font-mono font-bold text-[#1a3a5f] block mb-1">Step 3: Encrypt</span>
            <p className="font-hand text-xs text-[#475569] leading-snug">
              Paste above. Token is AES encrypted locally on your drive.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
