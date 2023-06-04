import { BrowserWindow as bw } from 'electron'

const pCommand = (args) => {
  bw.fromId(1).webContents.send('pc', { ...args })
}

const mainCommand = (args) => {
  bw.fromId(1).webContents.send('command', { ...args })
}
export { pCommand, mainCommand }
