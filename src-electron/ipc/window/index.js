import { ipcMain } from 'electron'
import db from '/src-electron/db'

ipcMain.on('updateWindowSize', (args) => {
  db.update(
    { key: 'windowSize' },
    { $set: { height: args.height, width: args.width } },
    { upsert: true }
  )
})
