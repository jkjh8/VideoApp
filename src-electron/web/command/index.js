import logger from '/src-electron/logger'
import { seekTime, pan, play, pause } from '/src-electron/functions/player'

const playerCommand = (args) => {
  try {
    switch (args.command) {
      case 'seek':
        seekTime(args.seekTime)
        break
      case 'pan':
        pan(args.value)
        break
      case 'play':
        play()
        break
      case 'pause':
        pause()
        break
    }
  } catch (err) {
    logger.error(err)
  }
}

export { playerCommand }
