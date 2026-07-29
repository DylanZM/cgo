import { X, Trash2, RotateCcw, Clock } from 'lucide-react'
import type { HistoryEntry } from '../../types'

interface HistoryPanelProps {
  history: HistoryEntry[]
  onRestore: (entry: HistoryEntry) => void
  onRemove: (id: string) => void
  onClear: () => void
  onClose: () => void
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

export default function HistoryPanel({ history, onRestore, onRemove, onClear, onClose }: HistoryPanelProps) {
  return (
    <div className="h-full flex flex-col bg-[var(--color-surface)] border-l border-[var(--color-border)] w-72 animate-slide-in-right">
      <div className="flex items-center justify-between px-4 h-10 border-b border-[var(--color-border)] shrink-0">
        <span className="text-xs font-medium text-[var(--color-text)]">Version History</span>
        <button onClick={onClose} className="p-1 rounded text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)] transition-colors">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-[var(--color-text-muted)] px-4">
            <Clock className="w-8 h-8 opacity-30" />
            <p className="text-xs text-center">No versions yet. A snapshot is saved every time you run.</p>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {history.map((entry, i) => (
              <div
                key={entry.id}
                className="group relative p-3 rounded-lg border border-transparent hover:border-[var(--color-border)] hover:bg-[var(--color-surface-2)] transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {i === 0 && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text)] shrink-0" />
                      )}
                      <span className="text-xs font-medium text-[var(--color-text)]">
                        {i === 0 ? 'Current' : `Snapshot ${i}`}
                      </span>
                    </div>
                    <p className="text-[10px] text-[var(--color-text-muted)]">
                      {entry.language.toUpperCase()} &middot; {timeAgo(entry.timestamp)}
                    </p>
                    {entry.error && (
                      <span className="inline-block mt-1 px-1.5 py-0.5 text-[9px] rounded bg-[var(--color-error-dim)] text-[var(--color-error)]">
                        Error
                      </span>
                    )}
                    {!entry.error && entry.output && (
                      <span className="inline-block mt-1 px-1.5 py-0.5 text-[9px] rounded bg-[var(--color-success-dim)] text-[var(--color-success)]">
                        OK
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <button
                      onClick={() => onRestore(entry)}
                      className="p-1 rounded text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-3)] transition-colors"
                      title="Restore"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onRemove(entry.id)}
                      className="p-1 rounded text-[var(--color-text-muted)] hover:text-[var(--color-error)] hover:bg-[var(--color-error-dim)] transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {history.length > 0 && (
        <div className="p-3 border-t border-[var(--color-border)]">
          <button
            onClick={onClear}
            className="w-full px-3 py-1.5 text-xs text-[var(--color-error)] hover:bg-[var(--color-error-dim)] rounded-md transition-colors"
          >
            Clear history
          </button>
        </div>
      )}
    </div>
  )
}
