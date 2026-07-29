import { useState, useCallback, useEffect, useRef } from 'react'
import Toolbar from '../components/playground/Toolbar'
import Editor from '../components/playground/Editor'
import Output from '../components/playground/Output'
import SettingsPanel from '../components/playground/SettingsPanel'
import HistoryPanel from '../components/playground/HistoryPanel'
import { useSettings } from '../hooks/useSettings'
import { useHistory } from '../hooks/useHistory'
import { compileCode } from '../lib/compiler'
import { templates } from '../components/playground/templates'
import type { HistoryEntry } from '../types'

export default function Playground() {
  const [language, setLanguage] = useState<'c' | 'c++'>('c++')
  const [code, setCode] = useState(templates[0].code)
  const [isRunning, setIsRunning] = useState(false)
  const [lastResult, setLastResult] = useState<{ output: string; error: string; exitCode: number; time: number } | null>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)

  const { settings, updateSettings } = useSettings()
  const { history, addEntry, removeEntry, clearHistory } = useHistory()

  const handleRun = useCallback(async () => {
    setIsRunning(true)
    try {
      const result = await compileCode(code, language)
      setLastResult(result)
      addEntry({ code, language, output: result.output, error: result.error, exitCode: result.exitCode })
    } catch {
      const err = { output: '', error: 'Failed to connect to compilation server.', exitCode: 1, time: 0 }
      setLastResult(err)
      addEntry({ code, language, output: '', error: err.error, exitCode: 1 })
    } finally {
      setIsRunning(false)
    }
  }, [code, language, addEntry])

  const handleLoadTemplate = useCallback((templateCode: string, lang: 'c' | 'c++') => {
    setCode(templateCode)
    setLanguage(lang)
    setLastResult(null)
  }, [])

  const handleRestore = useCallback((entry: HistoryEntry) => {
    setCode(entry.code)
    setLanguage(entry.language)
    setLastResult({ output: entry.output, error: entry.error, exitCode: entry.exitCode, time: 0 })
    setHistoryOpen(false)
  }, [])

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastSubmittedRef = useRef<{ code: string; language: 'c' | 'c++' } | null>(null)
  const isRunningRef = useRef(false)

  useEffect(() => {
    if (!settings.autoRun) return
    if (isRunning) return

    const last = lastSubmittedRef.current
    if (last && last.code === code && last.language === language) return

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      lastSubmittedRef.current = { code, language }
      handleRun()
    }, settings.autoRunDelay)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [code, language, settings.autoRun, settings.autoRunDelay, isRunning, handleRun])

  useEffect(() => {
    isRunningRef.current = isRunning
  }, [isRunning])

  return (
    <div className="h-dvh flex flex-col bg-[var(--color-bg)]">
      <Toolbar
        language={language}
        onLanguageChange={setLanguage}
        onRun={handleRun}
        isRunning={isRunning}
        onLoadTemplate={handleLoadTemplate}
        onToggleSettings={() => { setSettingsOpen(!settingsOpen); setHistoryOpen(false) }}
        onToggleHistory={() => { setHistoryOpen(!historyOpen); setSettingsOpen(false) }}
        settingsOpen={settingsOpen}
        historyOpen={historyOpen}
        autoRun={settings.autoRun}
        onToggleAutoRun={() => updateSettings({ autoRun: !settings.autoRun })}
      />

      <div className="flex-1 flex min-h-0">
        <div className="flex-1 min-w-0">
          <Editor
            code={code}
            onChange={setCode}
            language={language}
            settings={settings}
            onRun={handleRun}
          />
        </div>

        <div className="w-[400px] min-w-[280px] flex flex-col border-l border-[var(--color-border)]">
          <Output result={lastResult} isRunning={isRunning} autoRun={settings.autoRun} />
        </div>

        {settingsOpen && (
          <SettingsPanel
            settings={settings}
            onUpdate={updateSettings}
            onClose={() => setSettingsOpen(false)}
          />
        )}

        {historyOpen && (
          <HistoryPanel
            history={history}
            onRestore={handleRestore}
            onRemove={removeEntry}
            onClear={clearHistory}
            onClose={() => setHistoryOpen(false)}
          />
        )}
      </div>
    </div>
  )
}
