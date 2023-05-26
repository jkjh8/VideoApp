const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  onPromise: async (args) => {
    return await ipcRenderer.invoke('onPromise', { ...args })
  },
  writeLogs: (args) => {
    ipcRenderer.send('log', { ...args })
  },
  updateDuration: (time) => {
    ipcRenderer.send('updateDuration', time)
  },
  updateTimes: (cur, remaining) => {
    ipcRenderer.send('updateTimes', cur, remaining)
  },
  updateState: (args) => {
    ipcRenderer.send('updateState', { ...args })
  }
})
