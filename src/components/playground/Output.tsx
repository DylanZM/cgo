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
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines])

  useEffect(() => {
    if (running && inputRef.current) {
      inputRef.current.focus()
    }
  }, [running])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onInputSubmit()
    }
  }

  const isEmpty = !running && lines.length === 0

  return (
    <div className="flex flex-col h-full terminal">
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto p-4 font-mono"
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
      </div>

      {running && (
        <div
          className="shrink-0 flex items-center border-t px-4 py-2"
          style={{
            background: 'var(--terminal-bg-alt)',
            borderColor: 'var(--terminal-border)',
          }}
        >
          <span className="text-xs font-mono mr-2" style={{ color: 'var(--terminal-fg-subtle)' }}>
            {'>'}
          </span>
          <input
            ref={inputRef}
            value={inputBuffer}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 text-xs font-mono leading-relaxed border-none outline-none bg-transparent placeholder:opacity-30"
            style={{ color: 'var(--terminal-fg)' }}
            placeholder="Type input and press Enter..."
          />
        </div>
      )}
    </div>
  )
}
