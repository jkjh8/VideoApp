const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  onPromise: async (args) => {
    return await ipcRenderer.invoke('onPromise', { ...args })
  },
  writeLogs: (args) => {
    ipcRenderer.send('log', { ...args })
  },
  updateState: (args) => {
    ipcRenderer.send('updateState', { ...args })
  },
  updateWindowSize: (args) => {
    ipcRenderer.send('updateWindowSize', { ...args })
  },
  open: (fn) => {
    ipcRenderer.on('open', (e, ...args) => {
      fn(...args)
    })
  },
  command: (fn) => {
    ipcRenderer.on('command', (e, ...args) => {
      fn(...args)
    })
  },
  pCommand: (fn) => {
    ipcRenderer.on('pCommand', (e, ...args) => {
      console.log(args)
      fn(...args)
    })
  },
  rtpState: (fn) => {
    ipcRenderer.on('rtpState', (e, value) => {
      fn(value)
    })
  }
})
