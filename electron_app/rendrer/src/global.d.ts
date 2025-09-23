export {};

declare global {
  interface GetSessionsOpts {
    page?: number;
    pageSize?: number;
    search?: string;
    from?: string | null;
    to?: string | null;
    includeParticipants?: boolean;
  }

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

  interface Window {
    api?: {
      createSession: (
        name: string
      ) => Promise<{ sessionId: string; serverUrl?: string }>;
      getServerInfo: () => Promise<{ serverUrl?: string; port?: number }>;
      getSessions: (
        opts: GetSessionsOpts
      ) => Promise<{ sessions: any[]; totalPages: number }>;
      getSession: (
        sessionId: string
      ) => Promise<{  sessionId : string  , serverUrl: string , ok : boolean }>;
      server_info: (serverUrl : string ) => Promise<{ success: boolean; }>;
      loggedout: () => Promise<{success: boolean;}>;
      isloggedin: () => Promise<{logged_in: boolean;}>;
     
      getParticipant(sessionId: string): Promise<any>;

      // Debug functions
      getDebugLogs: () => Promise<LogEntry[]>;
      clearDebugLogs: () => Promise<boolean>;
      getSystemInfo: () => Promise<SystemInfo>;

      // Event listeners
      onMainDebugLog: (callback: (logEntry: LogEntry) => void) => () => void;
      onInitialDebugLogs: (callback: (logs: LogEntry[]) => void) => () => void;
      onShowDebugPanel: (callback: () => void) => () => void;
    };
  }
}
