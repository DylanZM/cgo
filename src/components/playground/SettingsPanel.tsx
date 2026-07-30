import { useEffect, useRef, useState, useMemo } from 'react'
import { X, Sun, Code, Hash, Check } from 'lucide-react'
import type { Settings } from '../../types'
import { themes, fonts } from '../../hooks/useSettings'

interface SettingsPanelProps {
  settings: Settings
  onUpdate: (partial: Partial<Settings>) => void
  onClose: () => void
  closing?: boolean
}

function Toggle({
  checked,
  onChange,
  label,
  description,
  delay,
  accent,
}: {
  checked: boolean
  onChange: () => void
  label: string
  description?: string
  delay: number
  accent: string
}) {
  return (
    <button
      onClick={onChange}
      aria-pressed={checked}
      style={{
        animationDelay: `${delay}ms`,
        '--toggle-on': accent,
      } as React.CSSProperties}
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
          checked ? '' : 'bg-surface-3'
        }`}
        style={{
          height: '18px',
          backgroundColor: checked ? accent : undefined,
        }}
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

function SectionHeader({
  icon: Icon,
  title,
  delay,
  accent,
}: {
  icon: typeof Sun
  title: string
  delay: number
  accent: string
}) {
  return (
    <div
      className="settings-row flex items-center gap-2 mb-3"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Icon className="w-3 h-3 transition-colors duration-300" style={{ color: accent }} />
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">
        {title}
      </h3>
    </div>
  )
}

export default function SettingsPanel({ settings, onUpdate, onClose, closing }: SettingsPanelProps) {
  const prevTheme = useRef(settings.theme)
  const [flashTheme, setFlashTheme] = useState<string | null>(null)

  const activeTheme = useMemo(
    () => themes.find((t) => t.id === settings.theme) ?? themes[0],
    [settings.theme]
  )

  useEffect(() => {
    if (prevTheme.current !== settings.theme) {
      setFlashTheme(prevTheme.current)
      const t = setTimeout(() => setFlashTheme(null), 320)
      prevTheme.current = settings.theme
      return () => clearTimeout(t)
    }
  }, [settings.theme])

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

  return (
    <div
      className={`${closing ? 'settings-panel-out' : 'settings-panel'} h-full flex flex-col border-l border-border w-72 relative transition-colors duration-300 ease-out`}
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

      <div className="flex items-center justify-between px-4 h-11 border-b shrink-0"
        style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold transition-colors duration-300"
            style={{ color: panelFg }}>
            Settings
          </span>
          <span
            key={settings.theme}
            className="text-[10px] font-mono px-1.5 py-0.5 rounded animate-scale-in transition-colors duration-300"
            style={{
              color: panelFg,
              backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
              borderLeft: `2px solid ${accent}`,
            }}
            title="Active editor theme"
          >
            {activeTheme.label}
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close settings"
          className="p-1 rounded transition-colors active:scale-90 duration-150 hover:opacity-100"
          style={{
            color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
          }}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
        <section
          className="settings-section"
          style={{ animationDelay: '40ms' }}
        >
          <SectionHeader icon={Sun} title="Appearance" delay={40} accent={accent} />

          <div className="space-y-3">
            <div>
              <div
                className="text-[10px] uppercase tracking-wider mb-2 flex items-center justify-between transition-colors duration-300"
                style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
              >
                <span>Theme</span>
                {flashTheme && (
                  <span className="font-mono normal-case tracking-normal animate-fade-in"
                    style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}>
                    <span style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}>from </span>
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
                      style={{
                        animationDelay: `${80 + i * 30}ms`,
                        borderColor: isActive ? t.keyword : 'transparent',
                      }}
                      className={`settings-row relative group flex flex-col items-stretch rounded-md overflow-hidden border transition-all duration-200 ease-out active:scale-95 ${
                        isActive ? 'shadow-md' : 'hover:opacity-90'
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
                          <span
                            className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center animate-scale-in"
                            style={{ backgroundColor: t.keyword }}
                          >
                            <Check className="w-2.5 h-2.5" strokeWidth={3} style={{ color: t.bg }} />
                          </span>
                        )}
                      </div>
                      <div
                        className="px-1.5 py-1 text-[9px] font-medium tracking-tight truncate text-center transition-colors"
                        style={{
                          backgroundColor: isActive ? t.bg : (isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'),
                          color: isActive ? t.fg : (isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'),
                        }}
                      >
                        {t.label}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="settings-row" style={{ animationDelay: '380ms' }}>
              <div
                className="text-[10px] uppercase tracking-wider mb-1.5 transition-colors duration-300"
                style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
              >
                Font family
              </div>
              <div
                className="flex rounded-md p-0.5 transition-colors duration-300"
                style={{
                  backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                }}
              >
                {fonts.map((f) => {
                  const isActive = settings.fontFamily === f.id
                  return (
                    <button
                      key={f.id}
                      onClick={() => onUpdate({ fontFamily: f.id })}
                      className="flex-1 px-2 py-1.5 text-xs rounded transition-all duration-200 ease-out active:scale-95"
                      style={{
                        fontFamily: f.id,
                        backgroundColor: isActive ? accent : 'transparent',
                        color: isActive
                          ? (isDark ? '#fff' : '#000')
                          : (isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'),
                      }}
                    >
                      {f.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <label
              className="settings-row block"
              style={{ animationDelay: '420ms' }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div
                  className="text-[10px] uppercase tracking-wider transition-colors duration-300"
                  style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
                >
                  Font size
                </div>
                <div
                  className="text-[10px] tabular-nums font-mono px-1.5 py-0.5 rounded transition-all duration-300"
                  style={{
                    color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                    backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                  }}
                >
                  {settings.fontSize}px
                </div>
              </div>
              <input
                type="range"
                min={10}
                max={22}
                value={settings.fontSize}
                onChange={(e) => onUpdate({ fontSize: Number(e.target.value) })}
                style={{ accentColor: accent }}
                className="w-full"
              />
            </label>
          </div>
        </section>

        <section
          className="settings-section"
          style={{ animationDelay: '120ms' }}
        >
          <SectionHeader icon={Code} title="Editor" delay={120} accent={accent} />

          <div className="space-y-px">
            <Toggle
              checked={settings.minimap}
              onChange={() => onUpdate({ minimap: !settings.minimap })}
              label="Minimap"
              description="Code overview on the right"
              delay={160}
              accent={accent}
            />
            <Toggle
              checked={settings.lineNumbers}
              onChange={() => onUpdate({ lineNumbers: !settings.lineNumbers })}
              label="Line numbers"
              delay={200}
              accent={accent}
            />
            <Toggle
              checked={settings.wordWrap}
              onChange={() => onUpdate({ wordWrap: !settings.wordWrap })}
              label="Word wrap"
              description="Wrap long lines"
              delay={240}
              accent={accent}
            />
            <Toggle
              checked={settings.fontLigatures}
              onChange={() => onUpdate({ fontLigatures: !settings.fontLigatures })}
              label="Font ligatures"
              delay={280}
              accent={accent}
            />
            <Toggle
              checked={settings.stickyScroll}
              onChange={() => onUpdate({ stickyScroll: !settings.stickyScroll })}
              label="Sticky scroll"
              description="Pin scope headers"
              delay={320}
              accent={accent}
            />
          </div>
        </section>

        <section
          className="settings-section"
          style={{ animationDelay: '200ms' }}
        >
          <SectionHeader icon={Hash} title="Indentation" delay={200} accent={accent} />

          <div className="settings-row" style={{ animationDelay: '260ms' }}>
            <div
              className="text-[10px] uppercase tracking-wider mb-1.5 transition-colors duration-300"
              style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}
            >
              Tab size
            </div>
            <div
              className="flex items-center rounded-md p-0.5 transition-colors duration-300"
              style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              }}
            >
              {[2, 4].map((size) => {
                const isActive = settings.tabSize === size
                return (
                  <button
                    key={size}
                    onClick={() => onUpdate({ tabSize: size })}
                    className="flex-1 px-2 py-1 text-xs font-medium rounded transition-all duration-200 active:scale-95"
                    style={{
                      backgroundColor: isActive ? accent : 'transparent',
                      color: isActive
                        ? (isDark ? '#fff' : '#000')
                        : (isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'),
                    }}
                  >
                    {size} spaces
                  </button>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
