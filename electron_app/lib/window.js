const { BrowserWindow, nativeImage } = require("electron");
const path = require("path");
const fs = require("fs");
const { ADMIN_DIST, ICON_PNG } = require("../config/paths");
const { debugLog } = require("./debug");

let appIcon = null;
if (fs.existsSync(ICON_PNG)) {
  try {
    appIcon = nativeImage.createFromPath(ICON_PNG);
  } catch (e) {
    console.warn("Failed to load icon:", e);
  }
}

async function createWindow(serverUrl) {
  const devUrl = process.env.ELECTRON_RENDERER_URL;

  let loadUrl = null;
  if (devUrl) {
    loadUrl = devUrl;
  } else if (fs.existsSync(path.join(ADMIN_DIST, "index.html"))) {
    loadUrl = `file://${path.join(ADMIN_DIST, "index.html")}`;
  } else if (serverUrl) {
    loadUrl = serverUrl;
  } else {
    loadUrl = "about:blank";
  }

  const win = new BrowserWindow({
    width: 1500,
    height: 800,
    resizable: false,
    icon: appIcon || undefined,
    webPreferences: {
      preload: path.join(__dirname, "..", "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Store global reference for debug logging
  global.mainWindow = win;
  win.setResizable(false);

  // Add keyboard shortcuts
  win.webContents.on("before-input-event", (event, input) => {
    if (input.key === "F12") {
      win.webContents.toggleDevTools();
    }
    if (input.control && input.shift && input.key.toLowerCase() === "d") {
      win.webContents.send("show-debug-panel");
    }
    if (input.control && input.shift && input.key.toLowerCase() === "r") {
      win.reload();
    }
  });

  // Open DevTools in development
  if (process.env.NODE_ENV === "development" || process.env.DEV === "1") {
    win.webContents.openDevTools({ mode: "undocked" });
  }

  // Send debug logs when ready
  win.webContents.once("did-finish-load", () => {
    debugLog("info", "🖥️ Renderer loaded");
    const { getDebugLogs } = require("./debug");
    win.webContents.send("initial-debug-logs", getDebugLogs());
  });

  await win.loadURL(loadUrl);
  return win;
}

module.exports = { createWindow };
