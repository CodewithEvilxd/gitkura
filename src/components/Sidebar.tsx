import { NavLink } from 'react-router-dom'
import { useSettings } from '../hooks/useSettings'
import logoImg from '../assets/logo.png'

const navLinks = [
  {
    to: '/setup',
    label: 'Vault Setup',
    note: 'tokens & storage',
    badge: '01',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    to: '/repos',
    label: 'Repositories',
    note: 'scope & selection',
    badge: '02',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 22h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-4v20z" />
        <path d="M4 22h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2z" />
        <path d="M10 22h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-4v20z" />
      </svg>
    ),
  },
  {
    to: '/backup',
    label: 'Vault Sync',
    note: 'live mirror console',
    badge: '03',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    to: '/archives',
    label: 'Archives',
    note: 'tar.gz snapshots',
    badge: 'ZIP',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="21 8 21 21 3 21 3 8" />
        <rect x="1" y="3" width="22" height="5" />
        <line x1="10" y1="12" x2="14" y2="12" />
      </svg>
    ),
  },
  {
    to: '/settings',
    label: 'Preferences',
    note: 'cron & speed limits',
    badge: 'SYS',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    to: '/docs',
    label: 'Documentation',
    note: 'guide & lore',
    badge: 'DOC',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
        <path d="M6 6h10" />
        <path d="M6 10h10" />
        <path d="M6 14h6" />
      </svg>
    ),
  },
]

export default function Sidebar() {
  const { settings } = useSettings()
  const isReady = Boolean(settings.githubToken && settings.backupPath)

  return (
    <aside className="w-72 bg-[#ffffff] border-r-2 border-[#2d2d2d] flex flex-col justify-between select-none shadow-[3px_0px_0px_rgba(45,45,45,0.06)] relative z-30">
      {/* Top Brand Header */}
      <div>
        <div className="p-5 pb-4 border-b-2 border-[#2d2d2d] bg-[#fdfbf7] relative overflow-visible">
          {/* Scribely Washi Tape strip */}
          <div className="washi-tape -top-2 left-6 -rotate-2 rounded-xs shadow-xs" />

          <div className="flex items-center gap-3.5 pt-1">
            <div className="w-14 h-14 rounded-2xl bg-white border-2 border-[#2d2d2d] shadow-scribely-sm flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img
                src={logoImg}
                alt="GitKura Logo"
                className="w-full h-full object-cover scale-105"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-2xl font-black font-display text-[#1a3a5f] tracking-tight leading-none">GitKura</h1>
                <span className="px-1.5 py-0.5 text-[11px] font-black font-display bg-[#fef08a] text-[#1a3a5f] border-2 border-[#2d2d2d] rounded-md shadow-xs">
                  蔵
                </span>
              </div>
              <p className="font-hand text-base text-[#64748b] leading-tight mt-0.5 font-medium">
                git vault &amp; safehouse
              </p>
            </div>
          </div>
        </div>

        {/* Scribely Nav Links */}
        <nav className="p-4 space-y-2.5">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all ${
                  isActive
                    ? 'bg-[#fef08a] text-[#1a3a5f] border-2 border-[#2d2d2d] shadow-scribely-sm -rotate-0.5'
                    : 'text-[#475569] hover:text-[#1a3a5f] hover:bg-[#f8f6f0] border-2 border-transparent hover:border-[#2d2d2d]/30 hover:shadow-xs'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-1.5 rounded-xl border ${
                      isActive ? 'bg-[#ffffff] border-[#2d2d2d] text-[#1a3a5f]' : 'bg-[#f1f5f9] border-[#cbd5e1] text-[#64748b]'
                    }`}>
                      {link.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-black font-display tracking-tight truncate leading-tight">
                        {link.label}
                      </p>
                      <p className="font-hand text-xs text-[#64748b] leading-tight">
                        {link.note}
                      </p>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-mono font-bold border ${
                    isActive
                      ? 'bg-white text-[#1a3a5f] border-[#2d2d2d]'
                      : 'bg-[#f1f5f9] text-[#64748b] border-[#cbd5e1]'
                  }`}>
                    {link.badge}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer Sticky Note & Status Card */}
      <div className="p-4 bg-[#fdfbf7] border-t-2 border-[#2d2d2d] space-y-3 relative">
        {/* Scribely Sticky Card */}
        <div className={`p-4 rounded-2xl border-2 border-[#2d2d2d] shadow-scribely-sm relative ${
          isReady ? 'bg-[#dcfce7]' : 'bg-[#fff7ed]'
        }`}>
          {/* Blue washi tape */}
          <div className="washi-tape-blue -top-2 right-4 rotate-1 rounded-xs" />

          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full border-2 border-[#2d2d2d] ${isReady ? 'bg-[#22c55e]' : 'bg-[#f97316]'}`} />
            <span className="text-xs font-black font-display tracking-tight text-[#1a3a5f]">
              {isReady ? 'Vault Status: Active' : 'Setup Required'}
            </span>
          </div>
          <p className="font-hand text-sm text-[#475569] mt-1 leading-snug">
            {isReady ? 'All credentials locked. Ready to sync.' : 'Add GitHub PAT and vault location.'}
          </p>
        </div>

        {/* System & Author Tag */}
        <div className="flex items-center justify-between text-xs px-1">
          <span className="font-mono text-[#64748b] font-bold">GitKura v1.0</span>
          <span className="font-hand text-base font-bold text-[#1a3a5f]">by Nishant Gaurav</span>
        </div>
      </div>
    </aside>
  )
}
