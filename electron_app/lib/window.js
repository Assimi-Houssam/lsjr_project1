const { BrowserWindow, nativeImage, app } = require("electron");
const path = require("path");
const fs = require("fs");
const { debugLog, getDebugLogs } = require("./debug");
const { getServerUrl } = require("./server");


// App icon setup
function setupAppIcon() {
  const ICON_DIR = path.join(__dirname, "..", "assets");
  const ICON_PNG = path.join(ICON_DIR, "logo.png");
  let appIcon = null;

  if (fs.existsSync(ICON_PNG)) {
    try {
      appIcon = nativeImage.createFromPath(ICON_PNG);
    } catch (e) {
      console.warn("Failed to load icon:", e);
    }
  }

  // On Windows ensure AppUserModelId is set for proper taskbar/icon behaviour
  if (process.platform === "win32") {
    try {
      app.setAppUserModelId("com.localquizhub.app");
    } catch (e) {}
  }

  return appIcon;
}

// Create BrowserWindow and load admin UI
async function createWindow() {
  const appIcon = setupAppIcon();

  // Prefer explicit dev URL for renderer if provided
  const devUrl = process.env.ELECTRON_RENDERER_URL;

  // Fix paths for packaged app
  const ADMIN_DIST = app.isPackaged
    ? path.join(__dirname, "..", "rendrer", "dist")
    : path.join(__dirname, "..", "rendrer", "dist");

  let loadUrl = null;
  if (devUrl) {
    loadUrl = devUrl;
    debugLog("info", "Loading admin renderer from dev URL:", devUrl);
  } else if (fs.existsSync(path.join(ADMIN_DIST, "index.html"))) {
    loadUrl = `file://${path.join(ADMIN_DIST, "index.html")}`;
    debugLog("info", "Loading admin renderer from packaged file://", loadUrl);
  } else if (getServerUrl()) {
    // fallback: load serverUrl (may serve quiz or a small admin page)
    loadUrl = getServerUrl();
    debugLog("info", "Loading admin using serverUrl fallback:", loadUrl);
  } else {
    loadUrl = "about:blank";
  }

  const win = new BrowserWindow({
    width: 1400,
    height: 800,
    frame: true, 
    titleBarStyle: "default",
    titleBarOverlay: {
      color: "#2f2f2f",
      symbolColor: "#ded5d5",
    },
    resizable: false,
    icon: appIcon || undefined,
    webPreferences: {
      preload: path.join(__dirname, "..", "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.setResizable(false);

  // Remove menu bar (File, Edit, View, etc.)
  win.setMenuBarVisibility(false);
  win.setAutoHideMenuBar(true);

  // Add keyboard shortcuts for debugging
  win.webContents.on("before-input-event", (event, input) => {
    // F12 to toggle DevTools
    if (
      input.key === "F12" &&
      (process.env.NODE_ENV === "development" || process.env.DEV === "1")
    ) {
      win.webContents.toggleDevTools();
    }
    // Ctrl+Shift+D to open debug logs
    if (input.control && input.shift && input.key.toLowerCase() === "d") {
      win.webContents.send("show-debug-panel");
    }
    // Ctrl+Shift+R to reload (useful for debugging)
    if (input.control && input.shift && input.key.toLowerCase() === "r") {
      win.reload();
    }
  });

  // Only open DevTools in development
  if (process.env.NODE_ENV === "development" || process.env.DEV === "1") {
    win.webContents.openDevTools({ mode: "undocked" });
  }

  // Send debug logs to renderer when ready
  win.webContents.once("did-finish-load", () => {
    debugLog("info", "🖥️ Renderer loaded, sending initial debug logs");
    win.webContents.send("initial-debug-logs", getDebugLogs());
  });

  await win.loadURL(loadUrl);
  return win;
}

module.exports = {
  createWindow,
  setupAppIcon,
};
