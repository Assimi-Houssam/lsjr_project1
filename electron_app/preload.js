const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  createSession: (name) => ipcRenderer.invoke('create-session', name),
  getServerInfo: () => ipcRenderer.invoke('get-server-info'),
  getSessions: () => ipcRenderer.invoke('get-sessions'),
  onServerInfo: (cb) => ipcRenderer.on('server-info', (e, payload) => cb(payload)),
})
