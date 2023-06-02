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
        playerMode.value = 'audio' // audio mode
        videoSource.value = `local://${args.src}`
        break
      case 'image':
        playerMode.value = 'image'
        imageSource.value = `local://${args.src}`
        break
    }
    console.log(playerMode.value)
  })
  myAPI.rtPlayerValues((args) => {
    playerValues.value = args
  })
  myAPI.command((args) => {
    switch (args.command) {
      case 'ended':
        playerMode.value = 'logo'
        break
    }
  })
})
</script>

<template>
  <q-page class="flex flex-center">
    <!-- video & audio player -->
    <Transition>
      <VideoPlayer
        v-show="playerMode === 'video'"
        ref="vp"
        style="width: 100%"
        :source="videoSource"
      />
    </Transition>
    <!-- image -->
    <Transition>
      <q-img v-if="playerMode === 'image'" fit="cover" :src="imageSource" />
    </Transition>
    <!-- logo -->
    <Transition>
      <img
        v-if="playerMode === 'logo' || playerMode === 'audio'"
        style="width: 200px"
        src="harman-logo.svg"
      />
    </Transition>
  </q-page>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
