<script setup>
import { onMounted } from 'vue'
import { bgColor } from 'src/composables/usePlayer.js'

const fnUpdateWindowSize = () => {
  myAPI.updateWindowSize({
    height: window.innerHeight,
    width: window.innerWidth
  })
}

onMounted(() => {
  window.addEventListener('resize', () => {
    fnUpdateWindowSize()
  })
  fnUpdateWindowSize()
})
</script>

<template>
  <q-layout view="lHh Lpr lFf" class="layout">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.layout {
  background: v-bind(bgColor);
}
</style>
