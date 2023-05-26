<script setup>
import { ref, onMounted } from 'vue'
import VideoPlayer from 'src/components/VideoPlayer'
import { info, warn, error } from 'src/composables/useLogger'
import { sources } from 'src/composables/usePlayer'

const vp = ref(null)
onMounted(() => {
  //
})

const updateDuration = (seconds) => {
  myAPI.updateDuration(seconds)
}
const onError = (err) => {
  console.log('Error', err)
}
const updatePlaybackTime = (cur, remaining) => {
  myAPI.updateTimes(cur, remaining)
}

const updateState = (state, value) => {
  myAPI.updateState({ event: state, value: value })
}
</script>

<template>
  <q-page class="flex flex-center">
    <VideoPlayer
      ref="vp"
      style="width: 100%"
      :src="sources[0].src"
      controls
      @onplay="updateState('play')"
      @onplaying="updateState('playing')"
      @onpause="updateState('paused')"
      @onloadstart="updateState('loadstart')"
      @onloadeddata="(src) => updateState('loadeddata', src)"
      @onloadedmetadata="(src) => updateState('loadedmetadata', src)"
      @onratechange="(rate) => updateState('ratechange', rate)"
      @onseeked="updateState('seeked')"
      @onseeking="updateState('seeking')"
      @onstalled="updateState('stalled')"
      @onsuspend="updateState('suspend')"
      @onvolumechange="(vol) => updateState('volumechanged', vol)"
      @onwaiting="warn('waiting')"
      @onerror="(e) => error(`code: ${e}, message: ${e.message}`)"
      @ondurationchange="updateDuration"
      @ontimeupdate="updatePlaybackTime"
    />
  </q-page>
</template>

<style scoped></style>
