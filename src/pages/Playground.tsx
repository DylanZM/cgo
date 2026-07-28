import { useState, useCallback } from 'react'
import Toolbar from '../components/playground/Toolbar'
import Editor from '../components/playground/Editor'
import Output from '../components/playground/Output'
import type { CompileResponse } from '../types'
import { templates } from '../components/playground/templates'

export default function Playground() {
  const [language, setLanguage] = useState<'c' | 'c++'>('c++')
  const [code, setCode] = useState(templates[0].code)
  const [result, setResult] = useState<CompileResponse | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  const handleRun = useCallback(async () => {
    setIsRunning(true)
    try {
      const res = await fetch('/api/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      })
      const data: CompileResponse = await res.json()
      setResult(data)
    } catch {
      setResult({ output: '', error: 'Failed to connect to compilation server.', exitCode: 1, time: 0 })
    } finally {
      setIsRunning(false)
    }
  }, [code, language])

  const handleLoadTemplate = useCallback((templateCode: string, lang: 'c' | 'c++') => {
    setCode(templateCode)
    setLanguage(lang)
    setResult(null)
  }, [])

  return (
    <div className="h-dvh flex flex-col bg-[var(--bg)]">
      <Toolbar
        language={language}
        onLanguageChange={setLanguage}
        onRun={handleRun}
        isRunning={isRunning}
        onLoadTemplate={handleLoadTemplate}
        onToggleSettings={() => {}}
        onToggleHistory={() => {}}
        settingsOpen={false}
        historyOpen={false}
      />

      <div className="flex-1 flex min-h-0">
        <div className="flex-1 min-w-0 border-r border-[var(--border)]">
          <Editor
            code={code}
            onChange={setCode}
            language={language}
          />
        </div>
        <div className="w-[400px] min-w-[300px] flex flex-col border-[var(--border)]">
          <Output result={result} isRunning={isRunning} />
        </div>
      </div>
    </div>
  )
}
