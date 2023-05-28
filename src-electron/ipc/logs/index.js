import { ipcMain } from 'electron'
import logger from '/src-electron/logger'

ipcMain.on('log', (e, args) => {
  switch (args.level) {
    case 'error':
      logger.error(args.msg)
      break
    case 'warn':
      logger.warn(args.msg)
      break
    default:
      logger.info(args.msg)
      break
  }
})
