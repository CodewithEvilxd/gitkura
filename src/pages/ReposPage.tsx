import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSettings } from '../hooks/useSettings'
import { ipcInvoke } from '../hooks/useIpc'
import RepoFilters from '../components/RepoFilters'
import RepoList from '../components/RepoList'
import type { RepoInfo, RepoFilterSet } from '../types'

export default function ReposPage() {
  const { settings, updateSettings, loading } = useSettings()
  const [repos, setRepos] = useState<RepoInfo[]>([])
  const [fetching, setFetching] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const navigate = useNavigate()

  const fetchRepos = useCallback(async () => {
    if (!settings.githubToken) {
      setFetchError('Please authenticate with your GitHub token in Vault Setup first.')
      return
    }
    setFetching(true)
    setFetchError(null)
    try {
      const result = await ipcInvoke<RepoInfo[]>(
        'kura:github:fetch-repos',
        settings.githubToken,
        settings.repoFilters,
      )
      setRepos(result)
    } catch (err: any) {
      setFetchError(err.message || 'Failed to fetch repositories from GitHub')
    } finally {
      setFetching(false)
    }
  }, [settings.githubToken, settings.repoFilters])

  const handleFilterChange = async (filters: RepoFilterSet) => {
    await updateSettings({ repoFilters: filters })
  }

  const handleSelectionChange = async (ids: number[]) => {
    await updateSettings({ selectedRepoIds: ids })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-sm font-black font-display text-[#1a3a5f] bg-white border-2 border-[#2d2d2d] shadow-scribely px-6 py-3.5 rounded-2xl">
          Loading repositories...
        </div>
      </div>
    )
  }

  const hasToken = Boolean(settings.githubToken)

  return (
    <div className="max-w-4xl mx-auto space-y-7 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border-2 border-[#2d2d2d] shadow-scribely-sm rounded-full mb-3 rotate-0.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
            <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-[#1a3a5f]">Chapter 02 • Scope</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-[#1a3a5f] tracking-tight">
            <span className="highlighter-pen-yellow">Repository Scope &amp; Queue</span>
          </h2>
          <p className="font-hand text-xl text-[#64748b] mt-1.5 font-medium">
            Filter and choose repositories to lock into your GitKura synchronization queue.
          </p>
        </div>

        {repos.length > 0 && settings.selectedRepoIds.length > 0 && (
          <button
            onClick={() => navigate('/backup')}
            className="px-6 py-3.5 bg-[#15803d] hover:bg-[#166534] text-white scribely-btn rounded-2xl text-sm font-black flex items-center gap-2 cursor-pointer flex-shrink-0"
          >
            <span>Proceed to Sync</span>
            <svg className="w-4 h-4 text-[#fef08a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        )}
      </div>

      <div className="space-y-7">
        {/* Filters Card */}
        <div className="scribely-card p-7">
          <div className="washi-tape-blue -top-2.5 left-12 -rotate-1 rounded-xs" />

          <div className="flex items-center gap-3.5 mb-5">
            <div className="w-12 h-12 bg-[#fef08a] border-2 border-[#2d2d2d] shadow-scribely-sm rounded-2xl flex items-center justify-center text-[#1a3a5f] flex-shrink-0 rotate-1">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black font-display text-[#1a3a5f] tracking-tight">Scope Filtering</h3>
                <span className="px-2 py-0.5 text-xs font-mono font-bold bg-[#dbeafe] text-[#1a3a5f] border border-[#1a3a5f]/40 rounded-md">
                  Live GitHub Query
                </span>
              </div>
              <p className="font-hand text-base text-[#64748b] leading-tight font-medium">
                select which categories of repositories to query from your GitHub account
              </p>
            </div>
          </div>

          <RepoFilters
            filters={settings.repoFilters}
            onFilterChange={handleFilterChange}
          />

          <div className="mt-6 flex items-center gap-3 pt-2">
            <button
              onClick={fetchRepos}
              disabled={fetching || !hasToken}
              className="px-6 py-3.5 bg-[#1a3a5f] hover:bg-[#244975] disabled:bg-[#cbd5e1] disabled:text-[#64748b] disabled:border-[#94a3b8] disabled:shadow-none text-white scribely-btn rounded-2xl text-sm font-black flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {fetching ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>Querying GitHub API...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 text-[#fef08a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                  </svg>
                  <span>Fetch Repositories</span>
                </>
              )}
            </button>

            {!hasToken && (
              <span className="text-xs font-bold text-[#b45309] bg-[#fef3c7] px-3.5 py-2 rounded-xl border-2 border-[#b45309] shadow-xs">
                Configure your token in Setup first
              </span>
            )}
          </div>

          {fetchError && (
            <div className="mt-4 text-xs font-bold px-4 py-3 rounded-2xl bg-[#fee2e2] text-[#991b1b] border-2 border-[#dc2626] shadow-scribely-sm">
              {fetchError}
            </div>
          )}
        </div>

        {/* Repos Selection Table */}
        {repos.length > 0 && (
          <div className="scribely-card p-7">
            <div className="washi-tape -top-2.5 right-10 rotate-1 rounded-xs" />

            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-12 h-12 bg-[#fef08a] border-2 border-[#2d2d2d] shadow-scribely-sm rounded-2xl flex items-center justify-center text-[#1a3a5f] flex-shrink-0 -rotate-1">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                  <path d="m9 14 2 2 4-4" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-black font-display text-[#1a3a5f] tracking-tight">Active Vault Selection Queue</h3>
                <p className="font-hand text-base text-[#64748b] leading-tight font-medium">
                  selected repositories will be mirrored, compressed, and synchronized
                </p>
              </div>
            </div>

            <RepoList
              repos={repos}
              selectedIds={settings.selectedRepoIds}
              onSelectionChange={handleSelectionChange}
            />
          </div>
        )}
      </div>
    </div>
  )
}
