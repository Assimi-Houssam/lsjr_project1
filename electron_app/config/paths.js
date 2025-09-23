const { app } = require("electron");
const path = require("path");

// Database path configuration - PORTABLE VERSION
const dbPath = app.isPackaged
  ? path.join(path.dirname(process.execPath), "data", "app.db")
  : path.join(__dirname, "..", "prisma", "dev.db");

// Quiz and Admin paths
const QUIZ_DIST = app.isPackaged
  ? path.join(path.dirname(process.execPath), "quiz", "dist")
  : path.join(__dirname, "..", "quiz", "dist");

const ADMIN_DIST = app.isPackaged
  ? path.join(__dirname, "..", "rendrer", "dist")
  : path.join(__dirname, "..", "rendrer", "dist");

// Assets
const ICON_DIR = path.join(__dirname, "..", "assets");
const ICON_PNG = path.join(ICON_DIR, "logo.png");

module.exports = {
  dbPath,
  QUIZ_DIST,
  ADMIN_DIST,
  ICON_DIR,
  ICON_PNG,
};
