import express from 'express'
import fn from './fnPlayer'
const router = express.Router()

router.get('/', (req, res, next) => {
  res.send('<h2>Welcome to the API Page</h2>')
})

router.use('/fn', fn)

export default router
