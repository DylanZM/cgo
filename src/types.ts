export interface CompileRequest {
  code: string
  language: 'c' | 'c++'
}

export interface CompileResponse {
  output: string
  error: string
  exitCode: number
  time: number
}

export interface HistoryEntry {
  id: string
  code: string
  timestamp: number
  output: string
  error: string
  exitCode: number
}

export interface Settings {
  theme: string
  fontFamily: string
  fontSize: number
  minimap: boolean
  lineNumbers: boolean
  wordWrap: boolean
  fontLigatures: boolean
  stickyScroll: boolean
  tabSize: number
}
