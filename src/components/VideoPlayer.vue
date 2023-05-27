<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  src: String,
  controls: { type: Boolean, default: false }
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
    upv({ type: 'volumechanged', value: 0 })
  } else {
    upv({ type: 'volumechanged', value: vp.value.volume })
  }
}

const play = () => vp.value.play()
const pause = () => vp.value.pause()

const upv = (args) => myAPI.updateState({ ...args })

onMounted(async () => {
  const devices = await navigator.mediaDevices.enumerateDevices()
  audioOutputDevices.value = devices.find(
    (device) => device.kind === 'audiooutput'
  )
  const obj = vp.value
  obj.onplaying = (e) => upv({ type: 'playing' })
  obj.onabort = () => upv({ type: 'abort' })
  obj.canplay = (e) => upv({ type: 'canplay' })
  obj.oncanplaythrough = (e) =>
    upv({ type: 'canplaythrough', value: e.target.value })
  obj.ondurationchange = (e) =>
    upv({ type: 'durationchange', value: obj.duration })
  obj.onemptied = () => upv({ type: 'emptied' })
  obj.onencrypted = () => upv({ type: 'encrypted' })
  obj.onended = () => upv({ type: 'ended' })
  obj.onerror = (e) => upv({ type: 'error', value: obj.error })
  obj.onloadeddata = (e) => upv({ type: 'loadeddata', value: obj.src })
  obj.onloadedmetadata = (e) => upv({ type: 'loadedmetadata', value: obj.src })
  obj.onloadstart = (e) => upv({ type: 'loadstart' })
  obj.onpause = (e) => upv({ type: 'pause' })
  obj.onplay = (e) => upv({ type: 'play' })
  // obj.onprogress = (e) => upv({ type: 'progress', value: e.target.value })
  obj.onratechange = (e) => upv({ type: 'ratechange', value: obj.playbackRate })
  obj.onseeked = (e) => upv({ type: 'seeked' })
  obj.onseeking = (e) => upv({ type: 'seeking' })
  obj.onstalled = (e) => upv({ type: 'stalled' })
  obj.onsuspend = (e) => upv({ type: 'suspend' })
  obj.ontimeupdate = (e) =>
    upv({
      type: 'timeupdate',
      cur: obj.currentTime,
      remain: obj.duration - obj.currentTime
    })
  obj.onvolumechange = (e) => volumechanged(e)
  obj.onwaiting = (e) => upv({ type: 'waiting' })

  myAPI.open((args) => {
    obj.src = `local://${args.value}`
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
  <video ref="vp" :src="props.src" :controls="controls" />
</template>

<style scoped></style>
