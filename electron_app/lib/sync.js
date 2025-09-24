const { debugLog } = require("./debug");
const { getPrisma } = require("./database");

async function performSync() {
  try {
    const prisma = getPrisma();
    debugLog("info", "performSync: starting");

    const user = prisma.user.findFirst();
    if (!user || !user.url) {
        debugLog("info", "performSync: no remote URL configured, skipping sync");
        return { ok: false, error: "No remote URL configured" };
    }
    const remoteUrl = user.url.trim();
    const sessions = await prisma.session.findMany({
      where: { synced: false },
      include: { participants: { include: { results: true } } },
    });
    if (sessions.length === 0) {
      debugLog("info", "performSync: no unsynced sessions found");
      return { ok: true, message: "No unsynced sessions" };
    }

    // Sync each session
    for (const session of sessions) {
      debugLog("info", `performSync: syncing session ${session.id}`);
      // post req session data to remote server if fetch fail break  and return errror
      // after successful sync, mark session as synced
    //   await prisma.session.update({
    //     where: { id: session.id },
    //     data: { synced: true },
    //   });
    }

    return { ok: true, message: "Sync completed" };
  } catch (err) {
    debugLog("error", "performSync error:", err);
    return { ok: false, error: String(err) };
  }
}

module.exports = { performSync };