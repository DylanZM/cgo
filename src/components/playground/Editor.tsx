import { useRef, useEffect } from 'react'
import MonacoEditor, { type OnMount } from '@monaco-editor/react'
import type { Settings } from '../../types'
import { buildMonacoTheme, loadThemeData } from '../../themeSystem'

interface EditorProps {
  code: string
  onChange: (value: string) => void
  settings: Settings
  onRun?: () => void
}

const REGISTERED_THEMES = new Set<string>()

function getEditorFontFamilyStack(fontFamily: string): string {
  return `"${fontFamily}", Menlo, Monaco, "Courier New", monospace`
}

export default function Editor({ code, onChange, settings, onRun }: EditorProps) {
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null)
  const monacoRef = useRef<Parameters<OnMount>[1] | null>(null)

  const handleMount: OnMount = (editor, monaco) => {
    editorRef.current = editor
    monacoRef.current = monaco

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      onRun?.()
    })
  }

  useEffect(() => {
    const editor = editorRef.current
    if (!editor) return

    editor.updateOptions({
      fontSize: settings.fontSize,
      fontFamily: getEditorFontFamilyStack(settings.fontFamily),
      minimap: { enabled: settings.minimap },
      lineNumbers: settings.lineNumbers ? 'on' : 'off',
      wordWrap: settings.wordWrap ? 'on' : 'off',
      fontLigatures: settings.fontLigatures,
      stickyScroll: { enabled: settings.stickyScroll },
      tabSize: settings.tabSize,
    })
  }, [settings])

  useEffect(() => {
    let cancelled = false

    async function applyTheme() {
      const monaco = monacoRef.current
      if (!monaco) return

      if (!REGISTERED_THEMES.has(settings.theme)) {
        try {
          const themeData = await loadThemeData(settings.theme)
          if (cancelled) return
          const monacoTheme = buildMonacoTheme(settings.theme, themeData)
          monaco.editor.defineTheme(settings.theme, monacoTheme)
          REGISTERED_THEMES.add(settings.theme)
        } catch (e) {
          console.error('Failed to load theme:', e)
          return
        }
      }
      monaco.editor.setTheme(settings.theme)
    }

    applyTheme()
    return () => {
      cancelled = true
    }
  }, [settings.theme])

  return (
    <MonacoEditor
      height="100%"
      language="cpp"
      value={code}
      onChange={(value) => onChange(value || '')}
      onMount={handleMount}
      theme={settings.theme}
      options={{
        fontSize: settings.fontSize,
        fontFamily: getEditorFontFamilyStack(settings.fontFamily),
        minimap: { enabled: settings.minimap },
        lineNumbers: settings.lineNumbers ? 'on' : 'off',
        wordWrap: settings.wordWrap ? 'on' : 'off',
        fontLigatures: settings.fontLigatures,
        stickyScroll: { enabled: settings.stickyScroll },
        tabSize: settings.tabSize,
        padding: { top: 12 },
        scrollBeyondLastLine: false,
        smoothScrolling: true,
        cursorBlinking: 'smooth',
        cursorSmoothCaretAnimation: 'on',
        renderLineHighlight: 'gutter',
        bracketPairColorization: { enabled: true },
        automaticLayout: true,
      }}
    />
  )
}