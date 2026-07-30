import { useEffect, useRef, useState } from 'react'
import { X, Sun, Code, Hash, Check } from 'lucide-react'
import type { Settings } from '../../types'
import { themes, fonts } from '../../hooks/useSettings'

interface SettingsPanelProps {
  settings: Settings
  onUpdate: (partial: Partial<Settings>) => void
  onClose: () => void
}

function Toggle({
  checked,
  onChange,
  label,
  description,
  delay,
}: {
  checked: boolean
  onChange: () => void
  label: string
  description?: string
  delay: number
}) {
  return (
    <button
      onClick={onChange}
      aria-pressed={checked}
      style={{ animationDelay: `${delay}ms` }}
      className="settings-row w-full flex items-center justify-between gap-3 py-2 text-left group active:scale-[0.99] transition-transform duration-150 ease-out"
    >
      <div className="min-w-0">
        <div className="text-xs text-text-secondary group-hover:text-text transition-colors">
          {label}
        </div>
        {description && (
          <div className="text-[10px] text-text-muted mt-0.5">
            {description}
          </div>
        )}
      </div>
      <span
        className={`relative shrink-0 w-8 rounded-full transition-colors duration-200 ease-out group-hover:brightness-110 ${
          checked ? 'bg-text' : 'bg-surface-3'
        }`}
        style={{ height: '18px' }}
      >
        <span
          className={`absolute top-[3px] left-[3px] w-3 h-3 rounded-full bg-bg shadow-sm transition-all duration-200 ease-out ${
            checked
              ? 'translate-x-[14px] scale-110'
              : 'translate-x-0 scale-100'
          }`}
        />
      </span>
    </button>
  )
}

function SectionHeader({ icon: Icon, title, delay }: { icon: typeof Sun; title: string; delay: number }) {
  return (
    <div
      className="settings-row flex items-center gap-2 mb-3"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Icon className="w-3 h-3 text-text-muted" />
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">
        {title}
      </h3>
    </div>
  )
}

export default function SettingsPanel({ settings, onUpdate, onClose }: SettingsPanelProps) {
  const prevTheme = useRef(settings.theme)
  const [flashTheme, setFlashTheme] = useState<string | null>(null)

  useEffect(() => {
    if (prevTheme.current !== settings.theme) {
      setFlashTheme(prevTheme.current)
      const t = setTimeout(() => setFlashTheme(null), 320)
      prevTheme.current = settings.theme
      return () => clearTimeout(t)
    }
  }, [settings.theme])

  return (
    <div
      className="settings-panel h-full flex flex-col bg-surface border-l border-border w-72 relative"
    >
      <div className="flex items-center justify-between px-4 h-11 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-text">Settings</span>
          <span
            key={settings.theme}
            className="text-[10px] font-mono text-text-muted px-1.5 py-0.5 rounded bg-surface-2 animate-scale-in"
            title="Active editor theme"
          >
            {themes.find((t) => t.id === settings.theme)?.label}
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close settings"
          className="p-1 rounded text-text-muted hover:text-text hover:bg-surface-2 transition-colors active:scale-90 duration-150"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
        <section
          className="settings-section"
          style={{ animationDelay: '40ms' }}
        >
          <SectionHeader icon={Sun} title="Appearance" delay={40} />

          <div className="space-y-3">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-text-muted mb-2 flex items-center justify-between">
                <span>Theme</span>
                {flashTheme && (
                  <span className="text-text-secondary font-mono normal-case tracking-normal animate-fade-in">
                    <span className="text-text-muted">from </span>
                    {themes.find((t) => t.id === flashTheme)?.label}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {themes.map((t, i) => {
                  const isActive = settings.theme === t.id
                  return (
                    <button
                      key={t.id}
                      onClick={() => onUpdate({ theme: t.id })}
                      aria-pressed={isActive}
                      title={t.label}
                      style={{ animationDelay: `${80 + i * 30}ms` }}
                      className={`settings-row relative group flex flex-col items-stretch rounded-md overflow-hidden border transition-all duration-150 ease-out active:scale-95 ${
                        isActive
                          ? 'border-text ring-1 ring-text/40'
                          : 'border-border hover:border-border-strong'
                      }`}
                    >
                      <div
                        className="theme-swatch h-10 flex items-end p-1.5 relative"
                        style={{ backgroundColor: t.bg }}
                      >
                        <div className="flex gap-0.5 items-end">
                          <span
                            className="w-1 h-1.5 rounded-sm"
                            style={{ backgroundColor: t.fg }}
                          />
                          <span
                            className="w-1 h-3 rounded-sm"
                            style={{ backgroundColor: t.keyword }}
                          />
                          <span
                            className="w-1 h-2 rounded-sm"
                            style={{ backgroundColor: t.fg, opacity: 0.6 }}
                          />
                        </div>
                        {isActive && (
                          <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-text flex items-center justify-center animate-scale-in">
                            <Check className="w-2.5 h-2.5 text-bg" strokeWidth={3} />
                          </span>
                        )}
                      </div>
                      <div
                        className={`px-1.5 py-1 text-[9px] font-medium tracking-tight truncate text-center ${
                          isActive ? 'text-text bg-surface-3' : 'text-text-muted bg-surface-2 group-hover:text-text-secondary'
                        }`}
                      >
                        {t.label}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="settings-row" style={{ animationDelay: '380ms' }}>
              <div className="text-[10px] uppercase tracking-wider text-text-muted mb-1.5">
                Font family
              </div>
              <div className="flex bg-bg border border-border rounded-md p-0.5">
                {fonts.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => onUpdate({ fontFamily: f.id })}
                    className={`flex-1 px-2 py-1.5 text-xs rounded transition-all duration-200 ease-out ${
                      settings.fontFamily === f.id
                        ? 'bg-surface-3 text-text shadow-sm'
                        : 'text-text-muted hover:text-text-secondary active:scale-95'
                    }`}
                    style={{ fontFamily: f.id }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <label
              className="settings-row block"
              style={{ animationDelay: '420ms' }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="text-[10px] uppercase tracking-wider text-text-muted">
                  Font size
                </div>
                <div className="text-[10px] tabular-nums text-text-secondary font-mono px-1.5 py-0.5 rounded bg-surface-2 transition-all duration-200">
                  {settings.fontSize}px
                </div>
              </div>
              <input
                type="range"
                min={10}
                max={22}
                value={settings.fontSize}
                onChange={(e) => onUpdate({ fontSize: Number(e.target.value) })}
                className="w-full accent-text"
              />
            </label>
          </div>
        </section>

        <section
          className="settings-section"
          style={{ animationDelay: '120ms' }}
        >
          <SectionHeader icon={Code} title="Editor" delay={120} />

          <div className="space-y-px">
            <Toggle
              checked={settings.minimap}
              onChange={() => onUpdate({ minimap: !settings.minimap })}
              label="Minimap"
              description="Code overview on the right"
              delay={160}
            />
            <Toggle
              checked={settings.lineNumbers}
              onChange={() => onUpdate({ lineNumbers: !settings.lineNumbers })}
              label="Line numbers"
              delay={200}
            />
            <Toggle
              checked={settings.wordWrap}
              onChange={() => onUpdate({ wordWrap: !settings.wordWrap })}
              label="Word wrap"
              description="Wrap long lines"
              delay={240}
            />
            <Toggle
              checked={settings.fontLigatures}
              onChange={() => onUpdate({ fontLigatures: !settings.fontLigatures })}
              label="Font ligatures"
              delay={280}
            />
            <Toggle
              checked={settings.stickyScroll}
              onChange={() => onUpdate({ stickyScroll: !settings.stickyScroll })}
              label="Sticky scroll"
              description="Pin scope headers"
              delay={320}
            />
          </div>
        </section>

        <section
          className="settings-section"
          style={{ animationDelay: '200ms' }}
        >
          <SectionHeader icon={Hash} title="Indentation" delay={200} />

          <div className="settings-row" style={{ animationDelay: '260ms' }}>
            <div className="text-[10px] uppercase tracking-wider text-text-muted mb-1.5">
              Tab size
            </div>
            <div className="flex items-center bg-bg border border-border rounded-md p-0.5">
              {[2, 4].map((size) => (
                <button
                  key={size}
                  onClick={() => onUpdate({ tabSize: size })}
                  className={`flex-1 px-2 py-1 text-xs font-medium rounded transition-all duration-200 active:scale-95 ${
                    settings.tabSize === size
                      ? 'bg-surface-3 text-text shadow-sm'
                      : 'text-text-muted hover:text-text-secondary'
                  }`}
                >
                  {size} spaces
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
