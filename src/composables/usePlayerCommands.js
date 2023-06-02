import { ref } from 'vue'
import { pStatus, pMode } from 'src/composables/usePlayer'

const panStatus = ref(false)
const pCommands = (obj, args) => {
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
      pMode.value = pStatus.value.mode
      obj.play()
      break
    case 'pause':
      obj.pause()
      break
    case 'stop':
    case 'load':
      obj.pause()
      obj.load()
      break
  }
}

export { pCommands }
