import { BrowserWindow as bw, ipcMain, dialog } from 'electron'
import logger from '/src-electron/logger'

ipcMain.on('updateState', (e, args) => {
  switch (args.type) {
    case 'loadeddata':
    case 'loadedmetadata':
      upv(args)
      logger.info(`${args.type}: ${args.src}`)
      break
    case 'ratechange':
      upv(args)
      logger.info(`${args.type}: ${args.rate}`)
      break
    case 'volumechanged':
      upv(args)
      logger.info(`${args.type}: ${args.volume}`)
      break
    case 'timeupdate':
      upv({ status: 'play' })
      upt(args)
      break
    case 'durationchange':
      upt(args)
      upv(args)
      break
    case 'playing':
    case 'play':
      upv(args)
      logger.info(`${args.type} file: ${pv.name}`)
      break
    case 'error':
      logger.error(`player error: ${args.value}`)
      break
    case 'waiting':
      upv(args)
      logger.warn(args.type)
      break
    case 'ended':
      upv({ ...args, playbtn: false, status: 'ended' })
      logger.info(args.type)
      bw.fromId(1).webContents.send('command', {
        command: 'ended',
        mode: pv.mode
      })
      break
    case 'devices':
      io.emit('devices', args.devices)
      break
    case 'device':
      io.emit('device', { device: args.device })
      break
    default:
      upv(args)
      // logger.info(args.type)
      break
  }
  bw.fromId(1).webContents.send('rtpv', pv)
})

const upv = (args) => {
  for (const key in args) {
    if (key != 'type') {
      pv[key] = args[key]
    }
  }
  io.emit('playerstate', pv)
}

const upt = (args) => {
  for (const key in args) {
    if (key != 'type') {
      pt[key] = args[key]
    }
  }
  io.emit('times', pt)
}
