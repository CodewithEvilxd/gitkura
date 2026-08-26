'use client'

import React, { useState } from 'react'
import { Copy, Check, Terminal, FileCode2 } from 'lucide-react'

interface CodeTab {
  label: string
  language?: string
  code: string
}

interface CodeTerminalBlockProps {
  title?: string
  tabs?: CodeTab[]
  code?: string
  language?: string
  className?: string
  showLineNumbers?: boolean
}

export default function CodeTerminalBlock({
  title = 'terminal',
  tabs,
  code,
  language = 'bash',
  className = '',
  showLineNumbers = true,
}: CodeTerminalBlockProps) {
  const [activeTab, setActiveTab] = useState(0)
  const [copied, setCopied] = useState(false)

  const activeContent = tabs ? tabs[activeTab].code : code || ''
  const activeLang = tabs ? tabs[activeTab].language || 'bash' : language
  const activeTitle = tabs ? tabs[activeTab].label : title

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const lines = activeContent.split('\n')

  return (
    <div
      className={`rounded-2xl border-2 border-pencil-black overflow-hidden shadow-[4px_4px_0px_#17365D] bg-[#0c121e] text-slate-100 font-code text-xs select-text ${className}`}
    >
      {/* Top macOS Terminal Bar */}
      <div className="bg-[#172236] px-3 sm:px-4 py-2 sm:py-2.5 border-b-2 border-pencil-black flex flex-wrap items-center justify-between gap-2 select-none">
        {/* Left Window Control Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56] border border-black/30 inline-block" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e] border border-black/30 inline-block" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f] border border-black/30 inline-block" />

          {/* Terminal Title Pill */}
          <div className="ml-2 sm:ml-3 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#0c121e]/80 border border-slate-700 text-[10px] sm:text-[11px] text-slate-300 font-mono">
            <Terminal className="w-3 h-3 text-[#38bdf8]" />
            <span className="truncate max-w-[120px] sm:max-w-[200px]">{activeTitle}</span>
          </div>
        </div>

        {/* Center / Right Tabs (If Multiple) */}
        {tabs && tabs.length > 1 && (
          <div className="flex items-center gap-1 p-0.5 bg-[#0c121e] rounded-lg border border-slate-700">
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors cursor-pointer ${
                  activeTab === idx
                    ? 'bg-[#17365D] text-white font-bold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          className="px-3 py-1 bg-[#1e2d4a] hover:bg-[#25385d] text-slate-200 rounded-lg border border-slate-600 flex items-center gap-1.5 text-[11px] font-mono font-bold transition-all cursor-pointer shadow-xs active:scale-95"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-300" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body Area */}
      <div className="p-4 sm:p-5 overflow-x-auto text-[12px] sm:text-[13px] leading-relaxed max-h-[500px] overflow-y-auto no-scrollbar">
        <pre className="table w-full">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-slate-800/40">
                {showLineNumbers && (
                  <td className="w-8 pr-4 text-right select-none text-slate-600 font-mono text-[11px] border-r border-slate-800">
                    {idx + 1}
                  </td>
                )}
                <td className={`${showLineNumbers ? 'pl-4' : 'pl-0'} whitespace-pre font-code`}>
                  {formatCodeLine(line, activeLang)}
                </td>
              </tr>
            ))}
          </tbody>
        </pre>
      </div>
    </div>
  )
}

function formatCodeLine(line: string, lang: string) {
  // Comments
  if (line.trim().startsWith('#') || line.trim().startsWith('//')) {
    return <span className="text-slate-500 italic">{line}</span>
  }

  // Commands starting with git, npm, tar, curl
  if (
    line.trim().startsWith('git ') ||
    line.trim().startsWith('npm ') ||
    line.trim().startsWith('tar ') ||
    line.trim().startsWith('cd ') ||
    line.trim().startsWith('export ') ||
    line.trim().startsWith('curl ') ||
    line.trim().startsWith('docker ')
  ) {
    const parts = line.split(' ')
    const cmd = parts[0]
    const rest = parts.slice(1).join(' ')
    return (
      <>
        <span className="text-[#38bdf8] font-bold">{cmd}</span>{' '}
        {highlightFlagsAndArgs(rest)}
      </>
    )
  }

  // JSON formatting
  if (lang === 'json') {
    if (line.includes(':')) {
      const [key, ...valParts] = line.split(':')
      const val = valParts.join(':')
      return (
        <>
          <span className="text-[#7dd3fc]">{key}</span>:
          <span className="text-[#fde047]">{val}</span>
        </>
      )
    }
  }

  return <span className="text-slate-200">{line}</span>
}

function highlightFlagsAndArgs(str: string) {
  return str.split(' ').map((token, i) => {
    if (token.startsWith('--') || token.startsWith('-')) {
      return (
        <span key={i} className="text-[#c084fc] font-semibold">
          {token}{' '}
        </span>
      )
    }
    if (token.startsWith('https://') || token.startsWith('http://')) {
      return (
        <span key={i} className="text-[#4ade80] underline underline-offset-2">
          {token}{' '}
        </span>
      )
    }
    if (token.startsWith('"') || token.startsWith("'")) {
      return (
        <span key={i} className="text-[#fde047]">
          {token}{' '}
        </span>
      )
    }
    return <span key={i}>{token} </span>
  })
}
