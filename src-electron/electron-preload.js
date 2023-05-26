const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  onPromise: async (args) => {
    return await ipcRenderer.invoke('onPromise', { ...args })
  }
})
