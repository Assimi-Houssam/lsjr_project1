const { app } = require("electron");
const path = require("path");
const fs = require("fs");
const { dbPath } = require("../config/paths");
const { debugLog } = require("./debug");

let prisma = null;

// Set database URL
process.env.DATABASE_URL = `file:${dbPath}`;

// Ensure database directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

async function ensureDatabaseSchema(prismaClient) {
  try {
    const result =
      await prismaClient.$queryRaw`SELECT name FROM sqlite_master WHERE type='table' AND name='Session';`;

    if (result.length === 0) {
      const sourceDbPath = app.isPackaged
        ? path.join(path.dirname(process.execPath), "prisma", "dev.db")
        : path.join(__dirname, "..", "prisma", "dev.db");

      if (fs.existsSync(sourceDbPath) && sourceDbPath !== dbPath) {
        await prismaClient.$disconnect();
        fs.copyFileSync(sourceDbPath, dbPath);
        debugLog("info", "✅ Database schema copied successfully");
        await prismaClient.$connect();
        return true;
      }
    }
    return true;
  } catch (error) {
    debugLog("error", "❌ Schema check failed:", error.message);
    return false;
  }
}

async function initializePrisma() {
  try {
    // Simplified Prisma initialization for packaged apps
    if (app.isPackaged) {
      // Set basic environment variables
      const schemaPath = path.join(
        path.dirname(process.execPath),
        "prisma",
        "schema.prisma"
      );
      const binaryPath = path.join(
        process.resourcesPath,
        "app.asar.unpacked",
        "node_modules",
        "@prisma",
        "engines"
      );

      if (fs.existsSync(schemaPath)) {
        process.env.PRISMA_SCHEMA_PATH = schemaPath;
      }

      if (fs.existsSync(binaryPath)) {
        const files = fs.readdirSync(binaryPath);
        const queryEngine = files.find(
          (f) => f.includes("query_engine") && f.endsWith(".dll.node")
        );
        const schemaEngine = files.find(
          (f) => f.includes("schema-engine") && f.endsWith(".exe")
        );

        if (queryEngine) {
          process.env.PRISMA_QUERY_ENGINE_LIBRARY = path.join(
            binaryPath,
            queryEngine
          );
        }
        if (schemaEngine) {
          process.env.PRISMA_SCHEMA_ENGINE_BINARY = path.join(
            binaryPath,
            schemaEngine
          );
        }
      }

      // Simple module resolution fix
      const Module = require("module");
      const originalResolve = Module._resolveFilename;
      Module._resolveFilename = function (request, parent, isMain) {
        if (
          request === ".prisma/client" ||
          request.startsWith(".prisma/client/")
        ) {
          const unpackedPath = path.join(
            process.resourcesPath,
            "app.asar.unpacked",
            "node_modules",
            request
          );
          if (fs.existsSync(unpackedPath)) {
            return fs.statSync(unpackedPath).isDirectory()
              ? path.join(unpackedPath, "index.js")
              : unpackedPath;
          }
        }
        return originalResolve.call(this, request, parent, isMain);
      };
    }

    const { PrismaClient } = require("@prisma/client");
    prisma = new PrismaClient({
      log: ["error", "warn"],
      datasources: { db: { url: process.env.DATABASE_URL } },
    });

    await prisma.$connect();
    await ensureDatabaseSchema(prisma);

    // Test connection
    await prisma.session.findMany({ take: 1 });
    debugLog("info", "✅ Database ready");

    return true;
  } catch (error) {
    debugLog("error", "❌ Database initialization failed:", error.message);
    prisma = null;
    return false;
  }
}

function getPrismaClient() {
  return prisma;
}

async function disconnectPrisma() {
  if (prisma) {
    await prisma.$disconnect();
    prisma = null;
  }
}

module.exports = {
  initializePrisma,
  getPrismaClient,
  disconnectPrisma,
};
