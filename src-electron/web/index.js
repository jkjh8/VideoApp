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
import { playerCommand } from './command'
import routes from './routes'

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

// router
app.use('/api', routes)

// socket.io events
io.on('connection', (socket) => {
  io.emit('playerstate', playerValues)
  io.emit('times', playerTimes)
  logger.info(`connection socket.io id=${socket.id}`)
  socket.on('playcommand', (args) => {
    playerCommand(args)
  })
})

server.listen(HTTP_PORT, () => {
  logger.info(`Web server listening on port ${HTTP_PORT}`)
})
