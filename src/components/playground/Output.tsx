import { Terminal, Loader, AlertCircle, CheckCircle2, Clock } from 'lucide-react'
import type { CompileResponse } from '../../types'

interface OutputProps {
  result: CompileResponse | null
  isRunning: boolean
}

export default function Output({ result, isRunning }: OutputProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-3 h-9 border-b border-[var(--color-border)] bg-[var(--color-surface)] shrink-0">
        <Terminal className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
        <span className="text-xs font-medium text-[var(--color-text-secondary)]">Output</span>
        {result && (
          <div className="ml-auto flex items-center gap-2">
            {result.exitCode === 0 ? (
              <CheckCircle2 className="w-3 h-3 text-[var(--color-success)] animate-scale-in" />
            ) : (
              <AlertCircle className="w-3 h-3 text-[var(--color-error)] animate-scale-in" />
            )}
            {result.time > 0 && (
              <span className="flex items-center gap-1 text-[10px] text-[var(--color-text-muted)] animate-fade-in">
                <Clock className="w-2.5 h-2.5" />
                {result.time}ms
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto bg-[var(--color-bg)] p-4">
        {isRunning && (
          <div className="flex items-center gap-2 text-[var(--color-text-muted)] text-xs animate-fade-in">
            <Loader className="w-3.5 h-3.5 animate-spin" />
            Compiling and running...
          </div>
        )}

        {!isRunning && !result && (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-[var(--color-text-muted)]">
            <Terminal className="w-8 h-8 opacity-30" />
            <p className="text-xs">Press Run or Ctrl+Enter to execute</p>
          </div>
        )}

        {!isRunning && result && (
          <div key={`${result.output.length}-${result.error.length}`} className="space-y-3 animate-fade-in">
            {result.output && (
              <div>
                <span className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">stdout</span>
                <pre className="mt-1 text-sm font-mono text-[var(--color-text)] whitespace-pre-wrap break-words leading-relaxed">
                  {result.output}
                </pre>
              </div>
            )}
            {result.error && (
              <div>
                <span className="text-[10px] font-medium text-[var(--color-error)] uppercase tracking-wider">stderr</span>
                <pre className="mt-1 text-sm font-mono text-[var(--color-error)] whitespace-pre-wrap break-words leading-relaxed">
                  {result.error}
                </pre>
              </div>
            )}
            {!result.output && !result.error && (
              <p className="text-xs text-[var(--color-text-muted)]">No output.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
