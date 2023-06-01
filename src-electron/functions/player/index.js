import { BrowserWindow as bs } from 'electron'
const seekTime = (time) => {
  bs.fromId(1).webContents.send('playerCommand', {
    command: 'seek',
    seekTime: time
  })
}

const pan = (value) => {
  bs.fromId(1).webContents.send('playerCommand', {
    command: 'pan',
    value: value
  })
}

const play = () => {
  bs.fromId(1).webContents.send('playerCommand', { command: 'play' })
}

const pause = () => {
  bs.fromId(1).webContents.send('playerCommand', { command: 'pause' })
}
export { seekTime, pan, play, pause }
