import express from 'express'
import { BrowserWindow as bw } from 'electron'
import logger from '/src-electron/logger'
import { openFile } from '/src-electron/functions/files'

const router = express.Router()

router.get('/play', (req, res) => {
  try {
    let rt
    console.log(pv)
    switch (pv.mode) {
      case 'video':
      case 'audio':
        if (
          pv.status === 'ready' ||
          pv.status === 'paused' ||
          pv.status === 'ended'
        ) {
          bw.fromId(1).webContents.send('pc', { command: 'play' })
          rt = { command: 'play', mode: pv.mode, result: 'playing' }
        } else if (pv.status === 'stop') {
          bw.fromId(1).webContents.send('pc', { command: 'load' })
          bw.fromId(1).webContents.send('pc', { command: 'play' })
          rt = { command: 'play', mode: pv.mode, result: 'playing' }
        } else {
          rt = { command: 'play', mode: pv.mode, result: 'player not ready' }
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
          bw.fromId(1).webContents.send('pc', { command: 'pause' })
          rt = { command: 'pause', mode: pv.mode, result: 'paused' }
        } else {
          rt = { command: 'pause', mode: pv.mode, result: 'not playing' }
        }
        break
    }
    logger.info(rt)
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
        // bw.fromId(1).webContents.send('pc', { command: 'load' })
        bw.fromId(1).webContents.send('pc', { command: 'pause' })
        bw.fromId(1).webContents.send('pc', { command: 'seek', seekTime: 0 })
        rt = { command: 'stop', mode: pv.mode, result: 'load or stop' }
        break
    }
    logger.info(rt)

    // show logo
    bw.fromId(1).webContents.send('command', { command: 'showLogo' })

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
      bw.fromId(1).webContents.send('pc', { command: 'load' })
    } else {
      openFile(file)
    }
    pv.status = 'ready'
    logger.info(`loaded file: ${file}`)
    res.status(200).json({ result: true })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

export default router
