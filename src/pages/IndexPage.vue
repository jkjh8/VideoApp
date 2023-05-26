<script setup>
import { ref } from 'vue'
import { QMediaPlayer } from '@quasar/quasar-ui-qmediaplayer'
import { sources } from 'src/composables/usePlayer'
// import '@quasar/quasar-ui-qmediaplayer/src/index.sass'

const VideoPlayer = ref(null)

const updateDuration = (seconds) => {
  console.log('Duration', seconds)
}
const onError = (err) => {
  console.log('Error', err)
}
const updatePlaybackTime = (cur, remaining) => {
  console.log(cur, remaining)
}
const loadedmetadata = () => {
  console.log(VideoPlayer.value)
}
</script>

<template>
  <q-page class="flex flex-center">
    <q-media-player
      ref="VideoPlayer"
      type="video"
      :sources="sources"
      :show-big-play-button="false"
      :controls-display-time="1000"
      @ready="console.log('ready')"
      @canplay="console.log('canplay')"
      @canplaythrough="console.log('canplaythrough')"
      @abort="console.log('abort')"
      @emptied="console.log('emptied')"
      @duration="updateDuration"
      @ended="console.log('ended')"
      @error="onError"
      @networkState="(state) => console.log('network state', state)"
      @paused="console.log('paused')"
      @playing="console.log('playing')"
      @play="console.log('play')"
      @stalled="console.log('stalled')"
      @suspend="console.log('suspend')"
      @timeupdate="updatePlaybackTime"
      @fullscreen="(showing) => console.log('fullscreen', showing)"
      @loadeddata="console.log('loadeddata')"
      @loadstart="console.log('loadstart')"
      @volume="(volume) => console.log('volume', volume)"
      @muted="(muted) => console.log('muted', muted)"
      @loadedmetadata="loadedmetadata"
    />
  </q-page>
</template>

<style scoped></style>
