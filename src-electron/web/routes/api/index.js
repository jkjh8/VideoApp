import express from 'express'
import fn from './player'
import files from './files'
import setup from './setup'

const router = express.Router()

router.use('/fn', fn)
router.use('/files', files)
router.use('/setup', setup)

export default router
