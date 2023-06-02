import express from 'express'
import { BrowserWindow as bs } from 'electron'
import logger from '/src-electron/logger'

const router = express.Router()

router.get('/play', (req, res) => {
  try {
    let rt
    switch (pv.mode) {
      case 'video':
      case 'audio':
        if (pv.status === 'ready' || pv.status === 'paused') {
          bs.fromId(1).webContents.send('pc', { command: 'play' })
          rt = { command: 'play', mode: pv.mode, result: 'playing' }
        } else {
          rt = { command: 'play', mode: pv.mode, result: 'player not ready' }
        }
        break
    }
    logger.info(rt)
    res.status(200).json(rt)
  } catch (error) {
    logger.error(error)
    return res.status(500).json(error)
  }
})

router.get('/pause', (req, res) => {
  try {
    let rt
    switch (pv.mode) {
      case 'video':
      case 'audio':
        if (pv.status === 'play') {
          bs.fromId(1).webContents.send('pc', { command: 'pause' })
          rt = { command: 'pause', mode: pv.mode, result: 'paused' }
        } else {
          rt = { command: 'pause', mode: pv.mode, result: 'not playing' }
        }
        break
    }
    logger.info(rt)
    return res.status(200).json(rt)
  } catch (error) {
    logger.error(error)
    return res.status(500).json(error)
  }
})

router.get('/stop', (req, res) => {
  try {
    let rt
    switch (pv.mode) {
      case 'video':
      case 'audio':
        bs.fromId(1).webContents.send('pc', { command: 'load' })
        rt = { command: 'stop', mode: pv.mode, result: 'load or stop' }
        break
    }
    logger.info(rt)
    return res.status(200).json(rt)
  } catch (error) {
    logger.error(error)
    return res.status(500).json(error)
  }
})

export default router
