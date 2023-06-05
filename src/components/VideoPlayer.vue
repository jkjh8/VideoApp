<script setup>
import { ref, onMounted } from 'vue'
import { pStatus, pMode, pCallback } from 'src/composables/usePlayer.js'
import { pCommands } from 'src/composables/usePlayerCommands'

const panStatus = ref(false)

const props = defineProps({
  src: String,
  controls: { type: Boolean, default: false },
  source: String
})

const vp = ref(null)
const audioOutputDevices = ref([])

const getReadyState = () => {
  return vp.value.readyState
}

const getAudioOutputDevices = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices()
  audioOutputDevices.value = devices.find(
    (device) => device.kind === 'audiooutput'
  )
  return audioOutputDevices.value
}

const getAudioOutputDevice = () => {
  return vp.value.sindId
}
const setAudioOutputDevice = (deviceId) => vp.value.setSinkId(deviceId)
const setSource = (src) => (vp.value.src = src)
const getSource = () => {
  return vp.value.currentSrc
}

const volumechanged = () => {
  if (vp.value.muted) {
    upv({ type: 'volumechanged', volume: 0 })
  } else {
    upv({ type: 'volumechanged', volume: vp.value.volume })
  }
}

const updateTimes = () => {
  upv({
    type: 'timeupdate',
    currentTime: vp.value.currentTime,
    remaining: vp.value.duration - vp.value.currentTime
  })
}

const play = () => vp.value.play()
const pause = () => vp.value.pause()
const load = () => vp.value.load()

const upv = (args) => myAPI.updateState({ ...args })

onMounted(async () => {
  const devices = await navigator.mediaDevices.enumerateDevices()
  audioOutputDevices.value = devices.find(
    (device) => device.kind === 'audiooutput'
  )

  const obj = vp.value

  // callback events
  pCallback(obj)

  // player Commands
  myAPI.pc((args) => {
    pCommands(obj, args)
  })
})

defineExpose({
  getReadyState,
  getAudioOutputDevices,
  getAudioOutputDevice,
  setAudioOutputDevice,
  setSource,
  getSource,
  play,
  pause
})
</script>

<template>
  <video ref="vp" :src="props.source" :controls="controls" />
</template>

<style scoped></style>
