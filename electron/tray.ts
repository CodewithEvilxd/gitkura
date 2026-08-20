import { Tray, Menu, app, BrowserWindow, nativeImage } from 'electron'
import path from 'path'
import fs from 'fs'

let tray: Tray | null = null

export function createTray(mainWindow: BrowserWindow) {
  const iconPath = path.join(process.env.VITE_PUBLIC || path.join(__dirname, '../public'), 'tray-icon.png')
  let icon: Electron.NativeImage

  if (fs.existsSync(iconPath)) {
    icon = nativeImage.createFromPath(iconPath)
  } else {
    icon = nativeImage.createEmpty()
  }

  tray = new Tray(icon)
  tray.setToolTip('GitKura 蔵 - Active Vault Guard')

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open GitKura (蔵)',
      click: () => mainWindow.show(),
    },
    { type: 'separator' },
    {
      label: 'Quit GitKura',
      click: () => {
        ;(app as any).isQuitting = true
        app.quit()
      },
    },
  ])

  tray.setContextMenu(contextMenu)

  tray.on('click', () => {
    mainWindow.show()
  })
}

export function updateTrayMenu(mainWindow: BrowserWindow, nextRun?: string) {
  if (!tray) return

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open GitKura (蔵)',
      click: () => mainWindow.show(),
    },
    ...(nextRun
      ? [{ label: `Next sync: ${nextRun}`, enabled: false } as Electron.MenuItemConstructorOptions]
      : []),
    { type: 'separator' as const },
    {
      label: 'Quit GitKura',
      click: () => {
        ;(app as any).isQuitting = true
        app.quit()
      },
    },
  ])

  tray.setContextMenu(contextMenu)
}
