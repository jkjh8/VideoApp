import logger from '../../logger'
import ffmpeg from 'fluent-ffmpeg'

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
    playerValues.metadata = { ...meta }
  })
}

export { getMetaData }
