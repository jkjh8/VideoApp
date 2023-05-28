<script setup>
import { ref, onMounted } from 'vue'
import VideoPlayer from 'src/components/VideoPlayer'
import { info, warn, error } from 'src/composables/useLogger'
import { playerValues, playerMode } from 'src/composables/usePlayer'

const vp = ref(null)
const videoSource = ref('')
const imageSource = ref('')
const audioSource = ref('')

onMounted(() => {
  myAPI.open((args) => {
    playerValues.value = { ...args.values }
    switch (args.mode) {
      case 'video':
        playerMode.value = 'video'
        videoSource.value = `local://${args.src}`
        break
      case 'audio':
        playerMode.value = 'audio'
        videoSource.value = `local://${args.src}`
        break
      case 'image':
        playerMode.value = 'image'
        imageSource.value = `local://${args.src}`
        break
    }
  })
  myAPI.rtPlayerValues((args) => {
    playerValues.value = args
  })
})
</script>

<template>
  <q-page class="flex flex-center">
    <VideoPlayer
      v-if="playerMode === 'video'"
      ref="vp"
      style="width: 100%"
      :source="videoSource"
      controls
    />
    <q-img v-if="playerMode === 'image'" fit="cover" :src="imageSource" />
    <img v-if="playerMode === 'logo'" src="logo.png" />
    <q-btn color="yellow" @click="console.log(playerValues)">check</q-btn>
  </q-page>
</template>

<style scoped></style>
