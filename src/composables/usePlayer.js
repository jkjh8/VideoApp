import { ref } from 'vue'

const playerValues = ref({})
const playerMode = ref('logo')
const bgColor = ref('#fff')

const upv = (args) => {
  myAPI.updateState({ ...args })
}

const volumechanged = (obj) => {
  if (obj.muted) {
    upv({ type: 'volumechanged', volume: 0 })
  } else {
    upv({ type: 'volumechanged', volume: obj.volume })
  }
}

const playerCallback = (obj) => {
  obj.onplaying = (e) =>
    upv({ type: 'playing', status: 'play', readyState: obj.readyState })
  obj.onabort = () =>
    upv({ type: 'abort', status: 'stop', readyState: obj.readyState })
  obj.canplay = (e) =>
    upv({ type: 'canplay', status: 'ready', readyState: obj.readyState })
  obj.oncanplaythrough = (e) =>
    upv({ type: 'canplaythrough', status: 'ready', readyState: obj.readyState })
  obj.ondurationchange = (e) =>
    upv({
      type: 'durationchange',
      duration: obj.duration,
      readyState: obj.readyState
    })
  obj.onemptied = () =>
    upv({ type: 'emptied', status: 'emptied', readyState: obj.readyState })
  obj.onencrypted = () => upv({ type: 'encrypted', readyState: obj.readyState })
  obj.onended = () =>
    upv({ type: 'ended', status: 'ended', readyState: obj.readyState })
  obj.onerror = (e) =>
    upv({ type: 'error', errpr: obj.error, readyState: obj.readyState })
  obj.onloadeddata = (e) =>
    upv({
      type: 'loadeddata',
      src: obj.src,
      status: 'ready',
      readyState: obj.readyState
    })
  obj.onloadedmetadata = (e) =>
    upv({
      type: 'loadedmetadata',
      src: obj.src,
      status: 'ready',
      readyState: obj.readyState
    })
  obj.onloadstart = (e) =>
    upv({ type: 'loadstart', status: 'stop', readyState: obj.readyState })
  obj.onpause = (e) =>
    upv({ type: 'pause', status: 'paused', readyState: obj.readyState })
  obj.onplay = (e) =>
    upv({ type: 'play', status: 'play', readyState: obj.readyState })
  // obj.onprogress = (e) => upv({ type: 'progress', value: e.target.value })
  obj.onratechange = (e) => upv({ type: 'ratechange', rate: obj.playbackRate })
  // obj.onseeked = (e) => upv({ type: 'seeked', readyState: obj.readyState })
  // obj.onseeking = (e) => upv({ type: 'seeking', readyState: obj.readyState })
  obj.onstalled = (e) =>
    upv({ type: 'stalled', status: 'stop', readyState: obj.readyState })
  obj.onsuspend = (e) =>
    upv({ type: 'suspend', status: 'stop', readyState: obj.readyState })
  obj.ontimeupdate = (e) =>
    upv({
      type: 'timeupdate',
      currentTime: obj.currentTime,
      remaining: obj.duration - obj.currentTime
    })
  obj.onvolumechange = (e) => volumechanged(obj)
  obj.onwaiting = (e) => upv({ type: 'waiting', readyState: obj.readyState })
}

export { playerValues, playerMode, bgColor, upv, playerCallback }
