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
    <div className="h-full flex flex-col bg-[var(--surface)] border-l border-[var(--border)] w-72">
      <div className="flex items-center justify-between px-4 h-10 border-b border-[var(--border)] shrink-0">
        <span className="text-xs font-medium text-[var(--text)]">Settings</span>
        <button onClick={onClose} className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <section>
          <h3 className="text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">Appearance</h3>

          <label className="block mb-3">
            <span className="text-xs text-[var(--text-secondary)] mb-1 block">Theme</span>
            <select
              value={settings.theme}
              onChange={(e) => onUpdate({ theme: e.target.value })}
              className="w-full px-2.5 py-1.5 text-xs bg-[var(--bg)] border border-[var(--border)] rounded-md text-[var(--text)] focus:outline-none focus:border-[var(--accent-border)] transition-colors"
            >
              {themes.map((t) => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </label>

          <label className="block mb-3">
            <span className="text-xs text-[var(--text-secondary)] mb-1 block">Font Family</span>
            <select
              value={settings.fontFamily}
              onChange={(e) => onUpdate({ fontFamily: e.target.value })}
              className="w-full px-2.5 py-1.5 text-xs bg-[var(--bg)] border border-[var(--border)] rounded-md text-[var(--text)] focus:outline-none focus:border-[var(--accent-border)] transition-colors"
            >
              {fonts.map((f) => (
                <option key={f.id} value={f.id}>{f.label}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-xs text-[var(--text-secondary)] mb-1 block">Font Size: {settings.fontSize}px</span>
            <input
              type="range"
              min={10}
              max={22}
              value={settings.fontSize}
              onChange={(e) => onUpdate({ fontSize: Number(e.target.value) })}
              className="w-full accent-[var(--accent)]"
            />
          </label>
        </section>

        <section>
          <h3 className="text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">Editor</h3>

          <div className="space-y-2.5">
            {([
              { key: 'minimap' as const, label: 'Minimap' },
              { key: 'lineNumbers' as const, label: 'Line numbers' },
              { key: 'wordWrap' as const, label: 'Word wrap' },
              { key: 'fontLigatures' as const, label: 'Font ligatures' },
              { key: 'stickyScroll' as const, label: 'Sticky scroll' },
            ]).map(({ key, label }) => (
              <label key={key} className="flex items-center justify-between cursor-pointer">
                <span className="text-xs text-[var(--text-secondary)]">{label}</span>
                <button
                  onClick={() => onUpdate({ [key]: !settings[key] })}
                  className={`relative w-8 h-4.5 rounded-full transition-colors ${
                    settings[key] ? 'bg-[var(--accent)]' : 'bg-[var(--surface-3)]'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                      settings[key] ? 'translate-x-3.5' : ''
                    }`}
                  />
                </button>
              </label>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">Indentation</h3>
          <label className="block">
            <span className="text-xs text-[var(--text-secondary)] mb-1 block">Tab Size</span>
            <select
              value={settings.tabSize}
              onChange={(e) => onUpdate({ tabSize: Number(e.target.value) })}
              className="w-full px-2.5 py-1.5 text-xs bg-[var(--bg)] border border-[var(--border)] rounded-md text-[var(--text)] focus:outline-none focus:border-[var(--accent-border)] transition-colors"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
            </select>
          </label>
        </section>
      </div>
    </div>
  )
}
