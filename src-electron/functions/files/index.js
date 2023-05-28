import path from 'node:path'
import db from '../../db'
import { dialog, BrowserWindow as bw } from 'electron'
import ffmpeg from 'fluent-ffmpeg'
import logger from '../../logger'

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
        extensions: ['wav', 'mp3', 'mp4', 'mkv', 'mov', 'jpg', 'bmp', 'gif']
      },
      { name: 'Video', extensions: ['mp4', 'mkv', 'mov'] },
      { name: 'Audio', extensions: ['mp3', 'wav'] },
      { name: 'Image', extensions: ['jpg', 'bmp'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    properties: ['openFile']
  })
}

const getMetaData = (file) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('timeout'))
    }, 5000)
    ffmpeg.ffprobe(file, (err, meta) => {
      if (err) reject(new Error('metadata read error'))
      resolve(meta)
    })
  })
}

const openFile = async () => {
  try {
    const filePath = await getFileDialog()
    const parsedFilePath = path.parse(filePath[0])
    const encodedFilePath = encodeURIComponent(filePath[0])
    const fileName = parsedFilePath.name + parsedFilePath.ext
    const fileExt = parsedFilePath.ext
    const fileMetaData = await getMetaData(filePath[0])
    console.log(fileMetaData)
    // update values
    playerValues.name = fileName
    playerValues.ext = fileExt
    playerValues.src = encodedFilePath
    playerValues = { ...playerValues, ...fileMetaData }

    // send player data to frontend
    bw.fromId(1).webContents.send('open', {
      src: encodedFilePath,
      values: playerValues
    })
  } catch (error) {
    console.error(error)
  }
}

export { getFileDialog, getMetaData, openFile }
