require("dotenv").config();
const { app } = require("electron");
const {startCron, stopCron} = require("./lib/cronjob");

// Import our modular components
const { debugLog } = require("./lib/debug");
const { initializePrisma, disconnectPrisma } = require("./lib/database");
const {
  startHttpServer,
  closeHttpServer,
  stopViteDevServer,
} = require("./lib/server");
const { setupIpcHandlers } = require("./lib/ipc-handlers");
const { createWindow } = require("./lib/window");
const { getPaths } = require("./config/paths");

// Get configuration
const { HTTP_PORT, QUIZ_DIST, ADMIN_DIST } = getPaths();

// App lifecycle
if (!app.requestSingleInstanceLock()) app.quit();

app.whenReady().then(async () => {
  debugLog("info", "=== 🚀 App Startup Debug Info ===");
  debugLog("info", "📦 Is packaged:", app.isPackaged);
  debugLog("info", "📁 App path:", app.getAppPath());
  debugLog("info", "📁 __dirname:", __dirname);
  debugLog("info", "📁 QUIZ_DIST:", QUIZ_DIST);
  debugLog("info", "📁 ADMIN_DIST:", ADMIN_DIST);
  debugLog("info", "✅ QUIZ_DIST exists:", require("fs").existsSync(QUIZ_DIST));
  debugLog(
    "info",
    "✅ ADMIN_DIST exists:",
    require("fs").existsSync(ADMIN_DIST)
  );

  try {
    // Initialize Prisma first
    debugLog("info", "🗄️ Initializing database...");
    const prismaReady = await initializePrisma();

    if (!prismaReady) {
      debugLog(
        "warn",
        "⚠️ Database initialization failed, app will run without persistence"
      );
    }

    // Setup IPC handlers
    debugLog("info", "🔗 Setting up IPC handlers...");
    setupIpcHandlers();

    debugLog("info", "🌐 Starting HTTP server...");
    const serverResult = await startHttpServer(HTTP_PORT, QUIZ_DIST);
    debugLog("info", "✅ HTTP server started at:", serverResult.serverUrl);

    debugLog("info", "🖥️ Creating main window...");
    await createWindow();
    debugLog("info", "✅ Window created");
    startCron();
    debugLog("info", "🕑 Cron job started");

    debugLog("info", "=== ✅ App startup completed successfully ===");
  } catch (err) {
    debugLog("error", "❌ Startup error:", err);

    // Show error dialog in packaged app
    if (app.isPackaged) {
      const { dialog } = require("electron");
      dialog.showErrorBox(
        "Startup Error",
        `Failed to start LocalQuizHub:\n\n${err.message}\n\nPress F12 in the app to open DevTools and see detailed logs.\n\nPress Ctrl+Shift+D to see debug logs.`
      );
    }
  }
});

app.on("before-quit", async () => {
  try {
    stopCron();
    closeHttpServer();
    stopViteDevServer();
    await disconnectPrisma();
  } catch (e) {
    console.error("Error during shutdown:", e);
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

process.on("uncaughtException", (err) =>
  console.error("uncaughtException", err)
);
process.on("unhandledRejection", (r) => console.error("unhandledRejection", r));
