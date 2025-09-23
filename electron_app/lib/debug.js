// Debug logging system for main process
let debugLogs = [];
const MAX_DEBUG_LOGS = 100;

function debugLog(level, ...args) {
  const timestamp = new Date().toISOString();
  const message = args
    .map((arg) =>
      typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
    )
    .join(" ");

  const logEntry = {
    timestamp,
    level,
    message,
    id: Date.now() + Math.random(),
  };

  debugLogs.unshift(logEntry);
  if (debugLogs.length > MAX_DEBUG_LOGS) {
    debugLogs = debugLogs.slice(0, MAX_DEBUG_LOGS);
  }

  // Also log to console
  console[level] ? console[level](...args) : console.log(...args);

  // Send to renderer if window exists
  if (global.mainWindow && !global.mainWindow.isDestroyed()) {
    global.mainWindow.webContents.send("main-debug-log", logEntry);
  }
}

function getDebugLogs() {
  return debugLogs;
}

function clearDebugLogs() {
  debugLogs = [];
  return true;
}

module.exports = { debugLog, getDebugLogs, clearDebugLogs };
