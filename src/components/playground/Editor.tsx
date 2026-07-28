import MonacoEditor from '@monaco-editor/react'

interface EditorProps {
  code: string
  onChange: (value: string) => void
  language: 'c' | 'c++'
}

export default function Editor({ code, onChange, language }: EditorProps) {
  return (
    <MonacoEditor
      height="100%"
      language={language === 'c++' ? 'cpp' : 'c'}
      value={code}
      onChange={(value) => onChange(value || '')}
      theme="vs-dark"
      options={{
        fontSize: 14,
        fontFamily: "'JetBrains Mono', monospace",
        minimap: { enabled: false },
        lineNumbers: 'on',
        wordWrap: 'on',
        padding: { top: 12 },
        scrollBeyondLastLine: false,
        smoothScrolling: true,
        cursorBlinking: 'smooth',
        cursorSmoothCaretAnimation: 'on',
        renderLineHighlight: 'gutter',
        bracketPairColorization: { enabled: true },
        automaticLayout: true,
        tabSize: 2,
      }}
    />
  )
}
