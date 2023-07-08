import express from 'express'
import { BrowserWindow as bw } from 'electron'
import db from '/src-electron/db'
import logger from '/src-electron/logger'
import { updateSetupFromDb } from '/src-electron/functions/player'
import { pCommand, mainCommand } from '/src-electron/functions/webToIPC'

const router = express.Router()

router.get('/updatesetup', async (req, res) => {
  try {
    await updateSetupFromDb()
    res.status(200).json({ value: pState })
  } catch (error) {
    res.status(500).json(error)
  }
})

router.put('/showlogo', async (req, res) => {
  try {
    pState.showlogo = req.body.value
    const r = await db.update(
      { key: 'showlogo' },
      { $set: { value: req.body.value } },
      { upsert: true }
    )
    res.status(200).json({ result: r, value: req.body.value })
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get('/devices', (req, res) => {
  try {
    pCommand({ command: 'devices' })
    res.status(200).json({ result: true })
  } catch (error) {
    logger.error('web player devices error', error)
    res.status(500).json({ error })
  }
})

router.get('/device', (req, res) => {
  try {
    pCommand({ command: 'device' })
    res.status(200).json({ result: true })
  } catch (error) {
    logger.error('web player device error', error)
    res.status(500).json({ error })
  }
})

router.post('/setDevice', async (req, res) => {
  try {
    const { deviceId } = req.body
    pCommand({ command: 'setDevice', deviceId: deviceId })
    const r = await db.update(
      { key: 'device' },
      { $set: { deviceId: deviceId } },
      { upsert: true }
    )
    res.status(200).json({ result: true, data: r })
  } catch (error) {
    logger.error('web player set device error', error)
    res.status(500).json({ error })
  }
})

router.get('/startfullscreen', async (req, res) => {
  try {
    const r = await db.findOne({ key: 'startfullscreen' })
    res.status(200).json({ result: true, data: r })
  } catch (error) {
    logger.error('web player set start fullscreen error', error)
    res.status(500).json({ error })
  }
})

router.put('/startfullscreen', async (req, res) => {
  try {
    console.log(req.body)
    const r = await db.update(
      { key: 'startfullscreen' },
      { $set: { value: req.body.startfullscreen } },
      { upsert: true }
    )
    res.status(200).json({ result: true, data: r })
  } catch (error) {
    logger.error('web player set start fullscreen error', error)
    res.status(500).json({ error })
  }
})

export default router
