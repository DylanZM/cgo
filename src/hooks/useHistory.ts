import { useState, useEffect, useCallback } from 'react'
import type { HistoryEntry } from '../types'

const STORAGE_KEY = 'cgo-history'
const MAX_ENTRIES = 50

function loadHistory(): HistoryEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch { /* ignore parse errors */ }
  return []
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>(loadHistory)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  }, [history])

  const addEntry = useCallback((entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => {
    const newEntry: HistoryEntry = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    }
    setHistory((prev) => [newEntry, ...prev].slice(0, MAX_ENTRIES))
  }, [])

  const removeEntry = useCallback((id: string) => {
    setHistory((prev) => prev.filter((e) => e.id !== id))
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [])

  return { history, addEntry, removeEntry, clearHistory }
}
