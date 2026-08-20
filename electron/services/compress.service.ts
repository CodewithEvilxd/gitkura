import * as tar from 'tar'
import fs from 'fs'
import path from 'path'
import type { ArchiveInfo } from '../../src/types'

export class CompressService {
  async compressRepo(repoPath: string, outputDir: string): Promise<string> {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    const repoName = path.basename(repoPath)
    const parentName = path.basename(path.dirname(repoPath))
    const archiveName = `${parentName}__${repoName}.tar.gz`
    const tempPath = path.join(outputDir, `${archiveName}.tmp`)
    const finalPath = path.join(outputDir, archiveName)

    await tar.create(
      {
        gzip: true,
        file: tempPath,
        cwd: path.dirname(repoPath),
      },
      [repoName],
    )

    // Atomic rename
    fs.renameSync(tempPath, finalPath)
    return finalPath
  }

  getArchivePath(outputDir: string, owner: string, repoName: string): string {
    return path.join(outputDir, `${owner}__${repoName}.tar.gz`)
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
        if (file.endsWith('.tar.gz') && !file.endsWith('.tmp')) {
          const filePath = path.join(outputDir, file)
          const stats = fs.statSync(filePath)
          const nameWithoutExt = file.replace(/\.tar\.gz$/, '')
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
