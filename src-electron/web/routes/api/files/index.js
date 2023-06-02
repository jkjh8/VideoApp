import express from 'express'
import { app } from 'electron'
import path from 'path'
import fs from 'fs'
import logger from '/src-electron/logger'

const router = express.Router()
const docu = app.getPath('documents')
const mediaFolder = path.join(docu, 'Media')

if (!fs.existsSync(mediaFolder)) {
  fs.mkdirSync(mediaFolder)
}

router.get('/', async (req, res) => {
  try {
    console.log('file query', req.query)
    const files = fs.readdirSync(mediaFolder)
    res.status(200).json({ files })
  } catch (error) {}
})

export default router
