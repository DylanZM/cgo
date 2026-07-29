import { X, Sun, Code, Hash } from 'lucide-react'
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
}: {
  checked: boolean
  onChange: () => void
  label: string
  description?: string
}) {
  return (
    <button
      onClick={onChange}
      aria-pressed={checked}
      className="w-full flex items-center justify-between gap-3 py-2 text-left group active:scale-[0.99] transition-transform duration-150 ease-out"
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

function SectionHeader({ icon: Icon, title }: { icon: typeof Sun; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon className="w-3 h-3 text-text-muted" />
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">
        {title}
      </h3>
    </div>
  )
}

export default function SettingsPanel({ settings, onUpdate, onClose }: SettingsPanelProps) {
  return (
    <div
      className="h-full flex flex-col bg-surface border-l border-border w-72"
      style={{ animation: 'panel-in 200ms cubic-bezier(0.23, 1, 0.32, 1)' }}
    >
      <div className="flex items-center justify-between px-4 h-11 border-b border-border shrink-0">
        <span className="text-xs font-semibold text-text">Settings</span>
        <button
          onClick={onClose}
          aria-label="Close settings"
          className="p-1 rounded text-text-muted hover:text-text hover:bg-surface-2 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
        <section>
          <SectionHeader icon={Sun} title="Appearance" />

          <div className="space-y-3">
            <label className="block">
              <div className="text-[10px] uppercase tracking-wider text-text-muted mb-1.5">
                Theme
              </div>
              <select
                value={settings.theme}
                onChange={(e) => onUpdate({ theme: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs bg-bg border border-border rounded-md text-text focus:outline-none focus:border-border-strong transition-colors appearance-none cursor-pointer"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%234b5563' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 8px center',
                  paddingRight: '24px',
                }}
              >
                {themes.map((t) => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <div className="text-[10px] uppercase tracking-wider text-text-muted mb-1.5">
                Font family
              </div>
              <select
                value={settings.fontFamily}
                onChange={(e) => onUpdate({ fontFamily: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs bg-bg border border-border rounded-md text-text focus:outline-none focus:border-border-strong transition-colors appearance-none cursor-pointer"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%234b5563' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 8px center',
                  paddingRight: '24px',
                }}
              >
                {fonts.map((f) => (
                  <option key={f.id} value={f.id}>{f.label}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <div className="flex items-center justify-between mb-1.5">
                <div className="text-[10px] uppercase tracking-wider text-text-muted">
                  Font size
                </div>
                <div className="text-[10px] tabular-nums text-text-secondary font-mono">
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

        <section>
          <SectionHeader icon={Code} title="Editor" />

          <div className="space-y-px">
            <Toggle
              checked={settings.minimap}
              onChange={() => onUpdate({ minimap: !settings.minimap })}
              label="Minimap"
              description="Code overview on the right"
            />
            <Toggle
              checked={settings.lineNumbers}
              onChange={() => onUpdate({ lineNumbers: !settings.lineNumbers })}
              label="Line numbers"
            />
            <Toggle
              checked={settings.wordWrap}
              onChange={() => onUpdate({ wordWrap: !settings.wordWrap })}
              label="Word wrap"
              description="Wrap long lines"
            />
            <Toggle
              checked={settings.fontLigatures}
              onChange={() => onUpdate({ fontLigatures: !settings.fontLigatures })}
              label="Font ligatures"
            />
            <Toggle
              checked={settings.stickyScroll}
              onChange={() => onUpdate({ stickyScroll: !settings.stickyScroll })}
              label="Sticky scroll"
              description="Pin scope headers"
            />
          </div>
        </section>

        <section>
          <SectionHeader icon={Hash} title="Indentation" />

          <label className="block">
            <div className="text-[10px] uppercase tracking-wider text-text-muted mb-1.5">
              Tab size
            </div>
            <div className="flex items-center bg-bg border border-border rounded-md p-0.5">
              {[2, 4].map((size) => (
                <button
                  key={size}
                  onClick={() => onUpdate({ tabSize: size })}
                  className={`flex-1 px-2 py-1 text-xs font-medium rounded transition-colors ${
                    settings.tabSize === size
                      ? 'bg-surface-3 text-text'
                      : 'text-text-muted hover:text-text-secondary'
                  }`}
                >
                  {size} spaces
                </button>
              ))}
            </div>
          </label>
        </section>
      </div>
    </div>
  )
}
