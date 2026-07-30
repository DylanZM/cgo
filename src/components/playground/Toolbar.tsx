import { Link } from 'react-router-dom'
import {
  Play,
  ChevronDown,
  Settings,
  History,
  Rows2,
  Columns2,
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import Button from '../ui/Button'
import { templates } from './templates'

interface ToolbarProps {
  onRun: () => void
  isRunning: boolean
  onLoadTemplate: (code: string) => void
  onToggleSettings: () => void
  onToggleHistory: () => void
  settingsOpen: boolean
  historyOpen: boolean
  layout: 'horizontal' | 'vertical'
  onToggleLayout: () => void
}

export default function Toolbar({
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
    <header className="flex items-center justify-between h-11 px-2.5 border-b border-border bg-surface shrink-0 gap-2">
      <div className="flex items-center gap-1">
        <Link
          to="/"
          className="group flex items-center gap-1.5 px-1.5 py-1 text-text-secondary text-sm font-sans rounded-md "
          title="Back to home"
        >
          <img src="/cgo.webp" alt="" className="w-12 h-12" />
        </Link>

        <div className="relative" ref={dropdownRef}>
          <Button
            variant="ghost"
            size="xs"
            active={templatesOpen}
            onClick={() => setTemplatesOpen(!templatesOpen)}
          >
            Templates
            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ease-out ${templatesOpen ? 'rotate-180' : ''}`} />
          </Button>

          {templatesOpen && (
            <div className="dropdown-panel absolute top-full left-0 mt-1.5 w-72 py-1 bg-surface-2 border border-border rounded-md shadow-2xl z-50 origin-top-left overflow-hidden">
              <div className="px-2 py-1.5 mb-1 border-b border-border">
                <p className="text-[10px] uppercase tracking-wider text-text-muted font-medium">
                  Templates
                </p>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {templates.map((t, i) => (
                  <button
                    key={t.name}
                    onClick={() => {
                      onLoadTemplate(t.code)
                      setTemplatesOpen(false)
                    }}
                    style={{ animationDelay: `${i * 30}ms` }}
                    className="dropdown-item w-full px-3 py-2 text-left hover:bg-surface-3 transition-colors flex items-start gap-3 group"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-medium text-text group-hover:text-text">
                        {t.name}
                      </div>
                      <div className="text-[10px] text-text-muted mt-0.5 line-clamp-2">
                        {t.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-0.5">
        <Button
          variant="icon"
          size="sm"
          iconOnly
          active={historyOpen}
          onClick={onToggleHistory}
          aria-label="History"
          title="History (⌘H)"
        >
          <History className="w-4 h-4" />
        </Button>
        <Button
          variant="icon"
          size="sm"
          iconOnly
          active={settingsOpen}
          onClick={onToggleSettings}
          aria-label="Settings"
          title="Settings (⌘,)"
        >
          <Settings className="w-4 h-4" />
        </Button>
        <Button
          variant="icon"
          size="sm"
          iconOnly
          onClick={onToggleLayout}
          aria-label={`${layout === 'horizontal' ? 'Vertical' : 'Horizontal'} layout`}
          title={`Switch to ${layout === 'horizontal' ? 'vertical' : 'horizontal'} layout`}
        >
          {layout === 'horizontal' ? (
            <Rows2 className="w-4 h-4" />
          ) : (
            <Columns2 className="w-4 h-4" />
          )}
        </Button>

        <Button
          iconOnly
          onClick={onRun}
          loading={isRunning}
          aria-label="Run code"
          title="Run (⌘↵)"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
        </Button>
      </div>
    </header>
  )
}
