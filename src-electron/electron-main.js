import { app, BrowserWindow, nativeTheme, protocol } from 'electron'
import path from 'path'
import os from 'os'
import db from './db'
import logger from './logger'
import { updateSetupFromDb } from './functions/player'

global.pState = {
  mode: 'single',
  file: {},
  status: {},
  playlist: {},
  device: { current: 'default', list: [], width: 0, height: 0 },
  fullscreen: false,
  startfullscreen: false,
  showlogo: true
}
global.pTimes = {
  duration: 0,
  currentTime: 0,
  remaining: 0
}

// global.isFullscreen = false
import './ipc'
import './menu'
import './web'

// needed in case process is undefined under Linux
const platform = process.platform || os.platform()

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(
      path.join(app.getPath('userData'), 'DevTools Extensions')
    )
  }
} catch (_) {}

let mainWindow

async function createWindow() {
  // before create window options
  await updateSetupFromDb()
  logger.info(`window size: ${pState.device.width} x ${pState.device.height}`)

  // create a window
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    x: 100,
    y: 100,
    width: pState.device.width ? pState.device.width : 800,
    height: pState.device.height ? pState.device.height : 600,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      sandbox: false,
      // More info: https://v2.quasar.dev/quasar-cli-webpack/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
    }
  })

  mainWindow.loadURL(process.env.APP_URL)

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools()
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools()
    })
  }
  logger.info('APP Started')
  setLocalFileProtocol()

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // check option fullscreen start
  if (pState.startfullscreen) {
    pState.fullscreen = true
    logger.info('fullscreen start')
  }
}

app.on('ready', () => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

function setLocalFileProtocol() {
  logger.info('Local File Protocol Registerd')
  protocol.registerFileProtocol('local', (request, callback) => {
    const pathname = decodeURIComponent(request.url.replace('local://', ''))
    try {
      callback(pathname)
    } catch (error) {
      logger.error('file protocol faild' + error)
    }
  })
}
