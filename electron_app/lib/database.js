const { app } = require("electron");
const path = require("path");
const fs = require("fs");
const { debugLog } = require("./debug");

// Database configuration
let prisma = null;

function getDatabasePath() {
  // Set database path BEFORE initializing Prisma - PORTABLE VERSION
  const dbPath = app.isPackaged
    ? path.join(path.dirname(process.execPath), "data", "app.db") // ← PORTABLE PATH
    : path.join(__dirname, "..", "prisma", "dev.db");

  return dbPath;
}

function configureDatabaseEnvironment() {
  const dbPath = getDatabasePath();
  process.env.DATABASE_URL = `file:${dbPath}`;

  debugLog("info", "=== DATABASE CONFIGURATION ===");
  debugLog("info", "Database path set to:", dbPath);
  debugLog("info", "Is packaged:", app.isPackaged);
  debugLog("info", "User data path:", app.getPath("userData"));

  // Ensure the database directory exists
  const dbDir = path.dirname(dbPath);
  if (!fs.existsSync(dbDir)) {
    debugLog("info", "Creating database directory:", dbDir);
    fs.mkdirSync(dbDir, { recursive: true });
  } else {
    debugLog("info", "Database directory exists:", dbDir);
  }

  return dbPath;
}

// Function to ensure database schema exists using Prisma push
async function ensureDatabaseSchema(prismaClient) {
  debugLog("info", "🔍 Ensuring database schema exists...");

  try {
    // Try a simple query first to see if schema exists
    const result =
      await prismaClient.$queryRaw`SELECT name FROM sqlite_master WHERE type='table' AND name='Session';`;

    if (result.length === 0) {
      debugLog("info", "📋 No tables found, need to create schema...");

      // For packaged app, copy the dev.db with schema from our build
      const dbPath = getDatabasePath();
      const sourceDbPath = app.isPackaged
        ? path.join(path.dirname(process.execPath), "prisma", "dev.db")
        : path.join(__dirname, "..", "prisma", "dev.db");

      if (fs.existsSync(sourceDbPath) && sourceDbPath !== dbPath) {
        debugLog("info", "📋 Copying database schema from:", sourceDbPath);

        // Close current connection before copying
        await prismaClient.$disconnect();

        // Copy the schema database
        fs.copyFileSync(sourceDbPath, dbPath);
        debugLog("info", "✅ Database schema copied successfully");

        // Reconnect to the new database
        await prismaClient.$connect();
        return true;
      }

      debugLog(
        "warn",
        "⚠️ No source database found, schema will be created by Prisma migration"
      );
      return false;
    }

    debugLog("info", "✅ Database schema already exists");
    return true;
  } catch (error) {
    debugLog("error", "❌ Schema check failed:", error.message);
    return false;
  }
}

function configurePrismaForPackagedApp() {
  if (!app.isPackaged) return;

  debugLog("info", "🔄 Configuring Prisma for packaged app...");
  debugLog("info", "📦 Is packaged:", app.isPackaged);
  debugLog("info", "💻 Platform:", process.platform);
  debugLog("info", "🏗️ Architecture:", process.arch);
  debugLog("info", "📁 Process execPath:", process.execPath);
  debugLog("info", "📁 Process resourcesPath:", process.resourcesPath);
  debugLog("info", "📁 App path:", app.getAppPath());

  // Multiple potential paths to try
  const schemaPaths = [
    // Path 1: In resources/app.asar.unpacked
    path.join(
      process.resourcesPath,
      "app.asar.unpacked",
      "prisma",
      "schema.prisma"
    ),
    // Path 2: Next to executable
    path.join(path.dirname(process.execPath), "prisma", "schema.prisma"),
    // Path 3: In resources directly
    path.join(process.resourcesPath, "prisma", "schema.prisma"),
  ];

  const binaryPaths = [
    // Path 1: In app.asar.unpacked
    path.join(
      process.resourcesPath,
      "app.asar.unpacked",
      "node_modules",
      "@prisma",
      "engines"
    ),
    // Path 2: Next to executable
    path.join(
      path.dirname(process.execPath),
      "node_modules",
      "@prisma",
      "engines"
    ),
    // Path 3: In resources
    path.join(process.resourcesPath, "node_modules", "@prisma", "engines"),
  ];

  let schemaPath = null;
  let binaryPath = null;

  // Find schema file
  for (const testPath of schemaPaths) {
    debugLog("info", "🔍 Testing schema path:", testPath);
    if (fs.existsSync(testPath)) {
      schemaPath = testPath;
      debugLog("info", "✅ Found schema at:", schemaPath);
      break;
    } else {
      debugLog("warn", "❌ Schema not found at:", testPath);
    }
  }

  // Find binary path
  for (const testPath of binaryPaths) {
    debugLog("info", "🔍 Testing binary path:", testPath);
    if (fs.existsSync(testPath)) {
      binaryPath = testPath;
      debugLog("info", "✅ Found binaries at:", binaryPath);
      break;
    } else {
      debugLog("warn", "❌ Binaries not found at:", testPath);
    }
  }

  if (!schemaPath) {
    throw new Error("Prisma schema.prisma file not found in packaged app");
  }

  if (!binaryPath) {
    throw new Error("Prisma engine binaries not found in packaged app");
  }

  // Set Prisma schema path
  process.env.PRISMA_SCHEMA_PATH = schemaPath;
  debugLog(
    "info",
    "🗂️ Set PRISMA_SCHEMA_PATH:",
    process.env.PRISMA_SCHEMA_PATH
  );

  // Find and set binary files
  const files = fs.readdirSync(binaryPath);
  debugLog("info", "📋 Available engine files:", files);

  // For Windows, look for specific patterns
  const enginePatterns = {
    queryEngineLibrary: /query_engine.*\.dll\.node$/,
    queryEngineBinary: /query-engine.*\.exe$/,
    schemaEngineBinary: /schema-engine.*\.exe$/,
  };

  for (const [envType, pattern] of Object.entries(enginePatterns)) {
    const matchingFile = files.find((file) => pattern.test(file));
    if (matchingFile) {
      const fullPath = path.join(binaryPath, matchingFile);
      let envVarName;

      switch (envType) {
        case "queryEngineLibrary":
          envVarName = "PRISMA_QUERY_ENGINE_LIBRARY";
          break;
        case "queryEngineBinary":
          envVarName = "PRISMA_QUERY_ENGINE_BINARY";
          break;
        case "schemaEngineBinary":
          envVarName = "PRISMA_SCHEMA_ENGINE_BINARY";
          break;
      }

      process.env[envVarName] = fullPath;
      debugLog("info", `🔧 Set ${envVarName}:`, fullPath);
    } else {
      debugLog("warn", `⚠️ Engine file not found for pattern:`, pattern);
    }
  }

  // Additional debugging - list all environment variables
  const prismaEnvVars = Object.keys(process.env).filter((key) =>
    key.startsWith("PRISMA_")
  );
  debugLog(
    "info",
    "🔧 All Prisma env vars:",
    prismaEnvVars.reduce((acc, key) => {
      acc[key] = process.env[key];
      return acc;
    }, {})
  );
}

function setupPrismaModuleResolution() {
  if (!app.isPackaged) return;

  // Force regenerate client if missing in packaged app
  // Try multiple locations for the .prisma directory
  const possiblePrismaPaths = [
    path.join(
      process.resourcesPath,
      "app.asar.unpacked",
      "node_modules",
      ".prisma"
    ),
    path.join(
      path.dirname(process.execPath),
      "app.asar.unpacked",
      "node_modules",
      ".prisma"
    ),
    path.join(
      path.dirname(process.execPath),
      "resources",
      "app.asar.unpacked",
      "node_modules",
      ".prisma"
    ),
  ];

  let generatedClientPath = null;
  let prismaBasePath = null;

  for (const testPath of possiblePrismaPaths) {
    const clientPath = path.join(testPath, "client");
    debugLog("info", "🔍 Testing .prisma path:", testPath);
    if (fs.existsSync(clientPath)) {
      generatedClientPath = clientPath;
      prismaBasePath = testPath;
      debugLog("info", "✅ Found .prisma client at:", generatedClientPath);
      break;
    } else {
      debugLog("warn", "❌ .prisma client not found at:", clientPath);
    }
  }

  if (generatedClientPath && prismaBasePath) {
    // Set the module path to look in unpacked directory first
    const Module = require("module");
    const originalResolveFilename = Module._resolveFilename;
    Module._resolveFilename = function (request, parent, isMain) {
      try {
        // If trying to resolve .prisma/client, redirect to unpacked directory
        if (
          request === ".prisma/client" ||
          request.startsWith(".prisma/client/")
        ) {
          const unpackedPrismaPath = path.join(
            process.resourcesPath,
            "app.asar.unpacked",
            "node_modules",
            request
          );

          // Check if it's a directory, then look for index.js or default.js
          if (fs.existsSync(unpackedPrismaPath)) {
            if (fs.statSync(unpackedPrismaPath).isDirectory()) {
              // Try common entry points for directories
              const entryPoints = ["index.js", "default.js", "main.js"];
              for (const entry of entryPoints) {
                const entryPath = path.join(unpackedPrismaPath, entry);
                if (fs.existsSync(entryPath)) {
                  debugLog(
                    "info",
                    "🔄 Redirecting .prisma/client require to:",
                    entryPath
                  );
                  return entryPath;
                }
              }
            } else {
              debugLog(
                "info",
                "🔄 Redirecting .prisma/client require to:",
                unpackedPrismaPath
              );
              return unpackedPrismaPath;
            }
          }
        }

        // Also redirect @prisma/client requests to unpacked directory
        if (
          request === "@prisma/client" ||
          request.startsWith("@prisma/client/")
        ) {
          const unpackedPrismaClientPath = path.join(
            process.resourcesPath,
            "app.asar.unpacked",
            "node_modules",
            request
          );

          if (fs.existsSync(unpackedPrismaClientPath)) {
            if (fs.statSync(unpackedPrismaClientPath).isDirectory()) {
              // Try common entry points for directories
              const entryPoints = ["index.js", "default.js", "main.js"];
              for (const entry of entryPoints) {
                const entryPath = path.join(unpackedPrismaClientPath, entry);
                if (fs.existsSync(entryPath)) {
                  debugLog(
                    "info",
                    "🔄 Redirecting @prisma/client require to:",
                    entryPath
                  );
                  return entryPath;
                }
              }
            } else {
              debugLog(
                "info",
                "🔄 Redirecting @prisma/client require to:",
                unpackedPrismaClientPath
              );
              return unpackedPrismaClientPath;
            }
          }
        }
      } catch (error) {
        debugLog("warn", "⚠️ Error in module resolution:", error.message);
      }

      return originalResolveFilename.call(this, request, parent, isMain);
    };

    // Also set the NODE_PATH to include the unpacked directory
    const unpackedNodeModules = path.dirname(prismaBasePath);
    debugLog("info", "📂 Setting NODE_PATH to include:", unpackedNodeModules);
    if (process.env.NODE_PATH) {
      process.env.NODE_PATH = `${unpackedNodeModules}${path.delimiter}${process.env.NODE_PATH}`;
    } else {
      process.env.NODE_PATH = unpackedNodeModules;
    }
    require("module").Module._initPaths();
  } else {
    debugLog(
      "error",
      "❌ Could not find .prisma directory in any expected location"
    );

    // Try to copy from main app if available
    const mainAppPrismaPath = path.join(
      path.dirname(process.execPath),
      "node_modules",
      ".prisma"
    );
    if (fs.existsSync(mainAppPrismaPath)) {
      debugLog("info", "📋 Found .prisma in main app, attempting copy...");
      const targetPath = possiblePrismaPaths[1]; // Use second option as fallback
      try {
        if (!fs.existsSync(path.dirname(targetPath))) {
          fs.mkdirSync(path.dirname(targetPath), { recursive: true });
        }
        const { execSync } = require("child_process");
        if (process.platform === "win32") {
          execSync(`xcopy "${mainAppPrismaPath}" "${targetPath}" /E /I /Y`);
        } else {
          execSync(`cp -r "${mainAppPrismaPath}" "${targetPath}"`);
        }
        debugLog(
          "info",
          "✅ Successfully copied .prisma files to:",
          targetPath
        );
      } catch (copyError) {
        debugLog(
          "error",
          "❌ Failed to copy .prisma files:",
          copyError.message
        );
      }
    }
  }
}

// Now initialize Prisma with better error handling
async function initializePrisma() {
  try {
    debugLog("info", "🔄 Attempting to initialize Prisma...");

    // Configure database environment
    configureDatabaseEnvironment();

    // Configure Prisma for packaged app
    configurePrismaForPackagedApp();

    // Setup module resolution
    setupPrismaModuleResolution();

    const { PrismaClient } = require("@prisma/client");

    prisma = new PrismaClient({
      log: ["error", "warn", "info"],
      // Important: Set the correct datasource for packaged apps
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });

    debugLog("info", "🔌 Prisma client created, attempting to connect...");

    // Test the connection with timeout
    await Promise.race([
      prisma.$connect(),
      new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error("Database connection timeout")),
          15000
        )
      ),
    ]);

    debugLog("info", "✅ Prisma client connected successfully");

    // Ensure database schema exists
    const schemaReady = await ensureDatabaseSchema(prisma);
    if (!schemaReady) {
      debugLog(
        "warn",
        "⚠️ Could not ensure database schema, some features may not work"
      );
    }

    // Test the schema by trying to query
    try {
      debugLog("info", "🧪 Testing database connection...");
      await prisma.session.findMany({ take: 1 });
      debugLog("info", "✅ Database schema is ready and working");
    } catch (testError) {
      debugLog("warn", "⚠️ Database test query failed:", testError.message);
      // Don't throw error here - let the app run without database if needed
    }

    return true;
  } catch (e) {
    debugLog("error", "❌ Failed to initialize Prisma:", e.message);
    debugLog("error", "📋 Error details:", {
      message: e.message,
      code: e.code,
      stack: e.stack?.split("\n").slice(0, 5).join("\n"),
    });
    prisma = null;
    return false;
  }
}

function getPrisma() {
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
  getPrisma,
  disconnectPrisma,
  getDatabasePath,
};
