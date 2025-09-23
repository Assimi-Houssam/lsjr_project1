require("dotenv").config();
const { app, BrowserWindow, ipcMain, nativeImage } = require("electron");
const path = require("path");
const os = require("os");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Debug logging system for main process
let debugLogs = [];
const MAX_DEBUG_LOGS = 100;

function debugLog(level, ...args) {
  const timestamp = new Date().toISOString();
  const message = args
    .map((arg) =>
      typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
    )
    .join(" ");

  const logEntry = {
    timestamp,
    level,
    message,
    id: Date.now() + Math.random(),
  };

  debugLogs.unshift(logEntry);
  if (debugLogs.length > MAX_DEBUG_LOGS) {
    debugLogs = debugLogs.slice(0, MAX_DEBUG_LOGS);
  }

  // Also log to console
  console[level] ? console[level](...args) : console.log(...args);

  // Send to renderer if window exists
  if (global.mainWindow && !global.mainWindow.isDestroyed()) {
    global.mainWindow.webContents.send("main-debug-log", logEntry);
  }
}

// Set database path BEFORE initializing Prisma - PORTABLE VERSION
const dbPath = app.isPackaged
  ? path.join(path.dirname(process.execPath), "data", "app.db") // ← PORTABLE PATH
  : path.join(__dirname, "prisma", "dev.db");

process.env.DATABASE_URL = `file:${dbPath}`;
debugLog("=== DATABASE CONFIGURATION ===");
debugLog("Database path set to:", dbPath);
debugLog("Is packaged:", app.isPackaged);
debugLog("User data path:", app.getPath("userData"));

// Ensure the database directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  debugLog("Creating database directory:", dbDir);
  fs.mkdirSync(dbDir, { recursive: true });
} else {
  debugLog("Database directory exists:", dbDir);
}

// Function to ensure database schema exists using Prisma push
async function ensureDatabaseSchema(prisma) {
  debugLog("info", "🔍 Ensuring database schema exists...");

  try {
    // Try a simple query first to see if schema exists
    const result =
      await prisma.$queryRaw`SELECT name FROM sqlite_master WHERE type='table' AND name='Session';`;

    if (result.length === 0) {
      debugLog("info", "📋 No tables found, need to create schema...");

      // For packaged app, copy the dev.db with schema from our build
      const sourceDbPath = app.isPackaged
        ? path.join(path.dirname(process.execPath), "prisma", "dev.db")
        : path.join(__dirname, "prisma", "dev.db");

      if (fs.existsSync(sourceDbPath) && sourceDbPath !== dbPath) {
        debugLog("info", "📋 Copying database schema from:", sourceDbPath);

        // Close current connection before copying
        await prisma.$disconnect();

        // Copy the schema database
        fs.copyFileSync(sourceDbPath, dbPath);
        debugLog("info", "✅ Database schema copied successfully");

        // Reconnect to the new database
        await prisma.$connect();
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

// Now initialize Prisma with better error handling
let prisma = null;
async function initializePrisma() {
  try {
    debugLog("info", "🔄 Attempting to initialize Prisma...");
    debugLog("info", "📦 Is packaged:", app.isPackaged);
    debugLog("info", "💻 Platform:", process.platform);
    debugLog("info", "🏗️ Architecture:", process.arch);
    debugLog("info", "📁 Process execPath:", process.execPath);
    debugLog("info", "📁 Process resourcesPath:", process.resourcesPath);
    debugLog("info", "📁 App path:", app.getAppPath());

    if (app.isPackaged) {
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

    // Force regenerate client if missing in packaged app
    if (app.isPackaged) {
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
                    const entryPath = path.join(
                      unpackedPrismaClientPath,
                      entry
                    );
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
        }; // Also set the NODE_PATH to include the unpacked directory
        const unpackedNodeModules = path.dirname(prismaBasePath);
        debugLog(
          "info",
          "📂 Setting NODE_PATH to include:",
          unpackedNodeModules
        );
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
      debugLog("info", "� Testing database connection...");
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

function getLocalIPv4() {
  const nets = os.networkInterfaces();
  const validIPs = [];

  // Collect all potential IPv4 addresses
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip internal IPs and get IPv4 addresses
      if (net.family === "IPv4" && !net.internal) {
        validIPs.push({
          address: net.address,
          interface: name,
          netmask: net.netmask,
        });
      }
    }
  }

  debugLog("info", "🌐 Available network interfaces:", validIPs);

  // Filter out virtual/WSL interfaces - prioritize real network adapters
  const realInterfaces = validIPs.filter((ip) => {
    const interfaceName = ip.interface.toLowerCase();
    // Exclude virtual, WSL, Hyper-V, and other virtual adapters
    return (
      !interfaceName.includes("vethernet") &&
      !interfaceName.includes("wsl") &&
      !interfaceName.includes("hyper-v") &&
      !interfaceName.includes("vmware") &&
      !interfaceName.includes("virtualbox") &&
      !interfaceName.includes("docker") &&
      !interfaceName.includes("loopback")
    );
  });

  debugLog(
    "info",
    "🔍 Real network interfaces (excluding virtual):",
    realInterfaces
  );

  // Prioritize Wi-Fi and Mobile Hotspot interfaces
  const wifiIP = realInterfaces.find((ip) => {
    const interfaceName = ip.interface.toLowerCase();
    return (
      interfaceName.includes("wi-fi") ||
      interfaceName.includes("wireless") ||
      interfaceName.includes("wifi")
    );
  });

  const hotspotIP = realInterfaces.find((ip) => {
    const interfaceName = ip.interface.toLowerCase();
    return (
      interfaceName.includes("local area connection") &&
      ip.address.startsWith("192.168.137.")
    );
  });

  // Priority order: Mobile Hotspot > Wi-Fi > Other real interfaces
  if (hotspotIP) {
    debugLog(
      "info",
      `🔥 Selected Mobile Hotspot IP: ${hotspotIP.address} (${hotspotIP.interface})`
    );
    return hotspotIP.address;
  }

  if (wifiIP) {
    debugLog(
      "info",
      `📶 Selected Wi-Fi IP: ${wifiIP.address} (${wifiIP.interface})`
    );
    return wifiIP.address;
  }

  // Fallback to any real interface with common LAN ranges
  const priorityIP = realInterfaces.find((ip) => {
    const addr = ip.address;
    return (
      addr.startsWith("192.168.") ||
      addr.startsWith("10.") ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(addr)
    );
  });

  if (priorityIP) {
    debugLog(
      "info",
      `✅ Selected LAN IP: ${priorityIP.address} (${priorityIP.interface})`
    );
    return priorityIP.address;
  }

  // Fallback to first real interface
  if (realInterfaces.length > 0) {
    debugLog(
      "info",
      `⚠️ Using fallback real IP: ${realInterfaces[0].address} (${realInterfaces[0].interface})`
    );
    return realInterfaces[0].address;
  }

  // Last resort - use any non-internal IP
  if (validIPs.length > 0) {
    debugLog(
      "info",
      `⚠️ Using any available IP: ${validIPs[0].address} (${validIPs[0].interface})`
    );
    return validIPs[0].address;
  }

  debugLog("warn", "⚠️ No network interfaces found, using localhost");
  return "127.0.0.1";
}

// Function to check Windows Firewall and provide guidance
// async function checkFirewallAndNetwork() {
//   if (process.platform !== "win32") {
//     return { firewall: "N/A", guidance: [] };
//   }

//   const guidance = [];

//   try {
//     // Check if we can bind to the port on all interfaces
//     const testPort = HTTP_PORT;

//     debugLog("info", "🔥 Checking Windows network accessibility...");

//     guidance.push("🔥 WINDOWS FIREWALL POWERSHELL COMMANDS:");
//     guidance.push(`📱 Run PowerShell as Administrator and execute:`);
//     guidance.push("");
//     guidance.push("# Allow LocalQuizHub through Windows Firewall:");
//     guidance.push(
//       `New-NetFirewallRule -DisplayName "LocalQuizHub" -Direction Inbound -Protocol TCP -LocalPort ${testPort} -Action Allow`
//     );
//     guidance.push("");
//     guidance.push("# Alternative - Allow port range (3000-3010):");
//     guidance.push(
//       'New-NetFirewallRule -DisplayName "LocalQuizHub Range" -Direction Inbound -Protocol TCP -LocalPort 3000-3010 -Action Allow'
//     );
//     guidance.push("");
//     guidance.push("# To remove rules later:");
//     guidance.push('Remove-NetFirewallRule -DisplayName "LocalQuizHub*"');
//     guidance.push("");
//     guidance.push(
//       `🌐 Server is binding to: 0.0.0.0:${testPort} (all interfaces)`
//     );

//     // Additional network troubleshooting
//     guidance.push("");
//     guidance.push("📱 MOBILE HOTSPOT CONNECTION:");
//     guidance.push("1. Enable Mobile Hotspot on your phone");
//     guidance.push("2. Connect computer to phone's hotspot WiFi");
//     guidance.push(
//       "3. The server should bind to 192.168.137.x (hotspot network)"
//     );
//     guidance.push("4. Access from phone browser: http://192.168.137.1:3000");
//     guidance.push("");
//     guidance.push("📶 REGULAR WiFi CONNECTION:");
//     guidance.push("1. Connect both devices to same WiFi network");
//     guidance.push("2. Server should use 192.168.1.x or 192.168.0.x");
//     guidance.push(
//       "3. Check router settings for 'Client Isolation' and disable it"
//     );

//     return { firewall: "manual-check-needed", guidance };
//   } catch (error) {
//     debugLog("error", "❌ Firewall check failed:", error.message);
//     return {
//       firewall: "unknown",
//       guidance: ["❌ Could not determine firewall status"],
//     };
//   }
// }

// Function to find an available port
async function findAvailablePort(startPort = 3000, maxPort = 3010) {
  const net = require("net");

  const checkPort = (port) => {
    return new Promise((resolve) => {
      const server = net.createServer();
      server.listen(port, "0.0.0.0", () => {
        server.once("close", () => resolve(true));
        server.close();
      });
      server.on("error", () => resolve(false));
    });
  };

  for (let port = startPort; port <= maxPort; port++) {
    debugLog("info", `🔍 Checking port ${port}...`);
    if (await checkPort(port)) {
      debugLog("info", `✅ Found available port: ${port}`);
      return port;
    } else {
      debugLog("warn", `⚠️ Port ${port} is in use`);
    }
  }

  throw new Error(
    `No available ports found between ${startPort} and ${maxPort}`
  );
}

// Configuration
let HTTP_PORT = Number(process.env.LOCAL_HTTP_PORT || 3000);
const HOST = "0.0.0.0";

// Fix paths for packaged app
const QUIZ_DIST = app.isPackaged
  ? path.join(path.dirname(process.execPath), "quiz", "dist")
  : path.join(__dirname, "quiz", "dist");

const ADMIN_DIST = app.isPackaged
  ? path.join(__dirname, "rendrer", "dist")
  : path.join(__dirname, "rendrer", "dist");

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
  // Find an available port if the default one is in use
  try {
    HTTP_PORT = await findAvailablePort(HTTP_PORT);
    debugLog("info", `🌐 Using port: ${HTTP_PORT}`);
  } catch (error) {
    debugLog("error", "❌ Could not find available port:", error.message);
    throw error;
  }

  // Check firewall and network configuration
  // const firewallInfo = await checkFirewallAndNetwork();
  // if (firewallInfo.guidance.length > 0) {
  //   firewallInfo.guidance.forEach((msg) => debugLog("info", msg));
  // }

  const appServer = express();
  appServer.use(cors());
  appServer.use(express.json({ limit: "10mb" }));
  appServer.use(express.urlencoded({ extended: true, limit: "10mb" }));

  debugLog("info", "=== HTTP Server Setup ===");
  debugLog("info", "QUIZ_DIST:", QUIZ_DIST);
  debugLog("info", "QUIZ_DIST exists:", fs.existsSync(QUIZ_DIST));

  // Additional debugging for packaged apps
  if (app.isPackaged) {
    debugLog("info", "📁 Process execPath:", process.execPath);
    debugLog(
      "info",
      "📁 Process execPath dirname:",
      path.dirname(process.execPath)
    );
    const quizDir = path.join(path.dirname(process.execPath), "quiz");
    debugLog("info", "📁 Quiz directory path:", quizDir);
    debugLog("info", "📁 Quiz directory exists:", fs.existsSync(quizDir));

    if (fs.existsSync(quizDir)) {
      const quizContents = fs.readdirSync(quizDir);
      debugLog("info", "📋 Quiz directory contents:", quizContents);

      if (quizContents.includes("dist")) {
        const quizDistContents = fs.readdirSync(path.join(quizDir, "dist"));
        debugLog("info", "📋 Quiz/dist contents:", quizDistContents);
      }
    }
  }

  if (fs.existsSync(QUIZ_DIST)) {
    appServer.use("/", express.static(QUIZ_DIST));
    debugLog("info", "✅ Serving quiz static from", QUIZ_DIST);

    // Test if index.html exists
    const indexPath = path.join(QUIZ_DIST, "index.html");
    debugLog("info", "📄 index.html exists:", fs.existsSync(indexPath));

    if (fs.existsSync(indexPath)) {
      const indexStats = fs.statSync(indexPath);
      debugLog("info", "📄 index.html size:", indexStats.size, "bytes");
    }
  } else {
    debugLog(
      "❌ Quiz dist not found at",
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

  appServer.get("/server-info", (req, res) => {
    const networkInfo = {
      serverUrl,
      host: HOST,
      port: HTTP_PORT,
      ip: getLocalIPv4(),
      quizDistExists: fs.existsSync(QUIZ_DIST),
      quizDistPath: QUIZ_DIST,
      platform: process.platform,
      networkInterfaces: os.networkInterfaces(),
      timestamp: new Date().toISOString(),
      accessedFrom: req.ip || req.connection.remoteAddress,
    };
    res.json(networkInfo);
  });


  return new Promise((resolve, reject) => {
    httpServer = appServer.listen(HTTP_PORT, HOST, () => {
      const useLocalhost =
        process.env.NODE_ENV === "development" ||
        process.env.LOCAL_USE_LOCALHOST === "1";
      const ip = useLocalhost ? "127.0.0.1" : getLocalIPv4();
      serverUrl = `http://${ip}:${HTTP_PORT}`;
      // Additional server info logging
      debugLog("info", "🌐 Server details:");
      debugLog("info", "  - Host:", HOST);
      debugLog("info", "  - Port:", HTTP_PORT);
      debugLog("info", "  - IP:", ip);
      debugLog("info", "  - Use localhost:", useLocalhost);
      debugLog("info", "  - Server URL:", serverUrl);

      resolve();
    });
    httpServer.on("error", (err) => {
      debugLog("error", "❌ HTTP server error:", err);
      reject(err);
    });
  });
}

// IPC handlers
ipcMain.handle("create-session", async (ev, sessionName) => {
  if (!prisma) {
    debugLog("error", "❌ Database not available for create-session", prisma);
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
      serverUrl,
    };
  } catch (error) {
    debugLog("error", "❌ Error creating session:", error);
    throw error;
  }
});

// Add debug log handlers
ipcMain.handle("get-debug-logs", async (ev) => {
  return debugLogs;
});

ipcMain.handle("clear-debug-logs", async (ev) => {
  debugLogs = [];
  return true;
});

// Add system info handler
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

ipcMain.handle("session-qr", async (ev, sessionId) => {
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
    const qrData = `${serverUrl}/?sessionId=${sessionId}`;
    return {
      session,
      qrData,
      serverUrl,
    };
  } catch (error) {
    console.error("❌ Error getting session QR:", error);
    throw error;
  }
});

// Update the get-sessions handler to handle the null prisma case better
ipcMain.handle("get-sessions", async (ev, opt = {}) => {
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
    if (fromDate && !isNaN(fromDate.getTime())) createdAtFilter.gte = fromDate;
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

// get all participants for a specific session
ipcMain.handle("get-participants", async (ev, sessionId) => {
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

ipcMain.handle("server-info", async (ev, serverUrl) => {
  try {
   
  } catch (error) {
    throw error;
  }
});

// still  need to work around this  in the front end so i know tabel and entrie
ipcMain.handle("get-particpant-details", async (ev, participantId) => {}); //

// this until second app finished
ipcMain.handle("login", async (ev, username, password) => {});

// send request to server to see if u can sync now if yes sync if not need to prompte user to login
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
    debugLog("info", "Loading admin renderer from dev URL:", devUrl);
  } else if (fs.existsSync(path.join(ADMIN_DIST, "index.html"))) {
    loadUrl = `file://${path.join(ADMIN_DIST, "index.html")}`;
    debugLog("info", "Loading admin renderer from packaged file://", loadUrl);
  } else if (serverUrl) {
    // fallback: load serverUrl (may serve quiz or a small admin page)
    loadUrl = serverUrl;
    debugLog("info", "Loading admin using serverUrl fallback:", loadUrl);
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

  // Store global reference for debug logging
  global.mainWindow = win;

  win.setResizable(false);

  // Add keyboard shortcuts for debugging
  win.webContents.on("before-input-event", (event, input) => {
    // F12 to toggle DevTools
    if (input.key === "F12") {
      win.webContents.toggleDevTools();
    }
    // Ctrl+Shift+D to open debug logs
    if (input.control && input.shift && input.key.toLowerCase() === "d") {
      win.webContents.send("show-debug-panel");
    }
    // Ctrl+Shift+R to reload (useful for debugging)
    if (input.control && input.shift && input.key.toLowerCase() === "r") {
      win.reload();
    }
  });

  // Always open DevTools in development, and allow in production with DEV=1
  if (process.env.NODE_ENV === "development" || process.env.DEV === "1") {
    win.webContents.openDevTools({ mode: "undocked" });
  }

  // Send debug logs to renderer when ready
  win.webContents.once("did-finish-load", () => {
    debugLog("info", "🖥️ Renderer loaded, sending initial debug logs");
    win.webContents.send("initial-debug-logs", debugLogs);
  });

  await win.loadURL(loadUrl);
}

// App lifecycle
if (!app.requestSingleInstanceLock()) app.quit();

app.whenReady().then(async () => {
  debugLog("info", "=== 🚀 App Startup Debug Info ===");
  debugLog("info", "📦 Is packaged:", app.isPackaged);
  debugLog("info", "📁 App path:", app.getAppPath());
  debugLog("info", "📁 __dirname:", __dirname);
  debugLog("info", "📁 QUIZ_DIST:", QUIZ_DIST);
  debugLog("info", "📁 ADMIN_DIST:", ADMIN_DIST);
  debugLog("info", "✅ QUIZ_DIST exists:", fs.existsSync(QUIZ_DIST));
  debugLog("info", "✅ ADMIN_DIST exists:", fs.existsSync(ADMIN_DIST));

  try {
    // Initialize Prisma first
    debugLog("info", "🗄️ Initializing database...");
    const prismaReady = await initializePrisma();

    if (!prismaReady) {
      debugLog(
        "warn",
        "⚠️ Database initialization failed, app will run without persistence"
      );
    }

    debugLog("info", "🌐 Starting HTTP server...");
    await startHttpServer();
    debugLog("info", "✅ HTTP server started at:", serverUrl);

    debugLog("info", "🖥️ Creating main window...");
    await createWindow();
    debugLog("info", "✅ Window created");

    debugLog("info", "=== ✅ App startup completed successfully ===");
  } catch (err) {
    debugLog("error", "❌ Startup error:", err);

    // Show error dialog in packaged app
    if (app.isPackaged) {
      const { dialog } = require("electron");
      dialog.showErrorBox(
        "Startup Error",
        `Failed to start LocalQuizHub:\n\n${err.message}\n\nPress F12 in the app to open DevTools and see detailed logs.\n\nPress Ctrl+Shift+D to see debug logs.`
      );
    }
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
