require("dotenv").config();
const { app } = require("electron");

// Import modules
const { debugLog } = require("./lib/debug");
const { initializePrisma, disconnectPrisma } = require("./lib/database");
const { startHttpServer, closeServer } = require("./lib/server");
const { createWindow } = require("./lib/window");
const { setupIpcHandlers } = require("./lib/ipc-handlers");

// Setup IPC handlers
setupIpcHandlers();

// Set app ID for Windows
if (process.platform === "win32") {
  try {
    app.setAppUserModelId("com.localquizhub.app");
  } catch (e) {}
}

// Ensure single instance
if (!app.requestSingleInstanceLock()) {
  app.quit();
}

// App startup
app.whenReady().then(async () => {
  debugLog("info", "🚀 Starting LocalQuizHub...");

  try {
    // Initialize database
    debugLog("info", "🗄️ Initializing database...");
    const prismaReady = await initializePrisma();
    
    if (!prismaReady) {
      debugLog("warn", "⚠️ Database unavailable, running without persistence");
    }

    // Start HTTP server
    debugLog("info", "🌐 Starting HTTP server...");
    const serverUrl = await startHttpServer();

    // Create window
    debugLog("info", "🖥️ Creating main window...");
    await createWindow(serverUrl);

    debugLog("info", "✅ LocalQuizHub started successfully!");

  } catch (error) {
    debugLog("error", "❌ Startup failed:", error.message);
    
    if (app.isPackaged) {
      const { dialog } = require("electron");
      dialog.showErrorBox(
        "Startup Error", 
        `Failed to start LocalQuizHub:\n\n${error.message}`
      );
    }
  }
});

// App lifecycle
app.on("before-quit", async () => {
  try {
    closeServer();
    await disconnectPrisma();
    debugLog("info", "👋 LocalQuizHub shutdown complete");
  } catch (error) {
    console.error("Shutdown error:", error);
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Error handling
process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
  debugLog("error", "💥 Uncaught exception:", error.message);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled rejection:", reason);
  debugLog("error", "💥 Unhandled rejection:", String(reason));
});