<script setup>
import { ref, onMounted } from 'vue'
import VideoPlayer from 'src/components/VideoPlayer'
import { info, warn, error } from 'src/composables/useLogger'
import { pStatus, pMode } from 'src/composables/usePlayer'

const vp = ref(null)
const videoSource = ref('')
const imageSource = ref('')
const audioSource = ref('')

onMounted(() => {
  myAPI.open((args) => {
    try {
      pStatus.value = { ...args.values }
      console.log('load', args)
      switch (args.type) {
        case 'video':
        case 'audio':
          videoSource.value = `local://${args.src}`
          break
        case 'image':
          // pMode.value = 'image'
          imageSource.value = `local://${args.src}`
          break
      }
      console.log('mode', pMode.value)
    } catch (err) {
      console.error('open file error', err)
    }
  })
  myAPI.rtpState((args) => {
    pStatus.value = args
    console.log('status', pStatus.value)
  })
  myAPI.command((args) => {
    switch (args.command) {
      case 'play':
        pMode.value = pStatus.value.file.type
        break
      case 'ended':
        pMode.value = 'logo'
        break
      case 'showLogo':
        pMode.value = 'logo'
        break
    }
    console.log('command', args)
  })
})
</script>

<template>
  <q-page class="flex flex-center">
    <!-- video & audio player -->

    <VideoPlayer
      v-show="pMode === 'video'"
      ref="vp"
      style="width: 100%"
      :source="videoSource"
    />

    <!-- image -->

    <q-img v-show="pMode === 'image'" fit="cover" :src="imageSource" />

    <!-- logo -->

    <img
      v-show="pMode === 'logo' || pMode === 'audio'"
      style="width: 200px"
      src="harman-logo.svg"
    />
  </q-page>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
