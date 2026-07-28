import { useState, useEffect, useCallback } from 'react'
import type { Settings } from '../types'

const STORAGE_KEY = 'cgo-settings'

const defaultSettings: Settings = {
  theme: 'vs-dark',
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 14,
  minimap: false,
  lineNumbers: true,
  wordWrap: true,
  fontLigatures: true,
  stickyScroll: false,
  tabSize: 2,
}

export const themes = [
  { id: 'vs-dark', label: 'Default Dark' },
  { id: 'github-dark', label: 'GitHub Dark' },
  { id: 'monokai', label: 'Monokai' },
  { id: 'nord', label: 'Nord' },
  { id: 'one-dark-pro', label: 'One Dark Pro' },
  { id: 'tokyo-night', label: 'Tokyo Night' },
]

export const fonts = [
  { id: "'JetBrains Mono', monospace", label: 'JetBrains Mono' },
  { id: "'Cascadia Code', monospace", label: 'Cascadia Code' },
  { id: "'Fira Code', monospace", label: 'Fira Code' },
  { id: "Consolas, monospace", label: 'Consolas' },
]

function loadSettings(): Settings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return { ...defaultSettings, ...JSON.parse(stored) }
  } catch {}
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
