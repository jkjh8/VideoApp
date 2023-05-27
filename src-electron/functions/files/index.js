import db from '../../db'
import { dialog } from 'electron'
import logger from '../../logger'

const getFileDialog = async () => {
  return dialog.showOpenDialogSync({
    title: 'Select Media File',
    filters: [
      {
        name: 'Media',
        extensions: ['wav', 'mp3', 'mp4', 'mkv', 'jpg', 'bmp', 'gif']
      },
      { name: 'Video', extensions: ['mp4', 'mkv'] },
      { name: 'Audio', extensions: ['mp3', 'wav'] },
      { name: 'Image', extensions: ['jpg', 'bmp'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    properties: ['openFile']
  })
}

export { getFileDialog }
