const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  createSession: (name) => ipcRenderer.invoke('create-session', name),
  getSessions: (opts) => ipcRenderer.invoke('get-sessions', opts),
  getSession: (sessionId) => ipcRenderer.invoke('session-qr', sessionId),
  getParticipant: (sessionId) => ipcRenderer.invoke('get-participants', sessionId),
})
