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
  open: (fn) => {
    ipcRenderer.on('open', (e, ...args) => {
      fn(...args)
    })
  },
  rtPlayerValues: (fn) => {
    ipcRenderer.on('rtPlayerValues', (e, value) => {
      fn(value)
    })
  }
})
