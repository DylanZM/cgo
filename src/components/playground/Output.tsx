import { Terminal, Loader } from 'lucide-react'
import type { CompileResponse } from '../../types'

interface OutputProps {
  result: CompileResponse | null
  isRunning: boolean
}

export default function Output({ result, isRunning }: OutputProps) {
  return (
    <div className="flex flex-col h-full terminal">
      <div
        className="flex-1 overflow-auto p-4 font-mono"
        style={{ background: 'var(--terminal-bg)', color: 'var(--terminal-fg)' }}
      >
        {isRunning && (
          <div
            className="flex items-center gap-2 text-xs animate-fade-in"
            style={{ color: 'var(--terminal-fg-muted)' }}
          >
            <Loader className="w-3.5 h-3.5 animate-spin" />
            <span>Compiling and running...</span>
            <span className="flex gap-0.5 ml-1">
              <span
                className="w-1 h-1 rounded-full animate-bounce [animation-delay:-0.3s]"
                style={{ background: 'var(--terminal-fg-muted)' }}
              />
              <span
                className="w-1 h-1 rounded-full animate-bounce [animation-delay:-0.15s]"
                style={{ background: 'var(--terminal-fg-muted)' }}
              />
              <span
                className="w-1 h-1 rounded-full animate-bounce"
                style={{ background: 'var(--terminal-fg-muted)' }}
              />
            </span>
          </div>
        )}

        {!isRunning && !result && (
          <div
            className="flex flex-col items-center justify-center h-full gap-3 font-sans"
            style={{ color: 'var(--terminal-fg-muted)' }}
          >
            <div
              className="w-12 h-12 rounded-full border flex items-center justify-center"
              style={{ borderColor: 'var(--terminal-border)' }}
            >
              <Terminal className="w-5 h-5 opacity-50" />
            </div>
            <div className="text-center space-y-1">
              <p style={{ color: 'var(--terminal-fg-subtle)' }}>No output yet</p>
              <p style={{ color: 'var(--terminal-fg-muted)' }} className="text-[10px]">
                Press{' '}
                <kbd
                  className="px-1.5 py-0.5 mx-0.5 rounded font-mono"
                  style={{
                    background: 'var(--terminal-bg-alt)',
                    border: '1px solid var(--terminal-border)',
                    color: 'var(--terminal-fg-subtle)',
                  }}
                >
                  ⌘↵
                </kbd>{' '}
                to run
              </p>
            </div>
          </div>
        )}

        {!isRunning && result && (
          <div
            key={`${result.output.length}-${result.error.length}`}
            className="space-y-3 animate-fade-in"
          >
            {result.output && (
              <pre
                className="text-sm font-mono whitespace-pre-wrap break-words leading-relaxed"
                style={{ color: 'var(--terminal-fg)' }}
              >
                {result.output}
              </pre>
            )}
            {result.error && (
              <pre
                className="text-sm font-mono whitespace-pre-wrap break-words leading-relaxed"
                style={{ color: 'var(--terminal-error)' }}
              >
                {result.error}
              </pre>
            )}
            {!result.output && !result.error && (
              <p className="text-xs font-sans" style={{ color: 'var(--terminal-fg-muted)' }}>
                No output.
              </p>
            )}
          </div>
        )}
      </div>

      {isRunning && (
        <div
          className="flex items-center gap-2 px-4 py-2 border-t"
          style={{
            borderColor: 'var(--terminal-border)',
            background: 'var(--terminal-bg-alt)',
          }}
        >
          <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
          <span
            className="text-[10px] uppercase tracking-wider"
            style={{ color: 'var(--terminal-fg-muted)' }}
          >
            Process running
          </span>
        </div>
      )}
    </div>
  )
}
