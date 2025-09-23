const { ipcMain, app } = require("electron");
const { debugLog, getDebugLogs, clearDebugLogs } = require("./debug");
const { getPrisma } = require("./database");
const { getServerUrl } = require("./server");

function setupIpcHandlers() {
  // Session management
  ipcMain.handle("create-session", async (ev, sessionName) => {
    const prisma = getPrisma();
    if (!prisma) {
      debugLog("error", "❌ Database not available for create-session");
      throw new Error("Database not available");
    }
    try {
      debugLog("info", "Creating session:", sessionName);
      const sessionId = Date.now().toString(36);

      const session = await prisma.session.create({
        data: {
          sessionId: sessionId,
          name: sessionName || `Session ${sessionId}`,
        },
      });

      debugLog("info", "✅ Session created:", session);
      return {
        sessionId: session.sessionId,
        id: session.id,
        name: session.name,
        serverUrl: getServerUrl(),
      };
    } catch (error) {
      debugLog("error", "❌ Error creating session:", error);
      throw error;
    }
  });

  // Debug log handlers
  ipcMain.handle("get-debug-logs", async (ev) => {
    return getDebugLogs();
  });

  ipcMain.handle("clear-debug-logs", async (ev) => {
    return clearDebugLogs();
  });

  // System info handler
  ipcMain.handle("get-system-info", async (ev) => {
    return {
      platform: process.platform,
      arch: process.arch,
      nodeVersion: process.version,
      electronVersion: process.versions.electron,
      isPackaged: app.isPackaged,
      execPath: process.execPath,
      resourcesPath: process.resourcesPath,
      appPath: app.getAppPath(),
      userData: app.getPath("userData"),
      prismaEnvVars: Object.keys(process.env)
        .filter((key) => key.startsWith("PRISMA_"))
        .reduce((acc, key) => {
          acc[key] = process.env[key];
          return acc;
        }, {}),
      databaseUrl: process.env.DATABASE_URL,
    };
  });

  // Session QR handler
  ipcMain.handle("session-qr", async (ev, sessionId) => {
    const prisma = getPrisma();
    if (!prisma) {
      throw new Error("Database not available");
    }
    try {
      const session = await prisma.session.findUnique({
        where: { sessionid: sessionId },
      });
      if (!session) {
        throw new Error("Session not found");
      }
      const qrData = `${getServerUrl()}/?sessionId=${sessionId}`;
      return {
        session,
        qrData,
        serverUrl: getServerUrl(),
      };
    } catch (error) {
      console.error("❌ Error getting session QR:", error);
      throw error;
    }
  });

  // Get sessions handler
  ipcMain.handle("get-sessions", async (ev, opt = {}) => {
    const prisma = getPrisma();
    if (!prisma) {
      throw new Error("Database not available");
    }
    try {
      const { page = 1, pageSize = 7, search, to, from } = opt;
      const searchTerm =
        typeof search === "string" && search.trim() ? search.trim() : undefined;
      const fromDate = from ? new Date(from) : undefined;
      const toDate = to ? new Date(to) : undefined;
      const createdAtFilter = {};
      if (fromDate && !isNaN(fromDate.getTime()))
        createdAtFilter.gte = fromDate;
      if (toDate && !isNaN(toDate.getTime())) createdAtFilter.lte = toDate;
      const where = {
        ...(searchTerm && { name: { contains: searchTerm } }),
        ...(Object.keys(createdAtFilter).length && {
          createdAt: createdAtFilter,
        }),
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
    } catch (error) {
      throw error;
    }
  });

  // Get participants for a specific session
  ipcMain.handle("get-participants", async (ev, sessionId) => {
    const prisma = getPrisma();
    if (!prisma) {
      throw new Error("Database not available");
    }
    try {
      console.log("Getting participants for session:", sessionId);

      const participants = await prisma.participant.findMany({
        where: {
          session: {
            sessionId: sessionId,
          },
        },
        include: {
          session: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return participants;
    } catch (error) {
      throw error;
    }
  });

  // Server info handler
  ipcMain.handle("server-info", async (ev, serverUrl) => {
    try {
      // Implementation for server info if needed
    } catch (error) {
      throw error;
    }
  });

  // Placeholder handlers for future implementation
  ipcMain.handle("get-particpant-details", async (ev, participantId) => {
    // Still need to work around this in the front end so i know table and entries
  });

  ipcMain.handle("login", async (ev, username, password) => {
    // This until second app finished
  });

  ipcMain.handle("sync-now", async (ev) => {
    // Send request to server to see if u can sync now if yes sync if not need to prompt user to login
  });

  debugLog("info", "✅ IPC handlers registered");
}

module.exports = {
  setupIpcHandlers,
};
