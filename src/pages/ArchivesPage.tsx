import { useState, useEffect, useCallback } from 'react'
import { ipcInvoke } from '../hooks/useIpc'
import type { ArchiveInfo } from '../types'

export default function ArchivesPage() {
  const [archives, setArchives] = useState<ArchiveInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const loadArchives = useCallback(async () => {
    setLoading(true)
    try {
      const list = await ipcInvoke<ArchiveInfo[]>('kura:archives:list')
      setArchives(list || [])
    } catch {
      setArchives([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadArchives()
  }, [loadArchives])

  const openFolder = async (filePath?: string) => {
    await ipcInvoke('kura:archives:open-folder', filePath)
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
  }

  const filtered = archives.filter(
    (a) =>
      a.filename.toLowerCase().includes(search.toLowerCase()) ||
      a.repoName.toLowerCase().includes(search.toLowerCase()) ||
      a.owner.toLowerCase().includes(search.toLowerCase()),
  )

  const totalVaultSize = archives.reduce((acc, curr) => acc + curr.sizeBytes, 0)

  return (
    <div className="max-w-4xl mx-auto space-y-7 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border-2 border-[#2d2d2d] shadow-scribely-sm rounded-full mb-3 -rotate-0.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]" />
            <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-[#1a3a5f]">Vault Storage Snapshots</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-[#1a3a5f] tracking-tight">
            <span className="highlighter-pen-yellow">Vault Archive Snapshots</span>
          </h2>
          <p className="font-hand text-xl text-[#64748b] mt-1.5 font-medium">
            Inspect, manage, and verify compressed point-in-time `.tar.gz` repository archives.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => openFolder()}
            className="px-6 py-3.5 bg-[#2d2d2d] hover:bg-[#1f1f1f] text-white scribely-btn rounded-2xl text-sm font-black flex items-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4 text-[#fef08a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
            </svg>
            <span>Open Vault Directory</span>
          </button>

          <button
            onClick={loadArchives}
            className="p-3.5 bg-white hover:bg-[#f8f6f0] text-[#1a3a5f] scribely-btn rounded-2xl cursor-pointer"
            title="Refresh Archives"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="scribely-card p-6">
          <div className="washi-tape -top-2.5 left-6 -rotate-1" />
          <span className="text-[11px] font-mono font-bold text-[#64748b] uppercase tracking-wider block mb-1">Total Vault Archives</span>
          <span className="text-3xl font-black font-display text-[#1a3a5f]">{archives.length}</span>
        </div>
        <div className="scribely-card p-6">
          <div className="washi-tape-blue -top-2.5 left-6 rotate-1" />
          <span className="text-[11px] font-mono font-bold text-[#64748b] uppercase tracking-wider block mb-1">Total Disk Space</span>
          <span className="text-3xl font-black font-display text-[#1a3a5f]">{formatSize(totalVaultSize)}</span>
        </div>
        <div className="scribely-card p-6">
          <div className="washi-tape-green -top-2.5 left-6 -rotate-1" />
          <span className="text-[11px] font-mono font-bold text-[#64748b] uppercase tracking-wider block mb-1">Format Standard</span>
          <span className="text-3xl font-black font-display text-[#15803d]">GZIP (.tar.gz)</span>
        </div>
      </div>

      {/* Archive List Card */}
      <div className="scribely-card p-7 space-y-4">
        {/* Search */}
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search archive filenames or owners..."
            className="w-full bg-[#fdfbf7] border-2 border-[#2d2d2d] rounded-2xl pl-11 pr-4 py-3 text-sm text-[#2d2d2d] placeholder-[#94a3b8] focus:outline-none focus:bg-white focus:shadow-scribely-sm font-mono font-bold transition-all"
          />
        </div>

        {/* List */}
        <div className="border-2 border-[#2d2d2d] rounded-2xl overflow-hidden bg-white">
          {loading ? (
            <div className="p-12 text-center text-[#1a3a5f] font-display font-black text-sm">
              Scanning vault archive directory...
            </div>
          ) : filtered.length > 0 ? (
            <div className="divide-y-2 divide-[#2d2d2d]/10 max-h-96 overflow-y-auto">
              {filtered.map((arc, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-[#fdfbf7] transition-colors">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-11 h-11 bg-[#dbeafe] border-2 border-[#1a3a5f] rounded-2xl flex items-center justify-center text-[#1a3a5f] flex-shrink-0 -rotate-1">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="21 8 21 21 3 21 3 8" />
                        <rect x="1" y="3" width="22" height="5" />
                        <line x1="10" y1="12" x2="14" y2="12" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-black font-display text-[#1a3a5f] font-mono truncate">{arc.filename}</p>
                      <p className="font-hand text-base text-[#64748b] leading-tight font-medium">
                        Owner: <span className="text-[#1a3a5f] font-bold">{arc.owner}</span> • Created: {new Date(arc.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                    <span className="text-xs font-mono font-black text-[#1a3a5f] bg-[#fef08a] px-3.5 py-1.5 rounded-xl border-2 border-[#2d2d2d] shadow-scribely-sm">
                      {formatSize(arc.sizeBytes)}
                    </span>
                    <button
                      onClick={() => openFolder(arc.filePath)}
                      className="px-4 py-2 bg-[#2d2d2d] hover:bg-[#1f1f1f] text-xs font-bold text-white scribely-btn rounded-xl cursor-pointer"
                    >
                      Show File
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-[#64748b] text-lg font-hand">
              No archives found in <code className="text-[#1a3a5f] font-mono font-bold bg-[#e2e8f0] px-1.5 py-0.5 rounded text-xs">.archives/</code>. Execute a Vault Sync to create local archives.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
