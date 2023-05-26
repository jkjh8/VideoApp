<script setup>
import { ref, onMounted } from 'vue'
import VideoPlayer from 'src/components/VideoPlayer'
import { sources } from 'src/composables/usePlayer'

const vp = ref(null)
onMounted(() => {
  //
})

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

const getStatus = async () => {
  console.log(await vp.value.getReadyState())
}
</script>

<template>
  <q-page class="flex flex-center">
    <VideoPlayer
      ref="vp"
      style="width: 100%"
      :src="sources[0].src"
      controls
      @onplaying="console.log('onplaying')"
      @ondurationchange="(time) => console.log('duration', time)"
      @ontimeupdate="
        (time, remaining) => console.log('timeupdate', time, remaining)
      "
    />
    <q-btn class="bg-white" rounded @click="getStatus">GET STATE</q-btn>
  </q-page>
</template>

<style scoped></style>
