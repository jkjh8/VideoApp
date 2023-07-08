import { BrowserWindow as bw } from 'electron'
import db from '/src-electron/db'

const setFullScreen = async (value) => {
  pState.fullscreen = !pState.fullscreen
  // goto fullscreen
  bw.fromId(1).setFullScreen(pState.fullscreen)
  // hide menu
  if (pState.fullscreen) {
    bw.fromId(1).setMenuBarVisibility(false)
  } else {
    bw.fromId(1).setMenuBarVisibility(true)
  }
  // share status
  io.emit('status', pState)
  // updat db
  return await db.update(
    { key: 'fullscreen' },
    { $set: { value: pState.fullscreen } },
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
