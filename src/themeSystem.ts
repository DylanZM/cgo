interface TmThemeJson {
  name?: string
  type: 'light' | 'dark'
  base?: 'vs' | 'vs-dark'
  colors?: Record<string, string>
  tokenColors?: Array<{
    scope?: string | string[]
    settings?: {
      foreground?: string
      fontStyle?: string
    }
  }>
  semanticHighlighting?: boolean
}

export interface ThemeData {
  name: string
  type: 'light' | 'dark'
  base: 'vs' | 'vs-dark'
  colors: Record<string, string>
  tokenColors: Array<{
    scope?: string | string[]
    settings?: {
      foreground?: string
      fontStyle?: string
    }
  }>
  semanticHighlighting?: boolean
}

const themeImports: Record<string, () => Promise<unknown>> = {
  'vitesse-dark': () => import('tm-themes/themes/vitesse-dark.json'),
  'vitesse-light': () => import('tm-themes/themes/vitesse-light.json'),
  'github-dark': () => import('tm-themes/themes/github-dark.json'),
  'github-light': () => import('tm-themes/themes/github-light.json'),
  'dracula': () => import('tm-themes/themes/dracula.json'),
  'monokai': () => import('tm-themes/themes/monokai.json'),
  'nord': () => import('tm-themes/themes/nord.json'),
  'tokyo-night': () => import('tm-themes/themes/tokyo-night.json'),
  'one-dark-pro': () => import('tm-themes/themes/one-dark-pro.json'),
}

export async function loadThemeData(themeName: string): Promise<ThemeData> {
  const loader = themeImports[themeName]
  if (!loader) {
    throw new Error(`Theme not found: ${themeName}`)
  }
  const module = (await loader()) as { default?: TmThemeJson }
  const theme = (module.default || module) as TmThemeJson
  return {
    name: theme.name || themeName,
    type: theme.type === 'light' ? 'light' : 'dark',
    base: theme.type === 'light' ? 'vs' : 'vs-dark',
    colors: theme.colors || {},
    tokenColors: theme.tokenColors || [],
    semanticHighlighting: theme.semanticHighlighting,
  }
}

export function buildMonacoTheme(themeName: string, themeData: ThemeData) {
  const rules = (themeData.tokenColors ?? []).flatMap((rule) => {
    const scopes = Array.isArray(rule.scope) ? rule.scope : rule.scope ? [rule.scope] : []
    return scopes.map((scope) => ({
      token: scope,
      foreground: normalizeMonacoTokenColor(rule.settings?.foreground),
      fontStyle: rule.settings?.fontStyle ?? '',
    }))
  })

  return {
    name: themeData.name ?? themeName,
    base: themeData.base,
    inherit: true,
    colors: normalizeMonacoThemeColors(themeData.colors ?? {}),
    rules,
    semanticHighlighting: themeData.semanticHighlighting,
  }
}

function normalizeMonacoTokenColor(color?: string): string {
  if (!color) return ''
  const c = color.trim()
  if (c.startsWith('#')) return c.toUpperCase()
  return c
}

function normalizeMonacoThemeColors(colors: Record<string, string>): Record<string, string> {
  const normalized: Record<string, string> = {}
  for (const [key, value] of Object.entries(colors)) {
    normalized[key] = value.startsWith('#') ? value.toUpperCase() : value
  }
  return normalized
}

export function applyThemeUiColors(themeName: string, themeData: ThemeData): void {
  const themeType = themeData.type
  const colors = themeData.colors ?? {}
  const fallback = UI_THEME_FALLBACKS[themeType]

  const root = document.documentElement
  root.dataset.theme = themeName
  root.dataset.themeType = themeType
  root.style.setProperty('color-scheme', themeType)

  const setVar = (name: string, value: string) => {
    root.style.setProperty(name, value)
  }

  const getColor = (keys: string[], fallbackKey: string) => {
    for (const key of keys) {
      if (colors[key]) return colors[key]
    }
    return fallback[fallbackKey]
  }

  setVar('--editor-background', getColor(['editor.background'], 'bgPrimary'))
  setVar('--color-bg-primary', getColor(['editor.background'], 'bgPrimary'))
  setVar('--color-bg-secondary', getColor(['sideBar.background', 'panel.background'], 'bgSecondary'))
  setVar('--color-bg-tertiary', getColor(['input.background', 'dropdown.background'], 'bgTertiary'))
  setVar('--color-border', getColor(['input.border', 'sideBar.border'], 'border'))
  setVar('--color-text-primary', getColor(['foreground', 'editor.foreground'], 'textPrimary'))
  setVar('--color-text-secondary', getColor(['descriptionForeground', 'editorLineNumber.foreground'], 'textSecondary'))
  setVar('--color-text-muted', getColor(['editorLineNumber.foreground', 'descriptionForeground'], 'textMuted'))
  setVar('--color-accent', getColor(['button.background', 'textLink.foreground'], 'accent'))
  setVar('--color-accent-hover', getColor(['button.hoverBackground'], 'accentHover'))
  setVar('--color-success', getColor(['terminal.ansiGreen'], 'success'))
  setVar('--color-error', getColor(['errorForeground', 'terminal.ansiRed'], 'error'))
  setVar('--color-warning', getColor(['terminal.ansiYellow'], 'warning'))
  setVar('--color-info', getColor(['terminal.ansiBlue', 'textLink.foreground'], 'info'))

  setVar('--editor-scrollbar-thumb', getColor(['scrollbarSlider.background'], 'scrollbarThumb'))
  setVar('--editor-scrollbar-thumb-hover', getColor(['scrollbarSlider.hoverBackground'], 'scrollbarThumbHover'))
  setVar('--editor-scrollbar-thumb-active', getColor(['scrollbarSlider.activeBackground'], 'scrollbarThumbActive'))
}

export function syncThemeColors(themeData: ThemeData): void {
  const getTokenColor = (candidates: string[], fallback: string): string => {
    let bestColor = fallback
    let bestScore = -1

    for (const rule of themeData.tokenColors ?? []) {
      const scope = Array.isArray(rule.scope) ? rule.scope : rule.scope ? [rule.scope] : []
      for (const s of scope) {
        const score = scoreScopeMatch(s, candidates)
        if (score > bestScore && rule.settings?.foreground) {
          bestScore = score
          bestColor = rule.settings.foreground
        }
      }
    }
    return bestColor.startsWith('#') ? bestColor.toUpperCase() : bestColor
  }

  const root = document.documentElement
  root.style.setProperty('--theme-string', getTokenColor(['string', 'constant.language.string'], '#a5d6ff'))
  root.style.setProperty('--theme-number', getTokenColor(['constant.numeric', 'number'], '#79c0ff'))
  root.style.setProperty('--theme-keyword', getTokenColor(['keyword', 'storage.type', 'storage.modifier'], '#ff7b72'))
  root.style.setProperty('--theme-comment', getTokenColor(['comment', 'punctuation.definition.comment'], '#8b949e'))
  root.style.setProperty('--theme-function', getTokenColor(['entity.name.function', 'support.function'], '#d2a8ff'))
  root.style.setProperty('--theme-boolean', getTokenColor(['constant.language.boolean'], '#ff7b72'))
  root.style.setProperty('--theme-property', getTokenColor(['variable.property', 'support.property'], '#79c0ff'))
}

function scoreScopeMatch(scope: string, candidates: string[]): number {
  let score = 0
  const parts = scope.split('.')
  for (const candidate of candidates) {
    const candParts = candidate.split('.')
    let match = true
    for (let i = 0; i < candParts.length; i++) {
      if (parts[i] !== candParts[i]) {
        match = false
        break
      }
    }
    if (match) {
      score = Math.max(score, candParts.length * 10 - parts.length)
    }
  }
  return score
}

const UI_THEME_FALLBACKS: Record<'light' | 'dark', Record<string, string>> = {
  dark: {
    bgPrimary: '#1e1e1e',
    bgSecondary: '#252525',
    bgTertiary: '#2d2d2d',
    border: '#3e3e3e',
    textPrimary: '#e4e4e4',
    textSecondary: '#a0a0a0',
    textMuted: '#808080',
    accent: '#4fc3f7',
    accentHover: '#29b6f6',
    success: '#4ec9b0',
    error: '#f44747',
    warning: '#cca700',
    info: '#4fc3f7',
    scrollbarThumb: '#424242',
    scrollbarThumbHover: '#505050',
    scrollbarThumbActive: '#606060',
  },
  light: {
    bgPrimary: '#ffffff',
    bgSecondary: '#f8f8f8',
    bgTertiary: '#f0f0f0',
    border: '#d6d6d6',
    textPrimary: '#24292f',
    textSecondary: '#6a737d',
    textMuted: '#959da5',
    accent: '#0969da',
    accentHover: '#0860ca',
    success: '#2da44e',
    error: '#cf222e',
    warning: '#9a6700',
    info: '#0969da',
    scrollbarThumb: '#c1c1c1',
    scrollbarThumbHover: '#a8a8a8',
    scrollbarThumbActive: '#8c8c8c',
  },
}