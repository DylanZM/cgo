import { useState, useCallback, useEffect, useMemo } from 'react'
import Toolbar from '../components/playground/Toolbar'
import Editor from '../components/playground/Editor'
import Output from '../components/playground/Output'
import SettingsPanel from '../components/playground/SettingsPanel'
import HistoryPanel from '../components/playground/HistoryPanel'
import { useSettings, themes } from '../hooks/useSettings'
import { useHistory } from '../hooks/useHistory'
import { compileCode } from '../lib/compiler'
import { templates } from '../components/playground/templates'
import type { HistoryEntry } from '../types'

export default function Playground() {
  const [code, setCode] = useState(templates[0].code)
  const [isRunning, setIsRunning] = useState(false)
  const [lastResult, setLastResult] = useState<{ output: string; error: string; exitCode: number; time: number } | null>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [layout, setLayout] = useState<'horizontal' | 'vertical'>('horizontal')

  const { settings, updateSettings } = useSettings()
  const { history, addEntry, removeEntry, clearHistory } = useHistory()

  const themeLabel = useMemo(
    () => themes.find((t) => t.id === settings.theme)?.label,
    [settings.theme]
  )

  useEffect(() => {
    document.documentElement.dataset.editorTheme = settings.theme
  }, [settings.theme])

  const handleRun = useCallback(async () => {
    setIsRunning(true)
    try {
      const result = await compileCode(code)
      setLastResult(result)
      addEntry({ code, output: result.output, error: result.error, exitCode: result.exitCode })
    } catch {
      const err = { output: '', error: 'Failed to connect to compilation server.', exitCode: 1, time: 0 }
      setLastResult(err)
      addEntry({ code, output: '', error: err.error, exitCode: 1 })
    } finally {
      setIsRunning(false)
    }
  }, [code, addEntry])

  const handleLoadTemplate = useCallback((templateCode: string) => {
    setCode(templateCode)
    setLastResult(null)
  }, [])

  const handleRestore = useCallback((entry: HistoryEntry) => {
    setCode(entry.code)
    setLastResult({ output: entry.output, error: entry.error, exitCode: entry.exitCode, time: 0 })
    setHistoryOpen(false)
  }, [])

  const isHorizontal = layout === 'horizontal'

  return (
    <div className="h-dvh flex flex-col bg-bg">
      <Toolbar
        onRun={handleRun}
        isRunning={isRunning}
        onLoadTemplate={handleLoadTemplate}
        onToggleSettings={() => { setSettingsOpen(!settingsOpen); setHistoryOpen(false) }}
        onToggleHistory={() => { setHistoryOpen(!historyOpen); setSettingsOpen(false) }}
        settingsOpen={settingsOpen}
        historyOpen={historyOpen}
        layout={layout}
        onToggleLayout={() => setLayout(isHorizontal ? 'vertical' : 'horizontal')}
        themeLabel={themeLabel}
      />

      <div className={`flex-1 flex min-h-0 ${isHorizontal ? 'flex-row' : 'flex-col'}`}>
        <div
          className={`flex-1 min-w-0 min-h-0 ${isHorizontal ? 'border-r' : 'border-b'} border-border`}
        >
          <Editor
            code={code}
            onChange={setCode}
            settings={settings}
            onRun={handleRun}
          />
        </div>

        <div
          className={`flex flex-col ${
            isHorizontal
              ? 'w-[400px] min-w-[280px]'
              : 'h-[280px] min-h-[180px]'
          }`}
        >
          <Output result={lastResult} isRunning={isRunning} />
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
