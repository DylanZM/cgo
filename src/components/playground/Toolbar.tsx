import { Link } from 'react-router-dom'
import {
  Play,
  Code2,
  ChevronDown,
  Settings,
  History,
  ChevronLeft,
  Loader,
  Columns2,
  Rows2,
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { templates } from './templates'

interface ToolbarProps {
  language: 'c' | 'c++'
  onLanguageChange: (lang: 'c' | 'c++') => void
  onRun: () => void
  isRunning: boolean
  onLoadTemplate: (code: string, lang: 'c' | 'c++') => void
  onToggleSettings: () => void
  onToggleHistory: () => void
  settingsOpen: boolean
  historyOpen: boolean
  layout: 'horizontal' | 'vertical'
  onToggleLayout: () => void
}

export default function Toolbar({
  language,
  onLanguageChange,
  onRun,
  isRunning,
  onLoadTemplate,
  onToggleSettings,
  onToggleHistory,
  settingsOpen,
  historyOpen,
  layout,
  onToggleLayout,
}: ToolbarProps) {
  const [templatesOpen, setTemplatesOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setTemplatesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header className="flex items-center justify-between h-11 px-2.5 border-b border-[var(--color-border)] bg-[var(--color-surface)] shrink-0">
      <div className="flex items-center gap-1">
        <Link
          to="/"
          className="group flex items-center gap-1.5 px-1.5 py-1 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors text-sm"
          title="Back to home"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <Code2 className="w-4 h-4" />
          <span className="font-semibold hidden sm:inline tracking-tight">cgo</span>
        </Link>

        <div className="w-px h-4 bg-[var(--color-border)] mx-1 hidden sm:block" />

        <div className="flex items-center rounded-md bg-[var(--color-bg)] text-xs overflow-hidden border border-[var(--color-border)]">
          {(['c++', 'c'] as const).map((lang, i) => (
            <button
              key={lang}
              onClick={() => onLanguageChange(lang)}
              className={`relative px-2.5 py-1 transition-colors font-medium tracking-tight ${
                language === lang
                  ? 'text-[var(--color-text)]'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
              } ${i > 0 ? 'border-l border-[var(--color-border)]' : ''}`}
            >
              {language === lang && (
                <span className="absolute inset-0 bg-[var(--color-surface-2)] -z-10" />
              )}
              {lang === 'c++' ? 'C++' : 'C'}
            </button>
          ))}
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setTemplatesOpen(!templatesOpen)}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md transition-colors ${
              templatesOpen
                ? 'text-[var(--color-text)] bg-[var(--color-surface-2)]'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)]'
            }`}
          >
            Templates
            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${templatesOpen ? 'rotate-180' : ''}`} />
          </button>

          {templatesOpen && (
            <div
              className="absolute top-full left-0 mt-1.5 w-72 py-1 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-md shadow-2xl z-50 origin-top-left"
              style={{ animation: 'dropdown-in 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
            >
              <div className="px-2 py-1.5 mb-1 border-b border-[var(--color-border)]">
                <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">
                  Templates
                </p>
              </div>
              {templates.map((t) => (
                <button
                  key={t.name}
                  onClick={() => {
                    onLoadTemplate(t.code, t.language)
                    setTemplatesOpen(false)
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-[var(--color-surface-3)] transition-colors flex items-start justify-between gap-3 group"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-[var(--color-text)] group-hover:text-[var(--color-text)]">
                      {t.name}
                    </div>
                    <div className="text-[10px] text-[var(--color-text-muted)] mt-0.5">
                      {t.description}
                    </div>
                  </div>
                  <span className="shrink-0 mt-0.5 px-1.5 py-0.5 text-[9px] uppercase tracking-wider rounded bg-[var(--color-bg)] text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)] font-medium">
                    {t.language}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-0.5">
        <button
          onClick={onToggleHistory}
          aria-label="History"
          title="History (⌘H)"
          className={`p-2 rounded-md transition-colors ${
            historyOpen
              ? 'text-[var(--color-text)] bg-[var(--color-surface-3)]'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)]'
          }`}
        >
          <History className="w-4 h-4" />
        </button>
        <button
          onClick={onToggleSettings}
          aria-label="Settings"
          title="Settings (⌘,)"
          className={`p-2 rounded-md transition-colors ${
            settingsOpen
              ? 'text-[var(--color-text)] bg-[var(--color-surface-3)]'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)]'
          }`}
        >
          <Settings className="w-4 h-4" />
        </button>

        <button
          onClick={onToggleLayout}
          aria-label={`${layout === 'horizontal' ? 'Vertical' : 'Horizontal'} layout`}
          aria-pressed={layout === 'vertical'}
          title={`Switch to ${layout === 'horizontal' ? 'vertical' : 'horizontal'} layout`}
          className="p-2 rounded-md transition-all active:scale-95 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)]"
        >
          {layout === 'horizontal' ? (
            <Rows2 className="w-4 h-4" />
          ) : (
            <Columns2 className="w-4 h-4" />
          )}
        </button>

        <div className="w-px h-4 bg-[var(--color-border)] mx-1" />

        <button
          onClick={onRun}
          disabled={isRunning}
          aria-label="Run code"
          title={`Run (⌘↵)`}
          className="group flex items-center justify-center w-8 h-8 ml-0.5 rounded-md bg-[var(--color-text)] text-[var(--color-bg)] transition-all hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isRunning ? (
            <Loader className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current transition-transform group-hover:scale-110" />
          )}
        </button>
      </div>
    </header>
  )
}
