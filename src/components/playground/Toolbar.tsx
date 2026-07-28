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
          className="flex items-center gap-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          <Code2 className="w-4 h-4 text-[var(--color-accent)]" />
          <span className="font-medium hidden sm:inline">cgo</span>
        </Link>

        <div className="w-px h-5 bg-[var(--color-border)] mx-1 hidden sm:block" />

        <div className="flex items-center rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] text-xs overflow-hidden">
          <button
            onClick={() => onLanguageChange('c++')}
            className={`px-2.5 py-1 transition-colors ${
              language === 'c++'
                ? 'bg-[var(--color-accent)] text-white'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
            }`}
          >
            C++
          </button>
          <button
            onClick={() => onLanguageChange('c')}
            className={`px-2.5 py-1 transition-colors ${
              language === 'c'
                ? 'bg-[var(--color-accent)] text-white'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
            }`}
          >
            C
          </button>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setTemplatesOpen(!templatesOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text)] bg-[var(--color-bg)] border border-[var(--color-border)] rounded-md transition-colors"
          >
            Templates
            <ChevronDown className="w-3 h-3" />
          </button>

          {templatesOpen && (
            <div className="absolute top-full left-0 mt-1 w-56 py-1 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-lg shadow-xl z-50">
              {templates.map((t) => (
                <button
                  key={t.name}
                  onClick={() => {
                    onLoadTemplate(t.code, t.language)
                    setTemplatesOpen(false)
                  }}
                  className="w-full px-3 py-2 text-left text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-3)] transition-colors flex items-center justify-between"
                >
                  <span>{t.name}</span>
                  <span className="text-[var(--color-text-muted)] text-[10px] uppercase">{t.language}</span>
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
              ? 'text-[var(--color-accent)] bg-[var(--color-accent-dim)]'
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
              ? 'text-[var(--color-accent)] bg-[var(--color-accent-dim)]'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)]'
          }`}
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>

        <button
          onClick={onRun}
          disabled={isRunning}
          className="group flex items-center gap-1.5 px-3 py-1.5 ml-1 text-xs font-medium text-white bg-[var(--color-accent)] rounded-md transition-all hover:brightness-110 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRunning ? (
            <Loader className="w-3 h-3 animate-spin" />
          ) : (
            <Play className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          )}
          {isRunning ? 'Running...' : 'Run'}
        </button>
      </div>
    </header>
  )
}
