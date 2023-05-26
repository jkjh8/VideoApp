import { ref } from 'vue'

const source = ref('')
const sources = ref([
  {
    src: 'https://www2.iis.fraunhofer.de/AAC/ChID-BLITS-EBU.mp4',

    type: 'video/mp4'
  },
  {
    src: 'http://www.peach.themazzone.com/durian/movies/sintel-2048-surround.mp4',
    type: 'video/mp4'
  }
])

export { source, sources }
