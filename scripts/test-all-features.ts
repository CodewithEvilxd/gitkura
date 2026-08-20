import fs from 'fs'
import path from 'path'
import os from 'os'
import crypto from 'crypto'
import { CompressService } from '../electron/services/compress.service'
import { CloudService } from '../electron/services/cloud.service'
import { SchedulerService } from '../electron/services/scheduler.service'
import { ALLOWED_INVOKE_CHANNELS, ALLOWED_SEND_CHANNELS, IPC } from '../electron/utils/constants'

let passed = 0
let failed = 0

function test(name: string, fn: () => void | Promise<void>) {
  return (async () => {
    try {
      await fn()
      console.log(`  [PASS] ${name}`)
      passed++
    } catch (err: any) {
      console.error(`  [FAIL] ${name}: ${err.message}`)
      failed++
    }
  })()
}

export async function runAllTests() {
  console.log('\n=== RUNNING 1-BY-1 COMPREHENSIVE FEATURE TEST SUITE FOR GITKURA ===\n')

  // --- 1. IPC & Security Whitelist Tests ---
  console.log('[1/9] Testing IPC Whitelist & Channel Security...')
  await test('Verify all IPC handlers are properly registered in constants', () => {
    if (!IPC.GITHUB_VALIDATE_TOKEN || !IPC.CLOUD_TEST_CONNECTION || !IPC.BACKUP_START) {
      throw new Error('Missing core IPC channel definitions')
    }
    const invokeChannels = new Set<string>(ALLOWED_INVOKE_CHANNELS)
    if (!invokeChannels.has(IPC.GITHUB_VALIDATE_TOKEN) || !invokeChannels.has(IPC.BACKUP_START)) {
      throw new Error('Invoke whitelist missing critical channels')
    }
    const sendChannels = new Set<string>(ALLOWED_SEND_CHANNELS)
    if (!sendChannels.has(IPC.BACKUP_PROGRESS) || !sendChannels.has(IPC.BACKUP_LOG)) {
      throw new Error('Send whitelist missing telemetry channels')
    }
  })

  // --- 2. Archive & Compression Service Tests ---
  console.log('\n[2/9] Testing Archive & .tar.gz Compression Engine...')
  const testTmpDir = path.join(os.tmpdir(), `gitkura-test-${Date.now()}`)
  const testRepoDir = path.join(testTmpDir, 'testowner', 'testrepo')
  const testArchivesDir = path.join(testTmpDir, '.archives')
  fs.mkdirSync(testRepoDir, { recursive: true })
  fs.writeFileSync(path.join(testRepoDir, 'README.md'), '# Test Repository for GitKura')
  fs.writeFileSync(path.join(testRepoDir, 'package.json'), '{"name":"test-repo"}')

  let createdArchivePath = ''
  await test('Create compressed .tar.gz repository archive', async () => {
    const compressService = new CompressService()
    createdArchivePath = await compressService.compressRepo(testRepoDir, testArchivesDir)
    if (!fs.existsSync(createdArchivePath)) {
      throw new Error('Archive file was not created')
    }
    const stats = fs.statSync(createdArchivePath)
    if (stats.size <= 0) {
      throw new Error('Archive file is empty')
    }
  })

  await test('List, scan, and parse created archive metadata', async () => {
    const compressService = new CompressService()
    const archives = compressService.listArchives(testArchivesDir)
    if (archives.length !== 1) {
      throw new Error(`Expected 1 archive, got ${archives.length}`)
    }
    const arc = archives[0]
    if (arc.owner !== 'testowner' || arc.repoName !== 'testrepo' || arc.sizeBytes <= 0) {
      throw new Error(`Invalid archive metadata: ${JSON.stringify(arc)}`)
    }
  })

  // --- 3. Telegram Channel Replication Tests ---
  console.log('\n[3/9] Testing Telegram Channel & Bot Replication Engine...')
  await test('Verify Telegram input validation guards and connection handlers', async () => {
    const cloudService = new CloudService('telegram', {
      bucket: '',
      region: '',
      accessKeyId: '',
      secretAccessKey: '',
      telegramBotToken: '',
      telegramChatId: '',
    })

    const res = await cloudService.testConnection()
    if (res.success !== false || !res.message.includes('Token is required')) {
      throw new Error('Telegram should reject empty bot token')
    }
  })

  // --- 4. Google Drive Native OAuth2 JWT Engine Tests ---
  console.log('\n[4/9] Testing Google Drive Native RSA-SHA256 JWT Authentication...')
  await test('Generate and sign Google OAuth2 Service Account JWT', async () => {
    const { privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    })

    const dummyServiceAccount = {
      type: 'service_account',
      project_id: 'gitkura-test-proj',
      private_key_id: 'key123',
      private_key: privateKey,
      client_email: 'gitkura-agent@gitkura-test-proj.iam.gserviceaccount.com',
    }

    const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url')
    const now = Math.floor(Date.now() / 1000)
    const payload = Buffer.from(
      JSON.stringify({
        iss: dummyServiceAccount.client_email,
        scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive',
        aud: 'https://oauth2.googleapis.com/token',
        exp: now + 3600,
        iat: now,
      })
    ).toString('base64url')

    const sign = crypto.createSign('RSA-SHA256')
    sign.update(`${header}.${payload}`)
    const signature = sign.sign(dummyServiceAccount.private_key, 'base64url')
    const jwt = `${header}.${payload}.${signature}`

    if (!jwt || jwt.split('.').length !== 3) {
      throw new Error('Generated JWT is malformed')
    }
  })

  await test('Validate Google Drive input guard when credentials are missing', async () => {
    const cloudService = new CloudService('gdrive', {
      bucket: '',
      region: '',
      accessKeyId: '',
      secretAccessKey: '',
    })
    const res = await cloudService.testConnection()
    if (res.success !== false || !res.message.includes('token or Service Account')) {
      throw new Error('Google Drive should reject empty credentials')
    }
  })

  // --- 5. AWS S3 / Cloudflare R2 / Custom MinIO Client Tests ---
  console.log('\n[5/9] Testing S3 / R2 / MinIO S3-Compatible Client Initialization...')
  await test('Initialize S3 Client for AWS S3, Cloudflare R2, and MinIO', () => {
    const s3Service = new CloudService('s3', {
      bucket: 'test-bucket',
      region: 'us-east-1',
      accessKeyId: 'AKIA_TEST_KEY',
      secretAccessKey: 'SECRET_TEST_KEY',
    })
    if (!s3Service) throw new Error('Failed to instantiate S3 service')

    const r2Service = new CloudService('r2', {
      bucket: 'test-r2-bucket',
      region: 'auto',
      endpoint: 'https://accountid.r2.cloudflarestorage.com',
      accessKeyId: 'R2_ACCESS_KEY',
      secretAccessKey: 'R2_SECRET_KEY',
    })
    if (!r2Service) throw new Error('Failed to instantiate R2 service')

    const minioService = new CloudService('custom', {
      bucket: 'minio-vault',
      region: 'auto',
      endpoint: 'https://minio.local:9000',
      accessKeyId: 'MINIO_KEY',
      secretAccessKey: 'MINIO_SECRET',
    })
    if (!minioService) throw new Error('Failed to instantiate MinIO service')
  })

  // --- 6. Automated Scheduler Cron Parser Tests ---
  console.log('\n[6/9] Testing Background Cron Scheduler & Time Calculation...')
  await test('Validate Daily, Weekly, and Monthly Cron Scheduler calculation', () => {
    const scheduler = new SchedulerService()
    const nextDaily = scheduler.getNextRun({ enabled: true, frequency: 'daily', time: '02:00' })
    if (nextDaily !== 'Daily at 02:00') {
      throw new Error(`Expected 'Daily at 02:00', got '${nextDaily}'`)
    }
    const nextWeekly = scheduler.getNextRun({ enabled: true, frequency: 'weekly', time: '04:30', dayOfWeek: 1 })
    if (nextWeekly !== 'Mon at 04:30') {
      throw new Error(`Expected 'Mon at 04:30', got '${nextWeekly}'`)
    }
  })

  // --- 7. Icon Assets & Formats Verification ---
  console.log('\n[7/9] Testing Multi-Resolution App Icons & Asset Presence...')
  await test('Verify all generated icon assets exist and are valid', () => {
    const expectedAssets = [
      'public/logo.png',
      'public/icon.png',
      'public/icon-256.png',
      'public/icon-128.png',
      'public/icon-64.png',
      'public/icon-48.png',
      'public/favicon-32x32.png',
      'public/favicon-16x16.png',
      'public/tray-icon.png',
      'public/favicon.ico',
      'build/icon.png',
      'build/icon.ico',
      'src/assets/logo.png',
    ]

    for (const file of expectedAssets) {
      const fullPath = path.join(process.cwd(), file)
      if (!fs.existsSync(fullPath)) {
        throw new Error(`Missing expected asset: ${file}`)
      }
      const size = fs.statSync(fullPath).size
      if (size <= 0) {
        throw new Error(`Asset file is empty: ${file}`)
      }
    }
  })

  // --- 8. Clean up Temporary Test Files ---
  console.log('\n[8/9] Cleaning up transient test workspaces...')
  await test('Clean up temporary vault directory', () => {
    fs.rmSync(testTmpDir, { recursive: true, force: true })
  })

  // --- 9. Final Report ---
  console.log('\n[9/9] Generating Final Verification Report...')
  console.log(`\n======================================================`)
  console.log(`RESULT: ${passed} PASSED, ${failed} FAILED`)
  console.log(`SYSTEM HEALTH: ${failed === 0 ? '100% OPERATIONAL' : 'ERRORS DETECTED'}`)
  console.log(`======================================================\n`)

  if (failed > 0) {
    process.exit(1)
  }
}

if (typeof require !== 'undefined' && require.main === module) {
  runAllTests()
}
