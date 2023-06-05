import path from 'node:path'
import fs from 'node:fs'
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import httpLogger from 'morgan'
import session from 'express-session'

import logger from '/src-electron/logger'
import { ioCommands } from './ioCommand'
import routes from './routes'

import { pCommand } from '/src-electron/functions/ipc'

import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
const server = http.createServer(app)
// socket.io
const io = new Server(server)

global.io = io
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
const publicPath = path.resolve(__dirname, process.env.QUASAR_PUBLIC_FOLDER)

// static path for vue.js
app.use(express.static(path.join(publicPath, 'spa')))
// router
app.use('/', routes)

// socket.io events
io.on('connection', (socket) => {
  io.emit('playerstate', pv)
  io.emit('times', pt)
  pCommand({ command: 'devices' })
  pCommand({ command: 'device' })
  logger.info(`connection socket.io id=${socket.id}`)
  socket.on('ioCommands', (args) => {
    ioCommands(args)
  })
})

server.listen(HTTP_PORT, () => {
  logger.info(`Web server listening on port ${HTTP_PORT}`)
})
