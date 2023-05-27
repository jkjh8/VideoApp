import path from 'node:path'
import fs from 'node:fs'
import { BrowserWindow as bw, ipcMain, dialog } from 'electron'
import { getMetaData } from '../functions/ffmpeg'
import logger from '../logger'

ipcMain.on('log', (e, args) => {
  switch (args.level) {
    case 'warn':
      logger.warn(args.msg)
      break
    case 'error':
      logger.error(args.msg)
      break
    default:
      logger.info(args.msg)
  }
})

ipcMain.on('updateState', (e, args) => {
  switch (args.type) {
    case 'loadeddata':
    case 'loadedmetadata':
      playerValues.src = args.value
      logger.info(`${args.type}: ${args.value}`)
      break
    case 'ratechange':
      playerValues.rate = args.value
      logger.info(`${args.type}: ${args.value}`)
      break
    case 'volumechanged':
      playerValues.volume = args.value
      logger.info(`${args.type}: ${args.value}`)
      break
    case 'timeupdate':
      playerValues.currentTime = args.cur
      playerValues.remaining = args.remain
      break
    case 'durationchange':
      playerValues.duration = args.value
      break
    case 'playing':
    case 'play':
      playerValues.play = true
      logger.info(`${args.type} file: ${playerValues.file_name}`)
      break
    case 'pause':
    case 'abrot':
    case 'canplay':
    case 'canplaythrough':
    case 'emptied':
    case 'ended':
    case 'suspend':
      playerValues.play = false
      logger.info(args.type)
      break
    case 'error':
      logger.error(`player error: ${args.value}`)
      break
    case 'waiting':
      logger.warn(args.type)
      if (!playerValues.file_name) {
        playerValues.play = false
      }
      break
    default:
      logger.info(args.type)
      break
  }
  bw.fromId(1).webContents.send('rtPlayerValues', playerValues)
})
