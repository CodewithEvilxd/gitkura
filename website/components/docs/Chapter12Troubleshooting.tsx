'use client'

import React, { useState, useMemo } from 'react'
import { Search, Activity, Terminal, CheckCircle2, AlertCircle } from 'lucide-react'
import CodeTerminalBlock from '@/components/CodeTerminalBlock'
import InkanStamp from '@/components/InkanStamp'
import HighlighterBadge from '@/components/HighlighterBadge'

export default function Chapter12Troubleshooting() {
  const [errorQuery, setErrorQuery] = useState('')

  const allDiagnostics = [
    {
      code: 'Bad Credentials (401)',
      category: 'Authentication',
      cause: 'The provided GitHub Personal Access Token is expired, revoked, or has invalid scopes.',
      fix: 'Regenerate your PAT on GitHub (Settings -> Developer Settings -> PAT) with repo scope and re-enter in GitKura.',
    },
    {
      code: 'Primary Rate Limit Exceeded (403)',
      category: 'API Rate Limits',
      cause: 'You exceeded 5,000 GitHub API requests per hour across uncoordinated tools.',
      fix: 'Lower Concurrency Workers to 3 in Settings, or wait for the hourly reset timestamp shown in the status bar.',
    },
    {
      code: 'index.lock File Exists',
      category: 'Git Core',
      cause: 'A previous Git process was terminated unexpectedly, leaving a stale lockfile.',
      fix: 'GitKura automatically cleans stale lockfiles older than 10 minutes. Alternatively, remove .git/index.lock manually.',
    },
    {
      code: 'Telegram 400: file is too big',
      category: 'Cloud Replication',
      cause: 'Repository compressed snapshot archive exceeds the 50 MB Telegram Bot API limit.',
      fix: 'Enable multipart archive chunking in Cloud Settings or switch to AWS S3 / Cloudflare R2 for large codebases.',
    },
    {
      code: 'S3 / R2 403 Access Denied',
      category: 'Cloud Replication',
      cause: 'The AWS IAM policy or Cloudflare R2 token is missing s3:PutObject or s3:ListBucket actions.',
      fix: 'Attach the least-privilege IAM policy from Chapter 07 to your IAM user or regenerate Cloudflare R2 Admin Read/Write token.',
    },
    {
      code: 'ETIMEDOUT / ECONNRESET',
      category: 'Network',
      cause: 'Transient socket timeout or firewall blocking large git packfile download streams.',
      fix: 'GitKura automatically retries with exponential backoff and jitter. Increase network timeout to 60s in Settings if on slow Wi-Fi.',
    },
    {
      code: 'ENOENT Git Executable Not Found',
      category: 'Local Environment',
      cause: 'Git CLI is not installed or not exported to system PATH environment variables.',
      fix: 'Install Git from https://git-scm.com and ensure "git" command executes inside your terminal or PowerShell.',
    },
  ]

  const filteredDiagnostics = useMemo(() => {
    if (!errorQuery.trim()) return allDiagnostics
    const q = errorQuery.toLowerCase()
    return allDiagnostics.filter(
      (d) =>
        d.code.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.cause.toLowerCase().includes(q) ||
        d.fix.toLowerCase().includes(q)
    )
  }, [errorQuery, allDiagnostics])

  return (
    <div className="space-y-6 pt-2">
      {/* Chapter Stamp Header */}
      <div className="flex items-center justify-between border-b-2 border-dashed border-pencil-black/20 pb-3">
        <InkanStamp kanji="診" subtext="SELF-TEST DIAGNOSTICS" variant="emerald" />
        <HighlighterBadge color="yellow" variant="ribbon" size="md">
          Diagnostics &bull; Chapter 12
        </HighlighterBadge>
      </div>

      <div className="space-y-3 font-patrick text-base text-[#334155] leading-relaxed">
        <p>
          GitKura includes a comprehensive self-diagnostic test engine that verifies your local Git CLI binary, token authorization scopes, network socket latency, and cloud destination API endpoints before initiating scheduled backup runs.
        </p>
      </div>

      {/* Interactive Self-Test Diagnostic Script Box */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-ink-blue block">
          One-Line Self-Test Health Check Script (Terminal / PowerShell):
        </span>
        <CodeTerminalBlock
          title="powershell / bash - gitkura self-test diagnostic"
          tabs={[
            {
              label: 'Bash / macOS / Linux',
              language: 'bash',
              code: `# 1. Run local environment & network self-test
echo "=== GitKura Diagnostic Self-Test ==="
which git > /dev/null && echo "[PASS] Git CLI Installed" || echo "[FAIL] Git CLI Missing"
curl -s -I https://api.github.com | grep "HTTP" && echo "[PASS] GitHub API Reachable" || echo "[FAIL] Network Blocked"
[ -w "$HOME" ] && echo "[PASS] Local Vault Disk Writable" || echo "[FAIL] Disk Read-Only"
echo "=== Self-Test Completed ==="`,
            },
            {
              label: 'Windows (PowerShell)',
              language: 'bash',
              code: `# Run PowerShell diagnostic test
Write-Host "=== GitKura Diagnostic Self-Test ===" -ForegroundColor Cyan
if (Get-Command git -ErrorAction SilentlyContinue) { Write-Host "[PASS] Git CLI Installed" -ForegroundColor Green } else { Write-Host "[FAIL] Git Missing" -ForegroundColor Red }
try { $r = Invoke-WebRequest -Uri "https://api.github.com" -Method Head -TimeoutSec 5; Write-Host "[PASS] GitHub API Reachable" -ForegroundColor Green } catch { Write-Host "[FAIL] Network Blocked" -ForegroundColor Red }
Write-Host "=== Self-Test Completed ===" -ForegroundColor Cyan`,
            },
          ]}
        />
      </div>

      {/* Searchable Troubleshooting Matrix */}
      <div className="p-5 sm:p-7 bg-[#fdfbf7] rounded-3xl border-2 border-pencil-black shadow-scribely-sm space-y-4">
        <div className="border-b-2 border-dashed border-pencil-black/20 pb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-black font-display text-ink-blue">
              Comprehensive Error Diagnostic &amp; Resolution Matrix
            </h3>
            <p className="font-caveat text-base text-[#64748b] font-bold">
              Instant root-cause analysis and step-by-step fix commands for common operational errors
            </p>
          </div>
          <HighlighterBadge color="emerald" variant="ribbon" size="md">
            {filteredDiagnostics.length} / {allDiagnostics.length} Resolved
          </HighlighterBadge>
        </div>

        {/* Live Filter Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b]" />
          <input
            type="text"
            value={errorQuery}
            onChange={(e) => setErrorQuery(e.target.value)}
            placeholder="Filter error messages, HTTP status codes, or keywords..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-pencil-black rounded-2xl text-xs font-mono text-ink-blue focus:outline-none focus:ring-2 focus:ring-highlighter-yellow/60 shadow-scribely-xs"
          />
        </div>

        {/* Diagnostic Matrix Table */}
        <div className="border-2 border-pencil-black rounded-2xl overflow-x-auto bg-white">
          <table className="w-full min-w-[650px] text-xs font-mono text-left border-collapse">
            <thead className="bg-[#f1f5f9] border-b-2 border-pencil-black text-ink-blue">
              <tr>
                <th className="p-3 border-r border-pencil-black/20">Error Code</th>
                <th className="p-3 border-r border-pencil-black/20">Category</th>
                <th className="p-3 border-r border-pencil-black/20">Root Cause</th>
                <th className="p-3">Automated &amp; Manual Remediation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pencil-black/10 text-[#334155]">
              {filteredDiagnostics.map((diag, idx) => (
                <tr key={idx} className="hover:bg-yellow-50/50">
                  <td className="p-3 font-bold text-[#b91c1c] border-r border-pencil-black/20">
                    {diag.code}
                  </td>
                  <td className="p-3 border-r border-pencil-black/20">
                    <HighlighterBadge color="yellow" variant="ribbon" size="sm">
                      {diag.category}
                    </HighlighterBadge>
                  </td>
                  <td className="p-3 border-r border-pencil-black/20 text-[#64748b]">
                    {diag.cause}
                  </td>
                  <td className="p-3 text-ink-blue font-medium">
                    {diag.fix}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5 Detailed FAQs */}
      <div className="space-y-3 pt-2">
        <span className="font-display font-black text-sm text-ink-blue block">
          Frequently Asked Questions (FAQs)
        </span>
        <div className="space-y-2 text-xs font-mono">
          <div className="p-3.5 bg-[#fdfbf7] rounded-xl border border-pencil-black space-y-1">
            <span className="font-bold text-ink-blue block">Q: Does GitKura store my Personal Access Token on remote servers?</span>
            <p className="text-[#475569]">
              No. Your token is encrypted with AES-256-CBC directly on your local storage using PBKDF2 salt derivation. It is only decrypted in memory during active Git fetch requests and is never transmitted to any third-party server.
            </p>
          </div>
          <div className="p-3.5 bg-[#fdfbf7] rounded-xl border border-pencil-black space-y-1">
            <span className="font-bold text-ink-blue block">Q: How much storage space does GitKura require on disk?</span>
            <p className="text-[#475569]">
              GitKura requires space equal to the total size of your repositories plus ~20% overhead for GZIP compressed snapshot archives in `.archives/`.
            </p>
          </div>
          <div className="p-3.5 bg-[#fdfbf7] rounded-xl border border-pencil-black space-y-1">
            <span className="font-bold text-ink-blue block">Q: What happens if my computer goes to sleep during a scheduled backup?</span>
            <p className="text-[#475569]">
              GitKura automatically detects system sleep and wake events via Electron powerMonitor. If a backup was missed while sleeping, the daemon triggers an immediate catch-up sync upon system wake.
            </p>
          </div>
          <div className="p-3.5 bg-[#fdfbf7] rounded-xl border border-pencil-black space-y-1">
            <span className="font-bold text-ink-blue block">Q: Can I backup organization repositories with 500+ repositories?</span>
            <p className="text-[#475569]">
              Yes. GitKura uses stream-based auto-pagination (`per_page=100`) via Octokit and throttles requests automatically to ensure you never exceed GitHub's 5,000 req/hr authenticated limit.
            </p>
          </div>
          <div className="p-3.5 bg-[#fdfbf7] rounded-xl border border-pencil-black space-y-1">
            <span className="font-bold text-ink-blue block">Q: What cloud backend has zero egress download fees?</span>
            <p className="text-[#475569]">
              Cloudflare R2 and Telegram Channels provide 100% free egress bandwidth, meaning you can download and restore your repository snapshots at any time with zero download costs.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
