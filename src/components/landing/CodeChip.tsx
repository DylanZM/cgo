import type { ReactNode } from 'react'

interface CodeChipProps {
  children: ReactNode
  rotate?: number
  size?: number
  width?: number
  color?: string
  filled?: boolean
}

export default function CodeChip({
  children,
  rotate = 0,
  size = 1,
  width,
  color = 'var(--color-text)',
  filled = false,
}: CodeChipProps) {
  const rotation = rotate === 0 ? '' : rotate > 0 ? `rotate-${rotate}` : `-rotate-${Math.abs(rotate)}`
  const dim = `${size}em`
  const w = width !== undefined ? `${width}em` : dim
  const rawFontSize = Math.max(size, width ?? size) * 0.55
  const maxFontSize = size * 0.85
  const fontSize = `${Math.min(rawFontSize, maxFontSize)}em`

  return (
    <span
      className={`relative inline-flex ${rotation} align-middle mx-1 overflow-hidden rounded-sm shadow-sm shadow-black/10`}
      style={{ height: dim, width: w, lineHeight: 1, verticalAlign: 'middle' }}
    >
      <span
        className={`absolute inset-0 ${filled ? 'bg-[var(--color-text)]' : 'bg-[var(--color-surface)]'} border ${filled ? 'border-[var(--color-border-strong)]' : 'border-[var(--color-border)]'} rounded-sm`}
      />
      <span
        className="relative w-full h-full flex items-center justify-center font-mono font-semibold whitespace-nowrap px-1"
        style={{ color: filled ? 'var(--color-bg)' : color, fontSize, lineHeight: 1 }}
      >
        {children}
      </span>
    </span>
  )
}
