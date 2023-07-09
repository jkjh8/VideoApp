import express from 'express'
import { BrowserWindow as bw } from 'electron'
import db from '/src-electron/db'
import logger from '/src-electron/logger'
import { pCommand, mainCommand } from '/src-electron/functions/webToIPC'
import { setFullScreen } from '/src-electron/functions/player'
import { openFile } from '/src-electron/functions/files'

const router = express.Router()

router.get('/play', (req, res) => {
  try {
    let rt
    switch (pState.file.type) {
      case 'video':
      case 'audio':
      case 'image':
        switch (pState.status.status) {
          case 'ready':
          case 'paused':
          case 'ended':
          case 'stop':
            pCommand({ command: 'play' })
            // mainCommand({ command: 'play' })
            rt = { command: 'play', mode: pState.mode, result: 'playing' }
            break
          default:
            rt = {
              command: 'play',
              mode: pState.mode,
              result: 'player not ready'
            }
            break
        }
        break
    }
    logger.info('web player play', JSON.stringify(rt))
    res.status(200).json(rt)
  } catch (error) {
    logger.error('web player play error', error)
    return res.status(500).json(error)
  }
})

router.get('/pause', (req, res) => {
  try {
    let rt
    switch (pState.file.type) {
      case 'video':
      case 'audio':
        if (pState.status.status === 'play') {
          pCommand({ command: 'pause' })
          rt = { command: 'pause', mode: pState.mode, result: 'paused' }
        } else {
          rt = { command: 'pause', mode: pState.mode, result: 'not playing' }
        }
        break
    }
    logger.info('web player play', JSON.stringify(rt))
    return res.status(200).json(rt)
  } catch (error) {
    logger.error('web player pause error', error)
    return res.status(500).json(error)
  }
})

router.get('/stop', (req, res) => {
  try {
    let rt
    switch (pState.file.type) {
      case 'video':
      case 'audio':
        switch (pState.status.status) {
          case 'playing':
          case 'play':
            // pCommand({ command: 'load' })
            pCommand({ command: 'stop' })
            rt = { command: 'stop', mode: pState.mode, result: 'load or stop' }
            break
        }
    }
    logger.info('web player stop', JSON.stringify(rt))

    // show logo
    // mainCommand({ command: 'showLogo' })

    return res.status(200).json(rt)
  } catch (error) {
    logger.error('web player stop error', error)
    return res.status(500).json(error)
  }
})

router.get('/loadfile', (req, res) => {
  try {
    pCommand({ command: 'pause' })
    mainCommand({ command: 'showLogo' })
    const file = decodeURI(req.query.file)
    if (pState.file.filePath === file) {
      pCommand({ command: 'load' })
    } else {
      openFile(file)
    }
    pState.status.status = 'ready'
    logger.info(`web loaded file: ${file}`)
    res.status(200).json({ result: true })
  } catch (error) {
    logger.error('web player load file error', error)
    res.status(500).json({ error: error })
  }
})

router.get('/fastforward', (req, res) => {
  try {
    pCommand({ command: 'fastforward', value: req.query.time })
    res.status(200).json({ result: true })
  } catch (error) {
    logger.error('web player ff fn error', error)
    res.status(500).json({ error: error })
  }
})

router.get('/rewind', (req, res) => {
  try {
    pCommand({ command: 'rewind', value: req.query.time })
    res.status(200).json({ result: true })
  } catch (error) {
    logger.error('web player rewind fn error', error)
    res.status(500).json({ error: error })
  }
})

router.get('/setfullscreen', async (req, res) => {
  try {
    const r = await setFullScreen(req.query.fullscreen)
    res.status(200).json({ ...r })
  } catch (error) {
    logger.error('web player set fullscreen error', error)
    res.status(500).json({ error })
  }
})

export default router
