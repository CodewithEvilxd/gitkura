import { useNavigate } from 'react-router-dom'
import { useSettings } from '../hooks/useSettings'
import TokenInput from '../components/TokenInput'
import BackupFolderPicker from '../components/BackupFolderPicker'
import CloudConfig from '../components/CloudConfig'

export default function SetupPage() {
  const { settings, updateSettings, loading } = useSettings()
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-sm font-black font-display text-[#1a3a5f] bg-white border-2 border-[#2d2d2d] shadow-scribely px-6 py-3.5 rounded-2xl">
          Initializing GitKura Engine...
        </div>
      </div>
    )
  }

  const isReady = Boolean(settings.githubToken && settings.backupPath)

  return (
    <div className="max-w-4xl mx-auto space-y-7 pb-10">
      {/* Page Title with Scribely Marker Pen */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border-2 border-[#2d2d2d] shadow-scribely-sm rounded-full mb-3 -rotate-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1a3a5f]" />
          <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-[#1a3a5f]">Chapter 01 • Connectors</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black font-display text-[#1a3a5f] tracking-tight">
          <span className="highlighter-pen-yellow">Vault Setup &amp; Configuration</span>
        </h2>
        <p className="font-hand text-xl text-[#64748b] mt-1.5 font-medium">
          Configure authentication, target local directory, and optional cloud storage destinations.
        </p>
      </div>

      <div className="space-y-7">
        <TokenInput
          token={settings.githubToken}
          onTokenChange={(token) => updateSettings({ githubToken: token })}
        />

        <BackupFolderPicker
          path={settings.backupPath}
          onPathChange={(backupPath) => updateSettings({ backupPath })}
        />

        <CloudConfig
          provider={settings.cloudProvider}
          config={settings.cloudConfig}
          onProviderChange={(cloudProvider) => updateSettings({ cloudProvider })}
          onConfigChange={(cloudConfig) => updateSettings({ cloudConfig })}
        />

        {isReady && (
          <div className="p-7 bg-[#dcfce7] border-2 border-[#2d2d2d] rounded-[22px] shadow-scribely flex items-center justify-between relative">
            <div className="washi-tape-green -top-2.5 right-10 rotate-1 rounded-xs" />
            <div className="flex items-center gap-4">
              <div className="w-13 h-13 bg-white border-2 border-[#2d2d2d] shadow-scribely-sm rounded-2xl flex items-center justify-center text-[#15803d] flex-shrink-0 -rotate-1">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div>
                <p className="text-xl font-black font-display text-[#1a3a5f]">Vault Parameters Locked &amp; Ready</p>
                <p className="font-hand text-base text-[#166534] leading-tight font-medium">
                  Token and local disk paths confirmed. Proceed to select repositories for synchronization.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/repos')}
              className="px-6 py-3.5 bg-[#1a3a5f] hover:bg-[#244975] text-white scribely-btn rounded-2xl text-sm font-black flex items-center gap-2 cursor-pointer flex-shrink-0"
            >
              <span>Explore Repositories</span>
              <svg className="w-4 h-4 text-[#fef08a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
