const { ipcMain, app } = require("electron");
const { getPrismaClient } = require("./database");
const { getServerUrl } = require("./server");
const { getDebugLogs, clearDebugLogs, debugLog } = require("./debug");

function setupIpcHandlers() {
  // Debug handlers
  ipcMain.handle("get-debug-logs", async () => getDebugLogs());
  ipcMain.handle("clear-debug-logs", async () => clearDebugLogs());

  // System info handler
  ipcMain.handle("get-system-info", async () => ({
    platform: process.platform,
    arch: process.arch,
    nodeVersion: process.version,
    electronVersion: process.versions.electron,
    isPackaged: app.isPackaged,
    execPath: process.execPath,
    databaseUrl: process.env.DATABASE_URL,
  }));

  // Session handlers
  ipcMain.handle("create-session", async (ev, sessionName) => {
    const prisma = getPrismaClient();
    if (!prisma) {
      throw new Error("Database not available");
    }

    try {
      const sessionId = Date.now().toString(36);
      const session = await prisma.session.create({
        data: {
          sessionId: sessionId,
          name: sessionName || `Session ${sessionId}`,
        },
      });

      debugLog("info", "✅ Session created:", session.name);
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

  ipcMain.handle("get-sessions", async (ev, opt = {}) => {
    const prisma = getPrismaClient();
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

  ipcMain.handle("get-participants", async (ev, sessionId) => {
    const prisma = getPrismaClient();
    if (!prisma) {
      throw new Error("Database not available");
    }

    try {
      const participants = await prisma.participant.findMany({
        where: { session: { sessionId: sessionId } },
        include: { session: true },
        orderBy: { createdAt: "desc" },
      });
      return participants;
    } catch (error) {
      throw error;
    }
  });

  ipcMain.handle("session-qr", async (ev, sessionId) => {
    const prisma = getPrismaClient();
    if (!prisma) {
      throw new Error("Database not available");
    }

    try {
      const session = await prisma.session.findUnique({
        where: { sessionId: sessionId },
      });
      if (!session) {
        throw new Error("Session not found");
      }

      const qrData = `${getServerUrl()}/?sessionId=${sessionId}`;
      return { session, qrData, serverUrl: getServerUrl() };
    } catch (error) {
      debugLog("error", "❌ Error getting session QR:", error);
      throw error;
    }
  });

  // Placeholder handlers
  ipcMain.handle("get-particpant-details", async (ev, participantId) => {});
  ipcMain.handle("login", async (ev, username, password) => {});
  ipcMain.handle("sync-now", async (ev) => {});
  ipcMain.handle("server-info", async (ev, serverUrl) => {});
}

module.exports = { setupIpcHandlers };
