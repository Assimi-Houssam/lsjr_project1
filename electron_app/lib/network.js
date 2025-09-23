const os = require("os");
const net = require("net");
const { debugLog } = require("./debug");

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

// Function to find an available port
async function findAvailablePort(startPort = 3000, maxPort = 3010) {
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

module.exports = {
  getLocalIPv4,
  findAvailablePort,
};
