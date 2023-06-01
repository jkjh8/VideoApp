<script setup>
import { ref, onMounted } from 'vue'
import { playerValues, playerMode } from 'src/composables/usePlayer.js'

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
  obj.onplaying = (e) =>
    upv({ type: 'playing', play: 1, readyState: obj.readyState })
  obj.onabort = () =>
    upv({ type: 'abort', play: 0, readyState: obj.readyState })
  obj.canplay = (e) =>
    upv({ type: 'canplay', play: 0, readyState: obj.readyState })
  obj.oncanplaythrough = (e) =>
    upv({ type: 'canplaythrough', play: 0, readyState: obj.readyState })
  obj.ondurationchange = (e) =>
    upv({
      type: 'durationchange',
      duration: obj.duration,
      readyState: obj.readyState
    })
  obj.onemptied = () =>
    upv({ type: 'emptied', play: 0, readyState: obj.readyState })
  obj.onencrypted = () => upv({ type: 'encrypted', readyState: obj.readyState })
  obj.onended = () =>
    upv({ type: 'ended', play: 0, readyState: obj.readyState })
  obj.onerror = (e) =>
    upv({ type: 'error', errpr: obj.error, readyState: obj.readyState })
  obj.onloadeddata = (e) =>
    upv({
      type: 'loadeddata',
      src: obj.src,
      play: 0,
      readyState: obj.readyState
    })
  obj.onloadedmetadata = (e) =>
    upv({
      type: 'loadedmetadata',
      src: obj.src,
      play: 0,
      readyState: obj.readyState
    })
  obj.onloadstart = (e) =>
    upv({ type: 'loadstart', play: 0, readyState: obj.readyState })
  obj.onpause = (e) =>
    upv({ type: 'pause', play: 2, readyState: obj.readyState })
  obj.onplay = (e) => upv({ type: 'play', play: 1, readyState: obj.readyState })
  // obj.onprogress = (e) => upv({ type: 'progress', value: e.target.value })
  obj.onratechange = (e) => upv({ type: 'ratechange', rate: obj.playbackRate })
  // obj.onseeked = (e) => upv({ type: 'seeked', readyState: obj.readyState })
  // obj.onseeking = (e) => upv({ type: 'seeking', readyState: obj.readyState })
  obj.onstalled = (e) =>
    upv({ type: 'stalled', play: 0, readyState: obj.readyState })
  obj.onsuspend = (e) =>
    upv({ type: 'suspend', play: 0, readyState: obj.readyState })
  obj.ontimeupdate = (e) => updateTimes()
  obj.onvolumechange = (e) => volumechanged(e)
  obj.onwaiting = (e) => upv({ type: 'waiting', readyState: obj.readyState })

  // player Commands
  myAPI.playerCommand((args) => {
    switch (args.command) {
      case 'seek':
        obj.currentTime = args.seekTime
        break
      case 'pan':
        if (args.value === 'start') {
          panStatus.value = obj.paused
          pause()
        } else {
          if (!panStatus.value) {
            play()
          }
        }
        break
      case 'play':
        playerMode.value = playerValues.value.mode
        play()
        break
      case 'pause':
        pause()
        break
    }
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
