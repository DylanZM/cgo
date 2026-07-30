import { X, Trash2, RotateCcw, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import type { HistoryEntry } from '../../types'

interface HistoryPanelProps {
  history: HistoryEntry[]
  onRestore: (entry: HistoryEntry) => void
  onRemove: (id: string) => void
  onClear: () => void
  onClose: () => void
  closing?: boolean
}

function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

function firstLine(code: string): string {
  const line = code.split('\n').find((l) => l.trim() && !l.trim().startsWith('#'))
  return line?.trim().slice(0, 50) ?? code.slice(0, 50)
}

export default function HistoryPanel({ history, onRestore, onRemove, onClear, onClose }: HistoryPanelProps) {
  return (
    <div
      className="h-full flex flex-col bg-surface border-l border-border w-72"
      style={{ animation: 'panel-in 200ms cubic-bezier(0.23, 1, 0.32, 1)' }}
    >
      <div className="flex items-center justify-between px-4 h-11 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-text">Version history</span>
          {history.length > 0 && (
            <span className="px-1.5 py-0.5 text-[10px] tabular-nums rounded-full bg-surface-3 text-text-muted font-medium">
              {history.length}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          aria-label="Close history"
          className="p-1 rounded text-text-muted hover:text-text hover:bg-surface-2 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-6 text-center">
            <div className="w-12 h-12 rounded-full border border-dashed border-border flex items-center justify-center mb-3">
              <Clock className="w-5 h-5 text-text-muted opacity-60" />
            </div>
            <p className="text-xs text-text-secondary font-medium">No versions yet</p>
            <p className="text-[10px] text-text-muted mt-1 leading-relaxed">
              A snapshot is saved every time your code runs. Restore any version with one click.
            </p>
          </div>
        ) : (
          <ol className="relative px-3 py-3">
            <span className="absolute left-3 top-3 bottom-3 w-px bg-border" aria-hidden />

            {history.map((entry, i) => {
              const isFirst = i === 0
              const hasError = !!entry.error
              return (
                <li
                  key={entry.id}
                  className="group relative pl-9 pr-2 py-2 rounded-md hover:bg-surface-2 transition-colors"
                >
                  <span
                    className={`absolute left-3 top-3 w-2.5 h-2.5 rounded-full border-2 border-surface z-10 ${
                      isFirst
                        ? 'bg-text'
                        : hasError
                          ? 'bg-error'
                          : 'bg-success'
                    }`}
                    aria-hidden
                  />

                  <div className="flex items-start justify-between gap-2 min-w-0">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-text tabular-nums">
                          {isFirst ? 'Current' : `#${String(i).padStart(2, '0')}`}
                        </span>
                        {hasError ? (
                          <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider text-error">
                            <AlertCircle className="w-2.5 h-2.5" />
                            Error
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider text-success">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            OK
                          </span>
                        )}
                      </div>
                      <p className="font-mono text-[10px] text-text-muted truncate leading-relaxed">
                        {firstLine(entry.code)}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1 text-[10px] text-text-muted">
                        <span>{timeAgo(entry.timestamp)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <button
                        onClick={() => onRestore(entry)}
                        aria-label="Restore this version"
                        title="Restore"
                        className="p-1 rounded text-text-muted hover:text-text hover:bg-surface-3 transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onRemove(entry.id)}
                        aria-label="Delete this version"
                        title="Delete"
                        className="p-1 rounded text-text-muted hover:text-error hover:bg-error-dim transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        )}
      </div>

      {history.length > 0 && (
        <div className="px-4 py-3 border-t border-border">
          <button
            onClick={onClear}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs text-error hover:bg-error-dim rounded-md transition-colors"
          >
            <Trash2 className="w-3 h-3" />
            Clear history
          </button>
        </div>
      )}
    </div>
  )
}
