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
  monaco.editor.defineTheme('vitesse-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: '', foreground: 'dbd7caee', background: '111111' },
      { token: 'comment', foreground: '777a85', fontStyle: 'italic' },
      { token: 'keyword', foreground: '4d9375' },
      { token: 'string', foreground: 'a98a58' },
      { token: 'number', foreground: 'a87d59' },
      { token: 'type', foreground: '4d9375' },
    ],
    colors: {
      'editor.background': '#111111',
      'editor.foreground': '#dbd7ca',
      'editorLineNumber.foreground': '#444444',
      'editorCursor.foreground': '#aaaaaa',
      'editor.selectionBackground': '#444444',
    },
  })

  monaco.editor.defineTheme('vitesse-light', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: '', foreground: '1f2328' },
      { token: 'comment', foreground: '999995', fontStyle: 'italic' },
      { token: 'keyword', foreground: '1e754f' },
      { token: 'string', foreground: 'a65e2b' },
      { token: 'number', foreground: 'b4436f' },
      { token: 'type', foreground: '1e754f' },
    ],
    colors: {
      'editor.background': '#ffffff',
      'editor.foreground': '#1f2328',
      'editorLineNumber.foreground': '#cccccc',
      'editorCursor.foreground': '#888888',
      'editor.selectionBackground': '#eaeaea',
    },
  })

  monaco.editor.defineTheme('github-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6e7681', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'ff7b72' },
      { token: 'string', foreground: 'a5d6ff' },
      { token: 'number', foreground: '79c0ff' },
      { token: 'type', foreground: 'ffa657' },
    ],
    colors: {
      'editor.background': '#0d1117',
      'editor.foreground': '#c9d1d9',
      'editorLineNumber.foreground': '#484f58',
      'editorCursor.foreground': '#58a6ff',
      'editor.selectionBackground': '#264f78',
    },
  })

  monaco.editor.defineTheme('github-light', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6e7781', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'cf222e' },
      { token: 'string', foreground: '0a3069' },
      { token: 'number', foreground: '0550ae' },
      { token: 'type', foreground: '953800' },
    ],
    colors: {
      'editor.background': '#ffffff',
      'editor.foreground': '#1f2328',
      'editorLineNumber.foreground': '#8c959f',
      'editorCursor.foreground': '#0969da',
      'editor.selectionBackground': '#0969da33',
    },
  })

  monaco.editor.defineTheme('dracula', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6272a4', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'ff79c6' },
      { token: 'string', foreground: 'f1fa8c' },
      { token: 'number', foreground: 'bd93f9' },
      { token: 'type', foreground: '8be9fd' },
    ],
    colors: {
      'editor.background': '#282a36',
      'editor.foreground': '#f8f8f2',
      'editorLineNumber.foreground': '#6272a4',
      'editorCursor.foreground': '#f8f8f2',
      'editor.selectionBackground': '#44475a',
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
      { token: 'type', foreground: '66d9ef' },
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
      { token: 'type', foreground: '8fbcbb' },
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
      { token: 'type', foreground: 'e5c07b' },
    ],
    colors: {
      'editor.background': '#282c34',
      'editor.foreground': '#abb2bf',
      'editorLineNumber.foreground': '#4b5263',
      'editorCursor.foreground': '#abb2bf',
      'editor.selectionBackground': '#3e4451',
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
      { token: 'type', foreground: '7dcfff' },
    ],
    colors: {
      'editor.background': '#1a1b26',
      'editor.foreground': '#a9b1d6',
      'editorLineNumber.foreground': '#3b4261',
      'editorCursor.foreground': '#c0caf5',
      'editor.selectionBackground': '#33467c',
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
