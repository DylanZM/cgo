import { useState, useMemo, useCallback } from 'react'
import { X, Trash2, RotateCcw, Clock, ChevronDown, FileCode } from 'lucide-react'
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

const CPP_KEYWORDS = new Set([
  'auto', 'break', 'case', 'catch', 'class', 'const', 'continue', 'default',
  'delete', 'do', 'else', 'enum', 'explicit', 'extern', 'false', 'finally',
  'for', 'friend', 'goto', 'if', 'include', 'inline', 'namespace', 'new',
  'operator', 'private', 'protected', 'public', 'return', 'signed', 'sizeof',
  'static', 'struct', 'switch', 'template', 'this', 'throw', 'true', 'try',
  'typedef', 'typename', 'union', 'unsigned', 'using', 'virtual', 'void',
  'volatile', 'while', 'define', 'ifdef', 'ifndef', 'endif', 'pragma', 'error',
  'int', 'long', 'short', 'char', 'float', 'double', 'bool', 'string',
])

type Token = { text: string; type: 'normal' | 'keyword' | 'string' | 'number' | 'comment' | 'preprocessor' | 'type' | 'punctuation' }

function tokenize(code: string): Token[][] {
  const lines: Token[][] = []
  let i = 0
  while (i < code.length) {
    const lineEnd = code.indexOf('\n', i)
    const line = lineEnd === -1 ? code.slice(i) : code.slice(i, lineEnd)
    i = lineEnd === -1 ? code.length : lineEnd + 1

    const tokens: Token[] = []
    let j = 0
    while (j < line.length) {
      const rest = line.slice(j)

      const commentMatch = rest.match(/^\/\/.*/)
      if (commentMatch) {
        tokens.push({ text: commentMatch[0], type: 'comment' })
        j = line.length
        break
      }

      const stringMatch = rest.match(/^"([^"\\]|\\.)*"/)
      if (stringMatch) {
        tokens.push({ text: stringMatch[0], type: 'string' })
        j += stringMatch[0].length
        continue
      }

      const charMatch = rest.match(/^'([^'\\]|\\.)*'/)
      if (charMatch) {
        tokens.push({ text: charMatch[0], type: 'string' })
        j += charMatch[0].length
        continue
      }

      const preprocessorMatch = rest.match(/^#\w+/)
      if (preprocessorMatch) {
        tokens.push({ text: preprocessorMatch[0], type: 'preprocessor' })
        j += preprocessorMatch[0].length
        continue
      }

      const numberMatch = rest.match(/^\d+\.?\d*(?:[eE][+-]?\d+)?/)
      if (numberMatch) {
        tokens.push({ text: numberMatch[0], type: 'number' })
        j += numberMatch[0].length
        continue
      }

      const identMatch = rest.match(/^[a-zA-Z_]\w*/)
      if (identMatch) {
        const word = identMatch[0]
        if (CPP_KEYWORDS.has(word)) {
          tokens.push({ text: word, type: 'keyword' })
        } else if (word[0] === word[0].toUpperCase() && word[0] !== word[0].toLowerCase()) {
          tokens.push({ text: word, type: 'type' })
        } else {
          tokens.push({ text: word, type: 'normal' })
        }
        j += word.length
        continue
      }

      const punctMatch = rest.match(/^[{}()\[\];:,.<>+\-*/%&|^~!?=@]+/)
      if (punctMatch) {
        tokens.push({ text: punctMatch[0], type: 'punctuation' })
        j += punctMatch[0].length
        continue
      }

      tokens.push({ text: rest[0], type: 'normal' })
      j++
    }
    lines.push(tokens)
  }
  return lines
}

function deriveColors(accent: string, isDark: boolean) {
  return {
    keyword: accent,
    preprocessor: accent,
    string: isDark ? '#a5d6ff' : '#0a3069',
    number: isDark ? '#79c0ff' : '#0550ae',
    comment: isDark ? '#6e7681' : '#6e7781',
    type: isDark ? '#ffa657' : '#953800',
  }
}

function HighlightedCode({ code, accent, isDark }: { code: string; accent: string; isDark: boolean }) {
  const colors = useMemo(() => deriveColors(accent, isDark), [accent, isDark])
  const lines = useMemo(() => tokenize(code), [code])

  return (
    <code className="text-[10px] font-mono leading-relaxed block">
      {lines.map((tokens, li) => (
        <div key={li} className="flex">
          <span
            className="select-none text-right pr-3 w-7 shrink-0"
            style={{ color: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)' }}
          >
            {li + 1}
          </span>
          <span className="whitespace-pre">
            {tokens.map((t, tj) => {
              const color = t.type === 'normal' || t.type === 'punctuation' ? undefined : colors[t.type]
              return (
                <span key={tj} style={color ? { color } : undefined}>
                  {t.text}
                </span>
              )
            })}
          </span>
        </div>
      ))}
    </code>
  )
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
  const surfaceAlt = isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'

  const statusColor = useCallback((hasError: boolean) => hasError ? '#f87171' : '#34d399', [])

  const toggleExpand = useCallback((id: string) => {
    setExpandedId(prev => prev === id ? null : id)
  }, [])

  return (
    <div
      className={`h-full flex flex-col border-l w-80 ${closing ? 'settings-panel-out' : 'settings-panel'}`}
      style={{
        backgroundColor: panelBg,
        color: panelFg,
      }}
    >
      <div
        className="h-0.5"
        style={{ backgroundColor: accent }}
        aria-hidden
      />

      <div
        className="flex items-center justify-between px-4 h-11 border-b shrink-0"
        style={{ borderColor: border }}
      >
        <div className="flex items-center gap-2.5">
          <FileCode className="w-3.5 h-3.5" style={{ color: accent }} />
          <span className="text-xs font-semibold" style={{ color: panelFg }}>
            History
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
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
              style={{ backgroundColor: surface }}
            >
              <Clock className="w-5 h-5" style={{ color: muted, opacity: 0.6 }} />
            </div>
            <p className="text-xs font-medium" style={{ color: panelFg, opacity: 0.7 }}>No versions yet</p>
            <p className="text-[10px] mt-1 leading-relaxed max-w-[200px]" style={{ color: muted }}>
              A snapshot is saved every time your code runs.
            </p>
          </div>
        ) : (
          <div>
            {history.map((entry, i) => {
              const isFirst = i === 0
              const hasError = !!entry.error
              const isExpanded = expandedId === entry.id
              const status = statusColor(hasError)

              return (
                <div
                  key={entry.id}
                  style={{ borderColor: border }}
                >
                  <div
                    onClick={() => toggleExpand(entry.id)}
                    className="relative cursor-pointer transition-colors"
                    style={{ color: panelFg }}
                  >
                    <div
                      className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full transition-colors duration-300"
                      style={{
                        backgroundColor: isExpanded ? accent : 'transparent',
                        opacity: isExpanded ? 1 : 0,
                      }}
                    />

                    <div
                      className="flex items-start gap-2.5 pl-4 pr-2.5 py-2 hover:opacity-90"
                      style={{ backgroundColor: isFirst ? surfaceAlt : 'transparent' }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-1 shrink-0"
                        style={{ backgroundColor: status }}
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium" style={{ color: panelFg }}>
                            {isFirst ? 'Current' : `#${String(i).padStart(2, '0')}`}
                          </span>
                          <span className="text-[9px]" style={{ color: muted }}>
                            {timeAgo(entry.timestamp)}
                          </span>
                        </div>
                        <p className="font-mono text-[10px] truncate mt-0.5" style={{ color: muted }}>
                          {entry.code.split('\n')[0]}
                        </p>
                      </div>

                      <div className="flex items-center gap-0.5 shrink-0">
                        <button
                          onClick={(e) => { e.stopPropagation(); onRestore(entry) }}
                          className="p-1 rounded transition-colors hover:opacity-70 active:scale-90"
                          style={{ color: muted }}
                          title="Restore"
                        >
                          <RotateCcw className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); onRemove(entry.id) }}
                          className="p-1 rounded transition-colors hover:opacity-70 active:scale-90"
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
                  </div>

                  <div
                    className="overflow-hidden transition-all duration-200 ease-out"
                    style={{
                      maxHeight: isExpanded ? '600px' : '0px',
                      opacity: isExpanded ? 1 : 0,
                    }}
                  >
                    <div
                      className="mx-3 mb-3 rounded-md overflow-hidden"
                      style={{
                        backgroundColor: isDark ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.03)',
                        border: `1px solid ${border}`,
                      }}
                    >
                      <div
                        className="flex items-center gap-2 px-3 py-1.5 border-b"
                        style={{ borderColor: border, backgroundColor: surface }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: isFirst ? status : accent, opacity: 0.7 }}
                        />
                        <span className="text-[9px] font-mono" style={{ color: muted }}>
                          {entry.code.split('\n').length} lines
                        </span>
                        <span style={{ color: border }}>·</span>
                        <span className="text-[9px]" style={{ color: muted }}>
                          {timeAgo(entry.timestamp)}
                        </span>
                      </div>
                      <div className="p-2.5 overflow-x-auto max-h-72 overflow-y-auto">
                        <HighlightedCode code={entry.code} accent={accent} isDark={isDark} />
                      </div>
                    </div>
                  </div>
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
            className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs rounded transition-colors active:scale-95"
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
