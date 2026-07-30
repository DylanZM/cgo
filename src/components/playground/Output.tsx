import { useRef, useEffect } from 'react'
import type { TerminalLine } from '../../hooks/useTerminal'

interface OutputProps {
  lines: TerminalLine[]
  running: boolean
  inputBuffer: string
  onInputChange: (val: string) => void
  onInputSubmit: () => void
}

export default function Output({ lines, running, inputBuffer, onInputChange, onInputSubmit }: OutputProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines, inputBuffer])

  useEffect(() => {
    if (running && scrollRef.current) {
      scrollRef.current.focus()
    }
  }, [running])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!running) return

    if (e.key === 'Enter') {
      e.preventDefault()
      onInputSubmit()
      return
    }

    if (e.key === 'Backspace') {
      e.preventDefault()
      onInputChange(inputBuffer.slice(0, -1))
      return
    }

    if (e.ctrlKey || e.metaKey || e.altKey) return
    if (e.key.length === 1) {
      e.preventDefault()
      onInputChange(inputBuffer + e.key)
    }
  }

  const isEmpty = !running && lines.length === 0

  return (
    <div className="flex flex-col h-full terminal">
      <div
        ref={scrollRef}
        tabIndex={0}
        className="flex-1 overflow-auto p-4 font-mono outline-none"
        onKeyDown={handleKeyDown}
        style={{ background: 'var(--terminal-bg)', color: 'var(--terminal-fg)' }}
      >
        {isEmpty && (
          <div
            className="flex flex-col items-center justify-center h-full gap-3 font-sans"
            style={{ color: 'var(--terminal-fg-muted)' }}
          />
        )}

        {lines.length > 0 && (
          <div className="space-y-0">
            {lines.map((line, i) => (
              <pre
                key={i}
                className="text-sm font-mono whitespace-pre-wrap leading-relaxed"
                style={{
                  color: line.type === 'stderr'
                    ? 'var(--terminal-error)'
                    : line.type === 'input'
                    ? 'var(--terminal-fg-subtle)'
                    : 'var(--terminal-fg)',
                }}
              >
                {line.text}
              </pre>
            ))}
          </div>
        )}

        {running && (
          <span className="text-sm font-mono leading-relaxed" style={{ color: 'var(--terminal-fg)' }}>
            {inputBuffer}<span className="animate-pulse">▊</span>
          </span>
        )}
      </div>
    </div>
  )
}
