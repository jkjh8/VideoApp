import express from 'express'
import fn from './fnPlayer'
import files from './files'

const router = express.Router()

router.use('/fn', fn)
router.use('/files', files)

export default router
