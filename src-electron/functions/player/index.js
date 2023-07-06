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
  io.emit('status', { fullscreen: fullscreen })
  return await db.update(
    { key: 'fullscreen' },
    { $set: { value: fullscreen } },
    { upsert: true }
  )
}

const updateSetupFromDb = async () => {
  const setupVal = await db.find({})

  for (let i = 0; i < setupVal.length; i++) {
    switch (setupVal[i].key) {
      case 'showlogo':
        pState.showlogo = setupVal[i].value
        break
      case 'windowSize':
        pState.device.width = setupVal[i].width
        pState.device.height = setupVal[i].height
        break
      case 'fullscreen':
        pState.fullscreen = setupVal[i].value
        break
    }
  }
}

export { setFullScreen, updateSetupFromDb }
