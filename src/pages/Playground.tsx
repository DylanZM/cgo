import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import Toolbar from '../components/playground/Toolbar'
import Editor from '../components/playground/Editor'
import Output from '../components/playground/Output'
import SettingsPanel from '../components/playground/SettingsPanel'
import HistoryPanel from '../components/playground/HistoryPanel'
import { useSettings } from '../hooks/useSettings'
import { useHistory } from '../hooks/useHistory'
import { useTerminal } from '../hooks/useTerminal'
import { templates } from '../components/playground/templates'
import { applyThemeUiColors, syncThemeColors, loadThemeData } from '../themeSystem'
import type { HistoryEntry } from '../types'

export default function Playground() {
  const [code, setCode] = useState(templates[0].code)
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

  async function applyTheme(themeName: string) {
    try {
      const themeData = await loadThemeData(themeName)
      applyThemeUiColors(themeName, themeData)
      syncThemeColors(themeData)
      document.documentElement.dataset.editorTheme = themeName
    } catch (e) {
      console.error('Failed to apply theme:', e)
    }
  }

  useEffect(() => {
    applyTheme(settings.theme)
  }, [settings.theme])

  const themeVars = useMemo(() => {
    const root = document.documentElement
    return {
      '--color-bg': root.style.getPropertyValue('--color-bg-primary') || '#121212',
      '--color-surface': root.style.getPropertyValue('--color-bg-secondary') || 'rgba(255,255,255,0.04)',
      '--color-surface-2': root.style.getPropertyValue('--color-bg-tertiary') || 'rgba(255,255,255,0.06)',
      '--color-surface-3': 'rgba(255,255,255,0.10)',
      '--color-text': root.style.getPropertyValue('--color-text-primary') || '#dbd7ca',
      '--color-text-secondary': root.style.getPropertyValue('--color-text-secondary') || 'rgba(255,255,255,0.65)',
      '--color-text-muted': root.style.getPropertyValue('--color-text-muted') || 'rgba(255,255,255,0.35)',
      '--color-border': root.style.getPropertyValue('--color-border') || 'rgba(255,255,255,0.08)',
      '--divider-border': root.style.getPropertyValue('--color-border') || 'rgba(255,255,255,0.08)',
      '--color-accent': root.style.getPropertyValue('--color-accent') || '#4d9375',
    }
  }, [settings.theme])

  const currentCodeRef = useRef(code)
  currentCodeRef.current = code

  const terminal = useTerminal({
    onExit() {
      addEntry({ code: currentCodeRef.current, output: '', error: '', exitCode: 0 })
    },
  })

  const handleRun = useCallback(() => {
    terminal.run(code)
  }, [code, terminal.run])

  const handleLoadTemplate = useCallback((templateCode: string) => {
    setCode(templateCode)
  }, [])

  const handleRestore = useCallback((entry: HistoryEntry) => {
    setCode(entry.code)
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
        toolbarBg={themeVars['--color-bg']}
        onRun={handleRun}
        isRunning={terminal.running}
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
          className={`min-w-0 min-h-0 overflow-hidden ${isHorizontal ? 'border-r' : 'border-b'}`}
          style={{ flex: `0 0 ${splitPos}%`, borderColor: themeVars['--divider-border'] }}
        >
          <Editor
            code={code}
            onChange={setCode}
            settings={settings}
            onRun={handleRun}
          />
        </div>

        <div
          className={`shrink-0 ${isHorizontal ? 'w-3 -mx-1.5 cursor-col-resize' : 'h-3 -my-1.5 cursor-row-resize'} z-10`}
          onMouseDown={handleDividerMouseDown}
        />

        <div
          className={`flex flex-col min-w-0 ${isHorizontal ? 'min-h-0' : 'min-h-[180px]'} flex-1 overflow-hidden`}
        >
          <Output
            lines={terminal.lines}
            running={terminal.running}
            inputBuffer={terminal.inputBuffer}
            onInputChange={terminal.setInputBuffer}
            onInputSubmit={() => {
              terminal.stdin(terminal.inputBuffer + '\n')
              terminal.setInputBuffer('')
            }}
          />
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