import { useRef, useEffect } from 'react'
import { ipcInvoke } from '../hooks/useIpc'
import { useBackupProgress } from '../hooks/useBackupProgress'
import type { RepoBackupStage } from '../types'

const stageLabels: Record<RepoBackupStage, string> = {
  pending: 'Enqueued',
  cloning: 'Cloning Repository',
  updating: 'Pulling Branches',
  compressing: 'Creating Archive',
  uploading: 'Replicating to Cloud',
  done: 'Secured in Vault',
  failed: 'Failed',
  skipped: 'Skipped',
}

const stageBadges: Record<RepoBackupStage, string> = {
  pending: 'text-[#475569] bg-[#f1f5f9] border-[#cbd5e1]',
  cloning: 'text-[#1a3a5f] bg-[#dbeafe] border-[#1a3a5f]/40',
  updating: 'text-[#1a3a5f] bg-[#dbeafe] border-[#1a3a5f]/40',
  compressing: 'text-[#854d0e] bg-[#fef9c3] border-[#854d0e]/40',
  uploading: 'text-[#6b21a8] bg-[#f3e8ff] border-[#6b21a8]/40',
  done: 'text-[#15803d] bg-[#dcfce7] border-[#15803d]/40',
  failed: 'text-[#991b1b] bg-[#fee2e2] border-[#dc2626]/40',
  skipped: 'text-[#475569] bg-[#f1f5f9] border-[#cbd5e1]',
}

export default function BackupPage() {
  const { statuses, logs, summary, running, start, reset, setRunning } =
    useBackupProgress()
  const logEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  const handleStart = async () => {
    start()
    const result = await ipcInvoke<{
      success: boolean
      message?: string
      totalRepos?: number
    }>('kura:backup:start')
    if (!result.success) {
      setRunning(false)
      alert(result.message || 'Failed to start GitKura vault sync')
    }
  }

  const handleCancel = async () => {
    await ipcInvoke('kura:backup:cancel')
  }

  const completed = statuses.filter(
    (s) => s.stage === 'done' || s.stage === 'failed' || s.stage === 'skipped',
  ).length
  const total = statuses.length || 1
  const overallPercent = Math.round((completed / total) * 100)

  return (
    <div className="max-w-4xl mx-auto space-y-7 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border-2 border-[#2d2d2d] shadow-scribely-sm rounded-full mb-3 -rotate-0.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#15803d]" />
            <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-[#1a3a5f]">Chapter 03 • Live Telemetry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-[#1a3a5f] tracking-tight">
            <span className="highlighter-pen-yellow">Vault Synchronization Console</span>
          </h2>
          <p className="font-hand text-xl text-[#64748b] mt-1.5 font-medium">
            Execute differential git mirroring, create local compressed archives, and upload to cloud storage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {!running && (
            <button
              onClick={handleStart}
              className="px-6 py-3.5 bg-[#1a3a5f] hover:bg-[#244975] text-white scribely-btn rounded-2xl text-sm font-black flex items-center gap-2 cursor-pointer flex-shrink-0"
            >
              <svg className="w-4 h-4 text-[#fef08a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span>Arm &amp; Sync Vault</span>
            </button>
          )}

          {running && (
            <button
              onClick={handleCancel}
              className="px-6 py-3.5 bg-[#dc2626] hover:bg-[#b91c1c] text-white scribely-btn rounded-2xl text-sm font-black flex items-center gap-2 cursor-pointer flex-shrink-0"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <rect x="6" y="6" width="12" height="12" />
              </svg>
              <span>Halt Execution</span>
            </button>
          )}

          {summary && !running && (
            <button
              onClick={reset}
              className="px-5 py-3.5 bg-white hover:bg-[#f8f6f0] text-[#1a3a5f] scribely-btn rounded-2xl text-sm font-black cursor-pointer"
            >
              Clear Session
            </button>
          )}
        </div>
      </div>

      {/* Summary Stat Cards */}
      {summary && (
        <div className="scribely-card p-7 space-y-5">
          <div className="washi-tape-green -top-2.5 right-12 rotate-1" />
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 bg-[#dcfce7] border-2 border-[#15803d] shadow-scribely-sm rounded-2xl flex items-center justify-center text-[#15803d] -rotate-1">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-black font-display text-[#1a3a5f]">Vault Execution Summary</h3>
              <p className="font-hand text-base text-[#64748b] leading-tight font-medium">
                All tasks finished in {(summary.duration / 1000).toFixed(1)} seconds.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <StatCard value={summary.totalRepos} label="Total Repos" bg="bg-[#fdfbf7]" color="text-[#1a3a5f]" />
            <StatCard value={summary.succeeded} label="Secured" bg="bg-[#dcfce7]" color="text-[#15803d]" />
            <StatCard value={summary.failed} label="Failed" bg="bg-[#fee2e2]" color="text-[#991b1b]" />
            <StatCard value={summary.skipped} label="Skipped" bg="bg-[#f1f5f9]" color="text-[#475569]" />
          </div>

          {summary.errors.length > 0 && (
            <div className="mt-4 space-y-2 pt-3 border-t-2 border-dashed border-[#2d2d2d]/30">
              <p className="text-xs font-black text-[#991b1b] uppercase tracking-wider font-mono">Errors Encounted:</p>
              {summary.errors.map((e, i) => (
                <div key={i} className="text-xs text-[#991b1b] bg-[#fee2e2] border-2 border-[#dc2626] px-4 py-3 rounded-2xl font-mono shadow-scribely-sm">
                  <span className="font-bold">{e.repoName}:</span> {e.error}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Progress Bar Card */}
      {running && statuses.length > 0 && (
        <div className="scribely-card p-7">
          <div className="flex justify-between text-xs text-[#1a3a5f] font-mono font-bold mb-3">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1a3a5f] animate-ping" />
              Syncing {completed} of {statuses.length} Repositories
            </span>
            <span className="text-[#1a3a5f] font-black font-display text-lg">{overallPercent}%</span>
          </div>
          <div className="h-5 bg-[#e2e8f0] rounded-full overflow-hidden border-2 border-[#2d2d2d]">
            <div
              className="h-full bg-[#1a3a5f] rounded-full transition-all duration-300"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Repository Progress Table */}
      {statuses.length > 0 && (
        <div className="scribely-card p-7">
          <h3 className="text-sm font-black font-display text-[#1a3a5f] uppercase tracking-wider mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-[#1a3a5f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            Repository Pipeline Status
          </h3>
          <div className="border-2 border-[#2d2d2d] rounded-2xl max-h-72 overflow-y-auto divide-y-2 divide-[#2d2d2d]/10 bg-white">
            {statuses
              .sort((a, b) => {
                const order: Record<RepoBackupStage, number> = {
                  cloning: 0, updating: 0, compressing: 1, uploading: 1,
                  pending: 2, done: 3, failed: 3, skipped: 4,
                }
                return (order[a.stage] ?? 9) - (order[b.stage] ?? 9)
              })
              .map((s) => (
                <div key={s.repoId} className="flex items-center justify-between px-4 py-3 hover:bg-[#fdfbf7] transition-all">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-md border ${stageBadges[s.stage]}`}>
                      {stageLabels[s.stage]}
                    </span>
                    <span className="text-sm font-black text-[#1a3a5f] truncate font-mono">{s.repoName}</span>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    {s.stage !== 'done' && s.stage !== 'failed' && s.stage !== 'skipped' && s.stage !== 'pending' && (
                      <div className="w-28 h-3 bg-[#e2e8f0] rounded-full overflow-hidden border border-[#2d2d2d]">
                        <div className="h-full bg-[#1a3a5f] rounded-full transition-all" style={{ width: `${s.progress}%` }} />
                      </div>
                    )}
                    {s.error && (
                      <span className="text-xs font-mono font-bold text-[#991b1b] truncate max-w-48" title={s.error}>{s.error}</span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Terminal Log Console */}
      {logs.length > 0 && (
        <div className="scribely-card p-7">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-black font-display text-[#1a3a5f] flex items-center gap-2">
              <svg className="w-4 h-4 text-[#1a3a5f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
              Execution Console Log
            </h3>
            <span className="text-xs text-[#64748b] font-mono font-bold bg-[#f1f5f9] px-2.5 py-0.5 rounded-md border border-[#cbd5e1]">
              {logs.length} entries
            </span>
          </div>
          <div className="bg-[#1e293b] border-2 border-[#2d2d2d] rounded-2xl p-4 max-h-72 overflow-y-auto font-mono text-xs shadow-inner text-slate-200">
            {logs.map((entry, i) => (
              <div key={i} className="flex gap-3 py-1 hover:bg-white/[0.04] px-1 rounded transition-colors">
                <span className="text-slate-500 select-none whitespace-nowrap">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </span>
                <span className={
                  entry.level === 'error' ? 'text-[#f87171] font-bold' :
                  entry.level === 'warn' ? 'text-[#fbbf24] font-bold' : 'text-slate-300'
                }>
                  {entry.message}
                </span>
              </div>
            ))}
            <div ref={logEndRef} />
          </div>
        </div>
      )}

      {/* Inactive Empty State */}
      {!running && !summary && statuses.length === 0 && (
        <div className="scribely-card p-16 text-center">
          <div className="washi-tape -top-2.5 left-1/2 -translate-x-1/2 -rotate-1" />
          <div className="w-16 h-16 bg-[#fef08a] border-2 border-[#2d2d2d] shadow-scribely-sm rounded-3xl flex items-center justify-center mx-auto mb-4 text-[#1a3a5f] rotate-1">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </div>
          <h3 className="text-2xl font-black font-display text-[#1a3a5f]">GitKura Vault Inactive</h3>
          <p className="font-hand text-xl text-[#64748b] mt-1 max-w-md mx-auto leading-snug font-medium">
            click &quot;Arm &amp; Sync Vault&quot; to begin differential git cloning, local .tar.gz packaging, and cloud upload
          </p>
        </div>
      )}
    </div>
  )
}

function StatCard({ value, label, bg, color }: { value: number; label: string; bg: string; color: string }) {
  return (
    <div className={`p-4 rounded-2xl border-2 border-[#2d2d2d] shadow-scribely-sm text-center ${bg}`}>
      <div className={`text-3xl font-black font-display ${color}`}>{value}</div>
      <div className="text-[10px] font-mono font-bold text-[#1a3a5f] uppercase tracking-wider mt-1">{label}</div>
    </div>
  )
}
