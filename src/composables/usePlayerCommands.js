import { ref } from 'vue'
import { pStatus, pMode } from 'src/composables/usePlayer'

const panStatus = ref(false)
const pCommands = async (obj, args) => {
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
      // pMode.value = pStatus.value.file.type
      if (pStatus.value.file.type !== 'image') {
        obj.play()
      }
      break
    case 'pause':
      obj.pause()
      break
    case 'stop':
    case 'load':
      obj.pause()
      obj.load()
      break
    case 'clear':
      obj.src = null
      break
    case 'fastforward':
      obj.currentTime = obj.currentTime + Number(args.value)
      break
    case 'rewind':
      obj.currentTime = obj.currentTime - Number(args.value)
      break
    case 'devices':
      const devices = await navigator.mediaDevices.enumerateDevices()
      myAPI.updateState({ type: 'devices', devices: JSON.stringify(devices) })
      break
    case 'device':
      myAPI.updateState({ type: 'device', device: obj.sinkId })
      break
    case 'setDevice':
      obj.setSinkId(args.deviceId)
      break
  }
}

export { pCommands }
