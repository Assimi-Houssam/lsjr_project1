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
    lsjr?: {
      createSession: (name: string) => Promise<{ sessionId: string; serverUrl?: string }>
      getServerInfo: () => Promise<{ serverUrl?: string; port?: number }>
      getSessions: (opts: GetSessionsOpts) => Promise<any[]>
      getSession: (sessionId: string) => Promise<{ sessionId: string; serverUrl?: string }>

    }
  }
}