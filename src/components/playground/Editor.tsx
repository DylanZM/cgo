import MonacoEditor from '@monaco-editor/react'
import type { Settings } from '../../types'

interface EditorProps {
  code: string
  onChange: (value: string) => void
  language: 'c' | 'c++'
  settings: Settings
}

export default function Editor({ code, onChange, language, settings }: EditorProps) {
  return (
    <MonacoEditor
      height="100%"
      language={language === 'c++' ? 'cpp' : 'c'}
      value={code}
      onChange={(value) => onChange(value || '')}
      theme={settings.theme}
      options={{
        fontSize: settings.fontSize,
        fontFamily: settings.fontFamily,
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
