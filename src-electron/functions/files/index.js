import path from 'node:path'
import { dialog, BrowserWindow as bw } from 'electron'
import ffmpeg from 'fluent-ffmpeg'
import sizeOf from 'image-size'

import logger from '/src-electron/logger'
import db from '/src-electron/db'

const FfmpegPath = require('ffmpeg-static').replace(
  'app.asar',
  'app.asar.unpacked'
)
const FfprobePath = require('ffprobe-static').path.replace(
  'app.asar',
  'app.asar.unpacked'
)

ffmpeg.setFfmpegPath(FfmpegPath)
ffmpeg.setFfprobePath(FfprobePath)

const getFileDialog = async () => {
  return dialog.showOpenDialogSync({
    title: 'Select Media File',
    filters: [
      {
        name: 'Media',
        extensions: [
          'wav',
          'mp3',
          'mp4',
          'mkv',
          'mov',
          'jpg',
          'bmp',
          'gif',
          'png',
          'jpeg'
        ]
      },
      { name: 'Video', extensions: ['mp4', 'mkv', 'mov'] },
      { name: 'Audio', extensions: ['mp3', 'wav'] },
      { name: 'Image', extensions: ['jpg', 'bmp', 'png', 'jpeg', 'gif'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    properties: ['openFile']
  })
}

const getMetaDataPromise = (file) => {
  return new Promise((resolve, reject) => {
    try {
      ffmpeg.ffprobe(file, (err, meta) => {
        if (err) reject(new Error('metadata read error'))
        resolve(meta)
      })
    } catch (error) {
      reject(error)
    }
  })
}

const getMetaData = (file) => {
  ffmpeg.ffprobe(file, (err, meta) => {
    if (err) reject(new Error('metadata read error'))
    pState.file.meta = meta
    io.emit('status', pState)
    bw.fromId(1).webContents.send('updateState', pState)
    console.log('emit data')
  })
}

const openFile = async (filePath) => {
  try {
    const parsedFilePath = path.parse(filePath)
    const encodedFilePath = encodeURI(filePath)
    const fileName = parsedFilePath.name + parsedFilePath.ext
    const fileExt = parsedFilePath.ext

    // update values
    pState.file.name = fileName
    pState.file.ext = fileExt
    pState.file.src = encodedFilePath
    pState.file.filePath = filePath

    switch (fileExt) {
      case '.mp4':
      case '.mov':
      case '.mkv':
        getMetaData(filePath)
        pState.file.type = 'video'
        break
      case '.mp3':
      case '.wav':
        getMetaData(filePath)
        pState.file.type = 'audio'
        break
      case '.jpg':
      case '.jpeg':
      case '.png':
      case '.bmp':
      case '.gif':
        pState.file.type = 'image'
        pState.dimensions = sizeOf(filePath)
    }

    // send player data to frontend
    bw.fromId(1).webContents.send('open', {
      src: encodedFilePath,
      type: pState.file.type,
      values: pState
    })
    //update db
    db.update(
      { key: 'currentSrc' },
      { $set: { source: filePath } },
      { upsert: true }
    )
    io.emit('status', pState)
  } catch (error) {
    console.error(error)
  }
}

const openFileDialog = async () => {
  try {
    const filePath = await getFileDialog()
    await openFile(filePath[0])
  } catch (err) {
    logger.error(err)
  }
}

export { getFileDialog, getMetaData, openFile, openFileDialog }
