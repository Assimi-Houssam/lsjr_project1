const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const os = require("os");
const { QUIZ_DIST } = require("../config/paths");
const { getLocalIPv4, findAvailablePort } = require("./network");
const { getPrismaClient } = require("./database");
const { debugLog } = require("./debug");

let httpServer = null;
let serverUrl = null;

async function startHttpServer(initialPort = 3000) {
  const HOST = "0.0.0.0";
  const HTTP_PORT = await findAvailablePort(initialPort);

  const app = express();
  app.use(cors());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Serve quiz static files
  if (fs.existsSync(QUIZ_DIST)) {
    app.use("/", express.static(QUIZ_DIST));
    debugLog("info", "✅ Serving quiz from:", QUIZ_DIST);
  } else {
    app.get("/", (req, res) => {
      res.send(`
        <html>
          <head><title>Quiz not built</title></head>
          <body>
            <h2>Quiz not built</h2>
            <p>Build the quiz first.</p>
          </body>
        </html>
      `);
    });
  }

  // API endpoints
  app.post("/submit-result", async (req, res) => {
    try {
      console.log("Received submission:", req.body);
      return res.status(400).json({
        ok: false,
        error: "submissions are disabled in this demo",
      });
    } catch (err) {
      console.error("submit-result error:", err);
      return res.status(500).json({ ok: false, error: String(err) });
    }
  });

  app.get("/server-info", (req, res) => {
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
    httpServer = app.listen(HTTP_PORT, HOST, () => {
      const useLocalhost = process.env.NODE_ENV === "development";
      const ip = useLocalhost ? "127.0.0.1" : getLocalIPv4();
      serverUrl = `http://${ip}:${HTTP_PORT}`;

      debugLog("info", "✅ HTTP server started at:", serverUrl);
      resolve(serverUrl);
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

function closeServer() {
  if (httpServer) {
    httpServer.close();
    httpServer = null;
  }
}

module.exports = { startHttpServer, getServerUrl, closeServer };
