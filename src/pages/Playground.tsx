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
  const [code, setCode] = useState(templates[0].code)
  const [isRunning, setIsRunning] = useState(false)
  const [lastResult, setLastResult] = useState<{ output: string; error: string; exitCode: number; time: number } | null>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [settingsClosing, setSettingsClosing] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [historyClosing, setHistoryClosing] = useState(false)
  const [layout, setLayout] = useState<'horizontal' | 'vertical'>('horizontal')
  const [splitPos, setSplitPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragState = useRef({ active: false, horizontal: true })

  const handleDividerMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    dragState.current = { active: true, horizontal: layout === 'horizontal' }
    document.body.style.cursor = layout === 'horizontal' ? 'col-resize' : 'row-resize'
    document.body.style.userSelect = 'none'
    document.body.style.pointerEvents = 'none'
  }, [layout])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const ds = dragState.current
      if (!ds.active) return
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      const pct = ds.horizontal
        ? ((e.clientX - rect.left) / rect.width) * 100
        : ((e.clientY - rect.top) / rect.height) * 100
      setSplitPos(Math.max(20, Math.min(80, pct)))
    }

    const handleMouseUp = () => {
      if (dragState.current.active) {
        dragState.current.active = false
        document.body.style.cursor = ''
        document.body.style.userSelect = ''
        document.body.style.pointerEvents = ''
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      document.body.style.pointerEvents = ''
    }
  }, [])

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

      <div
        ref={containerRef}
        className={`flex-1 flex min-h-0 relative ${isHorizontal ? 'flex-row' : 'flex-col'}`}
      >
        <div
          className="min-w-0 min-h-0 overflow-hidden"
          style={{ flex: `0 0 ${splitPos}%` }}
        >
          <Editor
            code={code}
            onChange={setCode}
            settings={settings}
            onRun={handleRun}
          />
        </div>

        <div
          className={`shrink-0 bg-border ${
            isHorizontal
              ? 'w-px cursor-col-resize px-1 -mx-1'
              : 'h-px cursor-row-resize py-1 -my-1'
          }`}
          onMouseDown={handleDividerMouseDown}
        />

        <div
          className={`flex flex-col min-w-0 ${
            isHorizontal ? 'min-h-0' : 'min-h-[180px]'
          } flex-1 overflow-hidden`}
        >
          <Output result={lastResult} isRunning={isRunning} />
        </div>

        {settingsVisible && (
          <div className="absolute inset-y-0 right-0 z-50 w-[calc(50%+2rem)] min-w-[360px]">
            <SettingsPanel
              settings={settings}
              onUpdate={updateSettings}
              onClose={closeSettings}
              closing={settingsClosing}
            />
          </div>
        )}

        {historyVisible && (
          <div className="absolute inset-y-0 right-0 z-40 w-[calc(50%+2rem)] min-w-[360px]">
            <HistoryPanel
              history={history}
              onRestore={handleRestore}
              onRemove={removeEntry}
              onClear={clearHistory}
              onClose={closeHistory}
              closing={historyClosing}
              settings={settings}
            />
          </div>
        )}
      </div>
    </div>
  )
}
