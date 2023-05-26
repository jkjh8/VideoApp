<script setup>
import { ref, onMounted } from 'vue'
const vp = ref('')

const props = defineProps({
  src: String,
  controls: { type: Boolean, default: false },
  autoplay: { type: Boolean, default: false }
})

const emit = defineEmits([
  'onplaying',
  'onabort',
  'canplay',
  'oncanplaythrough',
  'ondurationchange',
  'onemptied',
  'onencrypted',
  'onended',
  'oneror',
  'onloadeddata',
  'onloadedmetadata',
  'onloadstart',
  'onpause',
  'onplay',
  'onprogress',
  'onratechange',
  'onseeked',
  'onseeking',
  'onstalled',
  'onsuspend',
  'ontimeupdate',
  'onwaiting'
])

const getReadyState = () => {
  console.log(vp.value.sinkId)
  return vp.value.readyState
}

defineExpose({
  getReadyState
})

onMounted(async () => {
  const devices = await navigator.mediaDevices.enumerateDevices()

  console.log(devices)
  const obj = vp.value
  obj.onplaying = (e) => emit('onplaying', e.target.value)
  obj.onabort = () => emit('onabort')
  obj.canplay = (e) => emit('canplay', e.target.value)
  obj.oncanplaythrough = (e) => emit('canplaythrough', e.target.value)
  obj.ondurationchange = (e) => emit('ondurationchange', obj.duration)
  obj.onemptied = () => emit('onemptied')
  obj.onencrypted = () => emit('onencrypted')
  obj.onended = () => emit('onended')
  obj.onerror = (e) => emit('onerror', obj.error)
  obj.onloadeddata = (e) => emit('onloadeddata')
  obj.onloadedmetadata = (e) => emit('onloadedmetadata')
  obj.onloadstart = (e) => emit('onloadstart')
  obj.onpause = (e) => emit('onpause', obj.paused)
  obj.onplay = (e) => emit('onplay')
  obj.onprogress = (e) => emit('onprogress', e.target.value)
  obj.onratechange = (e) => emit('onratechange', obj.playbackRate)
  obj.onseeked = (e) => emit('onseeked')
  obj.onseeking = (e) => emit('onseeking')
  obj.onstalled = (e) => emit('onstalled')
  obj.onsuspend = (e) => emit('onsuspend')
  obj.ontimeupdate = (e) =>
    emit('ontimeupdate', obj.currentTime, obj.duration - obj.currentTime)
  obj.onvolumechange = (e) => emit('onvolumechange', obj.volume)
  obj.onwaiting = (e) => emit('onwaiting')
})
</script>

<template>
  <video ref="vp" :src="props.src" :autoplay="autoplay" :controls="controls" />
</template>

<style scoped></style>
