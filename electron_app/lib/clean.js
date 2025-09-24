const { debugLog } = require("./debug");
const { getPrisma } = require("./database");

async function performClean() {
  try {
    const prisma = getPrisma();
    debugLog("info", "performClean: starting");
    // Delete old sessions (e.g., older than 7 days)
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 7);
    const deleted = await prisma.session.deleteMany({
      where: { createdAt: { lt: cutoffDate } , synced: true },
    });
    debugLog("info", `performClean: deleted ${deleted.count} old sessions`);
    return { ok: true, message: "clean completed" };
  } catch (err) {
    debugLog("error", "performClean error:", err);
    return { ok: false, error: String(err) };
  }
}

module.exports = { performClean };