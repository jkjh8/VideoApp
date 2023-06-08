import { BrowserWindow as bw } from 'electron'
import db from '/src-electron/db'

const setFullScreen = async (value) => {
  let fullscreen
  if (value == true) {
    fullscreen = true
  } else {
    fullscreen = false
  }
  bw.fromId(1).setFullScreen(fullscreen)
  io.emit('fullscreen', { fullscreen: fullscreen })
  return await db.update(
    { key: 'fullscreen' },
    { $set: { value: fullscreen } },
    { upsert: true }
  )
}

export { setFullScreen }
