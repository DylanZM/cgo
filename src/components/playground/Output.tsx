import { useState } from 'react'
import { Terminal, Loader, AlertCircle, CheckCircle2, Clock, Copy } from 'lucide-react'
import type { CompileResponse } from '../../types'

interface OutputProps {
  result: CompileResponse | null
  isRunning: boolean
}

type Tab = 'stdout' | 'stderr' | 'both'

export default function Output({ result, isRunning }: OutputProps) {
  const [tab, setTab] = useState<Tab>('both')
  const [copied, setCopied] = useState(false)

  const hasStdout = !!result?.output
  const hasStderr = !!result?.error
  const exitOk = result?.exitCode === 0

  const textToCopy = tab === 'stderr' ? result?.error : tab === 'stdout' ? result?.output : `${result?.output ?? ''}${result?.error ? '\n' + result.error : ''}`

  function handleCopy() {
    if (!textToCopy) return
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  return (
    <div className="flex flex-col h-full terminal">
      <div className="flex items-center gap-2 px-3 h-10 border-b border-[var(--color-border)] bg-[var(--color-surface)] shrink-0">
        <Terminal className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
        <span className="text-xs font-medium text-[var(--color-text-secondary)]">Output</span>

        {result && !isRunning && (hasStdout || hasStderr) && (
          <div className="flex items-center gap-0.5 ml-2">
            {(['both', 'stdout', 'stderr'] as Tab[]).map((t) => {
              const disabled =
                (t === 'stdout' && !hasStdout) ||
                (t === 'stderr' && !hasStderr)
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  disabled={disabled}
                  className={`px-2 py-0.5 text-[10px] uppercase tracking-wider rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                    tab === t
                      ? 'bg-[var(--color-surface-3)] text-[var(--color-text)]'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
                  }`}
                >
                  {t}
                </button>
              )
            })}
          </div>
        )}

        {result && (
          <div className="ml-auto flex items-center gap-2">
            {exitOk ? (
              <CheckCircle2 className="w-3 h-3 text-[var(--color-success)]" />
            ) : (
              <AlertCircle className="w-3 h-3 text-[var(--color-error)]" />
            )}
            {result.time > 0 && (
              <span className="flex items-center gap-1 text-[10px] text-[var(--color-text-muted)] font-mono">
                <Clock className="w-2.5 h-2.5" />
                {result.time}ms
              </span>
            )}
            {(hasStdout || hasStderr) && (
              <button
                onClick={handleCopy}
                title={copied ? 'Copied' : 'Copy output'}
                className="p-1 rounded text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)] transition-colors"
              >
                <Copy className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </div>

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
            key={`${result.output.length}-${result.error.length}-${tab}`}
            className="space-y-3 animate-fade-in"
          >
            {(tab === 'both' || tab === 'stdout') && result.output && (
              <section>
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="text-[10px] font-medium uppercase tracking-wider"
                    style={{ color: 'var(--terminal-fg-muted)' }}
                  >
                    stdout
                  </span>
                  <span
                    className="flex-1 h-px"
                    style={{ background: 'var(--terminal-border)' }}
                  />
                </div>
                <pre
                  className="text-sm font-mono whitespace-pre-wrap break-words leading-relaxed"
                  style={{ color: 'var(--terminal-fg)' }}
                >
                  {result.output}
                </pre>
              </section>
            )}
            {(tab === 'both' || tab === 'stderr') && result.error && (
              <section>
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="text-[10px] font-medium uppercase tracking-wider"
                    style={{ color: 'var(--terminal-error)' }}
                  >
                    stderr
                  </span>
                  <span
                    className="flex-1 h-px"
                    style={{ background: 'var(--terminal-error-dim)' }}
                  />
                </div>
                <pre
                  className="text-sm font-mono whitespace-pre-wrap break-words leading-relaxed"
                  style={{ color: 'var(--terminal-error)' }}
                >
                  {result.error}
                </pre>
              </section>
            )}
            {!result.output && !result.error && (
              <p className="text-xs font-sans" style={{ color: 'var(--terminal-fg-muted)' }}>
                No output.
              </p>
            )}
            {tab === 'stdout' && !result.output && result.error && (
              <p className="text-xs font-sans" style={{ color: 'var(--terminal-fg-muted)' }}>
                No stdout output. View stderr for details.
              </p>
            )}
            {tab === 'stderr' && !result.error && result.output && (
              <p className="text-xs font-sans" style={{ color: 'var(--terminal-fg-muted)' }}>
                No errors. View stdout for output.
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
