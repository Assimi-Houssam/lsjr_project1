export {}

declare global {
  interface Window {
    lsjr?: {
      createSession: (name: string) => Promise<{ sessionId: string; id?: number; name?: string; serverUrl?: string }>
      getServerInfo: () => Promise<{ serverUrl?: string; port?: number }>
      getSessions: () => Promise<any[]>
    }
  }
}