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
  if (playerValues.status === 'ready' || playerValues.status === 'paused') {
    bs.fromId(1).webContents.send('playerCommand', { command: 'play' })
    return 'play'
  } else {
    return 'player not ready'
  }
}

const pause = () => {
  if (playerValues.status === 'play') {
    bs.fromId(1).webContents.send('playerCommand', { command: 'pause' })
    return 'paused'
  } else {
    return 'player not playing'
  }
}

const stop = () => {
  bs.fromId(1).webContents.send('playerCommand', { command: 'stop' })
  return 'stopped or loaded'
}

export { seekTime, pan, play, pause, stop }
