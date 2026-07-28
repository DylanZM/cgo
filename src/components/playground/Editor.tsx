import { useRef } from 'react'
import MonacoEditor, { type OnMount } from '@monaco-editor/react'
import type { Settings } from '../../types'

interface EditorProps {
  code: string
  onChange: (value: string) => void
  language: 'c' | 'c++'
  settings: Settings
  onRun?: () => void
}

function registerThemes(monaco: Parameters<OnMount>[1]) {
  monaco.editor.defineTheme('github-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6a737d', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'ff7b72' },
      { token: 'string', foreground: 'a5d6ff' },
      { token: 'number', foreground: '79c0ff' },
    ],
    colors: {
      'editor.background': '#0d1117',
      'editor.foreground': '#c9d1d9',
      'editorLineNumber.foreground': '#484f58',
      'editorCursor.foreground': '#58a6ff',
      'editor.selectionBackground': '#264f78',
    },
  })

  monaco.editor.defineTheme('monokai', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '75715e', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'f92672' },
      { token: 'string', foreground: 'e6db74' },
      { token: 'number', foreground: 'ae81ff' },
    ],
    colors: {
      'editor.background': '#272822',
      'editor.foreground': '#f8f8f2',
      'editorLineNumber.foreground': '#90918b',
      'editorCursor.foreground': '#f8f8f2',
      'editor.selectionBackground': '#49483e',
    },
  })

  monaco.editor.defineTheme('nord', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '616e88', fontStyle: 'italic' },
      { token: 'keyword', foreground: '81a1c1' },
      { token: 'string', foreground: 'a3be8c' },
      { token: 'number', foreground: 'b48ead' },
    ],
    colors: {
      'editor.background': '#2e3440',
      'editor.foreground': '#d8dee9',
      'editorLineNumber.foreground': '#4c566a',
      'editorCursor.foreground': '#d8dee9',
      'editor.selectionBackground': '#434c5e',
    },
  })

  monaco.editor.defineTheme('one-dark-pro', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '5c6370', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'c678dd' },
      { token: 'string', foreground: '98c379' },
      { token: 'number', foreground: 'd19a66' },
    ],
    colors: {
      'editor.background': '#282c34',
      'editor.foreground': 'abb2bf',
      'editorLineNumber.foreground': '4b5263',
      'editorCursor.foreground': 'abb2bf',
      'editor.selectionBackground': '3e4451',
    },
  })

  monaco.editor.defineTheme('tokyo-night', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '565f89', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'bb9af7' },
      { token: 'string', foreground: '9ece6a' },
      { token: 'number', foreground: 'ff9e64' },
    ],
    colors: {
      'editor.background': '#1a1b26',
      'editor.foreground': '#a9b1d6',
      'editorLineNumber.foreground': '3b4261',
      'editorCursor.foreground': '#c0caf5',
      'editor.selectionBackground': '33467c',
    },
  })
}

export default function Editor({ code, onChange, language, settings, onRun }: EditorProps) {
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null)

  const handleMount: OnMount = (editor, monaco) => {
    editorRef.current = editor
    registerThemes(monaco)

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      onRun?.()
    })
  }

  return (
    <MonacoEditor
      height="100%"
      language={language === 'c++' ? 'cpp' : 'c'}
      value={code}
      onChange={(value) => onChange(value || '')}
      onMount={handleMount}
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
