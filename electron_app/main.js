const { app, BrowserWindow, ipcMain, nativeImage } = require("electron");
const path = require("path");
const os = require("os");
const fs = require("fs");
const { spawn } = require("child_process");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// this init the prisma client if the generated client is available
let prisma = null;
try {
  const { PrismaClient } = require("@prisma/client");
  prisma = new PrismaClient();
} catch (e) {
  console.warn(
    "Prisma client not available. Run 'npx prisma generate' if you want DB persistence."
  );
  prisma = null;
}

function getLocalIPv4() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) return net.address;
    }
  }
  return "127.0.0.1";
}

// Configuration
const HTTP_PORT = Number(process.env.LOCAL_HTTP_PORT || 3000);
const HOST = "0.0.0.0";
// this for prod dits of quiz . Relative to electron_app/ main.js
const QUIZ_DIST = path.join(__dirname, "..", "quiz", "dist");
// (desktop UI)
const ADMIN_DIST = path.join(__dirname, "rendrer", "dist");

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
async function startHttpServer() {
  const appServer = express();
  appServer.use(cors());
  appServer.use(bodyParser.json({ limit: "2mb" }));

  if (fs.existsSync(QUIZ_DIST)) {
    appServer.use("/", express.static(QUIZ_DIST));
    console.log("Serving quiz static from", QUIZ_DIST);
  } else {
    console.warn(
      "Quiz dist not found at",
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
      // const {sessionid ,  data } = req.body
      console.log("Received submission for session", req.body);
      // if (!sessionid || typeof sessionid !== 'string' || !data || typeof data !== 'object') {
      //     return res.status(400).json({ ok: false, error: 'missing or invalid sessionId' })
      // }
      return res
        .status(400)
        .json({ ok: false, error: "submissions are disabled in this demo" });
      if (!prisma) {
        console.warn(
          "Prisma not initialized; accepted payload but did not persist:",
          payload
        );
        return res
          .status(202)
          .json({ ok: true, note: "received but not stored (no DB)" });
      }
      // find or create session
      const session = await prisma.session.findUnique({
        where: { sessionId: sessionid },
      });
      if (!session) {
        return res.status(400).json({ ok: false, error: "session not found" });
      }

      const participant = await prisma.participant.create({
        data: {
          sessionId: session.id,
          name: data.name || "",
          company: data.company || null,
          cin: data.cin || "",
          motif: data.motif || null,
        },
      });
      const ressult = await prisma.lsgrResult.create({
        data: {
          participantId: participant.id,
          lsgr1: data.lsgr1 || false,
          lsgr2: data.lsgr2 || false,
          lsgr3: data.lsgr3 || false,
          lsgr4: data.lsgr4 || false,
          lsgr5: data.lsgr5 || false,
          lsgr6: data.lsgr6 || false,
          lsgr7: data.lsgr7 || false,
          lsgr8: data.lsgr8 || false,
          lsgr9: data.lsgr9 || false,
          lsgr10: data.lsgr10 || false,
        },
      });
      return res.json({ ok: true });
    } catch (err) {
      console.error("submit-result error:", err);
      return res.status(500).json({ ok: false, error: String(err) });
    }
  });

  return new Promise((resolve, reject) => {
    httpServer = appServer.listen(HTTP_PORT, HOST, () => {
      // In development prefer localhost so the renderer / dev tools can reliably connect
      // Allow overriding via env var LOCAL_USE_LOCALHOST=1 to force localhost in other cases
      const useLocalhost =
        process.env.NODE_ENV === "development" ||
        process.env.LOCAL_USE_LOCALHOST === "1";
      const ip = useLocalhost ? "127.0.0.1" : getLocalIPv4();
      serverUrl = `http://${ip}:${HTTP_PORT}`;
      console.log(
        `HTTP server listening at ${serverUrl}` +
          (useLocalhost ? " (using localhost)" : "")
      );
      resolve();
    });
    httpServer.on("error", reject);
  });
}

// IPC handlers
ipcMain.handle("create-session", async (ev, sessionName) => {
  const sessionId = `session_${Date.now()}_${Math.random()
    .toString(36)
    .slice(2, 9)}`;
  if (prisma) {
    const s = await prisma.session.create({
      data: { sessionId, name: sessionName },
    });
    return { sessionId: s.sessionId, id: s.id, name: s.name, serverUrl };
  }
  return { sessionId, name: sessionName, serverUrl };
});

// add pagination  exclude the participant for now
ipcMain.handle("session-qr", async (ev, sessionId) => {
  if (!prisma) return { ok: false, error: "no DB" };
  if (!serverUrl) return { ok: false, error: "server not started" };
  const session = await prisma.session.findUnique({ where: { id : sessionId } });
  if (!session) return { ok: false, error: "session not found" };
 return { ok: true ,sessionId, name: session.name, serverUrl };
});


ipcMain.handle("get-sessions", async (ev, opt = {}) => {
  const { page = 1, pageSize = 7, search, to, from } = opt;
  const searchTerm =
    typeof search === "string" && search.trim() ? search.trim() : undefined;
  const fromDate = from ? new Date(from) : undefined;
  const toDate = to ? new Date(to) : undefined;
  const createdAtFilter = {};
  if (fromDate && !isNaN(fromDate.getTime())) createdAtFilter.gte = fromDate;
  if (toDate && !isNaN(toDate.getTime())) createdAtFilter.lte = toDate;
  const where = {
    ...(searchTerm && { name: { contains: searchTerm } }),
    ...(Object.keys(createdAtFilter).length && { createdAt: createdAtFilter }),
  };
  const sessions = await prisma.session.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const totalPages = Math.ceil(
    (await prisma.session.count({ where })) / pageSize
  );
  return { sessions, totalPages };
});

ipcMain.handle("get-participants", async (ev, sessionId) => {
  if (!prisma) return [];
  try {
    const session = await prisma.session.findUnique({
      where: { id : sessionId },
      include: { participants: { include: { results: true } } },
    });
    if (!session) return [];
    const participants = session.participants.map((p) => ({
      id: p.id,
      name: p.name,
      company: p.company,
      cin: p.cin,
      motif: p.motif,
      results: p.results,
    }));
    return {
        sessionName: session.name,
        data: participants
    };
  } catch (err) {
    console.error("Error fetching participants for session", sessionId, err);
    return [];
  }
});

// still  need to work around this  in the front end so i know tabel and entrie
ipcMain.handle("get-particpant-details", async (ev, participantId) => {}); //

// this until second app finished
ipcMain.handle("login", async (ev, username, password) => {}); 
ipcMain.handle("sync-now", async (ev) => {}); 

// --- app icon setup ---
const ICON_DIR = path.join(__dirname, "assets");
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

// Create BrowserWindow and load admin UI
async function createWindow() {
  // Prefer explicit dev URL for renderer if provided
  const devUrl = process.env.ELECTRON_RENDERER_URL;

  let loadUrl = null;
  if (devUrl) {
    loadUrl = devUrl;
    console.log("Loading admin renderer from dev URL:", devUrl);
  } else if (fs.existsSync(path.join(ADMIN_DIST, "index.html"))) {
    loadUrl = `file://${path.join(ADMIN_DIST, "index.html")}`;
    console.log("Loading admin renderer from packaged file://", loadUrl);
  } else if (serverUrl) {
    // fallback: load serverUrl (may serve quiz or a small admin page)
    loadUrl = serverUrl;
    console.log("Loading admin using serverUrl fallback:", loadUrl);
  } else {
    loadUrl = "about:blank";
  }

  const win = new BrowserWindow({
    width: 1500,
    height: 800,
    resizable: false,
    icon: appIcon || undefined,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.setResizable(false);

  // open DevTools in development to inspect why window is empty
  if (process.env.NODE_ENV === "development" || process.env.DEV === "1") {
  }
  win.webContents.openDevTools({ mode: "undocked" });

  await win.loadURL(loadUrl);
}

// App lifecycle
if (!app.requestSingleInstanceLock()) app.quit();

app.whenReady().then(async () => {
  try {
    if (prisma) await prisma.$connect();

    // Start HTTP server which will serve quiz static files and API
    await startHttpServer();

    // If START_VITE=1 we will spawn the quiz dev server and point phones + admin to it for dev testing
    if (process.env.START_VITE === "1") {
      try {
        const devUrl = await startViteDevServer();
        // override serverUrl so QR and IPC reflect Vite dev address
        serverUrl = devUrl;
        console.log("Vite dev server started at", devUrl);
      } catch (e) {
        console.error("Failed to start Vite dev server:", e);
      }
    }

    await createWindow();
  } catch (err) {
    console.error("Startup error:", err);
    app.quit();
  }
});

app.on("before-quit", async () => {
  try {
    if (httpServer) httpServer.close();
    stopViteDevServer();
    if (prisma) await prisma.$disconnect();
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
