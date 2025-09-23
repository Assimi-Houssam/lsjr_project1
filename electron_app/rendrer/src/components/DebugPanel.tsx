import React, { useState, useEffect, useRef } from "react";

interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  id: number;
}

interface SystemInfo {
  platform: string;
  arch: string;
  nodeVersion: string;
  electronVersion: string;
  isPackaged: boolean;
  execPath: string;
  resourcesPath: string;
  appPath: string;
  userData: string;
  prismaEnvVars: Record<string, string>;
  databaseUrl: string;
}

interface DebugPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

export const DebugPanel: React.FC<DebugPanelProps> = ({
  isVisible,
  onClose,
}) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [activeTab, setActiveTab] = useState<"logs" | "system">("logs");
  const [autoScroll, setAutoScroll] = useState(true);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible) return;

    // Load initial data
    loadDebugLogs();
    loadSystemInfo();

    // Listen for new logs from main process
    if (window.api === undefined) {
      console.error("window.api is undefined");
      return;
    }
    const unsubscribeMainLogs = window.api.onMainDebugLog(
      (logEntry: LogEntry) => {
        setLogs((prev) => [logEntry, ...prev].slice(0, 100)); // Keep only latest 100 logs
      }
    );

    const unsubscribeInitialLogs = window.api.onInitialDebugLogs(
      (initialLogs: LogEntry[]) => {
        setLogs(initialLogs);
      }
    );

    return () => {
      unsubscribeMainLogs();
      unsubscribeInitialLogs();
    };
  }, [isVisible]);

  useEffect(() => {
    if (autoScroll && logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, autoScroll]);

  const loadDebugLogs = async () => {
    try {
      if (window.api === undefined) {
        console.error("window.api is undefined");
        return;
      }
      const debugLogs = await window.api.getDebugLogs();
      setLogs(debugLogs);
    } catch (error) {
      console.error("Failed to load debug logs:", error);
    }
  };

  const loadSystemInfo = async () => {
    try {
      if (window.api === undefined) {
        console.error("window.api is undefined");
        return;
      }
      const info = await window.api.getSystemInfo();
      setSystemInfo(info);
    } catch (error) {
      console.error("Failed to load system info:", error);
    }
  };

  const clearLogs = async () => {
    try {
      if (window.api === undefined) {
        console.error("window.api is undefined");
        return;
      }
      await window.api.clearDebugLogs();
      setLogs([]);
    } catch (error) {
      console.error("Failed to clear logs:", error);
    }
  };

  const getLogColor = (level: string) => {
    switch (level) {
      case "error":
        return "text-red-400";
      case "warn":
        return "text-yellow-400";
      case "info":
        return "text-blue-400";
      default:
        return "text-gray-300";
    }
  };

  const getLogIcon = (level: string) => {
    switch (level) {
      case "error":
        return "❌";
      case "warn":
        return "⚠️";
      case "info":
        return "ℹ️";
      default:
        return "📝";
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-gray-900 text-white rounded-lg shadow-2xl w-11/12 h-5/6 max-w-6xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">🐛 Debug Panel</h2>
          <div className="flex items-center gap-4">
            <div className="flex bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("logs")}
                className={`px-4 py-2 rounded ${
                  activeTab === "logs" ? "bg-blue-600" : "hover:bg-gray-700"
                }`}
              >
                📋 Logs
              </button>
              <button
                onClick={() => setActiveTab("system")}
                className={`px-4 py-2 rounded ${
                  activeTab === "system" ? "bg-blue-600" : "hover:bg-gray-700"
                }`}
              >
                🖥️ System
              </button>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === "logs" && (
            <div className="h-full flex flex-col">
              {/* Controls */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400">
                    {logs.length} logs
                  </span>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={autoScroll}
                      onChange={(e) => setAutoScroll(e.target.checked)}
                      className="rounded"
                    />
                    Auto-scroll
                  </label>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={loadDebugLogs}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                  >
                    🔄 Refresh
                  </button>
                  <button
                    onClick={clearLogs}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
                  >
                    🗑️ Clear
                  </button>
                </div>
              </div>

              {/* Logs */}
              <div className="flex-1 overflow-auto p-4 font-mono text-sm bg-black">
                {logs.length === 0 ? (
                  <div className="text-gray-500 text-center py-8">
                    No logs available
                  </div>
                ) : (
                  logs.map((log) => (
                    <div key={log.id} className="mb-2 flex items-start gap-2">
                      <span className="text-gray-500 text-xs whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </span>
                      <span className="text-lg">{getLogIcon(log.level)}</span>
                      <span className={`${getLogColor(log.level)} flex-1`}>
                        {log.message}
                      </span>
                    </div>
                  ))
                )}
                <div ref={logsEndRef} />
              </div>
            </div>
          )}

          {activeTab === "system" && (
            <div className="h-full overflow-auto p-4">
              {systemInfo ? (
                <div className="space-y-4">
                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="font-bold mb-3 text-green-400">
                      📊 System Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>Platform:</strong> {systemInfo.platform}
                      </div>
                      <div>
                        <strong>Architecture:</strong> {systemInfo.arch}
                      </div>
                      <div>
                        <strong>Node.js:</strong> {systemInfo.nodeVersion}
                      </div>
                      <div>
                        <strong>Electron:</strong> {systemInfo.electronVersion}
                      </div>
                      <div>
                        <strong>Packaged:</strong>{" "}
                        {systemInfo.isPackaged ? "✅ Yes" : "❌ No"}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="font-bold mb-3 text-blue-400">📁 Paths</h3>
                    <div className="space-y-2 text-sm font-mono">
                      <div>
                        <strong>Executable:</strong> {systemInfo.execPath}
                      </div>
                      <div>
                        <strong>Resources:</strong> {systemInfo.resourcesPath}
                      </div>
                      <div>
                        <strong>App:</strong> {systemInfo.appPath}
                      </div>
                      <div>
                        <strong>User Data:</strong> {systemInfo.userData}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="font-bold mb-3 text-purple-400">
                      🗄️ Database
                    </h3>
                    <div className="text-sm font-mono">
                      <div>
                        <strong>URL:</strong> {systemInfo.databaseUrl}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="font-bold mb-3 text-yellow-400">
                      ⚙️ Prisma Environment
                    </h3>
                    <div className="space-y-1 text-sm font-mono">
                      {Object.entries(systemInfo.prismaEnvVars).length === 0 ? (
                        <div className="text-gray-500">
                          No Prisma environment variables set
                        </div>
                      ) : (
                        Object.entries(systemInfo.prismaEnvVars).map(
                          ([key, value]) => (
                            <div key={key}>
                              <strong>{key}:</strong>
                              <span className="break-all ml-2 text-green-300">
                                {value}
                              </span>
                            </div>
                          )
                        )
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Loading system information...
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
