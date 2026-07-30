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
  accent,
  surface,
}: {
  checked: boolean
  onChange: () => void
  label: string
  description?: string
  accent: string
  surface: string
}) {
  return (
    <button
      onClick={onChange}
      aria-pressed={checked}
      className="w-full flex items-center justify-between gap-3 py-2 text-left transition-transform duration-150 ease-out active:scale-[0.99]"
    >
      <div className="min-w-0">
        <div className="text-xs text-text-secondary">{label}</div>
        {description && (
          <div className="text-[10px] text-text-muted mt-0.5">{description}</div>
        )}
      </div>
      <span
        className="relative shrink-0 w-8 rounded-full transition-colors duration-200 ease-out"
        style={{
          height: '18px',
          backgroundColor: checked ? accent : surface,
          border: '1px solid',
          borderColor: checked ? accent : 'rgba(128,128,128,0.2)',
        }}
      >
        <span
          className={`absolute top-[3px] left-[3px] w-3 h-3 rounded-full bg-bg shadow-sm transition-all duration-200 ease-out ${
            checked ? 'translate-x-[14px] scale-110' : 'translate-x-0 scale-100'
          }`}
        />
      </span>
    </button>
  )
}

function SectionHeader({ icon: Icon, title, accent }: { icon: typeof Sun; title: string; accent: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Icon className="w-3.5 h-3.5" style={{ color: accent }} />
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">{title}</h3>
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

  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
  const labelColor = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)'
  const surface = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'
  const surfaceHover = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'

  return (
    <div
      className={`${closing ? 'settings-panel-out' : 'settings-panel'} h-full flex flex-col border-l border-border w-full relative`}
      style={{
        backgroundColor: panelBg,
        color: panelFg,
        boxShadow: '-4px 0 16px rgba(0,0,0,0.15)',
      }}
    >
      <div className="flex items-center justify-between px-5 h-12 border-b shrink-0" style={{ borderColor: border }}>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold" style={{ color: panelFg }}>Settings</span>
          <span
            key={settings.theme}
            className="text-[10px] font-mono px-2 py-0.5 rounded"
            style={{
              color: panelFg,
              backgroundColor: surface,
              borderLeft: `2px solid ${accent}`,
            }}
          >
            {activeTheme.label}
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close settings"
          className="p-1.5 rounded transition-colors active:scale-90 duration-150"
          style={{ color: labelColor }}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-8">
        <section>
          <SectionHeader icon={Sun} title="Appearance" accent={accent} />

          <div className="space-y-4">
            <div>
              <div className="text-[10px] uppercase tracking-wider mb-2 flex items-center justify-between" style={{ color: labelColor }}>
                <span>Theme</span>
                {flashTheme && (
                  <span className="font-mono normal-case tracking-normal animate-fade-in" style={{ color: labelColor }}>
                    <span style={{ opacity: 0.5 }}>from </span>
                    {themes.find((t) => t.id === flashTheme)?.label}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {themes.map((t) => {
                  const isActive = settings.theme === t.id
                  return (
                    <button
                      key={t.id}
                      onClick={() => onUpdate({ theme: t.id })}
                      aria-pressed={isActive}
                      title={t.label}
                      className="flex flex-col items-stretch rounded-lg overflow-hidden border transition-all duration-150 active:scale-95"
                      style={{
                        borderColor: isActive ? t.keyword : border,
                        boxShadow: isActive ? `0 0 0 1px ${t.keyword}` : 'none',
                      }}
                    >
                      <div
                        className="h-12 flex items-end p-2 relative"
                        style={{ backgroundColor: t.bg }}
                      >
                        <div className="flex gap-0.5 items-end">
                          <span className="w-1 h-2 rounded-sm" style={{ backgroundColor: t.fg }} />
                          <span className="w-1 h-4 rounded-sm" style={{ backgroundColor: t.keyword }} />
                          <span className="w-1 h-3 rounded-sm" style={{ backgroundColor: t.fg, opacity: 0.5 }} />
                        </div>
                        {isActive && (
                          <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: t.keyword }}>
                            <Check className="w-3 h-3" strokeWidth={3} style={{ color: t.bg }} />
                          </span>
                        )}
                      </div>
                      <div
                        className="px-2 py-1.5 text-[10px] font-medium tracking-tight truncate text-center"
                        style={{
                          backgroundColor: isActive ? surfaceHover : 'transparent',
                          color: isActive ? panelFg : labelColor,
                        }}
                      >
                        {t.label}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-wider mb-2" style={{ color: labelColor }}>Font family</div>
              <div className="flex gap-1.5">
                {fonts.map((f) => {
                  const active = settings.fontFamily === f.id
                  return (
                    <button
                      key={f.id}
                      onClick={() => onUpdate({ fontFamily: f.id })}
                      className="flex-1 px-2.5 py-2 text-xs rounded-lg transition-all duration-150 active:scale-95"
                      style={{
                        fontFamily: f.id,
                        backgroundColor: active ? accent : 'transparent',
                        color: active ? '#fff' : panelFg,
                        border: `1px solid ${active ? accent : border}`,
                      }}
                    >
                      {f.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-wider mb-2" style={{ color: labelColor }}>Font size</div>
              <input
                type="number"
                min={10}
                max={22}
                value={settings.fontSize}
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10)
                  if (!isNaN(v)) onUpdate({ fontSize: Math.max(10, Math.min(22, v)) })
                }}
                style={{
                  backgroundColor: surface,
                  borderColor: border,
                  color: panelFg,
                }}
                className="w-full px-3 py-2 text-xs tabular-nums font-mono rounded-lg border outline-none transition-colors duration-150"
              />
            </div>
          </div>
        </section>

        <section>
          <SectionHeader icon={Code} title="Editor" accent={accent} />

          <div className="space-y-px">
            <Toggle checked={settings.minimap} onChange={() => onUpdate({ minimap: !settings.minimap })} label="Minimap" description="Code overview on the right" accent={accent} surface={surface} />
            <Toggle checked={settings.lineNumbers} onChange={() => onUpdate({ lineNumbers: !settings.lineNumbers })} label="Line numbers" accent={accent} surface={surface} />
            <Toggle checked={settings.wordWrap} onChange={() => onUpdate({ wordWrap: !settings.wordWrap })} label="Word wrap" description="Wrap long lines" accent={accent} surface={surface} />
            <Toggle checked={settings.fontLigatures} onChange={() => onUpdate({ fontLigatures: !settings.fontLigatures })} label="Font ligatures" accent={accent} surface={surface} />
            <Toggle checked={settings.stickyScroll} onChange={() => onUpdate({ stickyScroll: !settings.stickyScroll })} label="Sticky scroll" description="Pin scope headers" accent={accent} surface={surface} />
          </div>
        </section>

        <section>
          <SectionHeader icon={Hash} title="Indentation" accent={accent} />

          <div>
            <div className="text-[10px] uppercase tracking-wider mb-2" style={{ color: labelColor }}>Tab size</div>
            <div
              className="flex items-center rounded-lg p-0.5"
              style={{
                backgroundColor: surface,
                border: `1px solid ${border}`,
              }}
            >
              {[2, 4].map((size) => {
                const isActive = settings.tabSize === size
                return (
                  <button
                    key={size}
                    onClick={() => onUpdate({ tabSize: size })}
                    className="flex-1 px-3 py-2 text-xs font-medium rounded-md transition-all duration-150 active:scale-95"
                    style={{
                      backgroundColor: isActive ? accent : 'transparent',
                      color: isActive ? (isDark ? '#fff' : '#000') : labelColor,
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
