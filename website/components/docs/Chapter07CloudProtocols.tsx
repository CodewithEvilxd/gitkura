'use client'

import React, { useState } from 'react'
import { Cloud, Search, Check, Copy, Sliders, ExternalLink } from 'lucide-react'
import CodeTerminalBlock from '@/components/CodeTerminalBlock'
import InkanStamp from '@/components/InkanStamp'
import HighlighterBadge from '@/components/HighlighterBadge'

interface ChapterProps {
  setLightboxImg: (img: { src: string; caption: string }) => void
}

export default function Chapter07CloudProtocols({ setLightboxImg }: ChapterProps) {
  const [activeCloudTab, setActiveCloudTab] = useState<
    'telegram' | 'gdrive' | 's3' | 'r2' | 'minio'
  >('telegram')

  const [tgToken, setTgToken] = useState('123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11')
  const [tgChatId, setTgChatId] = useState('-1001987654321')
  const [s3Bucket, setS3Bucket] = useState('my-company-git-vault')
  const [s3Region, setS3Region] = useState('us-east-1')
  const [s3Key, setS3Key] = useState('AKIAIOSFODNN7EXAMPLE')
  const [copiedConfig, setCopiedConfig] = useState(false)

  const generatedEnvText = `# GitKura Multi-Cloud Dispatch Environment
TELEGRAM_BOT_TOKEN="${tgToken}"
TELEGRAM_CHAT_ID="${tgChatId}"
AWS_S3_BUCKET="${s3Bucket}"
AWS_S3_REGION="${s3Region}"
AWS_ACCESS_KEY_ID="${s3Key}"
AWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
R2_ENDPOINT="https://account-id.r2.cloudflarestorage.com"
MINIO_ENDPOINT="https://nas.local:9000"`

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedEnvText)
    setCopiedConfig(true)
    setTimeout(() => setCopiedConfig(false), 2000)
  }

  return (
    <div className="space-y-6 pt-2">
      {/* Chapter Stamp Header */}
      <div className="flex items-center justify-between border-b-2 border-dashed border-pencil-black/20 pb-3">
        <InkanStamp kanji="雲" subtext="MULTI-CLOUD DISPATCH" variant="red" />
        <HighlighterBadge color="yellow" variant="ribbon" size="md">
          Replication &bull; Chapter 07
        </HighlighterBadge>
      </div>

      <div className="space-y-3 font-patrick text-base text-[#334155] leading-relaxed">
        <p>
          True redundancy requires geographic and vendor independence. Storing backups on GitHub while hosting on AWS is not enough if your organization gets locked out.
        </p>
        <p>
          GitKura connects directly to <strong>6 independent cloud destinations</strong> via native REST and S3 SDK drivers, with zero intermediary servers and zero proprietary vendor lock-in formats.
        </p>
      </div>

      {/* Multi-Cloud Dispatch Architecture Diagram */}
      <div className="space-y-2.5 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <HighlighterBadge color="rose" variant="ribbon" size="md">
            <span className="flex items-center gap-1.5">
              <Cloud className="w-3.5 h-3.5 text-[#e11d48]" />
              <span>Fig 7.1 &bull; Multi-Cloud Replication Topology</span>
            </span>
          </HighlighterBadge>
          <HighlighterBadge color="sky" variant="ribbon" size="md">
            6 Cloud Targets
          </HighlighterBadge>
        </div>

        <div
          onClick={() =>
            setLightboxImg({
              src: '/diagrams/multicloud-architecture.jpg',
              caption: 'Figure 7.1: GitKura Multi-Cloud Dispatch Architecture',
            })
          }
          className="relative w-full p-2.5 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black shadow-scribely-sm cursor-zoom-in"
        >
          <img
            src="/diagrams/multicloud-architecture.jpg"
            alt="GitKura Multi-Cloud Dispatch Architecture"
            draggable={false}
            className="w-full h-auto max-h-[520px] object-contain rounded-xl select-none pointer-events-none mix-blend-multiply"
          />
        </div>

        <div className="pt-2 border-t-2 border-dashed border-pencil-black/15 flex items-center justify-between">
          <span className="font-kalam text-sm font-bold text-[#1a3a5f] flex items-center gap-1.5">
            <span>↳</span> Parallel encrypted dispatch to Telegram, Google Drive, S3, R2, MinIO, Wasabi
          </span>
          <span className="font-mono text-[10px] text-ink-blue font-bold flex items-center gap-1">
            <Search className="w-3 h-3 text-ink-blue" />
            <span>Inspect Full-Res</span>
          </span>
        </div>
      </div>

      {/* Multi-Cloud Dispatch Pipeline Note */}
      <div className="p-5 bg-[#fdfbf7] rounded-3xl border-2 border-pencil-black shadow-scribely-sm space-y-3 font-mono text-xs">
        <div className="text-[#9f1239] font-bold uppercase flex items-center justify-between border-b-2 border-dashed border-pencil-black/20 pb-3">
          <span>Exponential Backoff with Full Jitter Formula</span>
          <HighlighterBadge color="sky" variant="ribbon" size="sm">
            Fault Tolerance
          </HighlighterBadge>
        </div>
        <div className="p-2.5 bg-[#ffe4e6]/60 rounded-xl border border-rose-300/40 text-[10px] sm:text-[11px] text-rose-950 font-bold overflow-x-auto break-all">
          <code>T_wait = min(Max_Delay, Base_Delay * 2^attempt) + random_jitter(0, 500ms)</code>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
          <div className="p-2.5 bg-white rounded-xl border border-pencil-black/10">
            <span className="font-bold text-ink-blue block">Telegram 50MB Split:</span>
            <span className="text-[#64748b]">Auto-chunks large repositories into multipart volumes.</span>
          </div>
          <div className="p-2.5 bg-white rounded-xl border border-pencil-black/10">
            <span className="font-bold text-ink-blue block">GDrive RSA JWT:</span>
            <span className="text-[#64748b]">Zero OAuth browser popups; headless Service Account JSON.</span>
          </div>
          <div className="p-2.5 bg-white rounded-xl border border-pencil-black/10">
            <span className="font-bold text-ink-blue block">Cloudflare R2:</span>
            <span className="text-[#64748b]">100% free egress bandwidth for lifetime snapshot storage.</span>
          </div>
        </div>
      </div>

      {/* Live Multi-Cloud Config Exporter Tool */}
      <div className="p-5 sm:p-7 bg-[#fdfbf7] rounded-3xl border-2 border-pencil-black shadow-scribely-sm space-y-4">
        <div className="border-b-2 border-dashed border-pencil-black/20 pb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-black font-display text-ink-blue">
              Live Multi-Cloud Credentials Generator
            </h3>
            <p className="font-caveat text-base text-[#64748b] font-bold">
              Fill in your target details to generate copyable .env / config credentials
            </p>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="px-3.5 py-1.5 bg-ink-blue text-white rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 hover:bg-ink-hover cursor-pointer shadow-scribely-xs"
          >
            {copiedConfig ? (
              <>
                <Check className="w-3.5 h-3.5 text-highlighter-yellow" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy .env</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 font-mono text-xs">
          <div>
            <label className="text-[#64748b] block mb-1">Telegram Bot Token:</label>
            <input
              type="text"
              value={tgToken}
              onChange={(e) => setTgToken(e.target.value)}
              className="w-full p-2 bg-white border border-pencil-black/30 rounded-lg text-xs"
            />
          </div>
          <div>
            <label className="text-[#64748b] block mb-1">Telegram Chat/Channel ID:</label>
            <input
              type="text"
              value={tgChatId}
              onChange={(e) => setTgChatId(e.target.value)}
              className="w-full p-2 bg-white border border-pencil-black/30 rounded-lg text-xs"
            />
          </div>
          <div>
            <label className="text-[#64748b] block mb-1">AWS / R2 Bucket Name:</label>
            <input
              type="text"
              value={s3Bucket}
              onChange={(e) => setS3Bucket(e.target.value)}
              className="w-full p-2 bg-white border border-pencil-black/30 rounded-lg text-xs"
            />
          </div>
        </div>

        <div className="p-3 bg-[#1e293b] text-slate-200 rounded-2xl font-mono text-xs overflow-x-auto">
          <pre>{generatedEnvText}</pre>
        </div>
      </div>

      {/* Interactive Protocol Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'telegram', label: 'Telegram Bot API' },
          { key: 'gdrive', label: 'Google Drive V3 RSA' },
          { key: 's3', label: 'AWS S3 Multi-Part' },
          { key: 'r2', label: 'Cloudflare R2 (0-Egress)' },
          { key: 'minio', label: 'MinIO & Wasabi (NAS)' },
        ].map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setActiveCloudTab(t.key as any)}
            className={`px-3 py-1.5 rounded-xl border-2 text-xs font-mono font-bold transition-all cursor-pointer ${
              activeCloudTab === t.key
                ? 'bg-ink-blue text-white border-pencil-black shadow-scribely-sm'
                : 'bg-white text-ink-blue border-pencil-black/20 hover:border-pencil-black'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Telegram */}
      {activeCloudTab === 'telegram' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="p-4 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black space-y-2 shadow-scribely-sm">
            <div className="flex items-center justify-between">
              <span className="font-display font-black text-sm text-ink-blue">
                Telegram Bot API Multipart Protocol
              </span>
              <span className="text-[10px] bg-blue-100 text-blue-900 px-2 py-0.5 rounded border border-blue-300">
                Limit: 50 MB / File
              </span>
            </div>
            <p className="text-[#475569]">
              Uploads standalone `.tar.gz` snapshots directly into your private Telegram Channel with commit metadata summaries.
            </p>
          </div>

          <CodeTerminalBlock
            title="telegram-dispatch.ts"
            language="typescript"
            code={`// Telegram Channel Bot Dispatch
import FormData from 'form-data'
import fs from 'fs'
import fetch from 'node-fetch'

export async function uploadToTelegram(botToken: string, chatId: string, filePath: string, caption: string) {
  const form = new FormData()
  form.append('chat_id', chatId) // Supergroup ID e.g. -1001234567890
  form.append('caption', caption)
  form.append('document', fs.createReadStream(filePath))

  const res = await fetch(\`https://api.telegram.org/bot\${botToken}/sendDocument\`, {
    method: 'POST',
    body: form,
  })
  return res.json()
}`}
          />
        </div>
      )}

      {/* Tab 2: Google Drive */}
      {activeCloudTab === 'gdrive' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="p-4 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black space-y-2 shadow-scribely-sm">
            <div className="flex items-center justify-between">
              <span className="font-display font-black text-sm text-ink-blue">
                Google Drive V3 Resumable RSA JWT Upload
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded border border-emerald-300">
                Service Account JSON
              </span>
            </div>
            <p className="text-[#475569]">
              Authenticates directly via RSA-SHA256 signed JWT tokens using native Node.js `crypto` without third-party OAuth redirect servers.
            </p>
          </div>

          <CodeTerminalBlock
            title="gdrive-jwt-auth.ts"
            language="typescript"
            code={`// Google Drive V3 Service Account RSA JWT Generator
import crypto from 'crypto'
import fetch from 'node-fetch'

export async function getGoogleDriveAccessToken(serviceAccountJson: any): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url')
  const claim = Buffer.from(JSON.stringify({
    iss: serviceAccountJson.client_email,
    scope: 'https://www.googleapis.com/auth/drive.file',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  })).toString('base64url')

  const sign = crypto.createSign('RSA-SHA256')
  sign.update(\`\${header}.\${claim}\`)
  const signature = sign.sign(serviceAccountJson.private_key, 'base64url')
  const jwt = \`\${header}.\${claim}.\${signature}\`

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: \`grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=\${jwt}\`,
  })
  const tokenData = await tokenRes.json()
  return tokenData.access_token
}`}
          />
        </div>
      )}

      {/* Tab 3: AWS S3 */}
      {activeCloudTab === 's3' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="p-4 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black space-y-2 shadow-scribely-sm">
            <span className="font-display font-black text-sm text-ink-blue block">
              AWS S3 Multi-Part Upload Pipeline
            </span>
            <p className="text-[#475569]">
              Least-privilege AWS IAM Policy for automated snapshot synchronization:
            </p>
          </div>

          <CodeTerminalBlock
            title="aws-s3-iam-policy.json"
            language="json"
            code={`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::my-gitkura-vault",
        "arn:aws:s3:::my-gitkura-vault/*"
      ]
    }
  ]
}`}
          />
        </div>
      )}

      {/* Tab 4: Cloudflare R2 */}
      {activeCloudTab === 'r2' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="p-4 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black space-y-2 shadow-scribely-sm">
            <span className="font-display font-black text-sm text-ink-blue block">
              Cloudflare R2 (100% Free Egress Bandwidth)
            </span>
            <p className="text-[#475569]">
              Configure custom endpoint mapping with your Cloudflare Account ID:
            </p>
          </div>

          <CodeTerminalBlock
            title="cloudflare-r2-config.ts"
            language="typescript"
            code={`// Cloudflare R2 Configuration using AWS S3 SDK
import { S3Client } from '@aws-sdk/client-s3'

export const r2Client = new S3Client({
  region: 'auto',
  endpoint: \`https://\${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com\`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
})`}
          />
        </div>
      )}

      {/* Tab 5: MinIO */}
      {activeCloudTab === 'minio' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="p-4 bg-[#fdfbf7] rounded-2xl border-2 border-pencil-black space-y-2 shadow-scribely-sm">
            <span className="font-display font-black text-sm text-ink-blue block">
              Self-Hosted MinIO &amp; Wasabi NAS Deployment
            </span>
            <p className="text-[#475569]">
              Enables air-gapped homelab and NAS replication via `forcePathStyle: true`:
            </p>
          </div>

          <CodeTerminalBlock
            title="minio-docker-compose.yml"
            language="bash"
            code={`# Run self-hosted MinIO bucket on your local server / NAS
docker run -d \\
  -p 9000:9000 \\
  -p 9001:9001 \\
  --name gitkura-minio \\
  -v /mnt/data/minio:/data \\
  -e "MINIO_ROOT_USER=gitkura_admin" \\
  -e "MINIO_ROOT_PASSWORD=vault_secure_password_123" \\
  quay.io/minio/minio server /data --console-address ":9001"`}
          />
        </div>
      )}
    </div>
  )
}
