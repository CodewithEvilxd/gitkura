import * as tar from 'tar'
import { ZipArchive } from 'archiver'
import fs from 'fs'
import path from 'path'
import type { ArchiveInfo, ArchiveFormat } from '../../src/types'

export class CompressService {
  async compressRepo(
    repoPath: string,
    outputDir: string,
    format: ArchiveFormat = 'tar.gz',
  ): Promise<string> {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    const repoName = path.basename(repoPath)
    const parentName = path.basename(path.dirname(repoPath))
    const ext = format === 'zip' ? 'zip' : 'tar.gz'
    const archiveName = `${parentName}__${repoName}.${ext}`
    const tempPath = path.join(outputDir, `${archiveName}.tmp`)
    const finalPath = path.join(outputDir, archiveName)

    if (format === 'zip') {
      await this.createZip(repoPath, repoName, tempPath)
    } else {
      await tar.create(
        {
          gzip: true,
          file: tempPath,
          cwd: path.dirname(repoPath),
        },
        [repoName],
      )
    }

    // Atomic rename
    fs.renameSync(tempPath, finalPath)
    return finalPath
  }

  private createZip(repoPath: string, repoName: string, destPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const output = fs.createWriteStream(destPath)
      const archive = new ZipArchive({
        zlib: { level: 9 },
      })

      output.on('close', () => resolve())
      output.on('error', (err: unknown) => reject(err))
      archive.on('error', (err: unknown) => reject(err))

      archive.pipe(output)
      archive.directory(repoPath, repoName)
      archive.finalize()
    })
  }

  getArchivePath(outputDir: string, owner: string, repoName: string, format: ArchiveFormat = 'tar.gz'): string {
    const ext = format === 'zip' ? 'zip' : 'tar.gz'
    return path.join(outputDir, `${owner}__${repoName}.${ext}`)
  }

  archiveExists(archivePath: string): boolean {
    return fs.existsSync(archivePath)
  }

  listArchives(outputDir: string): ArchiveInfo[] {
    if (!fs.existsSync(outputDir)) {
      return []
    }

    try {
      const files = fs.readdirSync(outputDir)
      const archives: ArchiveInfo[] = []

      for (const file of files) {
        if (file.endsWith('.tmp')) continue

        const isTarGz = file.endsWith('.tar.gz')
        const isZip = file.endsWith('.zip')

        if (isTarGz || isZip) {
          const filePath = path.join(outputDir, file)
          const stats = fs.statSync(filePath)
          const nameWithoutExt = isTarGz ? file.replace(/\.tar\.gz$/, '') : file.replace(/\.zip$/, '')
          const parts = nameWithoutExt.split('__')
          const owner = parts[0] || 'unknown'
          const repoName = parts.slice(1).join('__') || file

          archives.push({
            filename: file,
            filePath,
            sizeBytes: stats.size,
            createdAt: stats.mtime.toISOString(),
            owner,
            repoName,
          })
        }
      }

      return archives.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } catch {
      return []
    }
  }
}
