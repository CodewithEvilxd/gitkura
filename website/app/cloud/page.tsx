'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  Send,
  HardDrive,
  Cloud,
  Database,
  Shield,
  Server,
  Terminal,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  Code2,
  Layers,
  Sparkles,
} from 'lucide-react'

export default function CloudReplicationPage() {
  const [activeTab, setActiveTab] = useState<'telegram' | 'gdrive' | 's3' | 'r2' | 'minio' | 'local'>('telegram')
  const [copied, setCopied] = useState(false)

  const cloudConfigs = {
    telegram: {
      name: 'Telegram Channel Vault',
      badge: 'Bot API Multipart',
      tagline: 'Stream compressed .tar.gz snapshots directly into your private channel or group with rich Markdown metadata.',
      envConfig: `TELEGRAM_BOT_TOKEN="7123456789:AAHk1_XyZ987654321..."
TELEGRAM_CHAT_ID="-1001987654321" # Private supergroup ID
VAULT_MAX_SIZE_MB="50"`,
      codeSnippet: `// electron/services/cloud.service.ts (Telegram Handler)
async function uploadToTelegram(filePath: string, caption: string) {
  const formData = new FormData()
  formData.append('chat_id', this.config.telegramChatId)
  formData.append('caption', caption)
  formData.append('parse_mode', 'Markdown')
  formData.append('document', new Blob([fs.readFileSync(filePath)]), 'snapshot.tar.gz')

  const res = await fetch(\`https://api.telegram.org/bot\${this.config.telegramBotToken}/sendDocument\`, {
    method: 'POST',
    body: formData,
  })
  return await res.json()
}`,
      steps: [
        'Open @BotFather on Telegram and create a new bot to receive your API Token.',
        'Create a private Channel or Group, and add your bot as an Administrator with "Post Messages" rights.',
        'Forward a message from your channel to @userinfobot to retrieve the Channel ID (starts with -100).',
        'Enter credentials in GitKura Setup to enable automated snapshot broadcasts.',
      ],
    },
    gdrive: {
      name: 'Google Drive V3 Resumable',
      badge: 'RSA-SHA256 JWT Signed',
      tagline: 'Direct cloud synchronization into designated Google Drive folders using Service Accounts or OAuth2 tokens.',
      envConfig: `GDRIVE_SERVICE_ACCOUNT_JSON='{
  "type": "service_account",
  "project_id": "my-vault-project",
  "private_key": "-----BEGIN RSA PRIVATE KEY...\\n-----END RSA PRIVATE KEY...",
  "client_email": "vault-sync@my-vault-project.iam.gserviceaccount.com"
}'
GDRIVE_TARGET_FOLDER_ID="1A2b3C4d5E6f7G8h9I0jKlmNoP"`,
      codeSnippet: `// Native RSA-SHA256 JWT generation in Node.js (Zero external libraries)
const now = Math.floor(Date.now() / 1000)
const header = { alg: 'RS256', typ: 'JWT' }
const claim = {
  iss: sa.client_email,
  scope: 'https://www.googleapis.com/auth/drive.file',
  aud: 'https://oauth2.googleapis.com/token',
  exp: now + 3600,
  iat: now,
}
const unsigned = \`\${base64url(JSON.stringify(header))}.\${base64url(JSON.stringify(claim))}\`
const signer = crypto.createSign('RSA-SHA256')
signer.update(unsigned)
const jwt = \`\${unsigned}.\${signer.sign(sa.private_key, 'base64url')}\``,
      steps: [
        'Create a Service Account in Google Cloud Console and generate a JSON Key.',
        'Create a folder in Google Drive and share edit access with the Service Account email.',
        'Copy the Folder ID from the Google Drive URL (after /folders/...).',
        'Paste the JSON Key into GitKura for silent, automatic token signing.',
      ],
    },
    s3: {
      name: 'Amazon Web Services S3',
      badge: 'AWS SDK v3 Multipart',
      tagline: 'High-throughput multi-part streaming to Amazon S3 with storage tier lifecycle rules.',
      envConfig: `AWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"
AWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
AWS_REGION="us-east-1"
S3_BUCKET_NAME="my-enterprise-gitkura-vault"
S3_PATH_PREFIX="production-backups/"`,
      codeSnippet: `// Official @aws-sdk/lib-storage Upload Stream
const upload = new Upload({
  client: this.s3Client,
  params: {
    Bucket: this.bucket,
    Key: \`\${this.pathPrefix}\${key}\`,
    Body: fs.createReadStream(filePath),
    ContentType: 'application/gzip',
  },
  partSize: 50 * 1024 * 1024, // 50MB multipart chunk
  leavePartsOnError: false,
})

upload.on('httpUploadProgress', (p) => {
  const percent = Math.round((p.loaded / fileSize) * 100)
  onProgress(percent)
})`,
      steps: [
        'Create an AWS S3 Bucket in your desired region with bucket versioning enabled.',
        'Generate an IAM User with s3:PutObject and s3:HeadBucket permissions.',
        'Configure lifecycle rules in AWS (e.g., transition snapshots older than 30 days to Glacier Deep Archive).',
        'Input keys into GitKura with optional path prefix (e.g. daily-snapshots/).',
      ],
    },
    r2: {
      name: 'Cloudflare R2 Storage',
      badge: 'Zero Egress Fees',
      tagline: 'S3-compatible global object storage with zero egress bandwidth download fees.',
      envConfig: `R2_ACCOUNT_ID="1234567890abcdef1234567890abcdef"
R2_ENDPOINT="https://<account-id>.r2.cloudflarestorage.com"
R2_ACCESS_KEY_ID="r2_token_id"
R2_SECRET_ACCESS_KEY="r2_secret_token"
R2_BUCKET="gitkura-vault"`,
      codeSnippet: `// S3Client configured for Cloudflare R2 endpoint
const client = new S3Client({
  credentials: {
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
  },
  region: 'auto',
  endpoint: config.endpoint,
  forcePathStyle: true,
})`,
      steps: [
        'Log in to Cloudflare Dashboard and navigate to R2 Object Storage.',
        'Create a new R2 bucket and generate an API Token with Admin Read & Write permissions.',
        'Copy the S3 endpoint URL: https://<account_id>.r2.cloudflarestorage.com',
        'Benefit from 100% free data restoration downloads during emergencies.',
      ],
    },
    minio: {
      name: 'Self-Hosted MinIO & Wasabi',
      badge: 'Private & On-Premise',
      tagline: 'Complete on-premise storage isolation for Kubernetes, private data centers, and Wasabi.',
      envConfig: `MINIO_ENDPOINT="https://minio.internal.company.com:9000"
MINIO_ROOT_USER="minioadmin"
MINIO_ROOT_PASSWORD="minio_vault_password"
MINIO_BUCKET="airgapped-git-vault"`,
      codeSnippet: `// Dedicated MinIO connection with custom port and forcePathStyle
const minioClient = new S3Client({
  endpoint: 'https://minio.internal.company.com:9000',
  credentials: { accessKeyId: 'minioadmin', secretAccessKey: 'miniopass' },
  region: 'us-east-1',
  forcePathStyle: true,
})`,
      steps: [
        'Deploy MinIO via Docker or Kubernetes on your internal network.',
        'Create a dedicated vault bucket (e.g. airgapped-git-vault).',
        'Supply the intranet endpoint with forcePathStyle enabled.',
        'Keep all backups completely isolated behind your corporate firewall.',
      ],
    },
    local: {
      name: 'Air-Gapped Local Storage',
      badge: 'Cold SSD / NAS',
      tagline: 'Pure offline operation writing uncompressed Git mirrors and .tar.gz snapshots to local disk.',
      envConfig: `LOCAL_VAULT_PATH="C:/GitKura-Vault/"
SNAPSHOT_FORMAT="tar.gz" # or "zip"
AUTO_CLEAN_TMP="true"`,
      codeSnippet: `// Local Filesystem Directory Structure
// C:/GitKura-Vault/
// ├── owner/
// │   └── repo-name/ (.git mirror with 100% commit history)
// └── .archives/
//     └── owner__repo-name.tar.gz (GZIP snapshot)`,
      steps: [
        'Select any local directory, encrypted external SSD, or network-attached storage (NAS) mount.',
        'GitKura creates structured owner/repo/ mirrors plus .archives/ snapshots.',
        'Zero packets leave your computer over WAN during execution.',
        'Inspect files directly with standard terminal commands without decompression.',
      ],
    },
  }

  const current = cloudConfigs[activeTab]

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-highlighter-yellow selection:text-ink-blue">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12 w-full">
        {/* Breadcrumb Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#64748b]">
            <Link href="/" className="hover:text-ink-blue underline">GitKura Home</Link>
            <span>/</span>
            <span className="text-ink-blue">Multi-Cloud Replication Hub</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border-2 border-pencil-black shadow-scribely-sm rounded-full -rotate-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#15803d]" />
            <span className="text-xs font-mono font-black uppercase tracking-wider text-ink-blue">
              Chapter 03 &bull; 6-Engine Storage Matrix
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-display text-ink-blue tracking-tight">
            Multi-Cloud &amp; Channel Replication Engine
          </h1>
          <p className="font-hand text-2xl text-[#475569] max-w-3xl font-medium">
            Broadcast encrypted Git repository snapshots across Telegram, Google Drive, AWS S3, Cloudflare R2, MinIO, and local disks.
          </p>
        </div>

        {/* 6 Engine Switcher Pills */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {(
            [
              { id: 'telegram', label: 'Telegram Bot', icon: Send },
              { id: 'gdrive', label: 'Google Drive', icon: Cloud },
              { id: 's3', label: 'AWS S3', icon: Database },
              { id: 'r2', label: 'Cloudflare R2', icon: Shield },
              { id: 'minio', label: 'MinIO / Wasabi', icon: Server },
              { id: 'local', label: 'Local Vault', icon: HardDrive },
            ] as const
          ).map((item) => {
            const isSelected = activeTab === item.id
            const Icon = item.icon
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`p-4 rounded-2xl border-2 transition-all text-left flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-highlighter-yellow border-pencil-black shadow-scribely -rotate-1'
                    : 'bg-white border-pencil-black/25 hover:border-pencil-black hover:bg-[#fdfbf7]'
                }`}
              >
                <Icon className="w-5 h-5 text-ink-blue mb-2" />
                <span className="text-xs font-black font-display text-ink-blue">{item.label}</span>
              </button>
            )
          })}
        </div>

        {/* Main Engine Detailed Spec Card */}
        <div className="scribely-card p-6 sm:p-10 bg-white shadow-scribely-xl space-y-8 relative">
          <div className="washi-tape-green -top-3 right-10 rotate-1" />

          {/* Engine Header Info */}
          <div className="space-y-3 border-b-2 border-dashed border-pencil-black/20 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold bg-[#dbeafe] text-ink-blue px-2.5 py-1 rounded-lg border border-pencil-black">
                  {current.badge}
                </span>
                <h2 className="text-3xl font-black font-display text-ink-blue mt-2">
                  {current.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => copyCode(current.codeSnippet)}
                className="px-4 py-2 bg-[#fdfbf7] hover:bg-white text-ink-blue scribely-btn rounded-xl text-xs font-mono font-bold flex items-center gap-2 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-[#15803d]" /> : <Copy className="w-4 h-4 text-ink-blue" />}
                <span>{copied ? 'Copied Snippet!' : 'Copy Implementation Code'}</span>
              </button>
            </div>

            <p className="font-kalam text-lg sm:text-xl text-[#475569] font-bold leading-relaxed">
              {current.tagline}
            </p>
          </div>

          {/* Step-by-Step Setup Guide */}
          <div className="space-y-4">
            <h3 className="text-lg font-black font-display text-ink-blue flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#15803d]" />
              <span>Step-by-Step Setup Guide</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {current.steps.map((step, idx) => (
                <div key={idx} className="p-4 bg-[#fdfbf7] rounded-xl border-2 border-pencil-black text-xs font-mono space-y-1">
                  <span className="text-ink-blue font-black block">Step 0{idx + 1}:</span>
                  <p className="text-[#475569] font-sans font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Environment Config & Source Code */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-2">
              <span className="text-xs font-mono font-black uppercase text-ink-blue block">Configuration Parameters</span>
              <div className="bg-[#1e293b] rounded-2xl p-4 border-2 border-pencil-black font-mono text-xs text-slate-200 shadow-inner overflow-x-auto">
                <pre className="text-highlighter-yellow whitespace-pre leading-relaxed">{current.envConfig}</pre>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-2">
              <span className="text-xs font-mono font-black uppercase text-ink-blue block">Implementation Logic (electron/services/cloud.service.ts)</span>
              <div className="bg-[#1e293b] rounded-2xl p-4 border-2 border-pencil-black font-mono text-xs text-slate-200 shadow-inner overflow-x-auto">
                <pre className="text-slate-300 whitespace-pre leading-relaxed">{current.codeSnippet}</pre>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
