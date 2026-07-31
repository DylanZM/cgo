import { useState, useEffect, useCallback } from 'react'
import type { Settings } from '../types'

const STORAGE_KEY = 'cgo-settings'

const defaultSettings: Settings = {
  theme: 'vitesse-dark',
  fontFamily: 'JetBrains Mono',
  fontSize: 14,
  minimap: false,
  lineNumbers: true,
  wordWrap: true,
  fontLigatures: true,
  stickyScroll: false,
  tabSize: 2,
}

export const themes = [
  { id: 'vitesse-dark', label: 'Vitesse Dark', bg: '#121212', fg: '#dbd7ca', keyword: '#4d9375' },
  { id: 'vitesse-light', label: 'Vitesse Light', bg: '#ffffff', fg: '#1f2328', keyword: '#1e754f' },
  { id: 'github-dark', label: 'GitHub Dark', bg: '#0d1117', fg: '#c9d1d9', keyword: '#ff7b72' },
  { id: 'github-light', label: 'GitHub Light', bg: '#ffffff', fg: '#1f2328', keyword: '#cf222e' },
  { id: 'dracula', label: 'Dracula', bg: '#282a36', fg: '#f8f8f2', keyword: '#ff79c6' },
  { id: 'monokai', label: 'Monokai', bg: '#272822', fg: '#f8f8f2', keyword: '#f92672' },
  { id: 'nord', label: 'Nord', bg: '#2e3440', fg: '#d8dee9', keyword: '#81a1c1' },
  { id: 'tokyo-night', label: 'Tokyo Night', bg: '#1a1b26', fg: '#a9b1d6', keyword: '#bb9af7' },
  { id: 'one-dark-pro', label: 'One Dark Pro', bg: '#282c34', fg: '#abb2bf', keyword: '#c678dd' },
]

export const fonts = [
  { id: 'JetBrains Mono', label: 'JetBrains Mono' },
  { id: 'Cascadia Code', label: 'Cascadia Code' },
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