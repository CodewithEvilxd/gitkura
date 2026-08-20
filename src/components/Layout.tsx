import { ReactNode } from 'react'
import Sidebar from './Sidebar'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-scribely-dots text-[#2d2d2d] antialiased overflow-hidden font-sans select-none">
      {/* Scribely Left Sidebar */}
      <Sidebar />

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Notebook Header Strip */}
        <header className="h-16 bg-[#ffffff]/90 backdrop-blur-sm border-b-2 border-[#2d2d2d] px-8 flex items-center justify-between z-20 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-hand text-xl text-[#1a3a5f] font-bold">
              GitKura Vault Notebook •
            </span>
            <span className="text-xs font-mono font-bold bg-[#fef08a] px-2.5 py-0.5 rounded-md border-2 border-[#2d2d2d] text-[#1a3a5f] shadow-xs">
              AES-256 Encrypted
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#64748b]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] border border-[#2d2d2d] animate-pulse" />
              <span className="font-mono text-[#2d2d2d] font-bold">Engine Ready</span>
            </div>
            <div className="h-5 w-px bg-[#2d2d2d]/20" />
            <div className="text-xs font-mono font-extrabold text-[#1a3a5f] bg-[#dbeafe] px-3 py-1 rounded-xl border-2 border-[#2d2d2d] shadow-xs">
              Nishant Gaurav
            </div>
          </div>
        </header>

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  )
}
