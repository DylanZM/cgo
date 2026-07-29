import { Link } from 'react-router-dom'
import {
  Play,
  Code2,
  ChevronDown,
  Settings,
  History,
  ChevronLeft,
  Loader,
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
    <header className="flex items-center justify-between h-12 px-3 border-b border-[var(--color-border)] bg-[var(--color-surface)] shrink-0">
      <div className="flex items-center gap-2">
        <Link
          to="/"
          className="group flex items-center gap-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors text-sm"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <Code2 className="w-4 h-4" />
          <span className="font-medium hidden sm:inline tracking-tight">cgo</span>
        </Link>

        <div className="w-px h-5 bg-[var(--color-border)] mx-1 hidden sm:block" />

        <div className="flex items-center rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] text-xs overflow-hidden">
          <button
            onClick={() => onLanguageChange('c++')}
            className={`px-3 py-1.5 transition-colors font-medium ${
              language === 'c++'
                ? 'bg-[var(--color-surface-3)] text-[var(--color-text)]'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
            }`}
          >
            C++
          </button>
          <button
            onClick={() => onLanguageChange('c')}
            className={`px-3 py-1.5 transition-colors font-medium ${
              language === 'c'
                ? 'bg-[var(--color-surface-3)] text-[var(--color-text)]'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
            }`}
          >
            C
          </button>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setTemplatesOpen(!templatesOpen)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md transition-colors border ${
              templatesOpen
                ? 'text-[var(--color-text)] bg-[var(--color-surface-2)] border-[var(--color-border)]'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] bg-[var(--color-bg)] border-[var(--color-border)]'
            }`}
          >
            Templates
            <ChevronDown className={`w-3 h-3 transition-transform ${templatesOpen ? 'rotate-180' : ''}`} />
          </button>

          {templatesOpen && (
            <div className="absolute top-full left-0 mt-1.5 w-64 py-1 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-md shadow-2xl z-50 animate-fade-in">
              {templates.map((t) => (
                <button
                  key={t.name}
                  onClick={() => {
                    onLoadTemplate(t.code, t.language)
                    setTemplatesOpen(false)
                  }}
                  className="w-full px-3 py-2 text-left text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-3)] transition-colors flex items-center justify-between group"
                >
                  <span>{t.name}</span>
                  <span className="text-[var(--color-text-muted)] text-[10px] uppercase tracking-wider group-hover:text-[var(--color-text-secondary)]">
                    {t.language}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={onToggleHistory}
          className={`p-2 rounded-md transition-colors ${
            historyOpen
              ? 'text-[var(--color-text)] bg-[var(--color-surface-3)]'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)]'
          }`}
          title="History"
        >
          <History className="w-4 h-4" />
        </button>
        <button
          onClick={onToggleSettings}
          className={`p-2 rounded-md transition-colors ${
            settingsOpen
              ? 'text-[var(--color-text)] bg-[var(--color-surface-3)]'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)]'
          }`}
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>

        <button
          onClick={onRun}
          disabled={isRunning}
          className="group flex items-center gap-1.5 px-3 py-1.5 ml-1 text-xs font-medium text-[var(--color-bg)] bg-[var(--color-text)] rounded-md transition-all hover:opacity-90 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isRunning ? (
            <Loader className="w-3 h-3 animate-spin" />
          ) : (
            <Play className="w-3 h-3 transition-transform group-hover:translate-x-0.5 fill-current" />
          )}
          {isRunning ? 'Running' : 'Run'}
          {!isRunning && (
            <kbd className="hidden sm:inline-flex items-center px-1.5 ml-1 text-[9px] text-[var(--color-text-muted)] bg-[var(--color-surface)]/30 rounded border border-[var(--color-border)]">
              ⌘↵
            </kbd>
          )}
        </button>
      </div>
    </header>
  )
}
