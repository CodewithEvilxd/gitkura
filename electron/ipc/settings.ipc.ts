import { ipcMain, dialog } from 'electron'
import { IPC } from '../utils/constants'
import store from '../store/store'

export function registerSettingsHandlers() {
  ipcMain.handle(IPC.SETTINGS_GET, () => {
    return {
      githubToken: store.get('githubToken'),
      backupPath: store.get('backupPath'),
      cloudProvider: store.get('cloudProvider'),
      cloudConfig: store.get('cloudConfig'),
      repoFilters: store.get('repoFilters'),
      selectedRepoIds: store.get('selectedRepoIds'),
      schedule: store.get('schedule'),
      concurrencyLimit: store.get('concurrencyLimit'),
      archiveFormat: store.get('archiveFormat') || 'tar.gz',
    }
  })

  ipcMain.handle(IPC.SETTINGS_SET, (_event, settings: Record<string, unknown>) => {
    for (const [key, value] of Object.entries(settings)) {
      store.set(key, value)
    }
    return true
  })

  ipcMain.handle(IPC.DIALOG_SELECT_FOLDER, async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory', 'createDirectory'],
      title: 'Select Backup Folder',
    })
    if (result.canceled || result.filePaths.length === 0) {
      return null
    }
    return result.filePaths[0]
  })

  ipcMain.handle(IPC.SETTINGS_GET_CACHE_STATS, async () => {
    try {
      const session = require('electron').session.defaultSession
      let httpCacheBytes = 0
      if (session && typeof session.getCacheSize === 'function') {
        httpCacheBytes = await session.getCacheSize()
      }
      const cachedRepos = (store.get('cachedRepos') as any[]) || []
      const repoJsonBytes = Buffer.byteLength(JSON.stringify(cachedRepos), 'utf8')
      const totalBytes = httpCacheBytes + repoJsonBytes

      const formatSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
      }

      return {
        httpCacheBytes,
        repoCacheCount: cachedRepos.length,
        totalBytes,
        formattedSize: formatSize(totalBytes),
      }
    } catch {
      return {
        httpCacheBytes: 0,
        repoCacheCount: 0,
        totalBytes: 0,
        formattedSize: '0 B',
      }
    }
  })

  ipcMain.handle(IPC.SETTINGS_CLEAR_CACHE, async () => {
    try {
      const session = require('electron').session.defaultSession
      if (session && typeof session.clearCache === 'function') {
        await session.clearCache()
      }
      store.delete('cachedRepos' as any)
      return { success: true, message: 'Cache and temporary data cleared successfully' }
    } catch (err: any) {
      return { success: false, message: err.message || 'Failed to clear cache' }
    }
  })
}
