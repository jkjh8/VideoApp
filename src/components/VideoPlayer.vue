<script setup>
import { ref, onMounted } from 'vue'
import {
  playerValues,
  playerMode,
  playerCallback
} from 'src/composables/usePlayer.js'
import { playerCommands } from 'src/composables/usePlayerCommands'

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

  // callback events
  const obj = vp.value
  playerCallback(obj)
  // obj.onplaying = (e) =>
  //   upv({ type: 'playing', status: 'play', readyState: obj.readyState })
  // obj.onabort = () =>
  //   upv({ type: 'abort', status: 'stop', readyState: obj.readyState })
  // obj.canplay = (e) =>
  //   upv({ type: 'canplay', status: 'ready', readyState: obj.readyState })
  // obj.oncanplaythrough = (e) =>
  //   upv({ type: 'canplaythrough', status: 'ready', readyState: obj.readyState })
  // obj.ondurationchange = (e) =>
  //   upv({
  //     type: 'durationchange',
  //     duration: obj.duration,
  //     readyState: obj.readyState
  //   })
  // obj.onemptied = () =>
  //   upv({ type: 'emptied', status: 'emptied', readyState: obj.readyState })
  // obj.onencrypted = () => upv({ type: 'encrypted', readyState: obj.readyState })
  // obj.onended = () =>
  //   upv({ type: 'ended', status: 'ended', readyState: obj.readyState })
  // obj.onerror = (e) =>
  //   upv({ type: 'error', errpr: obj.error, readyState: obj.readyState })
  // obj.onloadeddata = (e) =>
  //   upv({
  //     type: 'loadeddata',
  //     src: obj.src,
  //     status: 'ready',
  //     readyState: obj.readyState
  //   })
  // obj.onloadedmetadata = (e) =>
  //   upv({
  //     type: 'loadedmetadata',
  //     src: obj.src,
  //     status: 'ready',
  //     readyState: obj.readyState
  //   })
  // obj.onloadstart = (e) =>
  //   upv({ type: 'loadstart', status: 'stop', readyState: obj.readyState })
  // obj.onpause = (e) =>
  //   upv({ type: 'pause', status: 'paused', readyState: obj.readyState })
  // obj.onplay = (e) =>
  //   upv({ type: 'play', status: 'play', readyState: obj.readyState })
  // // obj.onprogress = (e) => upv({ type: 'progress', value: e.target.value })
  // obj.onratechange = (e) => upv({ type: 'ratechange', rate: obj.playbackRate })
  // // obj.onseeked = (e) => upv({ type: 'seeked', readyState: obj.readyState })
  // // obj.onseeking = (e) => upv({ type: 'seeking', readyState: obj.readyState })
  // obj.onstalled = (e) =>
  //   upv({ type: 'stalled', status: 'stop', readyState: obj.readyState })
  // obj.onsuspend = (e) =>
  //   upv({ type: 'suspend', status: 'stop', readyState: obj.readyState })
  // obj.ontimeupdate = (e) => updateTimes()
  // obj.onvolumechange = (e) => volumechanged(e)
  // obj.onwaiting = (e) => upv({ type: 'waiting', readyState: obj.readyState })

  // player Commands
  myAPI.playerCommand((args) => {
    playerCommands(obj, args)
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
