<script setup>
import { ref, onMounted } from 'vue'
import VideoPlayer from 'src/components/VideoPlayer'
import { info, warn, error } from 'src/composables/useLogger'
import { playerValues } from 'src/composables/usePlayer'

const vp = ref(null)
onMounted(() => {
  myAPI.rtPlayerValues((args) => {
    playerValues.value = args
  })
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
    <VideoPlayer ref="vp" style="width: 100%" controls />
    <q-btn color="yellow" @click="console.log(playerValues)">check</q-btn>
    <q-btn color="green" icon="play_arrow" @click="vp.play()" />
    <q-btn color="red" icon="pause" @click="vp.pause()" />
  </q-page>
</template>

<style scoped></style>
