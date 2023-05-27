import path from 'node:path'
import fs from 'node:fs'
import { BrowserWindow as bw, ipcMain, dialog } from 'electron'
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

ipcMain.on('updateDuration', (e, time) => {
  playerValues.duration = time
  logger.info('update duration', playerValues)
})

ipcMain.on('updateTimes', (e, cur, remain) => {
  playerValues.currentTime = cur
  playerValues.remaining = remain
  console.log('times', playerValues)
})

ipcMain.on('updateState', (e, args) => {
  switch (args.event) {
    case 'loadeddata':
    case 'loadedmetadata':
      playerValues.src = args.value
      break
    case 'ratechange':
      playerValues.rate = args.value
      break
    case 'volumechanged':
      playerValues.volume = args.value
      break
  }
  logger.info(`${args.event}: ${args.value}`)
})
