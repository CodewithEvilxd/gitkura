import { S3Client, HeadBucketCommand } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import fs from 'fs'
import crypto from 'crypto'
import type { CloudConfig } from '../../src/types'

export class CloudService {
  private provider: 's3' | 'r2' | 'gdrive' | 'telegram' | 'custom'
  private s3Client?: S3Client
  private bucket?: string
  private pathPrefix: string
  private config: CloudConfig

  constructor(provider: 's3' | 'r2' | 'gdrive' | 'telegram' | 'custom', config: CloudConfig) {
    this.provider = provider
    this.config = config
    this.pathPrefix = config.pathPrefix || ''

    if (provider !== 'gdrive' && provider !== 'telegram') {
      const clientConfig: any = {
        credentials: {
          accessKeyId: config.accessKeyId,
          secretAccessKey: config.secretAccessKey,
        },
        region: config.region || 'auto',
      }

      if ((provider === 'r2' || provider === 'custom') && config.endpoint) {
        clientConfig.endpoint = config.endpoint
        clientConfig.forcePathStyle = true
      }

      this.s3Client = new S3Client(clientConfig)
      this.bucket = config.bucket
    }
  }

  private async getGoogleDriveToken(): Promise<string> {
    if (this.config.gdriveAccessToken?.trim()) {
      return this.config.gdriveAccessToken.trim()
    }

    if (this.config.gdriveServiceAccountJson?.trim()) {
      const saRaw = this.config.gdriveServiceAccountJson.trim()
      let sa: any
      try {
        sa = JSON.parse(saRaw)
      } catch {
        throw new Error('Invalid Google Service Account JSON format')
      }

      if (!sa.client_email || !sa.private_key) {
        throw new Error('Service Account JSON missing client_email or private_key')
      }

      const now = Math.floor(Date.now() / 1000)
      const header = { alg: 'RS256', typ: 'JWT' }
      const claim = {
        iss: sa.client_email,
        scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive',
        aud: 'https://oauth2.googleapis.com/token',
        exp: now + 3600,
        iat: now,
      }

      const base64url = (input: string | Buffer) => Buffer.from(input).toString('base64url')
      const unsignedToken = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claim))}`
      
      const signer = crypto.createSign('RSA-SHA256')
      signer.update(unsignedToken)
      const signature = signer.sign(sa.private_key, 'base64url')
      const jwt = `${unsignedToken}.${signature}`

      const res = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
          assertion: jwt,
        }),
      })

      const data: any = await res.json()
      if (!res.ok) {
        throw new Error(data.error_description || data.error || 'Google OAuth token request failed')
      }
      return data.access_token
    }

    throw new Error('Google Drive requires an OAuth Access Token or Service Account Key JSON')
  }

  private async resolveTelegramChatId(botToken: string, rawChatId: string): Promise<{ chatId: string; chatTitle: string; chatType: string }> {
    const cleanId = rawChatId.trim()
    const candidates = [cleanId]

    // If positive number or doesn't start with '-', also candidate with -100 (channel prefix) and - (group prefix)
    if (!cleanId.startsWith('-') && !cleanId.startsWith('@')) {
      candidates.push(`-100${cleanId}`)
      candidates.push(`-${cleanId}`)
    }

    let lastError = ''
    for (const candidate of candidates) {
      try {
        const res = await fetch(`https://api.telegram.org/bot${botToken}/getChat?chat_id=${encodeURIComponent(candidate)}`)
        const data: any = await res.json()
        if (data.ok && data.result) {
          const chat = data.result
          const chatTitle = chat.title || chat.username || chat.first_name || candidate
          return {
            chatId: String(chat.id),
            chatTitle,
            chatType: chat.type || 'channel',
          }
        } else {
          lastError = data.description || 'Chat not found'
        }
      } catch (err: any) {
        lastError = err.message
      }
    }

    throw new Error(`Target Chat ID "${rawChatId}" could not be accessed (${lastError}). Make sure the bot is added as an Administrator in your channel.`)
  }

  async testConnection(): Promise<{ success: boolean; message: string }> {
    // 1. Telegram Bot & Channel Vault
    if (this.provider === 'telegram') {
      const botToken = this.config.telegramBotToken?.trim()
      if (!botToken) {
        return { success: false, message: 'Telegram Bot Token is required' }
      }

      try {
        const getMeRes = await fetch(`https://api.telegram.org/bot${botToken}/getMe`)
        const getMeData: any = await getMeRes.json()

        if (!getMeRes.ok || !getMeData.ok) {
          return {
            success: false,
            message: getMeData.description || 'Invalid Telegram Bot Token',
          }
        }

        const botUser = getMeData.result
        const botName = `@${botUser.username || botUser.first_name}`

        // If Chat ID is provided, verify and resolve chat access
        const rawChatId = this.config.telegramChatId?.trim()
        if (rawChatId) {
          const { chatId, chatTitle, chatType } = await this.resolveTelegramChatId(botToken, rawChatId)
          return {
            success: true,
            message: `Connected as ${botName} • Target: "${chatTitle}" (${chatType}: ${chatId})`,
          }
        }

        return {
          success: true,
          message: `Connected as ${botName}. (Please set Channel Chat ID to enable replication)`,
        }
      } catch (err: any) {
        return { success: false, message: err.message || 'Failed to connect to Telegram Bot API' }
      }
    }

    // 2. Google Drive
    if (this.provider === 'gdrive') {
      try {
        const token = await this.getGoogleDriveToken()
        
        // If folder specified, verify folder exists
        const folderId = this.config.gdriveFolderId?.trim()
        if (folderId) {
          const res = await fetch(`https://www.googleapis.com/drive/v3/files/${folderId}?fields=id,name,mimeType`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          if (!res.ok) {
            const data: any = await res.json().catch(() => ({}))
            return {
              success: false,
              message: `Folder not found or unauthorized (${data.error?.message || res.statusText})`,
            }
          }
          const folderData: any = await res.json()
          return {
            success: true,
            message: `Connected to Google Drive folder: "${folderData.name || folderId}"`,
          }
        }

        // Test root access
        const res = await fetch('https://www.googleapis.com/drive/v3/about?fields=user,storageQuota', {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) {
          const data: any = await res.json().catch(() => ({}))
          return {
            success: false,
            message: data.error?.message || 'Failed to authenticate with Google Drive API',
          }
        }
        const aboutData: any = await res.json()
        const user = aboutData.user?.displayName || aboutData.user?.emailAddress || 'Authenticated Account'
        return { success: true, message: `Connected to Google Drive (${user})` }
      } catch (err: any) {
        return { success: false, message: err.message || 'Google Drive connection failed' }
      }
    }

    // 3. Standard S3 / R2 / Custom S3
    if (!this.s3Client || !this.bucket) {
      return { success: false, message: 'Bucket or S3 client not configured' }
    }

    try {
      await this.s3Client.send(new HeadBucketCommand({ Bucket: this.bucket }))
      return { success: true, message: `Connected to bucket "${this.bucket}"` }
    } catch (err: any) {
      if (err.name === 'NotFound' || err.$metadata?.httpStatusCode === 404) {
        return { success: false, message: `Bucket "${this.bucket}" not found` }
      }
      if (err.$metadata?.httpStatusCode === 403) {
        return { success: false, message: 'Access denied. Check your credentials.' }
      }
      return { success: false, message: err.message || 'Connection failed' }
    }
  }

  async upload(
    filePath: string,
    key: string,
    onProgress?: (percent: number) => void,
  ): Promise<void> {
    const fileSize = fs.statSync(filePath).size

    // 1. Telegram Channel Vault Upload
    if (this.provider === 'telegram') {
      const botToken = this.config.telegramBotToken?.trim()
      const rawChatId = this.config.telegramChatId?.trim()

      if (!botToken || !rawChatId) {
        throw new Error('Telegram replication requires both Bot Token and Channel Chat ID')
      }

      // Check standard Telegram Bot API 50MB file size limit
      const maxSizeBytes = 50 * 1024 * 1024
      if (fileSize > maxSizeBytes) {
        throw new Error(
          `Archive size (${(fileSize / (1024 * 1024)).toFixed(1)} MB) exceeds Telegram standard Bot API limit of 50 MB`,
        )
      }

      onProgress?.(15)
      // Resolve exact target Chat ID (handles auto -100 prefix for channels if user entered plain numbers)
      const { chatId } = await this.resolveTelegramChatId(botToken, rawChatId)

      onProgress?.(30)
      const filename = key.split('/').pop() || 'backup.tar.gz'
      const repoClean = key.replace(/\.tar\.gz$/, '')
      const fileBuffer = fs.readFileSync(filePath)
      const sizeMB = (fileSize / (1024 * 1024)).toFixed(2)
      const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19)

      const caption = [
        `📦 *GitKura Vault Snapshot*`,
        `📁 *Repository:* \`${repoClean}\``,
        `📊 *Size:* ${sizeMB} MB`,
        `🕒 *Timestamp:* ${timestamp} UTC`,
        `🔐 _Disaster-proof local mirror & compressed snapshot_`,
      ].join('\n')

      const formData = new FormData()
      formData.append('chat_id', chatId)
      formData.append('caption', caption)
      formData.append('parse_mode', 'Markdown')
      
      const fileBlob = new Blob([fileBuffer], { type: 'application/gzip' })
      formData.append('document', fileBlob, filename)

      onProgress?.(60)

      const res = await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
        method: 'POST',
        body: formData,
      })

      const data: any = await res.json()
      if (!res.ok || !data.ok) {
        throw new Error(data.description || `Telegram upload failed with HTTP ${res.status}`)
      }

      onProgress?.(100)
      return
    }

    // 2. Google Drive Upload
    if (this.provider === 'gdrive') {
      const token = await this.getGoogleDriveToken()
      const filename = key.split('/').pop() || 'backup.tar.gz'
      const folderId = this.config.gdriveFolderId?.trim()

      const metadata: any = {
        name: filename,
        description: `GitKura Vault point-in-time snapshot for ${key}`,
      }
      if (folderId) {
        metadata.parents = [folderId]
      }

      // Initiate Resumable Upload
      const initRes = await fetch(
        'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json; charset=UTF-8',
            'X-Upload-Content-Type': 'application/gzip',
            'X-Upload-Content-Length': String(fileSize),
          },
          body: JSON.stringify(metadata),
        },
      )

      if (!initRes.ok) {
        const errText = await initRes.text()
        throw new Error(`Google Drive upload init failed: ${errText}`)
      }

      const uploadUrl = initRes.headers.get('location')
      if (!uploadUrl) {
        throw new Error('Google Drive API did not return resumable upload URL')
      }

      onProgress?.(30)
      const fileBuffer = fs.readFileSync(filePath)

      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/gzip',
          'Content-Length': String(fileSize),
        },
        body: fileBuffer,
      })

      if (!uploadRes.ok) {
        const errText = await uploadRes.text()
        throw new Error(`Google Drive snapshot upload failed: ${errText}`)
      }

      onProgress?.(100)
      return
    }

    // 3. S3 / R2 / Custom S3 upload
    const fullKey = this.pathPrefix
      ? `${this.pathPrefix.replace(/\/$/, '')}/${key}`
      : key

    const upload = new Upload({
      client: this.s3Client!,
      params: {
        Bucket: this.bucket!,
        Key: fullKey,
        Body: fs.createReadStream(filePath),
        ContentType: 'application/gzip',
      },
      partSize: 50 * 1024 * 1024,
      leavePartsOnError: false,
    })

    upload.on('httpUploadProgress', (progress) => {
      if (progress.loaded && fileSize > 0) {
        onProgress?.(Math.round((progress.loaded / fileSize) * 100))
      }
    })

    await upload.done()
  }

  getKey(owner: string, repoName: string): string {
    return `${owner}/${repoName}.tar.gz`
  }
}
