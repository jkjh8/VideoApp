import express from 'express'
const router = express.Router()

router.get('/', (req, res, next) => {
  res.send('<h2>Welcome to the API Page</h2>')
})

export default router
