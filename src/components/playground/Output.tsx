import { Loader } from 'lucide-react'
import type { CompileResponse } from '../../types'

interface OutputProps {
  result: CompileResponse | null
  isRunning: boolean
  stdin: string
  onStdinChange: (val: string) => void
}

export default function Output({ result, isRunning, stdin, onStdinChange }: OutputProps) {
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
          <div className="h-full" />
        )}

        {!isRunning && result && (
          <div
            key={`${result.output.length}-${result.error.length}`}
            className="space-y-3 animate-fade-in"
          >
            {result.output && (
              <pre
                className="text-sm font-mono whitespace-pre-wrap leading-relaxed"
                style={{ color: 'var(--terminal-fg)' }}
              >
                {result.output}
              </pre>
            )}
            {result.error && (
              <pre
                className="text-sm font-mono whitespace-pre-wrap leading-relaxed"
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

      <div
        className="shrink-0 border-t px-4 py-2.5"
        style={{
          background: 'var(--terminal-bg-alt)',
          borderColor: 'var(--terminal-border)',
        }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className="text-[10px] uppercase tracking-wider font-medium"
            style={{ color: 'var(--terminal-fg-subtle)' }}
          >
            Input
          </span>
          {stdin && (
            <span
              className="text-[10px] px-1.5 py-0.5 rounded"
              style={{
                color: 'var(--terminal-fg-muted)',
                background: 'var(--terminal-bg)',
              }}
            >
              Will be sent on next run
            </span>
          )}
        </div>
        <textarea
          value={stdin}
          onChange={(e) => onStdinChange(e.target.value)}
          placeholder="Type input here before running..."
          rows={2}
          className="w-full resize-none text-xs font-mono leading-relaxed rounded border-none outline-none p-2 placeholder:opacity-40"
          style={{
            background: 'var(--terminal-bg)',
            color: 'var(--terminal-fg)',
          }}
        />
      </div>
    </div>
  )
}
