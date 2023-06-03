import logger from '/src-electron/logger'
import { BrowserWindow as bw } from 'electron'

const ioCommands = (args) => {
  try {
    switch (args.command) {
      case 'seek':
        bw.fromId(1).webContents.send('pc', {
          command: 'seek',
          seekTime: args.seekTime
        })
        break
      case 'pan':
        bw.fromId(1).webContents.send('pc', {
          command: 'pan',
          value: args.value
        })
        break
    }
  } catch (err) {
    logger.error('io', err)
  }
}

export { ioCommands }
