import { useState, useRef, useCallback, useEffect } from 'react'

export interface TerminalLine {
  text: string
  type: 'stdout' | 'stderr' | 'input'
}

interface UseTerminalOptions {
  onExit?: () => void
}

export function useTerminal({ onExit }: UseTerminalOptions = {}) {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [running, setRunning] = useState(false)
  const [inputBuffer, setInputBuffer] = useState('')
  const wsRef = useRef<WebSocket | null>(null)

  const sendStdin = useCallback((data: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'stdin', data }))
    }
  }, [])

  const addLine = useCallback((text: string, type: TerminalLine['type']) => {
    setLines((prev) => [...prev, { text, type }])
  }, [])

  const run = useCallback((code: string) => {
    setLines([])
    setRunning(true)
    setInputBuffer('')

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    const host = window.location.host
    const ws = new WebSocket(`${protocol}//${host}/ws`)

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'run', code }))
    }

    ws.onmessage = (event) => {
      let msg
      try {
        msg = JSON.parse(event.data)
      } catch {
        return
      }

      if (msg.type === 'stdout') {
        addLine(msg.data, 'stdout')
      } else if (msg.type === 'stderr') {
        addLine(msg.data, 'stderr')
      } else if (msg.type === 'error') {
        addLine(msg.data, 'stderr')
      } else if (msg.type === 'exit') {
        if (msg.data.code !== 0) {
          addLine(`\nProcess exited with code ${msg.data.code} (${msg.data.time}ms)`, 'stderr')
        } else {
          addLine(`\nDone (${msg.data.time}ms)`, 'stdout')
        }
        setRunning(false)
        onExit?.()
        ws.close()
      }
    }

    ws.onerror = () => {
      addLine('Connection error', 'stderr')
      setRunning(false)
    }

    ws.onclose = () => {
      setRunning(false)
      wsRef.current = null
    }

    wsRef.current = ws
  }, [addLine, onExit])

  const stdin = useCallback((data: string) => {
    addLine(data, 'input')
    sendStdin(data)
  }, [addLine, sendStdin])

  const abort = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close()
    }
  }, [])

  useEffect(() => {
    return () => {
      wsRef.current?.close()
    }
  }, [])

  return { lines, running, run, stdin, abort, inputBuffer, setInputBuffer }
}
