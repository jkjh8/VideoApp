import express from 'express'
import { app } from 'electron'
import path from 'path'
import fs from 'fs'
import multer from 'multer'
import logger from '/src-electron/logger'

const router = express.Router()
const docu = app.getPath('documents')
const mediaFolder = path.resolve(docu, 'Media')

if (!fs.existsSync(mediaFolder)) {
  fs.mkdirSync(mediaFolder)
}

router.get('/', async (req, res) => {
  try {
    const currentPath = path.resolve(mediaFolder, req.query.path)
    let mediaFiles = []
    const files = fs.readdirSync(currentPath)
    for (let i = 0; i < files.length; i++) {
      const file = path.resolve(currentPath, files[i])
      const state = fs.statSync(file)
      const paths = path.parse(file)
      mediaFiles.push({ ...paths, ...state, fullPath: file })
    }
    res
      .status(200)
      .json({ files: mediaFiles, currentPath, defaultPath: mediaFolder })
  } catch (error) {
    logger.error(error)
    res.status(500).json(error)
  }
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { uploadPath } = req.headers
    const currentPath = uploadPath
      ? path.resolve(mediaFolder, uploadPath)
      : mediaFolder
    cb(null, currentPath)
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname)
  }
})

const upload = multer({ storage: storage })

router.post('/upload', upload.any(), (req, res) => {
  try {
    logger.info(
      `update files: ${JSON.stringify(
        req.files.map((file) => file.originalname)
      )}`
    )
    res.status(200).json({ result: true })
  } catch (error) {
    logger.error('upload error', error)
    res.status(500).json(error)
  }
})

export default router
