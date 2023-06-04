import express from 'express'
import { BrowserWindow as bw } from 'electron'
import logger from '/src-electron/logger'
import { pCommand, mainCommand } from '/src-electron/functions/ipc'
import { openFile } from '/src-electron/functions/files'

const router = express.Router()

router.get('/play', (req, res) => {
  try {
    let rt
    console.log(pv)
    switch (pv.mode) {
      case 'video':
      case 'audio':
        switch (pv.status) {
          case 'ready':
          case 'paused':
          case 'ended':
          case 'stop':
            pCommand({ command: 'play' })
            rt = { command: 'play', mode: pv.mode, result: 'playing' }
            break
          default:
            rt = { command: 'play', mode: pv.mode, result: 'player not ready' }
            break
        }
        break
    }
    logger.info(JSON.stringify(rt))
    res.status(200).json(rt)
  } catch (error) {
    logger.error('web play', error)
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
          pCommand({ command: 'pause' })
          rt = { command: 'pause', mode: pv.mode, result: 'paused' }
        } else {
          rt = { command: 'pause', mode: pv.mode, result: 'not playing' }
        }
        break
    }
    logger.info(JSON.stringify(rt))
    return res.status(200).json(rt)
  } catch (error) {
    logger.error('web pause', error)
    return res.status(500).json(error)
  }
})

router.get('/stop', (req, res) => {
  try {
    let rt
    switch (pv.mode) {
      case 'video':
      case 'audio':
        // pCommand({ command: 'load' })
        pCommand({ command: 'pause' })
        pCommand({ command: 'seek', seekTime: 0 })
        rt = { command: 'stop', mode: pv.mode, result: 'load or stop' }
        break
    }
    logger.info(JSON.stringify(rt))

    // show logo
    mainCommand({ command: 'showLogo' })

    return res.status(200).json(rt)
  } catch (error) {
    logger.error('web stop', error)
    return res.status(500).json(error)
  }
})

router.get('/loadfile', (req, res) => {
  try {
    const file = decodeURI(req.query.file)
    if (pv.filePath === file) {
      pCommand({ command: 'load' })
    } else {
      openFile(file)
    }
    pv.status = 'ready'
    logger.info(`loaded file: ${file}`)
    res.status(200).json({ result: true })
  } catch (error) {
    logger.error(error)
    res.status(500).json({ error: error })
  }
})

router.get('/fastforward', (req, res) => {
  try {
    pCommand({ command: 'fastforward', value: req.query.time })
    res.status(200).json({ result: true })
  } catch (error) {
    logger.error(error)
    res.status(500).json({ error: error })
  }
})

router.get('/rewind', (req, res) => {
  try {
    pCommand({ command: 'rewind', value: req.query.time })
    res.status(200).json({ result: true })
  } catch (error) {
    logger.error(error)
    res.status(500).json({ error: error })
  }
})

export default router
