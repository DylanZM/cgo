import { useState, useCallback, useEffect } from 'react'
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
  const [code, setCode] = useState(templates[0].code)
  const [isRunning, setIsRunning] = useState(false)
  const [lastResult, setLastResult] = useState<{ output: string; error: string; exitCode: number; time: number } | null>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [settingsClosing, setSettingsClosing] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [historyClosing, setHistoryClosing] = useState(false)
  const [layout, setLayout] = useState<'horizontal' | 'vertical'>('horizontal')

  const { settings, updateSettings } = useSettings()
  const { history, addEntry, removeEntry, clearHistory } = useHistory()

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
    setHistoryClosing(true)
    setTimeout(() => {
      setHistoryOpen(false)
      setHistoryClosing(false)
    }, 220)
  }, [])

  const toggleSettings = useCallback(() => {
    if (settingsOpen) {
      setSettingsClosing(true)
      setTimeout(() => {
        setSettingsOpen(false)
        setSettingsClosing(false)
      }, 220)
    } else if (historyOpen) {
      setHistoryClosing(true)
      setTimeout(() => {
        setHistoryOpen(false)
        setHistoryClosing(false)
        setSettingsOpen(true)
      }, 220)
    } else {
      setSettingsOpen(true)
    }
  }, [settingsOpen, historyOpen])

  const toggleHistory = useCallback(() => {
    if (historyOpen) {
      setHistoryClosing(true)
      setTimeout(() => {
        setHistoryOpen(false)
        setHistoryClosing(false)
      }, 220)
    } else if (settingsOpen) {
      setSettingsClosing(true)
      setTimeout(() => {
        setSettingsOpen(false)
        setSettingsClosing(false)
        setHistoryOpen(true)
      }, 220)
    } else {
      setHistoryOpen(true)
    }
  }, [historyOpen, settingsOpen])

  const closeSettings = useCallback(() => {
    setSettingsClosing(true)
    setTimeout(() => {
      setSettingsOpen(false)
      setSettingsClosing(false)
    }, 220)
  }, [])

  const closeHistory = useCallback(() => {
    setHistoryClosing(true)
    setTimeout(() => {
      setHistoryOpen(false)
      setHistoryClosing(false)
    }, 220)
  }, [])

  const isHorizontal = layout === 'horizontal'

  const settingsVisible = settingsOpen || settingsClosing
  const historyVisible = historyOpen || historyClosing

  return (
    <div className="h-dvh flex flex-col bg-bg">
      <Toolbar
        onRun={handleRun}
        isRunning={isRunning}
        onLoadTemplate={handleLoadTemplate}
        onToggleSettings={toggleSettings}
        onToggleHistory={toggleHistory}
        settingsOpen={settingsOpen && !settingsClosing}
        historyOpen={historyOpen && !historyClosing}
        layout={layout}
        onToggleLayout={() => setLayout(isHorizontal ? 'vertical' : 'horizontal')}
      />

      <div className={`flex-1 flex min-h-0 relative ${isHorizontal ? 'flex-row' : 'flex-col'}`}>
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
          className={`flex flex-col min-w-0 min-h-0 ${
            isHorizontal ? 'flex-1' : 'h-1/2 min-h-[180px]'
          }`}
        >
          <Output result={lastResult} isRunning={isRunning} />
        </div>

        {settingsVisible && (
          <div className="absolute inset-y-0 right-0 z-50">
            <SettingsPanel
              settings={settings}
              onUpdate={updateSettings}
              onClose={closeSettings}
              closing={settingsClosing}
            />
          </div>
        )}

        {historyVisible && (
          <div className="absolute inset-y-0 right-0 z-40">
            <HistoryPanel
              history={history}
              onRestore={handleRestore}
              onRemove={removeEntry}
              onClear={clearHistory}
              onClose={closeHistory}
              closing={historyClosing}
            />
          </div>
        )}
      </div>
    </div>
  )
}
