'use client'

import React, { useState, useMemo } from 'react'
import { FolderGit2, Search, Sliders, CheckCircle2, XCircle } from 'lucide-react'
import CodeTerminalBlock from '@/components/CodeTerminalBlock'
import InkanStamp from '@/components/InkanStamp'
import HighlighterBadge from '@/components/HighlighterBadge'

export default function Chapter04Discovery() {
  const [regexQuery, setRegexQuery] = useState('^(frontend|core)-')

  const sampleRepos = [
    { name: 'frontend-dashboard', org: 'enterprise-org', type: 'Private', stars: 12 },
    { name: 'frontend-docs', org: 'enterprise-org', type: 'Public', stars: 4 },
    { name: 'core-crypto-engine', org: 'enterprise-org', type: 'Internal', stars: 45 },
    { name: 'legacy-monolith', org: 'enterprise-org', type: 'Private', stars: 89 },
    { name: 'infra-terraform', org: 'devops-team', type: 'Private', stars: 15 },
    { name: 'personal-dotfiles', org: 'alice-dev', type: 'Public', stars: 130 },
  ]

  const matchResults = useMemo(() => {
    try {
      const reg = new RegExp(regexQuery, 'i')
      return sampleRepos.map((r) => ({
        ...r,
        matched: reg.test(r.name) || reg.test(r.org),
      }))
    } catch (err) {
      return sampleRepos.map((r) => ({ ...r, matched: false, invalid: true }))
    }
  }, [regexQuery])

  const matchCount = matchResults.filter((r) => r.matched).length

  return (
    <div className="space-y-6 pt-2">
      {/* Chapter Stamp Header */}
      <div className="flex items-center justify-between border-b-2 border-dashed border-pencil-black/20 pb-3">
        <InkanStamp kanji="探" subtext="STREAM DISCOVERY" variant="emerald" />
        <HighlighterBadge color="yellow" variant="ribbon" size="md">
          Scoping &bull; Chapter 04
        </HighlighterBadge>
      </div>

      <div className="space-y-3 font-patrick text-base text-[#334155] leading-relaxed">
        <p>
          GitKura orchestrates `@octokit/rest` with automatic pagination handling, rate-limit awareness, and granular taxonomy filters across personal and enterprise organization accounts.
        </p>
        <p>
          Large engineering organizations often have hundreds of repositories spread across multiple GitHub organizations. GitKura queries GitHub using asynchronous stream iterators, resolving all repositories without exceeding the 5,000 requests/hour API quota.
        </p>
      </div>

      {/* 4 Filter Taxonomies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black space-y-1 shadow-scribely-xs">
          <div className="font-display font-black text-sm text-ink-blue flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 border border-pencil-black/20" />
            <span>Personal Owned Repositories</span>
          </div>
          <p className="font-mono text-xs text-[#64748b]">
            All public, private, and internal repositories owned under your personal GitHub account.
          </p>
        </div>

        <div className="p-4 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black space-y-1 shadow-scribely-xs">
          <div className="font-display font-black text-sm text-ink-blue flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 border border-pencil-black/20" />
            <span>Organization Repositories</span>
          </div>
          <p className="font-mono text-xs text-[#64748b]">
            Codebases across enterprise teams and organizations where you hold membership or admin roles.
          </p>
        </div>

        <div className="p-4 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black space-y-1 shadow-scribely-xs">
          <div className="font-display font-black text-sm text-ink-blue flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 border border-pencil-black/20" />
            <span>Starred Dependencies</span>
          </div>
          <p className="font-mono text-xs text-[#64748b]">
            Critical open-source packages you have starred to prevent upstream unpublishing or DMCA takedowns.
          </p>
        </div>

        <div className="p-4 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black space-y-1 shadow-scribely-xs">
          <div className="font-display font-black text-sm text-ink-blue flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600 border border-pencil-black/20" />
            <span>Forked Projects</span>
          </div>
          <p className="font-mono text-xs text-[#64748b]">
            Customized branches and patches fork-cloned from upstream open-source projects.
          </p>
        </div>
      </div>

      {/* Interactive Regex Scoping Sandbox */}
      <div className="p-5 sm:p-7 bg-[#fdfbf7] rounded-3xl border-2 border-pencil-black shadow-scribely-sm space-y-4">
        <div className="border-b-2 border-dashed border-pencil-black/20 pb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-black font-display text-ink-blue">
              Interactive Repository Regex Filter Sandbox
            </h3>
            <p className="font-caveat text-base text-[#64748b] font-bold">
              Test regex filter rules live before applying them to your vault discovery settings
            </p>
          </div>
          <HighlighterBadge color="emerald" variant="ribbon" size="md">
            {matchCount} / {sampleRepos.length} Matched
          </HighlighterBadge>
        </div>

        <div className="space-y-2">
          <div className="relative">
            <Search className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={regexQuery}
              onChange={(e) => setRegexQuery(e.target.value)}
              placeholder="Enter regex pattern e.g. ^(frontend|core)-.*"
              className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-pencil-black rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-ink-blue shadow-scribely-xs"
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <span className="text-[11px] font-mono text-[#64748b] self-center">Presets:</span>
            {[
              { label: 'All Core & Frontend', expr: '^(frontend|core)-.*' },
              { label: 'APIs Only', expr: '.*-api$' },
              { label: 'Exclude Legacy', expr: '^(?!legacy).*' },
              { label: 'Match All', expr: '.*' },
            ].map((p) => (
              <button
                key={p.expr}
                type="button"
                onClick={() => setRegexQuery(p.expr)}
                className="px-2.5 py-1 bg-white border border-pencil-black/30 rounded-lg text-[11px] font-mono hover:border-pencil-black cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Filter Result Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs pt-1">
          {matchResults.map((r, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl border-2 transition-all flex items-center justify-between ${
                r.matched
                  ? 'bg-emerald-50/70 border-[#15803d] text-emerald-950 shadow-scribely-xs'
                  : 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-60'
              }`}
            >
              <div className="space-y-0.5">
                <span className="font-bold block text-ink-blue">{r.name}</span>
                <span className="text-[10px] text-[#64748b]">
                  {r.org} &bull; {r.type}
                </span>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                  r.matched ? 'bg-emerald-200 text-emerald-900' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {r.matched ? 'MIRROR' : 'SKIP'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Discovery Execution Loop Card */}
      <div className="p-5 bg-[#fdfbf7] rounded-3xl border-2 border-pencil-black shadow-scribely-sm space-y-3 font-mono text-xs">
        <div className="text-ink-blue font-bold flex items-center gap-2 text-sm font-display">
          Octokit Non-Blocking Stream Pagination Loop
        </div>
        <div className="space-y-2 text-[#475569]">
          <div className="p-3 bg-white rounded-xl border border-pencil-black/10">
            1. <strong>Auth Handshake:</strong> Verify PAT validity &amp; check `x-ratelimit-remaining` header.
          </div>
          <div className="p-3 bg-white rounded-xl border border-pencil-black/10">
            2. <strong>Org Enumerate:</strong> Query `GET /user/orgs` to discover all enterprise namespaces.
          </div>
          <div className="p-3 bg-white rounded-xl border border-pencil-black/10">
            3. <strong>Parallel Traversal:</strong> Stream 100 repositories per page using `octokit.paginate.iterator()`.
          </div>
          <div className="p-3 bg-white rounded-xl border border-pencil-black/10">
            4. <strong>Cache &amp; Scrape:</strong> Persist discovered metadata into local SQLite/Electron cache with 1-click sync selection.
          </div>
        </div>
      </div>

      {/* Code Terminal for Octokit Discovery */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-ink-blue block">
          Octokit Automatic Stream Pagination Pipeline:
        </span>
        <CodeTerminalBlock
          title="octokit-pagination-service.ts"
          language="typescript"
          code={`import { Octokit } from '@octokit/rest'

export async function fetchCompleteRepoGraph(token: string, scopes: RepoFilterSet): Promise<RepoInfo[]> {
  const octokit = new Octokit({ auth: token })
  const repos: RepoInfo[] = []

  // 1. Fetch personal & collaborator repositories via auto-paginating iterator
  const iterator = octokit.paginate.iterator(octokit.rest.repos.listForAuthenticatedUser, {
    visibility: 'all',
    affiliation: 'owner,collaborator,organization_member',
    per_page: 100,
  })

  for await (const { data: page } of iterator) {
    for (const repo of page) {
      repos.push({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        owner: repo.owner.login,
        private: repo.private,
        defaultBranch: repo.default_branch,
        cloneUrl: repo.clone_url,
      })
    }
  }

  return repos
}`}
        />
      </div>
    </div>
  )
}
