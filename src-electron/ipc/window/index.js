import { ipcMain, BrowserWindow as bw } from 'electron'
import db from '/src-electron/db'
import logger from '/src-electron/logger'

ipcMain.on('updateWindowSize', async (e, args) => {
  try {
    const windowSize = bw.fromId(1).getSize()
    await db.update(
      { key: 'windowSize' },
      { $set: { height: windowSize[1], width: windowSize[0] } },
      { upsert: true }
    )
  } catch (error) {
    logger.error(`Window Resize ${error}`)
  }
})
