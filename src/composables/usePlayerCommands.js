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
      pMode.value = pStatus.value.file.type
      switch (pStatus.value.file.type) {
        case 'audio':
          // logo or etc logic is required
          obj.play()
          break
        case 'video':
          pMode.value = 'video'
          obj.play()
          break
        case 'image':
          // image show logic is required
          break
      }
      break
    case 'pause':
      obj.pause()
      break
    case 'stop':
      obj.pause()
      obj.currentTime = 0
      fnShowlogo()
      break
    case 'load':
      obj.pause()
      obj.load()
      // showlogo
      fnShowlogo()
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
const fnShowlogo = () => {
  try {
    if (pStatus.value.showlogo) {
      pMode.value = 'logo'
    } else {
      pMode.value = pStatus.value.file.type
    }
  } catch (error) {
    logger.error('showlogo error', error)
  }
}
export { pCommands, fnShowlogo }
