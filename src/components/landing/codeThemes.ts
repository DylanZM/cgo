export interface CodeTheme {
  keyword: string
  string: string
  number: string
  fn: string
  comment: string
  text: string
  textMuted: string
  textSecondary: string
}

export const codeThemes = {
  subtle: {
    keyword: 'text-[var(--color-text-secondary)]',
    string: 'text-[var(--color-text-secondary)]',
    number: 'text-[var(--color-text-secondary)]',
    fn: 'text-[var(--color-text)]',
    comment: 'text-[var(--color-text-muted)]',
    text: 'text-[var(--color-text)]',
    textMuted: 'text-[var(--color-text-muted)]',
    textSecondary: 'text-[var(--color-text-secondary)]',
  },
  vitesse: {
    keyword: 'text-[#4d9375]',
    string: 'text-[#a98a58]',
    number: 'text-[#a87d59]',
    fn: 'text-[#a98a58]',
    comment: 'text-[#777a85] italic',
    text: 'text-[#dbd7ca]',
    textMuted: 'text-[#444444]',
    textSecondary: 'text-[#dbd7ca]',
  },
  github: {
    keyword: 'text-[#ff7b72]',
    string: 'text-[#a5d6ff]',
    number: 'text-[#79c0ff]',
    fn: 'text-[#d2a8ff]',
    comment: 'text-[#6e7681] italic',
    text: 'text-[#c9d1d9]',
    textMuted: 'text-[#484f58]',
    textSecondary: 'text-[#c9d1d9]',
  },
  monokai: {
    keyword: 'text-[#f92672]',
    string: 'text-[#e6db74]',
    number: 'text-[#ae81ff]',
    fn: 'text-[#66d9ef]',
    comment: 'text-[#75715e] italic',
    text: 'text-[#f8f8f2]',
    textMuted: 'text-[#90918b]',
    textSecondary: 'text-[#f8f8f2]',
  },
  nord: {
    keyword: 'text-[#81a1c1]',
    string: 'text-[#a3be8c]',
    number: 'text-[#b48ead]',
    fn: 'text-[#88c0d0]',
    comment: 'text-[#616e88] italic',
    text: 'text-[#d8dee9]',
    textMuted: 'text-[#4c566a]',
    textSecondary: 'text-[#d8dee9]',
  },
} as const

export type CodeThemeName = keyof typeof codeThemes
