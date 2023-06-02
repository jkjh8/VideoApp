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
    pStatus.value = { ...args.values }
    switch (args.mode) {
      case 'video':
        pMode.value = 'video'
        videoSource.value = `local://${args.src}`
        break
      case 'audio':
        pMode.value = 'audio' // audio mode
        videoSource.value = `local://${args.src}`
        break
      case 'image':
        pMode.value = 'image'
        imageSource.value = `local://${args.src}`
        break
    }
    console.log(pMode.value)
  })
  myAPI.rtpv((args) => {
    pStatus.value = args
  })
  myAPI.command((args) => {
    switch (args.command) {
      case 'ended':
        pMode.value = 'logo'
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
        v-show="pMode === 'video'"
        ref="vp"
        style="width: 100%"
        :source="videoSource"
      />
    </Transition>
    <!-- image -->
    <Transition>
      <q-img v-if="pMode === 'image'" fit="cover" :src="imageSource" />
    </Transition>
    <!-- logo -->
    <Transition>
      <img
        v-if="pMode === 'logo' || pMode === 'audio'"
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
