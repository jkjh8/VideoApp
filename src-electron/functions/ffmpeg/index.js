import logger from '../../logger'
import ffmpeg from 'fluent-ffmpeg'
import { BrowserWindow as bw } from 'electron'
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

const getMetaData = (file) => {
  ffmpeg.ffprobe(file, (err, meta) => {
    if (err) return logger.error('metadata read error' + err)
    playerValues = { ...playerValues, ...meta }
    bw.fromId(1).webContents.send('rtPlayerValues', playerValues)
  })
}

export { getMetaData }
