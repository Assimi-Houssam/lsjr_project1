const { app } = require("electron");
const path = require("path");

function getPaths() {
  // Configuration
  const HTTP_PORT = Number(process.env.LOCAL_HTTP_PORT || 3000);
  const HOST = "0.0.0.0";

  // Fix paths for packaged app
  const QUIZ_DIST = app.isPackaged
    ? path.join(path.dirname(process.execPath), "quiz", "dist")
    : path.join(__dirname, "..", "quiz", "dist");

  const ADMIN_DIST = app.isPackaged
    ? path.join(__dirname, "..", "rendrer", "dist")
    : path.join(__dirname, "..", "rendrer", "dist");

  const ASSETS_DIR = path.join(__dirname, "..", "assets");
  const PRELOAD_PATH = path.join(__dirname, "..", "preload.js");

  return {
    HTTP_PORT,
    HOST,
    QUIZ_DIST,
    ADMIN_DIST,
    ASSETS_DIR,
    PRELOAD_PATH,
  };
}

module.exports = {
  getPaths,
};
