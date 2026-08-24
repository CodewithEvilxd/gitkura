'use client'

import {
  Check,
  X,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import WashiTape from './WashiTape'

const comparisonRows = [
  {
    feature: 'Differential Delta Sync (90% Bandwidth Saved)',
    manualClone: false,
    genericCloud: false,
    gitKura: true,
  },
  {
    feature: 'All Remote Branches & Tags Mirrored Locally',
    manualClone: 'Partial',
    genericCloud: false,
    gitKura: true,
  },
  {
    feature: 'Standalone Point-in-Time .tar.gz & .zip Archives',
    manualClone: false,
    genericCloud: 'Partial',
    gitKura: true,
  },
  {
    feature: 'Telegram Channel Snapshot Push (Up to 50MB)',
    manualClone: false,
    genericCloud: false,
    gitKura: true,
  },
  {
    feature: 'AES-256 Local Disk Encryption for All Secrets',
    manualClone: false,
    genericCloud: 'Unknown',
    gitKura: true,
  },
  {
    feature: '100% Zero Telemetry & Air-Gapped Offline Operation',
    manualClone: true,
    genericCloud: false,
    gitKura: true,
  },
  {
    feature: 'Automated Background System Tray Daemon',
    manualClone: false,
    genericCloud: true,
    gitKura: true,
  },
  {
    feature: '100% Free & Open-Source (MIT License)',
    manualClone: true,
    genericCloud: false,
    gitKura: true,
  },
]

export default function ComparisonSection() {
  return (
    <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-emerald-50/90 border-2 border-pencil-black shadow-scribely-sm rounded-full -rotate-1">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
          <span className="font-caveat font-bold text-lg text-emerald-950">
            why developers choose gitkura 蔵
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-marker uppercase leading-[1.25] text-[#17365D] tracking-tight">
          <span className="relative inline-block text-[#E9A51A] whitespace-nowrap">
            HOW GITKURA COMPARES
            <svg
              className="absolute left-0 -bottom-2 w-full h-3 select-none pointer-events-none"
              viewBox="0 0 240 8"
              fill="none"
              preserveAspectRatio="none"
            >
              <path d="M 2 5 Q 120 2 238 5" stroke="#E9A51A" strokeWidth="3.6" strokeLinecap="round" />
            </svg>
          </span>{' '}
          TO ALTERNATIVES.
        </h2>
        <p className="font-kalam text-xl text-[#64748b] font-bold">
          See why engineering teams and developers choose an air-gapped vault over fragile shell scripts and expensive cloud SaaS.
        </p>
      </div>

      {/* Comparison Table Card */}
      <div className="max-w-5xl mx-auto relative">
        <WashiTape variant="yellow" className="-top-3 right-12" />

        <div className="scribely-card overflow-hidden bg-white shadow-scribely-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#faf8f5] border-b-2 border-pencil-black text-xs font-mono font-bold text-ink-blue">
                  <th className="p-4 sm:p-5 font-mono">Capability &amp; Security Feature</th>
                  <th className="p-4 sm:p-5 text-center font-mono text-[#64748b]">Manual Git Clones</th>
                  <th className="p-4 sm:p-5 text-center font-mono text-[#64748b]">Generic Cloud SaaS</th>
                  <th className="p-4 sm:p-5 text-center bg-highlighter-yellow/40 border-l-2 border-pencil-black text-ink-blue font-black font-display">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-1 select-none pointer-events-none mb-0.5">
                        <span className="text-xs font-caveat font-bold text-emerald-800 -rotate-2">
                          air-gapped safe choice
                        </span>
                        <svg className="w-3.5 h-3.5 text-emerald-700" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                          <path d="M 8 2 L 8 12 M 4 8 L 8 12 L 12 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span>GitKura Vault 蔵</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-dashed divide-pencil-black/15 text-xs font-mono">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#faf8f5]/60 transition-colors">
                    <td className="p-4 sm:p-5 font-sans font-bold text-sm text-pencil-black">
                      {row.feature}
                    </td>

                    <td className="p-4 sm:p-5 text-center font-mono">
                      {typeof row.manualClone === 'boolean' ? (
                        row.manualClone ? (
                          <Check className="w-4 h-4 text-[#15803d] mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-[#dc2626] mx-auto opacity-50" />
                        )
                      ) : (
                        <span className="text-[#64748b]">{row.manualClone}</span>
                      )}
                    </td>

                    <td className="p-4 sm:p-5 text-center font-mono">
                      {typeof row.genericCloud === 'boolean' ? (
                        row.genericCloud ? (
                          <Check className="w-4 h-4 text-[#15803d] mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-[#dc2626] mx-auto opacity-50" />
                        )
                      ) : (
                        <span className="text-[#64748b]">{row.genericCloud}</span>
                      )}
                    </td>

                    <td className="p-4 sm:p-5 text-center bg-highlighter-yellow/20 border-l-2 border-pencil-black font-bold text-[#15803d]">
                      <div className="flex items-center justify-center gap-1">
                        <Check className="w-4 h-4 text-[#15803d] stroke-[3]" />
                        <span className="text-[11px] font-mono uppercase font-black">Yes</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cute Bottom Callout */}
        <div className="mt-8 text-center">
          <span className="font-gaegu text-lg sm:text-xl font-bold text-emerald-900 bg-emerald-100/70 px-5 py-1.5 rounded-full border border-emerald-300 shadow-sm inline-flex items-center gap-1.5">
            100% Free &amp; Open-Source (MIT License) &bull; Zero Telemetry Guarantee!
          </span>
        </div>
      </div>
    </section>
  )
}
