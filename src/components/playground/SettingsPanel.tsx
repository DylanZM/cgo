import { X } from 'lucide-react'
import type { Settings } from '../../types'
import { themes, fonts } from '../../hooks/useSettings'

interface SettingsPanelProps {
  settings: Settings
  onUpdate: (partial: Partial<Settings>) => void
  onClose: () => void
}

export default function SettingsPanel({ settings, onUpdate, onClose }: SettingsPanelProps) {
  return (
    <div className="h-full flex flex-col bg-[var(--color-surface)] border-l border-[var(--color-border)] w-72 animate-slide-in-right">
      <div className="flex items-center justify-between px-4 h-10 border-b border-[var(--color-border)] shrink-0">
        <span className="text-xs font-medium text-[var(--color-text)]">Settings</span>
        <button onClick={onClose} className="p-1 rounded text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)] transition-colors">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <section>
          <h3 className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Appearance</h3>

          <label className="block mb-3">
            <span className="text-xs text-[var(--color-text-secondary)] mb-1.5 block">Theme</span>
            <select
              value={settings.theme}
              onChange={(e) => onUpdate({ theme: e.target.value })}
              className="w-full px-2.5 py-1.5 text-xs bg-[var(--color-bg)] border border-[var(--color-border)] rounded-md text-[var(--color-text)] focus:outline-none focus:border-[var(--color-border-strong)] transition-colors"
            >
              {themes.map((t) => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </label>

          <label className="block mb-3">
            <span className="text-xs text-[var(--color-text-secondary)] mb-1.5 block">Font Family</span>
            <select
              value={settings.fontFamily}
              onChange={(e) => onUpdate({ fontFamily: e.target.value })}
              className="w-full px-2.5 py-1.5 text-xs bg-[var(--color-bg)] border border-[var(--color-border)] rounded-md text-[var(--color-text)] focus:outline-none focus:border-[var(--color-border-strong)] transition-colors"
            >
              {fonts.map((f) => (
                <option key={f.id} value={f.id}>{f.label}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-xs text-[var(--color-text-secondary)] mb-1.5 block">Font Size: {settings.fontSize}px</span>
            <input
              type="range"
              min={10}
              max={22}
              value={settings.fontSize}
              onChange={(e) => onUpdate({ fontSize: Number(e.target.value) })}
              className="w-full accent-[var(--color-text)]"
            />
          </label>
        </section>

        <section>
          <h3 className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Editor</h3>

          <div className="space-y-2.5">
            {([
              { key: 'minimap' as const, label: 'Minimap' },
              { key: 'lineNumbers' as const, label: 'Line numbers' },
              { key: 'wordWrap' as const, label: 'Word wrap' },
              { key: 'fontLigatures' as const, label: 'Font ligatures' },
              { key: 'stickyScroll' as const, label: 'Sticky scroll' },
            ]).map(({ key, label }) => (
              <label key={key} className="flex items-center justify-between cursor-pointer group">
                <span className="text-xs text-[var(--color-text-secondary)] group-hover:text-[var(--color-text)] transition-colors">{label}</span>
                <button
                  onClick={() => onUpdate({ [key]: !settings[key] })}
                  className={`relative w-8 rounded-full transition-colors ${
                    settings[key] ? 'bg-[var(--color-text)]' : 'bg-[var(--color-surface-3)]'
                  }`}
                  style={{ height: '18px' }}
                >
                  <span
                    className={`absolute top-[3px] left-[3px] w-3 h-3 rounded-full bg-[var(--color-bg)] transition-transform ${
                      settings[key] ? 'translate-x-[14px]' : ''
                    }`}
                  />
                </button>
              </label>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Indentation</h3>
          <label className="block">
            <span className="text-xs text-[var(--color-text-secondary)] mb-1.5 block">Tab Size</span>
            <select
              value={settings.tabSize}
              onChange={(e) => onUpdate({ tabSize: Number(e.target.value) })}
              className="w-full px-2.5 py-1.5 text-xs bg-[var(--color-bg)] border border-[var(--color-border)] rounded-md text-[var(--color-text)] focus:outline-none focus:border-[var(--color-border-strong)] transition-colors"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
            </select>
          </label>
        </section>

        <section>
          <h3 className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Execution</h3>

          <label className="flex items-center justify-between cursor-pointer group mb-3">
            <span className="text-xs text-[var(--color-text-secondary)] group-hover:text-[var(--color-text)] transition-colors">Auto-run on edit</span>
            <button
              onClick={() => onUpdate({ autoRun: !settings.autoRun })}
              className={`relative w-8 rounded-full transition-colors ${
                settings.autoRun ? 'bg-[var(--color-text)]' : 'bg-[var(--color-surface-3)]'
              }`}
              style={{ height: '18px' }}
            >
              <span
                className={`absolute top-[3px] left-[3px] w-3 h-3 rounded-full bg-[var(--color-bg)] transition-transform ${
                  settings.autoRun ? 'translate-x-[14px]' : ''
                }`}
              />
            </button>
          </label>

          <label className={`block ${!settings.autoRun ? 'opacity-40 pointer-events-none' : ''}`}>
            <span className="text-xs text-[var(--color-text-secondary)] mb-1.5 block">
              Auto-run delay: {settings.autoRunDelay}ms
            </span>
            <input
              type="range"
              min={200}
              max={3000}
              step={100}
              value={settings.autoRunDelay}
              onChange={(e) => onUpdate({ autoRunDelay: Number(e.target.value) })}
              className="w-full accent-[var(--color-text)]"
            />
          </label>
        </section>
      </div>
    </div>
  )
}
