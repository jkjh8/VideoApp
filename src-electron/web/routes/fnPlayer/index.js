import express from 'express'
import logger from '/src-electron/logger'
import { play, pause, stop } from '/src-electron/functions/player'

const router = express.Router()

router.get('/play', (req, res) => {
  try {
    let rt
    switch (playerValues.mode) {
      case 'video':
      case 'audio':
        rt = { command: 'play', mode: playerValues.mode, result: play() }
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
    switch (playerValues.mode) {
      case 'video':
      case 'audio':
        rt = { command: 'pause', mode: playerValues.mode, result: pause() }
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
    switch (playerValues.mode) {
      case 'video':
      case 'audio':
        rt = { command: 'stop', mode: playerValues.mode, result: stop() }
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
