import { ipcMain, shell } from 'electron'
import path from 'path'
import { IPC } from '../utils/constants'
import { CompressService } from '../services/compress.service'
import store from '../store/store'

const compressService = new CompressService()

export function registerArchivesHandlers() {
  ipcMain.handle(IPC.ARCHIVES_LIST, async () => {
    const backupPath = store.get('backupPath')
    if (!backupPath) return []
    const archivesDir = path.join(backupPath, '.archives')
    return compressService.listArchives(archivesDir)
  })

  ipcMain.handle(IPC.ARCHIVES_OPEN_FOLDER, async (_event, filePath?: string) => {
    const backupPath = store.get('backupPath')
    if (!backupPath) return false
    const target = filePath || path.join(backupPath, '.archives')
    shell.showItemInFolder(target)
    return true
  })
}
