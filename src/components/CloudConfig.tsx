import { useState } from 'react'
import { ipcInvoke } from '../hooks/useIpc'
import type { CloudConfig as CloudConfigType } from '../types'

interface Props {
  provider: 's3' | 'r2' | 'gdrive' | 'telegram' | 'custom' | 'none'
  config: CloudConfigType
  onProviderChange: (provider: 's3' | 'r2' | 'gdrive' | 'telegram' | 'custom' | 'none') => void
  onConfigChange: (config: CloudConfigType) => void
}

const cloudProviders = [
  {
    id: 'none' as const,
    name: 'Local Vault Only',
    desc: 'Store snapshots on local drive without cloud upload',
    badge: 'Standard',
    icon: (
      <svg className="w-6 h-6 text-[#1a3a5f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path d="M7 8h10" />
        <path d="M7 12h10" />
        <circle cx="12" cy="16" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'telegram' as const,
    name: 'Telegram Channel',
    desc: 'Instant cloud snapshot push to private Telegram channel',
    badge: 'Telegram Bot',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 240 240" fill="none">
        <circle cx="120" cy="120" r="120" fill="#24A1DE" />
        <path d="M54 116.5l117.8-49.2c5.4-2 10.2 1.3 8.4 9.7l-20 94.4c-1.5 6.8-5.5 8.4-11.2 5.2l-30.7-22.6-14.8 14.3c-1.6 1.6-3 3-6.2 3l2.2-31.4 57.2-51.7c2.5-2.2-.5-3.4-3.9-1.2L73 133.5l-30.5-9.5c-6.6-2-6.7-6.5 1.5-9.7v2.2z" fill="#ffffff" />
      </svg>
    ),
  },
  {
    id: 'gdrive' as const,
    name: 'Google Drive',
    desc: 'Direct snapshot sync to your Google Drive account',
    badge: 'Google Cloud',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 87.3 78" fill="none">
        <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5l5.4 9.35z" fill="#0066DA" />
        <path d="M43.65 25L29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44A8.9 8.9 0 000 53h27.5L43.65 25z" fill="#00AC47" />
        <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.8l5.85 10.15 7.9 13.65z" fill="#EA4335" />
        <path d="M43.65 25L57.4 1.2C56.05.4 54.5 0 52.85 0H34.45c-1.65 0-3.2.4-4.55 1.2L43.65 25z" fill="#00832D" />
        <path d="M59.8 53H27.5L13.75 76.8c1.35.8 2.9 1.2 4.55 1.2h50.7c1.65 0 3.2-.4 4.55-1.2L59.8 53z" fill="#2684FC" />
        <path d="M73.4 26.5l-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25l16.15 28h27.5c0-1.55-.4-3.1-1.2-4.5l-12.7-22z" fill="#FFBA00" />
      </svg>
    ),
  },
  {
    id: 's3' as const,
    name: 'Amazon S3',
    desc: 'Replicate snapshots to AWS S3 storage bucket',
    badge: 'AWS S3',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 428 512" fill="none">
        <path fill="#e25444" fillRule="evenodd" d="M378,99L295,257l83,158,34-19V118Z" />
        <path fill="#7b1d13" fillRule="evenodd" d="M378,99L212,118,127.5,257,212,396l166,19V99Z" />
        <path fill="#58150d" fillRule="evenodd" d="M43,99L16,111V403l27,12L212,257Z" />
        <path fill="#e25444" fillRule="evenodd" d="M42.637,98.667l169.587,47.111V372.444L42.637,415.111V98.667Z" />
        <path fill="#58150d" fillRule="evenodd" d="M212.313,170.667l-72.008-11.556,72.008-81.778,71.83,81.778Z" />
        <path fill="#58150d" fillRule="evenodd" d="M284.143,159.111l-71.919,11.733-71.919-11.733V77.333" />
        <path fill="#58150d" fillRule="evenodd" d="M212.313,342.222l-72.008,13.334,72.008,70.222,71.83-70.222Z" />
        <path fill="#7b1d13" fillRule="evenodd" d="M212,16L140,54V159l72.224-20.333Z" />
        <path fill="#7b1d13" fillRule="evenodd" d="M212.224,196.444l-71.919,7.823V309.105l71.919,8.228V196.444Z" />
        <path fill="#7b1d13" fillRule="evenodd" d="M212.224,373.333L140.305,355.3V458.363L212.224,496V373.333Z" />
        <path fill="#e25444" fillRule="evenodd" d="M284.143,355.3l-71.919,18.038V496l71.919-37.637V355.3Z" />
        <path fill="#e25444" fillRule="evenodd" d="M212.224,196.444l71.919,7.823V309.105l-71.919,8.228V196.444Z" />
        <path fill="#e25444" fillRule="evenodd" d="M212,16l72,38V159l-72-20V16Z" />
      </svg>
    ),
  },
  {
    id: 'r2' as const,
    name: 'Cloudflare R2',
    desc: 'Zero-egress fast S3-compatible cloud storage',
    badge: 'Zero Egress',
    icon: (
      <svg className="w-7 h-5" viewBox="0 0 120 78" fill="none">
        <path d="M94.6 34.6c-1.6-14.3-13.6-25.4-28.2-25.4-11.7 0-21.8 7.2-26.3 17.6-3-1.8-6.5-2.8-10.1-2.8C18.1 24 8.4 33.7 8.4 45.6c0 1.4.1 2.8.5 4.1C3.9 51.3 0 56.6 0 62.9 0 70.9 6.5 77.4 14.5 77.4h80.4c14.2 0 25.8-11.6 25.8-25.8 0-12.6-9-23.1-21-25.5l-5.1-1.5z" fill="#F38020" />
        <path d="M100.4 43.4c-1 0-2 .2-2.9.4 1.6 4.2 2.4 8.8 2.4 13.6 0 2.3-.2 4.5-.6 6.6h1.3c6.3 0 11.4-5.1 11.4-11.4 0-6.3-5.2-11.4-11.6-11.6v2.4z" fill="#FAAE40" />
      </svg>
    ),
  },
  {
    id: 'custom' as const,
    name: 'MinIO / S3',
    desc: 'Self-hosted MinIO, Wasabi or Backblaze B2',
    badge: 'Custom S3',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#C72C48">
        <path d="M12 2.5L2 8.2v7.6l10 5.7 10-5.7V8.2L12 2.5zm0 2.3l7.6 4.3L12 13.5 4.4 9.1 12 4.8zm-8 6.1l7 4v6.8l-7-4V10.9zm16 6.8l-7 4v-6.8l7-4v6.8z" />
      </svg>
    ),
  },
]

export default function CloudConfig({
  provider,
  config,
  onProviderChange,
  onConfigChange,
}: Props) {
  const [testing, setTesting] = useState(false)
  const [authMode, setAuthMode] = useState<'service_account' | 'access_token'>('service_account')
  const [testResult, setTestResult] = useState<{
    success: boolean
    message: string
  } | null>(null)

  const updateField = (field: keyof CloudConfigType, value: string) => {
    onConfigChange({ ...config, [field]: value })
    setTestResult(null)
  }

  const testConnection = async () => {
    setTesting(true)
    setTestResult(null)
    try {
      const result = await ipcInvoke<{ success: boolean; message: string }>(
        'kura:cloud:test-connection',
        provider,
        config,
      )
      setTestResult(result)
    } catch {
      setTestResult({ success: false, message: 'Connection test failed' })
    } finally {
      setTesting(false)
    }
  }

  const isTestDisabled = () => {
    if (testing) return true
    if (provider === 'telegram') {
      return !config.telegramBotToken?.trim()
    }
    if (provider === 'gdrive') {
      return !config.gdriveAccessToken?.trim() && !config.gdriveServiceAccountJson?.trim()
    }
    return !config.bucket || !config.accessKeyId
  }

  return (
    <div className="scribely-card p-7 relative overflow-visible">
      {/* Washi tape positioned cleanly */}
      <div className="washi-tape-rose -top-2.5 right-12 rotate-1 shadow-xs" />

      {/* Header */}
      <div className="flex items-center gap-3.5 mb-6">
        <div className="w-12 h-12 bg-[#fef08a] border-2 border-[#2d2d2d] shadow-scribely-sm rounded-2xl flex items-center justify-center text-[#1a3a5f] flex-shrink-0 rotate-1">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          </svg>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-black font-display text-[#1a3a5f] tracking-tight">Cloud &amp; Channel Replication</h3>
            <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-[#f1f5f9] text-[#64748b] border border-[#2d2d2d]/30 rounded-md">
              Telegram / Google Drive / S3 / R2 / MinIO
            </span>
          </div>
          <p className="font-hand text-base text-[#64748b] leading-tight font-medium">
            replicate compressed snapshots to Telegram Channel, Google Drive, AWS S3, Cloudflare R2 or MinIO
          </p>
        </div>
      </div>

      {/* Provider Selector Cards (3 on top, 3 on bottom) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {cloudProviders.map((p) => {
          const isSelected = provider === p.id
          return (
            <button
              key={p.id}
              onClick={() => {
                onProviderChange(p.id)
                setTestResult(null)
              }}
              className={`p-4 rounded-2xl border-2 transition-all text-left relative cursor-pointer flex flex-col justify-between min-h-[148px] ${
                isSelected
                  ? 'border-[#2d2d2d] bg-[#fef08a] shadow-scribely -rotate-0.5'
                  : 'border-[#2d2d2d]/30 bg-[#fdfbf7] hover:border-[#2d2d2d] hover:bg-white hover:shadow-xs'
              }`}
            >
              {/* Top Row: Icon Container + Floating Badge */}
              <div className="flex items-center justify-between gap-2 w-full">
                <div className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center flex-shrink-0 ${
                  isSelected ? 'bg-white border-[#2d2d2d]' : 'bg-white border-[#2d2d2d]/30'
                }`}>
                  {p.icon}
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-lg font-mono font-bold border text-center whitespace-nowrap shadow-2xs ${
                  isSelected ? 'bg-white text-[#1a3a5f] border-[#2d2d2d]' : 'bg-[#e2e8f0] text-[#475569] border-[#cbd5e1]'
                }`}>
                  {p.badge}
                </span>
              </div>

              {/* Bottom Content: Title and Desc */}
              <div className="mt-3">
                <p className="text-base font-black font-display text-[#1a3a5f] leading-snug">{p.name}</p>
                <p className="font-hand text-xs text-[#64748b] mt-0.5 leading-snug">{p.desc}</p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Telegram Channel Configuration Form */}
      {provider === 'telegram' && (
        <div className="space-y-4 p-6 bg-[#fdfbf7] rounded-2xl border-2 border-[#2d2d2d]">
          <div className="border-b-2 border-dashed border-[#2d2d2d]/25 pb-3.5 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-[#24A1DE]/10 border border-[#24A1DE]/30 text-[#24A1DE] mt-0.5">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-black font-display text-[#1a3a5f]">Telegram Private Channel &amp; Bot Setup</h4>
              <p className="font-hand text-xs text-[#64748b] leading-tight">
                GitKura will automatically push compressed <code className="font-mono text-[#1a3a5f]">.tar.gz</code> snapshots directly into your private channel with timestamps and repository details.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Telegram Bot API Token"
              value={config.telegramBotToken || ''}
              onChange={(v) => updateField('telegramBotToken', v)}
              placeholder="e.g. 7123456789:AAHk1_XyZ..."
              type="password"
            />

            <InputField
              label="Channel Chat ID or User ID"
              value={config.telegramChatId || ''}
              onChange={(v) => updateField('telegramChatId', v)}
              placeholder="e.g. -1001987654321 or @my_vault_channel"
            />
          </div>

          {/* Setup Guide Sticky Note */}
          <div className="p-3.5 bg-white rounded-xl border-2 border-[#2d2d2d] text-xs font-medium space-y-1.5 shadow-xs">
            <p className="font-mono font-bold text-[#1a3a5f] flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#1a3a5f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
              </svg>
              Quick 3-Step Setup:
            </p>
            <ol className="list-decimal list-inside font-hand text-xs text-[#475569] space-y-1 leading-snug">
              <li>Open <strong className="font-mono text-[#1a3a5f]">@BotFather</strong> on Telegram, create a bot, and copy the <strong>HTTP API Token</strong>.</li>
              <li>Create a <strong>Private Channel</strong> on Telegram and add your bot as an <strong>Administrator</strong> (with Post Messages permission).</li>
              <li>Forward any message from that channel to <strong className="font-mono text-[#1a3a5f]">@userinfobot</strong> to get your Channel ID (usually starts with <code className="font-mono bg-[#f1f5f9] px-1 rounded">-100...</code>).</li>
            </ol>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={testConnection}
              disabled={isTestDisabled()}
              className="px-6 py-3.5 bg-[#1a3a5f] hover:bg-[#244975] text-white scribely-btn rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:bg-[#cbd5e1] disabled:text-[#64748b] disabled:border-[#94a3b8] disabled:shadow-none"
            >
              {testing ? 'Verifying Bot & Channel...' : 'Test Telegram Channel Connection'}
            </button>

            {testResult && (
              <span className={`text-xs font-bold px-3.5 py-2 rounded-xl border-2 shadow-scribely-sm ${
                testResult.success
                  ? 'bg-[#dcfce7] text-[#15803d] border-[#15803d]'
                  : 'bg-[#fee2e2] text-[#991b1b] border-[#dc2626]'
              }`}>
                {testResult.message}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Google Drive Configuration Form */}
      {provider === 'gdrive' && (
        <div className="space-y-4 p-6 bg-[#fdfbf7] rounded-2xl border-2 border-[#2d2d2d]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-dashed border-[#2d2d2d]/25 pb-3.5">
            <div>
              <span className="text-sm font-black font-display text-[#1a3a5f]">Google Drive Authentication Method</span>
              <p className="font-hand text-xs text-[#64748b]">choose between Google Service Account Key JSON or OAuth Token</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setAuthMode('service_account')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-display border-2 transition-all cursor-pointer ${
                  authMode === 'service_account'
                    ? 'bg-[#fef08a] text-[#1a3a5f] border-[#2d2d2d] shadow-scribely-sm'
                    : 'bg-white text-[#64748b] border-[#2d2d2d]/30 hover:border-[#2d2d2d]'
                }`}
              >
                Service Account JSON
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('access_token')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-display border-2 transition-all cursor-pointer ${
                  authMode === 'access_token'
                    ? 'bg-[#fef08a] text-[#1a3a5f] border-[#2d2d2d] shadow-scribely-sm'
                    : 'bg-white text-[#64748b] border-[#2d2d2d]/30 hover:border-[#2d2d2d]'
                }`}
              >
                OAuth Access Token
              </button>
            </div>
          </div>

          {authMode === 'service_account' ? (
            <div>
              <label className="block text-xs font-mono font-bold text-[#1a3a5f] mb-1.5">
                Google Cloud Service Account JSON Key
              </label>
              <textarea
                value={config.gdriveServiceAccountJson || ''}
                onChange={(e) => updateField('gdriveServiceAccountJson', e.target.value)}
                placeholder='{ "type": "service_account", "project_id": "...", "private_key": "-----BEGIN RSA PRIVATE KEY...", "client_email": "..." }'
                rows={4}
                className="w-full bg-white border-2 border-[#2d2d2d] rounded-xl px-4 py-3 text-xs text-[#2d2d2d] placeholder-[#94a3b8] focus:outline-none focus:shadow-scribely-sm font-mono font-medium transition-all"
              />
              <p className="font-hand text-xs text-[#64748b] mt-1">
                Tip: Share your target Google Drive folder with the Service Account&apos;s <code className="font-mono bg-[#e2e8f0] px-1 rounded text-[#1a3a5f]">client_email</code> address.
              </p>
            </div>
          ) : (
            <InputField
              label="Google OAuth 2.0 Access Token"
              value={config.gdriveAccessToken || ''}
              onChange={(v) => updateField('gdriveAccessToken', v)}
              placeholder="ya29.a0AfH6SM..."
              type="password"
            />
          )}

          <InputField
            label="Google Drive Target Folder ID (Optional)"
            value={config.gdriveFolderId || ''}
            onChange={(v) => updateField('gdriveFolderId', v)}
            placeholder="e.g. 1A2b3C4d5E6f7G8h9I0jKlmNoP (from Google Drive URL: drive.google.com/drive/folders/<ID>)"
          />

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={testConnection}
              disabled={isTestDisabled()}
              className="px-6 py-3.5 bg-[#1a3a5f] hover:bg-[#244975] text-white scribely-btn rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:bg-[#cbd5e1] disabled:text-[#64748b] disabled:border-[#94a3b8] disabled:shadow-none"
            >
              {testing ? 'Verifying Google Drive Access...' : 'Test Google Drive Access'}
            </button>

            {testResult && (
              <span className={`text-xs font-bold px-3.5 py-2 rounded-xl border-2 shadow-scribely-sm ${
                testResult.success
                  ? 'bg-[#dcfce7] text-[#15803d] border-[#15803d]'
                  : 'bg-[#fee2e2] text-[#991b1b] border-[#dc2626]'
              }`}>
                {testResult.message}
              </span>
            )}
          </div>
        </div>
      )}

      {/* S3 / R2 / Custom S3 Config Form */}
      {provider !== 'none' && provider !== 'gdrive' && provider !== 'telegram' && (
        <div className="space-y-4 p-5 bg-[#fdfbf7] rounded-2xl border-2 border-[#2d2d2d]">
          {(provider === 'r2' || provider === 'custom') && (
            <InputField
              label={provider === 'r2' ? 'Cloudflare R2 Endpoint URL' : 'Custom S3 Endpoint URL'}
              value={config.endpoint || ''}
              onChange={(v) => updateField('endpoint', v)}
              placeholder="https://<account-id>.r2.cloudflarestorage.com or https://s3.wasabisys.com"
            />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Bucket Name"
              value={config.bucket}
              onChange={(v) => updateField('bucket', v)}
              placeholder="e.g. my-vault-backups"
            />

            {provider === 's3' && (
              <InputField
                label="AWS Region"
                value={config.region}
                onChange={(v) => updateField('region', v)}
                placeholder="us-east-1"
              />
            )}

            {(provider === 'r2' || provider === 'custom') && (
              <InputField
                label="Region (Optional)"
                value={config.region || 'auto'}
                onChange={(v) => updateField('region', v)}
                placeholder="auto"
              />
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Access Key ID"
              value={config.accessKeyId}
              onChange={(v) => updateField('accessKeyId', v)}
              placeholder="AKIA..."
            />

            <InputField
              label="Secret Access Key"
              value={config.secretAccessKey}
              onChange={(v) => updateField('secretAccessKey', v)}
              placeholder="Secret Key..."
              type="password"
            />
          </div>

          <InputField
            label="Storage Directory Prefix (Optional)"
            value={config.pathPrefix || ''}
            onChange={(v) => updateField('pathPrefix', v)}
            placeholder="gitkura-backups/"
          />

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={testConnection}
              disabled={isTestDisabled()}
              className="px-5 py-3 bg-[#1a3a5f] hover:bg-[#244975] text-white scribely-btn rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:bg-[#cbd5e1] disabled:text-[#64748b] disabled:border-[#94a3b8] disabled:shadow-none"
            >
              {testing ? 'Verifying Bucket Access...' : 'Test Cloud Connection'}
            </button>

            {testResult && (
              <span className={`text-xs font-bold px-3.5 py-2 rounded-xl border-2 shadow-scribely-sm ${
                testResult.success
                  ? 'bg-[#dcfce7] text-[#15803d] border-[#15803d]'
                  : 'bg-[#fee2e2] text-[#991b1b] border-[#dc2626]'
              }`}>
                {testResult.message}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  type?: string
}) {
  return (
    <div>
      <label className="block text-xs font-mono font-bold text-[#1a3a5f] mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border-2 border-[#2d2d2d] rounded-xl px-4 py-3 text-sm text-[#2d2d2d] placeholder-[#94a3b8] focus:outline-none focus:shadow-scribely-sm font-mono font-bold transition-all"
      />
    </div>
  )
}
