import { useState, useMemo } from 'react'
import { X, Trash2, RotateCcw, Clock, ChevronDown } from 'lucide-react'
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

export default function HistoryPanel({ history, onRestore, onRemove, onClear, onClose, closing, settings }: HistoryPanelProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

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
  const surface = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'

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
          <span className="text-xs font-semibold" style={{ color: panelFg }}>
            Version history
          </span>
          {history.length > 0 && (
            <span
              className="px-1.5 py-0.5 text-[10px] tabular-nums rounded font-medium"
              style={{
                color: panelFg,
                backgroundColor: surface,
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
          <div className="py-1">
            {history.map((entry, i) => {
              const isFirst = i === 0
              const hasError = !!entry.error
              const isExpanded = expandedId === entry.id
              return (
                <div
                  key={entry.id}
                  className="border-b"
                  style={{ borderColor: border }}
                >
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                    className="flex items-start gap-2 px-4 py-2.5 cursor-pointer transition-colors"
                    style={{ color: panelFg }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium" style={{ color: panelFg }}>
                          {isFirst ? 'Current' : `#${String(i).padStart(2, '0')}`}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {hasError ? (
                            <span
                              className="inline-flex items-center gap-0.5 text-[9px] uppercase tracking-wider font-medium"
                              style={{ color: '#f87171' }}
                            >
                              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#f87171' }} />
                              Error
                            </span>
                          ) : (
                            <span
                              className="inline-flex items-center gap-0.5 text-[9px] uppercase tracking-wider font-medium"
                              style={{ color: '#34d399' }}
                            >
                              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#34d399' }} />
                              OK
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="font-mono text-[10px] truncate mt-1" style={{ color: muted }}>
                        {entry.code.split('\n')[0]}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={(e) => { e.stopPropagation(); onRestore(entry) }}
                        className="p-1 rounded transition-colors hover:opacity-70"
                        style={{ color: muted }}
                        title="Restore"
                      >
                        <RotateCcw className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); onRemove(entry.id) }}
                        className="p-1 rounded transition-colors hover:opacity-70"
                        style={{ color: muted }}
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                        style={{ color: muted }}
                      />
                    </div>
                  </div>

                  {isExpanded && (
                    <div
                      className="px-4 pb-3 animate-fade-in"
                      style={{ backgroundColor: surface }}
                    >
                      <div className="flex items-center gap-2 mt-1 mb-1.5">
                        <span className="text-[9px] uppercase tracking-wider font-medium" style={{ color: muted }}>
                          {timeAgo(entry.timestamp)}
                        </span>
                        <span style={{ color: border }}>·</span>
                        <span className="text-[9px] font-mono" style={{ color: muted }}>
                          {entry.code.split('\n').length} lines
                        </span>
                      </div>
                      <pre
                        className="text-[10px] font-mono leading-relaxed whitespace-pre-wrap rounded-md p-2 overflow-x-auto max-h-48 overflow-y-auto"
                        style={{
                          color: panelFg,
                          backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.04)',
                          border: `1px solid ${border}`,
                        }}
                      >
                        {entry.code}
                      </pre>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {history.length > 0 && (
        <div
          className="px-4 py-3 border-t"
          style={{ borderColor: border }}
        >
          <button
            onClick={onClear}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs rounded transition-colors hover:opacity-80 active:scale-95"
            style={{ color: '#f87171' }}
          >
            <Trash2 className="w-3 h-3" />
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}
