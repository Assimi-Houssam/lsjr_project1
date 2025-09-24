const cron = require("node-cron"); // npm i node-cron
const { BrowserWindow } = require("electron");
const { debugLog } = require("./debug");
const { performSync } = require("./sync");
const { performClean } = require("./clean");

// Example job: run every minute (change schedule as needed)
let task = null;

function broadcast(channel, payload) {
  BrowserWindow.getAllWindows().forEach((w) => {
    try {
      w.webContents.send(channel, payload);
    } catch (err) {
      debugLog("error", "broadcast error", err);
    }
  });
}

function startCron() {
  if (task) return;
  // run every 15 minutes:
  task = cron.schedule(
    "*/15 * * * *",
    async () => {
      debugLog("info", "cron: running scheduled task");
      try {
        await performSync();
        await performClean();
        broadcast("cron-success", { message: "Cron job completed successfully" });
      } catch (err) {
        debugLog("error", "cron job failed", err);
        broadcast("cron-error", { error: String(err) });
      }
    },
    { scheduled: true }
  );
}

function stopCron() {
  if (task) {
    task.stop();
    task = null;
  }
}

module.exports = { startCron, stopCron, broadcast };
