const os = require("os");
const net = require("net");
const { debugLog } = require("./debug");

function getLocalIPv4() {
  const nets = os.networkInterfaces();
  const validIPs = [];

  // Collect all potential IPv4 addresses
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) {
        validIPs.push({
          address: net.address,
          interface: name,
          netmask: net.netmask,
        });
      }
    }
  }

  // Filter out virtual/WSL interfaces
  const realInterfaces = validIPs.filter((ip) => {
    const interfaceName = ip.interface.toLowerCase();
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

  // Prioritize Mobile Hotspot > Wi-Fi > Other real interfaces
  const hotspotIP = realInterfaces.find((ip) => {
    const interfaceName = ip.interface.toLowerCase();
    return (
      interfaceName.includes("local area connection") &&
      ip.address.startsWith("192.168.137.")
    );
  });

  if (hotspotIP) {
    debugLog("info", `🔥 Selected Mobile Hotspot IP: ${hotspotIP.address}`);
    return hotspotIP.address;
  }

  const wifiIP = realInterfaces.find((ip) => {
    const interfaceName = ip.interface.toLowerCase();
    return (
      interfaceName.includes("wi-fi") ||
      interfaceName.includes("wireless") ||
      interfaceName.includes("wifi")
    );
  });

  if (wifiIP) {
    debugLog("info", `📶 Selected Wi-Fi IP: ${wifiIP.address}`);
    return wifiIP.address;
  }

  // Fallback to any real interface
  if (realInterfaces.length > 0) {
    return realInterfaces[0].address;
  }

  return "127.0.0.1";
}

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
    }
  }

  throw new Error(
    `No available ports found between ${startPort} and ${maxPort}`
  );
}

module.exports = { getLocalIPv4, findAvailablePort };
