import type { RepoFilterSet } from '../types'

interface Props {
  filters: RepoFilterSet
  onFilterChange: (filters: RepoFilterSet) => void
}

export default function RepoFilters({ filters, onFilterChange }: Props) {
  const toggle = (key: keyof RepoFilterSet) => {
    onFilterChange({ ...filters, [key]: !filters[key] })
  }

  return (
    <div className="flex flex-wrap gap-3">
      {/* Owned */}
      <button
        type="button"
        onClick={() => toggle('owned')}
        className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all border-2 flex items-center gap-2 cursor-pointer ${
          filters.owned
            ? 'bg-[#fef08a] text-[#1a3a5f] border-[#2d2d2d] shadow-scribely-sm -rotate-0.5'
            : 'bg-white text-[#64748b] border-[#2d2d2d]/30 hover:border-[#2d2d2d] hover:text-[#1a3a5f]'
        }`}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span>Owned Repos</span>
      </button>

      {/* Organization */}
      <button
        type="button"
        onClick={() => toggle('organization')}
        className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all border-2 flex items-center gap-2 cursor-pointer ${
          filters.organization
            ? 'bg-[#fef08a] text-[#1a3a5f] border-[#2d2d2d] shadow-scribely-sm rotate-0.5'
            : 'bg-white text-[#64748b] border-[#2d2d2d]/30 hover:border-[#2d2d2d] hover:text-[#1a3a5f]'
        }`}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
          <path d="M9 22v-4h6v4" />
          <path d="M8 6h.01" />
          <path d="M16 6h.01" />
          <path d="M12 6h.01" />
          <path d="M12 10h.01" />
          <path d="M12 14h.01" />
          <path d="M16 10h.01" />
          <path d="M16 14h.01" />
          <path d="M8 10h.01" />
          <path d="M8 14h.01" />
        </svg>
        <span>Organizations</span>
      </button>

      {/* Starred */}
      <button
        type="button"
        onClick={() => toggle('starred')}
        className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all border-2 flex items-center gap-2 cursor-pointer ${
          filters.starred
            ? 'bg-[#fef08a] text-[#1a3a5f] border-[#2d2d2d] shadow-scribely-sm -rotate-0.5'
            : 'bg-white text-[#64748b] border-[#2d2d2d]/30 hover:border-[#2d2d2d] hover:text-[#1a3a5f]'
        }`}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        <span>Starred Repos</span>
      </button>

      {/* Forked */}
      <button
        type="button"
        onClick={() => toggle('forked')}
        className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all border-2 flex items-center gap-2 cursor-pointer ${
          filters.forked
            ? 'bg-[#fef08a] text-[#1a3a5f] border-[#2d2d2d] shadow-scribely-sm rotate-0.5'
            : 'bg-white text-[#64748b] border-[#2d2d2d]/30 hover:border-[#2d2d2d] hover:text-[#1a3a5f]'
        }`}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="6" r="3" />
          <path d="M18 9v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" />
          <path d="M12 12v3" />
        </svg>
        <span>Forked Repos</span>
      </button>

      {/* Collaborator */}
      <button
        type="button"
        onClick={() => toggle('collaborator')}
        className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all border-2 flex items-center gap-2 cursor-pointer ${
          filters.collaborator
            ? 'bg-[#fef08a] text-[#1a3a5f] border-[#2d2d2d] shadow-scribely-sm -rotate-0.5'
            : 'bg-white text-[#64748b] border-[#2d2d2d]/30 hover:border-[#2d2d2d] hover:text-[#1a3a5f]'
        }`}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <span>Collaborations</span>
      </button>
    </div>
  )
}
