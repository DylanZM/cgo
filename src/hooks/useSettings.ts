import { useState, useEffect, useCallback } from 'react'
import type { Settings } from '../types'

const STORAGE_KEY = 'cgo-settings'

const defaultSettings: Settings = {
  theme: 'vitesse-dark',
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 14,
  minimap: false,
  lineNumbers: true,
  wordWrap: true,
  fontLigatures: true,
  stickyScroll: false,
  tabSize: 2,
  autoRun: false,
  autoRunDelay: 800,
}

export const themes = [
  { id: 'vitesse-dark', label: 'Vitesse Dark' },
  { id: 'vitesse-light', label: 'Vitesse Light' },
  { id: 'github-dark', label: 'GitHub Dark' },
  { id: 'github-light', label: 'GitHub Light' },
  { id: 'dracula', label: 'Dracula' },
  { id: 'monokai', label: 'Monokai' },
  { id: 'nord', label: 'Nord' },
  { id: 'tokyo-night', label: 'Tokyo Night' },
  { id: 'one-dark-pro', label: 'One Dark Pro' },
]

export const fonts = [
  { id: "'JetBrains Mono', monospace", label: 'JetBrains Mono' },
  { id: "'Cascadia Code', monospace", label: 'Cascadia Code' },
]

function loadSettings(): Settings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return { ...defaultSettings, ...JSON.parse(stored) }
  } catch { /* ignore parse errors */ }
  return defaultSettings
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(loadSettings)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  const updateSettings = useCallback((partial: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...partial }))
  }, [])

  return { settings, updateSettings }
}
