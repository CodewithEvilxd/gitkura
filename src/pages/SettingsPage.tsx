import { useState, useEffect } from 'react'
import { useSettings } from '../hooks/useSettings'
import { ipcInvoke } from '../hooks/useIpc'
import type { ScheduleConfig } from '../types'
import logoImg from '../assets/logo.png'

interface CacheStats {
  httpCacheBytes: number
  repoCacheCount: number
  totalBytes: number
  formattedSize: string
}

export default function SettingsPage() {
  const { settings, updateSettings, loading } = useSettings()
  const [cacheStats, setCacheStats] = useState<CacheStats | null>(null)
  const [clearingCache, setClearingCache] = useState(false)
  const [cacheMessage, setCacheMessage] = useState<string | null>(null)

  useEffect(() => {
    loadCacheStats()
  }, [])

  const loadCacheStats = async () => {
    try {
      const stats = await ipcInvoke<CacheStats>('kura:settings:get-cache-stats')
      setCacheStats(stats)
    } catch {
      setCacheStats({
        httpCacheBytes: 0,
        repoCacheCount: 0,
        totalBytes: 0,
        formattedSize: '0 B',
      })
    }
  }

  const handleClearCache = async () => {
    setClearingCache(true)
    setCacheMessage(null)
    try {
      const result = await ipcInvoke<{ success: boolean; message: string }>('kura:settings:clear-cache')
      if (result.success) {
        setCacheMessage('All cache, network buffers, and temporary files cleared!')
        await loadCacheStats()
      } else {
        setCacheMessage(`Error: ${result.message}`)
      }
    } catch {
      setCacheMessage('Failed to clear cache')
    } finally {
      setClearingCache(false)
      setTimeout(() => setCacheMessage(null), 3500)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-sm font-black font-display text-[#1a3a5f] bg-white border-2 border-[#2d2d2d] shadow-scribely px-6 py-3.5 rounded-2xl">
          Loading preferences...
        </div>
      </div>
    )
  }

  const schedule = settings.schedule
  const updateSchedule = (partial: Partial<ScheduleConfig>) => {
    updateSettings({ schedule: { ...schedule, ...partial } })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-7 pb-10">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border-2 border-[#2d2d2d] shadow-scribely-sm rounded-full mb-3 rotate-0.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6]" />
          <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-[#1a3a5f]">Chapter 04 • System Controls</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black font-display text-[#1a3a5f] tracking-tight">
          <span className="highlighter-pen-yellow">Vault Preferences &amp; System</span>
        </h2>
        <p className="font-hand text-xl text-[#64748b] mt-1.5 font-medium">
          Configure automated cron scheduling, parallel thread concurrency, and encryption parameters.
        </p>
      </div>

      <div className="space-y-7">
        {/* Scheduler Card */}
        <div className="scribely-card p-7">
          <div className="washi-tape -top-2.5 left-10 -rotate-1" />

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 bg-[#fef08a] border-2 border-[#2d2d2d] shadow-scribely-sm rounded-2xl flex items-center justify-center text-[#1a3a5f] flex-shrink-0 rotate-1">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-black font-display text-[#1a3a5f] tracking-tight">Automated Background Sync</h3>
                <p className="font-hand text-base text-[#64748b] leading-tight font-medium">
                  run recurring repository synchronizations in your system tray
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => updateSchedule({ enabled: !schedule.enabled })}
              className={`relative w-16 h-9 rounded-full border-2 border-[#2d2d2d] transition-colors cursor-pointer shadow-scribely-sm ${
                schedule.enabled ? 'bg-[#22c55e]' : 'bg-[#e2e8f0]'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-7 h-7 bg-white rounded-full border-2 border-[#2d2d2d] transition-transform shadow-xs ${
                  schedule.enabled ? 'translate-x-7' : ''
                }`}
              />
            </button>
          </div>

          {schedule.enabled && (
            <div className="space-y-4 p-5 bg-[#fdfbf7] rounded-2xl border-2 border-[#2d2d2d]">
              <div>
                <label className="block text-xs font-mono font-bold text-[#1a3a5f] mb-2">Sync Frequency</label>
                <div className="flex gap-3">
                  {(['daily', 'weekly', 'monthly'] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => updateSchedule({ frequency: f })}
                      className={`px-5 py-2.5 rounded-xl text-xs font-black font-display transition-all border-2 cursor-pointer ${
                        schedule.frequency === f
                          ? 'bg-[#fef08a] text-[#1a3a5f] border-[#2d2d2d] shadow-scribely-sm -rotate-0.5'
                          : 'bg-white text-[#64748b] border-[#2d2d2d]/30 hover:border-[#2d2d2d] hover:text-[#1a3a5f]'
                      }`}
                    >
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#1a3a5f] mb-1.5">Execution Time</label>
                <input
                  type="time"
                  value={schedule.time}
                  onChange={(e) => updateSchedule({ time: e.target.value })}
                  className="bg-white border-2 border-[#2d2d2d] rounded-xl px-4 py-2.5 text-sm text-[#2d2d2d] font-mono font-bold focus:outline-none focus:shadow-scribely-sm"
                />
              </div>

              {schedule.frequency === 'weekly' && (
                <div>
                  <label className="block text-xs font-mono font-bold text-[#1a3a5f] mb-1.5">Day of Week</label>
                  <select
                    value={schedule.dayOfWeek ?? 0}
                    onChange={(e) => updateSchedule({ dayOfWeek: Number(e.target.value) })}
                    className="bg-white border-2 border-[#2d2d2d] rounded-xl px-4 py-2.5 text-sm text-[#1a3a5f] font-bold focus:outline-none focus:shadow-scribely-sm"
                  >
                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(
                      (day, i) => (
                        <option key={i} value={i}>{day}</option>
                      ),
                    )}
                  </select>
                </div>
              )}

              {schedule.frequency === 'monthly' && (
                <div>
                  <label className="block text-xs font-mono font-bold text-[#1a3a5f] mb-1.5">Day of Month</label>
                  <select
                    value={schedule.dayOfMonth ?? 1}
                    onChange={(e) => updateSchedule({ dayOfMonth: Number(e.target.value) })}
                    className="bg-white border-2 border-[#2d2d2d] rounded-xl px-4 py-2.5 text-sm text-[#1a3a5f] font-bold focus:outline-none focus:shadow-scribely-sm"
                  >
                    {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
                      <option key={d} value={d}>{d}th of month</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Concurrency Card */}
        <div className="scribely-card p-7">
          <div className="washi-tape-blue -top-2.5 right-10 rotate-1" />

          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-12 h-12 bg-[#fef08a] border-2 border-[#2d2d2d] shadow-scribely-sm rounded-2xl flex items-center justify-center text-[#1a3a5f] flex-shrink-0 -rotate-1">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-black font-display text-[#1a3a5f] tracking-tight">Performance &amp; Concurrency Limit</h3>
              <p className="font-hand text-base text-[#64748b] leading-tight font-medium">
                control parallel cloning and compression execution threads
              </p>
            </div>
          </div>

          <div className="p-5 bg-[#fdfbf7] rounded-2xl border-2 border-[#2d2d2d] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#1a3a5f] font-mono font-bold">Parallel Execution Threads:</span>
              <span className="text-[#1a3a5f] font-black font-mono text-sm px-3.5 py-1 bg-white rounded-xl border-2 border-[#2d2d2d] shadow-scribely-sm">
                {settings.concurrencyLimit} Threads
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={settings.concurrencyLimit}
              onChange={(e) => updateSettings({ concurrencyLimit: Number(e.target.value) })}
              className="w-full accent-[#1a3a5f] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono font-bold text-[#64748b]">
              <span>1 (Conservative)</span>
              <span>10 (Maximum Speed)</span>
            </div>
          </div>
        </div>

        {/* Cache & Storage Cleaner Card */}
        <div className="scribely-card p-7">
          <div className="washi-tape-mint -top-2.5 left-10 -rotate-1" />

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 bg-[#dcfce7] border-2 border-[#2d2d2d] shadow-scribely-sm rounded-2xl flex items-center justify-center text-[#16a34a] flex-shrink-0 rotate-1">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-black font-display text-[#1a3a5f] tracking-tight">Cache &amp; Storage Maintenance</h3>
                <p className="font-hand text-base text-[#64748b] leading-tight font-medium">
                  manage local network buffers, cached repo metadata, and temporary staging
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono font-bold text-[#64748b] block">Current Cache Size</span>
              <span className="text-base font-black font-mono text-[#1a3a5f] px-3 py-1 bg-white rounded-xl border-2 border-[#2d2d2d] shadow-xs inline-block mt-0.5">
                {cacheStats?.formattedSize || '0 B'}
              </span>
            </div>
          </div>

          <div className="p-5 bg-[#fdfbf7] rounded-2xl border-2 border-[#2d2d2d] space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-white rounded-xl border border-[#cbd5e1] flex items-center justify-between">
                <span className="text-[#64748b]">Cached Repositories:</span>
                <span className="font-bold text-[#1a3a5f]">{cacheStats?.repoCacheCount || 0} entries</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#cbd5e1] flex items-center justify-between">
                <span className="text-[#64748b]">Network Buffers:</span>
                <span className="font-bold text-[#1a3a5f]">
                  {cacheStats ? `${(cacheStats.httpCacheBytes / 1024).toFixed(1)} KB` : '0 KB'}
                </span>
              </div>
            </div>

            {cacheMessage && (
              <div className="p-3 rounded-xl bg-[#ecfdf5] border-2 border-[#16a34a] text-xs font-bold text-[#15803d] flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {cacheMessage}
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <p className="text-xs text-[#64748b] font-medium max-w-md">
                Clearing cache safely purges cached repository lists, temporary staging snapshots, and Electron HTTP network storage without affecting your saved tokens or backup folders.
              </p>
              <button
                type="button"
                onClick={handleClearCache}
                disabled={clearingCache}
                className="px-5 py-2.5 bg-white hover:bg-[#ffe4e6] text-[#e11d48] border-2 border-[#2d2d2d] shadow-scribely-sm rounded-xl font-display font-black text-xs cursor-pointer transition-all flex items-center gap-2 flex-shrink-0 disabled:opacity-50"
              >
                {clearingCache ? 'Purging Cache...' : 'Clear Cache & Temp Files'}
              </button>
            </div>
          </div>
        </div>

        {/* About App Card */}
        <div className="scribely-card p-7">
          <div className="washi-tape-rose -top-2.5 left-8 -rotate-1" />

          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white border-2 border-[#2d2d2d] shadow-scribely-sm flex items-center justify-center text-[#1a3a5f] flex-shrink-0 overflow-hidden">
              <img
                src={logoImg}
                alt="GitKura Mascot"
                className="w-full h-full object-cover scale-105"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black font-display text-[#1a3a5f]">GitKura (Git蔵) v1.0.0</h3>
                <span className="px-3 py-0.5 text-xs font-mono font-bold bg-[#dbeafe] text-[#1a3a5f] border-2 border-[#2d2d2d] rounded-full shadow-xs">
                  Engineered by Nishant Gaurav
                </span>
              </div>
              <p className="font-hand text-lg text-[#64748b] mt-2 leading-relaxed font-medium">
                GitKura is a disaster-proof repository mirroring and snapshot tool. All secrets and access tokens are secured locally on disk using AES encryption. No telemetry, code, or tokens are ever transmitted to any third-party intermediate servers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
