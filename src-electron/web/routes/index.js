import path from 'path'
import express from 'express'
import api from './api'

const router = express.Router()
const publicPath = path.resolve(__dirname, process.env.QUASAR_PUBLIC_FOLDER)

router.get('/', (req, res, next) => {
  res.sendFile(path.join(publicPath, 'spa', 'index.html'))
})

router.use('/api', api)

export default router
