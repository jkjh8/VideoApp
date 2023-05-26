import path from 'node:path'
import fs from 'node:fs'
import { BrowserWindow as bw, ipcMain, dialog } from 'electron'
import logger from '../logger'
import { duration, times } from '../playerValues'

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
  duration = time
  logger.info('update duration', duration)
})

ipcMain.on('updateTimes', (e, cur, remain) => {
  times.cur = cur
  times.remain = remain
  console.log('times', times)
})

ipcMain.on('updateState', (e, args) => {
  switch (args.event) {
    case 'loadeddata':
    case 'loadedmetadata':
    case 'ratechange':
    case 'volumechanged':
      logger.info(`${args.event}: ${args.value}`)
      break
    default:
      logger.info(args.event)
      break
  }
})
