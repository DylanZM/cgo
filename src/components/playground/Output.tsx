import {  Loader } from 'lucide-react'
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
         
            
          </div>
        )}

        {!isRunning && result && (
          <div
            key={`${result.output.length}-${result.error.length}`}
            className="space-y-3 animate-fade-in"
          >
            {result.output && (
              <pre
                className="text-sm font-mono whitespace-pre-wrap  leading-relaxed"
                style={{ color: 'var(--terminal-fg)' }}
              >
                {result.output}
              </pre>
            )}
            {result.error && (
              <pre
                className="text-sm font-mono whitespace-pre-wrap  leading-relaxed"
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
    </div>
  )
}
