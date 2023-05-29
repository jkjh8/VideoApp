import path from 'node:path'
import fs from 'node:fs'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import http from 'http'
import httpLogger from 'morgan'
import session from 'express-session'

import logger from '/src-electron/logger'
import routes from './routes'

import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
// port
const HTTP_PORT = 3000

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

if (process.env.NODE_ENV === 'development') {
  app.use(httpLogger('dev'))
  app.use(
    cors({
      origin: (origin, callback) => {
        callback(null, origin)
      }
      // credentials: true
    })
  )
}

console.log(process.env.SESSION_SECRET)

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true
    }
  })
)

// router
app.use('/api', routes)

http.createServer(app).listen(HTTP_PORT, () => {
  logger.info(`Web server listening on port ${HTTP_PORT}`)
})
