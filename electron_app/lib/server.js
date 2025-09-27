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
                  </body>
                </html>
            `);
    });
  }

  appServer.post("/submit-result", async (req, res) => {
    try {
      console.log("Received submission for session", req.body);

      const prisma = getPrisma();
      if (!prisma) {
        return res
          .status(500)
          .json({ ok: false, error: "Database not initialized" });
      }
      debugLog("info", "submit-result body:", req.body);
      const session = await prisma.session.findUnique({
        where: { sessionId: req.body.sessionId },
      });
      if (!session) {
        return res.status(400).json({ ok: false, error: "Invalid sessionId" });
      }
      let participant = await prisma.participant.findFirst({
        where: {
          sessionId: session.id,
          name: req.body.define.name.toLowerCase(),
          company: req.body.define.company.toLowerCase(),
          motif: req.body.define.motif.toLowerCase(),
          cin: req.body.define.cin.toLowerCase(),
        },
      });
      debugLog("info", "Found participant:", participant);
      if (!participant) {
        participant = await prisma.participant.create({
          data: {
            sessionId: session.id,
            name: req.body.define.name.toLowerCase(),
            company: req.body.define.company.toLowerCase(),
            cin: req.body.define.cin.toLowerCase(),
            motif: req.body.define.motif.toLowerCase(),
          },
        });
      }
      await prisma.lsgrResult.create({
        data: {
          participantId: participant.id,
          lsgr1: req.body.data[0],
          lsgr2: req.body.data[1],
          lsgr3: req.body.data[2],
          lsgr4: req.body.data[3],
          lsgr5: req.body.data[4],
          lsgr6: req.body.data[5],
          lsgr7: req.body.data[6],
          lsgr8: req.body.data[7],
          lsgr9: req.body.data[8],
          lsgr10: req.body.data[9],
          result: req.body.data[10],
        },
      });
      await prisma.otherqcm.create({
        data: {
          participantId: participant.id,
          qcm1: req.body.data2[0],
          qcm2: req.body.data2[1],
          qcm3: req.body.data2[2],
          qcm4: req.body.data2[3],
          qcm5: req.body.data2[4],
          qcm6: req.body.data2[5],
          qcm7: req.body.data2[6],
          qcm8: req.body.data2[7],
          qcm9: req.body.data2[8],
          qcm10: req.body.data2[9],
          result: req.body.data[10],
        },
      });
      debugLog("info", "Result saved for participant:", participant.id);
      return res.json({ ok: true });
    } catch (err) {
      console.error("submit-result error:", err);
      debugLog("error", "submit-result error:", err);
      return res.status(500).json({ ok: false, error: String(err) });
    }
  });

  appServer.post("/participant-info", async (req, res) => {
    const prisma = getPrisma();
    if (!prisma) {
      return res.status(500).json({
        ok: false,
        erro: "Database not initialized",
      });
    }

    const participant = await prisma.participant.findFirst({
      where: {
        sessionId: session.id,
        name: req.body.define.name.toLowerCase(),
        company: req.body.define.company.toLowerCase(),
        cin: req.body.define.cin.toLowerCase(),
        motif: req.body.define.motif.toLowerCase(),
      },
      includes :{
        result : true,
        otherqcm : true,
      }
    });
    if (!participant){return res.status(204)}
    return res.status(200).json({lsgr : participant.result , otherqcm : participant.otherqcm})
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
