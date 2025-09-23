const express = require("express");
const cors = require("cors");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { app } = require("electron");
const { debugLog } = require("./debug");
const { getLocalIPv4, findAvailablePort } = require("./network");
const { getPrisma } = require("./database");

// Server configuration
const HOST = "0.0.0.0";
let serverUrl = null;
let httpServer = null;
let viteProcess = null;

function stopViteDevServer() {
  if (viteProcess && !viteProcess.killed) {
    try {
      viteProcess.kill();
    } catch (e) {
      /* ignore */
    }
  }
}

// expose quiz url and api endpoints
async function startHttpServer(HTTP_PORT, QUIZ_DIST) {
  // Find an available port if the default one is in use
  try {
    HTTP_PORT = await findAvailablePort(HTTP_PORT);
    debugLog("info", `🌐 Using port: ${HTTP_PORT}`);
  } catch (error) {
    debugLog("error", "❌ Could not find available port:", error.message);
    throw error;
  }

  const appServer = express();
  appServer.use(cors());
  appServer.use(express.json({ limit: "10mb" }));
  appServer.use(express.urlencoded({ extended: true, limit: "10mb" }));

  debugLog("info", "=== HTTP Server Setup ===");
  debugLog("info", "QUIZ_DIST:", QUIZ_DIST);
  debugLog("info", "QUIZ_DIST exists:", fs.existsSync(QUIZ_DIST));

  // Additional debugging for packaged apps
  if (app.isPackaged) {
    debugLog("info", "📁 Process execPath:", process.execPath);
    debugLog(
      "info",
      "📁 Process execPath dirname:",
      path.dirname(process.execPath)
    );
    const quizDir = path.join(path.dirname(process.execPath), "quiz");
    debugLog("info", "📁 Quiz directory path:", quizDir);
    debugLog("info", "📁 Quiz directory exists:", fs.existsSync(quizDir));

    if (fs.existsSync(quizDir)) {
      const quizContents = fs.readdirSync(quizDir);
      debugLog("info", "📋 Quiz directory contents:", quizContents);

      if (quizContents.includes("dist")) {
        const quizDistContents = fs.readdirSync(path.join(quizDir, "dist"));
        debugLog("info", "📋 Quiz/dist contents:", quizDistContents);
      }
    }
  }

  if (fs.existsSync(QUIZ_DIST)) {
    appServer.use("/", express.static(QUIZ_DIST));
    debugLog("info", "✅ Serving quiz static from", QUIZ_DIST);

    // Test if index.html exists
    const indexPath = path.join(QUIZ_DIST, "index.html");
    debugLog("info", "📄 index.html exists:", fs.existsSync(indexPath));

    if (fs.existsSync(indexPath)) {
      const indexStats = fs.statSync(indexPath);
      debugLog("info", "📄 index.html size:", indexStats.size, "bytes");
    }
  } else {
    debugLog(
      "error",
      "❌ Quiz dist not found at",
      QUIZ_DIST,
      " — build quiz and copy it to that folder for phones to load it."
    );
    // provide a small helpful fallback at root so BrowserWindow is not blank
    appServer.get("/", (req, res) => {
      res.send(`
                <html>
                  <head><meta charset="utf-8"><title>No quiz build</title></head>
                  <body style="font-family: sans-serif; padding: 24px;">
                    <h2>Quiz not built</h2>
                    <p>The quiz static files were not found on the host.</p>
                    <p>Build the quiz and copy <code>quiz/dist</code> into the Electron app folder.</p>
                    <p>Server info: <a href="/server-info">/server-info</a></p>
                  </body>
                </html>
            `);
    });
  }

  appServer.post("/submit-result", async (req, res) => {
    try {
      console.log("Received submission for session", req.body);
      return res
        .status(400)
        .json({ ok: false, error: "submissions are disabled in this demo" });

      const prisma = getPrisma();
      if (!prisma) {
        console.warn(
          "Prisma not initialized; accepted payload but did not persist:",
          req.body
        );
        return res
          .status(202)
          .json({ ok: true, note: "received but not stored (no DB)" });
      }

      // Database operations would go here when enabled
      return res.json({ ok: true });
    } catch (err) {
      console.error("submit-result error:", err);
      return res.status(500).json({ ok: false, error: String(err) });
    }
  });

  appServer.get("/server-info", (req, res) => {
    const networkInfo = {
      serverUrl,
      host: HOST,
      port: HTTP_PORT,
      ip: getLocalIPv4(),
      quizDistExists: fs.existsSync(QUIZ_DIST),
      quizDistPath: QUIZ_DIST,
      platform: process.platform,
      networkInterfaces: os.networkInterfaces(),
      timestamp: new Date().toISOString(),
      accessedFrom: req.ip || req.connection.remoteAddress,
    };
    res.json(networkInfo);
  });

  return new Promise((resolve, reject) => {
    httpServer = appServer.listen(HTTP_PORT, HOST, () => {
      const useLocalhost =
        process.env.NODE_ENV === "development" ||
        process.env.LOCAL_USE_LOCALHOST === "1";
      const ip = useLocalhost ? "127.0.0.1" : getLocalIPv4();
      serverUrl = `http://${ip}:${HTTP_PORT}`;

      // Additional server info logging
      debugLog("info", "🌐 Server details:");
      debugLog("info", "  - Host:", HOST);
      debugLog("info", "  - Port:", HTTP_PORT);
      debugLog("info", "  - IP:", ip);
      debugLog("info", "  - Use localhost:", useLocalhost);
      debugLog("info", "  - Server URL:", serverUrl);

      resolve({ serverUrl, httpPort: HTTP_PORT });
    });

    httpServer.on("error", (err) => {
      debugLog("error", "❌ HTTP server error:", err);
      reject(err);
    });
  });
}

function getServerUrl() {
  return serverUrl;
}

function getHttpServer() {
  return httpServer;
}

function closeHttpServer() {
  if (httpServer) {
    httpServer.close();
    httpServer = null;
    serverUrl = null;
  }
}

module.exports = {
  startHttpServer,
  getServerUrl,
  getHttpServer,
  closeHttpServer,
  stopViteDevServer,
};
