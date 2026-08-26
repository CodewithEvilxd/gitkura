'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import WashiTape from '@/components/WashiTape'
import InkanStamp from '@/components/InkanStamp'
import {
  Search,
  House,
  BookOpen,
  Layers,
  Cloud,
  ShieldAlert,
  Download,
  HardDrive,
  Cpu,
  Sliders,
  Shield,
  HelpCircle,
  PenTool,
  Key,
  Terminal,
  Zap,
  Printer,
  Copy,
  Github,
  ExternalLink,
  X,
  Code2,
  Calendar,
  Lock,
} from 'lucide-react'

export interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectChapter?: (chapterId: any) => void
}

interface CommandAction {
  id: string
  title: string
  subtitle?: string
  shortcut?: string
  icon: React.ComponentType<{ className?: string }>
  group: 'Navigation' | 'Chapters' | 'Actions & Tools' | 'External & Docs'
  action: () => void
  keywords?: string[]
}

export default function CommandPalette({
  open,
  onOpenChange,
  onSelectChapter,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Define comprehensive command actions
  const allCommands: CommandAction[] = useMemo(
    () => [
      // 1. NAVIGATION
      {
        id: 'nav-home',
        title: 'Home Page',
        subtitle: 'Return to GitKura main landing overview',
        shortcut: '⌘H',
        icon: House,
        group: 'Navigation',
        keywords: ['home', 'landing', 'main'],
        action: () => {
          onOpenChange(false)
          router.push('/')
        },
      },
      {
        id: 'nav-docs',
        title: 'Documentation Field Manual',
        subtitle: 'Browse all 12 architectural chapters',
        shortcut: '⌘D',
        icon: BookOpen,
        group: 'Navigation',
        keywords: ['docs', 'manual', 'field manual', 'documentation'],
        action: () => {
          onOpenChange(false)
          router.push('/docs')
        },
      },
      {
        id: 'nav-arch',
        title: 'Architecture Blueprint',
        subtitle: 'Core mirror engine & storage pipelines',
        shortcut: '⌘A',
        icon: Layers,
        group: 'Navigation',
        keywords: ['architecture', 'blueprint', 'engine', 'pipeline'],
        action: () => {
          onOpenChange(false)
          router.push('/architecture')
        },
      },
      {
        id: 'nav-cloud',
        title: 'Multi-Cloud Replication Hub',
        subtitle: 'Telegram, S3, R2, Drive & NAS protocols',
        shortcut: '⌘C',
        icon: Cloud,
        group: 'Navigation',
        keywords: ['cloud', 'replication', 'telegram', 's3', 'r2', 'drive'],
        action: () => {
          onOpenChange(false)
          router.push('/cloud')
        },
      },
      {
        id: 'nav-security',
        title: 'Zero-Trust Security & Cryptography',
        subtitle: 'AES-256-CBC, PBKDF2 salt & IPC gates',
        shortcut: '⌘S',
        icon: Shield,
        group: 'Navigation',
        keywords: ['security', 'cryptography', 'aes256', 'zero-trust'],
        action: () => {
          onOpenChange(false)
          router.push('/security')
        },
      },
      {
        id: 'nav-rescue',
        title: 'Disaster Recovery Runbook',
        subtitle: '3 restoration pathways & checksum verification',
        shortcut: '⌘R',
        icon: ShieldAlert,
        group: 'Navigation',
        keywords: ['recovery', 'disaster', 'restore', 'failover'],
        action: () => {
          onOpenChange(false)
          router.push('/disaster-recovery')
        },
      },
      {
        id: 'nav-download',
        title: 'Download Desktop Binaries',
        subtitle: 'Windows (.exe), macOS (.dmg) & Linux (.AppImage)',
        shortcut: '⌘B',
        icon: Download,
        group: 'Navigation',
        keywords: ['download', 'binary', 'install', 'appimage', 'dmg', 'exe'],
        action: () => {
          onOpenChange(false)
          router.push('/download')
        },
      },

      // 2. CHAPTERS
      {
        id: 'ch-rough',
        title: 'Draft 草: Rough Notebook (Handwritten Drafts)',
        subtitle: '4 authentic hand-sketched sheets & DAG math',
        shortcut: '⌘草',
        icon: PenTool,
        group: 'Chapters',
        keywords: ['draft', 'rough', 'handwritten', 'sketch', 'dag'],
        action: () => {
          onOpenChange(false)
          if (onSelectChapter) onSelectChapter('rough-notebook')
          else router.push('/docs')
        },
      },
      {
        id: 'ch-01',
        title: 'Chapter 01: Lore & The Digital Kura',
        subtitle: 'Why sovereign developers need air-gapped repositories',
        shortcut: '⌘01',
        icon: BookOpen,
        group: 'Chapters',
        keywords: ['lore', 'kura', 'philosophy', 'air-gap'],
        action: () => {
          onOpenChange(false)
          if (onSelectChapter) onSelectChapter('lore')
          else router.push('/docs')
        },
      },
      {
        id: 'ch-02',
        title: 'Chapter 02: Quickstart & Installation',
        subtitle: 'Windows, macOS & Linux standalone binaries',
        shortcut: '⌘02',
        icon: Terminal,
        group: 'Chapters',
        keywords: ['quickstart', 'installation', 'brew', 'winget', 'curl'],
        action: () => {
          onOpenChange(false)
          if (onSelectChapter) onSelectChapter('quickstart')
          else router.push('/docs')
        },
      },
      {
        id: 'ch-03',
        title: 'Chapter 03: Token Scopes & Fine-Grained PATs',
        subtitle: 'Least privilege auth, token generation & cURL validation',
        shortcut: '⌘03',
        icon: Key,
        group: 'Chapters',
        keywords: ['token', 'pat', 'auth', 'scopes', 'github token'],
        action: () => {
          onOpenChange(false)
          if (onSelectChapter) onSelectChapter('auth')
          else router.push('/docs')
        },
      },
      {
        id: 'ch-04',
        title: 'Chapter 04: Discovery & Regex Filters',
        subtitle: 'Stream-based pagination & repository regex sandbox',
        shortcut: '⌘04',
        icon: Search,
        group: 'Chapters',
        keywords: ['discovery', 'regex', 'filter', 'org', 'octokit'],
        action: () => {
          onOpenChange(false)
          if (onSelectChapter) onSelectChapter('discovery')
          else router.push('/docs')
        },
      },
      {
        id: 'ch-05',
        title: 'Chapter 05: Differential Git Engine',
        subtitle: 'Delta synchronization, refspecs & packfiles',
        shortcut: '⌘05',
        icon: Zap,
        group: 'Chapters',
        keywords: ['git', 'delta', 'sync', 'refspec', 'packfile', 'inodes'],
        action: () => {
          onOpenChange(false)
          if (onSelectChapter) onSelectChapter('git-engine')
          else router.push('/docs')
        },
      },
      {
        id: 'ch-06',
        title: 'Chapter 06: Snapshots & GFS Retention',
        subtitle: 'Point-in-time archives, SHA-256 & GFS pruning',
        shortcut: '⌘06',
        icon: HardDrive,
        group: 'Chapters',
        keywords: ['snapshot', 'gfs', 'retention', 'tarball', 'sha256'],
        action: () => {
          onOpenChange(false)
          if (onSelectChapter) onSelectChapter('snapshots')
          else router.push('/docs')
        },
      },
      {
        id: 'ch-07',
        title: 'Chapter 07: Multi-Cloud Dispatch Mesh',
        subtitle: 'Telegram, Google Drive, AWS S3, Cloudflare R2',
        shortcut: '⌘07',
        icon: Cloud,
        group: 'Chapters',
        keywords: ['cloud', 'telegram', 's3', 'r2', 'drive', 'minio'],
        action: () => {
          onOpenChange(false)
          if (onSelectChapter) onSelectChapter('cloud')
          else router.push('/docs')
        },
      },
      {
        id: 'ch-08',
        title: 'Chapter 08: Background Daemon & Tray',
        subtitle: 'node-cron scheduler, sleep catch-up & 32MB footprint',
        shortcut: '⌘08',
        icon: Cpu,
        group: 'Chapters',
        keywords: ['daemon', 'cron', 'scheduler', 'tray', 'background'],
        action: () => {
          onOpenChange(false)
          if (onSelectChapter) onSelectChapter('daemon')
          else router.push('/docs')
        },
      },
      {
        id: 'ch-09',
        title: 'Chapter 09: Concurrency Tuning & Rate Limits',
        subtitle: 'p-limit worker pool, jitter & exponential backoff',
        shortcut: '⌘09',
        icon: Sliders,
        group: 'Chapters',
        keywords: ['concurrency', 'rate-limit', 'p-limit', 'jitter', 'workers'],
        action: () => {
          onOpenChange(false)
          if (onSelectChapter) onSelectChapter('concurrency')
          else router.push('/docs')
        },
      },
      {
        id: 'ch-10',
        title: 'Chapter 10: AES-256 Zero-Trust Security',
        subtitle: 'PBKDF2 SHA-512 derivation & process sandboxing',
        shortcut: '⌘10',
        icon: Lock,
        group: 'Chapters',
        keywords: ['security', 'aes-256', 'pbkdf2', 'zero-trust', 'sandbox'],
        action: () => {
          onOpenChange(false)
          if (onSelectChapter) onSelectChapter('security')
          else router.push('/docs')
        },
      },
      {
        id: 'ch-11',
        title: 'Chapter 11: Disaster Recovery Runbook',
        subtitle: '3 emergency restoration paths & failover guide',
        shortcut: '⌘11',
        icon: ShieldAlert,
        group: 'Chapters',
        keywords: ['disaster', 'recovery', 'triage', 'failover', 'restore'],
        action: () => {
          onOpenChange(false)
          if (onSelectChapter) onSelectChapter('disaster-recovery')
          else router.push('/docs')
        },
      },
      {
        id: 'ch-12',
        title: 'Chapter 12: Troubleshooting Matrix & FAQs',
        subtitle: 'Diagnostic error table, self-test & 10 developer FAQs',
        shortcut: '⌘12',
        icon: HelpCircle,
        group: 'Chapters',
        keywords: ['troubleshooting', 'diagnostics', 'faq', 'errors', '403', '401'],
        action: () => {
          onOpenChange(false)
          if (onSelectChapter) onSelectChapter('troubleshooting')
          else router.push('/docs')
        },
      },

      // 3. ACTIONS & TOOLS
      {
        id: 'action-health',
        title: 'Run Diagnostic Self-Test',
        subtitle: 'Test Git binary, network ping, and vault write access',
        shortcut: '⇧⌘T',
        icon: Terminal,
        group: 'Actions & Tools',
        keywords: ['diagnostic', 'self-test', 'health check', 'ping'],
        action: () => {
          onOpenChange(false)
          if (onSelectChapter) onSelectChapter('troubleshooting')
          else router.push('/docs')
        },
      },
      {
        id: 'action-env',
        title: 'Generate Multi-Cloud .env Template',
        subtitle: 'Export copyable environment credentials for S3, Telegram & Drive',
        shortcut: '⇧⌘E',
        icon: Code2,
        group: 'Actions & Tools',
        keywords: ['env', 'credentials', 'config', 'export'],
        action: () => {
          onOpenChange(false)
          if (onSelectChapter) onSelectChapter('cloud')
          else router.push('/docs')
        },
      },
      {
        id: 'action-print',
        title: 'Print Disaster Recovery Runbook (PDF)',
        subtitle: 'Generate hardcopy physical binder runbook for cold-site emergencies',
        shortcut: '⇧⌘P',
        icon: Printer,
        group: 'Actions & Tools',
        keywords: ['print', 'pdf', 'runbook', 'binder'],
        action: () => {
          onOpenChange(false)
          if (typeof window !== 'undefined') window.print()
        },
      },

      // 4. EXTERNAL & DOCS
      {
        id: 'ext-github',
        title: 'View GitHub Repository',
        subtitle: 'Inspect open-source TypeScript codebase & releases',
        shortcut: '⌘G',
        icon: Github,
        group: 'External & Docs',
        keywords: ['github', 'repo', 'source', 'gitkura'],
        action: () => {
          onOpenChange(false)
          window.open('https://github.com', '_blank')
        },
      },
    ],
    [onOpenChange, onSelectChapter, router]
  )

  // Filter commands by query
  const filteredCommands = useMemo(() => {
    if (!query.trim()) return allCommands
    const q = query.toLowerCase()
    return allCommands.filter((cmd) => {
      const matchTitle = cmd.title.toLowerCase().includes(q)
      const matchSubtitle = cmd.subtitle?.toLowerCase().includes(q)
      const matchGroup = cmd.group.toLowerCase().includes(q)
      const matchKeywords = cmd.keywords?.some((k) => k.toLowerCase().includes(q))
      return matchTitle || matchSubtitle || matchGroup || matchKeywords
    })
  }, [query, allCommands])

  // Group commands
  const groupedCommands = useMemo(() => {
    const groups: { [key: string]: CommandAction[] } = {}
    filteredCommands.forEach((cmd) => {
      if (!groups[cmd.group]) groups[cmd.group] = []
      groups[cmd.group].push(cmd)
    })
    return groups
  }, [filteredCommands])

  // Global Keyboard listener for Ctrl+K, Cmd+K, Arrow navigation, and Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        onOpenChange(!open)
      } else if (open) {
        if (e.key === 'Escape') {
          e.preventDefault()
          onOpenChange(false)
        } else if (e.key === 'ArrowDown') {
          e.preventDefault()
          setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length))
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length))
        } else if (e.key === 'Enter') {
          e.preventDefault()
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onOpenChange, filteredCommands, selectedIndex])

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  if (!open) return null
  let globalIndexCounter = 0

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center p-3 sm:p-6 pt-12 sm:pt-20 animate-in fade-in duration-150"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="relative max-w-2xl w-full bg-[#fdfbf7] rounded-2xl sm:rounded-3xl border-2 sm:border-3 border-pencil-black shadow-scribely-2xl overflow-hidden flex flex-col space-y-0 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Washi Tape Header Decoration */}
        <WashiTape variant="yellow" className="-top-3 left-6 sm:left-10 scale-75 sm:scale-90" />
        <WashiTape variant="rose" className="-top-3 right-6 sm:right-10 scale-75 sm:scale-90" />

        {/* Search Input Box */}
        <div className="p-3.5 sm:p-5 border-b-2 border-dashed border-pencil-black/20 flex items-center gap-2.5 sm:gap-3.5 bg-white">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-ink-blue shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 13 chapters, actions & protocols..."
            className="w-full bg-transparent font-patrick text-lg sm:text-2xl text-ink-blue placeholder:text-[#94a3b8] placeholder:font-patrick placeholder:text-base sm:placeholder:text-lg focus:outline-none"
          />
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg sm:rounded-xl bg-[#f1f5f9] hover:bg-pencil-black hover:text-white border border-pencil-black font-mono text-[10px] sm:text-xs font-black shadow-scribely-xs flex items-center justify-center cursor-pointer transition-all shrink-0"
          >
            ESC
          </button>
        </div>

        {/* Grouped Commands List */}
        <div
          ref={listRef}
          className="max-h-[55vh] sm:max-h-[60vh] overflow-y-auto p-2.5 sm:p-3 space-y-3 sm:space-y-4 no-scrollbar"
        >
          {filteredCommands.length === 0 ? (
            <div className="p-6 sm:p-10 text-center space-y-2">
              <p className="font-patrick text-lg sm:text-xl text-ink-blue font-bold">
                No commands or documentation matched &quot;{query}&quot;.
              </p>
              <p className="font-caveat text-base sm:text-lg text-[#64748b]">
                Try searching for &quot;delta&quot;, &quot;telegram&quot;, &quot;AES-256&quot;, &quot;runbook&quot;, or &quot;quickstart&quot;.
              </p>
            </div>
          ) : (
            Object.entries(groupedCommands).map(([groupName, items]) => (
              <div key={groupName} className="space-y-1 sm:space-y-1.5">
                {/* Group Heading */}
                <div className="flex items-center justify-between px-2 pt-1 pb-0.5">
                  <span className="font-caveat font-black text-xs sm:text-sm uppercase tracking-wider text-[#64748b]">
                    {groupName}
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-[#f1f5f9] text-[#64748b] px-1.5 sm:px-2 py-0.2 sm:py-0.5 rounded border border-pencil-black/15">
                    {items.length}
                  </span>
                </div>

                {/* Group Items */}
                <div className="space-y-1">
                  {items.map((cmd) => {
                    const currentIndex = globalIndexCounter++
                    const isSelected = currentIndex === selectedIndex
                    const Icon = cmd.icon

                    return (
                      <button
                        key={cmd.id}
                        type="button"
                        onClick={() => cmd.action()}
                        onMouseEnter={() => setSelectedIndex(currentIndex)}
                        className={`w-full text-left p-2.5 sm:p-3 rounded-xl sm:rounded-2xl transition-all flex items-center justify-between gap-2.5 sm:gap-3 group cursor-pointer border-2 ${
                          isSelected
                            ? 'bg-highlighter-yellow/30 border-pencil-black shadow-scribely-xs'
                            : 'bg-white hover:bg-yellow-50/70 border-pencil-black/15 hover:border-pencil-black shadow-scribely-xs'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                          <div
                            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl border-2 border-pencil-black flex items-center justify-center shrink-0 transition-colors shadow-scribely-xs ${
                              isSelected ? 'bg-ink-blue text-white' : 'bg-[#f8fafc] text-ink-blue group-hover:bg-yellow-100'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </div>

                          <div className="space-y-0.5 min-w-0">
                            <span className="font-display font-black text-xs sm:text-base text-ink-blue block truncate group-hover:text-[#b91c1c] transition-colors">
                              {cmd.title}
                            </span>
                            {cmd.subtitle && (
                              <span className="font-patrick text-sm sm:text-base text-[#475569] block truncate leading-tight">
                                {cmd.subtitle}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Keyboard Shortcut Keycap Badge */}
                        {cmd.shortcut && (
                          <span className="hidden sm:flex font-mono text-[11px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg bg-[#f1f5f9] border border-pencil-black/20 text-ink-blue shadow-scribely-xs shrink-0 items-center gap-1 group-hover:border-pencil-black">
                            {cmd.shortcut}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Command Palette Footer */}
        <div className="p-2.5 sm:p-3.5 bg-white border-t-2 border-dashed border-pencil-black/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] sm:text-xs font-mono text-[#64748b]">
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.2 bg-[#f1f5f9] border border-pencil-black/25 rounded text-[9px] sm:text-[10px] font-bold text-ink-blue">↑</kbd>
              <kbd className="px-1.5 py-0.2 bg-[#f1f5f9] border border-pencil-black/25 rounded text-[9px] sm:text-[10px] font-bold text-ink-blue">↓</kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.2 bg-[#f1f5f9] border border-pencil-black/25 rounded text-[9px] sm:text-[10px] font-bold text-ink-blue">↵ Enter</kbd>
              <span>Select</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.2 bg-[#f1f5f9] border border-pencil-black/25 rounded text-[9px] sm:text-[10px] font-bold text-ink-blue">ESC</kbd>
              <span>Close</span>
            </span>
          </div>
          <span className="font-caveat font-extrabold text-sm sm:text-base text-ink-blue hidden sm:inline">
            GitKura (Git蔵) Field Manual v1.1.0
          </span>
        </div>
      </div>
    </div>
  )
}
