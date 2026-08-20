import { ipcInvoke } from '../hooks/useIpc'

interface Props {
  path: string
  onPathChange: (path: string) => void
}

export default function BackupFolderPicker({ path, onPathChange }: Props) {
  const selectFolder = async () => {
    const selected = await ipcInvoke<string | null>('kura:dialog:select-folder')
    if (selected) {
      onPathChange(selected)
    }
  }

  return (
    <div className="scribely-card p-7 relative overflow-visible">
      {/* Washi Tape strip on top */}
      <div className="washi-tape-blue -top-2.5 right-8 rotate-1 shadow-xs" />

      {/* Header */}
      <div className="flex items-center gap-3.5 mb-5">
        <div className="w-12 h-12 bg-[#fef08a] border-2 border-[#2d2d2d] shadow-scribely-sm rounded-2xl flex items-center justify-center text-[#1a3a5f] flex-shrink-0 -rotate-1">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
            <path d="M2 10h20" />
          </svg>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-black font-display text-[#1a3a5f] tracking-tight">Local Vault Location</h3>
            <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-[#fef08a] text-[#1a3a5f] border border-[#2d2d2d] rounded-md shadow-xs">
              Local Drive
            </span>
          </div>
          <p className="font-hand text-base text-[#64748b] leading-tight font-medium">
            choose where your repositories &amp; snapshot archives will live
          </p>
        </div>
      </div>

      {/* Directory Selector Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={path}
            readOnly
            placeholder="Select a folder on your drive..."
            className="w-full bg-[#fdfbf7] border-2 border-[#2d2d2d] rounded-2xl px-4 py-3.5 text-sm text-[#2d2d2d] placeholder-[#94a3b8] cursor-default font-mono font-bold truncate"
          />
        </div>
        <button
          onClick={selectFolder}
          className="px-6 py-3.5 bg-[#2d2d2d] hover:bg-[#1f1f1f] text-white scribely-btn rounded-2xl text-sm font-black flex items-center gap-2 cursor-pointer flex-shrink-0"
        >
          <svg className="w-4 h-4 text-[#fef08a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
          </svg>
          <span>Browse Vault Path</span>
        </button>
      </div>

      {/* Notebook Note */}
      <div className="mt-4 flex items-center gap-2.5 bg-[#fdfbf7] p-3.5 rounded-2xl border-2 border-dashed border-[#2d2d2d]/25">
        <svg className="w-4 h-4 text-[#1a3a5f] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <span className="font-hand text-base text-[#475569] leading-tight font-medium">
          Repositories are cloned into <code className="text-[#1a3a5f] font-mono font-bold bg-[#e2e8f0] px-1.5 py-0.5 rounded border border-[#cbd5e1] text-xs">owner/repo/</code> with compressed <code className="text-[#1a3a5f] font-mono font-bold bg-[#e2e8f0] px-1.5 py-0.5 rounded border border-[#cbd5e1] text-xs">.archives/</code> snapshots.
        </span>
      </div>
    </div>
  )
}
