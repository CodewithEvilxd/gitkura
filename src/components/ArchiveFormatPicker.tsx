import type { ArchiveFormat } from '../types'

interface Props {
  format?: ArchiveFormat
  onChange: (format: ArchiveFormat) => void
}

export default function ArchiveFormatPicker({ format = 'tar.gz', onChange }: Props) {
  return (
    <div className="scribely-card p-7 relative">
      <div className="washi-tape -top-2.5 right-10 rotate-1" />

      {/* Header */}
      <div className="flex items-center gap-3.5 mb-6">
        <div className="w-12 h-12 bg-[#fef08a] border-2 border-[#2d2d2d] shadow-scribely-sm rounded-2xl flex items-center justify-center text-[#1a3a5f] flex-shrink-0 -rotate-1">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-black font-display text-[#1a3a5f] tracking-tight">
              Snapshot Archive Compression Format
            </h3>
            <span className="px-2.5 py-0.5 bg-[#fef08a] text-[#1a3a5f] border border-[#2d2d2d] rounded-full text-[10px] font-mono font-extrabold uppercase">
              Dual Engine
            </span>
          </div>
          <p className="font-hand text-base text-[#64748b] leading-tight font-medium">
            choose the archive packaging format for local snapshots, Telegram, and cloud mirrors
          </p>
        </div>
      </div>

      {/* Format Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Option 1: TAR.GZ */}
        <button
          type="button"
          onClick={() => onChange('tar.gz')}
          className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer relative ${
            format === 'tar.gz'
              ? 'bg-[#fef9c3] border-[#2d2d2d] shadow-scribely -rotate-0.5'
              : 'bg-white border-[#2d2d2d]/30 hover:border-[#2d2d2d] hover:bg-[#fdfbf7]'
          }`}
        >
          {format === 'tar.gz' && (
            <div className="absolute top-3.5 right-3.5 w-6 h-6 bg-[#1a3a5f] rounded-full flex items-center justify-center text-white border border-[#2d2d2d] shadow-xs">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          )}

          <div className="flex items-center gap-2.5 mb-2">
            <span className="font-mono text-sm font-black px-2.5 py-1 bg-white border border-[#2d2d2d] rounded-lg shadow-xs text-[#1a3a5f]">
              .tar.gz
            </span>
            <span className="text-[11px] font-mono font-bold text-[#854d0e] uppercase">
              Unix / GZIP Standard
            </span>
          </div>

          <h4 className="text-base font-black font-display text-[#1a3a5f]">GZIP Compressed Tarball</h4>
          <p className="font-hand text-sm text-[#64748b] mt-1 font-medium leading-snug">
            Highly compact differential packaging. Ideal for Linux servers, Mac terminals, and developer environments.
          </p>
        </button>

        {/* Option 2: ZIP */}
        <button
          type="button"
          onClick={() => onChange('zip')}
          className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer relative ${
            format === 'zip'
              ? 'bg-[#dbeafe] border-[#2d2d2d] shadow-scribely rotate-0.5'
              : 'bg-white border-[#2d2d2d]/30 hover:border-[#2d2d2d] hover:bg-[#fdfbf7]'
          }`}
        >
          {format === 'zip' && (
            <div className="absolute top-3.5 right-3.5 w-6 h-6 bg-[#1a3a5f] rounded-full flex items-center justify-center text-white border border-[#2d2d2d] shadow-xs">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          )}

          <div className="flex items-center gap-2.5 mb-2">
            <span className="font-mono text-sm font-black px-2.5 py-1 bg-white border border-[#2d2d2d] rounded-lg shadow-xs text-[#1a3a5f]">
              .zip
            </span>
            <span className="text-[11px] font-mono font-bold text-[#1e40af] uppercase">
              Universal Windows / Mac
            </span>
          </div>

          <h4 className="text-base font-black font-display text-[#1a3a5f]">Universal ZIP Archive</h4>
          <p className="font-hand text-sm text-[#64748b] mt-1 font-medium leading-snug">
            Instant 1-click double-click extraction directly inside Windows File Explorer, Telegram, and macOS Finder without tools.
          </p>
        </button>
      </div>
    </div>
  )
}
