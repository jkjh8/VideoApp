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

export default router
