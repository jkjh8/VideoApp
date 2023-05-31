import { BrowserWindow as bw, ipcMain, dialog } from 'electron'
import logger from '/src-electron/logger'

ipcMain.on('updateState', (e, args) => {
  switch (args.type) {
    case 'loadeddata':
    case 'loadedmetadata':
      updateValues(args)
      logger.info(`${args.type}: ${args.src}`)
      break
    case 'ratechange':
      updateValues(args)
      logger.info(`${args.type}: ${args.rate}`)
      break
    case 'volumechanged':
      updateValues(args)
      logger.info(`${args.type}: ${args.volume}`)
      break
    case 'timeupdate':
      updateValues({ play: 1 })
      updateTimes(args)
      break
    case 'durationchange':
      updateTimes(args)
      updateValues(args)
      break
    case 'playing':
    case 'play':
      updateValues(args)
      logger.info(`${args.type} file: ${playerValues.name}`)
      break
    case 'error':
      logger.error(`player error: ${args.value}`)
      break
    case 'waiting':
      updateValues(args)
      logger.warn(args.type)
      break
    case 'ended':
      updateValues(args)
      logger.info(args.type)
      bw.fromId(1).webContents.send('command', {
        command: 'ended',
        mode: playerValues.mode
      })
      break
    default:
      updateValues(args)
      logger.info(args.type)
      break
  }
  bw.fromId(1).webContents.send('rtPlayerValues', playerValues)
})

const updateValues = (args) => {
  for (const key in args) {
    if (key != 'type') {
      playerValues[key] = args[key]
    }
  }
  io.emit('playerstate', playerValues)
}

const updateTimes = (args) => {
  for (const key in args) {
    if (key != 'type') {
      playerTimes[key] = args[key]
    }
  }
  io.emit('times', playerTimes)
}
