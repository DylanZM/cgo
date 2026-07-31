import type { Settings } from './types'

const STORAGE_KEY = 'cgo-settings'

export const AVAILABLE_THEMES = [
  'vitesse-dark',
  'vitesse-light',
  'github-dark',
  'github-light',
  'dracula',
  'monokai',
  'nord',
  'tokyo-night',
  'one-dark-pro',
] as const

export type Theme = (typeof AVAILABLE_THEMES)[number]

export const AVAILABLE_FONTS = [
  { id: 'JetBrains Mono', label: 'JetBrains Mono' },
  { id: 'Cascadia Code', label: 'Cascadia Code' },
] as const

export type FontFamily = (typeof AVAILABLE_FONTS)[number]['id']

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

export const fonts = AVAILABLE_FONTS

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

function validateSettings(settings: Partial<Settings>): Settings {
  const validated: Settings = { ...defaultSettings, ...settings }
  if (!AVAILABLE_THEMES.includes(validated.theme as Theme)) {
    validated.theme = 'vitesse-dark'
  }
  if (!AVAILABLE_FONTS.some((f) => f.id === validated.fontFamily)) {
    validated.fontFamily = 'JetBrains Mono'
  }
  validated.fontSize = Math.max(10, Math.min(22, validated.fontSize))
  validated.tabSize = Math.max(2, Math.min(8, validated.tabSize))
  return validated
}

export function loadSettings(): Settings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return validateSettings(parsed)
    }
  } catch {
    // ignore parse errors
  }
  return defaultSettings
}

export function saveSettings(settings: Settings): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    return true
  } catch {
    return false
  }
}

export function updateSetting(
  current: Settings,
  key: keyof Settings,
  value: Settings[keyof Settings]
): Settings {
  const newSettings = { ...current, [key]: value }
  const validated = validateSettings(newSettings)
  saveSettings(validated)
  return validated
}