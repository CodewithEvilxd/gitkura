'use client'

import React, { useState } from 'react'
import { Lock, Sliders, ExternalLink, CheckCircle2, Terminal, Shield } from 'lucide-react'
import CodeTerminalBlock from '@/components/CodeTerminalBlock'
import InkanStamp from '@/components/InkanStamp'
import HighlighterBadge from '@/components/HighlighterBadge'

export default function Chapter03Security() {
  const [scopePrivate, setScopePrivate] = useState(true)
  const [scopeOrg, setScopeOrg] = useState(true)
  const [scopeUser, setScopeUser] = useState(false)
  const [scopePackages, setScopePackages] = useState(false)

  return (
    <div className="space-y-6 pt-2">
      {/* Chapter Stamp Header */}
      <div className="flex items-center justify-between border-b-2 border-dashed border-pencil-black/20 pb-3">
        <InkanStamp kanji="鍵" subtext="LEAST PRIVILEGE AUTH" variant="red" />
        <HighlighterBadge color="yellow" variant="ribbon" size="md">
          Security &bull; Chapter 03
        </HighlighterBadge>
      </div>

      <div className="space-y-3 font-patrick text-base text-[#334155] leading-relaxed">
        <p>
          GitKura communicates directly with the GitHub API via HTTPS with zero intermediary SaaS proxies. To enumerate repositories and stream commit packs, you must provision a GitHub Personal Access Token (PAT).
        </p>
        <p>
          GitKura enforces the principle of <strong>Least Privilege</strong>. We explicitly require only read permissions for cloning, and all tokens are stored locally encrypted using AES-256 with PBKDF2 salt derivation.
        </p>
      </div>

      {/* Scope Comparison Table */}
      <div className="border-2 border-pencil-black rounded-2xl overflow-x-auto shadow-scribely-sm bg-white">
        <table className="w-full min-w-[550px] text-xs font-mono text-left border-collapse">
          <thead className="bg-[#f1f5f9] border-b-2 border-pencil-black text-ink-blue">
            <tr>
              <th className="p-3 border-r border-pencil-black/20">Scope Name</th>
              <th className="p-3 border-r border-pencil-black/20">Access Level</th>
              <th className="p-3 border-r border-pencil-black/20">Requirement</th>
              <th className="p-3">Purpose in GitKura</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-pencil-black/10 text-[#334155]">
            <tr className="hover:bg-yellow-50/50">
              <td className="p-3 font-bold text-ink-blue border-r border-pencil-black/20">`repo`</td>
              <td className="p-3 border-r border-pencil-black/20">Full Control (Read/Write)</td>
              <td className="p-3 border-r border-pencil-black/20 text-[#15803d] font-bold">Mandatory for Private</td>
              <td className="p-3">Allows cloning and fetching private repositories, commits, refs, and tags.</td>
            </tr>
            <tr className="hover:bg-yellow-50/50">
              <td className="p-3 font-bold text-ink-blue border-r border-pencil-black/20">`read:org`</td>
              <td className="p-3 border-r border-pencil-black/20">Read-Only</td>
              <td className="p-3 border-r border-pencil-black/20 text-[#0284c7] font-bold">Required for Orgs</td>
              <td className="p-3">Enables automatic discovery of enterprise organization repositories.</td>
            </tr>
            <tr className="hover:bg-yellow-50/50">
              <td className="p-3 font-bold text-ink-blue border-r border-pencil-black/20">`read:user`</td>
              <td className="p-3 border-r border-pencil-black/20">Read-Only</td>
              <td className="p-3 border-r border-pencil-black/20 text-[#64748b]">Optional</td>
              <td className="p-3">Fetches user profile metadata and starred repositories.</td>
            </tr>
            <tr className="hover:bg-yellow-50/50">
              <td className="p-3 font-bold text-ink-blue border-r border-pencil-black/20">`read:packages`</td>
              <td className="p-3 border-r border-pencil-black/20">Read-Only</td>
              <td className="p-3 border-r border-pencil-black/20 text-[#64748b]">Optional</td>
              <td className="p-3">Allows backing up packages and releases attached to repositories.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Fine-Grained PAT vs Classic PAT Card */}
      <div className="p-5 sm:p-7 bg-[#fdfbf7] rounded-3xl border-2 border-pencil-black shadow-scribely-sm space-y-4">
        <div className="border-b-2 border-dashed border-pencil-black/20 pb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-black font-display text-ink-blue">
              Fine-Grained Personal Access Tokens (Beta)
            </h3>
            <p className="font-caveat text-base text-[#64748b] font-bold">
              Maximum security lockdown: Scope token access to exact repositories
            </p>
          </div>
          <span className="px-2.5 py-1 bg-white border border-pencil-black rounded-lg text-xs font-mono font-bold text-[#15803d] shadow-scribely-xs">
            Zero-Trust Scope
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3.5 bg-white rounded-xl border border-pencil-black/20 space-y-2">
            <span className="font-bold text-ink-blue block">1. Repository Permissions:</span>
            <ul className="space-y-1 text-[#475569]">
              <li>&bull; <strong>Contents:</strong> Read-only (cloning &amp; git delta fetches)</li>
              <li>&bull; <strong>Metadata:</strong> Read-only (repo names &amp; branches)</li>
              <li>&bull; <strong>Discussions / Issues:</strong> Optional Read-only</li>
            </ul>
          </div>
          <div className="p-3.5 bg-white rounded-xl border border-pencil-black/20 space-y-2">
            <span className="font-bold text-ink-blue block">2. Organization Permissions:</span>
            <ul className="space-y-1 text-[#475569]">
              <li>&bull; <strong>Organization Administration:</strong> None</li>
              <li>&bull; <strong>Members:</strong> Read-only (team repo enumeration)</li>
              <li>&bull; <strong>Webhooks:</strong> None (zero write access needed)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Token Masking Callout */}
      <div className="p-5 bg-[#fdfbf7] rounded-3xl border-2 border-pencil-black shadow-scribely-sm space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-ink-blue uppercase">
          <Lock className="w-4 h-4 text-[#e11d48]" />
          <span>Token In-Memory Sanitization &amp; Masking Rule</span>
        </div>
        <div className="p-3 bg-[#fff1f2] rounded-xl border border-rose-200 text-[#881337] font-mono text-xs overflow-x-auto break-all">
          <code>rawUrl.replace(/https:\/\/[^@]+@github\.com/, 'https://***@github.com')</code>
        </div>
        <p className="font-kalam text-sm text-[#475569]">
          ↳ Even if simple-git crashes or throws an exception, terminal logs and debug traces will NEVER expose your plaintext Personal Access Token.
        </p>
      </div>

      {/* 1-Click Token Validation cURL Snippet */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-ink-blue block">
          Verify Token Scopes via Terminal (1-Second Check):
        </span>
        <CodeTerminalBlock
          title="bash - verify github token scopes"
          language="bash"
          code={`# Run this curl command to check your token validity and active scopes
curl -H "Authorization: Bearer ghp_yourSecretTokenHere" \\
     -I https://api.github.com/user

# Expected Response Headers:
# x-oauth-scopes: repo, read:org
# x-ratelimit-remaining: 4999`}
        />
      </div>

      {/* Interactive Scope Calculator Tool */}
      <div className="p-5 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black space-y-4 shadow-scribely-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-ink-blue" />
            <span className="font-display font-black text-sm text-ink-blue">
              Interactive Token Scope Calculator
            </span>
          </div>
          <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-pencil-black/20 text-[#64748b]">
            Live Configuration
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <label className="flex items-center gap-2 p-2.5 bg-white rounded-xl border border-pencil-black/20 cursor-pointer hover:bg-yellow-50">
            <input
              type="checkbox"
              checked={scopePrivate}
              onChange={(e) => setScopePrivate(e.target.checked)}
              className="w-4 h-4 rounded text-ink-blue focus:ring-ink-blue"
            />
            <span>Backup Private &amp; Internal Repos</span>
          </label>

          <label className="flex items-center gap-2 p-2.5 bg-white rounded-xl border border-pencil-black/20 cursor-pointer hover:bg-yellow-50">
            <input
              type="checkbox"
              checked={scopeOrg}
              onChange={(e) => setScopeOrg(e.target.checked)}
              className="w-4 h-4 rounded text-ink-blue focus:ring-ink-blue"
            />
            <span>Discover Organization &amp; Team Repos</span>
          </label>

          <label className="flex items-center gap-2 p-2.5 bg-white rounded-xl border border-pencil-black/20 cursor-pointer hover:bg-yellow-50">
            <input
              type="checkbox"
              checked={scopeUser}
              onChange={(e) => setScopeUser(e.target.checked)}
              className="w-4 h-4 rounded text-ink-blue focus:ring-ink-blue"
            />
            <span>Include Starred &amp; Followed Repos</span>
          </label>

          <label className="flex items-center gap-2 p-2.5 bg-white rounded-xl border border-pencil-black/20 cursor-pointer hover:bg-yellow-50">
            <input
              type="checkbox"
              checked={scopePackages}
              onChange={(e) => setScopePackages(e.target.checked)}
              className="w-4 h-4 rounded text-ink-blue focus:ring-ink-blue"
            />
            <span>Include Attached GitHub Packages</span>
          </label>
        </div>

        <div className="p-3 bg-white rounded-xl border border-pencil-black font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[#64748b] block text-[10px]">Recommended Scope Query:</span>
            <span className="font-bold text-ink-blue">
              {[
                scopePrivate ? 'repo' : 'public_repo',
                scopeOrg ? 'read:org' : null,
                scopeUser ? 'read:user' : null,
                scopePackages ? 'read:packages' : null,
              ]
                .filter(Boolean)
                .join(', ')}
            </span>
          </div>
          <a
            href="https://github.com/settings/tokens/new"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 bg-ink-blue text-white rounded-lg text-xs font-bold font-display hover:bg-ink-hover flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Generate Token on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 text-highlighter-yellow" />
          </a>
        </div>
      </div>
    </div>
  )
}
