import { useState, useMemo } from 'react'
import type { RepoInfo } from '../types'

interface Props {
  repos: RepoInfo[]
  selectedIds: number[]
  onSelectionChange: (ids: number[]) => void
}

export default function RepoList({ repos, selectedIds, onSelectionChange }: Props) {
  const [search, setSearch] = useState('')
  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds])

  const filtered = useMemo(
    () =>
      repos.filter(
        (r) =>
          r.fullName.toLowerCase().includes(search.toLowerCase()) ||
          (r.description || '').toLowerCase().includes(search.toLowerCase()),
      ),
    [repos, search],
  )

  const allFilteredSelected = filtered.length > 0 && filtered.every((r) => selectedSet.has(r.id))

  const toggleAll = () => {
    if (allFilteredSelected) {
      const filteredIds = new Set(filtered.map((r) => r.id))
      onSelectionChange(selectedIds.filter((id) => !filteredIds.has(id)))
    } else {
      const newIds = new Set([...selectedIds, ...filtered.map((r) => r.id)])
      onSelectionChange(Array.from(newIds))
    }
  }

  const toggleOne = (id: number) => {
    if (selectedSet.has(id)) {
      onSelectionChange(selectedIds.filter((i) => i !== id))
    } else {
      onSelectionChange([...selectedIds, id])
    }
  }

  const formatSize = (kb: number) => {
    if (kb < 1024) return `${kb} KB`
    if (kb < 1024 * 1024) return `${(kb / 1024).toFixed(1)} MB`
    return `${(kb / (1024 * 1024)).toFixed(2)} GB`
  }

  const sourceBadges: Record<string, { label: string; bg: string }> = {
    owned: { label: 'Owned', bg: 'text-[#1a3a5f] bg-[#dbeafe] border-[#1a3a5f]/40' },
    org: { label: 'Org', bg: 'text-[#6b21a8] bg-[#f3e8ff] border-[#6b21a8]/40' },
    starred: { label: 'Starred', bg: 'text-[#854d0e] bg-[#fef9c3] border-[#854d0e]/40' },
    forked: { label: 'Fork', bg: 'text-[#166534] bg-[#dcfce7] border-[#166534]/40' },
    collaborator: { label: 'Collab', bg: 'text-[#0369a1] bg-[#e0f2fe] border-[#0369a1]/40' },
  }

  return (
    <div className="space-y-4">
      {/* Search & Counter Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search repositories in vault scope..."
            className="w-full bg-[#fdfbf7] border-2 border-[#2d2d2d] rounded-2xl pl-11 pr-4 py-3 text-sm text-[#2d2d2d] placeholder-[#94a3b8] focus:outline-none focus:bg-white focus:shadow-scribely-sm font-mono font-bold transition-all"
          />
        </div>
        <div className="px-5 py-3 bg-white border-2 border-[#2d2d2d] shadow-scribely-sm rounded-2xl text-xs font-black text-[#1a3a5f] whitespace-nowrap">
          <span className="text-[#1a3a5f] bg-[#fef08a] px-2 py-0.5 rounded border border-[#2d2d2d] mr-1 font-mono">{selectedIds.length}</span> of {repos.length} Selected
        </div>
      </div>

      {/* Table Container */}
      <div className="border-2 border-[#2d2d2d] rounded-[22px] overflow-hidden bg-white shadow-scribely">
        {/* Header Strip */}
        <div className="bg-[#fdfbf7] px-5 py-3.5 flex items-center justify-between border-b-2 border-[#2d2d2d]">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={allFilteredSelected}
              onChange={toggleAll}
              className="rounded border-2 border-[#2d2d2d] text-[#1a3a5f] focus:ring-0 w-4 h-4 cursor-pointer accent-[#1a3a5f]"
            />
            <span className="text-xs text-[#1a3a5f] font-black uppercase tracking-wider">
              Select All Filtered ({filtered.length})
            </span>
          </label>
          <span className="font-handwriting text-base font-bold text-[#64748b]">
            targets for differential git mirror
          </span>
        </div>

        {/* Scrollable list */}
        <div className="max-h-[440px] overflow-y-auto divide-y-2 divide-[#2d2d2d]/10">
          {filtered.map((repo) => {
            const isChecked = selectedSet.has(repo.id)
            const badge = sourceBadges[repo.source] || { label: repo.source, bg: 'text-[#475569] bg-[#f1f5f9] border-[#cbd5e1]' }

            return (
              <label
                key={repo.id}
                className={`flex items-center gap-3.5 px-5 py-3.5 cursor-pointer transition-all ${
                  isChecked ? 'bg-[#fef08a]/35 hover:bg-[#fef08a]/50' : 'hover:bg-[#fdfbf7]'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleOne(repo.id)}
                  className="rounded border-2 border-[#2d2d2d] text-[#1a3a5f] focus:ring-0 w-4 h-4 cursor-pointer accent-[#1a3a5f]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-[#1a3a5f] truncate font-mono">
                      {repo.fullName}
                    </span>
                    {repo.isPrivate && (
                      <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-[#fee2e2] text-[#991b1b] border border-[#991b1b]/40">
                        Private
                      </span>
                    )}
                    <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold border ${badge.bg}`}>
                      {badge.label}
                    </span>
                  </div>
                  {repo.description && (
                    <p className="font-handwriting text-base text-[#64748b] truncate mt-0.5">
                      {repo.description}
                    </p>
                  )}
                </div>
                <span className="text-xs text-[#1a3a5f] font-mono font-extrabold bg-[#f1f5f9] px-2.5 py-1 rounded-lg border border-[#cbd5e1] whitespace-nowrap shadow-2xs">
                  {formatSize(repo.size)}
                </span>
              </label>
            )
          })}

          {filtered.length === 0 && (
            <div className="px-4 py-12 text-center text-sm text-[#64748b] font-medium font-handwriting text-xl">
              {repos.length === 0
                ? 'No repositories found. Click "Fetch Repositories" to query GitHub API.'
                : 'No repositories match your search keyword.'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
