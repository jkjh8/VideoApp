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
      // upv({ status: 'play' })
      upt(args)
      break
    case 'durationchange':
      upt(args)
      upv(args)
      break
    case 'playing':
    case 'play':
    case 'paused':
      upv(args)
      logger.info(`${args.type} file: ${pState.file.name}`)
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
      bw.fromId(1).webContents.send('command', {
        command: 'ended',
        mode: pState.status.status
      })
      break
    case 'devices':
      pState.device.list = args.devices
      io.emit('devices', args.devices)
      break
    case 'device':
      pState.device.current = args.device
      io.emit('device', { device: args.device })
      break
    default:
      // upv(args)
      // logger.info(args.type)
      break
  }
})

const upv = (args) => {
  for (const key in args) {
    if (key != 'type') {
      pState.status[key] = args[key]
    }
  }
  io.emit('status', pState)
  bw.fromId(1).webContents.send('rtpState', pState)
}

const upt = (args) => {
  for (const key in args) {
    if (key != 'type') {
      pTimes[key] = args[key]
    }
  }
  if (pTimes.currentTime) {
    pState.status.status = 'play'
  }
  io.emit('times', pTimes)
}
