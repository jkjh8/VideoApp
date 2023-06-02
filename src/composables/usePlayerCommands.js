import { ref } from 'vue'
import { playerValues, playerMode } from 'src/composables/usePlayer'

const panStatus = ref(false)
const playerCommands = (obj, args) => {
  switch (args.command) {
    case 'seek':
      obj.currentTime = args.seekTime
      break
    case 'pan':
      if (args.value === 'start') {
        panStatus.value = obj.paused
        obj.pause()
      } else {
        if (!panStatus.value) {
          obj.play()
        }
      }
      break
    case 'play':
      playerMode.value = playerValues.value.mode
      obj.play()
      break
    case 'pause':
      obj.pause()
      break
    case 'stop':
      obj.load()
      break
  }
}

export { playerCommands }
