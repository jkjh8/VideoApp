import { BrowserWindow as bw } from 'electron'

const pCommand = (args) => {
  console.log('webto', args)
  bw.fromId(1).webContents.send('pCommand', { ...args })
}

const mainCommand = (args) => {
  bw.fromId(1).webContents.send('command', { ...args })
}
export { pCommand, mainCommand }
