const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  createSession: (name) => ipcRenderer.invoke("create-session", name),
  getSessions: (opts) => ipcRenderer.invoke("get-sessions", opts),
  getSession: (sessionId) => ipcRenderer.invoke("session-qr", sessionId),
  getParticipant: (sessionId) =>
    ipcRenderer.invoke("get-participants", sessionId),
  server_info: (serverUrl) => ipcRenderer.invoke("server-info", serverUrl),

  // Debug functions
  getDebugLogs: () => ipcRenderer.invoke("get-debug-logs"),
  clearDebugLogs: () => ipcRenderer.invoke("clear-debug-logs"),
  getSystemInfo: () => ipcRenderer.invoke("get-system-info"),

  // Listen for debug events from main process
  onMainDebugLog: (callback) => {
    ipcRenderer.on("main-debug-log", (event, logEntry) => callback(logEntry));
    return () => ipcRenderer.removeAllListeners("main-debug-log");
  },
  onInitialDebugLogs: (callback) => {
    ipcRenderer.on("initial-debug-logs", (event, logs) => callback(logs));
    return () => ipcRenderer.removeAllListeners("initial-debug-logs");
  },
  onShowDebugPanel: (callback) => {
    ipcRenderer.on("show-debug-panel", () => callback());
    return () => ipcRenderer.removeAllListeners("show-debug-panel");
  },
});
