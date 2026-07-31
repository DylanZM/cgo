import { useState, useEffect, useCallback } from 'react'
import type { Settings } from '../types'
import { loadSettings, saveSettings, updateSetting, AVAILABLE_THEMES, AVAILABLE_FONTS, themes, fonts } from '../storage'

export { AVAILABLE_THEMES, AVAILABLE_FONTS, themes, fonts }

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(loadSettings)

  useEffect(() => {
    saveSettings(settings)
  }, [settings])

  const updateSettings = useCallback((partial: Partial<Settings>) => {
    setSettings((prev) => {
      let next = prev
      for (const [key, value] of Object.entries(partial)) {
        next = updateSetting(next, key as keyof Settings, value)
      }
      return next
    })
  }, [])

  return { settings, updateSettings }
}