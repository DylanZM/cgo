import { useMemo } from 'react'
import { X, Trash2, RotateCcw, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import type { HistoryEntry } from '../../types'
import type { Settings } from '../../types'
import { themes } from '../../hooks/useSettings'

interface HistoryPanelProps {
  history: HistoryEntry[]
  onRestore: (entry: HistoryEntry) => void
  onRemove: (id: string) => void
  onClear: () => void
  onClose: () => void
  closing?: boolean
  settings: Settings
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

export default function HistoryPanel({ history, onRestore, onRemove, onClear, onClose, closing, settings }: HistoryPanelProps) {
  const activeTheme = useMemo(
    () => themes.find((t) => t.id === settings.theme) ?? themes[0],
    [settings.theme]
  )

  const accent = activeTheme.keyword
  const panelBg = activeTheme.bg
  const panelFg = activeTheme.fg
  const isDark = useMemo(() => {
    const c = panelBg.replace('#', '')
    const r = parseInt(c.slice(0, 2), 16)
    const g = parseInt(c.slice(2, 4), 16)
    const b = parseInt(c.slice(4, 6), 16)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return luminance < 0.5
  }, [panelBg])

  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
  const muted = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'

  return (
    <div
      className={`h-full flex flex-col border-l w-72 ${closing ? 'settings-panel-out' : 'settings-panel'}`}
      style={{
        backgroundColor: panelBg,
        color: panelFg,
      }}
    >
      <div
        className="h-0.5 transition-colors duration-300 ease-out"
        style={{ backgroundColor: accent }}
        aria-hidden
      />

      <div
        className="flex items-center justify-between px-4 h-11 border-b shrink-0"
        style={{ borderColor: border }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold transition-colors duration-300" style={{ color: panelFg }}>
            Version history
          </span>
          {history.length > 0 && (
            <span
              className="px-1.5 py-0.5 text-[10px] tabular-nums rounded-full font-medium"
              style={{
                color: panelFg,
                backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
              }}
            >
              {history.length}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          aria-label="Close history"
          className="p-1 rounded transition-colors active:scale-90 duration-150"
          style={{ color: muted }}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-6 text-center">
            <div
              className="w-12 h-12 rounded-full border border-dashed flex items-center justify-center mb-3"
              style={{ borderColor: border }}
            >
              <Clock className="w-5 h-5" style={{ color: muted, opacity: 0.6 }} />
            </div>
            <p className="text-xs font-medium" style={{ color: panelFg, opacity: 0.7 }}>No versions yet</p>
            <p className="text-[10px] mt-1 leading-relaxed" style={{ color: muted }}>
              A snapshot is saved every time your code runs. Restore any version with one click.
            </p>
          </div>
        ) : (
          <ol className="relative px-3 py-3">
            <span
              className="absolute left-3 top-3 bottom-3 w-px"
              style={{ backgroundColor: border }}
              aria-hidden
            />

            {history.map((entry, i) => {
              const isFirst = i === 0
              const hasError = !!entry.error
              const dotBg = isFirst ? accent : hasError ? '#f87171' : '#34d399'
              return (
                <li
                  key={entry.id}
                  className="group relative pl-9 pr-2 py-2 rounded-md transition-colors"
                  style={{ color: panelFg }}
                >
                  <span
                    className="absolute left-3 top-3 w-2.5 h-2.5 rounded-full border-2 z-10"
                    style={{
                      backgroundColor: dotBg,
                      borderColor: panelBg,
                    }}
                    aria-hidden
                  />

                  <div className="flex items-start justify-between gap-2 min-w-0">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium tabular-nums" style={{ color: panelFg }}>
                          {isFirst ? 'Current' : `#${String(i).padStart(2, '0')}`}
                        </span>
                        {hasError ? (
                          <span
                            className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider"
                            style={{ color: '#f87171' }}
                          >
                            <AlertCircle className="w-2.5 h-2.5" />
                            Error
                          </span>
                        ) : (
                          <span
                            className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider"
                            style={{ color: '#34d399' }}
                          >
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            OK
                          </span>
                        )}
                      </div>
                      <p className="font-mono text-[10px] truncate leading-relaxed" style={{ color: muted }}>
                        {firstLine(entry.code)}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1 text-[10px]" style={{ color: muted }}>
                        <span>{timeAgo(entry.timestamp)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <button
                        onClick={() => onRestore(entry)}
                        aria-label="Restore this version"
                        title="Restore"
                        className="p-1 rounded transition-colors"
                        style={{ color: muted }}
                      >
                        <RotateCcw className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onRemove(entry.id)}
                        aria-label="Delete this version"
                        title="Delete"
                        className="p-1 rounded transition-colors hover:opacity-80"
                        style={{ color: muted }}
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
        <div
          className="px-4 py-3 border-t"
          style={{ borderColor: border }}
        >
          <button
            onClick={onClear}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs rounded-md transition-colors"
            style={{ color: '#f87171' }}
          >
            <Trash2 className="w-3 h-3" />
            Clear history
          </button>
        </div>
      )}
    </div>
  )
}
