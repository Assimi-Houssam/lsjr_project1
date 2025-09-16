export {}

declare global {

    interface GetSessionsOpts {
    page?: number
    pageSize?: number
    search?: string
    from?: string | null
    to?: string | null
    includeParticipants?: boolean
  }

  interface Window {
    api?: {
      createSession: (name: string) => Promise<{ sessionId: string; serverUrl?: string }>
      getServerInfo: () => Promise<{ serverUrl?: string; port?: number }>
      getSessions: (opts: GetSessionsOpts) => Promise<{ sessions: any[]; totalPages: number }>
      getSession: (sessionId: string) => Promise<{ sessionId: string; serverUrl?: string; ok: boolean; }>
      getParticipant(sessionId: string): Promise<any>

    }
  }
}